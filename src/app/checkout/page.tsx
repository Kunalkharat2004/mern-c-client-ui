// app/checkout/page.tsx   (or wherever your CheckOut lives)
import { getSession } from "@/lib/session";
import CheckOutPage from "./checkout-page";
import { redirect } from "next/navigation";
import { SearchParamsProps } from "@/lib/types";

export type paymentMethodType = {
  key: string;
  label: string;
};

export default async function CheckOut({ searchParams }:SearchParamsProps) {
 const session = await getSession();

  const a = await searchParams;
 const sParams = new URLSearchParams(a);
 const existingQueryString = sParams.toString();

 sParams.append("return-to", `/checkout?${existingQueryString}`);
 console.log("Search Params:", sParams.toString());

 // /login?return-to=/checkout?existingQueryString

 if (!session) {
   redirect(`/login?${sParams}`);
 }

  return (
    <section className="container mx-auto max-w-7xl px-4 py-10 flex flex-col lg:flex-row gap-8">
      <CheckOutPage />
    </section>
  );
}
