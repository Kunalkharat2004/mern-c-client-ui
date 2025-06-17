"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // You might not need this if only using PasswordInput
import { Label } from "@/components/ui/label";
import { useFormStatus } from "react-dom";
import login, { LoginState } from "@/lib/actions/login";
import { Loader } from "lucide-react";
import { useActionState } from "react";
import { PasswordInput } from "@/components/ui/password-input";

const initialState: LoginState = { type: "", message: "" };

const LoginButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full cursor-pointer">
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <Loader className="h-4 w-4 animate-spin" />
          <span>Please wait...</span>
        </div>
      ) : (
        "Sign In"
      )}
    </Button>
  );
};

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction] = useActionState(login, initialState);

  // Consider using a more robust client-side redirection or a React Router
  // for navigation. window.location.href can cause full page reloads.
  if (state.type === "success") {
    window.location.href = "/";
  }

  return (
    <form
      action={formAction}
      className={cn("flex flex-col gap-6", className)}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {state.type === "error" ? (
            <span className="text-red-500">{state.message}</span>
          ) : (
            "Enter your email and password to login."
          )}
        </p>
      </div>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            name="email"
            placeholder="m@example.com"
            required
          />
        </div>
        <div className="grid gap-3">
          <div className="flex items-center">
            <Label htmlFor="password">Password</Label>
            <a
              href="#"
              className="ml-auto text-sm underline-offset-4 hover:underline"
            >
              Forgot your password?
            </a>
          </div>
          {/* Use the PasswordInput component here */}
          <PasswordInput id="password" name="password" required />
        </div>
        <LoginButton />
      </div>
      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  );
}
