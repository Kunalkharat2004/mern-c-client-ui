import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import React from 'react'

interface OrderSummaryProps {
  subtotal: number;
  tax: number;
  total: number;
//   onProceedToCheckout: () => void;
//   onContinueShopping: () => void;
}


const OrderSummary: React.FC<OrderSummaryProps> = ({
    subtotal,
    tax,
    total,
}) => {
  return (
    <div className="lg:col-span-1">
      <Card className="sticky top-8 shadow-lg border border-gray-200 rounded-lg">
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Order Summary
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-base text-gray-700">
              <span>Subtotal</span>
              <span className="font-medium">₹{subtotal}</span>
            </div>
            <div className="flex justify-between text-base text-gray-700">
              <span>Tax (18%)</span>
              <span className="font-medium">₹{tax}</span>
            </div>
            <Separator className="bg-gray-200 my-4" />
            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total</span>
              <span>₹{total}</span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">
              Proceed to Checkout
            </Button>
            <Button
              variant="outline"
              className="w-full h-10 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out"
            >
              Continue Shopping
            </Button>
          </div>

          <div className="pt-4 text-sm text-gray-600 space-y-2">
            <p className="flex items-center gap-2">
              <span role="img" aria-label="delivery-truck">
                🚚
              </span>{" "}
              Free delivery on orders above ₹500
            </p>
            <p className="flex items-center gap-2">
              <span role="img" aria-label="lock">
                🔒
              </span>{" "}
              Secure checkout guaranteed
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default OrderSummary