import Accent from "@/app/components/Accent";
import ContentPlaceholder from "@/app/components/content/ContentPlaceholder";
import ProjectCard from "@/app/components/project/ProjectCard";
import { getAllFilesFrontmatter } from "@/lib/mdx";
import React from "react";

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
            Tutorials about front-end development.
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
