import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { AuthContext } from './authContext';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminRole, setAdminRole] = useState<string | null>(null);

  const refreshAdminStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setIsAdmin(false);
      setAdminRole(null);
      return false;
    }

    const { data, error } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', user.id)
      .maybeSingle();

    const authorized = !error && Boolean(data?.role);
    setIsAdmin(authorized);
    setAdminRole(data?.role ?? null);
    return authorized;
  };

  useEffect(() => {
    let mounted = true;

    supabase.auth.getSession().then(({ data: { session: currentSession } }) => {
      if (!mounted) return;
      setSession(currentSession);
      setLoading(false);
      void refreshAdminStatus();
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      if (!mounted) return;
      setSession(nextSession);
      setLoading(false);
      window.setTimeout(() => void refreshAdminStatus(), 0);
    });

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, []);

  const value = useMemo(() => ({
    session,
    user: session?.user ?? null,
    loading,
    isAdmin,
    adminRole,
    signOut: async () => { await supabase.auth.signOut(); },
    refreshAdminStatus,
  }), [session, loading, isAdmin, adminRole]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
