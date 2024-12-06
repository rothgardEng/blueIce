import NewsCard from "@/components/newsComponents/NewsCard";
import PostRecForm from "@/components/recs/PostRecForm";
import { authOptions } from "@/Lib/auth/nextAuth";
import { getRecs } from "@/data-access/recs";
import { getServerSession } from "next-auth";
import { getTranslations } from "next-intl/server";
import { PaginationWithLinks } from "@/components/ui/paginationWithLinks.js";
import { Suspense } from "react";
import RecsLoading from "@/components/recs/RecsLoading";
import RecsList from "@/components/recs/RecsList";

export const metadata = {
  title: "Recommendations",
  description:
    "Knew to abolition thought? No worries, here is a list of books and other resources to learn what defund and abolition means. Spoiler its not was the media or politicians make it out to be! Website created by Chris Thornburg, github:CJThornburg "
};

export default async function Recs({ searchParams }) {
  const page = searchParams?.page ?? "1";
  const pageSize = searchParams?.pageSize ?? "5";
  const session = await getServerSession(authOptions);
  const t = await getTranslations("Recs");
  let recsDB = await getRecs(page, pageSize);
  return (
    <>
      <div className="flex items-center justify-center flex-col mt-6">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl text-center font-header mb-2 sm:mb-2 md-4 lg:mb-6 xl:mb-6">
          {t("Recs_title")}
        </h1>

        <Suspense fallback={<RecsLoading page={page} pageSize={pageSize} />}>
          <RecsList page={page} pageSize={pageSize} session={session} />
        </Suspense>
      </div>

      {session && <PostRecForm></PostRecForm>}
    </>
  );
}
