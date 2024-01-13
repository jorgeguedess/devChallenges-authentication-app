import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { getInitials } from "@/lib/utils";

interface CardItemProps {
  title: string;
  text: string;
  image?: string;
}

export const CardItem = ({ title, text, image }: CardItemProps) => {
  return (
    <>
      <li className="container flex flex-wrap items-center justify-between gap-2 py-1">
        <span className="text-sm font-medium uppercase text-border sm:w-20">
          {title}
        </span>
        {image ? (
          <div className="md:w-[30rem]">
            <Avatar className="h-[4.5rem] w-[4.5rem] rounded-lg">
              <AvatarImage src={image} />
              <AvatarFallback>{getInitials(text)}</AvatarFallback>
            </Avatar>
          </div>
        ) : (
          <p className="max-w-52 truncate font-medium sm:max-w-[32.5rem] sm:text-lg md:w-[30rem]">
            {text}
          </p>
        )}
      </li>
      <Separator />
    </>
  );
};
