import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Phone, MenuIcon, UtensilsCrossed, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import TenantSelect from "./tenant-select";
import CartCounterClient from "./cart-counter-client";
import { getSession } from "@/lib/session";
import Logout from "./logout";
import LogoWithParams from "./header-client-wrapper";

const Header = async () => {
  const session = await getSession();
  const tenantFetchResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/tenant?page=1&limit=500`,
    {
      next: { revalidate: 3600 }, // Revalidate every 1hr seconds
    }
  );
  if (!tenantFetchResponse.ok) {
    throw new Error("Failed to fetch tenants");
  }

  const restaurants = await tenantFetchResponse.json();

  return (
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between max-w-7xl p-4">
        <div className="flex items-center gap-4">
          <LogoWithParams/>
          <TenantSelect restaurants={restaurants} />
        </div>

        {/* Desktop Navigation and Actions (hidden on small screens) */}
        <div className="hidden md:flex items-center justify-between gap-12 w-full max-w-md">
          <div className="flex items-center gap-4">
            <Link
              href="/menu"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Menu
            </Link>
            <Link
              href="/orders"
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              Orders
            </Link>
            <CartCounterClient />
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={20} />
              <span className="text-sm">+91-9768328931</span>
            </div>
            {session ? (
              <Logout />
            ) : (
              <Link href="/login">
                <Button variant="default" size="sm" className="ml-4 cursor-pointer">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Mobile Navigation (Dropdown Menu) - visible only on small screens */}
        <div className="md:hidden flex items-center gap-4">
          {/* Shopping Basket on Mobile (remains outside dropdown for quick access) */}
          <CartCounterClient />

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <Link href="/menu">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <UtensilsCrossed size={16} />
                  <span>Menu</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/orders">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  <ClipboardList size={16} />
                  <span>Orders</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                <Phone size={16} />
                <span>+91-9768328931</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                {session ? (
                  <Logout />
                ) : (
                  <Link href="/login">
                    <Button
                      variant="ghost"
                      className="w-full justify-start p-0 h-auto cursor-pointer"
                    >
                      Login
                    </Button>
                  </Link>
                )}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      <hr className="border-t border-gray-200" />
    </header>
  );
};

export default Header;