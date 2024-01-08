import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

interface CardItemProps {
  title: string;
  text?: string;
  isImage?: boolean;
}

export const CardItem = ({ title, text, isImage = false }: CardItemProps) => {
  return (
    <>
      <li className="container flex flex-wrap items-center justify-between gap-2 py-1">
        <span className="text-sm font-medium uppercase text-border">
          {title}
        </span>
        {isImage ? (
          <Avatar className="h-[4.5rem] w-[4.5rem] rounded-lg">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        ) : (
          <p className="max-w-52 truncate font-medium sm:text-lg">{text}</p>
        )}
      </li>
      <Separator />
    </>
  );
};
