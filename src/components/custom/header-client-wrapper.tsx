"use client";

import { useSearchParamsContext } from "./search-params-provider";
import Link from "next/link";
import Image from "next/image";

export default function LogoWithParams() {
  const { restaurantId } = useSearchParamsContext();

  return (
    <Link href={`/?restaurantId=${restaurantId}`} className="flex items-center gap-2">
      <Image
        src="/homePageIcons/logo.svg"
        alt="Logo"
        width={90}
        height={90}
        className="cursor-pointer"
      />
    </Link>
  );
}