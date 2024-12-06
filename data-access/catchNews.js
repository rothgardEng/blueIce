"use server";
import { redirect } from "next/navigation";
import { createNews } from "./news";
import { getLocale } from "next-intl/server";

export async function catchNews(formData) {
  const locale = await getLocale();
  const newsPost = {
    title: formData.get("newsTitle"),
    typeA: formData.get("select"),
    titleSpanish: formData.get("newsTitleSpanish"),
    titleSpanishHowTranslated: formData.get("newsTitleSpanishTranslated"),
    body: formData.get("newsBody"),
    bodySpanish: formData.get("newsBodySpanish"),
    bodySpanishHowTranslated: formData.get("bodySpanishHowTranslated"),
    // file is is below this line
    imageLink: formData.get("newsMedia"),
    imageAlt: formData.get("newsImgAlt"),
    imageAltSpanish: formData.get("newsImgAltSpanish"),
    imageAltSpanishHowTranslated: formData.get("imageAltSpanishHowTranslated"),
    link: formData.get("newsLink"),
    anon: formData.get("newsAnon")
  };
  const res = await createNews(newsPost);
  if (res.ok) {
    redirect(`/${locale}/news`);
  } else {
    return res;
  }
}
