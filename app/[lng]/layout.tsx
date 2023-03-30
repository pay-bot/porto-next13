import "../styles/dracula.css";
import "../styles/globals.css";
import "../styles/mdx.css";

import { dir } from "i18next";
import { languages } from "../i18n/settings";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export default function RootLayout({ children, params: { lng } }) {
  return (
    <html lang={lng}>
      <head />
      <body>
        <div className="">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}

