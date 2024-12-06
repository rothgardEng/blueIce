import { getNews } from "@/data-access/news";
import NewsCard from "@/components/newsComponents/NewsCard";
import { PaginationWithLinks } from "../ui/paginationWithLinks";

export default async function NewsList({ page, pageSize, session }) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  let newsDB = await getNews(page, pageSize);
  return (
    <div className="max-w-7xl">
      <PaginationWithLinks
        page={Number(page)}
        pageSize={Number(pageSize)}
        totalCount={newsDB.count}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 15] }}
      />

      <div>
        {newsDB.data.map((item, index) => (
          <NewsCard
            media={item.imageLink}
            key={item.id}
            id={item.id}
            imgAlt={item.imageAlt}
            imgAltSpanish={item.imageAltSpanish}
            imageAltSpanishHowTranslated={item.imageAltSpanishHowTranslated}
            title={item.title}
            titleSpanish={item.titleSpanish}
            titleSpanishHowTranslated={item.titleSpanishHowTranslated}
            body={item.body}
            bodySpanish={item.bodySpanish}
            bodySpanishHowTranslated={item.bodySpanishHowTranslated}
            newsLink={item.link}
            anon={item.anon}
            postedBy={item.createdBy}
            createdAt={item.createdAt}
            updatedAt={item.updatedAt}
            forNewsCard={true}
            author=""
            topic={item.typeA}
            genre=""
            session={session}
          />
        ))}
      </div>
      <PaginationWithLinks
        page={Number(page)}
        pageSize={Number(pageSize)}
        totalCount={newsDB.count}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 15] }}
      />
    </div>
  );
}
