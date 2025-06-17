"use server";

import { cookies } from "next/headers"

export const logout = async () => {
    const cookieStore = await cookies();

    try {
        const accessToken = cookieStore.get("accessToken")?.value;
        const refreshToken = cookieStore.get("refreshToken")?.value;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/auth/logout`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
                Authorization: `Bearer ${accessToken}`,
              cookie: `refreshToken=${refreshToken}`,
            },
          }
        );
        if (!response.ok) {
            return false;
        }
        // Clear cookies from client
        cookieStore.delete("accessToken");
        cookieStore.delete("refreshToken");

        return true;
    } catch {
        return false;
   }
    
}