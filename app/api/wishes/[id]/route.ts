import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { prisma } from '@/lib/prisma';

// Deleting a wish is an admin action.
export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if ((await cookies()).get('admin_auth')?.value !== 'true') {
      return NextResponse.json({ error: 'Not allowed' }, { status: 403 });
    }

    const { id } = await params;
    const wish = await prisma.wish.findUnique({ where: { id } });
    if (!wish) {
      return NextResponse.json({ error: 'Wish not found' }, { status: 404 });
    }

    // The RSVP message is mirrored on the guest. If it stayed there, the guestbook sync
    // would put the wish back, so it goes together with the wish. The guest's RSVP answers
    // (attending, parties, shuttle...) are not touched, and they can write a new message later.
    await prisma.$transaction([
      ...(wish.fromRsvp && wish.guestId
        ? [prisma.guest.updateMany({ where: { id: wish.guestId }, data: { message: null } })]
        : []),
      prisma.wish.delete({ where: { id } }),
    ]);

    return new NextResponse(null, { status: 204 });
  } catch (error) {
    console.error('Error deleting wish:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
