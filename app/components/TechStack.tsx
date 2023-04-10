import {
  Reactquery,
  Redux,
  SiNextdotjs,
  SiReact,
  SiReactquery,
  SiRedux,
  SiTailwindcss,
} from "@icons-pack/react-simple-icons";
import clsx from "clsx";
import * as React from "react";
// import {
//   SiMaterialui,
//   SiNextdotjs,
//   SiReact,
//   SiTailwindcss,
// } from "react-icons/si";

import CustomLink from "./ui/links/CustomLink";
import Tooltip from "./Tooltip";

export default function TechStack() {
  return (
    <div className="flex space-x-2 md:space-x-4">
      {stacks.map((tech) => (
        <Tooltip
          key={tech.id}
          content={<p className="max-w-[350px] p-1">{tech.tooltip}</p>}
        >
          <tech.icon
            key={tech.id}
            className={clsx(
              "h-8 w-8 md:h-10 md:w-10",
              "text-gray-600 hover:text-primary-300 dark:text-gray-200 dark:hover:text-primary-300",
              "transition-colors"
            )}
          />
        </Tooltip>
      ))}
    </div>
  );
}

const stacks = [
  {
    id: "nextjs",
    icon: SiNextdotjs,
    tooltip: (
      <>
        <CustomLink href="https://nextjs.org">Next.js</CustomLink>, Next.js is
        perfect for high-performance, SEO-friendly, and scalable apps with its
        server-side rendering, easy static export, developer experience,
        built-in tools, and automatic code-splitting.
      </>
    ),
  },
  {
    id: "react",
    icon: SiReact,
    tooltip: (
      <>
        <CustomLink href="https://reactjs.org/"> ReactJS</CustomLink>, has
        transformed the way I build web applications. Its component-based
        structure and virtual DOM make it easy to manage and update the state of
        my apps.
      </>
    ),
  },

  {
    id: "tailwind",
    icon: SiTailwindcss,
    tooltip: (
      <>
        <CustomLink href="https://tailwindcss.com/">Tailwind CSS</CustomLink> I
        love the flexibility it offers and how it allows me to quickly create
        professional and consistent designs without needing extensive custom CSS
        .
      </>
    ),
  },
  // {
  //   id: "mui",
  //   icon: SiMaterialui,
  //   tooltip: (
  //     <>
  //       <CustomLink href="https://mui.com/">MUI</CustomLink>, The wide range of
  //       pre-built components makes it easy to quickly create a professional and
  //       sleek user interface
  //     </>
  //   ),
  // },
  {
    id: "react-query",
    icon: SiReactquery,
    tooltip: (
      <>
        <CustomLink href="https://tanstack.com/query/latest">
          {" "}
          React-Query{" "}
        </CustomLink>
        , has been a game changer for my projects. It makes handling API
        requests and managing state so much simpler and efficient.
      </>
    ),
  },
  {
    id: "redux",
    icon: SiRedux,
    tooltip: (
      <>
        <CustomLink
          href="https://redux-toolkit.js.org
"
        >
          Redux Toolkit
        </CustomLink>
        , has made my experience with Redux so much more enjoyable. The
        simplicity of setting up and using the store, along with the ability to
        easily organize and manage my state has been a huge time saver
      </>
    ),
  },
];

