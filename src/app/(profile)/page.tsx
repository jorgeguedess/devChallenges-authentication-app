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

export default function ProfilePage() {
  return (
    <main>
      <div className="container mb-10 text-center sm:text-start">
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
            className={`${buttonVariants({ variant: "outline" })}} w-24`}
          >
            Edit
          </Link>
        </CardHeader>
        <Separator className="hidden sm:block" />
        <CardContent>
          <ul className="flex w-full flex-col gap-5">
            <CardItem title="photo" isImage />
            <CardItem title="name" text="Xanthe Neal" />
            <CardItem
              title="bio"
              text="I am a software developer and with programmer"
            />
            <CardItem title="email" text="xanthe.neal@gmail.com" />
            <CardItem title="password" text="************" />
          </ul>
        </CardContent>
      </Card>
    </main>
  );
}
