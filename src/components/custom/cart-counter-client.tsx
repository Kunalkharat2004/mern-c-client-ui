"use client";

import dynamic from "next/dynamic";

// this file is purely client-side:
const CartCounter = dynamic(() => import("./cart-counter"), {
  ssr: false,
});

export default function CartCounterClient() {
  return <CartCounter />;
}
