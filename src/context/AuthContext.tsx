"use client";

import { User } from "@/types/user";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import {
  PropsWithChildren,
  createContext,
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

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const router = useRouter();
  const pathName = usePathname();
  const [user, setUser] = useState<User | null>(null);

  const fetchData = async () => {
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
  };

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
  }, [pathName]);

  return (
    <AuthContext.Provider
      value={{
        user,
        LogoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
