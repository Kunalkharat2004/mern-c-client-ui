
import { SearchParamsProps } from "@/lib/types";
import OrderList from "./components/orders-list";



async function OrdersPage({searchParams}: SearchParamsProps) {

  const {restaurantId} = await searchParams;
  return(
    <>
      <OrderList restaurantId={restaurantId}/>
    </>
  )
 
}

export default OrdersPage;