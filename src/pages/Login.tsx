import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Eye, EyeOff, LockKeyhole, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password });
    setSubmitting(false);
    if (signInError) { setError(signInError.message); return; }
    const from = (location.state as { from?: string } | null)?.from;
    navigate(from && from !== '/admin' ? from : '/dashboard', { replace: true });
  };

  return <div className="auth-page user-auth-page"><div className="auth-decoration"><span>Find your<br /><em>way forward.</em></span></div><div className="auth-panel"><Link to="/" className="auth-brand"><span className="brand-mark" /> SheFind</Link><div className="auth-content"><span className="auth-kicker">Welcome back</span><h1>Good to see you again.</h1><p className="auth-subtitle">Sign in to keep your opportunities, applications, and saved support in one place.</p><form onSubmit={handleSubmit} className="auth-form"><label>Email address<div className="auth-input"><Mail size={17} /><input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div></label><label>Password<div className="auth-input"><LockKeyhole size={17} /><input type={showPassword ? 'text' : 'password'} autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Your password" /><button type="button" onClick={() => setShowPassword(value => !value)} aria-label={showPassword ? 'Hide password' : 'Show password'}>{showPassword ? <EyeOff size={17} /> : <Eye size={17} />}</button></div></label><div className="auth-row"><Link to="/forgot-password">Forgot password?</Link></div>{error && <p className="auth-error" role="alert">{error}</p>}<button className="auth-submit" disabled={submitting}>{submitting ? 'Signing in…' : <>Sign in <ArrowRight size={16} /></>}</button></form><p className="auth-switch">New to SheFind? <Link to="/signup">Create your account</Link></p></div></div></div>;
}
