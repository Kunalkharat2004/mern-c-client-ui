"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { Coins, CreditCard } from "lucide-react";
import React from "react";

interface PaymentModeProps {
  label: string;
  value: string;
  selected: boolean;
}

const PaymentMode = ({ label, value, selected }: PaymentModeProps) => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value={value}
          id={value}
          className="hidden mt-2 text-primary border-2 border-gray-300 focus:border-primary-500"
        />
        <Label htmlFor={value} className="flex-1 cursor-pointer">
          <Card
            className={cn(
              "w-full cursor-pointer",
              "bg-white hover:bg-primary/5 hover:border-primary/50",
              "border-2",
              selected ? "border-primary" : "border-gray-100",
              "shadow-sm"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {label === "Cash on Delivery" ? (
                  <Coins
                    className={cn(
                      "h-5 w-5",
                      selected ? "text-primary" : "text-gray-600"
                    )}
                  />
                ) : (
                  <CreditCard
                    className={cn(
                      "h-5 w-5",
                      selected ? "text-primary" : "text-gray-600"
                    )}
                  />
                )}
                <p
                  className={cn(
                    "text-sm font-medium",
                    selected ? "text-primary" : "text-gray-700"
                  )}
                >
                  {label}
                </p>
              </div>
            </CardContent>
          </Card>
        </Label>
      </div>
    </div>
  );
};

export default PaymentMode;
