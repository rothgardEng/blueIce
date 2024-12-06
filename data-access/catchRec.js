"use server";
import { redirect } from "next/navigation";
import { createRec } from "./recs";
import { getLocale } from "next-intl/server";

export async function catchRec(formData) {
  const locale = await getLocale();
  const recPost = {
    title: formData.get("recTitle"),
    titleSpanish: formData.get("recTitleSpanish"),
    titleSpanishHowTranslated: formData.get("titleSpanishHowTranslated"),
    body: formData.get("recBody"),
    bodySpanish: formData.get("recBodySpanish"),
    bodySpanishHowTranslated: formData.get("bodySpanishHowTranslated"),
    author: formData.get("recAuthor"),
    imageLink: formData.get("recImage"),
    imageAlt: formData.get("recImgAlt"),
    imageAltSpanish: formData.get("recImgAltSpanish"),
    imageAltSpanishHowTranslated: formData.get("imageAltSpanishHowTranslated"),
    typeA: formData.get("recMediaType"),
    link: formData.get("recLink"),
    genre: formData.get("recGenre"),
    // value for anon is either "on" or
    anon: formData.get("recAnon")
  };

  const res = await createRec(recPost);
  if (res.ok) {
    redirect(`/${locale}/recs`);
  } else {
    return res;
  }
}
