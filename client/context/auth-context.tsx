"use client"; // needed for context hooks in App Router

import { createContext, useContext, useState, ReactNode, useEffect } from "react";
// Import for type checking
import type  { LoginInput, RegisterInput, UserResponseData } from "../graphql/queries";
import  { getCurrentCustomer, loginCustomer, logoutCustomer, registerCustomer } from "../graphql/queries";

import { useApolloClient } from "@apollo/client/react/react.cjs";
import { useRouter } from "next/navigation";


type AuthContextType = {
  user: any;
  loading: boolean;
  setLoading: (value: boolean) => void;
  accessToken: string | null; // <-- The Access Token lives here (in-memory)
  login: (userData: LoginInput) => void;
  registerUser: (userData: RegisterInput) => void;
  logout: () => void;
  apolloClientData: any;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const apolloClientData = useApolloClient(); 

  const [user, setUser] = useState<any>(null);
  const [authReady, setAuthReady] = useState(false);
  const [accessToken, setAccessToken] = useState<string | null>(null); 
  const [loading, setLoading] = useState(false);
  
  // Helper to set a client-side cookie for the Next.js middleware to read
  const setClientCookie = (token: string, days: number = 7) => {
    const expires = new Date(Date.now() + days * 864e5).toUTCString();
    // Setting the cookie with the key 'accessToken'
    document.cookie = `accessToken=${token}; expires=${expires}; path=/; SameSite=Strict; secure;`;
  };

  const clearClientCookie = () => {
    // Clear the cookie by setting an expiration date in the past
    document.cookie = `accessToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Strict; secure;`;
  };
  
  const handleAuthSuccess = (
    newAccessToken: string, 
    user: any, 
  ) => {
    setAccessToken(newAccessToken);
    setUser(user);

    // 2. Persist token for apollo-client.js (which reads localStorage)
    localStorage.setItem('accessToken', newAccessToken); 
    
    // 3. FIX: Set a client-side cookie for Next.js Middleware to read
    setClientCookie(newAccessToken, 7); // Set for 7 days

    router.push('/profile');
  };

  const login = async (userData: LoginInput) => {
    if (!apolloClientData) {
      console.error("Apollo Client not available. Cannot perform mutation.");
      return;
    }
    setLoading(true);

    try {
      // NOTE: Assuming loginCustomer returns { login: { accessToken, user } }
      const response: UserResponseData = await loginCustomer(apolloClientData, userData);
      
      const { accessToken, user } = response;

      handleAuthSuccess(accessToken, user);
      setLoading(false);
    } catch (err) {
      console.error('Error during login:', err);
      // Handle failed login
      localStorage.removeItem('accessToken');
      clearClientCookie();
      setAccessToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  const registerUser = async (userData: RegisterInput) => {
    if (!apolloClientData) {
      console.error("Apollo Client not available. Cannot perform mutation.");
      return;
    }
    setLoading(true);

    try {
      // NOTE: Assuming registerCustomer returns { register: { accessToken, user } }
      const response: UserResponseData = await registerCustomer(apolloClientData, userData);
      
      const { accessToken, user } = response;

      handleAuthSuccess(accessToken, user);
      setLoading(false);
    } catch (err) {
      console.error('Error during registration:', err);
      localStorage.removeItem('accessToken');
      clearClientCookie();
      setAccessToken(null);
      setUser(null);
      setLoading(false);
    }
  };

  const logout = async () => {
    
    // 1. Clear local state and storage
    setUser(null);
    setAccessToken(null); 
    localStorage.removeItem("accessToken");

    // 2. FIX: Clear client-side cookie for middleware
    clearClientCookie();
    
    // 3. Clear Apollo Cache
    await apolloClientData.clearStore();

    // 4. Redirect to home/login
    router.push('/');
  };

  // Effect to try and fetch the current user on mount/refresh
  useEffect(() => {
    const checkAuthStatus = async () => {
      // Check if a token exists in localStorage (which apollo-client.js uses)
      const persistedToken = localStorage.getItem('accessToken');
      if (persistedToken) {
        setAccessToken(persistedToken);
        
        try {
          // Attempt to fetch the user profile using the token in the header
          const response = await getCurrentCustomer(apolloClientData);
          if (response && response) {
            console.log(response, 'current customer -----------------------------------------------------------')
            setUser(response);
          } else {
            // Token was present but invalid/expired on the server side
            logout();
          }
        } catch (error) {
          // Request failed (e.g., 401 Unauthorized from NestJS server)
          console.error("Failed to fetch current customer on mount:", error);
          logout(); 
        }
      }
      setAuthReady(true);
    };

    if (apolloClientData && !authReady) {
      checkAuthStatus();
    }
  }, [apolloClientData, authReady]);
  
  return (
    <AuthContext.Provider value={{ user, accessToken, login, registerUser, logout, loading, setLoading, apolloClientData }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
