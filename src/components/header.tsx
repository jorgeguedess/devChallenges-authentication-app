"use client";

import { useTheme } from "next-themes";
import { Svg } from "./svg";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Icon } from "@/components/icons";
import { useState } from "react";
import Link from "next/link";
import { LogOutIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user } = useAuth();

  const LogoutHandler = async () => {
    try {
      // implement logic logout here
      console.log("logout");
    } catch (error) {
      console.error(error);
    }
  };

  if (!user) return null;

  return (
    <header>
      <div className="container flex w-full items-center justify-between py-5">
        {resolvedTheme === "dark" ? <Svg.LogoWhite /> : <Svg.Logo />}

        <DropdownMenu onOpenChange={() => setIsOpen(!isOpen)}>
          <DropdownMenuTrigger asChild className="flex gap-3">
            <Button variant="ghost" className="flex items-center">
              <Avatar>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="sr-only flex items-center gap-3 sm:not-sr-only">
                <p>Xanthe Neal</p>
                {isOpen ? <Icon.DropDown /> : <Icon.DropUp />}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-52" align="end">
            <DropdownMenuItem asChild>
              <Link href="/profile" className="flex w-full items-center gap-3">
                <Icon.Account />
                My Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/"} className="flex w-full items-center gap-3">
                <Icon.Group />
                Group Chat
              </Link>
            </DropdownMenuItem>
            <Separator className="my-3" />
            <DropdownMenuItem asChild>
              <Link
                onClick={LogoutHandler}
                href={"/login"}
                className="flex w-full items-center gap-3 text-destructive"
              >
                <LogOutIcon />
                Logout
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
