import { Inter } from "next/font/google";
import "./globals.css";
// import Link from "next/link";
import MainHeader from "@/components/nav/MainHeader";
import NextAuthProvider from "@/components/auth/NextAuthProvider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/Lib/auth/nextAuth";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale
} from "next-intl/server";
import {Link } from "../../i18n/routing";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: {
    default: "Defund Nova Police - Fund the Community",
    template: "%s - Defund Nova Police"
  },
  keywords: ["Defund", "Police Brutality", "Police", "Tickets", "Fairfax Police", "Arlington Police", "Northern Virginia", "BLM", "DSA", "Democrats"],
  description: "Nova coalition of orgs calling for defunding and reallocation of funds to provide support to the community to address the root causes of poverty instead violently addressing the symptoms. List our demands , created by Chris Thornburg, github:CJThornburg ",
  twitter: {
    card: "summary_large_image",
    description: "Nova coalition of orgs calling for defunding and reallocation of funds to provide support to the community to address the root causes of poverty instead violently addressing the symptoms.",
  },
  openGraph: {
    description: "Nova coalition of orgs calling for defunding and reallocation of funds to provide support to the community to address the root causes of poverty instead violently addressing the symptoms.",
    images: [
      {
        url: "https://defund-nova-police.s3.us-east-1.amazonaws.com/opengraph-image.png"
      }
    ]
  }
};

