import { useTranslation } from "@/app/i18n";
import * as React from "react";

import Accent from "../../components/Accent";
import TechStack from "../../components/TechStack";
import type { Metadata } from "next";
import { Alpian } from "../../shared/meta/alpian";
import Container from "@/app/components/Container";
import H1Heading from "@/app/components/H1Heading";

interface AboutPageProps {
  params: {
    lng: string;
  };
}

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

export default async function AboutPage({ params: { lng } }: AboutPageProps) {
  const languages: string[] = ["en", "id"];
  const fallbackLng: string = "en";

  if (languages.indexOf(lng) < 0) {
    lng = fallbackLng;
  }
  const { t } = await useTranslation(lng, "common");

  return (
    <Container as="section" className="py-24">
      <H1Heading className="mb-4 animate-in slide-in-from-left duration-500">
        Hey, I'm <Accent>Alpian.</Accent>
      </H1Heading>
      <h2 className="h0 font-bold animate-in slide-in-from-right duration-500">
        Nice to meet you 🤝🏾
      </h2>
      <div className="mt-4">
        <div className="flex justify-between">
          <article className="prose dark:prose-invert !mt-20 max-w-none w-7/12">
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
            <p>{t("about.p4")}</p>
          </article>
          <div className="w-5/12 flex justify-end">Marble </div>
        </div>

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
    </Container>
  );
}
