"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  Home,
  ShoppingCart,
  AlertTriangle,
  Server,
  Wifi,
  User,
  CreditCard,
} from "lucide-react";

interface CheckoutPageErrorProps {
  error?: Error | null;
  onRetry?: () => void;
  onGoHome?: () => void;
  onGoToCart?: () => void;
  errorType?: "network" | "server" | "customer" | "payment" | "general";
}

const CheckoutPageError: React.FC<CheckoutPageErrorProps> = ({
  error,
  onRetry,
  onGoHome,
  onGoToCart,
  errorType = "general",
}) => {
  const getErrorConfig = (type: string) => {
    switch (type) {
      case "network":
        return {
          title: "Connection Problem",
          description:
            "Unable to connect to our servers. Please check your internet connection and try again.",
          icon: <Wifi className="h-8 w-8 text-red-500" />,
        };
      case "server":
        return {
          title: "Server Error",
          description:
            "Our servers are experiencing issues. We're working to fix this as quickly as possible.",
          icon: <Server className="h-8 w-8 text-red-500" />,
        };
      case "customer":
        return {
          title: "Customer Data Error",
          description:
            "We couldn't load your customer information. Please try again.",
          icon: <User className="h-8 w-8 text-red-500" />,
        };
      case "payment":
        return {
          title: "Payment System Error",
          description:
            "There's an issue with our payment system. Your order is safe and no charges have been made.",
          icon: <CreditCard className="h-8 w-8 text-red-500" />,
        };
      default:
        return {
          title: "Something went wrong",
          description:
            "Sorry, we encountered an error while loading the checkout page.",
          icon: <AlertTriangle className="h-8 w-8 text-red-500" />,
        };
    }
  };

  const errorConfig = getErrorConfig(errorType);

  return (
    <div className="min-h-[70vh] w-full flex items-center justify-center p-4 bg-gray-50">
      <div className="text-center max-w-md mx-auto">
        {/* Error Illustration */}
        <div className="relative mb-8">
          {/* Background Circle */}
          <div className="w-64 h-64 mx-auto bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center relative overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-6 left-8 w-4 h-4 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-12 right-12 w-3 h-3 bg-white rounded-full opacity-40"></div>
            <div className="absolute bottom-8 left-12 w-2 h-2 bg-white rounded-full opacity-50"></div>
            <div className="absolute bottom-16 right-8 w-5 h-5 bg-white rounded-full opacity-30"></div>

            {/* Server/Error Icon */}
            <div className="relative z-10">
              <div className="w-24 h-32 bg-gray-300 rounded-lg mx-auto mb-4 relative">
                {/* Server Stack */}
                <div className="absolute inset-x-2 top-2 bottom-2 space-y-1">
                  <div className="h-6 bg-gray-400 rounded flex items-center px-2">
                    <div className="w-1 h-1 bg-gray-600 rounded-full mr-1"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full mr-1"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-400 rounded flex items-center px-2">
                    <div className="w-1 h-1 bg-gray-600 rounded-full mr-1"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full mr-1"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                  <div className="h-6 bg-gray-400 rounded flex items-center px-2">
                    <div className="w-1 h-1 bg-gray-600 rounded-full mr-1"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full mr-1"></div>
                    <div className="w-1 h-1 bg-gray-600 rounded-full"></div>
                  </div>
                </div>
              </div>

              {/* Character */}
              <div className="relative">
                {/* Head */}
                <div className="w-12 h-12 bg-orange-200 rounded-full mx-auto mb-1 relative">
                  <div className="absolute top-3 left-3 w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                  <div className="absolute top-3 right-3 w-1.5 h-1.5 bg-gray-700 rounded-full"></div>
                  <div className="absolute top-8 left-1/2 transform -translate-x-1/2 w-6 h-2 bg-orange-300 rounded-full"></div>
                </div>

                {/* Body */}
                <div className="w-8 h-12 bg-white rounded-t-lg mx-auto mb-1"></div>

                {/* Arms (crossed) */}
                <div className="absolute top-12 left-1/2 transform -translate-x-1/2 w-16 h-1 bg-orange-200 rounded-full"></div>

                {/* Legs */}
                <div className="w-12 h-8 bg-blue-500 rounded-b-lg mx-auto mb-1"></div>
                <div className="flex justify-center space-x-2">
                  <div className="w-3 h-2 bg-gray-800 rounded"></div>
                  <div className="w-3 h-2 bg-gray-800 rounded"></div>
                </div>
              </div>
            </div>

            {/* Plant decoration */}
            <div className="absolute bottom-4 right-8">
              <div className="w-4 h-6 bg-orange-200 rounded-t-full"></div>
              <div className="w-6 h-3 bg-green-500 rounded-full -mt-1"></div>
              <div className="w-4 h-2 bg-green-600 rounded-full -mt-1 ml-1"></div>
            </div>
          </div>

          {/* Error Badge */}
          <div className="absolute -top-2 -right-8 w-12 h-12 bg-red-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xl font-bold">!</span>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h1 className="text-2xl font-bold text-gray-800">
            {errorConfig.title}
          </h1>

          <p className="text-gray-600 text-base leading-relaxed">
            {errorConfig.description}
          </p>

          {error && (
            <div className="text-sm text-red-600 bg-red-50 p-3 rounded-lg border border-red-200">
              <strong>Error:</strong> {error.message}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="mt-8 space-y-3">
          {onRetry && (
            <Button
              onClick={onRetry}
              className="w-full sm:w-auto px-8 py-3 bg-red-500 hover:bg-red-600 text-white font-medium rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          )}

          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            {onGoToCart && (
              <Button
                onClick={onGoToCart}
                variant="outline"
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <ShoppingCart className="h-4 w-4" />
                Back to Cart
              </Button>
            )}

            {onGoHome && (
              <Button
                onClick={onGoHome}
                variant="outline"
                className="px-6 py-2 border-gray-300 text-gray-700 hover:bg-gray-50 flex items-center justify-center gap-2"
              >
                <Home className="h-4 w-4" />
                Go Home
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPageError;