export default async function RootLayout({ children, params: { locale } }) {
  const session = await getServerSession(authOptions);
  const messages = await getMessages();
  unstable_setRequestLocale(locale);

  return (
    <html lang={locale}>
      <body className="flex flex-col min-h-screen">
        <NextAuthProvider>
        <NextIntlClientProvider messages={messages}>
          <MainHeader />
          </NextIntlClientProvider>
        </NextAuthProvider>
        <main className="flex-grow">
          <NextAuthProvider>
            <NextIntlClientProvider messages={messages}>
              {children}
            </NextIntlClientProvider>
          </NextAuthProvider>
        </main>

        <div className="lightLightGreen ml-0 mr-0 pt-5">
          <footer className="flex mb-0 flex-wrap ml-14 mr-14 justify-between items-center py-3 my-4 border-t pt-6 pb-6 mt-0">
            <div className="flex items-center w-1/3">
              <a
                href="/"
                className="mr-2 text-gray-600 no-underline leading-tight"
              >
                <span className="text-gray-600">
                  &copy; 2024 Defund NOVA Police
                </span>
              </a>
              <span className="text-gray-600 mr-2 mb-0 no-underline leading-tight">
                -
              </span>
              {session ? (
                <Link
                  href="/auth/admin"
                  className="mr-2 text-gray-600 no-underline leading-tight"
                >
                  <span className="text-gray-600 mr-2 text-gray-600 no-underline leading-tight">
                    Admin Console
                  </span>
                </Link>
              ) : (
                <Link
                  href="/auth"
                  className="mr-2 text-gray-600 no-underline leading-tight"
                >
                  <span className="text-gray-600 mr-2 text-gray-600 no-underline leading-tight">
                    Admin
                  </span>
                </Link>
              )}
            </div>

            <ul className="flex justify-end w-1/3 list-none">
              <li className="ml-3">
                <a
                  className="text-gray-600"
                  href="https://twitter.com/DefundNoVaPD"
                  target="_blank"
                >
                  <svg className="bi footerIcon" width="24" height="24">
                    <use href="#twitter"></use>
                  </svg>
                </a>
              </li>
              <li className="ml-3">
                <a
                  className="text-gray-600"
                  href="https://www.instagram.com/defundnovapd/"
                  target="_blank"
                >
                  <svg className="bi footerIcon" width="24" height="24">
                    <use href="#instagram"></use>
                  </svg>
                </a>
              </li>
              <li className="ml-3">
                <a
                  className="text-gray-600"
                  href="https://www.facebook.com/Defund-Nova-Police-104108538196140/"
                  target="_blank"
                >
                  <svg className="bi footerIcon" width="24" height="24">
                    <use href="#facebook"></use>
                  </svg>
                </a>
              </li>
            </ul>
          </footer>
        </div>

        <svg xmlns="http://www.w3.org/2000/svg" height="0">
          <symbol id="bootstrap" viewBox="0 0 118 94">
            <title>Bootstrap</title>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M24.509 0c-6.733 0-11.715 5.893-11.492 12.284.214 6.14-.064 14.092-2.066 20.577C8.943 39.365 5.547 43.485 0 44.014v5.972c5.547.529 8.943 4.649 10.951 11.153 2.002 6.485 2.28 14.437 2.066 20.577C12.794 88.106 17.776 94 24.51 94H93.5c6.733 0 11.714-5.893 11.491-12.284-.214-6.14.064-14.092 2.066-20.577 2.009-6.504 5.396-10.624 10.943-11.153v-5.972c-5.547-.529-8.934-4.649-10.943-11.153-2.002-6.484-2.28-14.437-2.066-20.577C105.214 5.894 100.233 0 93.5 0H24.508zM80 57.863C80 66.663 73.436 72 62.543 72H44a2 2 0 01-2-2V24a2 2 0 012-2h18.437c9.083 0 15.044 4.92 15.044 12.474 0 5.302-4.01 10.049-9.119 10.88v.277C75.317 46.394 80 51.21 80 57.863zM60.521 28.34H49.948v14.934h8.905c6.884 0 10.68-2.772 10.68-7.727 0-4.643-3.264-7.207-9.012-7.207zM49.948 49.2v16.458H60.91c7.167 0 10.964-2.876 10.964-8.281 0-5.406-3.903-8.178-11.425-8.178H49.948z"
            ></path>
          </symbol>
          <symbol id="facebook" viewBox="0 0 16 16">
            <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"></path>
          </symbol>
          <symbol id="instagram" viewBox="0 0 16 16">
            <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.917 3.917 0 0 0-1.417.923A3.927 3.927 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.916 3.916 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.926 3.926 0 0 0-.923-1.417A3.911 3.911 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0h.003zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599.28.28.453.546.598.92.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.47 2.47 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.478 2.478 0 0 1-.92-.598 2.48 2.48 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233 0-2.136.008-2.388.046-3.231.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92.28-.28.546-.453.92-.598.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045v.002zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92zm-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217zm0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334z"></path>
          </symbol>
          <symbol id="twitter" viewBox="0 0 16 16">
            <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"></path>
          </symbol>
          <symbol id="web" viewBox="0 0 24 24">
            <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm1 16.057v-3.057h2.994c-.059 1.143-.212 2.24-.456 3.279-.823-.12-1.674-.188-2.538-.222zm1.957 2.162c-.499 1.33-1.159 2.497-1.957 3.456v-3.62c.666.028 1.319.081 1.957.164zm-1.957-7.219v-3.015c.868-.034 1.721-.103 2.548-.224.238 1.027.389 2.111.446 3.239h-2.994zm0-5.014v-3.661c.806.969 1.471 2.15 1.971 3.496-.642.084-1.3.137-1.971.165zm2.703-3.267c1.237.496 2.354 1.228 3.29 2.146-.642.234-1.311.442-2.019.607-.344-.992-.775-1.91-1.271-2.753zm-7.241 13.56c-.244-1.039-.398-2.136-.456-3.279h2.994v3.057c-.865.034-1.714.102-2.538.222zm2.538 1.776v3.62c-.798-.959-1.458-2.126-1.957-3.456.638-.083 1.291-.136 1.957-.164zm-2.994-7.055c.057-1.128.207-2.212.446-3.239.827.121 1.68.19 2.548.224v3.015h-2.994zm1.024-5.179c.5-1.346 1.165-2.527 1.97-3.496v3.661c-.671-.028-1.329-.081-1.97-.165zm-2.005-.35c-.708-.165-1.377-.373-2.018-.607.937-.918 2.053-1.65 3.29-2.146-.496.844-.927 1.762-1.272 2.753zm-.549 1.918c-.264 1.151-.434 2.36-.492 3.611h-3.933c.165-1.658.739-3.197 1.617-4.518.88.361 1.816.67 2.808.907zm.009 9.262c-.988.236-1.92.542-2.797.9-.89-1.328-1.471-2.879-1.637-4.551h3.934c.058 1.265.231 2.488.5 3.651zm.553 1.917c.342.976.768 1.881 1.257 2.712-1.223-.49-2.326-1.211-3.256-2.115.636-.229 1.299-.435 1.999-.597zm9.924 0c.7.163 1.362.367 1.999.597-.931.903-2.034 1.625-3.257 2.116.489-.832.915-1.737 1.258-2.713zm.553-1.917c.27-1.163.442-2.386.501-3.651h3.934c-.167 1.672-.748 3.223-1.638 4.551-.877-.358-1.81-.664-2.797-.9zm.501-5.651c-.058-1.251-.229-2.46-.492-3.611.992-.237 1.929-.546 2.809-.907.877 1.321 1.451 2.86 1.616 4.518h-3.933z" />
          </symbol>
          <symbol id="refresh" viewBox="0 0 24 24">
            <path
              fill="white"
              d="M13.5 2c-5.621 0-10.211 4.443-10.475 10h-3.025l5 6.625 5-6.625h-2.975c.257-3.351 3.06-6 6.475-6 3.584 0 6.5 2.916 6.5 6.5s-2.916 6.5-6.5 6.5c-1.863 0-3.542-.793-4.728-2.053l-2.427 3.216c1.877 1.754 4.389 2.837 7.155 2.837 5.79 0 10.5-4.71 10.5-10.5s-4.71-10.5-10.5-10.5z"
            />
          </symbol>
        </svg>
      </body>
    </html>
  );
}
