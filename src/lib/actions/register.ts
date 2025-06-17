/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { cookies } from "next/headers";
import cookie from "cookie";

export type RegisterState = {
    type: string;
    message: string;
}

export const register = async (_prevState: RegisterState, formData: FormData) => {
    const firstName = formData.get("firstName");
    const lastName = formData.get("lastName");
    const address = formData.get("address");
    const email = formData.get("email");
    const password = formData.get("password");

    // Form validation
    if (!firstName || !lastName || !email || !password || !address) {
        return {
            type: "error",
            message: "All fields are required.",
        };
    }
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ firstName, lastName, email, password, address }),
        }
      );

      if (!response.ok) {
        const error = await response.json();
        console.error("Registration error:", error);
        return {
          type: "error",
          message: error.errors?.[0]?.msg || "Registration failed.",
        };
      }

      const cookieStore = await cookies();
      const setCookies = response.headers.getSetCookie();
      const accessRaw = setCookies?.find((c) => c.includes("accessToken="));
      const refreshRaw = setCookies?.find((c) => c.includes("refreshToken="));
      if (!accessRaw || !refreshRaw) {
        return {
          type: "error",
          message: "Registration failed. Tokens missing.",
        };
      }
      // Parse cookies
      const parsedAccessToken = cookie.parse(accessRaw);
      const parsedRefreshToken = cookie.parse(refreshRaw);

      // Set accessToken
      cookieStore.set({
        name: "accessToken",
        value: parsedAccessToken.accessToken as string,
        maxAge: parseInt(parsedAccessToken["Max-Age"] as string, 10),
        httpOnly: true,
        secure: true,
        path: parsedAccessToken.Path || "/",
        domain: parsedAccessToken.Domain,
        sameSite:
          (parsedAccessToken.SameSite as "strict" | "lax" | "none") || "lax",
      });

      // Set refreshToken
      cookieStore.set({
        name: "refreshToken",
        value: parsedRefreshToken.refreshToken as string,
        maxAge: parseInt(parsedRefreshToken["Max-Age"] as string, 10),
        httpOnly: true,
        secure: true,
        path: parsedRefreshToken.Path || "/",
        domain: parsedRefreshToken.Domain,
        sameSite:
          (parsedRefreshToken.SameSite as "strict" | "lax" | "none") ||
          "strict",
      });

      return { type: "success", message: "SignUp successful." };
    } catch (err:any) {
        return {
            type: "error",
            message: err.message || "Registration failed.",
        }
    }

}