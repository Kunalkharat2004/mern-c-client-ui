import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Suspense } from "react";
import ProductList from "./components/product-list";
import ProductListSkeleton from "./components/skeleton/product-list-skeleton";

export type SearchParamsProps = {
  searchParams: Promise<{ restaurantId?: string }>;
};

export default async function Home({ searchParams }: SearchParamsProps) {
  const { restaurantId } = await searchParams;

  return (
    <>
      <section className="bg-white">
        <div className="container mx-auto max-w-7xl flex flex-col-reverse lg:flex-row items-center justify-between gap-8 px-4 py-12">
          <div className="w-full lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 lg:space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Super Delicious Pizza
              <br />
              <span className="text-primary">in Only 45 minutes!</span>
            </h1>
            <p className="text-sm sm:text-lg md:text-xl lg:text-2xl max-w-lg leading-snug">
              Enjoy a Free Meal If Your Order Takes More Than 45 Minutes!
            </p>
            <Button className="bg-primary text-white hover:bg-primary/90 transition-colors duration-200 rounded-full px-6 py-6 lg:px-6 lg:py-7 text-sm lg:text-base font-semibold">
              Get Your Pizza Now
            </Button>
          </div>
          <div className="w-full lg:w-1/2 flex justify-center">
            <Image
              src="/homePageIcons/hero-pizza.png"
              alt="Pizza"
              width={500}
              height={500}
              className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl"
              priority
            />
          </div>
        </div>
      </section>

      {!restaurantId ? (
        <div className="container mx-auto max-w-7xl px-4 py-12 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-6xl">🏪</div>
            <h2 className="text-2xl font-semibold text-gray-800">Welcome!</h2>
            <p className="text-xl text-gray-700">
              Please select a restaurant to view the menu.
            </p>
            <p className="text-sm text-gray-500">
              Use the restaurant selector in the header above.
            </p>
          </div>
        </div>
      ) : (
        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList restaurantId={restaurantId} />
        </Suspense>
      )}
    </>
  );
}
