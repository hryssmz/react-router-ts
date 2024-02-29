// auth/components/AuthProvider.tsx
import { useState } from "react";
import { AuthContext, fakeAuthProvider } from "../lib/auth";

export interface AuthProviderProps {
  children: React.ReactNode;
}

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<string | null>(null);

  const signin = (newUser: string, callback: () => void) => {
    return fakeAuthProvider.signin(() => {
      setUser(newUser);
      callback();
    });
  };

  const signout = (callback: () => void) => {
    return fakeAuthProvider.signout(() => {
      setUser(null);
      callback();
    });
  };

  return (
    <AuthContext.Provider value={{ user, signin, signout }}>
      {children}
    </AuthContext.Provider>
  );
}
