import React, { useEffect } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";
import { useSearchParams } from "next/navigation";

const ToppingList = ({
  selectedToppings,
  handleToppingSelect,
  categoryId
}: {
  selectedToppings: Topping[];
  handleToppingSelect: (topping: Topping) => void;
  categoryId: string;
}) => {
  const [toppings, setToppings] = React.useState<Topping[]>([]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchToppings = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/api/toppings?tenantId=${searchParams.get("restaurantId")}&categoryId=${categoryId}`,
      );
      if (!response.ok) {
        throw new Error("Failed to load toppings");
      }
      const data = await response.json();
      const toppingsData: Topping[] = data.data;
      setToppings(toppingsData);

    };

    fetchToppings();
  }, [categoryId, searchParams]);

  return (
    <section className="w-full">
      <div className="mt-6 px-4 sm:px-6 lg:px-0">
        {
          toppings.length !== 0 ? (<h4 className="text-lg font-semibold mb-3">Choose the toppings</h4>):""
        }
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {toppings.map((topping) => (
            <ToppingCard
              key={topping._id}
              topping={topping}
              selectedToppings={selectedToppings}
              handleToppingSelect={handleToppingSelect}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ToppingList;
