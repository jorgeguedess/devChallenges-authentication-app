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
import { LockKeyholeIcon, MailIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import axios from "axios";

const formSchema = z
  .object({
    email: z
      .string()
      .min(1, "Email is required")
      .email("Email must be a valid email"),
    password: z
      .string()
      .min(1, "Password is required")
      .min(6, "Password must be greater than 6 characters"),
    confirmPassword: z.string().min(1, "Confirm Password is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password doesn't match",
    path: ["confirmPassword"], // path of error
  });

export default function EditPasswordPage(params: any) {
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (
    values,
  ) => {
    try {
      const response = await axios.put("/api/edit-password", {
        ...values,
        token: params.searchParams.token,
      });
      const data = await response.data;
      toast.success(data.msg);

      router.push("/login");
    } catch (error: any) {
      toast.error(error?.response?.data?.error);
    }
    if (!params.searchParams.token) {
      router.replace("/login");
      return <></>;
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
        <CardTitle className="text-lg">Reset Password</CardTitle>
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3.5">
                        <LockKeyholeIcon />
                      </div>
                      <Input
                        placeholder="Confirm Password"
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
              className="w-full disabled:bg-green-200"
              style={{ marginTop: "1.25rem" }}
            >
              Reset Password
            </Button>
          </form>
        </Form>

        <div className="flex items-center justify-center gap-2">
          <p>Already Know?</p>
          <Link
            href={"/login"}
            className="text-link hover:underline focus:underline"
          >
            Login
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
