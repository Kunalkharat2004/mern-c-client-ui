import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import OrderStatus from "./components/orderStatus";
import { Separator } from "@/components/ui/separator";
import { Banknote, Coins, LayoutDashboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ParamsProps } from "@/lib/types";
import { cookies } from "next/headers";

const SingleOrderPage = async ({params}:ParamsProps) => {
  const {orderId} = await params;
  const cookieStore = await cookies();

  const fields = "address,paymentMode,paymentStatus"
  const order = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/api/order/${orderId}?fields=${fields}`,{
    headers:{
          Authorization: `Bearer ${cookieStore.get("accessToken")?.value}`
    }
  }).then(res=> res.json());

  console.log("Order from server: ",order);
  if(!order){
    throw new Error("Failed to fetch orders!");
  }

  return (
    <div className="container max-w-5xl mx-auto flex flex-col gap-6 mt-6">
      <Card>
        <CardHeader>
          <CardTitle>Order Status</CardTitle>
          <CardDescription>Track your order status.</CardDescription>
        </CardHeader>
        <CardContent>
          <OrderStatus orderId={order._id}/>
        </CardContent>
      </Card>

      <div className="flex gap-6">
        <Card className="w-1/3">
          <CardHeader className="p-4">
            <CardTitle className="flex items-start text-lg justify-between gap-12">
              Delivery Address
            </CardTitle>
          </CardHeader>
          <Separator />
          <CardContent className="pt-6">
            <h2 className="font-bold capitalize">
              {order.customerId.firstName + " "+ order.customerId.lastName}
            </h2>
            <p className="mt-2 capitalize">{order.address.text}</p>
          </CardContent>
        </Card>

         <Card className="w-2/3">
                    <CardHeader className="p-4">
                        <CardTitle className="flex items-start text-lg justify-between gap-12">
                            Your order information
                        </CardTitle>
                    </CardHeader>
                    <Separator />
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-2">
                            <LayoutDashboard size={20} />
                            <h2 className="text-base font-medium">Order Id: </h2>
                            <span>#{order._id}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <Banknote />
                            <h2 className="text-base font-medium">Payment status: </h2>
                            <span className="capitalize">{order.paymentStatus}</span>
                        </div>

                        <div className="flex items-center gap-2 mt-2">
                            <Coins size={20} />
                            <h2 className="text-base font-medium">Payment method: </h2>
                            <span className="capitalize">{
                            order.paymentMode === "cod"? "Cash On Delivery":"Card"
                            }</span>
                        </div>

                        <Button variant={'destructive'} className="mt-6">
                            Cancel Order
                        </Button>
                    </CardContent>
                </Card>
      </div>
    </div>
  );
};

export default SingleOrderPage;
