"use client";

import * as React from "react";
import { useRouter } from "next/navigation";

// import { checkIfEmailVerified } from "@/actions/email";
// import { getUserByEmail } from "@/actions/user";
import { signInWithPasswordSchema } from "@/lib/validations/auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
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

type SignInWithPasswordFormInputs = z.infer<typeof signInWithPasswordSchema>;

export function SignInWithPasswordForm(): JSX.Element {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  const form = useForm<SignInWithPasswordFormInputs>({
    resolver: zodResolver(signInWithPasswordSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(formData: SignInWithPasswordFormInputs) {
    startTransition(async () => {
      try {
        // const user = await getUserByEmail(formData.email);
        let user;
        if (!user) {
          toast.warning("First things first", {
            description: "Please make sure you are signed up before signing in",
          });

          return;
        }

        console.log("user", user);

        // const emailVerified = await checkIfEmailVerified(formData.email);
        // if (!emailVerified) {
        //   toast.warning("First things first", {
        //     description: "Please verify your email address before sign in",
        //   });
        //   return;
        // }

        const signInResponse = await signIn("credentials", {
          email: formData.email,
          password: formData.password,
          redirect: false,
        });

        if (signInResponse?.ok) {
          toast.success("Success!", { description: "You are now signed in" });
          router.push("/");
          router.refresh();
        } else {
          toast.error("Invalid email or password", {
            description: "Please check your credentials and try again",
          });
        }
      } catch (error) {
        toast("Something went wrong", {
          description: "Please try again",
        });
        console.error(error);
      }
    });
  }

  return (
    <Form {...form}>
      <form
        className="grid w-full gap-4"
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="johnsmith@gmail.com"
                  {...field}
                />
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
                <PasswordInput placeholder="********" {...field} />
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
              <span>Signing in...</span>
            </>
          ) : (
            <span>Sign in</span>
          )}
          <span className="sr-only">Sign in with email and password</span>
        </Button>
      </form>
    </Form>
  );
}
