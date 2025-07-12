"use client";

import { useSearchParams } from "next/navigation";
import { createContext, useContext } from "react";

interface SearchParamsContextType {
  restaurantId: string | null;
  searchParams: URLSearchParams;
}

const SearchParamsContext = createContext<SearchParamsContextType>({
  restaurantId: null,
  searchParams: new URLSearchParams(),
});

export const useSearchParamsContext = () => useContext(SearchParamsContext);

export default function SearchParamsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId");

  return (
    <SearchParamsContext.Provider value={{ restaurantId, searchParams }}>
      {children}
    </SearchParamsContext.Provider>
  );
}