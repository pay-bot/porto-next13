import Link from "next/link";
import * as React from "react";
import LanguageSwitcher from "./LanguageSwitcher";

type HeaderProps = {
  large?: boolean;
};

export default function Header({ large = false, lang }: HeaderProps) {
  return (
    <header className="">
      <div className="h-2 bg-gradient-to-tr from-primary-200 via-primary-300 to-primary-400" />

      <div className="bg-white transition-colors dark:bg-dark dark:text-white">
        <nav className="layout flex items-center justify-between py-4">
          <ul className="flex items-center justify-between space-x-3 text-xs md:space-x-4 md:text-base">
            {links.map(({ href, label }) => (
              <li key={`${href}${label}`}>
                <Link
                  href={`${lang}${href}`}
                  className="rounded-sm py-2 transition-colors
                    font-medium text-black dark:text-white
                    group dark:hover:text-primary-300
                    focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
                >
                  <span
                    className="transition-colors
                      bg-primary-300/0 group-hover:bg-primary-300/20 dark:group-hover:bg-primary-300/0"
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
  { href: "/blog", label: "Blog" },
  { href: "/project", label: "Project" },
  // { href: '/library', label: 'Library' },
  { href: "/about", label: "About" },
];
