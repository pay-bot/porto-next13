import "../styles/dracula.css";
import "../styles/globals.css";
import "../styles/mdx.css";

import { languages } from "../i18n/settings";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import { Chia } from "../shared/meta/chia";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  title: {
    default: `${Chia.name} | ${Chia.title}`,
    template: `%s | ${Chia.name}`,
  },
  description: Chia.content,
  keywords: [
    "Typescript",
    "FullStack",
    "NextJS",
    "React",
    "NestJS",
    "Chia1104",
  ],
  themeColor: "#2B2E4A",
  colorScheme: "dark",
  creator: Chia.name,
  openGraph: {
    type: "website",
    locale: "zh_TW",
    url: "https://chia1104.dev",
    siteName: Chia.name,
    title: Chia.name,
    description: Chia.content,
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
    title: Chia.name,
    description: Chia.content,
    creator: `@${Chia.name.toLowerCase()}`,
    images: ["/api/og"],
  },
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
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
    <html lang={lng}>
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
