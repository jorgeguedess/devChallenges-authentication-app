"use client";

import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { ReactNode, useEffect } from "react";
import { signIn, useSession } from "next-auth/react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

interface IProviders {
  providerName: "google" | "facebook" | "twitter" | "github";
  Icon: ReactNode;
}

const providers: IProviders[] = [
  { providerName: "google", Icon: <Icon.Google /> },
  { providerName: "facebook", Icon: <Icon.Facebook /> },
  { providerName: "twitter", Icon: <Icon.Twitter /> },
  { providerName: "github", Icon: <Icon.Github /> },
];

export const SocialButtons = () => {
  const { data } = useSession();
  const router = useRouter();

  const handleOAuthSignIn = (provider: string) => {
    signIn(provider);
  };

  useEffect(() => {
    if (!data?.user) return;
    const values = data.user;
    async function LoginProviderAuth(values: any) {
      try {
        const response = await axios.post("/api/login", values);
        const data = await response.data;
        toast.success(data.msg);
        router.push("/");
      } catch (error: any) {
        console.log({ error });
      }
    }
    LoginProviderAuth(values);
  }, [data, router]);

  return (
    <div className="mb-8 flex items-center justify-center gap-4">
      {providers.map((provider, index) => (
        <Button
          key={index}
          variant="link"
          aria-label={provider.providerName}
          className="rounded-full p-0 hover:bg-input focus:bg-input"
          onClick={() => handleOAuthSignIn(provider.providerName)}
        >
          {provider?.Icon}
        </Button>
      ))}
    </div>
  );
};
