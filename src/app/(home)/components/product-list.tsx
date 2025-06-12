import React from "react";
import { ICategory } from "@/lib/types";
import ClientProductListWrapper from "./client-product-list-wrapper";

const ProductList = async ({ restaurantId }: { restaurantId: string }) => {
  try {
    // Server-side initial data fetch
    const categoriesRes = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/api/categories?tenantId=${restaurantId}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!categoriesRes.ok) {
      throw new Error("Failed to load categories");
    }

    const categories: ICategory[] = await categoriesRes.json();

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

    // Pass initial server-rendered data to client wrapper
    return (
      <ClientProductListWrapper
        initialCategories={categories}
        restaurantId={restaurantId}
      />
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return (
      <section>
        <div className="container py-12 mx-auto max-w-7xl px-4 text-center">
          <p className="text-lg text-red-600">
            Failed to load categories. Please try again.
          </p>
        </div>
      </section>
    );
  }
};

export default ProductList;
