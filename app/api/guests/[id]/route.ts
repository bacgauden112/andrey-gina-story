import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";
import { isGuestType, normalizeInvitePrefix, rsvpConflictsWith, RSVP_RESET } from "@/lib/guest";

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

    const current = await prisma.guest.findUnique({ where: { id } });
    if (!current) return NextResponse.json({ error: "Guest not found" }, { status: 404 });

    // How the guest is addressed is an admin choice as well.
    if (body.invitePrefix !== undefined) {
      if ((await cookies()).get("admin_auth")?.value !== "true") {
        return NextResponse.json({ error: "Not allowed" }, { status: 403 });
      }
      updateData.invitePrefix = normalizeInvitePrefix(body.invitePrefix);
    }

    // Changing the invitation type is an admin action (the RSVP form never sends it).
    if (body.guestType !== undefined) {
      const isAdmin = (await cookies()).get("admin_auth")?.value === "true";
      if (!isAdmin || !isGuestType(body.guestType)) {
        return NextResponse.json({ error: "Not allowed" }, { status: 403 });
      }
      if (body.guestType !== current.guestType) {
        if (rsvpConflictsWith(body.guestType, current)) {
          if (body.resetRsvp !== true) {
            return NextResponse.json({ error: "RSVP_CONFLICT" }, { status: 409 });
          }
          Object.assign(updateData, RSVP_RESET);
        }
        updateData.guestType = body.guestType;
      }
    }

    // A guest can only answer for the parties they are invited to.
    const type = updateData.guestType ?? current.guestType;
    if (type === "GROOM") {
      updateData.attendBride = false;
      updateData.needShuttle = false;
      updateData.shuttleCount = 0;
    } else if (type === "BRIDE") {
      updateData.attendGroom = false;
    }
    if ((updateData.status ?? current.status) === "THAM_GIA") {
      if (type === "GROOM") updateData.attendGroom = true;
      if (type === "BRIDE") updateData.attendBride = true;
    }

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
