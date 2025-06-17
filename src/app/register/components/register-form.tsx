"use client";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // You might not need to import Input directly if only using PasswordInput
import { Label } from "@/components/ui/label";
import { useActionState } from "react";
import { register, RegisterState } from "@/lib/actions/register";
import { Textarea } from "@/components/ui/textarea";
import { PasswordInput } from "@/components/ui/password-input"; // Import your new component
import { useFormStatus } from "react-dom";
import { Loader } from "lucide-react";

const initialState: RegisterState = { type: "", message: "" };

const RegisterButton = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} type="submit" className="w-full cursor-pointer">
      {pending ? (
        <div className="flex items-center justify-center gap-2">
          <Loader className="h-4 w-4 animate-spin" />
          <span>Please wait...</span>
        </div>
      ) : (
        "Sign Up"
      )}
    </Button>
  );
};
export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [state, formAction] = useActionState(register, initialState);
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
        <h1 className="text-2xl font-bold">Register account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          {state.type === "error" ? (
            <span className="text-red-500">{state.message}</span>
          ) : (
            "Enter your details to create a new account."
          )}
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label
            htmlFor="firstName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            First Name
          </Label>
          <Input
            id="firstName"
            name="firstName"
            autoComplete="given-name"
            type="text"
            placeholder="Enter your first name"
            className="focus:border-primary focus:ring-primary"
          />
        </div>
        <div>
          <Label
            htmlFor="lastName"
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Last Name
          </Label>
          <Input
            id="lastName"
            name="lastName"
            autoComplete="family-name"
            type="text"
            placeholder="Enter your last name"
            className="focus:border-primary focus:ring-primary"
          />
        </div>
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
          {/* Use the new PasswordInput component here */}
          <PasswordInput id="password" name="password" required />
        </div>
        <div className="w-full space-y-3">
          <Label
            htmlFor="address"
            className="text-sm font-medium text-gray-700"
          >
            Address
          </Label>
          <Textarea
            draggable="false"
            placeholder="Your address here..."
            id="address"
            name="address"
            className="focus:border-primary focus:ring-primary"
          />
        </div>
        <RegisterButton />
      </div>
      <div className="text-center text-sm">
        Already have an account?{" "}
        <a href="#" className="underline underline-offset-4">
          Sign In
        </a>
      </div>
    </form>
  );
}
