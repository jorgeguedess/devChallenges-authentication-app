"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import { ReactNode, createContext, useContext, useEffect } from "react";
import toast from "react-hot-toast";

const LoginContext = createContext(null);

export const useLogin = () => {
  const context = useContext(LoginContext);
  if (!context)
    throw new Error("useLogin needs to be used within a LoginProvider");
  return context;
};

interface LoginProviderProps {
  values: any;
  children: ReactNode;
}

export const LoginProvider = ({ values, children }: LoginProviderProps) => {
  const router = useRouter();

  useEffect(() => {
    async function loginUser() {
      try {
        const response = await axios.post("/api/login", values);
        const data = await response.data;
        toast.success(data.msg);
        router.push("/");
      } catch (error: any) {
        console.log({ error });
        toast.error(error?.response?.data?.error || "User not found");
      }
    }

    if (values) loginUser();
  }, [values]);

  return <>{children}</>;
};
