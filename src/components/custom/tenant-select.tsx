"use client";
import React from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation"; // Import usePathname
import { Tenant } from "@/lib/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const TenantSelect = ({ restaurants }: { restaurants: { data: Tenant[] } }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleValueChange = (value: string) => {
    router.push(`/?restaurantId=${value}`);
  };

  // Determine the currently selected value for the Select component
  // If on /cart page, set to empty string to display placeholder
  const selectedValue = searchParams.get("restaurantId") || "";

  console.log("Selected Value:", selectedValue);
  return (
    <Select
      onValueChange={handleValueChange}
      value={selectedValue} // Use 'value' instead of 'defaultValue'
    >
      <SelectTrigger className="w-[180px] focus:ring-0">
        <SelectValue placeholder="Select Restaurant" />
      </SelectTrigger>
      <SelectContent>
        {restaurants.data.map((restaurant) => {
          return (
            <SelectItem key={restaurant.id} value={String(restaurant.id)}>
              {restaurant.name}
            </SelectItem>
          );
        })}
      </SelectContent>
    </Select>
  );
};

export default TenantSelect;
