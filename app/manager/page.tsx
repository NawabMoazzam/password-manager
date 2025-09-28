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
    </div>
  );
}
