// app/page.tsx  (or wherever your Home component lives)
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import { ICategory } from "@/lib/types";
import CategoryProductsPagination from "./components/category-products-pagination";

export default async function Home() {
  // 1) Fetch categories on the server
  const categoriesRes = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/api/categories`,
    { next: { revalidate: 3600 } } // Cache for 1 hour
  );
  if (!categoriesRes.ok) {
    throw new Error("Failed to load categories");
  }
  const categories: ICategory[] = await categoriesRes.json();

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

      <section>
        <div className="container py-12 mx-auto max-w-7xl px-4">
          <Tabs defaultValue={categories[0]?._id} className="w-full">
            {/* Tab triggers */}
            <TabsList>
              {categories.map((category) => (
                <TabsTrigger
                  key={category._id}
                  value={category._id}
                  className="text-md cursor-pointer"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>

            {/* Tab contents: each one renders a client-side pagination component */}
            {categories.map((category) => (
              <TabsContent
                key={category._id}
                value={category._id}
                className="pt-6"
              >
                <CategoryProductsPagination
                  categoryId={category._id}
                  tenantId="2adeb26a-266e-4ff4-8b0b-ec79cefdfaf7"
                  pageSize={12} // ← 12 product per “page”
                />
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>
    </>
  );
}
