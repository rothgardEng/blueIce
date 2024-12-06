import React from "react";
import { getTranslations } from "next-intl/server";
import {Link} from '@/src/i18n/routing';

export default async function UnitedAbout() {
  const t = await getTranslations("United");
  return (
    <>
      <section id="team">
        <div className="container mx-auto defund">
          <div className=" flex justify-center items-center flex-col text-center protest ">
            <h3 className="team text-9xl font-header  font-semibold">
              {t("United_title")}
            </h3>
          </div>
        </div>
      </section>

      <section className="py-4 text-center mx-auto light-green">
          <div className="py-8">
            <div className="lg:w-2/3 md:w-2/3 mx-auto">
              <p className="lead text-muted header-text font-text text-gray-600 text-lg mx-auto sm:mx-4">
                {t("United_part_1")}
                <a
                  className="header-link english"
                  href="https://lacolectiva.org/defundnovapolice"
                  target="_blank"
                >
                  {t("United_hash_1")}
                </a>
                {t("United_part_2")}
              </p>
              <p className="text-gray-600 text-lg mx-auto lead text-muted header-text font-text  sm:mx-4">
                {t("United_part_3")}
                <a
                  className="header-link font-text spanish"
                  href="https://actionnetwork.org/petitions/carenotcops-nova-petition?source=direct_link"
                  target="_blank"
                >
                  {t("United_hash_2")}
                </a>
                {t("United_part_4")}
                <a
                  className="header-link font-text spanish"
                  href="https://lacolectiva.org/iceoutofarlington"
                  target="_blank"
                >
                 {t("United_hash_3")}
                </a>
                {t("United_part_5")}
              </p>
              <p className="text-gray-600 text-lg mx-auto lead text-muted header-text font-text english sm:mx-4 mb-6">
               {t("United_part_6")}
              </p>
              <p className='inline-block'>
                <Link
                  href="/joinus"
                  className="flex justify-center items-center"
                >
                  <button className="block py-3 px-3  rounded btn bg-dark text-white text-lg ">
                    {t("United_join_us")}
                  </button>
                </Link>
              </p>
            </div>
          </div>
        </section>
    </>
  );
}
