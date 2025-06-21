"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { verifyCouponCode } from "@/lib/http/api";
import { useAppSelector } from "@/lib/store/hooks";
import { Coupon, CouponResponse } from "@/lib/types";
import { getFinalTotal } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import React, { useMemo, useState, useEffect } from "react";
import Confetti from "react-confetti";
import { CheckCircle, XCircle, Tag, Loader2, Sparkles } from "lucide-react";

interface OrderSummaryProps {
  isLoading?: boolean;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ isLoading = false }) => {
  const [discountPercentage, setDiscountPercentage] = useState(0);
  const [discountError, setDiscountError] = useState("");
  const [discountSuccess, setDiscountSuccess] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [windowDimension, setWindowDimension] = useState({
    width: 0,
    height: 0,
  });
  const [appliedCouponCode, setAppliedCouponCode] = useState("");
  const [couponStatus, setCouponStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  const couponCodeRef = React.useRef<HTMLInputElement>(null);
  const products = useAppSelector((state) => state.cart.cartItems);
  const searchParams = useSearchParams();

  // Get window dimensions for confetti
  useEffect(() => {
    const detectSize = () => {
      setWindowDimension({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    detectSize();
    window.addEventListener("resize", detectSize);
    return () => window.removeEventListener("resize", detectSize);
  }, []);

  // Handle confetti display
  useEffect(() => {
    if (showConfetti) {
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);

  const subtotal = useMemo(() => {
    return getFinalTotal(products);
  }, [products]);

  const deliveryCharges = subtotal >= 500 ? 0 : 20;

  const discountAmount = useMemo(() => {
    return Math.round((subtotal * discountPercentage) / 100);
  }, [subtotal, discountPercentage]);

  const taxAmount = useMemo(() => {
    const amountAfterDiscount = subtotal - discountAmount;
    return Math.round(amountAfterDiscount * 0.18);
  }, [subtotal, discountAmount]);

  const grandTotalWithoutDiscount = useMemo(() => {
    return subtotal + taxAmount + deliveryCharges;
  }, [subtotal, taxAmount, deliveryCharges]);

  const grandTotalWithDiscount = useMemo(() => {
    return grandTotalWithoutDiscount - discountAmount;
  }, [grandTotalWithoutDiscount, discountAmount]);

  const { mutate, isPending } = useMutation({
    mutationKey: ["apply-coupon"],
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
      };
      return await verifyCouponCode(data).then((res) => res.data);
    },
    onSuccess: (data: CouponResponse) => {
      if (data && data.valid) {
        setCouponStatus("success");
        setDiscountError("");
        setDiscountSuccess(
          `Coupon applied! You saved ₹${Math.round(
            (subtotal * data.discount) / 100
          )}`
        );
        setDiscountPercentage(data.discount);
        setAppliedCouponCode(couponCodeRef.current?.value.trim() || "");
        setShowConfetti(true);

        // Clear the input field
        if (couponCodeRef.current) {
          couponCodeRef.current.value = "";
        }
        return;
      } else if (data && data.exp) {
        setCouponStatus("error");
        setDiscountError("Coupon code has expired.");
        setDiscountSuccess("");
        setDiscountPercentage(0);
        return;
      }
    },
    onError: () => {
      setCouponStatus("error");
      setDiscountError("Invalid or expired coupon code");
      setDiscountSuccess("");
      setDiscountPercentage(0);
    },
  });

  const handleCouponValidation = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!couponCodeRef.current?.value.trim()) {
      setCouponStatus("error");
      setDiscountError("Please enter a coupon code");
      return;
    }

    setCouponStatus("loading");
    setDiscountError("");
    setDiscountSuccess("");
    mutate();
  };

  const removeCoupon = () => {
    setDiscountPercentage(0);
    setDiscountSuccess("");
    setDiscountError("");
    setAppliedCouponCode("");
    setCouponStatus("idle");
  };

  return (
    <>
      {showConfetti && (
        <Confetti
          width={windowDimension.width}
          height={windowDimension.height}
          recycle={false}
          numberOfPieces={500}
          gravity={0.7}
        />
      )}

      <div className="lg:w-1/3">
        <Card className="sticky top-8 shadow-xl border border-gray-200 rounded-xl overflow-hidden">
          <CardHeader className="border-b border-gray-200">
            <CardTitle className="text-2xl font-semibold text-gray-800 flex items-center gap-2">
              Order Summary
            </CardTitle>
          </CardHeader>

          <CardContent className="p-6 space-y-6">
            {/* Pricing Details */}
            <div className="space-y-4">
              <div className="flex justify-between text-base text-gray-700">
                <span>Subtotal</span>
                <span className="font-semibold">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-base text-gray-700">
                <span>Tax (18%)</span>
                <span className="font-semibold">₹{taxAmount}</span>
              </div>
              <div className="flex justify-between text-base text-gray-700">
                <span>Delivery charges</span>
                <span className="font-semibold">₹{deliveryCharges}</span>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between text-base text-green-600 bg-green-50 px-3 py-2 rounded-lg">
                  <span className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4" />
                    Discount ({discountPercentage}%)
                  </span>
                  <span className="font-semibold">-₹{discountAmount}</span>
                </div>
              )}
            </div>

            {/* Applied Coupon Display */}
            {appliedCouponCode && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="text-sm font-semibold text-green-800">
                        Coupon Applied: {appliedCouponCode.toUpperCase()}
                      </p>
                      <p className="text-xs text-green-600">
                        You saved ₹{discountAmount}!
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={removeCoupon}
                    className="text-green-700 hover:text-green-800 hover:bg-green-100 cursor-pointer"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            )}

            {/* Coupon Input Section */}
            {!appliedCouponCode && (
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <div className="relative">
                      <Tag className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        id="coupon"
                        name="code"
                        type="text"
                        className="pl-10 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all duration-200"
                        placeholder="Enter coupon code"
                        ref={couponCodeRef}
                        aria-label="Enter coupon code"
                        disabled={isPending}
                      />
                    </div>
                  </div>
                  <Button
                    variant={"outline"}
                    onClick={handleCouponValidation}
                    disabled={isPending}
                    className="px-6 py-3 cursor-pointer font-semibold rounded-lg transition-all duration-200 disabled:opacity-50"
                  >
                    {isPending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Applying...
                      </>
                    ) : (
                      "Apply"
                    )}
                  </Button>
                </div>

                {/* Success Message */}
                {couponStatus === "success" && discountSuccess && (
                  <Alert className="border-green-200 bg-green-50">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <AlertDescription className="text-green-800 font-medium">
                      {discountSuccess}
                    </AlertDescription>
                  </Alert>
                )}

                {/* Error Message */}
                {couponStatus === "error" && discountError && (
                  <Alert className="border-red-200 bg-red-50">
                    <XCircle className="h-4 w-4 text-red-600" />
                    <AlertDescription className="text-red-800 font-medium">
                      {discountError}
                    </AlertDescription>
                  </Alert>
                )}
              </div>
            )}

            <Separator className="bg-gray-200 my-6" />

            {/* Total Section */}
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between items-center">
                <span className="text-xl font-semibold">Total</span>
                <div className="text-right">
                  {discountPercentage > 0 ? (
                    <>
                      <span className="text-sm text-gray-500 line-through">
                        ₹{grandTotalWithoutDiscount}
                      </span>
                      <div className="text-xl font-semibold text-green-600">
                        ₹{grandTotalWithDiscount}
                      </div>
                    </>
                  ) : (
                    <div className="text-xl font-bold text-gray-800">
                      ₹{grandTotalWithoutDiscount}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <div className="pt-4">
              <Button
                disabled={isLoading}
                className="w-full h-12 cursor-pointer text-lg font-bold bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary text-white rounded-xl shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Place Order"
                )}
              </Button>
            </div>

            {/* Additional Info */}
            <div className="pt-4 space-y-3 border-t border-gray-100">
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-lg">🚚</span>
                <span>Free delivery on orders above ₹500</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-lg">🔒</span>
                <span>Secure checkout guaranteed</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-gray-600">
                <span className="text-lg">🎁</span>
                <span>Apply coupons for extra savings</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default OrderSummary;
