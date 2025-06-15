"use client";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { MapPin } from "lucide-react";
import React from "react";

interface AddressCardProps {
  id: string;
  title: string;
  address: string;
  selected: boolean;
}

const AddressCard = ({ id, title, address, selected }: AddressCardProps) => {
  return (
    <div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem value={id} id={id} className="text-primary" />
        <Label htmlFor={id} className="w-full">
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
              <div className="flex items-start gap-3">
                <MapPin className="h-5 w-5 mt-0.5" />
                <div className="space-y-1">
                  <p className="text-sm font-medium text-gray-700">{title}</p>
                  <p className="text-sm text-gray-500">{address}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </Label>
      </div>
    </div>
  );
};

export default AddressCard;
