import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function PATCH(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    // Status can be updated by RSVP form
    // Name, guestCount can be updated by Admin
    const updateData: any = {};
    if (body.name !== undefined) updateData.name = body.name;
    if (body.status !== undefined) updateData.status = body.status;
    if (body.guestCount !== undefined) updateData.guestCount = body.guestCount;
    if (body.attendBride !== undefined) updateData.attendBride = Boolean(body.attendBride);
    if (body.attendGroom !== undefined) updateData.attendGroom = Boolean(body.attendGroom);
    if (body.needShuttle !== undefined) updateData.needShuttle = Boolean(body.needShuttle);
    if (body.shuttleCount !== undefined) updateData.shuttleCount = Number(body.shuttleCount) || 0;
    if (body.message !== undefined) updateData.message = body.message ? String(body.message).slice(0, 1000) : null;

    const guest = await prisma.guest.update({
      where: { id },
      data: updateData,
    });
    return NextResponse.json(guest);
  } catch (error) {
    return NextResponse.json({ error: "Failed to update guest" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    await prisma.guest.delete({
      where: { id },
    });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete guest" }, { status: 500 });
  }
}
