"use client";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardTitle, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { verifyCouponCode } from '@/lib/http/api';
import { useAppSelector } from '@/lib/store/hooks';
import { Coupon, CouponResponse } from '@/lib/types';
import { getFinalTotal } from '@/lib/utils';
import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useMemo, useState } from 'react'

interface OrderSummaryProps {
  isLoading?: boolean;
}

const OrderSummary: React.FC = ({ isLoading = false }) => {
  
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const couponCodeRef = React.useRef<HTMLInputElement>(null);
  const products = useAppSelector((state) => state.cart.cartItems);

  const searchParams = useSearchParams();

  const subtotal = useMemo(() => {
    return getFinalTotal(products);
  }, [products])
  
  const deliveryCharges = subtotal >= 500 ? 0 : 20; // Free delivery for orders above ₹500

  const discountAmount = useMemo(() => {
    return Math.round((subtotal * discountPercentage) / 100);
  }, [subtotal, discountPercentage]);
  
  const taxAmount = useMemo(() => {
      const amountAfterDiscount = subtotal - discountAmount;
      return Math.round(amountAfterDiscount * 0.18); // 18% tax
  }, [subtotal, discountAmount]);
  
  const grandTotalWithoutDiscount = useMemo(() => {
      return subtotal + taxAmount + deliveryCharges;
  }, [subtotal, taxAmount, deliveryCharges]);
  
  const grandTotalWithDiscount = useMemo(() => {
    return grandTotalWithoutDiscount - discountAmount;
  }, [grandTotalWithoutDiscount, discountAmount]);

  const { mutate} = useMutation({
    mutationKey: ['apply-coupon'],
    mutationFn: async () => {
       if (!couponCodeRef.current) {
         return;
      }
      const couponCode = couponCodeRef.current.value.trim();

      const tenantId = searchParams.get("restaurantId") || "";
      if (!tenantId) {
        return;
      }
      const data: Coupon = {
        code: couponCode,
        tenantId: tenantId,
      }
      return await verifyCouponCode(data).then(res => res.data);
    },
    onSuccess: (data:CouponResponse) => {
      if (data && data.valid) {
        setDiscountError("");
        setDiscountPercentage(data.discount);
        return;
      }
      else if (data && data.exp) {
        setDiscountError("Coupon code has expired.");
        setDiscountPercentage(data.discount);
        return;
      }
    },
    onError: () => {
      setDiscountError("Invalid Coupon");
      setDiscountPercentage(0); // Reset discount percentage on error
      return;
    }
  })

  const handleCouponValidation = (e: React.MouseEvent) => {
    e.preventDefault();
    mutate()
  }
  
  return (
    <div className="lg:w-1/3">
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
              <span className="font-medium">₹{taxAmount}</span>
            </div>
            <div className="flex justify-between text-base text-gray-700">
              <span>Delivery charges</span>
              <span className="font-medium">₹{deliveryCharges}</span>
            </div>
            <div className="flex justify-between text-base text-gray-700">
              <span>Discount</span>
              <span className="font-medium">₹{discountAmount}</span>
            </div>
            {discountError && (
              <div className="text-red-500">{discountError}</div>
            )}
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <label htmlFor="coupon" className="sr-only">
                  Coupon Code
                </label>
                <Input
                  id="coupon"
                  name="code"
                  type="text"
                  className="w-full"
                  placeholder="Enter coupon code"
                  ref={couponCodeRef}
                  aria-label="Enter coupon code"
                />
              </div>
              <Button
                onClick={handleCouponValidation}
                variant={"outline"}
                className="cursor-pointer"
              >
                Apply
              </Button>
            </div>

            <Separator className="bg-gray-200 my-4" />
            <div className="flex justify-between text-xl font-bold text-gray-900">
              <span>Total</span>
              <span className="font-bold flex flex-col items-end">
                <span
                  className={
                    discountPercentage ? "line-through text-gray-400" : ""
                  }
                >
                  ₹{grandTotalWithoutDiscount}
                </span>
                {discountPercentage ? (
                  <span className="text-green-700">
                    ₹{grandTotalWithDiscount}
                  </span>
                ) : null}
              </span>
            </div>
          </div>

          <div className="space-y-3 pt-4">
            <Button
              disabled={isLoading}
              className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out"
            >
              {isLoading ? "Processing..." : " Place Order"}
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