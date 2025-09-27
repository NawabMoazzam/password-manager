"use client";

import { useState } from "react";
import { PasswordForm } from "@/components/passwords-form";
import { PasswordsTable } from "@/components/passwords-table";
import { CardsForm } from "@/components/cards-form";
import { CardsTable } from "@/components/cards-table";

export default function Manager() {
  const [passKey, setPassKey] = useState(0);
  const [cardKey, setCardKey] = useState(0);
  return (
    <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
      <PasswordsTable refreshKey={passKey} />
      <CardsTable refreshKey={cardKey} />
      <PasswordForm onAdded={() => setPassKey((k) => k + 1)} />
      <CardsForm onAdded={() => setCardKey((k) => k + 1)} />
      {/* <Card className="w-full">
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
                <TableHead>Credit Card No.</TableHead>
                <TableHead>Expiry Date</TableHead>
                <TableHead>CVV</TableHead>
                <TableHead className="text-right">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">
                  Buissness Mastercard
                </TableCell>
                <TableCell>4174 19xx xxxx xxxx</TableCell>
                <TableCell>12/30</TableCell>
                <TableCell>456</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" className="hover:text-red-500">
                    <Trash2Icon />
                  </Button>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card> */}
    </div>
  );
}
