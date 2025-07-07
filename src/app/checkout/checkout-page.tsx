"use client";

import React, { useEffect } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import AddressCard from "./components/AddressCard";
import PaymentMode from "./components/PaymentMode";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary from "./components/order-summary";
import { RadioGroup } from "@/components/ui/radio-group";
import { paymentMethodType } from "./page";
import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "@/lib/http/api";
import { Customer } from "@/lib/types";
import AddAddressDialog from "./components/add-address-dialog";
import CheckoutPageSkeleton from "./components/skeleton/checkout-page-skeleton";
import CheckoutPageError from "../../components/custom/page-error";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/lib/store/hooks";
import { toast } from "sonner";

const paymentMode: paymentMethodType[] = [
  { key: "cash", label: "Cash on Delivery" },
  { key: "card", label: "Card" },
];

 const formSchema = z.object({
   addressId: z.string().min(1, "Please select an address"),
   paymentMethod: z.enum(["cash", "card"], {
     errorMap: () => ({ message: "Please select a payment method" }),
   }),
   message: z.string().optional(),
 });

type FormData = z.infer<typeof formSchema>;
// type CheckoutPageProps = {
//   onFormSubmit: (data: FormData) => void;
// } 

const CheckOutPage  = () => {

  const searchParams = useSearchParams();
  const cart = useAppSelector((state) => state.cart);

  const couponCodeRef = React.useRef("");
  const {
    data: customer,
    isLoading,
    isError,
  } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
      return await getCustomer().then((res) => res.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      addressId: "",
      paymentMethod: "cash",
      message: "",
    },
  });

  useEffect(() => {
    if (customer?.addresses.length && !form.getValues("addressId")) {
      const defaultAddress = customer.addresses.find(a => a.isDefault);
      const addressToSelect = defaultAddress || customer.addresses[0];
      form.setValue("addressId", addressToSelect._id);
    }
  },[customer, form]);

  // Handle place order
   const handlePlaceOrder = (values: FormData) => {
     // Find selected address details
     const selectedAddress = customer?.addresses?.find(
       (addr) => addr._id === values.addressId
     );
     const tenantId = searchParams.get("restaurantId");
     if(!tenantId){
      toast.error("Restaurant ID is missing in the URL");
      return;
     }

     const orderData = {
      cart: cart.cartItems,
      couponCode: couponCodeRef.current?.trim() || "",
      tenantId: tenantId,
      comment: values.message || "",
      address: {
        label: selectedAddress?.label || "",
        text: selectedAddress?.text || "",
        city: selectedAddress?.city || "",
        postalCode: selectedAddress?.postalCode || "",
        phone: selectedAddress?.phone || "",
        isDefault: selectedAddress?.isDefault || false,
      },
      customerId: customer?._id,
      paymentMode: values.paymentMethod || "cash",
     }

     console.log("Order data to be sent:", orderData);
   };

  if (isLoading) return <CheckoutPageSkeleton />;
  if (isError)
    return (
      <div className="w-full flex justify-center">
        <CheckoutPageError errorType="server" />
      </div>
    );
  if (!customer) return <div>No customer data found</div>;
  return (
    <div className="container mx-auto px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handlePlaceOrder)}
          className="flex flex-col lg:flex-row gap-8"
        >
          {/* {Left Column - Customer Details} */}
          <div className="w-full lg:w-2/3">
            <Card className="border-2 shadow-lg">
              <CardHeader className="border-b border-gray-200">
                <CardTitle className="text-2xl font-semibold text-gray-800">
                  Customer Details
                </CardTitle>
              </CardHeader>

              <CardContent className="space-y-8 pt-8">
                {/* Name Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="firstName"
                      className="text-sm font-semibold text-gray-700"
                    >
                      First Name
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      autoComplete="given-name"
                      defaultValue={customer?.firstName || ""}
                      type="text"
                      placeholder="Enter your first name"
                      disabled
                      className="h-11 border-2 focus:border-primary focus:ring-primary transition-all duration-200"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="lastName"
                      className="text-sm font-semibold text-gray-700"
                    >
                      Last Name
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      defaultValue={customer?.lastName || ""}
                      autoComplete="family-name"
                      type="text"
                      placeholder="Enter your last name"
                      disabled
                      className="h-11 border-2 focus:border-primary focus:ring-primary transition-all duration-200"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="space-y-2">
                  <Label
                    htmlFor="email"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    defaultValue={customer?.email || ""}
                    autoComplete="email"
                    type="email"
                    placeholder="Enter your email"
                    disabled
                    className="h-11 border-2 focus:border-primary focus:ring-primary transition-all duration-200"
                  />
                </div>

                {/* Delivery Address with Add Button */}
                <div className="space-y-6">
                  <div className="flex justify-between items-center">
                    <Label className="text-lg font-semibold text-gray-800">
                      Delivery Address
                    </Label>

                    <AddAddressDialog id={customer._id} />
                  </div>
                  <FormField
                    name="addressId"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            {customer?.addresses &&
                            customer.addresses.length > 0 ? (
                              <RadioGroup
                                value={field.value}
                                onValueChange={field.onChange}
                                className="grid grid-cols-1 md:grid-cols-2 gap-4"
                              >
                                {customer.addresses
                                  .sort((a, b) =>
                                    a.isDefault === b.isDefault
                                      ? 0
                                      : a.isDefault
                                      ? -1
                                      : 1
                                  )
                                  .map((address) => (
                                    <AddressCard
                                      key={address._id!}
                                      address={address}
                                      selected={field.value === address._id!}
                                      value={address._id}
                                    />
                                  ))}
                              </RadioGroup>
                            ) : (
                              <div className="text-center py-8 text-gray-500">
                                <p>
                                  No addresses added yet. Click &quot;Add
                                  Address&quot; to get started.
                                </p>
                              </div>
                            )}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>

                {/* Payment */}
                <div className="space-y-6">
                  <Label className="text-lg font-semibold text-gray-800">
                    Payment Method
                  </Label>

                  <FormField
                    name="paymentMethod"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <RadioGroup
                              value={field.value}
                              onValueChange={field.onChange}
                              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                            >
                              {paymentMode.map((mode) => (
                                <PaymentMode
                                  key={mode.key}
                                  label={mode.label}
                                  value={mode.key}
                                  selected={field.value === mode.key}
                                />
                              ))}
                            </RadioGroup>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </CardContent>

              <CardFooter className="border-t bg-gray-50">
                <div className="w-full space-y-3">
                  <Label
                    htmlFor="message"
                    className="text-sm font-semibold text-gray-700"
                  >
                    Additional Comments
                  </Label>
                  <FormField
                    name="message"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <FormItem>
                          <FormControl>
                            <Textarea
                              {...field}
                              id="message"
                              placeholder="Any special instructions or notes for your order..."
                              className="border-2 focus:border-primary resize-none"
                              rows={3}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      );
                    }}
                  />
                </div>
              </CardFooter>
            </Card>
          </div>

          {/* {Right Column - Order Summary} */}
          <OrderSummary handleCouponCodeChange={(code:string)=> couponCodeRef.current = code}/>
        </form>
      </Form>
    </div>
  );
};

export default CheckOutPage;
