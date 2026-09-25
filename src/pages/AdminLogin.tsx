import { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, LockKeyhole, Mail, ShieldCheck } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/auth/useAuth';

export function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, isAdmin, loading: authLoading, refreshAdminStatus } = useAuth();
  const [email, setEmail] = useState(''); const [password, setPassword] = useState(''); const [error, setError] = useState(''); const [submitting, setSubmitting] = useState(false);
  const denied = new URLSearchParams(location.search).get('denied') === '1';

  useEffect(() => { if (!authLoading && user && isAdmin) navigate('/admin/dashboard', { replace: true }); }, [authLoading, user, isAdmin, navigate]);

  const handleSubmit = async (event: React.FormEvent) => { event.preventDefault(); setError(''); setSubmitting(true); const { error: signInError } = await supabase.auth.signInWithPassword({ email: email.trim(), password }); if (signInError) { setError(signInError.message); setSubmitting(false); return; } const authorized = await refreshAdminStatus(); setSubmitting(false); if (authorized) navigate('/admin/dashboard', { replace: true }); else { await supabase.auth.signOut(); setError('This account is not authorized for the admin portal.'); } };

  return <div className="admin-auth-page"><div className="admin-login-shell"><div className="admin-login-brand"><span className="admin-brand-mark"><ShieldCheck size={19} /></span><div><strong>SheFind</strong><span>Internal operations</span></div></div><div className="admin-login-card"><div className="admin-card-heading"><span className="admin-kicker">Restricted workspace</span><h1>Admin Portal</h1><p>Manage verified scholarships, schemes, deadlines and platform content.</p></div><form onSubmit={handleSubmit} className="auth-form"><label>Email<div className="admin-input"><Mail size={17} /><input type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@shefind.org" /></div></label><label>Password<div className="admin-input"><LockKeyhole size={17} /><input type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} placeholder="Enter your password" /></div></label>{denied && <p className="admin-error" role="alert">Access denied. Use an authorized admin account.</p>}{error && <p className="admin-error" role="alert">{error}</p>}<button className="admin-submit" disabled={submitting}>{submitting ? 'Verifying access…' : <>Sign in to Admin <ArrowRight size={16} /></>}</button></form><div className="admin-card-footer"><span>Authorized personnel only</span><Link to="/">Return to SheFind</Link></div></div></div></div>;
}
