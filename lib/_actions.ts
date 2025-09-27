"use server";
import { clerkClient } from "@clerk/nextjs/server";

interface PasswordData {
  website: string;
  username: string;
  password: string;
}

interface CardData {
  cardNote: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export async function getPasswords(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let passwords =
    ((await user.privateMetadata.passwords) as PasswordData[]) || [];
  return passwords;
}


export async function addPassword(data: PasswordData, userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let passwords =
    ((await user.privateMetadata.passwords) as PasswordData[]) || [];
  passwords.push(data);
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: passwords,
    },
  });
  return;
}

export async function deletePassword(index: number, userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let passwords =
    ((await user.privateMetadata.passwords) as PasswordData[]) || [];
  passwords.splice(index, 1);
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      passwords: passwords,
    },
  });
  return passwords;
}

export async function getCards(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let cards = ((await user.privateMetadata.cards) as CardData[]) || [];
  return cards;
}

export async function addCard(data: CardData, userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let cards = ((await user.privateMetadata.cards) as CardData[]) || [];
  cards.push(data);
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      cards: cards,
    },
  });
  return;
}

export async function deleteCard(index: number, userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let cards = ((await user.privateMetadata.cards) as CardData[]) || [];
  cards.splice(index, 1);
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      cards: cards,
    },
  });
  return cards;
}
