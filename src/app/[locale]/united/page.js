import Image from "next/image";
import OrgCard from "@/components/coalition/OrgCard";
import PostOrgForm from "@/components/coalition/PostOrgForm";
import { getOrgs } from "@/data-access/coalition";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";
import { getTranslations } from "next-intl/server";
import { Link } from "@/src/i18n/routing";
import UnitedAbout from "@/components/coalition/UnitedAbout";

export const metadata = {
  title: "Our Coalition",
  description:
    "List and info of orgs in Northern Virginia who have made at least one of their missions for the defunding/abolition of the police! Website created by Chris Thornburg, github:CJThornburg "
};

export default async function United() {
  const session = await getServerSession(authOptions);
  const t = await getTranslations("United");

  let orgsDB = await getOrgs();
  return (
    <>
      <UnitedAbout />
      <div className="py-5 med-green">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {orgsDB.map((org, index) => (
              <OrgCard
                src={org.imageLink}
                alt={org.imageAlt}
                altSpanish={org.imageAltSpanish}
                imageAltSpanishHowTranslated={org.imageAltSpanishHowTranslated}
                key={org.id}
                id={org.id}
                orgName={org.orgName}
                englishText={org.english}
                spanishText={org.spanish}
                descriptionSpanishHowTranslated={
                  org.descriptionSpanishHowTranslated
                }
                twitter={org.twitter}
                instagram={org.instagram}
                facebook={org.facebook}
                website={org.website}
                session={session}
              />
            ))}
          </div>
        </div>
      </div>
      {session && <PostOrgForm />}
    </>
  );
}
