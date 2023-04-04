import { ProjectFrontmatter } from "@/app/types/frontmatters";
import Link from "next/link";
import * as React from "react";
import CloudinaryImg from "../images/CloudinaryImg";
import UnstyledLink from "../links/UnstyledLink";
import TechIcons, { TechListType } from "../TechIcons";

type ProjectCardProps = {
  project: ProjectFrontmatter;
} & React.ComponentPropsWithoutRef<"li">;

export default function ProjectCard({ project, className }: ProjectCardProps) {
  return (
    <li
      className={[
        "project-card rounded-md md:w-full",
        "border dark:border-gray-600",
        "scale-100 hover:scale-[1.02] active:scale-[0.97] motion-safe:transform-gpu",
        "transition duration-100",
        "motion-reduce:hover:scale-100",
        "animate-shadow",
        className,
      ].join(" ")}
    >
      <UnstyledLink
        className="flex h-full flex-col items-start rounded-md p-4 focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
        href={`/project/${project?.slug}`}
      >
        <h1 className="text-gray-800 dark:text-gray-100">{project?.title}</h1>

        <p className="text-sm text-gray-700 dark:text-gray-300">
          {project?.description}
        </p>
        <div className="mt-2">
          <TechIcons techs={project.techs.split(",") as Array<TechListType>} />
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
      </UnstyledLink>
    </li>
  );
}

