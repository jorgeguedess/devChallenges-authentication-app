"use client";

import { User } from "@/types/user";
import axios from "axios";
import { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import toast from "react-hot-toast";

interface AuthContextInterface {
  user: User | null;
  LogoutHandler: () => Promise<void>;
}

const AuthContext = createContext<AuthContextInterface | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context)
    throw new Error("useAuth needs to be used within a AuthProvider");
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
  session: Session | null;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = useState<User | null>(null);

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get("/api/profile");
      const data = await response.data;
      setUser(data?.user);
      return response;
    } catch (error: any) {
      console.error(error);
      toast.error(error.message);
      router.push("/login");
    }
  }, [router]);

  const LogoutHandler = async () => {
    try {
      const response = await axios.post("/api/logout");
      const data = await response.data;
      toast.success(data.msg);
      setUser(null);
      router.push("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.error);
    }
  };

  useEffect(() => {
    const isPrivatePath = ["/", "/edit-profile"];
    if (isPrivatePath.includes(pathName)) {
      fetchData();
    } else {
      setUser(null);
    }
  }, [fetchData, pathName]);

  return (
    <SessionProvider>
      <AuthContext.Provider
        value={{
          user,
          LogoutHandler,
        }}
      >
        {children}
      </AuthContext.Provider>
    </SessionProvider>
  );
};
