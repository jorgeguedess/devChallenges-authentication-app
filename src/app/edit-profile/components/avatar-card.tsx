import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon } from "lucide-react";
import { AvatarUpload } from "./avatar-upload";
import { Dispatch, SetStateAction } from "react";

interface AvatarCardProps {
  avatar: string;
  setAvatar: Dispatch<SetStateAction<string>>;
}

export const AvatarCard = ({ avatar, setAvatar }: AvatarCardProps) => {
  return (
    <form method="post" className="flex items-center gap-5">
      <label
        htmlFor="fileInput"
        className="relative flex cursor-pointer items-center gap-5"
      >
        <AvatarUpload />
        <div className="relative h-[4.5rem] w-[4.5rem]">
          <Avatar className="h-full w-full rounded-none">
            <AvatarImage src={avatar} alt="avatar image" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div
            className="absolute inset-0 flex cursor-pointer flex-col items-center justify-center bg-black/60 transition-colors hover:bg-black/40"
            aria-label="Change Photo"
          >
            <CameraIcon className="text-white" />
          </div>
        </div>
        <span className="sr-only text-sm uppercase text-secondary sm:not-sr-only">
          change photo
        </span>
      </label>
    </form>
  );
};
