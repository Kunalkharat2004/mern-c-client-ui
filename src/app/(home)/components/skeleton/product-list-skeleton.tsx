// components/product-list-skeleton.tsx
import { Tabs, TabsContent, TabsList } from "@/components/ui/tabs";
import { Skeleton } from "@/components/ui/skeleton";
import ProductCardSkeleton from "./product-card-skeleton"; // Assuming you have this component as provided before

const ProductListSkeleton = () => {
  return (
    <section>
      <div className="container py-12 mx-auto max-w-7xl px-4">
        <Tabs defaultValue="loading" className="w-full">
          {/* Tab triggers Skeleton */}
          <TabsList className="grid w-fit grid-cols-3">
            {" "}
            {/* Adjust grid-cols based on number of skeletons you want */}
            <Skeleton className="h-10 w-[120px] rounded-md mx-1" />
            <Skeleton className="h-10 w-[120px] rounded-md mx-1" />
            <Skeleton className="h-10 w-[120px] rounded-md mx-1" />
          </TabsList>

          {/* Tab contents Skeleton */}
          <TabsContent value="loading" className="pt-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {/* Render multiple ProductCardSkeletons */}
              {[...Array(4)].map(
                (
                  _,
                  index // Show 8 card skeletons as an example
                ) => (
                  <ProductCardSkeleton key={index} />
                )
              )}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default ProductListSkeleton;
