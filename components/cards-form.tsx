"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { addCard } from "@/lib/_actions";
import { useUser } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Loader2Icon } from "lucide-react";
import { toast } from "sonner";

const formSchema = z.object({
  cardNote: z.string().optional(),
  cardNumber: z.string().min(12, "Card Number must be at least 12 characters"),
  expiryDate: z
    .string()
    .regex(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Expiry Date must be in MM/YY format"
    ),
  cvv: z.string().min(3, "CVV must be at least 3 characters"),
});

interface CardFormProps {
  onAdded?: () => void;
}

export function CardsForm({ onAdded }: CardFormProps) {
  const { user } = useUser();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      cardNote: "",
      cardNumber: "",
      expiryDate: "",
      cvv: "",
    },
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    if (user) {
      addCard(data, user?.id);
      form.reset();
      toast.success("Card secured successfully!");
      onAdded?.();
    }
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Secure Your Cards</CardTitle>
        <CardDescription>
          Ensure you follow best practices for cards management.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="cardNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Number</FormLabel>
                  <FormControl>
                    <Input placeholder="Card Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Expiry Date</FormLabel>
                  <FormControl>
                    <Input placeholder="Expiry Date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cvv"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CVV</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      min={0}
                      placeholder="CVV"
                      {...field}
                      className="[appearance:textfield] [&::-webkit-inner-spin-button]:m-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:m-0 [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cardNote"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Card Note</FormLabel>
                  <FormControl>
                    <Input placeholder="Card Note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {!form.formState.isSubmitting && (
              <Button type="submit">Secure Card</Button>
            )}
            {form.formState.isSubmitting && (
              <Button disabled className="cursor-progress">
                <Loader2Icon className="animate-spin" />
                Secure Card
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
