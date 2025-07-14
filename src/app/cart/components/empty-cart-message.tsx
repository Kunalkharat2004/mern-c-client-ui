import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import React from 'react'

const EmptyCartMessage = () => {
   const router = useRouter();
   const searchParams = useSearchParams();
  const restaurantId = searchParams.get("restaurantId") || ""

  return (
    <Card className="text-center py-16 shadow-lg border border-gray-200 rounded-lg">
      <CardContent className="flex flex-col items-center justify-center">
        <ShoppingCart className="h-20 w-20 mx-auto text-gray-400 mb-6 opacity-75" />
        <h2 className="text-3xl font-bold text-gray-800 mb-3">
          Your cart is empty
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Add some delicious items to get started!
        </p>
        <Button
          size="lg"
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-3 px-8 rounded-md shadow-md cursor-pointer"
          onClick={() => {
            router.push(`/?restaurantId=${restaurantId}`);
          }}
        >
          Start Shopping
        </Button>
      </CardContent>
    </Card>
  );
}

export default EmptyCartMessage