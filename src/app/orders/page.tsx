
import { SearchParamsProps } from "@/lib/types";
import OrderList from "./components/orders-list";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function OrdersPage({searchParams}: SearchParamsProps) {

  const searchParameters = await searchParams;
  const session = await getSession();
  const sParams = new URLSearchParams(searchParameters);
  const existingQueryString = sParams.toString();
  sParams.append("return-to",`/orders?${existingQueryString}`);

  if(!session){
    redirect(`/login?${sParams}`);
  }
  
  return(
    <>
      <OrderList restaurantId={searchParameters.restaurantId}/>
    </>
  )
 
}

export default OrdersPage;