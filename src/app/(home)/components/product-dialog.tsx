/* eslint-disable @typescript-eslint/no-unused-vars */
import { primaryButtonClasses } from '@/app/lib/button-styles';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import Image from 'next/image';
import React from 'react'
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ShoppingCart } from 'lucide-react';
import { Product } from '@/lib/types';
import ToppingList from './topping-list';

type ProductProps = {
  product: Product;
};

const ProductDialog = ({ product }: ProductProps) => {

  const handleAddToCart = (product: Product) => {
    console.log("Adding to cart:", product);
  }

    
  return (
    <Dialog>
      <DialogTrigger className={primaryButtonClasses}>Choose</DialogTrigger>
      <DialogContent className="max-w-xs sm:max-w-xl md:max-w-3xl lg:max-w-4xl p-0">
        <div className="flex flex-col md:flex-row h-[90vh]">
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
          <div className="w-full md:w-2/3 p-4 sm:p-8 flex flex-col justify-between h-full overflow-y-auto">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold mb-2">
                {product.name}
              </h3>
              <p className="text-sm sm:text-base text-gray-700 mt-1">
                {product.description}
              </p>
            </div>

            {
              Object.entries(product.category.priceConfiguration)
                .sort(([keyA,valueA],[keyB,valueB]) => {
                  if (
                    valueA.priceType === "base" &&
                    valueB.priceType === "additional"
                  )
                    return -1; // valueA (base) comes before valueB (additional)
                  else if (
                    valueA.priceType === "additional" &&
                    valueB.priceType === "base"
                  )
                    return 1; // valueA (additional) comes after valueB (base)
                  else return 0;
                })
                .map(([key, value]) => {
                return (
                  <div key={key} className="mt-6">
                    <h4 className="text-lg font-semibold mb-3">
                      Choose the {key}
                    </h4>
                    <RadioGroup
                      defaultValue={value.availableOptions[0]}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                    >
                      {value.availableOptions.map((option:string) => (
                        <div key={option}>
                          <RadioGroupItem
                            value={option}
                            id={option}
                            className="peer sr-only"
                            aria-label={option}
                          />
                          <Label
                            htmlFor={option}
                            className="flex flex-col items-center justify-center rounded-md border-2 bg-white p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer transition-colors duration-200 h-full text-center"
                          >
                            <span className="text-sm sm:text-base font-semibold">
                              {option}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-700 mt-1">
                              ₹{199}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                );
              })
            }

            <div className="mt-6">
              <ToppingList />
            </div>

            <div className="flex items-center justify-between mt-8 lg:mt-12">
              <p className="text-sm sm:text-base font-semibold mt-1">
                Total Price:{" "}
                <span className="font-semibold text-primary">₹{11}</span>
              </p>

              <Button
                className={cn(
                  "cursor-pointer flex items-center justify-center bg-primary text-white hover:bg-primary/90 transition-colors duration-200 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold",
                  primaryButtonClasses
                )}
                onClick={()=> handleAddToCart(product)}
              >
                <ShoppingCart size={20} />
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog