import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { CartItems, decrementCartItemQty, incrementCartItemQty, removeTopping } from '@/lib/store/feature/cart/cart-slice';
import { useAppDispatch } from '@/lib/store/hooks';
import { getCartProductPrice } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const MobileCartItem = ({product}:{product:CartItems}) => {
  const dispatch = useAppDispatch();
  return (
    <Card className="mb-4 shadow-sm hover:shadow-md transition-shadow duration-200 ease-in-out border border-gray-200">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Apply w-24 h-24 to the parent div for fixed size */}
          <div className="relative flex-shrink-0 w-24 h-24">
            <Image
              src={product.image}
              alt={product.name}
              fill // Use fill to make image cover parent div
              className="rounded-lg object-cover border border-gray-100"
            />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg mb-1 text-gray-800 truncate">
              {product.name}
            </h3>
            <div className="flex flex-wrap gap-1 mb-2">
              {Object.entries(product.choosenConfiguration.priceConfiguration)
                .filter(([, value]) => {
                  return value != "None";
                })
                .map(([key, value]) => (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                  >
                    {value}
                  </Badge>
                ))}
            </div>
            {product.choosenConfiguration.selectedToppings.length > 0 && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 mb-1">Toppings:</p>
                <div className="flex flex-wrap gap-1">
                  {product.choosenConfiguration.selectedToppings.length > 0 && (
                    <div>
                      <p className="text-sm text-gray-600 mb-1">Toppings:</p>
                      <div className="flex flex-wrap gap-1">
                        {product.choosenConfiguration.selectedToppings.map(
                          (topping) => (
                            <div key={topping._id} className="relative">
                              <Badge
                                variant="outline"
                                className="text-xs px-2 py-1 rounded-full border-dashed border-gray-300 text-gray-700 pr-6" // Add padding-right to make space for the button
                              >
                                {topping.name} (+₹{topping.price})
                              </Badge>
                              <button
                                onClick={() =>
                                  dispatch(
                                    removeTopping({
                                      itemId: product._id,
                                      toppingId: topping._id,
                                    })
                                  )
                                }
                                className="absolute top-0 right-0 -mt-1 -mr-1 bg-gray-200 hover:bg-gray-300 rounded-full w-4 h-4 flex items-center justify-center text-xs text-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 cursor-pointer"
                                aria-label={`Remove ${topping.name}`}
                              >
                                x
                              </button>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}
            <div className="flex-col items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={() => dispatch(decrementCartItemQty(product._id))}
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold min-w-[2rem] text-center text-gray-800">
                  {product.qty}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
                  onClick={() => dispatch(incrementCartItemQty(product._id))}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-3 mt-4">
                <span className="font-bold text-xl text-primary">
                  ₹{getCartProductPrice(product) * product.qty}
                </span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"
                >
                  <Trash2 className="h-6 w-6" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default MobileCartItem