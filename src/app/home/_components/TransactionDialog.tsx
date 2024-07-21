"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon, Loader } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { createTransaction } from "@/app/actions/transaction";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { category } from "@/lib/dummy";
import { Combobox } from "@/components/ui/combobox";

const formSchema = z.object({
  title: z.string().min(2, {
    message: "Title must be at least 2 characters.",
  }),
  category: z
    .object({
      value: z.string(),
      label: z.string(),
    })
    .nullable(),
  amount: z.coerce.number().int().positive().min(1, {
    message: "Price must be more than 0.",
  }),
  date: z.date(),
});

interface TransactionDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  session: any;
}

function TransactionDialog({ open, setOpen, session }: TransactionDialogProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      category: null,
      amount: 0,
      date: new Date(),
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [transactionType, setTransactionType] = useState<"expense" | "income">(
    "expense"
  );

  const handleTransactionType = (value: "expense" | "income") => {
    setTransactionType(value);
  };

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);
    try {
      const response = await createTransaction({
        title: values.title,
        category: values.category?.value || "",
        amount: values.amount,
        date: values.date.toISOString(),
        userId: Number(session?.user?.id),
        type: transactionType,
      });
      location.reload();
      form.reset();
      setOpen(false);
    } catch (error) {
      console.error("Error creating expense:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Add Transaction</DialogTitle>
        <DialogDescription>
          Add to your transactions here. Click save when you are done.
        </DialogDescription>
      </DialogHeader>
      <RadioGroup
        defaultValue={transactionType}
        className="flex"
        onValueChange={handleTransactionType}
      >
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="expense" id="r1" />
          <Label htmlFor="r1">Expense</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="income" id="r2" />
          <Label htmlFor="r2">Income</Label>
        </div>
      </RadioGroup>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <FormControl>
                  <Controller
                    name="category"
                    control={form.control}
                    render={({ field }) => (
                      <Combobox
                        options={category}
                        placeholder=" Category"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    )}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Amount" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />
          <DialogFooter>
            <Button type="submit" className="w-[150px]">
              {isSubmitting ? <Loader /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
}

export default TransactionDialog;
