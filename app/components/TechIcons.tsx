"use client";

import {
  Reactquery,
  Redux,
  SiReactquery,
} from "@icons-pack/react-simple-icons";
import clsx from "clsx";
import * as React from "react";
import { IoLogoVercel } from "react-icons/io5";
import {
  SiFirebase,
  SiGit,
  SiGoogleanalytics,
  SiJavascript,
  SiMarkdown,
  SiMongodb,
  SiMui,
  SiNextdotjs,
  SiNodedotjs,
  SiNotion,
  SiPrettier,
  SiReact,
  SiRedux,
  SiSass,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";
import Tooltip from "./Tooltip";

export type TechListType = keyof typeof techList;

export type TechIconsProps = {
  techs: Array<TechListType>;
};

export default function TechIcons({ className, techs }: TechIconsProps) {
  return (
    <div className={clsx(className, "flex gap-2")}>
      {techs.map((tech) => {
        if (!techList[tech]) return;

        const current = techList[tech];

        return (
          <Tooltip key={current.name} content={<p>{current.name}</p>}>
            <div className="text-xl text-gray-700 dark:text-gray-200">
              <current.icon />
            </div>
          </Tooltip>
        );
      })}
    </div>
  );
}

const techList = {
  react: {
    icon: SiReact,
    name: "React",
  },
  nextjs: {
    icon: SiNextdotjs,
    name: "Next.js",
  },
  tailwindcss: {
    icon: SiTailwindcss,
    name: "Tailwind CSS",
  },
  scss: {
    icon: SiSass,
    name: "SCSS",
  },
  javascript: {
    icon: SiJavascript,
    name: "JavaScript",
  },
  typescript: {
    icon: SiTypescript,
    name: "TypeScript",
  },
  nodejs: {
    icon: SiNodedotjs,
    name: "Node.js",
  },
  firebase: {
    icon: SiFirebase,
    name: "Firebase",
  },
  mongodb: {
    icon: SiMongodb,
    name: "MongoDB",
  },
  swr: {
    icon: IoLogoVercel,
    name: "SWR",
  },
  redux: {
    icon: SiRedux,
    name: "Redux",
  },
  mdx: {
    icon: SiMarkdown,
    name: "MDX",
  },
  prettier: {
    icon: SiPrettier,
    name: "Prettier",
  },
  analytics: {
    icon: SiGoogleanalytics,
    name: "Google Analytics",
  },
  git: {
    icon: SiGit,
    name: "Git",
  },
  notion: {
    icon: SiNotion,
    name: "Notion API",
  },
  mui: {
    icon: SiMui,
    name: "Material UI",
  },
  reactquery: {
    icon: SiReactquery,
    name: "React Query",
  },
  redux: {
    icon: SiRedux,
    name: "Redux Toolkit",
  },
};

