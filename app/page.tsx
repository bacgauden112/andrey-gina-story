// @ts-nocheck
import { prisma } from "@/lib/prisma";
import HomeComponent from "./components/HomeComponent";

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