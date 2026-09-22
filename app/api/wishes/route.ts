import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET() {
  try {
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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, content } = body;

    if (!name || !content) {
      return NextResponse.json({ error: 'Name and content are required' }, { status: 400 });
    }

    const wish = await prisma.wish.create({
      data: {
        name,
        content,
      },
    });

    return NextResponse.json(wish, { status: 201 });
  } catch (error) {
    console.error('Error creating wish:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
