'use client'

import React from "react";
import ToppingCard from "./topping-card";

export type Topping = {
  id: string;
  name: string;
  price: number;
  image: string;
};

type ToppingProps = {
  toppings: Topping[];
};

const ToppingList = ({ toppings }: ToppingProps) => {

  const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([toppings[0]]);

  const handleToppingSelect = (topping: Topping) => {
    setSelectedToppings((prev) =>
      prev.includes(topping)
        ? prev.filter((t) => t.id !== topping.id)
        : [...prev, topping]
    );
  };
  return (
    <section className="w-full">
      <div className="mt-6 px-4 sm:px-6 lg:px-0">
        <h4 className="text-lg font-semibold mb-3">Choose the toppings</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
          {toppings.map((topping) => (
            <ToppingCard
              key={topping.id}
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
