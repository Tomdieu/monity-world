"use client"
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Validation Schema
const cardFormSchema = z.object({
  cardNumber: z.string()
    .min(16, "Card number must be at least 16 characters")
    .max(19, "Card number must not exceed 19 characters"),
  cardId: z.string()
    .min(3, "Card ID must be at least 3 characters")
    .max(50, "Card ID must not exceed 50 characters"),
  cardRechargeLimit: z.string()
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .transform((val) => Number(val)),
  dailyExpendingLimit: z.string()
    .refine((val) => !isNaN(Number(val)), "Must be a valid number")
    .transform((val) => Number(val)),
  cardType: z.string({
    required_error: "Please select a card type",
  }),
  validityPeriod: z.string({
    required_error: "Please select a validity period",
  }),
});

type CardFormValues = z.infer<typeof cardFormSchema>;

const defaultValues: Partial<CardFormValues> = {
  cardNumber: "",
  cardId: "",
  cardRechargeLimit: "",
  dailyExpendingLimit: "",
  cardType: "",
  validityPeriod: "",
};

export default function AddNewCardPage() {
  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues,
  });

  function onSubmit(values: CardFormValues) {
    console.log(values);
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold">Add New Card</h1>
        <p className="text-sm text-gray-500">Fill in the form to add new card</p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-blue-500">Personal Details:</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Card Number */}
              <FormField
                control={form.control}
                name="cardNumber"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Card ID */}
              <FormField
                control={form.control}
                name="cardId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card ID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter Surname" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Card Recharge Limit */}
              <FormField
                control={form.control}
                name="cardRechargeLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card recharge Limit</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">XAF</span>
                        <Input className="pl-12" placeholder="1.0.0.1" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Daily Expending Limit */}
              <FormField
                control={form.control}
                name="dailyExpendingLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Daily Expending Limit</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">XAF</span>
                        <Input className="pl-12" placeholder="1.0.0.1" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Card Type */}
              <FormField
                control={form.control}
                name="cardType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Card Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select card type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="debit">Debit Card</SelectItem>
                        <SelectItem value="credit">Credit Card</SelectItem>
                        <SelectItem value="prepaid">Prepaid Card</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Validity Period */}
              <FormField
                control={form.control}
                name="validityPeriod"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Validity period</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="6months">6 Months</SelectItem>
                        <SelectItem value="1year">1 Year</SelectItem>
                        <SelectItem value="2years">2 Years</SelectItem>
                        <SelectItem value="5years">5 Years</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" className="bg-emerald-500 hover:bg-emerald-600">
              Create
              <Check className="ml-2 size-4" />
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}