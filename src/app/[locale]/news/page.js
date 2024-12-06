import NewsCard from "@/components/newsComponents/NewsCard";
import { getNews } from "@/data-access/news";
import PostNewsForm from "@/components/newsComponents/PostNewsForm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";
import { getTranslations } from "next-intl/server";
import { PaginationWithLinks } from "@/components/ui/paginationWithLinks.js";
import NewsList from "@/components/newsComponents/NewsList";
import { Suspense } from "react";
import NewsLoading from "@/components/newsComponents/NewsLoading";

export const metadata = {
  title: "Latest News!",
  description:
    "Keep up on the latest news about our coalition, actions, wins and police actions. Website created by Chris Thornburg, github:CJThornburg "
};

export default async function News({ searchParams }) {
  const page = searchParams?.page ?? "1";
  const pageSize = searchParams?.pageSize ?? "5";
  const session = await getServerSession(authOptions);
  const t = await getTranslations("News");

  return (
    <>
      <div className="flex items-center justify-center flex-col mt-6">
        <h1 className="text-2xl sm:text-3xl md:text-3xl lg:text-5xl xl:text-6xl text-center font-header mb-2 sm:mb-2 md-4 lg:mb-6 xl:mb-6">
          {t("News_title")}
        </h1>

        <Suspense fallback={<NewsLoading page={page} pageSize={pageSize} />}>
          <NewsList page={page} pageSize={pageSize} session={session} />
        </Suspense>
      </div>
      {session && <PostNewsForm></PostNewsForm>}
    </>
  );
}
