import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import React from 'react'
import CategoryProductsPagination from './category-products-pagination';
import { ICategory } from '@/lib/types';

const ProductList = async() => {
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
  );
}

export default ProductList