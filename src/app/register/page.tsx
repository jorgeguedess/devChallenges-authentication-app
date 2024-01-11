"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useTheme } from "next-themes";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import * as z from "zod";
import { Svg } from "@/components/svg";
import Link from "next/link";
import { LockKeyholeIcon, MailIcon, UserIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SocialButtons } from "@/components/social-buttons";

const formSchema = z.object({
  name: z.string().min(1, "Name is required").max(30, "Name too long"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must be a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be greater than 6 characters"),
});

export default function RegisterPage() {
  const router = useRouter();
  const { resolvedTheme } = useTheme();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });

  const onSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (
    values,
  ) => {
    try {
      const response = await axios.post("/api/register", values);
      const data = await response.data;
      toast.success(data.msg);
      router.push("/login");
    } catch (error: any) {
      console.log({ error });
      toast.error(error?.response?.data?.error);
    }
  };

  return (
    <Card className="mx-auto mb-3 w-full max-w-[30rem] py-4 sm:py-8">
      <CardHeader className="container mb-5 gap-5 sm:mb-0">
        {resolvedTheme === "dark" ? (
          <Svg.LogoWhite aria-label="devchallenges logo" />
        ) : (
          <Svg.Logo aria-label="devchallenges logo" />
        )}
        <CardTitle className="mb-4 max-w-80 text-lg font-semibold">
          Join thousands of learners from around the world
        </CardTitle>
        <CardDescription className="max-w-80 text-primary">
          Master web development by making real-life projects. There are
          multiple paths for you to choose
        </CardDescription>
      </CardHeader>
      <CardContent className="container">
        <Form {...form}>
          <form
            method="post"
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="mb-7 space-y-2"
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <UserIcon />
                      </div>
                      <Input placeholder="Name" {...field} className="pl-12" />
                    </div>
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
                  <FormControl>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <MailIcon />
                      </div>
                      <Input placeholder="Email" {...field} className="pl-12" />
                    </div>
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
                  <FormControl>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <LockKeyholeIcon />
                      </div>
                      <Input
                        placeholder="Password"
                        type="password"
                        className="pl-12"
                        {...field}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button
              type="submit"
              className="w-full"
              style={{ marginTop: "1.25rem" }}
            >
              Start coding now
            </Button>
          </form>
        </Form>
        <div className="w-full text-center">
          <span className="mb-5 inline-block text-sm text-secondary">
            or continue with these social profile
          </span>
          <SocialButtons />
          <p className="text-secondary">
            Adready a member?{" "}
            <Link
              href={"/login"}
              className="text-link hover:underline focus:underline"
            >
              Login
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
