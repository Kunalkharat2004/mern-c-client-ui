"use server";

import cookie from "cookie";
import { cookies } from "next/headers";

/* eslint-disable @typescript-eslint/no-explicit-any */

export type LoginState = { type: string; message: string };

export default async function login(
  prevState: LoginState,
  formData: FormData
): Promise<LoginState> {
  const email = formData.get("email");
  const password = formData.get("password");

  // Form validation
  if (!email || !password) {
    return {
      type: "error",
      message: "Email and password are required.",
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/auth/login`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      console.error("Login error:", error);
      return {
        type: "error",
        message: error.errors?.[0]?.msg || "Login failed.",
      };
    }

    // Await and get cookie store
    const cookieStore = await cookies();

    // Extract Set-Cookie headers
    const setCookies = response.headers.getSetCookie();
    const accessRaw = setCookies?.find((c) => c.includes("accessToken="));
    const refreshRaw = setCookies?.find((c) => c.includes("refreshToken="));

    if (!accessRaw || !refreshRaw) {
      return { type: "error", message: "Login failed. Tokens missing." };
    }

    // Parse cookies
    const parsedAccess = cookie.parse(accessRaw);
    const parsedRefresh = cookie.parse(refreshRaw);

    // Set accessToken
    cookieStore.set({
      name: "accessToken",
      value: parsedAccess.accessToken as string,
      maxAge: parseInt(parsedAccess["Max-Age"] as string, 10),
      httpOnly: true,
      secure: true,
      path: parsedAccess.Path || "/",
      domain: parsedAccess.Domain,
      sameSite: (parsedAccess.SameSite as "strict" | "lax" | "none") || "lax",
    });

    // Set refreshToken
    cookieStore.set({
      name: "refreshToken",
      value: parsedRefresh.refreshToken as string,
      maxAge: parseInt(parsedRefresh["Max-Age"] as string, 10),
      httpOnly: true,
      secure: true,
      path: parsedRefresh.Path || "/",
      domain: parsedRefresh.Domain,
      sameSite: (parsedAccess.SameSite as "strict" | "lax" | "none") || "lax",
    });

    return { type: "success", message: "Login successful." };
  } catch (err: any) {
    console.error(err);
    return { type: "error", message: err.message };
  }
}
