"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import Image from "next/image";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import ToppingList from "./topping-list";

export type Product = {
  _id: string;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
};

type ProductProps = {
  product: Product;
};

const sizes = [
  {
    value: "small",
    label: "Small",
    priceModifier: 0.8,
  },
  {
    value: "medium",
    label: "Medium",
    priceModifier: 1,
  },
  {
    value: "large",
    label: "Large",
    priceModifier: 1.2,
  },
];

const crusts = [
  {
    value: "thin",
    label: "Thin Crust",
    priceModifier: 0,
  },
  {
    value: "thick",
    label: "Thick Crust",
    priceModifier: 1.1,
  },
  {
    value: "stuffed",
    label: "Stuffed Crust",
    priceModifier: 1.3,
  },
];

const toppings = [
  {
    id: "1",
    name: "Extra Cheese",
    price: 20,
    image: "/homePageIcons/toppings/cheese.png",
  },
  {
    id: "2",
    name: "Chicken",
    price: 30,
    image: "/homePageIcons/toppings/raw-chicken-pieces.jpg",
  },
  {
    id: "3",
    name: "Jalapeños",
    price: 15,
    image: "/homePageIcons/toppings/jalapaeno.jpg",
  },
];

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Card className="flex flex-col h-[430px] border-none rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="flex items-center justify-center">
        <Image
          width={150}
          height={150}
          src={product.image}
          alt={product.name}
          className="rounded-xl object-cover"
        />
      </CardHeader>

      <CardContent className="flex-grow p-4">
        <h2 className="font-semibold text-lg lg:text-xl truncate">
          {product.name}
        </h2>
        <p className="text-gray-600 text-sm lg:text-md mt-2 line-clamp-2">
          {product.description}
        </p>
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <p>
          <span className="text-md font-semibold">From: </span>
          <span className="text-lg font-bold text-primary">
            ₹{product.price.toFixed(2)}
          </span>
        </p>

        <Dialog>
          <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150 cursor-pointer">
            Choose
          </DialogTrigger>

          {/*
            Remove `overflow-y-auto` from DialogContent.
            Keep `p-0` so we can control inner scrolling manually.
          */}
          <DialogContent className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl p-0">
            {/*
              Give the wrapper a fixed max-height (e.g. 90vh) so nothing ever grows beyond the viewport,
              and display as flex row on md+ screens, flex column on smaller.
            */}
            <div className="flex flex-col md:flex-row h-[90vh]">
              {/*
                Left pane: make it “sticky top-0” so it never scrolls offscreen.
                On md+ it’s width 1/3; on smaller screens it’s full-width.
              */}
              <div className="w-full md:w-1/3 bg-white p-4 sm:p-8 border-b md:border-b-0 md:border-r border-gray-200 sticky top-0">
                <div className="relative w-full h-48 sm:h-64 md:h-full flex items-center justify-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    style={{ objectFit: "contain" }}
                    className="rounded-xl"
                  />
                </div>
              </div>

              {/*
                Right pane: give it padding and let it overflow-scroll if its content is tall.
                We set h-full so it’s as tall as the flex container, and overflow-y-auto for scrolling.
              */}
              <div className="w-full md:w-2/3 p-4 sm:p-8 flex flex-col justify-between h-full overflow-y-auto">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold mb-2">
                    {product.name}
                  </h3>
                  <p className="text-sm sm:text-base text-gray-700 mt-1">
                    {product.description}
                  </p>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3">
                    Choose the size
                  </h4>
                  <RadioGroup
                    defaultValue="small"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                  >
                    {sizes.map((size) => (
                      <div key={size.value}>
                        <RadioGroupItem
                          value={size.value}
                          id={size.value}
                          className="peer sr-only"
                          aria-label={size.label}
                        />
                        <Label
                          htmlFor={size.value}
                          className="flex flex-col items-center justify-center rounded-md border-2 bg-white p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200 h-full text-center"
                        >
                          <span className="text-sm sm:text-base font-semibold">
                            {size.label}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-700 mt-1">
                            ₹{(product.price * size.priceModifier).toFixed(2)}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="mt-6">
                  <h4 className="text-lg font-semibold mb-3">
                    Choose the crust
                  </h4>
                  <RadioGroup
                    defaultValue="thin"
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                  >
                    {crusts.map((crust) => (
                      <div key={crust.value}>
                        <RadioGroupItem
                          value={crust.value}
                          id={crust.value}
                          className="peer sr-only"
                          aria-label={crust.label}
                        />
                        <Label
                          htmlFor={crust.value}
                          className="flex flex-col items-center justify-center rounded-md border-2 bg-white p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200 h-full text-center"
                        >
                          <span className="text-sm sm:text-base font-semibold">
                            {crust.label}
                          </span>
                          <span className="text-xs sm:text-sm text-gray-700 mt-1">
                            ₹{(product.price * crust.priceModifier).toFixed(2)}
                          </span>
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div className="mt-6">
                  <ToppingList toppings={toppings} />
                </div>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
