"use client";

import * as React from "react";
import { languages } from "@/app/i18n/settings";
import { usePathname, useRouter } from "next/navigation";

type HeaderProps = {
  large?: boolean;
};

const languageNames = {
  en: "EN 🇬🇧",
  id: "ID 🇮🇩",
};

export default function LanguageSwitcher({ lang }) {
  const pathname = usePathname();
  const router = useRouter();
  const segments = pathname.split("/");

  const redirectedPathName = (locale: string) => {
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
