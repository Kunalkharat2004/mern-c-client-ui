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
      const newItem = { ...action.payload, hash };

      // Persist the cart in localStorage
      window.localStorage.setItem(
        "cartItems",
        JSON.stringify([...state.cartItems, newItem])
      );

      state.cartItems = [...state.cartItems, newItem];
    },
    setInitialCart: (state: CartState, action: PayloadAction<CartItems[]>) => {
      state.cartItems.push(...action.payload);
    },
    incrementCartItemQty: (state: CartState, action: PayloadAction<string>) => {
      const itemIndex = state.cartItems.findIndex(item => item._id === action.payload);
      if (itemIndex !== -1) {
        state.cartItems[itemIndex].qty += 1;

        // Update localStorage
        window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    decrementCartItemQty: (state: CartState, action: PayloadAction<string>) => {
      const itemIndex = state.cartItems.findIndex(item => item._id === action.payload);
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].qty > 1) {
          state.cartItems[itemIndex].qty -= 1;
        } else {
          // Remove item if qty is 1
          state.cartItems.splice(itemIndex, 1);
        }

        // Update localStorage
        window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    deleteCartItem: (state: CartState, action: PayloadAction<string>) => {
      const itemIndex = state.cartItems.findIndex(item => item._id === action.payload);
      if (itemIndex !== -1) {
        state.cartItems.splice(itemIndex, 1);

        // Update localStorage
        window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
      }
    },
    removeTopping: (state: CartState, action: PayloadAction<{itemId: string, toppingId:string}>) => {
      const { itemId, toppingId } = action.payload;
      const itemIndex = state.cartItems.findIndex(item => item._id === itemId);
      if (itemIndex !== -1) {
        const toppingIndex = state.cartItems[itemIndex].choosenConfiguration.selectedToppings.findIndex(topping => topping._id === toppingId);
        if (toppingIndex !== -1) {
          state.cartItems[itemIndex].choosenConfiguration.selectedToppings.splice(toppingIndex, 1);

          // Update localStorage
          window.localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
        }
      }
    }, 
    cartCleaner: () =>{
      window.localStorage.setItem("cartItems", JSON.stringify([]));
      return initialState; // Reset the state to initial state
    }
  },
});

// Action creators are generated for each case reducer function
export const {
  addToCart,
  setInitialCart,
  incrementCartItemQty,
  decrementCartItemQty,
  deleteCartItem,
  removeTopping,
  cartCleaner,
} = cartSlice.actions;

export default cartSlice.reducer;
