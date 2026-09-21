"use server";
import { cookies } from "next/headers";

const ADMIN_PASSWORD = "wedding2026"; // Hardcoded password

export async function login(password: string) {
  if (password === ADMIN_PASSWORD) {
    (await cookies()).set("admin_auth", "true", { httpOnly: true, path: "/" });
    return { success: true };
  }
  return { success: false, error: "Sai mật khẩu" };
}

export async function logout() {
  (await cookies()).delete("admin_auth");
}
