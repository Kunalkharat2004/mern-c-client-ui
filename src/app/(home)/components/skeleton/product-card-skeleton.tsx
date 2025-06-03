// components/product-card-skeleton.tsx
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton"; // Import the Skeleton component

const ProductCardSkeleton = () => {
  return (
    <Card className="flex flex-col h-[430px] border-none rounded-xl shadow-lg overflow-hidden container pt-6 mt-12">
      <CardHeader className="flex items-center justify-center p-4">
        <Skeleton className="relative w-[250px] lg:w-[180px] h-[150px] rounded-xl" />
      </CardHeader>

      <CardContent className="flex-grow p-4">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <Skeleton className="h-4 w-full mb-1" />
        <Skeleton className="h-4 w-5/6" />
      </CardContent>

      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex flex-col">
          <Skeleton className="h-4 w-20 mb-1" />
          <Skeleton className="h-6 w-24" />
        </div>
        <Skeleton className="h-10 w-28 rounded-full" />
      </CardFooter>
    </Card>
  );
};

export default ProductCardSkeleton;
