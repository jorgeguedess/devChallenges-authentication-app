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
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";

const formSchema = z.object({
  email: z
    .string()
    .min(1, "Email is required")
    .email("Email must be a valid email"),
});

export default function ForgetPasswordPage() {
  const { resolvedTheme } = useTheme();
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (
    values,
  ) => {
    try {
      const response = axios.post("/api/forget-password", values);
      const data = (await response).data;
      toast.success(data.msg);
      router.push("/login");
    } catch (error: any) {
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
        <CardTitle className="text-lg">Forget Password</CardTitle>
      </CardHeader>
      <CardContent className="container">
        <Form {...form}>
          <form
            method="post"
            onSubmit={form.handleSubmit(onSubmitHandler)}
            className="mb-7 space-y-0 text-input"
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
            <Button
              type="submit"
              className="w-full disabled:bg-green-200"
              style={{ marginTop: "1.25rem" }}
            >
              Request reset link
            </Button>
          </form>
        </Form>
        <div className="w-full text-center">
          <p className="text-secondary">
            Already Know? {""}
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
