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
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Svg } from "@/components/svg";
import { Icon } from "@/components/icons";
import Link from "next/link";
import { LockKeyholeIcon, MailIcon } from "lucide-react";
import toast from "react-hot-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const onSubmitHandler = async (
    values: z.infer<typeof formSchema>,
    { resetForm }: any,
  ) => {
    setLoading(true);
    try {
      // implement logic login here
      router.push("/");
    } catch (error: any) {
      console.log({ error });
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="mx-auto mb-3 w-full max-w-[30rem] py-4 sm:py-8">
      <CardHeader className="container mb-5 gap-5 sm:mb-0">
        {resolvedTheme === "dark" ? <Svg.LogoWhite /> : <Svg.Logo />}
        <CardTitle className="text-lg">Login</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="mb-7 space-y-2"
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
            <Button
              type="submit"
              className="w-full"
              style={{ marginTop: "1.25rem" }}
            >
              Login
            </Button>
          </form>
        </Form>
        <div className="w-full text-center">
          <span className="mb-5 inline-block text-sm text-secondary">
            or continue with these social profile
          </span>
          <div className="mb-8 flex items-center justify-center gap-2">
            <Button variant="link" className="px-2 py-3">
              <Icon.Google />
            </Button>
            <Button variant="link" className="px-2 py-3">
              <Icon.Facebook />
            </Button>
            <Button variant="link" className="px-2 py-3">
              <Icon.Twitter />
            </Button>
            <Button variant="link" className="px-2 py-3">
              <Icon.Github />
            </Button>
          </div>
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