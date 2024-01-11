"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { CameraIcon } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ChangeEvent } from "react";

interface AvatarCardProps {
  field: any;
  avatar: string;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>, field: any) => void;
}

export const AvatarCard = ({
  field,
  avatar,
  handleFileChange,
}: AvatarCardProps) => {
  return (
    <>
      <label
        htmlFor="fileInput"
        className="relative flex cursor-pointer items-center gap-5"
      >
        <Input
          type="file"
          id="fileInput"
          className="hidden"
          accept="image/png, image/jpeg, image/jpg"
          multiple={false}
          {...field}
          value={field.value?.fileName}
          onChange={(event) => handleFileChange(event, field)}
        />
        <div className="relative h-[4.5rem] w-[4.5rem]">
          <Avatar className="h-full w-full rounded-none">
            <AvatarImage
              src={avatar || "/images/default-user.png"}
              alt="avatar image"
              className="object-cover object-center"
            />
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
    </>
  );
};
