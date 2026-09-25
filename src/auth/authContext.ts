import { createContext } from 'react';
import type { Session, User } from '@supabase/supabase-js';

export type AuthContextValue = {
  session: Session | null;
  user: User | null;
  loading: boolean;
  isAdmin: boolean;
  adminRole: string | null;
  signOut: () => Promise<void>;
  refreshAdminStatus: () => Promise<boolean>;
};

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
