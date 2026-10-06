import { NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { findGuestByRef, syncGuestWishes } from '@/lib/guest';

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

const MAX_WISHES_PER_LINK = 200;

// One invitation link can be shared (a company, a family): every person who opens it may post their own wish
// under their own display name. A valid link is required, which keeps random visitors out.
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const guest = await findGuestByRef(body.guest);
    if (!guest) {
      return NextResponse.json({ error: 'Invalid invitation link' }, { status: 403 });
    }

    const content = typeof body.content === 'string' ? body.content.trim().slice(0, 1000) : '';
    if (!content) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }
    const name = typeof body.name === 'string' ? body.name.replace(/\s+/g, ' ').trim().slice(0, 60) : '';
    if (!name) {
      return NextResponse.json({ error: 'Name is required' }, { status: 400 });
    }

    if ((await prisma.wish.count({ where: { guestId: guest.id } })) >= MAX_WISHES_PER_LINK) {
      return NextResponse.json({ error: 'Too many wishes from this link' }, { status: 429 });
    }
    // A double click / retry must not post the same wish twice.
    const dup = await prisma.wish.findFirst({
      where: { guestId: guest.id, name, content, createdAt: { gte: new Date(Date.now() - 60_000) } },
    });
    if (dup) return NextResponse.json(dup, { status: 200 });

    const wish = await prisma.wish.create({ data: { guestId: guest.id, name, content } });
    return NextResponse.json(wish, { status: 201 });
  } catch (error) {
    console.error('Error creating wish:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
