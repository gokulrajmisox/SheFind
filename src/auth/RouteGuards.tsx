import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from './useAuth';

function AuthLoading() {
  return <div className="auth-loading" role="status">Checking your session…</div>;
}

export function PublicOnlyRoute() {
  const { user, loading } = useAuth();
  if (loading) return <AuthLoading />;
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export function UserProtectedRoute() {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) return <AuthLoading />;
  return user ? <Outlet /> : <Navigate to="/login" replace state={{ from: location.pathname }} />;
}

export function AdminProtectedRoute() {
  const { user, isAdmin, loading } = useAuth();
  if (loading) return <AuthLoading />;
  if (!user) return <Navigate to="/admin/login" replace />;
  return isAdmin ? <Outlet /> : <Navigate to="/admin/login?denied=1" replace />;
}
