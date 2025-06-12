import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Trash2, Plus, Minus, ShoppingCart } from "lucide-react";
import Image from "next/image";
import React from "react";

const products = [
  {
    _id: "1",
    name: "Margherita Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    choosenInfo: {
      priceConfiguration: {
        Size: "Medium",
        Crust: "Thin",
      },
      selectedToppings: [
        {
          _id: "topping1",
          name: "Olives",
          price: 20,
          image: "/images/olives.png",
          createdAt: "2023-10-01T10:00:00Z",
        },
        {
          _id: "topping2",
          name: "Mushrooms",
          price: 30,
          image: "/images/mushrooms.png",
          createdAt: "2023-10-02T10:00:00Z",
        },
      ],
    },
    price: 250,
    quantity: 1,
  },
  {
    _id: "2",
    name: "Pepperoni Pizza",
    image:
      "https://images.unsplash.com/photo-1555072956-7758afb20e8f?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    choosenInfo: {
      priceConfiguration: {
        Size: "Large",
        Crust: "Stuffed",
      },
      selectedToppings: [
        {
          _id: "topping3",
          name: "Extra Cheese",
          price: 40,
          image: "/images/extra-cheese.png",
          createdAt: "2023-10-03T10:00:00Z",
        },
      ],
    },
    price: 300,
    quantity: 1,
  },
  {
    _id: "3",
    name: "Veggie Delight Pizza",
    image:
      "https://images.unsplash.com/photo-1520201163981-8cc95007dd2a?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    choosenInfo: {
      priceConfiguration: {
        Size: "Small",
        Crust: "Thin",
      },
      selectedToppings: [],
    },
    price: 200,
    quantity: 1,
  },
];

const CartPage = () => {
  const subtotal = products.reduce(
    (acc, product) => acc + product.price * product.quantity,
    0
  );
  const tax = Math.round(subtotal * 0.18); // 18% tax
  const total = subtotal + tax;

  // Mobile card view for smaller screens
  const MobileCartItem = ({ product }) => (
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
              <Badge
                variant="secondary"
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
              >
                {product.choosenInfo.priceConfiguration.Size}
              </Badge>
              <Badge
                variant="secondary"
                className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
              >
                {product.choosenInfo.priceConfiguration.Crust} Crust
              </Badge>
            </div>
            {product.choosenInfo.selectedToppings.length > 0 && (
              <div className="mb-2">
                <p className="text-sm text-gray-600 mb-1">Toppings:</p>
                <div className="flex flex-wrap gap-1">
                  {product.choosenInfo.selectedToppings.map((topping) => (
                    <Badge
                      key={topping._id}
                      variant="outline"
                      className="text-xs px-2 py-1 rounded-full border-dashed border-gray-300 text-gray-700"
                    >
                      {topping.name} (+₹{topping.price})
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="font-semibold min-w-[2rem] text-center text-gray-800">
                  {product.quantity}
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 w-8 p-0 rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-bold text-xl text-primary">
                  ₹{product.price * product.quantity}
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

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <ShoppingCart className="h-7 w-7 text-primary" />
          <h1 className="text-2xl font-extrabold text-gray-900 tracking-tight">
            Your Shopping Cart
          </h1>
          <Badge
            variant="secondary"
            className="ml-4 px-3 py-1 text-sm font-medium bg-primary/20 text-primary rounded-full"
          >
            {products.length} {products.length === 1 ? "item" : "items"}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Desktop Table View */}
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
                                <Badge
                                  variant="secondary"
                                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                                >
                                  {product.choosenInfo.priceConfiguration.Size}
                                </Badge>
                                <Badge
                                  variant="secondary"
                                  className="text-xs px-2 py-1 rounded-full bg-gray-100 text-gray-700"
                                >
                                  {product.choosenInfo.priceConfiguration.Crust}{" "}
                                  Crust
                                </Badge>
                              </div>
                              {product.choosenInfo.selectedToppings.length >
                                0 && (
                                <div>
                                  <p className="text-sm text-gray-600 mb-1">
                                    Toppings:
                                  </p>
                                  <div className="flex flex-wrap gap-1">
                                    {product.choosenInfo.selectedToppings.map(
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
                          ₹{product.price}
                        </TableCell>
                        <TableCell className="text-center">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="font-semibold min-w-[2rem] text-center text-gray-800">
                              {product.quantity}
                            </span>
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 w-8 p-0 rounded-md border-gray-300 text-gray-600 hover:bg-gray-100"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                        <TableCell className="text-center font-bold text-xl text-primary">
                          ₹{product.price * product.quantity}
                        </TableCell>
                        <TableCell className="text-center pr-6">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-md"
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

            {/* Mobile Card View */}
            <div className="md:hidden">
              <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Your Items
              </h2>
              {products.map((product) => (
                <MobileCartItem key={product._id} product={product} />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8 shadow-lg border border-gray-200 rounded-lg">
              <CardHeader className="px-6 py-4 border-b border-gray-200">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Order Summary
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6 space-y-6">
                <div className="space-y-3">
                  <div className="flex justify-between text-base text-gray-700">
                    <span>Subtotal</span>
                    <span className="font-medium">₹{subtotal}</span>
                  </div>
                  <div className="flex justify-between text-base text-gray-700">
                    <span>Tax (18%)</span>
                    <span className="font-medium">₹{tax}</span>
                  </div>
                  <Separator className="bg-gray-200 my-4" />
                  <div className="flex justify-between text-xl font-bold text-gray-900">
                    <span>Total</span>
                    <span>₹{total}</span>
                  </div>
                </div>

                <div className="space-y-3 pt-4">
                  <Button className="w-full h-12 text-lg font-bold bg-primary hover:bg-primary/90 text-primary-foreground rounded-md shadow-md hover:shadow-lg transition-all duration-200 ease-in-out">
                    Proceed to Checkout
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full h-10 border-gray-300 text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200 ease-in-out"
                  >
                    Continue Shopping
                  </Button>
                </div>

                <div className="pt-4 text-sm text-gray-600 space-y-2">
                  <p className="flex items-center gap-2">
                    <span role="img" aria-label="delivery-truck">
                      🚚
                    </span>{" "}
                    Free delivery on orders above ₹500
                  </p>
                  <p className="flex items-center gap-2">
                    <span role="img" aria-label="lock">
                      🔒
                    </span>{" "}
                    Secure checkout guaranteed
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Empty Cart Message (if needed) */}
        {products.length === 0 && (
          <Card className="text-center py-16 shadow-lg border border-gray-200 rounded-lg">
            <CardContent className="flex flex-col items-center justify-center">
              <ShoppingCart className="h-20 w-20 mx-auto text-gray-400 mb-6 opacity-75" />
              <h2 className="text-3xl font-bold text-gray-800 mb-3">
                Your cart is empty
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Add some delicious items to get started!
              </p>
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-md shadow-md"
              >
                Start Shopping
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default CartPage;