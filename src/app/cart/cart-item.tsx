"use client";
import React from 'react'
import CartHeader from './components/cart-header';
import DesktopCartTable from './components/desktop-cart-table';
import MobileCartItem from './components/mobile-cart-item';
import EmptyCartMessage from './components/empty-cart-message';
import { useAppSelector } from '@/lib/store/hooks';
import { CartItems } from '@/lib/store/feature/cart/cart-slice';
import OrderSummary from './components/order-summary';

const CartItem = () => {

  const products: CartItems[] = useAppSelector((state) => state.cart.cartItems);
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {/* Header */}
      <CartHeader itemCount={products.length} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          {/* Desktop Table View */}
          <DesktopCartTable />

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
        <OrderSummary />
      </div>

      {/* Empty Cart Message (if needed) */}
      {products.length === 0 && <EmptyCartMessage />}
    </div>
  );
}

export default CartItem