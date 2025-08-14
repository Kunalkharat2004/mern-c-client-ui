"use client";
import React, { useState } from 'react'
import CartHeader from './components/cart-header';
import DesktopCartTable from './components/desktop-cart-table';
import MobileCartItem from './components/mobile-cart-item';
import EmptyCartMessage from './components/empty-cart-message';
import { useAppSelector } from '@/lib/store/hooks';
import { CartItems } from '@/lib/store/feature/cart/cart-slice';
import { Button } from '@/components/ui/button';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2 } from 'lucide-react';

const CartItem = () => {
  const router = useRouter();

  const products: CartItems[] = useAppSelector((state) => state.cart.cartItems);
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId") || ""
  const [isProceedToCheckoutClicked, setIsProceedToCheckoutClicked] = useState<boolean>(false);
  return (
    <div className="container mx-auto max-w-7xl px-4 py-10">
      {products.length > 0 ? (
        <div>
          {/* Header */}
          <CartHeader itemCount={products.length} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-24">
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
          </div>
          <div className="flex justify-end gap-2 md:gap-4 mt-4">
            <Button
              variant={"outline"}
              onClick={() => {
                router.push(`/?restaurantId=${restaurantId}`)
              }} // Assign the click handler
              className="mt-4 md:mt-0 cursor-pointer" // Add some top margin for smaller screens, remove for md+
            >
              Continue Shopping
            </Button>
            <Button
              disabled={isProceedToCheckoutClicked}
              variant={"default"}
              onClick={() => {
                setIsProceedToCheckoutClicked(true);
                router.push(
                  `/checkout?restaurantId=${restaurantId}`
                );
              }} // Assign the click handler
              className="mt-4 md:mt-0 cursor-pointer" // Add some top margin for smaller screens, remove for md+
            >
              {isProceedToCheckoutClicked ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Proceed to Checkout"
                )}
            </Button>
          </div>
        </div>
      ) : (
        <EmptyCartMessage />
      )}
    </div>
  );
}

export default CartItem