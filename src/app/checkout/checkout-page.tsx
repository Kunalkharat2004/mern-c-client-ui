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
import { Button } from "@/components/ui/button";
import { paymentMethodType } from "./page";

const paymentMode: paymentMethodType[] = [
  { key: "cash", label: "Cash on Delivery" },
  { key: "card", label: "Card" },
];

const dummyAddresses = [
  {
    id: "home",
    title: "Home Address",
    address: "123 Pizza Street, Foodie City, FC 12345",
  },
  {
    id: "office",
    title: "Office Address",
    address: "456 Work Avenue, Business District, BD 67890",
  },
];

const CheckOutPage: React.FC = () => {
  const [selectedAddress, setSelectedAddress] = useState<string>("home");
  const [selectedPayment, setSelectedPayment] = useState<string>("cash");

  return (
    <>
      <div className="w-full lg:w-2/3">
        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-semibold">
              Customer Details
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  First Name
                </Label>
                <Input
                  id="firstName"
                  name="firstName"
                  autoComplete="given-name"
                  type="text"
                  placeholder="Enter your first name"
                  className="focus:border-primary focus:ring-primary"
                />
              </div>
              <div>
                <Label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-700"
                >
                  Last Name
                </Label>
                <Input
                  id="lastName"
                  name="lastName"
                  autoComplete="family-name"
                  type="text"
                  placeholder="Enter your last name"
                  className="focus:border-primary focus:ring-primary"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <Label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email Address
              </Label>
              <Input
                id="email"
                name="email"
                autoComplete="email"
                type="email"
                placeholder="Enter your email"
                className="focus:border-primary focus:ring-primary"
              />
            </div>

            {/* Delivery Address with Add Button */}
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <Label
                  htmlFor="address"
                  className="block text-sm font-medium text-gray-700"
                >
                  Delivery Address
                </Label>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="link" className="hover:no-underline cursor-pointer" size="sm">
                      + Add address
                    </Button>
                  </DialogTrigger>

                  <DialogContent className="sm:max-w-lg">
                    <DialogHeader>
                      <DialogTitle>Add a new address</DialogTitle>
                      <DialogDescription>
                        Enter a label and the full address below.
                      </DialogDescription>
                    </DialogHeader>

                    <form className="space-y-4">
                      <div>
                        <Label
                          htmlFor="newAddressTitle"
                          className="block text-sm mb-2 font-medium"
                        >
                          Label (e.g. “Home”, “Office”)
                        </Label>
                        <Input id="newAddressTitle" placeholder="My Home" />
                      </div>
                      <div>
                        <Label
                          htmlFor="newAddress"
                          className="block text-sm mb-2 font-medium"
                        >
                          Address
                        </Label>
                        <Textarea
                          id="newAddress"
                          placeholder="Street, City, ZIP, Country…"
                          rows={3}
                        />
                      </div>
                    </form>

                    <DialogFooter>
                      <Button type="submit">Save Address</Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>

              <RadioGroup
                value={selectedAddress}
                onValueChange={setSelectedAddress}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {dummyAddresses.map((address) => (
                  <AddressCard
                    key={address.id}
                    id={address.id}
                    title={address.title}
                    address={address.address}
                    selected={selectedAddress === address.id}
                  />
                ))}
              </RadioGroup>
            </div>

            {/* Payment */}
            <div className="space-y-4">
              <Label
                htmlFor="paymentMethod"
                className="block text-sm font-medium text-gray-700"
              >
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

          <CardFooter className="border-t">
            <div className="w-full space-y-3">
              <Label
                htmlFor="message"
                className="text-sm font-medium text-gray-700"
              >
                Additional Comments
              </Label>
              <Textarea
                id="message"
                placeholder="Any special instructions or notes for your order..."
                className="focus:border-primary focus:ring-primary"
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
