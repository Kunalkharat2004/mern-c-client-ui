import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
// Import DropdownMenu components
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
// Import new icons for menu items
import {
  Phone,
  ShoppingBasket,
  MenuIcon,
  UtensilsCrossed,
  ClipboardList,
} from "lucide-react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import Image from "next/image";

const Header = () => {
  return (
    // The main header element now contains the nav and the divider
    <header className="bg-white shadow-sm">
      <nav className="container mx-auto flex items-center justify-between max-w-7xl p-4">
        {/* Logo and Restaurant Select */}
        <div className="flex items-center gap-4">
          <Link href="/">
            <Image
              src="/homePageIcons/logo.svg"
              alt="Logo"
              width={90}
              height={90}
              className="cursor-pointer"
            />
          </Link>

          <Select>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select Restaurant" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="light">Chezzy Delight</SelectItem>
              <SelectItem value="dark">Pizza Hub</SelectItem>
              <SelectItem value="system">Kid&apos;s Corner</SelectItem>
            </SelectContent>
          </Select>
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
            <span className="relative">
              <Badge className="absolute -top-3 -right-4 rounded-full">3</Badge>
              <Link
                href={"/cart"}
                className="text-gray-700 hover:text-primary transition-colors duration-200"
              >
                <ShoppingBasket className="hover:text-primary hover:cursor-pointer" />
              </Link>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-700">
              <Phone size={20} />
              <span className="text-sm">+91-9768328931</span>
            </div>
            <Button variant="default" className="ml-4 cursor-pointer">
              Logout
            </Button>
          </div>
        </div>

        {/* Mobile Navigation (Dropdown Menu) - visible only on small screens */}
        <div className="md:hidden flex items-center gap-4">
          {/* Shopping Basket on Mobile (remains outside dropdown for quick access) */}
          <span className="relative">
            <Badge className="absolute -top-3 -right-4 rounded-full">3</Badge>
            <Link
              href={"/cart"}
              className="text-gray-700 hover:text-primary transition-colors duration-200"
            >
              <ShoppingBasket className="hover:text-primary hover:cursor-pointer" />
            </Link>
          </span>

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
                  {" "}
                  {/* Added flex and gap */}
                  <UtensilsCrossed size={16} /> {/* Icon for Menu */}
                  <span>Menu</span>
                </DropdownMenuItem>
              </Link>
              <Link href="/orders">
                <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                  {" "}
                  {/* Added flex and gap */}
                  <ClipboardList size={16} /> {/* Icon for Orders */}
                  <span>Orders</span>
                </DropdownMenuItem>
              </Link>
              <DropdownMenuItem className="cursor-pointer flex items-center gap-2">
                <Phone size={16} />
                <span>+91-9768328931</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="cursor-pointer">
                <Button
                  variant="ghost"
                  className="w-full justify-start p-0 h-auto"
                >
                  Logout
                </Button>
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
