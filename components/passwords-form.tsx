"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addPassword } from "@/lib/_actions";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "nextjs-toploader/app";
import * as Generator from "generate-password";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  website: z.url({
    message: "Please enter a valid URL.",
  }),
  username: z.string().min(1, {
    message: "Username is required.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

interface PasswordFormProps {
  onAdded?: () => void;
}

export function PasswordForm({ onAdded }: PasswordFormProps) {
  const router = useRouter();
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      website: "",
      username: "",
      password: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (user) {
      addPassword(data, user?.id);
      form.reset();
      toast.success("Password secured successfully!");
      onAdded?.();
      router.refresh();
    }
  }

  function genPass() {
    const password = Generator.generate({
      length: 12,
      numbers: true,
      symbols: true,
      strict: true,
    });
    form.setValue("password", password);
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Secure Your Passwords</CardTitle>
        <CardDescription>
          Ensure you follow best practices for password management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
                  <FormControl>
                    <Input placeholder="Website URL" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Username</FormLabel>
                  <FormControl>
                    <Input placeholder="Username" {...field} />
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
                    <Input placeholder="Password" {...field} />
                  </FormControl>
                  <FormMessage />
                  <Button
                    type="button"
                    size={"sm"}
                    variant={"link"}
                    className="w-fit text-xs justify-self-end"
                    onClick={() => {
                      genPass();
                    }}
                  >
                    Generate Password
                  </Button>
                </FormItem>
              )}
            />
            {!form.formState.isSubmitting && (
              <Button type="submit">Secure Password</Button>
            )}
            {form.formState.isSubmitting && (
              <Button disabled className="cursor-progress">
                <Loader2Icon className="animate-spin" />
                Secure Password
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
