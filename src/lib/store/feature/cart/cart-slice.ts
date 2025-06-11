import { Product, Topping } from "@/lib/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItems {
    product: Product;
    choosenConfiguration: {
        priceConfiguration: {
            [key: string]: string;
        };
        selectedToppings: Topping[];
    }
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
      addToCart: (state:CartState, action: PayloadAction<CartItems>) => {

        const newItem = {
          product: action.payload.product,
          choosenConfiguration: {
            priceConfiguration:
              action.payload.choosenConfiguration.priceConfiguration,
            selectedToppings:
              action.payload.choosenConfiguration.selectedToppings,
          },
          };
          
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
