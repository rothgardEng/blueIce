"use server";
import { redirect } from "next/navigation";
import { createOrg } from "./coalition";
import { getLocale } from "next-intl/server";

export async function catchOrg(formData) {
  const locale = await getLocale();
  const orgPost = {
    orgName: formData.get("orgName"),
    // below line is image file
    imageLink: formData.get("orgImage"),
    imageAlt: formData.get("orgImgAlt"),
    imageAltSpanishHowTranslated: formData.get("imageAltSpanishHowTranslated"),
    imageAltSpanish: formData.get("orgImgAltSpanish"),
    english: formData.get("orgDescriptionEnglish"),
    spanish: formData.get("orgDescriptionSpanish"),
    descriptionSpanishHowTranslated: formData.get(
      "descriptionSpanishHowTranslated"
    ),
    twitter: formData.get("orgTwitter"),
    instagram: formData.get("orgInstagram"),
    facebook: formData.get("orgFacebook"),
    website: formData.get("orgWebsite")
  };
  const res = await createOrg(orgPost);
  if (res.ok) {
    redirect(`/${locale}/united`);
  } else {
    return res;
  }
}
