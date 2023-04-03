import { getFileBySlug, getFiles } from "@/lib/mdx";
import React from "react";
import { languages } from "@/app/i18n/settings";
import TableOfContents from "../../../components/content/TableOfContents";
import CloudinaryImg from "../../../components/images/CloudinaryImg";

import CustomLink from "@/app/components/links/CustomLink";
import { HiLink } from "react-icons/hi";

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
            <CloudinaryImg
              publicId={`/v1673511475/${project.frontmatter.banner}`}
              alt={project.frontmatter.title}
              width={1440}
              height={792}
            />

            <h1 className="mt-4">{project.frontmatter.title}</h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              {project.frontmatter.description}
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-start gap-3 text-sm font-medium text-gray-600 dark:text-gray-300">
              {/* <div className='flex items-center gap-1'>
                <HiOutlineEye className='inline-block text-base' />
                {meta?.views?.toLocaleString() ?? '–––'} views
              </div>
              {(project.github ||
                project.youtube ||
                project.link) &&
                ' - '}
              {project.github && (
                <div className='inline-flex items-center gap-2'>
                  <SiGithub className='text-lg text-gray-800 dark:text-white' />
                  <CustomLink
                    onClick={() =>
                      trackEvent(`Project Github: ${project.title}`, 'link')
                    }
                    href={project.github}
                    className='mt-1'
                  >
                    Repository
                  </CustomLink>
                </div>
              )}
              {project.github &&
                (project.youtube || project.link) &&
                ' - '}
              {project.youtube && (
                <div className='inline-flex items-center gap-2'>
                  <HiPlay className='text-xl text-gray-800 dark:text-white' />
                  <CustomLink
                    href={project.youtube}
                    className='mt-1'
                    onClick={() =>
                      trackEvent(`Project Video: ${project.title}`, 'link')
                    }
                  >
                    Demo Video
                  </CustomLink>
                </div>
              )}
              {project.youtube && project.link && ' - '} */}
              {project.frontmatter.link && (
                <div className="inline-flex items-center gap-2">
                  <HiLink className="text-lg text-gray-800 dark:text-white" />
                  <CustomLink href={project.frontmatter.link} className="mt-1">
                    Open Live Site
                  </CustomLink>
                </div>
              )}
            </div>

            {project.frontmatter.category && (
              <p className="mt-2 flex items-center justify-start gap-2 text-sm text-gray-600 dark:text-gray-300">
                <HiUser className="text-lg text-gray-800 dark:text-white" />{" "}
                {project.frontmatter.category}
              </p>
            )}

            <hr className="mt-4 dark:border-gray-600" />

            <section className="lg:grid lg:grid-cols-[auto,250px] lg:gap-8">
              <article className="mdx projects prose mx-auto w-full transition-colors dark:prose-invert">
                {project?.content}
              </article>

              <aside className="py-4">
                <div className="sticky top-36">
                  <TableOfContents slug={projectSlug} />
                  {/* <div className='flex items-center justify-center py-8'>
                    <LikeButton slug={contentSlug} />
                  </div> */}
                </div>
              </aside>
            </section>

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
