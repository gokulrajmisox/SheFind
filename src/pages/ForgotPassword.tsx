import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ArrowRight, KeyRound, Mail } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [recovery, setRecovery] = useState(false);
  const [sent, setSent] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(event => {
      if (event === 'PASSWORD_RECOVERY') setRecovery(true);
    });
    return () => subscription.unsubscribe();
  }, []);

  const submitReset = async (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setSubmitting(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.trim(), { redirectTo: `${window.location.origin}/forgot-password` });
    setSubmitting(false); if (resetError) setError(resetError.message); else setSent(true);
  };

  const updatePassword = async (event: React.FormEvent) => {
    event.preventDefault(); setError(''); setSubmitting(true);
    const { error: updateError } = await supabase.auth.updateUser({ password: newPassword });
    setSubmitting(false); if (updateError) setError(updateError.message); else { setUpdated(true); await supabase.auth.signOut(); }
  };

  return <div className="auth-page user-auth-page"><div className="auth-decoration reset-decoration"><span>{recovery ? <>A fresh<br /><em>start.</em></> : <>Small steps<br />can lead to<br /><em>big change.</em></>}</span></div><div className="auth-panel"><Link to="/" className="auth-brand"><span className="brand-mark" /> SheFind</Link><div className="auth-content">{!recovery && <Link to="/login" className="back-link"><ArrowLeft size={15} /> Back to sign in</Link>}<span className="auth-kicker">{recovery ? 'Choose a new password' : 'Reset access'}</span><h1>{recovery ? 'Set a new password.' : 'Forgot your password?'}</h1><p className="auth-subtitle">{recovery ? 'Choose a strong password you will remember. Your reset link is secure and single-use.' : 'Enter your email and we’ll send you a secure link to create a new password.'}</p>{updated ? <div className="auth-message-card"><KeyRound size={20} /><strong>Password updated</strong><span>Your password has been changed. You can sign in with it now.</span><Link to="/login" className="text-cta">Go to sign in <ArrowRight size={15} /></Link></div> : recovery ? <form onSubmit={updatePassword} className="auth-form"><label>New password<div className="auth-input"><KeyRound size={17} /><input type="password" autoComplete="new-password" minLength={6} required value={newPassword} onChange={e => setNewPassword(e.target.value)} placeholder="At least 6 characters" /></div></label>{error && <p className="auth-error" role="alert">{error}</p>}<button className="auth-submit" disabled={submitting}>{submitting ? 'Updating password…' : <>Update password <ArrowRight size={16} /></>}</button></form> : sent ? <div className="auth-message-card"><Mail size={20} /><strong>Check your inbox</strong><span>If an account exists for {email}, a reset link is on its way.</span></div> : <form onSubmit={submitReset} className="auth-form"><label>Email address<div className="auth-input"><Mail size={17} /><input type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" /></div></label>{error && <p className="auth-error" role="alert">{error}</p>}<button className="auth-submit" disabled={submitting}>{submitting ? 'Sending link…' : <>Send reset link <ArrowRight size={16} /></>}</button></form>}</div></div></div>;
}
