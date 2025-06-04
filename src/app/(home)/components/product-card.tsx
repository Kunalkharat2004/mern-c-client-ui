"use client";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Image from "next/image";
import { Product } from "@/lib/types";
import ProductDialog from "./product-dialog";



type ProductProps = {
  product: Product;
};

const ProductCard = ({ product }: ProductProps) => {
  return (
    <Card className="flex flex-col h-[430px] border-none rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <CardHeader className="flex items-center justify-center p-4">
        <div className="relative w-[250px] lg:w-[180px] h-[150px] flex items-center justify-center overflow-hidden rounded-xl">
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
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
          <span className="text-lg font-bold text-primary">₹{199}</span>
        </p>

        <ProductDialog product={ product} />
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
