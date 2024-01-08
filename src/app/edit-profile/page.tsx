"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { AvatarCard } from "./components/avatar-card";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { phoneRegex } from "@/constants/regex";
import Link from "next/link";
import { ChevronLeftIcon } from "lucide-react";

const normalize = (text: string) => text.replaceAll("\r\n", "\n");

const formSchema = z.object({
  username: z
    .string()
    .min(1, "Name is required")
    .min(2, "Name must be at least 2 characters."),
  bio: z
    .string()
    .transform(normalize)
    .pipe(z.string().min(1, "Bio is required").max(40, "Bio too long")),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(phoneRegex, "Invalid Number!"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must be a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be greater than 6 characters"),
});

export default function EditProfilePage() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      bio: "",
      phone: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log(values);
  };

  return (
    <main>
      <div className="container mb-10 text-center sm:text-start">
        <Link
          href={"/"}
          className="mb-4 flex items-center justify-start gap-2 text-link hover:underline focus:underline"
        >
          <ChevronLeftIcon /> Back
        </Link>
        <h1 className="mb-2 text-2xl sm:text-4xl">Change Info</h1>
        <p className="text-sm font-light sm:text-lg">
          Changes will be reflected to every services
        </p>
      </div>
      <Card className="mx-auto mb-10 w-full max-w-[53rem]">
        <CardHeader className="container mb-12 flex-row items-center gap-5 sm:mb-0">
          <AvatarCard />
        </CardHeader>
        <CardContent className="container">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your name..."
                        {...field}
                        className="h-14 p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="bio"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Bio</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Enter your bio..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your phone..."
                        {...field}
                        className="h-14 p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your email..."
                        {...field}
                        className="h-14 p-4"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter your password..."
                        type="password"
                        className="h-14 p-4"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-20">
                Save
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </main>
  );
}
