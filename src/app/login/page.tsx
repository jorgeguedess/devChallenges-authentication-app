"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { SubmitHandler, useForm } from "react-hook-form";
import * as z from "zod";
import { Svg } from "@/components/svg";
import Link from "next/link";
import { Icon } from "@/components/icons";

import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { SocialButtons } from "@/components/social-buttons";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must be a valid email"),
  password: z
    .string()
    .min(1, "Password is required")
    .min(6, "Password must be greater than 6 characters"),
});

export default function LoginPage() {
  const { resolvedTheme } = useTheme();
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (
    values,
  ) => {
    setLoading(true);
    try {
      const response = await axios.post("/api/login", values);
      const data = await response.data;
      toast.success(data.msg);
      router.push("/");
    } catch (error: any) {
      console.log({ error });
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mb-3 w-full max-w-[30rem] py-2 sm:py-8">
      <CardHeader className="container mb-5 gap-5 sm:mb-0">
        {resolvedTheme === "dark" ? (
          <Svg.LogoWhite aria-label="devchallenges logo" />
        ) : (
          <Svg.Logo aria-label="devchallenges logo" />
        )}
        <CardTitle className="text-lg">Login</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <Form {...form}>
          <form
            method="post"
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="mb-3 space-y-2"
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <Icon.Mail />
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
                        <Icon.LockKeyhole />
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
              disabled={loading}
              type="submit"
              className="w-full"
              style={{ marginTop: "1.25rem" }}
            >
              {loading ? "loading..." : "Login"}
            </Button>
          </form>
        </Form>

        <div className="flex w-full flex-col gap-5 text-center">
          <Link
            href={"/forget-password"}
            className="mb-3 self-end text-sm text-link hover:underline focus:underline"
          >
            Forget password?
          </Link>
          <span className="inline-block text-sm text-secondary">
            or continue with these social profile
          </span>
          <SocialButtons />
          <p className="text-secondary">
            Don{"'"}t have an account yet?{" "}
            <Link
              href={"/register"}
              className="text-link hover:underline focus:underline"
            >
              Register
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
