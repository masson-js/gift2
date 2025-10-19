'use server';

import { PrismaClient } from '@prisma/client';
import { revalidatePath } from 'next/cache';

// Define the shape of the form data for createGiftWish
interface FormData {
  name: string;
  class: string;
  age: string;
  giftWish: string;
  giftLink: string;
}

// Define the shape of a gift wish record, aligned with Prisma schema
interface GiftWish {
  id: string; // Changed to string to match @default(cuid())
  name: string;
  class: string;
  age: number;
  giftWish: string;
  giftLink: string | null;
  createdAt: Date;
}

// Define the return type for createGiftWish
interface CreateGiftWishResult {
  success: boolean;
  data?: GiftWish;
  error?: string;
}

// Define the return type for getGiftWishesByClass
interface GetGiftWishesResult {
  success: boolean;
  data?: { [className: string]: GiftWish[] };
  error?: string;
}

// Initialize Prisma client
const globalForPrisma = globalThis as { prisma?: PrismaClient };
const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = prisma;
}

export async function createGiftWish(formData: FormData): Promise<CreateGiftWishResult> {
  try {
    const giftWish = await prisma.giftWish.create({
      data: {
        name: formData.name,
        class: formData.class,
        age: parseInt(formData.age),
        giftWish: formData.giftWish,
        giftLink: formData.giftLink || null,
      },
    });

    revalidatePath('/');

    return { success: true, data: giftWish };
  } catch (error) {
    console.error('Error creating gift wish:', error);
    return { success: false, error: 'Nie udało się wysłać listu do Świętego Mikołaja' };
  }
}

export async function getGiftWishesByClass(): Promise<GetGiftWishesResult> {
  try {
    const giftWishes = await prisma.giftWish.findMany({
      orderBy: [
        { class: 'asc' },
        { name: 'asc' },
      ],
    });

    // Group wishes by class with explicit type for accumulator
    const groupedByClass = giftWishes.reduce<{ [className: string]: GiftWish[] }>(
      (acc, wish) => {
        if (!acc[wish.class]) {
          acc[wish.class] = [];
        }
        acc[wish.class].push(wish);
        return acc;
      },
      {}
    );

    return { success: true, data: groupedByClass };
  } catch (error) {
    console.error('Error fetching gift wishes:', error);
    return { success: false, error: 'Nie udało się pobrać życzeń' };
  }
}

interface VerifyPasswordResult {
  success: boolean;
  error?: string;
}

export async function verifyPassword(password: string): Promise<VerifyPasswordResult> {
  try {
    const correctPassword = process.env.PASSWORD;
    if (!correctPassword) {
      return { success: false, error: 'Brak hasła w konfiguracji serwera' };
    }
    if (password === correctPassword) {
      return { success: true };
    }
    return { success: false, error: 'Nieprawidłowy hasło' };
  } catch (error) {
    console.error('Error verifying password:', error);
    return { success: false, error: 'Wystąpił błąd podczas weryfikacji hasła' };
  }
}