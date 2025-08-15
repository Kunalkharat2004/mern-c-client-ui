/* eslint-disable @typescript-eslint/no-unused-vars */
import { primaryButtonClasses } from "@/app/lib/button-styles";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import React, { Suspense, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { cn, getProductPrice, hashPayload } from "@/lib/utils";
import { ShoppingCart } from "lucide-react";
import { Product, Topping } from "@/lib/types";
import ToppingList from "./topping-list";
import { addToCart, CartItems } from "@/lib/store/feature/cart/cart-slice";
import { useAppDispatch, useAppSelector } from "@/lib/store/hooks";
import { useNotification } from "@/app/lib/hooks/useNotification";

type ProductProps = {
  product: Product;
};

type choosenConfigType = {
  [key: string]: string;
};

const ProductDialog = ({ product }: ProductProps) => {
  /**

       initialChoosenConfig:
       Ex:
      {
        Size: "Small",
        Crust: "Thin"
      }
  
 */
  const initialChoosenConfig = Object.entries(
    product.category.priceConfiguration
  ).reduce((acc, [key, value]) => {
    return {
      ...acc,
      [key]: value.availableOptions[0],
    };
  }, {});

  const [isDialogOpen, setIsDialogOpen] = React.useState(false);
  const [selectedToppings, setSelectedToppings] = React.useState<Topping[]>([]);
  const [choosenConfig, setChoosenConfig] =
    React.useState<choosenConfigType>(initialChoosenConfig);
  
  const {success} = useNotification()

  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const handleToppingSelect = (topping: Topping) => {
    setSelectedToppings((prev) => {
      
      const updated = prev.find(t => t._id === topping._id)
        ? prev.filter((t) => t._id !== topping._id)
        : [...prev, topping]
      
      return [...updated].sort((a, b) => {
        const timeA = new Date(a.createdAt).getTime();
        const timeB = new Date(b.createdAt).getTime();
        return timeA - timeB; // Sort by createdAt in ascending order, so that toppings created first appear first in the list
      });
    }
    );
  };

  const handleOnRadioChange = (key: string, data: string) => {
    setChoosenConfig((prev) => ({
      ...prev,
      [key]: data,
    }));
  };

  const isConfigAlreadyExists = useMemo(() => {
    const currentConfig:CartItems = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      choosenConfiguration: {
        priceConfiguration: choosenConfig,
        selectedToppings: selectedToppings,
      },
      qty: 1
    }
    const hash = hashPayload(currentConfig);
    return cartItems.some((item) => item.hash === hash);
  }, [product, choosenConfig, selectedToppings, cartItems]);
  
  const handleAddToCart = (product: Product) => {
    const cartPayload: CartItems = {
      _id: product._id,
      name: product.name,
      image: product.image,
      priceConfiguration: product.priceConfiguration,
      choosenConfiguration: {
        priceConfiguration: choosenConfig!,
        selectedToppings: selectedToppings,
      },
      qty: 1
    };

    dispatch(addToCart(cartPayload));
    setIsDialogOpen(false);
    setSelectedToppings([]);
    success("Product added to cart successfully!");
  };
  const totalPrice = useMemo(() => {
     const selectedToppingsTotal = selectedToppings.reduce((toppingSum, topping)=> toppingSum + topping.price, 0);
    const choosenConfigPrice = Object.entries(choosenConfig).reduce((sum, [key, value]) => {
      return sum += product.priceConfiguration[key].availableOptions[value] || 0;
    }, 0)
    return choosenConfigPrice + selectedToppingsTotal;
  },[choosenConfig, selectedToppings, product]);
  
 

  return (
    <Dialog open={isDialogOpen} onOpenChange={(open) => {
      setIsDialogOpen(open);
      if(!open) {
        setSelectedToppings([]);
      }
    }}>
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

            {Object.entries(product.category.priceConfiguration)
              .sort(([keyA, valueA], [keyB, valueB]) => {
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
                      onValueChange={(data) => handleOnRadioChange(key, data)}
                      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4"
                    >
                      {value.availableOptions.map((option: string) => (
                        <div key={option}>
                          <RadioGroupItem
                            value={option}
                            id={option}
                            className="peer sr-only"
                            aria-label={option}
                          />
                          <Label
                            htmlFor={option}
                            className="flex flex-col items-center justify-center rounded-md border-2 bg-white p-3 sm:p-4 hover:bg-accent hover:text-accent-foreground peer-data-[state=checked]:border-primary [&:has([data-state=checked])]:border-primary cursor-pointer h-full text-center"
                          >
                            <span className="text-sm sm:text-base font-semibold">
                              {option}
                            </span>
                            <span className="text-xs sm:text-sm text-gray-700 mt-1">
                              ₹{getProductPrice(product,key,option)}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>
                  </div>
                );
              })}

            {product.category.hasToppings && (
              <Suspense fallback={"Loading toppings..."}>
                <ToppingList
                  selectedToppings={selectedToppings}
                  handleToppingSelect={handleToppingSelect}
                  categoryId={product.category._id}
                />
              </Suspense>
            )}

            <div className="flex items-center justify-between mt-8 lg:mt-12">
              <p className="text-sm sm:text-base font-semibold mt-1">
                Total Price:{" "}
                <span className="font-semibold text-primary">
                  ₹{totalPrice}
                </span>
              </p>

              <Button
                disabled={isConfigAlreadyExists}
                className={cn(
                  primaryButtonClasses,
                  `flex items-center justify-center bg-primary text-white hover:bg-primary/90 transition-colors duration-200 rounded-full px-6 py-3 sm:px-8 sm:py-4 text-sm sm:text-base font-semibold`,
                  isConfigAlreadyExists
                    ? "cursor-not-allowed bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700"
                    : "cursor-pointer bg-gradient-to-r from-orange-400 to-orange-500 hover:from-orange-500 hover:to-orange-600 focus:ring-orange-300"
                )}
                onClick={() => handleAddToCart(product)}
              >
                <ShoppingCart size={20} />
                {isConfigAlreadyExists ? "Already in cart" : "Add to Cart"}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductDialog;
