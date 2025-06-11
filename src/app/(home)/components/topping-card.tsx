import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { CircleCheckBig } from "lucide-react";
import { Topping } from "@/lib/types";

type ToppingProp = {
    topping: Topping;
    selectedToppings?: Topping[];
    handleToppingSelect?: (topping: Topping) => void;
};

const ToppingCard = ({ topping, selectedToppings, handleToppingSelect }: ToppingProp) => {
  return (
    <Card
      className={cn(
        "cursor-pointer bg-white hover:bg-accent hover:text-accent-foreground shadow-sm",
        selectedToppings?.some((t) => t._id === topping._id)
          ? "border-2 border-primary relative"
          : ""
      )}
      onClick={() => handleToppingSelect && handleToppingSelect(topping)}
    >
      <CardHeader>
        <div className="flex justify-center mb-2">
          <Image
            src={topping.image}
            alt={topping.name}
            width={100}
            height={100}
          />
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm sm:text-base font-semibold text-center lg:text-left">
          {topping.name}
        </p>
        <p className="text-sm sm:text-md text-gray-700 mt-1 text-center lg:text-left">
          &#x20b9;{topping.price}
        </p>
        {selectedToppings?.some((t) => t._id === topping._id) && (
          <CircleCheckBig className="absolute top-2 right-2 text-primary" />
        )}
      </CardContent>
    </Card>
  );
};

export default ToppingCard;
