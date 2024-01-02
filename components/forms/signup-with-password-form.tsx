"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

// import { signUpWithPassword } from "@/actions/auth";
import { signUpWithPasswordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import type { z } from "zod";

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
import { Icons } from "@/components/icons";
import { PasswordInput } from "@/components/password-input";
import { toast } from "sonner";

type SignUpWithPasswordFormInputs = z.infer<typeof signUpWithPasswordSchema>;

export function SignUpWithPasswordForm(): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<SignUpWithPasswordFormInputs>({
    resolver: zodResolver(signUpWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(formData: SignUpWithPasswordFormInputs): void {
    startTransition(async () => {
      console.log("formData", formData);
      try {
        // const message = await signUpWithPassword(
        //   formData.email,
        //   formData.password
        // );
        let message;

        switch (message as any) {
          case "exists":
            toast.error("User with this email address already exists", {
              description: "If this is you, please sign in instead",
            });
            form.reset();
            break;
          case "success":
            toast.success("Success!", {
              description: "Check your inbox to verify your email address",
            });
            router.push("/signin");
            break;
          default:
            toast.error("Something went wrong", {
              description: "Please try again",
            });
            console.error(message);
        }
      } catch (error) {
        toast.error("Something went wrong", {
          description: "Please try again",
        });
        console.error(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="johnsmith@gmail.com" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
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
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <PasswordInput placeholder="**********" {...field} />
              </FormControl>
              <FormMessage className="pt-2 sm:text-sm" />
            </FormItem>
          )}
        />

        <Button disabled={isPending}>
          {isPending ? (
            <>
              <Icons.spinner
                className="mr-2 h-4 w-4 animate-spin"
                aria-hidden="true"
              />
              <span>Signing up...</span>
            </>
          ) : (
            <span>Continue</span>
          )}
          <span className="sr-only">
            Continue signing up with email and password
          </span>
        </Button>
      </form>
    </Form>
  );
}
