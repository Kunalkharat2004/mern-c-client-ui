"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../../lib/store/store";
import { setInitialCart } from "@/lib/store/feature/cart/cart-slice";

export default function StoreProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore>(undefined);
  if (!storeRef.current) {
    // Create the store instance the first time this renders
      storeRef.current = makeStore();
      // todo: Load the initialData from localStoraeg
      const isLoacalStorageAvailable = typeof window !== "undefined" && window.localStorage;
      if (isLoacalStorageAvailable) {
        const initialData = window.localStorage.getItem("cartItems");
        if (initialData) {
          try {
            const parsedData = JSON.parse(initialData);
            storeRef.current.dispatch(setInitialCart(parsedData || []));
          } catch (error) {
            console.error("Failed to parse initial data from localStorage", error);
          }
        }
      }
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
