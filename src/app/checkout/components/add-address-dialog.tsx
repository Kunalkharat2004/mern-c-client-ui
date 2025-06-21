"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addAddress } from "@/lib/http/api";

// Schema to match your backend format with nested address object
const formSchema = z.object({
  address: z.object({
    label: z.enum(["Home", "Work", "Other"], {
      required_error: "Please select an address label",
    }),
    text: z.string().min(1, "Street address is required"),
    city: z.string().min(1, "City is required"),
    postalCode: z.string().min(1, "Postal code is required"),
    phone: z
      .string()
      .min(1, "Phone number is required")
      .max(10, "Phone number is too long"),
    isDefault: z.boolean(),
  }),
});

type AddAddressFormValues = z.infer<typeof formSchema>;

const AddAddressDialog = ({ id }: { id: string }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const queryClient = useQueryClient();
  const { mutate: addNewAddress, isPending } = useMutation({
    mutationKey: ["addAddress", id],
    mutationFn: async (newAddressData: AddAddressFormValues) => {
      // Pass the data exactly as your backend expects it
      const response = await addAddress({
        address: newAddressData,
        id,
      });
      return response;
    },
    onSuccess: () => {
      console.log("Address added successfully");
      setIsDialogOpen(false);
      // Reset form after successful submission
      form.reset({
        address: {
          label: "Home",
          text: "",
          city: "",
          postalCode: "",
          phone: "",
          isDefault: false,
        },
      });
      return queryClient.invalidateQueries({queryKey: ["customer"]});
    },
    onError: (error) => {
      console.error("Error adding address:", error);
    },
  });

  // Define your form with nested address structure
  const form = useForm<AddAddressFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      address: {
        label: "Home",
        text: "",
        city: "",
        postalCode: "",
        phone: "",
        isDefault: false,
      },
    },
  });

  const handleAddressSubmit = (values: AddAddressFormValues) => {
    console.log("Form values:", values);
    addNewAddress(values);
  };

  return (
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

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleAddressSubmit)}
            className="space-y-6 py-4"
          >
            {/* Address Label */}
            <FormField
              control={form.control}
              name="address.label"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Address Label *
                  </FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="h-11 border-2 focus:border-primary">
                        <SelectValue placeholder="Select address type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Home">🏠 Home</SelectItem>
                      <SelectItem value="Work">🏢 Work</SelectItem>
                      <SelectItem value="Other">📍 Other</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Street Address */}
            <FormField
              control={form.control}
              name="address.text"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Street Address *
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Enter your full street address (building, street, area)"
                      rows={3}
                      className="border-2 focus:border-primary focus:ring-primary resize-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* City and Postal Code Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="address.city"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      City *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter city name"
                        className="h-11 border-2 focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="address.postalCode"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="text-sm font-semibold text-gray-700">
                      Postal Code *
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter postal code"
                        className="h-11 border-2 focus:border-primary focus:ring-primary"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Phone Number */}
            <FormField
              control={form.control}
              name="address.phone"
              render={({ field }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-sm font-semibold text-gray-700">
                    Phone Number *
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter phone number"
                      type="tel"
                      className="h-11 border-2 focus:border-primary focus:ring-primary"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Set as Default */}
            <FormField
              control={form.control}
              name="address.isDefault"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                  <FormControl>
                    <input
                      type="checkbox"
                      id="isDefault"
                      checked={field.value}
                      onChange={(e) => field.onChange(e.target.checked)}
                      className="w-4 h-4 text-primary rounded focus:ring-primary"
                    />
                  </FormControl>
                  <Label htmlFor="isDefault" className="text-sm text-gray-700">
                    Set as default delivery address
                  </Label>
                </FormItem>
              )}
            />

            <DialogFooter className="pt-4 border-t">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="mr-2"
                disabled={isPending}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-primary hover:bg-primary text-white px-6"
                disabled={isPending}
              >
                {isPending ? "Saving..." : "Save Address"}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressDialog;
