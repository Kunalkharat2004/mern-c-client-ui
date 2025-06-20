"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroupItem } from "@/components/ui/radio-group";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { MapPin, Phone, Home, Building, MapPinIcon } from "lucide-react";
import React from "react";

interface Address {
  label: "Home" | "Work" | "Other";
  text: string;
  city: string;
  postalCode: string;
  phone: string;
  isDefault: boolean;
}

interface AddressCardProps {
  address: Address;
  selected: boolean;
  value: string;
}

const AddressCard = ({ address, selected, value }: AddressCardProps) => {
  const getIcon = (label: string) => {
    switch (label) {
      case "Home":
        return <Home className="h-5 w-5 text-primary" />;
      case "Work":
        return <Building className="h-5 w-5 text-green-600" />;
      default:
        return <MapPinIcon className="h-5 w-5 text-orange-600" />;
    }
  };

  const getLabelColor = (label: string) => {
    switch (label) {
      case "Home":
        return "bg-primary text-white border-primary";
      case "Work":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-orange-100 text-orange-800 border-orange-200";
    }
  };

  return (
    <div className="relative">
      <div className="flex items-start space-x-3">
        <RadioGroupItem
          value={value}
          id={value}
          className="mt-2 text-primary border-2 border-gray-300 focus:border-primary-500"
        />
        <Label htmlFor={value} className="flex-1 cursor-pointer">
          <Card
            className={cn(
              "w-full cursor-pointer transition-all duration-200",
              "bg-white hover:bg-primary/5 hover:border-primary/50",
              "border-2",
              selected ? "border-primary" : "border-gray-100",
              "shadow-sm"
            )}
          >
            <CardContent className="p-5">
              <div className="space-y-4">
                {/* Header with Label and Default Badge */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {getIcon(address.label)}
                    <Badge
                      variant="outline"
                      className={cn(
                        "font-medium",
                        getLabelColor(address.label)
                      )}
                    >
                      {address.label}
                    </Badge>
                  </div>
                  {address.isDefault && (
                    <Badge className="bg-primary text-white text-xs">
                      Default
                    </Badge>
                  )}
                </div>

                {/* Address Details */}
                <div className="space-y-3">
                  {/* Street Address */}
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 mt-0.5 text-gray-500 flex-shrink-0" />
                    <div className="space-y-1">
                      <p className="text-sm font-medium text-gray-800 leading-relaxed">
                        {address.text}
                      </p>
                      <p className="text-sm text-gray-600">
                        {address.city}, {address.postalCode}
                      </p>
                    </div>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-gray-500" />
                    <p className="text-sm text-gray-700 font-medium">
                      {address.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Selection Indicator */}
              {/* {selected && (
                <div className="absolute top-3 right-3">
                  <div className="w-3 h-3 bg-primary rounded-full animate-pulse"></div>
                </div>
              )} */}
            </CardContent>
          </Card>
        </Label>
      </div>
    </div>
  );
};

export default AddressCard;
