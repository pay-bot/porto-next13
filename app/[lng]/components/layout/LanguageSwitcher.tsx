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

export default function LanguageSwitcher({ params }) {
  console.log(
    "🚀 ~ file: LanguageSwitcher.tsx:18 ~ LanguageSwitcher ~ params:",
    params
  );
  //#region  //*=========== Route Functionality ===========
  const pathname = usePathname();
  console.log(
    "🚀 ~ file: LanguageSwitcher.tsx:20 ~ LanguageSwitcher ~ pathname:",
    pathname
  );
  const router = useRouter();
  const [cookie, setCookie] = useCookies(["NEXT_LOCALE"]);
  const [activeLocale, setActiveLocale] = useCookies("en");

  const arrOfRoute = pathname.split("/");
  const baseRoute = "/" + arrOfRoute[1];

  // const [cookie, setCookie] = useCookies(["NEXT_LOCALE"]);
  const { asPath } = router;
  console.log(
    "🚀 ~ file: LanguageSwitcher.tsx:32 ~ LanguageSwitcher ~ activeLocale:",
    activeLocale
  );

  function handleCheckedChange(value) {
    if (cookie.NEXT_LOCALE !== value) {
      setCookie("NEXT_LOCALE", value, { path: "/" });
      router.push(pathname, undefined, { locale: value });
    }
    router.push(pathname, undefined, { locale: value });
  }

  const { locale } = router;
  //  const t = locale === "en" ? localEn : localDe;

  const onLanguageClick = (newLocale: string) => {
    const { pathname, asPath, query } = router;
    router.push({ pathname, query }, asPath, {
      locale: newLocale,
      scroll: false,
    });
  };
  const redirectedPathName = (locale: string) => {
    setActiveLocale(locale);
    if (!pathname) return "/";
    const segments = pathname.split("/");
    segments[1] = locale;
    return router.push(segments.join("/"), undefined, { locale });
  };

  return (
    <div className="flex items-center space-x-4">
      <select
        name="locales"
        onChange={(event) => redirectedPathName(event.target.value)}
        defaultValue={activeLocale}
        className="rounded border bg-transparent text-sm"
      >
        {languages.map((locale) => (
          <option key={locale} value={locale}>
            {languageNames[locale]}
          </option>
        ))}
      </select>
      {/* <ThemeButton /> */}
    </div>
  );
}
