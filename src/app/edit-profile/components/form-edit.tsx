import * as z from "zod";
import { phoneRegex } from "@/constants/regex";
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

import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { ChangeEvent, useEffect, useState } from "react";
import { AvatarCard } from "./avatar-card";
import { getBase64 } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

export const FormEdit = () => {
  const router = useRouter();
  const { data } = useSession();
  const { user } = useAuth();

  const [loading, setLoading] = useState<boolean>(false);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);

  const normalize = (text: string) => text.replaceAll("\r\n", "\n");

  const formSchema = z.object({
    media: z.any().optional(),
    name: z
      .string()
      .min(1, "Name is required")
      .min(2, "Name must be at least 2 characters."),
    bio: z
      .union([
        z.string().min(1, "Bio is required").max(80, "Bio too long"),
        z.string().length(0),
      ])
      .transform(normalize)
      .optional()
      .or(z.literal("")),

    phone: z
      .union([
        z
          .string()
          .min(1, "Phone is required")
          .regex(phoneRegex, "Invalid Number!"),
        z.string().length(0),
      ])
      .optional()
      .or(z.literal("")),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Email must be a valid email"),
    password: z
      .union([
        z
          .string()
          .min(1, "Password is required")
          .min(6, "Password must be greater than 6 characters"),
        z.string().length(0),
      ])
      .optional()
      .or(z.literal("")),
  });

  const values = {
    name: user?.name || (data?.user?.name as string),
    bio: user?.bio,
    phone: user?.phone,
    email: user?.email || (data?.user?.email as string),
    password: user?.password || "",
    media: user?.media,
  };

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: values,
  });

  useEffect(() => {
    form.setValue(
      "password",
      form.getValues("password") || user?.password || "",
    );
    form.setValue("media", form.getValues("media"));
  }, [form, user]);

  const handleFileChange = async (
    event: ChangeEvent<HTMLInputElement>,
    field: any,
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = await getBase64(event.target.files[0]);
      setAvatarPreview(file as any);
      field.onChange(file);
    }
  };

  const onSubmitHandler: SubmitHandler<z.infer<typeof formSchema>> = async (
    values,
  ) => {
    setLoading(true);
    try {
      const response = await axios.put("/api/edit-profile", values);
      const data = await response.data;
      toast.success(data.msg);
      router.push("/");
    } catch (error: any) {
      console.error(error);
      toast.error(error?.response?.data?.error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user && !data?.user) {
      router.push("/");
    }
  }, [router, user, data?.user]);

  return (
    <Form {...form}>
      <form
        method="post"
        onSubmit={form.handleSubmit(onSubmitHandler)}
        className="space-y-8"
      >
        <FormField
          control={form.control}
          name="media"
          render={({ field }) => (
            <FormItem className="flex items-center gap-5">
              <FormControl>
                <AvatarCard
                  avatar={
                    avatarPreview ||
                    user?.photoURL ||
                    (data?.user?.image as string)
                  }
                  field={field}
                  handleFileChange={handleFileChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter your name..."
                  className="h-14 p-4 sm:max-w-[26rem]"
                  {...field}
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
                <Textarea
                  placeholder="Enter your bio..."
                  {...field}
                  className="resize-none border-border sm:max-w-[26rem]"
                />
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
                  className="h-14 p-4 sm:max-w-[26rem]"
                  {...field}
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
                {data?.user ? (
                  <Input
                    placeholder="Enter your email..."
                    className="h-14 p-4 sm:max-w-[26rem]"
                    {...field}
                    disabled
                    defaultValue={data?.user?.email || ""}
                  />
                ) : (
                  <Input
                    placeholder="Enter your email..."
                    className="h-14 p-4 sm:max-w-[26rem]"
                    {...field}
                  />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {!data?.user && (
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your new password..."
                    type="password"
                    className="h-14 p-4 sm:max-w-[26rem]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}

        <Button type="submit" className="w-20" disabled={loading}>
          Save
        </Button>
      </form>
    </Form>
  );
};
