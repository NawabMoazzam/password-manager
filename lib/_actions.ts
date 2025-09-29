"use server";
import { clerkClient } from "@clerk/nextjs/server";
import CryptoJS from 'crypto-js';

interface PasswordData {
  website: string;
  username: string;
  password: string;
}

interface CardData {
  cardNote?: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export async function getPasswords(userId: string) {
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  let passwords =
    ((await user.privateMetadata.passwords) as PasswordData[]) || [];
    passwords = passwords.map(password => ({
      ...password,
      password: CryptoJS.AES.decrypt(password.password, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString(CryptoJS.enc.Utf8),
      username: CryptoJS.AES.decrypt(password.username, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString(CryptoJS.enc.Utf8),
    }));
  return passwords;
}


export async function addPassword(data: PasswordData, userId: string) {
  data.password = CryptoJS.AES.encrypt(data.password, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString();
  data.username = CryptoJS.AES.encrypt(data.username, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString();
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const passwords =
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
  const passwords =
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
  cards = cards.map(card => ({
    ...card,
    cardNumber: CryptoJS.AES.decrypt(card.cardNumber, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString(CryptoJS.enc.Utf8),
    cvv: CryptoJS.AES.decrypt(card.cvv, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString(CryptoJS.enc.Utf8),
    expiryDate: CryptoJS.AES.decrypt(card.expiryDate, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString(CryptoJS.enc.Utf8),
  }));
  return cards;
}

export async function addCard(data: CardData, userId: string) {
  data.cardNumber = CryptoJS.AES.encrypt(data.cardNumber, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString();
  data.cvv = CryptoJS.AES.encrypt(data.cvv, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString();
  data.expiryDate = CryptoJS.AES.encrypt(data.expiryDate, process.env.NEXT_PUBLIC_ENCRYPTION_KEY || '').toString();
  const client = await clerkClient();
  const user = await client.users.getUser(userId);
  const cards = ((await user.privateMetadata.cards) as CardData[]) || [];
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
  const cards = ((await user.privateMetadata.cards) as CardData[]) || [];
  cards.splice(index, 1);
  await client.users.updateUserMetadata(userId, {
    privateMetadata: {
      cards: cards,
    },
  });
  return cards;
}
