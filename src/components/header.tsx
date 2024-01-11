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

  const { user, LogoutHandler } = useAuth();

  if (!user) return null;

  return (
    <header>
      <div className="container flex w-full items-center justify-between py-5">
        {resolvedTheme === "dark" ? (
          <Svg.LogoWhite aria-label="devchallenges logo" />
        ) : (
          <Svg.Logo aria-label="devchallenges logo" />
        )}

        <DropdownMenu onOpenChange={() => setIsOpen(!isOpen)}>
          <DropdownMenuTrigger asChild className="flex gap-3">
            <Button variant="ghost" className="flex items-center">
              <Avatar>
                <AvatarImage
                  src={user?.photoURL || "/images/default-user.png"}
                />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <div className="sr-only flex items-center gap-3 sm:not-sr-only">
                {user.name && <p className="capitalize">{user?.name}</p>}
                {isOpen ? (
                  <Icon.DropDown aria-label="Menu open" />
                ) : (
                  <Icon.DropUp aria-label="Menu close" />
                )}
              </div>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="mt-2 w-52" align="end">
            <DropdownMenuItem asChild>
              <Link
                href="/edit-profile"
                className="flex w-full cursor-pointer items-center gap-3"
              >
                <Icon.Account />
                Edit Profile
              </Link>
            </DropdownMenuItem>
            <Separator className="my-2" />
            <DropdownMenuItem asChild>
              <Button
                variant="link"
                onClick={LogoutHandler}
                className="flex w-full cursor-pointer items-center justify-start gap-3 text-destructive hover:no-underline"
              >
                <LogOutIcon />
                Logout
              </Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
