import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTES } from 'utils/constants';

/**
 * FUTURE DATABASE REQUIREMENTS - Authentication:
 *
 * When implementing authentication, the following will be needed:
 * - User login/registration (email/password)
 * - Anonymous/guest browsing support
 * - Session management
 * - User roles/permissions (admin, staff, customer)
 * - PIN/2FA for staff accounts
 */

// Stub user type (matches Firebase User interface for compatibility)
interface StubUser {
  uid: string;
  email: string | null;
  isAnonymous: boolean;
}

interface AuthContextType {
  isAuth: boolean;
  isLoading: boolean;
  user: StubUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string) => Promise<void>;
  logout: (redirectTo?: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [isAuth, setIsAuth] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<StubUser | null>(null);
  const navigate = useNavigate();

  // No backend auth; default to logged out but ready immediately
  useEffect(() => {
    setIsLoading(false);
  }, []);

  const login = useCallback(async () => {
    // Stub: just mark as authenticated without real user
    await Promise.resolve();
    setIsAuth(true);
    setIsLoading(false);
    setUser(null); // Keep null for now - components will handle null checks
  }, []);

  const register = useCallback(async () => {
    // Stub: just mark as authenticated without real user
    await Promise.resolve();
    setIsAuth(true);
    setIsLoading(false);
    setUser(null); // Keep null for now - components will handle null checks
  }, []);

  const logout = useCallback(
    async (redirectTo?: string) => {
      await Promise.resolve();
      setIsAuth(false);
      setIsLoading(false);
      setUser(null);
      navigate(redirectTo || ROUTES.LOGIN, { replace: true });
    },
    [navigate],
  );

  const value: AuthContextType = {
    isAuth,
    isLoading,
    user,
    login,
    register,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// PIN Context stubs (no backend)
interface PinContextType {
  hasPin: boolean;
  pinLength: number | null;
  hasValidSessionPin: boolean;
  savePin: (pin: string, pinLength: number) => Promise<void>;
  verifyPin: (inputPin: string) => Promise<boolean>;
  clearPin: () => void;
}

const PinContext = createContext<PinContextType | undefined>(undefined);

export function usePin() {
  const context = useContext(PinContext);
  if (context === undefined) {
    throw new Error('usePin must be used within a PinProvider');
  }
  return context;
}

interface PinProviderProps {
  children: ReactNode;
}

export function PinProvider({ children }: PinProviderProps) {
  const value: PinContextType = {
    hasPin: false,
    pinLength: null,
    hasValidSessionPin: false,
    savePin: async () => {},
    verifyPin: async () => {
      await Promise.resolve();
      return true;
    },
    clearPin: () => {},
  };

  return <PinContext.Provider value={value}>{children}</PinContext.Provider>;
}
