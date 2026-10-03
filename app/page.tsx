// @ts-nocheck
import { findGuestByRef } from "@/lib/guest";
import { normalizeGuestType, normalizeInvitePrefix } from "@/lib/guest-types";
import HomeComponent from "./components/HomeComponent";

// Link preview (Zalo/Messenger/...): personalised with the invited guest's name.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;
  const guest = await findGuestByRef(id);
  const prefix = normalizeInvitePrefix(guest?.invitePrefix); // e.g. "Thân mời", "Kính mời"
  const title = guest
    ? `${prefix} ${guest.name} | Lễ cưới Quang Anh & Ninh Giang`
    : "Thiệp cưới Quang Anh & Ninh Giang";
  const type = normalizeGuestType(guest?.guestType);
  const parties = {
    BOTH: "Tiệc nhà gái 18.10.2026 (Hải Phòng) · Tiệc nhà trai 25.10.2026 (Hà Nội).",
    BRIDE: "Tiệc nhà gái 18.10.2026 tại Hải Phòng.",
    GROOM: "Tiệc nhà trai 25.10.2026 tại Hà Nội.",
  }[type];
  const description = guest
    ? `Quang Anh & Ninh Giang trân trọng ${prefix.replace(/^trân trọng\s+/i, "").toLowerCase()} ${guest.name} đến dự lễ cưới. ${parties}`
    : "Trân trọng kính mời bạn đến dự lễ cưới của Quang Anh & Ninh Giang.";
  const image = { url: "/assets/og-cover.jpg", width: 1200, height: 630, alt: "Quang Anh & Ninh Giang" };
  return {
    title,
    description,
    openGraph: { title, description, type: "website", locale: "vi_VN", images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image.url] },
  };
}

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;
  const guest = await findGuestByRef(id);

  // Pass guest info to HomeComponent
  return <HomeComponent guest={guest} />;
}