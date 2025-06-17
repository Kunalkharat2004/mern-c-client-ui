// app/components/CategoryProductsPagination.tsx
"use client";

import { useState, useEffect } from "react";
import ProductCard from "../components/product-card"; // adjust path if needed
import { Product } from "@/lib/types";

// Import Shadcn Pagination components
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface Props {
  categoryId: string;
  tenantId: string;
  pageSize: number;
}

interface PaginatedResponse {
  data: Product[];
  total: number; // total number of products in this category
}

interface CachedPage {
  products: Product[];
  timestamp: number;
}

/**
 * 1) cacheStore: top‐level key is `${tenantId}-${categoryId}`, second‐level key is page number.
 *    Each entry: { products, timestamp }.
 *
 * 2) totalCountStore: top‐level key is `${tenantId}-${categoryId}` → number of total products in that category.
 */
const cacheStore: Record<string, Record<number, CachedPage>> = {};
const totalCountStore: Record<string, number> = {};

export default function CategoryProductsPagination({
  categoryId,
  tenantId,
  pageSize,
}: Props) {
  const [page, setPage] = useState(1);
  const [products, setProducts] = useState<Product[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [loadingNewPage, setLoadingNewPage] = useState(false);

  const totalPages = Math.ceil(totalCount / pageSize);
  const CACHE_TTL = 3600 * 1000; // 1 hour in milliseconds

  // Create a unique cache key that includes both tenantId and categoryId
  const cacheKey = `${tenantId}-${categoryId}`;

  // Whenever categoryId or tenantId changes, reset to page 1:
  useEffect(() => {
    setPage(1);
    setProducts([]);
    setTotalCount(0);
  }, [categoryId, tenantId]);

  useEffect(() => {
    let isMounted = true;

    async function fetchPage() {
      // Ensure we have a cache bucket for this tenant-category combination
      if (!cacheStore[cacheKey]) {
        cacheStore[cacheKey] = {};
      }

      const categoryCache = cacheStore[cacheKey];
      const cachedEntry = categoryCache[page];

      // 1) If cache exists and is still fresh:
      if (cachedEntry && Date.now() - cachedEntry.timestamp < CACHE_TTL) {
        if (isMounted) {
          setProducts(cachedEntry.products);

          // Restore totalCount from totalCountStore if possible:
          const savedTotal = totalCountStore[cacheKey];
          if (typeof savedTotal === "number") {
            setTotalCount(savedTotal);
          }
          setLoadingNewPage(false);
        }
        return;
      }

      // 2) Otherwise, fetch fresh data:
      setLoadingNewPage(true);

      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/catalog/api/products` +
            `?tenantId=${tenantId}` +
            `&categoryId=${categoryId}` +
            `&limit=${pageSize}` +
            `&page=${page}`
        );
        if (!res.ok) throw new Error("Failed to fetch products");

        const json: PaginatedResponse = await res.json();
        if (!isMounted) return;

        setProducts(json.data);
        setTotalCount(json.total);

        // Store totalCount in module‐level store:
        totalCountStore[cacheKey] = json.total;

        // Cache this page's products + timestamp
        categoryCache[page] = {
          products: json.data,
          timestamp: Date.now(),
        };
      } catch (err) {
        console.error("Error fetching products:", err);
        // You could choose to fall back to a stale cache here if desired.
        if (isMounted) {
          setProducts([]);
          setTotalCount(0);
        }
      } finally {
        if (isMounted) setLoadingNewPage(false);
      }
    }

    fetchPage();
    return () => {
      isMounted = false;
    };
  }, [categoryId, page, pageSize, tenantId, cacheKey]);

  const goToPage = (n: number) => {
    if (n < 1 || n > totalPages) return;
    setPage(n);
  };

  // Build array of page numbers (with "…" if needed)
  const renderPageNumbers = () => {
    const pageNumbers: (number | string)[] = [];
    const maxPageButtons = 5;

    if (totalPages === 0) return [];

    // Always show "1"
    pageNumbers.push(1);

    if (totalPages > 1) {
      let start = Math.max(2, page - Math.floor(maxPageButtons / 2) + 1);
      let end = Math.min(
        totalPages - 1,
        page + Math.floor(maxPageButtons / 2) - 1
      );

      if (page - 1 < Math.floor(maxPageButtons / 2)) {
        end = Math.min(totalPages - 1, maxPageButtons - 1);
      }
      if (totalPages - page < Math.floor(maxPageButtons / 2)) {
        start = Math.max(2, totalPages - maxPageButtons + 2);
      }

      if (start > 2) {
        pageNumbers.push("...");
      }

      for (let i = start; i <= end; i++) {
        pageNumbers.push(i);
      }

      if (end < totalPages - 1) {
        pageNumbers.push("...");
      }

      if (totalPages !== 1 && !pageNumbers.includes(totalPages)) {
        pageNumbers.push(totalPages);
      }
    }

    return Array.from(new Set(pageNumbers));
  };

  return (
    <div>
      {/* Product grid (fix min‐height to prevent jumps) */}
      <div className="min-h-[400px] grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 relative">
        {loadingNewPage && (
          <div className="absolute inset-0 bg-white bg-opacity-70 flex items-center justify-center z-10 rounded-lg">
            <div className="text-lg font-semibold text-gray-700 animate-pulse">
              Loading new products...
            </div>
          </div>
        )}

        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : !loadingNewPage ? (
          <div className="col-span-full text-center py-8">
            <div className="flex flex-col items-center space-y-2">
              <div className="text-4xl">📦</div>
              <p className="text-gray-500">
                No products found in this category.
              </p>
            </div>
          </div>
        ) : null}
      </div>

      {/* Pagination controls (only if there's at least one page) */}
      {totalPages > 0 && (
        <Pagination className="py-4">
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={(e) => {
                  e.preventDefault();
                  if (!(page <= 1 || loadingNewPage)) {
                    goToPage(page - 1);
                  }
                }}
                aria-disabled={page <= 1 || loadingNewPage}
                className={
                  page <= 1 || loadingNewPage
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {renderPageNumbers().map((num, idx) => (
              <PaginationItem key={idx}>
                {typeof num === "number" ? (
                  <PaginationLink
                    isActive={num === page}
                    onClick={(e) => {
                      e.preventDefault();
                      if (!loadingNewPage && num !== page) {
                        goToPage(num);
                      }
                    }}
                    className={
                      loadingNewPage || num === page
                        ? "pointer-events-none opacity-50 cursor-not-allowed"
                        : "cursor-pointer"
                    }
                    aria-current={num === page ? "page" : undefined}
                  >
                    {num}
                  </PaginationLink>
                ) : (
                  <PaginationEllipsis />
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={(e) => {
                  e.preventDefault();
                  if (!(page >= totalPages || loadingNewPage)) {
                    goToPage(page + 1);
                  }
                }}
                aria-disabled={page >= totalPages || loadingNewPage}
                className={
                  page >= totalPages || loadingNewPage
                    ? "pointer-events-none opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}
    </div>
  );
}
