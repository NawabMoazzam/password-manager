"use client";

import { Button } from "@/components/ui/button";
import { Loader2Icon, Trash2Icon } from "lucide-react";
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { getCards, deleteCard } from "@/lib/_actions";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface CardData {
  cardNote?: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

interface CardTableProps {
  refreshKey?: number;
}

export function CardsTable({ refreshKey }: CardTableProps) {
  const { user } = useUser();
  const [cards, setCards] = useState<CardData[]>([]);
  const [loadingCard, setLoadingCard] = useState<boolean>(true);

  useEffect(() => {
    async function fetchCards() {
      try {
        if (!user) return;
        setLoadingCard(true);
        const data = await getCards(user.id);
        setCards(data.reverse());
        setLoadingCard(false);
      } catch (error: unknown) {
        setLoadingCard(false);
        if (error instanceof Error) {
          console.error("Error fetching cards:", error.message);
          toast.error(error.message);
        } else if (typeof error === "string") {
          console.error("Error fetching cards:", error);
          toast.error(error);
        } else {
          console.error("Error fetching cards:", error);
          toast.error("An unexpected error occurred. Please try again.");
        }
      }
    }
    fetchCards();
  }, [user, refreshKey]);

  async function handleDelete(index: number) {
    try {
      if (!user) return;
      const updatedCards = await deleteCard(index, user.id);
      setCards(updatedCards.reverse());
      toast.success("Card deleted successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        console.error("Error deleting card:", error.message);
        toast.error(error.message);
      } else if (typeof error === "string") {
        console.error("Error deleting card:", error);
        toast.error(error);
      } else {
        console.error("Error deleting card:", error);
        toast.error("Failed to delete card. Please try again.");
      }
    }
  }
  return (
    <Card className="w-full">
      <CardHeader>
          <CardTitle>Manage Your Credit Cards</CardTitle>
          <CardDescription>
            Ensure you follow best practices for password management.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableCaption>A list of all your Credit Cards.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Card Note</TableHead>
                <TableHead>Card No.</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>CVV</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
          <TableBody>
            {loadingCard && (
              <TableRow>
                <TableCell colSpan={5} className="text-primary">
                  <Loader2Icon className="mx-auto animate-spin" />
                </TableCell>
              </TableRow>
            )}
            {!loadingCard && cards.length <= 0 && (
              <TableRow>
                <TableCell colSpan={5} className="text-center font-medium">
                  No Cards Found!
                </TableCell>
              </TableRow>
            )}
            {cards.length > 0 &&
              cards.map((card, index) => (
                <TableRow key={index}>
                  <TableCell className="font-medium">
                  {card.cardNote}
                </TableCell>
                <TableCell>{card.cardNumber}</TableCell>
                <TableCell>{card.expiryDate}</TableCell>
                <TableCell>{card.cvv}</TableCell>
                  <TableCell className="text-right">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="ghost" className="hover:text-red-500">
                          <Trash2Icon />
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Delete Card</DialogTitle>
                          <DialogDescription>
                            Are you sure you want to delete this card?
                            <br />
                            <span className="text-destructive">
                              This action cannot be undone!
                            </span>
                          </DialogDescription>
                        </DialogHeader>
                        <DialogFooter>
                          <DialogClose asChild>
                            <Button variant="outline">Cancel</Button>
                          </DialogClose>
                          <DialogClose asChild>
                            <Button
                              onClick={() => {
                                handleDelete(index);
                              }}
                            >
                              Delete
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
