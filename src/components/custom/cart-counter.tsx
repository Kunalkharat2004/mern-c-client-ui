'use client';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { useAppDispatch, useAppSelector } from '@/lib/store/hooks';
import { increment } from '@/lib/store/feature/cart/cart-slice';

const CartCounter = () => {
    const dispatch = useAppDispatch();
    const value = useAppSelector((state) => state.cart.value);
    const handleOnClick = () => {
        dispatch(increment());
    }
  return (
    <>
      <span className="relative">
              <Badge className="absolute -top-3 -right-4 rounded-full">
                  {value}
        </Badge>
        <Link
          href={"/cart"}
          className="text-gray-700 hover:text-primary transition-colors duration-200"
        >
          <ShoppingBasket className="hover:text-primary hover:cursor-pointer" />
        </Link>
      </span>
      <Button variant={"outline"} onClick={handleOnClick}>
        Increment
      </Button>
    </>
  );
}

export default CartCounter