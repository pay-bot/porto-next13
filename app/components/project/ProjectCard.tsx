import { ProjectFrontmatter } from "@/app/types/frontmatters";
import Link from "next/link";
import * as React from "react";
import CloudinaryImg from "../images/CloudinaryImg";
import UnstyledLink from "../links/UnstyledLink";
import TechIcons, { TechListType } from "../TechIcons";

// import CloudinaryImg from "@/components/images/CloudinaryImg";
// import UnstyledLink from "@/components/links/UnstyledLink";
// import TechIcons, { TechListType } from "@/components/TechIcons";

// import { ProjectFrontmatter } from "@/types/frontmatters";

type ProjectCardProps = {
  project: ProjectFrontmatter;
} & React.ComponentPropsWithoutRef<"li">;

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <li className=" project-card rounded-md md:w-full border dark:border-gray-600 scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu transition duration-100 motion-reduce:hover:scale-100 animate-shadow">
      <Link
        className="block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
        href={`/project/${project?.slug}`}
      >
        <div className="relative">
          {/* <CloudinaryImg
            noStyle
            className="pointer-events-none overflow-hidden rounded-t-md"
            publicId={`/${project?.banner}`}
            alt="Photo taken from unsplash"
            width={1200}
            height={(1200 * 2) / 5}
            aspect={{ height: 2, width: 5 }}
            preview={false}
          /> */}
          <div className={"absolute bottom-0 w-full px-4 py-2"}>
            {/* {project?.tags.split(",").map((tag) => (
                    <Tag
                      tabIndex={-1}
                      className="bg-opacity-80 dark:!bg-opacity-60"
                      key={tag}
                    >
                      {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
                    </Tag>
                  ))} */}
          </div>
        </div>
        <div className="p-4">
          <h1 className="text-gray-800 dark:text-gray-100">{project?.title}</h1>
          <div className="mt-2 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              {/* <HiOutlineClock className="inline-block text-base" />
                    <Accent>{project?.readingTime.text}</Accent> */}
            </div>
            <div className="flex items-center gap-1">
              {/* <HiOutlineEye className="inline-block text-base" />
                    <Accent>
                      {post?.views?.toLocaleString() ?? "–––"} views
                    </Accent> */}
            </div>
          </div>
          <p className="mt-4 mb-2 text-sm text-gray-600 dark:text-gray-300">
            {/* <span className="font-bold text-gray-800 dark:text-gray-100">
                    {format(
                      new Date(project?.lastUpdated ?? project?.publishedAt),
                      "MMMM dd, yyyy"
                    )}
                  </span> */}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {project?.description}
          </p>
          <div className="mt-2">
            <TechIcons
              techs={project.techs.split(",") as Array<TechListType>}
            />
          </div>

          <CloudinaryImg
            className="pointer-events-none mt-3 w-full"
            publicId={`/${project.banner}`}
            alt={project.title}
            width={1440}
            height={792}
            preview={false}
          />

          <p className="animated-underline mt-2 inline-block font-medium">
            See more →
          </p>
        </div>
      </Link>
    </li>
  );
}
