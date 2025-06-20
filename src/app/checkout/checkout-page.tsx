"use client";

import React, { useState } from "react";
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
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { paymentMethodType } from "./page";
import { useQuery } from "@tanstack/react-query";
import { getCustomer } from "@/lib/http/api";
import { Customer, Address } from "@/lib/types";
import { Plus} from "lucide-react";

const paymentMode: paymentMethodType[] = [
  { key: "cash", label: "Cash on Delivery" },
  { key: "card", label: "Card" },
];

const CheckOutPage: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<string>("");
  const [selectedPayment, setSelectedPayment] = useState<string>("cash");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [newAddress, setNewAddress] = useState<Address>({
    _id: "",
    label: "Home",
    text: "",
    city: "",
    postalCode: "",
    phone: "",
    isDefault: false,
  });

  const { data: customer, isLoading } = useQuery<Customer>({
    queryKey: ["customer"],
    queryFn: async () => {
      return await getCustomer().then((res) => res.data);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
    refetchOnWindowFocus: false,
  });

  const handleAddressSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle address submission logic here
    console.log("New address:", newAddress);
    setIsDialogOpen(false);
    // Reset form
    setNewAddress({
      _id: "",
      label: "Home",
      text: "",
      city: "",
      postalCode: "",
      phone: "",
      isDefault: false,
    });
  };

  const handleInputChange = (field: keyof Address, value: string | boolean) => {
    setNewAddress((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <>
      <div className="w-full lg:w-2/3">
        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b">
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

                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                  <DialogTrigger asChild>
                    <Button
                      variant="link"
                      className="text-primary cursor-pointer"
                      size="sm"
                    >
                      <Plus className="w-4 h-4 mr-2" />
                      Add Address
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader className="pb-4 border-b">
                      <DialogTitle className="text-xl font-semibold text-gray-800">
                        Add New Address
                      </DialogTitle>
                      <DialogDescription className="text-gray-600">
                        Fill in the details below to add a new delivery address.
                      </DialogDescription>
                    </DialogHeader>

                    <form
                      onSubmit={handleAddressSubmit}
                      className="space-y-6 py-4"
                    >
                      {/* Address Label */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Address Label *
                        </Label>
                        <Select
                          value={newAddress.label || "Home"}
                          onValueChange={(value) =>
                            handleInputChange("label", value)
                          }
                        >
                          <SelectTrigger className="h-11 border-2 focus:border-primary">
                            <SelectValue placeholder="Select address type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Home">🏠 Home</SelectItem>
                            <SelectItem value="Work">🏢 Work</SelectItem>
                            <SelectItem value="Other">📍 Other</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      {/* Street Address */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Street Address *
                        </Label>
                        <Textarea
                          value={newAddress.text || ""}
                          onChange={(e) =>
                            handleInputChange("text", e.target.value)
                          }
                          placeholder="Enter your full street address (building, street, area)"
                          rows={3}
                          className="border-2 focus:border-primary focus:ring-primary resize-none"
                        />
                      </div>

                      {/* City and Postal Code */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">
                            City *
                          </Label>
                          <Input
                            value={newAddress.city || ""}
                            onChange={(e) =>
                              handleInputChange("city", e.target.value)
                            }
                            placeholder="Enter city name"
                            className="h-11 border-2 focus:border-primary focus:ring-primary"
                          />
                        </div>
                        <div className="space-y-2">
                          <Label className="text-sm font-semibold text-gray-700">
                            Postal Code *
                          </Label>
                          <Input
                            value={newAddress.postalCode || ""}
                            onChange={(e) =>
                              handleInputChange("postalCode", e.target.value)
                            }
                            placeholder="Enter postal code"
                            className="h-11 border-2 focus:border-primary focus:ring-primary"
                          />
                        </div>
                      </div>

                      {/* Phone Number */}
                      <div className="space-y-2">
                        <Label className="text-sm font-semibold text-gray-700">
                          Phone Number *
                        </Label>
                        <Input
                          value={newAddress.phone || ""}
                          onChange={(e) =>
                            handleInputChange("phone", e.target.value)
                          }
                          placeholder="Enter phone number"
                          type="tel"
                          className="h-11 border-2 focus:border-primary focus:ring-primary"
                        />
                      </div>

                      {/* Set as Default */}
                      <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                        <input
                          type="checkbox"
                          id="isDefault"
                          checked={newAddress.isDefault || false}
                          onChange={(e) =>
                            handleInputChange("isDefault", e.target.checked)
                          }
                          className="w-4 h-4 text-primary rounded focus:ring-primary"
                        />
                        <Label
                          htmlFor="isDefault"
                          className="text-sm text-gray-700"
                        >
                          Set as default delivery address
                        </Label>
                      </div>

                      <DialogFooter className="pt-4 border-t">
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => setIsDialogOpen(false)}
                          className="mr-2"
                        >
                          Cancel
                        </Button>
                        <Button
                          type="submit"
                          className="bg-primary hover:bg-primary cursor-pointer px-6"
                        >
                          Save Address
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>

              {customer?.addresses && customer.addresses.length > 0 ? (
                <RadioGroup
                  value={selectedAddress}
                  onValueChange={setSelectedAddress}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4"
                >
                  {customer.addresses.map((address, index) => (
                    <AddressCard
                      key={address._id!}
                      address={address}
                      selected={selectedAddress === index.toString()}
                      value={index.toString()}
                    />
                  ))}
                </RadioGroup>
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>
                    No addresses added yet. Click &quot;Add Address&quot; to get started.
                  </p>
                </div>
              )}
            </div>

            {/* Payment */}
            <div className="space-y-6">
              <Label className="text-lg font-semibold text-gray-800">
                Payment Method
              </Label>
              <RadioGroup
                value={selectedPayment}
                onValueChange={setSelectedPayment}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {paymentMode.map((mode) => (
                  <PaymentMode
                    key={mode.key}
                    label={mode.label}
                    value={mode.key}
                    selected={selectedPayment === mode.key}
                  />
                ))}
              </RadioGroup>
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
              <Textarea
                id="message"
                placeholder="Any special instructions or notes for your order..."
                className="border-2 focus:border-primary resize-none"
                rows={3}
              />
            </div>
          </CardFooter>
        </Card>
      </div>

      <OrderSummary />
    </>
  );
};

export default CheckOutPage;
