import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { syncGuestWishes } from '@/lib/guest';

const prisma = new PrismaClient();

export async function GET() {
  try {
    await syncGuestWishes();
    const wishes = await prisma.wish.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return NextResponse.json(wishes);
  } catch (error) {
    console.error('Error fetching wishes:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
