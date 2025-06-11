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
          state.cartItems = [
              ...state.cartItems,
              {
                product: action.payload.product,
                choosenConfiguration: {
                    priceConfiguration: action.payload.choosenConfiguration.priceConfiguration,
                    selectedToppings: action.payload.choosenConfiguration.selectedToppings,
                },
              }
        ]
    }
  },
});

// Action creators are generated for each case reducer function
export const { addToCart } = cartSlice.actions;

export default cartSlice.reducer;
