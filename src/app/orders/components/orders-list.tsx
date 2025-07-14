import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cookies } from "next/headers";
import { OrderType } from "@/lib/types";
import dayjs from "dayjs";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
} from "lucide-react";

interface OrderListProps {
  restaurantId: string | undefined;
  searchParams: {
    page?: string;
    limit?: string;
  };
}

const OrderList = async ({ restaurantId, searchParams }: OrderListProps) => {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("accessToken")?.value;

    // Get pagination parameters
    const page = searchParams.page || "1";
    const limit = searchParams.limit || "10";

    const ordersFetchResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/order/api/order/mine?page=${page}&limit=${limit}`,
      {
        next: { revalidate: 3600 }, // Cache for 1 hour
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    if (!ordersFetchResponse.ok && ordersFetchResponse.status !== 401) {
      throw new Error("Failed to load orders");
    }

    const ordersData = (await ordersFetchResponse.json()) || {};
    console.log("Orders: ", ordersData);

    const {
      data: orders = [],
      total = 0,
      perPage = 10,
      currentPage = 1,
      totalPages = 1,
      hasPrevPage = false,
      hasNextPage = false,
    } = ordersData;

    // Helper function to format payment mode
    const formatPaymentMode = (mode: string) => {
      switch (mode.toLowerCase()) {
        case "cod":
          return "Cash on Delivery";
        case "card":
          return "Card";
        default:
          return mode.charAt(0).toUpperCase() + mode.slice(1);
      }
    };

    // Helper function to create pagination URL
    const createPaginationUrl = (pageNumber: number) => {
      const params = new URLSearchParams(searchParams);
      params.set("page", pageNumber.toString());
      return `?restaurantId=${restaurantId}&${params.toString()}`;
    };

    return (
      <div className="container mx-auto max-w-7xl px-4 py-8">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
            <p className="text-muted-foreground">
              My complete order history ({total} total orders)
            </p>
          </div>
          
          {orders.length === 0 ? (
            <div className="text-center py-12">
              <div className="mx-auto max-w-sm">
                <div className="mb-4">
                  <div className="mx-auto h-12 w-12 rounded-full bg-muted flex items-center justify-center">
                    <svg
                      className="h-6 w-6 text-muted-foreground"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                      />
                    </svg>
                  </div>
                </div>
                <h3 className="text-lg font-semibold">No orders yet</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Orders will appear here once customers start placing them.
                </p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="rounded-md border bg-card p-6">
                <Table>
                  <TableCaption className="py-4">
                    A list of all your orders with detailed information.
                  </TableCaption>
                  <TableHeader>
                    <TableRow className="hover:bg-muted/50">
                      <TableHead className="w-[120px] font-semibold">
                        Order ID
                      </TableHead>
                      <TableHead className="font-semibold">
                        Payment Status
                      </TableHead>
                      <TableHead className="font-semibold">
                        Payment Method
                      </TableHead>
                      <TableHead className="font-semibold">Date & Time</TableHead>
                      <TableHead className="font-semibold">
                        Order Status
                      </TableHead>
                      <TableHead className="font-semibold">Amount</TableHead>
                      <TableHead className="text-right font-semibold">
                        Actions
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {orders.map((order: OrderType) => (
                      <TableRow
                        key={order._id}
                        className="hover:bg-muted/50 transition-colors"
                      >
                        <TableCell className="font-mono text-sm font-medium">
                          #{order._id?.slice(-8)}
                        </TableCell>
                        <TableCell>
                          <Badge variant={"outline"} className="capitalize">
                            {order.paymentStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="capitalize">
                          {formatPaymentMode(order.paymentMode)}
                        </TableCell>
                        <TableCell className="font-mono text-sm">
                          {dayjs(order.createdAt).format("DD/MM/YYYY: HH:mm:ss")}
                        </TableCell>
                        <TableCell>
                          <Badge variant={"outline"} className="capitalize">
                            {order.orderStatus}
                          </Badge>
                        </TableCell>
                        <TableCell className="font-semibold">
                          ₹{order.total.toLocaleString("en-IN")}
                        </TableCell>
                        <TableCell className="text-right">
                          <Link
                            href={`/order/${order._id}?restaurantId=${restaurantId}`}
                            className="text-primary underline"
                          >
                            View details
                          </Link>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <p className="text-sm text-muted-foreground">
                      Showing {(currentPage - 1) * perPage + 1} to{" "}
                      {Math.min(currentPage * perPage, total)} of {total} orders
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    {/* First Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!hasPrevPage}
                      asChild={hasPrevPage}
                    >
                      {hasPrevPage ? (
                        <Link href={createPaginationUrl(1)}>
                          <ChevronsLeft className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span>
                          <ChevronsLeft className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    {/* Previous Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!hasPrevPage}
                      asChild={hasPrevPage}
                    >
                      {hasPrevPage ? (
                        <Link href={createPaginationUrl(currentPage - 1)}>
                          <ChevronLeft className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span>
                          <ChevronLeft className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    {/* Page Numbers */}
                    {Array.from({ length: totalPages }, (_, i) => i + 1)
                      .filter((page) => {
                        // Show current page and 2 pages before/after
                        return Math.abs(page - currentPage) <= 2;
                      })
                      .map((page) => (
                        <Button
                          key={page}
                          variant={page === currentPage ? "default" : "outline"}
                          size="sm"
                          asChild={page !== currentPage}
                        >
                          {page === currentPage ? (
                            <span>{page}</span>
                          ) : (
                            <Link href={createPaginationUrl(page)}>{page}</Link>
                          )}
                        </Button>
                      ))}

                    {/* Next Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!hasNextPage}
                      asChild={hasNextPage}
                    >
                      {hasNextPage ? (
                        <Link href={createPaginationUrl(currentPage + 1)}>
                          <ChevronRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span>
                          <ChevronRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    {/* Last Page */}
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={!hasNextPage}
                      asChild={hasNextPage}
                    >
                      {hasNextPage ? (
                        <Link href={createPaginationUrl(totalPages)}>
                          <ChevronsRight className="h-4 w-4" />
                        </Link>
                      ) : (
                        <span>
                          <ChevronsRight className="h-4 w-4" />
                        </span>
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Error fetching orders:", error);
    // Render the error message if something went wrong other than 401
    return (
      <section className="container mx-auto max-w-7xl px-4 py-12">
        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <div className="flex items-center gap-3">
            <div className="flex-shrink-0">
              <svg
                className="h-5 w-5 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L3.312 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div>
              <h3 className="text-sm font-medium text-red-800">
                Failed to load orders
              </h3>
              <p className="text-sm text-red-700 mt-1">
                There was an error loading your orders. Please try refreshing
                the page.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default OrderList;