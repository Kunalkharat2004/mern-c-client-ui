'use client';
import { ShoppingBasket } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { Badge } from '../ui/badge';

const CartCounter = () => {

  return (
    <>
      <span className="relative">
              <Badge className="absolute -top-3 -right-4 rounded-full">
                  3
        </Badge>
        <Link
          href={"/cart"}
          className="text-gray-700 hover:text-primary transition-colors duration-200"
        >
          <ShoppingBasket className="hover:text-primary hover:cursor-pointer" />
        </Link>
      </span>
    </>
  );
}

export default CartCounter