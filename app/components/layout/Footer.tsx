"use client";

import * as React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiMail } from "react-icons/fi";
import { SiGithub } from "react-icons/si";
import { Tooltip as TooltipTippy } from "react-tippy";
import Accent from "../Accent";
import UnstyledLink from "../ui//links/UnstyledLink";
import Tooltip from "../Tooltip";

export default function Footer() {
  return (
    <footer className="mt-4 pb-2">
      <main className="layout flex flex-col items-center border-t pt-6 dark:border-gray-600">
        <p className="mt-12 font-medium text-gray-600 dark:text-gray-300">
          Reach me out
        </p>
        <SocialLinks />
        <p className="mt-8 text-sm text-gray-600 dark:text-gray-300">
          © {new Date().getFullYear()} Emang Dia Orang Technology
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
            <div className="">
              <button
                className="rounded-sm align-middle focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
                aria-labelledby="send-email-label"
              >
                <FiMail className="h-7 w-7 align-middle text-gray-600 hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300" />
              </button>
              <span id="send-email-label" className="sr-only">
                Copy to clipboard
              </span>
            </div>
          </CopyToClipboard>
        </TooltipTippy>
      </div>
      {socials.map((social) => (
        <Tooltip interactive={false} key={social.href} content={social.text}>
          <UnstyledLink
            className="inline-flex items-center justify-center rounded-sm focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
            href={social.href}
            title={social.text}
          >
            <social.icon className="my-auto h-6 w-6 align-middle text-gray-600 transition-colors hover:text-primary-300 dark:text-gray-300 dark:hover:text-primary-300" />
          </UnstyledLink>
        </Tooltip>
      ))}
    </div>
  );
}

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

