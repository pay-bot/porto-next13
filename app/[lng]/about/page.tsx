import { useTranslation } from "@/app/i18n";
import * as React from "react";
import { languages, fallbackLng } from "../../i18n/settings";

import Accent from "../../components/Accent";
import TechStack from "../../components/TechStack";
import type { Metadata } from "next";
import { Alpian } from "../../shared/meta/alpian";
// import TechStack from "@/components/TechStack";

const info = [
  { text: "Years experience", count: "05" },
  { text: "Completed Projects", count: "04" },
  { text: "Satisfied Clients", count: "03" },
];

export const metadata: Metadata = {
  title: "About",
  openGraph: {
    type: "profile",
    locale: "en",
    url: "https://www.fahrialpiansyah.my.id/about",
    siteName: Alpian.name,
    title: "About",
    description: Alpian.content,
    images: [
      {
        url: "/api/og?title=About",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: Alpian.name,
    description: Alpian.content,
    creator: `@${Alpian.name.toLowerCase()}`,
    images: ["/api/og?title=About"],
  },
};

export default async function AboutPage({ params: { lng } }) {
  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "common");

  return (
    <main>
      <section className={"fade-in-start"}>
        <div className="layout min-h-main py-20">
          <h2>About</h2>
          <h1 className="mt-1">
            <Accent>Fahri Alpiansyah</Accent>
          </h1>
          <div className="mt-4">
            {/* <CloudinaryImg
                className='float-right ml-6 w-36 md:w-72 object-cover'
                publicId='fahri_vdiewu'
                width='1345'
                height='1511'
                alt='Photo of me'
                preview={false}
              /> */}
            <img
              src="https://res.cloudinary.com/dkrci6hyh/image/upload/v1673617628/fahri_vdiewu.jpg"
              alt=""
              className="mx-auto h-80 w-72  object-cover object-top md:float-right md:ml-6 md:my-0 my-10"
            />
            <article className="prose dark:prose-invert">
              <p>{t("about.p1")}</p>
              <p>{t("about.p2")}</p>
              <p>{t("about.p3")}</p>
            </article>

            <div className="mt-10 flex items-center gap-7">
              {info.map((content) => (
                <div key={content.text}>
                  <h3 className="text-2xl font-semibold  md:text-4xl">
                    {content.count}
                    <span className="text-cyan-600">+</span>{" "}
                  </h3>
                  <span className="text-xs md:text-base">{content.text}</span>
                </div>
              ))}
            </div>

            <h3 className="mt-12">Current Favorite Tech Stack</h3>
            <figure className="mt-2">
              <TechStack />
            </figure>
          </div>
        </div>
      </section>

      <section>
        <div className="layout py-6">
          <h2>Contact</h2>
          <article className="prose mt-4 dark:prose-invert">
            <p>
              Do contact me if you need my opinion about web development,
              especially frontend works. I’ll be happy to help! (find my email
              in the footer)
            </p>
          </article>
        </div>
      </section>
    </main>
  );
}

