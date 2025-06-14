import React from "react";
import CartHeader from "./components/cart-header";
import MobileCartItem from "./mobile-cart-item";
import DesktopCartTable from "./desktop-cart-table";
import OrderSummary from "./order-summary";
import EmptyCartMessage from "./components/empty-cart-message";

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

  return (
    <div className="min-h-screen bg-gray-100 font-sans antialiased">
      <div className="container mx-auto max-w-7xl px-4 py-10">
        {/* Header */}
        <CartHeader itemCount={products.length} />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            {/* Desktop Table View */}
          <DesktopCartTable products={products} />

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
        <OrderSummary subtotal={234} tax={98} total={322}/>
        </div>

        {/* Empty Cart Message (if needed) */}
        {products.length === 0 && (
          <EmptyCartMessage/>
        )}
      </div>
    </div>
  );
};

export default CartPage;