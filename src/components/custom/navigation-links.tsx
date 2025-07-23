"use client";

import { useSearchParamsContext } from "./search-params-provider";
import Link from "next/link";

export default function NavigationLinks() {
  const { restaurantId } = useSearchParamsContext();
  return (
    <>
      <Link
        href={`/menu${restaurantId ? `?restaurantId=${restaurantId}` : ''}`}
        className="text-gray-700 hover:text-primary transition-colors duration-200"
      >
        Menu
      </Link>
      <Link
        href={`/orders?restaurantId=${restaurantId || ''}&page=1&limit=10`}
        className="text-gray-700 hover:text-primary transition-colors duration-200"
      >
        Order
      </Link>
    </>
  );
}