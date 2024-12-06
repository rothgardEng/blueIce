import cl from "./page.module.css";
import TextSlider from "@/components/textSlider/TextSlider";
import "./globals.css";
import { useTranslations } from "next-intl";
import Image from "next/image";



export const metadata = {
  title: "Defund Nova Police — Fund the Community",
  description:
    "The Defund NoVA Police coalition formed in 2020 in the wake of that summer’s uprisings and demands to defund police departments across the country. Website created by Chris Thornburg, github:CJThornburg ",
  // openGraph: {
  //   title: "Defund Nova Police — Fund the Community",
  // description:
  //   "The Defund NoVA Police coalition formed in 2020 in the wake of that summer’s uprisings and demands to defund police departments across the country. Website created by Chris Thornburg, github:CJThornburg ",
  // url: "defundnovapolice.com",
  // siteName: "Defund Nova Police",
  // images: [
  //  { url: "https://defund-nova-police.s3.us-east-1.amazonaws.com/DefundBanner1260x800.png",
  //   width: 1260,
  //   height: 800

  //  }
  // ]
  // }
};

// export const dynamic = "force-static";


export default function Home() {
  const t = useTranslations("HomePage");
  return (
    <>
      <section id="calling-card">
        <div className="w-full ">
          <div className="flex justify-center">
            <Image
              src="https://defund-nova-police.s3.amazonaws.com/DefundBanner.png"
              alt="Defund NOVA Police - banner"
              layout="responsive"
              height={500}
              width={800}
              className="banner english object-cover"
            />
          </div>
          <div className="flex justify-center space-x-4 mt-6 pb-8">
            <a
              className="btn bg-dark text-white text-lg py-2 px-4 m-8 rounded font-text"
              href="/joinus"
            >
              {t("landing_button_joinus_cta")}
            </a>
            <a
              className="btn bg-dark text-white text-lg py-2 px-4 m-8 rounded font-text"
              href="/united"
            >
              {t("landing_button_aboutus")}
            </a>
          </div>
        </div>
      </section>

      <div className={`flex m-0  ${cl.banner_people}`}></div>
      <div>
        <TextSlider> </TextSlider>
      </div>

      <section id="alternatives" className="">
        <div className="container-fluid alt-color  ">
          <div className="pt-20 ">
            <div className="row">
              <h2 className="font-header text-7xl">
                {t("landing_who_you_going_to_call")}
              </h2>
            </div>
            <div className="row alt-text">
              <p className="font-text text-2xl">
                {t("landing_alternatives_subtitle")}
              </p>
            </div>
          </div>

          <div className="row pt-12 pb-16 ">
            <div className="col-lg-3 col-md-6 col-sm-12 btn-download">
              <div className="">
                <p className="text-3xl mb-9  font-header" id="arlington">
                  Arlington
                </p>
                <a
                  target="_blank"
                  className="rounded btn bg-dark text-white text-lg py-2 px-4 m-9 mb-9"
                  href="pdfs/ENGLISH Flyer Arlington ATCP.pdf"
                >
                  {t("landing_english")}
                </a>
                <a
                  target="_blank"
                  className="rounded btn bg-dark text-white text-lg py-2 px-4 m-9 mb-9"
                  href="pdfs/SPANISH Flyer Arlington ATCP.pdf"
                >
                  {t("landing_spanish")}
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6  col-sm-12 btn-download ">
              <div className="mt-14">
                <p className="text-3xl mb-9 mt-8  font-header ">Alexandria</p>
                <a
                  target="_blank"
                  className="rounded btn bg-dark text-white text-lg py-2 px-4 m-8"
                  href="pdfs/ENGLISH Flyer Alexandria ATCP.pdf"
                >
                  {t("landing_english")}
                </a>
                <a
                  target="_blank"
                  className="rounded btn bg-dark text-white text-lg py-2 px-4 m-8"
                  href="pdfs/SPANISH Flyer Alexandria ATCP.pdf"
                >
                  {t("landing_spanish")}
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6  col-sm-12 btn-download">
              <div className="mt-14">
                <p className="text-3xl mb-9 mt-8  font-header">Fairfax</p>
                <a
                  target="_blank"
                  className="rounded btn bg-dark text-white text-lg py-2 px-4 m-8"
                  href="pdfs/ENGLISH Flyer Fairfax ATCP.pdf"
                >
                  {t("landing_english")}
                </a>
                <a
                  target="_blank"
                  className="rounded btn bg-dark text-white text-lg py-2 px-4 m-8"
                  href="pdfs/SPANISH Flyer Fairfax ATCP.pdf"
                >
                  {t("landing_spanish")}
                </a>
              </div>
            </div>

            <div className="col-lg-3 col-md-6  col-sm-12 btn-download">
              <div className="mt-14">
                <p className="text-3xl mb-9 mt-8  font-header ">PWC</p>
                <a
                  target="_blank"
                  className="rounded btn bg-dark text-white text-lg py-2 px-4 m-8"
                  href="pdfs/ENGLISH Flyer PW ATCP.pdf"
                >
                  {t("landing_english")}
                </a>
                <a
                  target="_blank"
                  className="rounded btn bg-dark text-white text-lg py-2 px-4 m-8  "
                  href="pdfs/SPANISH Flyer PW ATCP.pdf"
                >
                  {t("landing_spanish")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
