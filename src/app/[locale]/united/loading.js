import { Skeleton } from "@/components/ui/skeleton";
import { Link } from "@/src/i18n/routing";
import { getTranslations } from "next-intl/server";
import classes from "./page.module.css";
import UnitedAbout from "@/components/coalition/UnitedAbout";

export default async function UnitedLoadingPage() {
  const loadingArray = new Array(12).fill(null);
  const t = await getTranslations("United");

  return (
    <>
       <UnitedAbout />

        <div className="py-5 med-green">
          <div className="container mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {loadingArray.map((_, i) => (
                <Skeleton key={i} className="mb-4 ml-4 mr-4">
                 
                  <Skeleton className="h-96 lg:h-96 md:h-44 sm:h-96 mb-4  " />

                  <div className=" p-4">
                    <Skeleton className="h-8 mx-2" />
                    <Skeleton className="h-6 mx-2 mt-2 " />
                    <Skeleton className="h-6 ml-2 mr-4 mt-1 " />
                    <Skeleton className="h-6 ml-2 mr-6 mt-1 " />
                    <Skeleton className="h-6 ml-2 mr-10 mt-1 " />
                    <Skeleton className="h-6 ml-2 mr-6 mt-1 " />
                    <Skeleton className="h-6 ml-2 mr-4 mt-1 " />

                    <div className="flex justify-between items-center mt-4 ">
                      <Skeleton target="_blank" className="text-muted">
                        <svg
                          className={` ${classes.icon}`}
                          width="24"
                          height="24"
                        >

                        </svg>
                      </Skeleton>

                      <Skeleton target="_blank" className="text-muted">
                        <svg
                          className={`bi ${classes.icon}`}
                          width="24"
                          height="24"
                        >

                        </svg>
                      </Skeleton>

                      <Skeleton target="_blank" className="text-muted">
                        <svg
                          className={`bi ${classes.icon}`}
                          width="24"
                          height="24"
                        >

                        </svg>
                      </Skeleton>

                      <Skeleton target="_blank" className="text-muted">
                        <svg
                          className={`bi ${classes.icon}`}
                          width="24"
                          height="24"
                        >

                        </svg>
                      </Skeleton>
                    </div>
                  </div>
                </Skeleton>
              ))}
            </div>
          </div>
        </div>

    </>
  );
}
