// @ts-nocheck
import { prisma } from "@/lib/prisma";
import HomeComponent from "./components/HomeComponent";

async function findGuest(id: unknown) {
  if (!id || typeof id !== "string") return null;
  try {
    return await prisma.guest.findUnique({ where: { id } });
  } catch {
    return null;
  }
}

// Link preview (Zalo/Messenger/...): personalised with the invited guest's name.
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await searchParams;
  const guest = await findGuest(id);
  const title = guest
    ? `Thân mời ${guest.name} | Lễ cưới Quang Anh & Ninh Giang`
    : "Thiệp cưới Quang Anh & Ninh Giang";
  const description = guest
    ? `Quang Anh & Ninh Giang trân trọng kính mời ${guest.name} đến dự lễ cưới. Tiệc nhà gái 18.10.2026 (Hải Phòng) · Tiệc nhà trai 25.10.2026 (Hà Nội).`
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
  let guest = null;

  if (id && typeof id === "string") {
    guest = await prisma.guest.findUnique({
      where: { id },
    });
  }

  // Pass guest info to HomeComponent
  return <HomeComponent guest={guest} />;
}