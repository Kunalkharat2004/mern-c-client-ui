import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SearchParamsProps } from "@/lib/types";
import { CircleCheck, CircleX, LayoutDashboard, Store } from "lucide-react";
import Link from "next/link";
import CartCleaner from "../checkout/components/cart-cleaner";

const PaymentPage = async ({ searchParams }: SearchParamsProps) => {
  const { success, orderId, restaurantId } = await searchParams;
  const isSuccess = success === "true";

  return (
    <>
      {isSuccess && <CartCleaner />}
      <div className="flex flex-col items-center justify-center gap-4 w-full mt-12">
        {isSuccess ? (
          <>
            <CircleCheck size={80} className="text-green-500" />
            <h1 className="text-2xl font-bold text-center">
              Order Placed Successfully!
            </h1>
            <p className="text-base font-semibold -mt-2">
              Thank you for your order
            </p>
          </>
        ) : (
          <>
            <CircleX size={80} className="text-red-500" />
            <h1 className="text-2xl font-bold text-center">Payment Failed!</h1>
            <p className="text-base font-semibold -mt-2">Please try again.</p>
          </>
        )}

        {isSuccess && (
          <Card className="mt-6 w-full max-w-md p-6">
            <CardHeader className="p-2">
              <CardTitle className="flex items-center justify-between text-lg gap-12">
                <div className="flex items-center gap-3">
                  <Store size={35} className="text-primary" />
                  <p>Your order information</p>
                </div>
                <Badge className="text-base" variant="secondary">
                  Confirmed
                </Badge>
              </CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <LayoutDashboard size={20} />
                <p className="text-base font-medium">Order ID:</p>
                <Link href={`/order-status/${orderId}`}>
                  <span className="text-primary hover:underline">
                    {orderId}
                  </span>
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <LayoutDashboard size={20} />
                <p className="text-base font-medium">Payment Status:</p>
                <span>Paid</span>
              </div>
            </CardContent>
          </Card>
        )}
        <div>
          {isSuccess ? (
            <>
              <div className="flex items-center justify-center gap-4">
                <Button 
                asChild className="mt-4">
                <Link href={`/?restaurantId=${restaurantId}`}>
                    Go to Home
                </Link>
              </Button>
              <Button 
              variant="outline"
              asChild className="mt-4">
                <Link href={"/checkout"}>Go to order status</Link>
              </Button>
              </div>
            </>
          ) : (
            <>
              <Button asChild className="mt-4">
                <Link href={`/checkout?restaurantId=${restaurantId}`}>
                  Try again
                </Link>
              </Button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default PaymentPage;
