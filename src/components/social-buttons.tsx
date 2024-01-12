import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";

export const SocialButtons = () => {
  return (
    <div className="mb-8 flex items-center justify-center gap-4">
      <Button
        variant="link"
        className="rounded-full p-0 hover:bg-primary-foreground focus:bg-primary-foreground"
        aria-label="Google"
      >
        <Icon.Google />
      </Button>
      <Button
        variant="link"
        className="rounded-full p-0 hover:bg-primary-foreground focus:bg-primary-foreground"
        aria-label="Facebook"
      >
        <Icon.Facebook />
      </Button>
      <Button
        variant="link"
        className="rounded-full p-0 hover:bg-primary-foreground focus:bg-primary-foreground"
        aria-label="Twitter"
      >
        <Icon.Twitter />
      </Button>
      <Button
        variant="link"
        className="rounded-full p-0 hover:bg-primary-foreground focus:bg-primary-foreground"
        aria-label="Github"
      >
        <Icon.Github />
      </Button>
    </div>
  );
};
