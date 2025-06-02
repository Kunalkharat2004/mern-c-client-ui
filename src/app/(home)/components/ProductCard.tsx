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
]

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Card className="flex flex-col h-[420px] border-none rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
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
          <DialogTrigger className="bg-orange-200 hover:bg-orange-300 text-orange-500 px-6 py-2 rounded-full shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-150">
            Choose
          </DialogTrigger>
          <DialogContent className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl p-0 overflow-y-auto max-h-[90vh]">
            <div className="flex flex-col md:flex-row h-full">
              <div className="w-full md:w-1/3 bg-white p-4 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-200">
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
              <div className="w-full md:w-2/3 p-4 sm:p-8 flex flex-col justify-between">
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
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4" // Responsive grid and gap
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
                          className="flex flex-col items-center justify-center rounded-md border-2 bg-white p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200 h-full text-center" // Centered content and full height
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
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
