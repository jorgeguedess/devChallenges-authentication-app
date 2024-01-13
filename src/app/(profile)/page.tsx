"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { CardItem } from "./components/card-item";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { useSession } from "next-auth/react";

export default function ProfilePage() {
  const { user } = useAuth();
  const { data } = useSession();

  if (!user && !data?.user)
    return (
      <div className="container flex h-full items-center justify-center">
        <p>Loading...</p>
      </div>
    );

  return (
    <main>
      <div className="container mb-10 text-center">
        <h1 className="mb-2 text-2xl sm:text-4xl">Personal info</h1>
        <p className="text-sm font-light sm:text-lg">
          Basic info, like your name and photo
        </p>
      </div>
      <Card className="mx-auto mb-10 w-full max-w-[53rem]">
        <CardHeader className="container mb-12 flex-row flex-wrap items-center justify-between gap-4 sm:mb-0">
          <div>
            <CardTitle className="mb-1 text-2xl">Profile</CardTitle>
            <CardDescription className="max-w-48 text-sm sm:max-w-full">
              Some info may be visible to other people
            </CardDescription>
          </div>
          <Link
            href={"/edit-profile"}
            className={`${buttonVariants({
              variant: "outline",
            })} w-24`}
          >
            Edit
          </Link>
        </CardHeader>
        <Separator className="hidden sm:block" />
        <CardContent>
          <ul className="flex w-full flex-col gap-5">
            <CardItem
              title="photo"
              text={user?.name || (data?.user?.name as string)}
              image={
                user?.photoURL ||
                data?.user?.image ||
                "/images/default-user.png"
              }
            />
            <CardItem
              title="name"
              text={user?.name || (data?.user?.name as string)}
            />
            <CardItem title="bio" text={user?.bio as string} />
            <CardItem title="phone" text={user?.phone as string} />
            <CardItem
              title="email"
              text={user?.email || (data?.user?.email as string)}
            />
            <CardItem
              title="password"
              text={user?.password || "************"}
            />
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
