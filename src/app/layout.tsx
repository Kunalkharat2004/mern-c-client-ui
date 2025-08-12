import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/custom/header";
import StoreProvider from "./(home)/StoreProvider";
import { Toaster } from "@/components/ui/sonner";
import Refresher from "@/components/custom/refresher";
import QueryProvider from "./QueryClient";
import SearchParamsProvider from "@/components/custom/search-params-provider";
import { Suspense } from "react";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "CheezyBite – Fresh & Fast Pizza Delivery",
  description:
    "Order delicious, hot, and cheesy pizzas from CheezyBite. Fresh ingredients, quick delivery, and irresistible flavors – satisfaction delivered to your door.",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <StoreProvider>
        <body
          className={cn(
            "min-h-screen bg-background font-manrope antialiased",
            manrope.variable
          )}
        >
          <QueryProvider>
            <Refresher>
              <Suspense fallback={<div>Loading...</div>}>
                <SearchParamsProvider>
                  <Header />
                  <main>{children}</main>
                </SearchParamsProvider>
              </Suspense>
              <Toaster position="top-center" />
            </Refresher>
          </QueryProvider>
        </body>
      </StoreProvider>
    </html>
  );
}