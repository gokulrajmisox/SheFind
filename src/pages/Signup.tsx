import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail, UserRound } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function Signup() {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setMessage(''); setSubmitting(true);
    const { data, error: signUpError } = await supabase.auth.signUp({ email: email.trim(), password, options: { data: { full_name: fullName.trim() } } });
    if (signUpError) { setError(signUpError.message); setSubmitting(false); return; }
    if (data.user && data.session) { await supabase.from('profiles').upsert({ id: data.user.id, full_name: fullName.trim(), email: email.trim() }); navigate('/dashboard', { replace: true }); }
    else setMessage('Check your inbox to confirm your email, then sign in.');
    setSubmitting(false);
  };

  return <div className="auth-page user-auth-page"><div className="auth-decoration signup-decoration"><span>Make space<br />for <em>possibility.</em></span></div><div className="auth-panel"><Link to="/" className="auth-brand"><span className="brand-mark" /> SheFind</Link><div className="auth-content"><span className="auth-kicker">A better beginning</span><h1>Start your next chapter.</h1><p className="auth-subtitle">Create a free SheFind account to save opportunities and keep track of what matters.</p><form onSubmit={handleSubmit} className="auth-form"><label>Full name<div className="auth-input"><UserRound size={17} /><input required value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Your name" /></div></label><label>Email address<div className="auth-input"><Mail size={17} /><input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div></label><label>Password<div className="auth-input"><LockKeyhole size={17} /><input type="password" autoComplete="new-password" minLength={6} required value={password} onChange={e => setPassword(e.target.value)} placeholder="At least 6 characters" /></div></label>{error && <p className="auth-error" role="alert">{error}</p>}{message && <p className="auth-success" role="status">{message}</p>}<button className="auth-submit" disabled={submitting}>{submitting ? 'Creating account…' : <>Create account <ArrowRight size={16} /></>}</button></form><p className="auth-switch">Already have an account? <Link to="/login">Sign in</Link></p></div></div></div>;
}
