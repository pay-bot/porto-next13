import { getFileBySlug, getFiles } from "@/lib/mdx";
import React from "react";
import { languages } from "@/app/i18n/settings";
import TableOfContents from "../../../components/content/TableOfContents";
import CloudinaryImg from "../../../components/images/CloudinaryImg";

import CustomLink from "@/app/components/links/CustomLink";
import { HiLink } from "react-icons/hi";
import ProjectHeader from "@/app/components/ProjectHeader";
import Container from "@/app/components/Container";

type ProjectPageProps = {
  params: {
    lng: string;
    projectSlug: string[];
  };
};

export default async function project({
  params: { lng, projectSlug },
}: ProjectPageProps) {
  try {
    const project = await getFileBySlug("projects", projectSlug as string, lng);
    return (
      <main>
        <section className="">
          <div className="layout">
            <ProjectHeader
              authorName={
                ["Fahri"]?.length ? (
                  ["Fahri"].map((author) => (
                    <span
                      key={author}
                      className="after:content-[',_'] last-of-type:before:content-['and_'] last-of-type:after:content-none only-of-type:before:content-none"
                    >
                      {author}
                    </span>
                  ))
                ) : (
                  <span />
                )
              }
              coverImageAttributionLink={"/test"}
              coverImageAttributionText={"/test"}
              date={project.frontmatter.publishedAt}
              title={project.frontmatter.title}
              imgSrc={`/v1673511475/${project.frontmatter.banner}`}
              imgAlt={`/v1673511475/${project.frontmatter.banner}`}
              publicId={`/v1673511475/${project.frontmatter.banner}`}
              readingTime={project.frontmatter.readingTime.text}
              liveUrl={project.frontmatter.link}
            />

            {project.frontmatter.category && (
              <p className="mt-2 flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <HiUser className="text-lg text-gray-800 dark:text-white" />{" "}
                {project.frontmatter.category}
              </p>
            )}

            <Container className="flex flex-col items-center justify-start lg:flex-row lg:items-start lg:justify-between px-0">
              <article className=" prose mx-auto mt-4 w-full transition-colors dark:prose-invert !max-w-none">
                {project?.content}
              </article>
              <TableOfContents source={project.source} slug={projectSlug} />
            </Container>

            <div className="mt-8 flex flex-col items-start gap-4 ">
              <CustomLink href="/project">← Back to projects</CustomLink>
            </div>
          </div>
        </section>
      </main>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  const localesProject = languages
    ?.map((locale) => {
      const projects = getFiles("projects", locale);
      return projects?.map((project) => [project, locale]);
    })
    .flat();

  return localesProject?.map(([slug, locale]) => ({
    projectSlug: slug.replace(/\.mdx/, ""),
    lng: locale,
  }));
}
