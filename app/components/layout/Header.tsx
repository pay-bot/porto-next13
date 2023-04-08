"use client";

import Link from "next/link";
import * as React from "react";
import LanguageSwitcher from "./LanguageSwitcher";
import { clsxm } from "@/utils";
import { usePathname } from "next/navigation";

type HeaderProps = {
  large?: boolean;
};
function removeArrayElementsContainingString(
  array: string[],
  stringToRemove: string
): string[] {
  return array.filter((element) => element !== stringToRemove);
}

function checkIfTextIsInArray(text: string, array: string[]): boolean {
  return removeArrayElementsContainingString(array, "id").includes(text);
}

export default function Header({ large = false, lang }: HeaderProps) {
  const pathname = usePathname();
  const segments = pathname.split("/");
  console.log("🚀 ~ file: Header.tsx:20 ~ Header ~ segments:", segments);

  return (
    <header className="">
      <div className="h-2 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400" />

      <div className="bg-white transition-colors dark:bg-dark dark:text-white">
        <nav className="layout flex items-center justify-between py-4">
          <ul className="flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base">
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link
                  href={`/${href}`}
                  className={clsxm(
                    "rounded-sm py-2 transition-colors",
                    "font-medium text-black dark:text-white",
                    "group dark:hover:text-primary-300",
                    "focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
                  )}
                >
                  <span
                    className={clsxm(
                      "transition-colors",
                      "bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0",
                      (segments.length === 2 &&
                      segments[1] === "id" &&
                      href === "/"
                        ? true
                        : checkIfTextIsInArray(
                            href === "/" && segments[1] === "" ? "" : href,
                            segments
                          )) &&
                        "!bg-primary-300/50 dark:bg-gradient-to-tr dark:from-primary-300 dark:to-primary-400 dark:bg-clip-text dark:text-transparent"
                    )}
                  >
                    {label}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
          <LanguageSwitcher lang={lang} />
        </nav>
      </div>
    </header>
  );
}

const links = [
  { href: "/", label: "Home" },
  { href: "blog", label: "Blog" },
  { href: "project", label: "Project" },
  // { href: '/library', label: 'Library' },
  { href: "about", label: "About" },
];
