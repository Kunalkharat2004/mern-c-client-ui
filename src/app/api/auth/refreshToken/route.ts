import { cookies } from "next/headers";
import cookie from "cookie";

export async function GET() {
  const cookieStore = await cookies();
  let accessToken = cookieStore.get("accessToken")?.value;
  let refreshToken = cookieStore.get("refreshToken")?.value;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/auth/refresh`,
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
    console.error("Failed to refresh tokens");
    return;
  }
  // If we come here it means the refresh was successful and the backend has send the cookies
  const cookiesHeader = response.headers.getSetCookie();
  if (!cookiesHeader) {
    console.error("No cookies received from the backend");
    return;
  }
  accessToken = cookiesHeader.find((cookie) => cookie.includes("accessToken"));
  refreshToken = cookiesHeader.find((cookie) =>
    cookie.includes("refreshToken")
  );

  const parsedAccessToken = cookie.parse(accessToken || "");
  const parsedRefreshToken = cookie.parse(refreshToken || "");

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
      (parsedRefreshToken.SameSite as "strict" | "lax" | "none") || "lax",
  });
  return Response.json({
    success: true
  })
}
