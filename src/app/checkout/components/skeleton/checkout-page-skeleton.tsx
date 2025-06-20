"use client";

import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutPageSkeleton: React.FC = () => {
  return (
    <>
      <div className="w-full lg:w-2/3">
        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-semibold text-gray-800">
              Customer Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-8 pt-8">
            {/* Name Fields Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  First Name
                </Label>
                <Skeleton className="h-11 w-full" />
              </div>
              <div className="space-y-2">
                <Label className="text-sm font-semibold text-gray-700">
                  Last Name
                </Label>
                <Skeleton className="h-11 w-full" />
              </div>
            </div>

            {/* Email Skeleton */}
            <div className="space-y-2">
              <Label className="text-sm font-semibold text-gray-700">
                Email Address
              </Label>
              <Skeleton className="h-11 w-full" />
            </div>

            {/* Delivery Address Section Skeleton */}
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <Label className="text-lg font-semibold text-gray-800">
                  Delivery Address
                </Label>
                <Skeleton className="h-10 w-32" />
              </div>

              {/* Address Cards Skeleton */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-3">
                      <Skeleton className="w-4 h-4 rounded-full mt-2" />
                      <Card className="w-full border-2 border-gray-100 shadow-sm">
                        <CardContent className="p-5">
                          <div className="space-y-4">
                            {/* Header with Label and Default Badge */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <Skeleton className="h-5 w-5" />
                                <Skeleton className="h-6 w-16" />
                              </div>
                              {index === 1 && <Skeleton className="h-5 w-12" />}
                            </div>

                            {/* Address Details */}
                            <div className="space-y-3">
                              {/* Street Address */}
                              <div className="flex items-start gap-2">
                                <Skeleton className="h-4 w-4 mt-0.5" />
                                <div className="space-y-2 flex-1">
                                  <Skeleton className="h-4 w-full" />
                                  <Skeleton className="h-4 w-3/4" />
                                </div>
                              </div>

                              {/* Phone Number */}
                              <div className="flex items-center gap-2">
                                <Skeleton className="h-4 w-4" />
                                <Skeleton className="h-4 w-24" />
                              </div>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Payment Method Section Skeleton */}
            <div className="space-y-6">
              <Label className="text-lg font-semibold text-gray-800">
                Payment Method
              </Label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2].map((index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-3">
                      <Skeleton className="w-4 h-4 rounded-full mt-2" />
                      <Card className="w-full border-2 border-gray-100 shadow-sm">
                        <CardContent className="p-4">
                          <div className="flex items-center gap-3">
                            <Skeleton className="h-6 w-6" />
                            <Skeleton className="h-5 w-32" />
                          </div>
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>

          <CardFooter className="border-t bg-gray-50">
            <div className="w-full space-y-3">
              <Label className="text-sm font-semibold text-gray-700">
                Additional Comments
              </Label>
              <Skeleton className="h-20 w-full" />
            </div>
          </CardFooter>
        </Card>
      </div>

      {/* Order Summary Skeleton */}
      <OrderSummarySkeleton />
    </>
  );
};

const OrderSummarySkeleton: React.FC = () => {
  return (
    <div className="w-full lg:w-1/3">
      <Card className="border-2 shadow-lg sticky top-4">
        <CardHeader className="border-b bg-gray-50">
          <CardTitle className="text-xl font-semibold text-gray-800">
            Order Summary
          </CardTitle>
        </CardHeader>

        <CardContent className="p-6 space-y-4">
          {/* Subtotal */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-4 w-12" />
          </div>

          {/* Tax */}
          <div className="flex justify-between items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-10" />
          </div>

          <div className="border-t pt-4">
            <div className="flex justify-between items-center font-semibold text-lg">
              <Skeleton className="h-5 w-12" />
              <Skeleton className="h-5 w-16" />
            </div>
          </div>

          {/* Checkout Button */}
          <Skeleton className="h-12 w-full mt-6" />

          {/* Features */}
          <div className="space-y-3 pt-4 border-t">
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-48" />
            </div>
            <div className="flex items-center gap-3">
              <Skeleton className="h-5 w-5" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CheckoutPageSkeleton;
