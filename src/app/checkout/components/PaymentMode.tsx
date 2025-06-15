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
        <RadioGroupItem value={value} id={value} className="text-primary" />
        <Label htmlFor={value} className="w-full">
          <Card
            className={cn(
              "w-full cursor-pointer transition-all duration-200",
              "bg-white hover:bg-primary/5 hover:border-primary/50",
              "border-2",
              selected ? "border-primary" : "border-gray-100",
              "shadow-sm"
            )}
          >
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                {label === "Cash on Delivery" ? (
                  <Coins className="h-5 w-5" />
                ) : (
                  <CreditCard className="h-5 w-5" />
                )}
                <p className="text-sm font-medium text-gray-700">{label}</p>
              </div>
            </CardContent>
          </Card>
        </Label>
      </div>
    </div>
  );
};

export default PaymentMode;
