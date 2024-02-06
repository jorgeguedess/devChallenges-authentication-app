"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Icon } from "@/components/icons";
import { FormEdit } from "./components/form-edit";

export default function EditProfilePage() {
  return (
    <main className="sm:p-4 md:mt-8">
      <div className="container mx-auto mb-6 flex max-w-[53rem] sm:p-0">
        <Link
          href={"/"}
          className="inline-flex items-start justify-start gap-2 py-1 text-link hover:underline focus:underline"
        >
          <Icon.ChevronLeft /> Back
        </Link>
      </div>
      <Card className="mx-auto mb-10 w-full max-w-[53rem]">
        <CardHeader className="container mx-auto mb-6 sm:mb-0 sm:space-y-0">
          <CardTitle className="mb-2 font-normal text-primary">
            Change Info
          </CardTitle>
          <CardDescription className="font-medium text-secondary">
            Changes will be reflected to every services
          </CardDescription>
        </CardHeader>
        <CardContent className="container sm:py-6">
          <FormEdit />
        </CardContent>
      </Card>
    </main>
  );
}
