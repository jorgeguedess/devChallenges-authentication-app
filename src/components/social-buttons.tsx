import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";
import { ReactNode } from "react";
import { signIn } from "next-auth/react";

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
  const handleOAuthSignIn = (provider: string) => {
    signIn(provider);
  };

  return (
    <div className="mb-4 flex items-center justify-center gap-4 sm:mb-8">
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
