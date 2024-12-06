import React from "react";
import { PaginationWithLinks } from "../ui/paginationWithLinks";
import { Skeleton } from "@/components/ui/skeleton";

export default function RecsLoading({ page, pageSize }) {
  const randomTotal = Math.floor(Math.random() * 100);
  const loadingArray = new Array(Number(pageSize)).fill(null);

  return (
    <div className="lg:w-2/3 md:w-11/12 sm:w-9/12 w-9/12">
      <PaginationWithLinks
        page={Number(page)}
        pageSize={Number(pageSize)}
        totalCount={randomTotal}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 15] }}
      />

      {loadingArray.map((_, i) => (
        <div
          key={i}
          className="w-full min-h-80   lg:w-7xl  offWhite rounded-lg shadow-md overflow-hidden mt-4 mb-4 mx-3 lg:mx-4 xl:mx-1 sm:mx-1 "
        >
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/2">
              <Skeleton className="w-full h-56 object-cover mx-0" />
            </div>

            <div className="w-full md:w-1/2 p-4">
              <Skeleton className="h-8 w-3/4 mb-4" />

              <Skeleton className="h-6 w-full mb-2" />
              <Skeleton className="h-6 w-5/6 mb-2" />
              <Skeleton className="h-6 w-3/4" />
            </div>
          </div>

          <div className="p-4 border-t">
            <div className="flex justify-around">
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
              <Skeleton className="h-4 w-1/4" />
            </div>
            <div className="flex justify-around mt-4">
              <Skeleton className="h-4 w-2/12" />
              <Skeleton className="h-4 w-1/4" />
            </div>
          </div>
        </div>
      ))}

      <PaginationWithLinks
        page={Number(page)}
        pageSize={Number(pageSize)}
        totalCount={randomTotal}
        pageSizeSelectOptions={{ pageSizeOptions: [5, 10, 15] }}
      />
    </div>
  );
}
