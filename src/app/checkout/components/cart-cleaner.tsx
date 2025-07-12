"use client";

import { cartCleaner } from "@/lib/store/feature/cart/cart-slice";
import { useAppDispatch } from "@/lib/store/hooks";
import { useEffect } from "react";

const CartCleaner = () => {

    const dispatch = useAppDispatch();
    useEffect(()=>{
        dispatch(cartCleaner())
    },[]);
  return null;
}

export default CartCleaner