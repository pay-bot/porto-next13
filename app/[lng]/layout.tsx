// import "../styles/dracula.css";
import "../styles/globals.css";
import "../styles/mdx.css";
import localFont from "next/font/local";
import type { Metadata } from "next";
import { languages } from "../i18n/settings";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Alpian } from "../shared/meta/alpian";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

const kaisei = localFont({
  src: "../../public/fonts/kaisei-tokumin-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-kaisei",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${Alpian.name} | ${Alpian.title}`,
    template: `%s | ${Alpian.name}`,
  },
  description: Alpian.content,
  keywords: ["Typescript", "FullStack", "NextJS", "React", "NestJS", "Alpian"],
  themeColor: "#2B2E4A",
  colorScheme: "dark",
  creator: Alpian.name,
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://alpian.dev",
    siteName: Alpian.name,
    title: Alpian.name,
    description: Alpian.content,
    images: [
      {
        url: "/api/og",
        width: 1200,
        height: 630,
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  twitter: {
    card: "summary_large_image",
    title: Alpian.name,
    description: Alpian.content,
    creator: `@${Alpian.name.toLowerCase()}`,
    images: ["/api/og"],
  },
  verification: {
    google: "google",
    yandex: "yandex",
    yahoo: "yahoo",
    other: {
      me: ["my-email", "my-link"],
    },
  },
};

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html
      lang={lng}
      className={[
        "text-black bg-white dark:text-white dark:bg-[#111010]",
        kaisei.variable,
      ].join(" ")}
    >
      <head />
      <body className=" scrollbar-thin scrollbar-thumb-secondary scrollbar-thumb-rounded-full">
        <div className="">
          <Header lang={lng} />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

