import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { useWallet } from './WalletContext';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signInWithWallet: () => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const { account, isConnected, connectWallet } = useWallet();

  // Set up auth state listener
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync wallet address with profile when wallet is connected and user is authenticated
  useEffect(() => {
    if (user && account && isConnected) {
      // Update user profile with wallet address
      setTimeout(async () => {
        try {
          await supabase
            .from('profiles')
            .upsert({
              user_id: user.id,
              wallet_address: account,
              username: account.slice(0, 8) // Use part of wallet address as username
            });
        } catch (error) {
          console.error('Error updating profile:', error);
        }
      }, 0);
    }
  }, [user, account, isConnected]);

  const signInWithWallet = async (): Promise<{ error: Error | null }> => {
    try {
      // First, ensure wallet is connected
      if (!isConnected) {
        await connectWallet();
      }

      if (!account) {
        return { error: new Error('Please connect your wallet first') };
      }

      // Generate a valid email format for wallet authentication
      const walletEmail = `user+${account.toLowerCase().replace('0x', '')}@wallet.auth`;
      const walletPassword = `wallet_${account}_auth_key`;

      // Try to sign up first
      const { error: signUpError } = await supabase.auth.signUp({
        email: walletEmail,
        password: walletPassword,
        options: {
          emailRedirectTo: `${window.location.origin}/`,
          data: {
            wallet_address: account,
            username: account.slice(0, 8),
            is_wallet_user: true
          }
        }
      });

      // If signup fails because user exists, try to sign in
      if (signUpError?.message?.includes('already registered') || signUpError?.message?.includes('already been registered')) {
        const { error: signInError } = await supabase.auth.signInWithPassword({
          email: walletEmail,
          password: walletPassword
        });
        
        if (signInError) {
          return { error: signInError };
        }
      } else if (signUpError && !signUpError.message?.includes('email not confirmed')) {
        return { error: signUpError };
      }

      // For wallet users, we don't need email confirmation, so we can proceed
      return { error: null };
    } catch (error) {
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      loading,
      signInWithWallet,
      signOut
    }}>
      {children}
    </AuthContext.Provider>
  );
};