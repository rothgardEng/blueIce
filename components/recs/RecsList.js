import React from "react";
import { getRecs } from "@/data-access/recs";
import NewsCard from "../newsComponents/NewsCard";
import { PaginationWithLinks } from "../ui/paginationWithLinks";

export default async function RecsList({ page, pageSize, session }) {
  await new Promise((resolve) => setTimeout(resolve, 5000));
  let recsDB = await getRecs(page, pageSize);
  return (
    <div className="max-w-7xl">
      <PaginationWithLinks
        page={Number(page)}
        pageSize={Number(pageSize)}
        totalCount={recsDB.count}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 15] }}
      />

      {recsDB.data.map((item, index) => (
        <NewsCard
          id={item.id}
          media={item.imageLink}
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
          key={item.id}
          forNewsCard={false}
          author={item.author}
          topic={item.typeA}
          genre={item.genre}
          session={session}
        />
      ))}

      <PaginationWithLinks
        page={Number(page)}
        pageSize={Number(pageSize)}
        totalCount={recsDB.count}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 15] }}
      />
    </div>
  );
}
