import { getSession } from "@/lib/session";
import CheckOutPage from "./checkout-page";
import { redirect } from "next/navigation";
import { SearchParamsProps } from "../(home)/page";

export type paymentMethodType = {
  key: string;
  label: string;
};
const CheckOut = async ({ searchParams }: SearchParamsProps) => {
  const session = await getSession();
  const {restaurantId} = await searchParams;
  if (!session) {
     if (restaurantId) {
       redirect(`/login?restaurantId=${restaurantId}`);
     } else {
       redirect("/login");
     }
  }
  return (
    <section className="container mx-auto max-w-7xl px-4 py-10 flex flex-col lg:flex-row gap-8">
      <CheckOutPage />
    </section>
  );
};

export default CheckOut;
