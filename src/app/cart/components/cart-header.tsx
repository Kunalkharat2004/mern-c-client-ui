import { Badge } from "@/components/ui/badge";
import { ShoppingCart } from "lucide-react";
import React from "react";

interface CartHeaderProps {
  itemCount: number;
}

const CartHeader: React.FC<CartHeaderProps> = ({ itemCount }) => {
  return (
    <div className="flex items-center gap-3 mb-8">
      <ShoppingCart className="h-7 w-7 text-primary" />
      <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
        Your Shopping Cart
      </h1>
      <Badge
        variant="secondary"
        className="ml-4 px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full"
      >
        {itemCount} {itemCount === 1 ? "item" : "items"}
      </Badge>
    </div>
  );
};

export default CartHeader;
