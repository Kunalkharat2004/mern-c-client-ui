import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";

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
        <p className="text-gray-600 text-sm lg:text-md mt-2 line-clamp-3">
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
        <Button className="bg-orange-200 hover:bg-orange-300 text-orange-600 px-6 py-2 rounded-full cursor-pointer shadow hover:shadow-lg outline-none focus:outline-none ease-linear transition-all duration-200">
          Choose
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
