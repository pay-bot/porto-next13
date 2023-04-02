"use client";

import { languages } from "@/app/i18n/settings";
import { usePathname, useRouter } from "next/navigation";
import * as React from "react";
import { useCookies } from "react-cookie";

type HeaderProps = {
  large?: boolean;
};

const languageNames = {
  en: "EN 🇬🇧",
  id: "ID 🇮🇩",
};

export default function LanguageSwitcher({ lang }) {
  console.log(
    "🚀 ~ file: LanguageSwitcher.tsx:18 ~ LanguageSwitcher ~ lang:",
    lang
  );
  //#region  //*=========== Route Functionality ===========
  const pathname = usePathname();
  const segments = pathname.split("/");

  const router = useRouter();
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);

  const cookieValue = cookies["NEXT_LOCALE"];

  const redirectedPathName = (locale: string) => {
    setCookie("NEXT_LOCALE", locale, { path: "/" });
    if (!pathname) return "/";

    if (pathname.includes("en") || pathname.includes("id"))
      segments[1] = locale;
    return router.push(segments.join("/"));
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        name="locales"
        onChange={(event) => redirectedPathName(event.target.value)}
        defaultValue={lang}
        className="rounded border bg-transparent text-sm"
      >
        {languages.map((locale) => (
          <option key={locale} value={locale}>
            {languageNames[locale]}
          </option>
        ))}
      </select>
    </div>
  );
}
