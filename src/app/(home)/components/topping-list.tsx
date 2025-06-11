import React, { useEffect } from "react";
import ToppingCard from "./topping-card";
import { Topping } from "@/lib/types";

const ToppingList = ({
  selectedToppings,
  handleToppingSelect,
}: {
  selectedToppings: Topping[];
  handleToppingSelect: (topping: Topping) => void;
}) => {
  const [toppings, setToppings] = React.useState<Topping[]>([]);

  useEffect(() => {
    const fetchToppings = async () => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/api/toppings?tenantId=2adeb26a-266e-4ff4-8b0b-ec79cefdfaf7`
      );
      if (!response.ok) {
        throw new Error("Failed to load toppings");
      }
      const data = await response.json();
      const toppingsData: Topping[] = data.data;
      setToppings(toppingsData);

      console.log("Fetched toppings:", toppingsData);
    };

    fetchToppings();
  }, []);

  return (
    <section className="w-full">
      <div className="mt-6 px-4 sm:px-6 lg:px-0">
        <h4 className="text-lg font-semibold mb-3">Choose the toppings</h4>
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
