"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React, { useEffect, useState } from "react";
import CategoryProductsPagination from "./category-products-pagination";
import { ICategory } from "@/lib/types";
import { useSearchParams } from "next/navigation";

interface Props {
  initialCategories: ICategory[];
  restaurantId: string;
}

const ClientProductListWrapper = ({
  initialCategories,
  restaurantId,
}: Props) => {
  const [categories, setCategories] = useState<ICategory[]>(initialCategories);
  const [loading, setLoading] = useState(false);
  const [currentRestaurantId, setCurrentRestaurantId] = useState(restaurantId);
  const searchParams = useSearchParams();

  useEffect(() => {
    const urlRestaurantId = searchParams.get("restaurantId");

    // Only fetch new data if restaurant ID has changed and is different from initial
    if (urlRestaurantId && urlRestaurantId !== currentRestaurantId) {
      const fetchNewCategories = async () => {
        setLoading(true);
        try {
          const categoriesRes = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/api/categories?tenantId=${urlRestaurantId}`
          );

          if (!categoriesRes.ok) {
            throw new Error("Failed to load categories");
          }

          const newCategories: ICategory[] = await categoriesRes.json();
          setCategories(newCategories);
          setCurrentRestaurantId(urlRestaurantId);
        } catch (error) {
          console.error("Error fetching categories:", error);
          // Keep existing categories on error
        } finally {
          setLoading(false);
        }
      };

      fetchNewCategories();
    }
  }, [searchParams, currentRestaurantId]);

  if (loading) {
    return (
      <section>
        <div className="container py-12 mx-auto max-w-7xl px-4">
          <div className="flex items-center justify-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
            <span className="ml-3 text-gray-600">Loading menu...</span>
          </div>
        </div>
      </section>
    );
  }

  if (!categories.length) {
    return (
      <section>
        <div className="container py-12 mx-auto max-w-7xl px-4 text-center">
          <div className="flex flex-col items-center space-y-4">
            <div className="text-4xl">📋</div>
            <p className="text-lg text-gray-600">
              No categories found for this restaurant.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="container py-12 mx-auto max-w-7xl px-4">
        <Tabs
          defaultValue={categories[0]?._id}
          key={currentRestaurantId}
          className="w-full"
        >
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
          {categories.map((category) => (
            <TabsContent
              key={category._id}
              value={category._id}
              className="pt-6"
            >
              <CategoryProductsPagination
                categoryId={category._id}
                tenantId={currentRestaurantId}
                pageSize={12}
              />
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
};

export default ClientProductListWrapper;
