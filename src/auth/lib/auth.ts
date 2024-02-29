// auth/lib/auth.ts
import { createContext, useContext } from "react";

export const fakeAuthProvider = {
  isAuthenticated: false,
  signin(callback: () => void) {
    fakeAuthProvider.isAuthenticated = true;
    setTimeout(callback, 100); // fake async
  },
  signout(callback: () => void) {
    fakeAuthProvider.isAuthenticated = false;
    setTimeout(callback, 100);
  },
};

export interface AuthContextType {
  user: string | null;
  signin: (user: string, callback: () => void) => void;
  signout: (callback: () => void) => void;
}

export const AuthContext = createContext<AuthContextType>(null!);

export function useAuth() {
  return useContext(AuthContext);
}
