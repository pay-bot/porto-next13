import Accent from "@/app/components/Accent";
import ContentPlaceholder from "@/app/components/content/ContentPlaceholder";
import ProjectCard from "@/app/components/project/ProjectCard";
import { getAllFilesFrontmatter } from "@/lib/mdx";
import React from "react";
import type { Metadata } from "next";
import { Alpian } from "../../shared/meta/alpian";

export const metadata: Metadata = {
  title: "Projects",
  openGraph: {
    type: "article",
    locale: "en",
    url: "https://www.fahrialpiansyah.my.id/project",
    siteName: Alpian.name,
    title: "Projects",
    description: "Showcase of my projects on front-end development that I'm proud of.",
    images: [
      {
        url: "/api/og?title=Projects",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: Alpian.name,
    description: "Showcase of my projects on front-end development that I'm proud of.",
    creator: `@${Alpian.name.toLowerCase()}`,
    images: ["/api/og?title=Projects"],
  },
};

export default async function Project({ params: { lng } }) {
  const projects = await getAllFilesFrontmatter("projects", lng);
  return (
    <main>
      <section>
        <div className="layout py-12">
          <h1 className="text-3xl md:text-5xl" data-fade="0">
            <Accent>Project </Accent>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
            Showcase of my projects on front-end development that I'm proud of.
          </p>

          <ul
            className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            data-fade="5"
          >
            {projects.length > 0 ? (
              projects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  // checkTagged={checkTagged}
                />
              ))
            ) : (
              <ContentPlaceholder />
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}


