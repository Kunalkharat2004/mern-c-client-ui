import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { CartItems, decrementCartItemQty, deleteCartItem, incrementCartItemQty } from '@/lib/store/feature/cart/cart-slice';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { getCartProductPrice } from '@/lib/utils';
import { Minus, Plus, Trash2 } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

const DesktopCartTable = () => {
  const products: CartItems[] = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  return (
    <>
      <Card className="hidden md:block shadow-lg border border-gray-200 rounded-lg">
        <CardHeader className="px-6 py-4 border-b border-gray-200">
          <CardTitle className="text-2xl font-semibold text-gray-800">
            Your Items
          </CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50 border-b border-gray-200">
                <TableHead className="w-[45%] pl-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Item
                </TableHead>
                <TableHead className="text-center py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </TableHead>
                <TableHead className="text-center py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Quantity
                </TableHead>
                <TableHead className="text-center py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Total
                </TableHead>
                <TableHead className="text-center pr-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products.map((product, index) => (
                <TableRow
                  key={product._id}
                  className={
                    index !== products.length - 1
                      ? "border-b border-gray-100 hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                      : "hover:bg-gray-50 transition-colors duration-150 ease-in-out"
                  }
                >
                  <TableCell className="py-4 pl-6">
                    <div className="flex items-start gap-4">
                      {/* Apply w-24 h-24 to the parent div for fixed size */}
                      <div className="relative flex-shrink-0 w-24 h-24">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill // Use fill to make image cover parent div
                          className="rounded-lg object-cover border border-gray-100"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-lg mb-2 text-gray-800">
                          {product.name}
                        </h3>
                        <div className="flex flex-wrap gap-1 mb-2">
                          {Object.entries(
                            product.choosenConfiguration.priceConfiguration
                          )
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
                        {product.choosenConfiguration.selectedToppings.length >
                          0 && (
                          <div>
                            <p className="text-sm text-gray-600 mb-1">
                              Toppings:
                            </p>
                            <div className="flex flex-wrap gap-1">
                              {product.choosenConfiguration.selectedToppings.map(
                                (topping) => (
                                  <Badge
                                    key={topping._id}
                                    variant="outline"
                                    className="text-xs px-2 py-1 rounded-full border-dashed border-gray-300 text-gray-700"
                                  >
                                    {topping.name} (+₹{topping.price})
                                  </Badge>
                                )
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-medium text-gray-700">
                    ₹{getCartProductPrice(product)}
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 rounded-md border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          dispatch(decrementCartItemQty(product._id))
                        }
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="font-semibold min-w-[2rem] text-center text-gray-800">
                        {product.qty}
                      </span>
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 w-8 p-0 rounded-md border-gray-300 text-gray-600 hover:bg-gray-100 cursor-pointer"
                        onClick={() =>
                          dispatch(incrementCartItemQty(product._id))
                        }
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                  <TableCell className="text-center font-bold text-xl text-primary">
                    ₹{getCartProductPrice(product) * product.qty}
                  </TableCell>
                  <TableCell className="text-center pr-6">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md cursor-pointer"
                      onClick={() => dispatch(deleteCartItem(product._id))}
                    >
                      <Trash2 className="h-8 w-8" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}

export default DesktopCartTable