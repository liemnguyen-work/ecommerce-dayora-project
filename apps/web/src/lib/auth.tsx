import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from 'react';
import { api } from './api.ts';

export type User = {
  id: string;
  email: string;
  fullName: string;
  phone?: string | null;
  role: 'CUSTOMER' | 'ADMIN';
};

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const version = useRef(0);

  useEffect(() => {
    let active = true;
    const current = ++version.current;
    void api<User>('/auth/me')
      .then((value) => {
        if (active && version.current === current) setUser(value);
      })
      .catch(() => {
        if (active && version.current === current) setUser(null);
      })
      .finally(() => {
        if (active && version.current === current) setLoading(false);
      });

    return () => { active = false; };
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    const current = ++version.current;
    try {
      const value = await api<User>('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });
      if (version.current === current) setUser(value);
    } finally {
      if (version.current === current) setLoading(false);
    }
  }, []);

  const register = useCallback(async (fullName: string, email: string, password: string) => {
    await api<User>('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ fullName, email, password }),
    });
    try {
      await login(email, password);
    } catch {
      throw new Error('Đã tạo tài khoản nhưng chưa đăng nhập được. Hãy thử đăng nhập lại.');
    }
  }, [login]);

  const logout = useCallback(async () => {
    const current = ++version.current;
    try {
      await api<{ message: string }>('/auth/logout', { method: 'POST' });
      if (version.current === current) setUser(null);
    } finally {
      if (version.current === current) setLoading(false);
    }
  }, []);

  const value = useMemo(
    () => ({ user, loading, login, register, logout }),
    [user, loading, login, register, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook dùng chung với provider để giữ toàn bộ giao diện xác thực trong một file.
// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return context;
}
