"use server";

import { signOut } from "@/app/utils/auth";

export async function handleSignOut() {
  await signOut({ redirectTo: "/" });
}
