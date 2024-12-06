"use server";
import { redirect } from "@/src/i18n/routing";

export default async function goToConsole() {
  redirect(`/auth/admin`);
}
