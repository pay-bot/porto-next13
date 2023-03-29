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
  const [cookies, setCookie] = useCookies(["NEXT_LOCALE"]);
  console.log(
    "🚀 ~ file: LanguageSwitcher.tsx:30 ~ LanguageSwitcher ~ cookie:",
    cookies
  );

  const cookieValue = cookies["NEXT_LOCALE"];
  console.log(
    "🚀 ~ file: LanguageSwitcher.tsx:34 ~ LanguageSwitcher ~ cookieValue:",
    cookieValue
  );

  const arrOfRoute = pathname.split("/");

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
    setCookie("NEXT_LOCALE", locale, { path: "/" });
    if (!pathname) return "/";
    const segments = pathname.split("/");
if (pathname.includes("en") || pathname.includes("id")) segments[1] = locale;
    return router.push(segments.join("/"));
  };

  React.useEffect(() => {
    if (!cookieValue) {
      router.push("/");
    }
  }, [cookieValue, router]);

  return (
    <div className="flex items-center space-x-4">
      <select
        name="locales"
        onChange={(event) => redirectedPathName(event.target.value)}
        defaultValue={cookieValue}
        // defaultChecked={cookieValue}
        className="rounded border bg-transparent text-sm"
      >
        {languages.map((locale) => (
          <option  key={locale} value={locale}>
            {languageNames[locale]}
          </option>
        ))}
      </select>
      {/* <ThemeButton /> */}
    </div>
  );
}
