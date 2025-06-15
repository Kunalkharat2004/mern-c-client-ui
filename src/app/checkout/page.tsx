"use client";

import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useState } from "react";
import AddressCard from "./components/AddressCard";
import PaymentMode from "./components/PaymentMode";
import { Textarea } from "@/components/ui/textarea";
import OrderSummary from "../cart/components/order-summary";
import { RadioGroup } from "@/components/ui/radio-group";

export type paymentMethodType = {
  key: string;
  label: string;
};

const paymentMode: paymentMethodType[] = [
  {
    key: "cash",
    label: "Cash on Delivery",
  },
  {
    key: "card",
    label: "Card",
  },
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

const CheckOut = () => {
  const [selectedAddress, setSelectedAddress] = useState<string>("home");
  const [selectedPayment, setSelectedPayment] = useState<string>("cash");

  return (
    <section className="container mx-auto max-w-7xl px-4 py-10 flex flex-col lg:flex-row gap-8">
      <div className="w-full lg:w-2/3">
        <Card className="border-2 shadow-lg">
          <CardHeader className="border-b">
            <CardTitle className="text-2xl font-semibold">
              Customer Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">
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
            <div className="space-y-4">
              <Label
                htmlFor="address"
                className="block text-sm font-medium text-gray-700"
              >
                Delivery Address
              </Label>
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
                draggable="false"
                placeholder="Any special instructions or notes for your order..."
                id="message"
                className="focus:border-primary focus:ring-primary"
              />
            </div>
          </CardFooter>
        </Card>
      </div>
      {/* <div className="w-full lg:w-1/3"> */}
        <OrderSummary />
      {/* </div> */}
    </section>
  );
};

export default CheckOut;
