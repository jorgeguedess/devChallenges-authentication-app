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

import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";
import { getInitials } from "@/lib/utils";
import { usePathname } from "next/navigation";

export const Header = () => {
  const { resolvedTheme } = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const { user, LogoutHandler } = useAuth();
  const { data } = useSession();
  const pathname = usePathname();

  if (!user && !data) {
    return null;
  }

  if (pathname !== "/login" && pathname !== "/register")
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
                    className="rounded-full border border-border object-cover"
                    src={
                      user?.photoURL ||
                      data?.user?.image ||
                      "/images/default-user.png"
                    }
                  />
                  <AvatarFallback>
                    {getInitials(user?.name || (data?.user?.name as string))}
                  </AvatarFallback>
                </Avatar>
                <div className="sr-only flex items-center gap-3 sm:not-sr-only">
                  {user?.name ||
                    (data?.user?.name && (
                      <p className="capitalize">
                        {user?.name || data.user.name}
                      </p>
                    ))}
                  {isOpen ? (
                    <Icon.DropDown aria-label="Menu open" />
                  ) : (
                    <Icon.DropUp aria-label="Menu close" />
                  )}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="mt-2 flex w-52 flex-col gap-2"
              align="end"
            >
              <DropdownMenuItem asChild>
                <Link
                  href="/"
                  className="flex w-full cursor-pointer items-center gap-3"
                >
                  <Icon.User />
                  My Profile
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link
                  href="/edit-profile"
                  className="flex w-full cursor-pointer items-center gap-3"
                >
                  <Icon.UserRoundCog />
                  Edit Profile
                </Link>
              </DropdownMenuItem>
              <Separator className="my-1" />
              <DropdownMenuItem asChild>
                <Button
                  variant="link"
                  onClick={() => LogoutHandler()}
                  className="flex w-full cursor-pointer items-center justify-start gap-3 text-destructive hover:no-underline"
                >
                  <Icon.LogOut />
                  Logout
                </Button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>
    );
};
