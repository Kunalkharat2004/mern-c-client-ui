'use client';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Badge } from '../ui/badge';
import { useAppSelector } from '@/lib/store/hooks';
import { useSearchParams } from 'next/navigation';

const CartCounter = () => {

    const cartCount = useAppSelector((state) => state.cart.cartItems);
  const searchParams = useSearchParams();
  return (
    <>
      <span className="relative">
        <Badge className="absolute -top-3 -right-4 rounded-full">
          {cartCount.length}
        </Badge>
        <Link
          href={`/cart?restaurantId=${searchParams.get('restaurantId') || ''}`}
          className="text-gray-700 hover:text-primary transition-colors duration-200"
        >
          <ShoppingBasket className="hover:text-primary hover:cursor-pointer" />
        </Link>
      </span>
    </>
  );
}

export default CartCounter