import Image from "next/image";
import cl from "./page.module.css";


export const metadata = {
  title: "Join Us",
  description:
    "Sign up to get involved! One of our members will reach out to you and get you plugged in!. Website created by Chris Thornburg, github:CJThornburg "
};

// export const dynamic = "force-static";

export default function JoinUs() {
  return (
    <>
      <header className="text-center py-8">
        <h1 className="text-3xl font-bold">Join us!</h1>
      </header>
      <div className="flex justify-center">
        <iframe
          src="https://docs.google.com/forms/d/e/1FAIpQLSdN-eXpByC4SRsF9GOGGxEGTVGlb5Hm7RI6ENax8OLkw5-ZfA/viewform?embedded=true"
          width="700"
          height="2000"
        >
          Loading…
        </iframe>
      </div>
    </>
  );
}
