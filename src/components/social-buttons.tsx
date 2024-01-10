import { Button } from "@/components/ui/button";
import { Icon } from "@/components/icons";

export const SocialButtons = () => {
  return (
    <div className="mb-8 flex items-center justify-center gap-4">
      <Button variant="link" className="rounded-full p-0" aria-label="Google">
        <Icon.Google />
      </Button>
      <Button variant="link" className="rounded-full p-0" aria-label="Facebook">
        <Icon.Facebook />
      </Button>
      <Button variant="link" className="rounded-full p-0" aria-label="Twitter">
        <Icon.Twitter />
      </Button>
      <Button variant="link" className="rounded-full p-0" aria-label="Github">
        <Icon.Github />
      </Button>
    </div>
  );
};
