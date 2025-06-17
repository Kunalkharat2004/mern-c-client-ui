import { cookies } from "next/headers"

export const getSession = async () => {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    const reponse = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/auth/self`, {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`,
        }
    });

    if(!reponse.ok) {
        return false;
    }
    return reponse.json(); 
}