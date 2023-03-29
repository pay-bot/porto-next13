"use client";

import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { Tooltip as TooltipTippy } from "react-tippy";
import Accent from "../Accent";
import UnstyledLink from "../links/UnstyledLink";
import Tooltip from "../Tooltip";

export default function Footer() {
  return (
    <footer className="mt-4 pb-2">
      <main className="layout flex flex-col items-center border-t pt-6 dark:border-gray-600">
        {/* <FooterLinks /> */}

        <p className="mt-12 font-medium text-gray-600 dark:text-gray-300">
          Reach me out
        </p>
        <SocialLinks />

        <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
          © Fahri Alpiansyah {new Date().getFullYear()}
          {/* {feedbackFlag && (
            <>
              {' • '}
              <FeedbackFish projectId='59a0c0e0d549a7'>
                <button className='rounded-sm hover:text-gray-800 focus:outline-none focus-visible:ring focus-visible:ring-primary-300 dark:hover:text-gray-100'>
                  Got any feedback?
                </button>
              </FeedbackFish>
            </>
          )} */}
        </p>
      </main>
    </footer>
  );
}

function SocialLinks() {
  const [copyStatus, setCopyStatus] = React.useState(
    "Click the mail logo to copy"
  );

  return (
    <div className="mt-2 flex space-x-4">
      <div className="flex items-center justify-center">
        <TooltipTippy
          trigger="mouseenter"
          hideOnClick={false}
          interactive
          html={
            <div className="inline-block rounded-md border bg-white p-2 text-gray-600 shadow-md dark:border-gray-600 dark:bg-dark dark:text-gray-200">
              {copyStatus}
              <Accent className="inline-block font-medium">
                afahri22@yahoo.com
              </Accent>
            </div>
          }
        >
          <CopyToClipboard
            text=" afahri22@yahoo.com"
            onCopy={() => {
              setCopyStatus("Copied to clipboard 🥳");
              setTimeout(
                () => setCopyStatus("Click the mail logo to copy"),
                1500
              );
            }}
          >
            <button className="rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300">
              <FiMail className="h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300" />
            </button>
          </CopyToClipboard>
        </TooltipTippy>
      </div>
      {socials.map((social) => (
        <Tooltip interactive={false} key={social.href} content={social.text}>
          <UnstyledLink
            className="inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
            href={social.href}
          >
            <social.icon className="my-auto h-6 w-6 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300" />
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

const footerLinks = [
  {
    href: "https://github.com/alfian/fahrialpiansyah.my.id",
    text: "Source Code",
    tooltip: (
      <>
        This website is <strong>open source</strong>!
      </>
    ),
  },
  {
    href: "/design",
    text: "Design",
    tooltip: "fahrialpiansyah.my.id color palette",
  },
  {
    href: "https://alfian.link/docs",
    text: "Docs",
    tooltip: "Personal documentation about my best practices on development",
  },
  {
    href: "https://alfian.link/booknotes",
    text: "Book Notes",
    tooltip: "Note collection of books that I read",
  },
  {
    href: "https://alfian.link/starters",
    text: "Starter Templates",
    tooltip: "Starter that I build and use throughout my projects",
  },
  {
    href: "https://alfian.link/um",
    text: "Analytics",
    tooltip: "fahrialpiansyah.my.id views and visitors analytics",
  },
  {
    href: "/statistics",
    text: "Statistics",
    tooltip: "Blog, Projects, and Library Statistics",
  },
  {
    href: "/guestbook",
    text: "Guestbook",
    tooltip:
      "Leave whatever you like to say—message, appreciation, suggestions",
  },
  {
    href: "/subscribe",
    text: "Subscribe",
    tooltip: "Get an email whenever I post, no spam",
  },
  {
    href: "https://fahrialpiansyah.my.id/rss.xml",
    text: "RSS",
    tooltip: "Add fahrialpiansyah.my.id blog to your feeds",
  },
];

const socials = [
  {
    href: "https://github.com/pay-bot",
    icon: SiGithub,
    id: "Github",
    text: (
      <>
        See my projects on <Accent className="font-medium">Github</Accent>
      </>
    ),
  },
];
