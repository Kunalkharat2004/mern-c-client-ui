import { Product, Topping } from "@/lib/types";
import { hashPayload } from "@/lib/utils";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItems extends Pick<Product, "_id" | "name" | "image" | "priceConfiguration"> {
    choosenConfiguration: {
        priceConfiguration: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
  },
  qty: number;
  hash?: string;
}

export interface CartState {
    cartItems: CartItems[]
}

const initialState: CartState = {
    cartItems: [], // Initialize with an empty array
}

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state: CartState, action: PayloadAction<CartItems>) => {
      
      const hash = hashPayload(action.payload);
        const newItem = {...action.payload, hash};
          
          // Persist the cart in localStorage
          window.localStorage.setItem("cartItems", JSON.stringify([...state.cartItems, newItem]));

          state.cartItems = [
              ...state.cartItems,
                newItem
        ]
      },
      setInitialCart: (state: CartState, action: PayloadAction<CartItems[]>) => { 
        state.cartItems.push(...action.payload);
      }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart, setInitialCart } = cartSlice.actions;

export default cartSlice.reducer;
