import { getAllFilesFrontmatter, getFeatured } from "@/lib/mdx";
import BlogCard from "../components/blog/BlogCard";
import ProjectCard from "../components/project/ProjectCard";
import { languages, fallbackLng } from "../i18n/settings";
import { useTranslation } from "../i18n";
import Link from "next/link";
import Accent from "../components/Accent";
import type { Metadata } from "next";
import { IoNewspaperSharp } from "react-icons/io5";
import { SiGithub } from "@icons-pack/react-simple-icons";
import ButtonLink from "../components/links/ButtonLink";
import Container from "../components/Container";
import H1Heading from "../components/H1Heading";
import BlogSection from "../components/BlogSection";
import ProjectSection from "../components/ProjectSection";

export default async function Home({ params: { lng } }) {
  const blogs = await getAllFilesFrontmatter("blog", lng);
  const featuredPosts = await getFeatured(blogs, ["react-query"]);

  const projects = await getAllFilesFrontmatter("projects", lng);

  const featuredProjects = getFeatured(projects, ["bzpublish", "tbs"]);

  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "common");

  return (
    <Container as="section" className="py-12 ">
      <article className="">
        <div className="flex flex-col items-center gap-y-20 lg:grid-cols-2 lg:flex-row lg:justify-between lg:gap-y-0">
          <div className="w-full ">
            <div className="py-24 md:pt-32 md:pb-24">
              <H1Heading className="animate-in slide-in-from-left duration-500">
                {t("hero.p1")}
              </H1Heading>
            </div>

            {/* <div className="mt-8 flex flex-wrap gap-4 md:!text-lg">
              <div className="group relative">
                <div className="absolute -inset-0.5 animate-tilt rounded blur bg-gradient-to-r from-primary-300 to-primary-400 dark:from-primary-200 dark:via-primary-300 opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
                <ButtonLink href="/blog"> {t("hero.cta1")}</ButtonLink>
              </div>
              <ButtonLink href="/about">{t("hero.cta2")}</ButtonLink>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 gap-y-2 md:mt-8">
              <Link
                href="https://drive.google.com/file/d/12PE3fknn3DTGdVNYYv55bgJh7g6T81u6/view?usp=sharing"
                className="inline-flex items-center gap-1 text-sm font-medium md:text-base text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-primary-300 transition-colors"
              >
                <IoNewspaperSharp className="shrink-0" />
                <span>Resume</span>
              </Link>

              <Link
                href="https://github.com/pay-bot"
                className="inline-flex items-center gap-1 text-sm font-medium md:text-base text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white focus:outline-none focus-visible:ring focus-visible:ring-primary-300 transition-colors"
              >
                <SiGithub className="shrink-0" />
                <span>github.com/pay-bot</span>
              </Link>
            </div> */}
          </div>
          <div className=" overflow-hidden">{/* <MarbleGuest /> */}</div>
        </div>
      </article>
      <section className="py-20">
        <article className="">
          <h2 className="text-2xl md:text-4xl" id="blog">
            <Accent>Featured Posts</Accent>
          </h2>

          {/* {featuredPosts?.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))} */}

          <BlogSection posts={featuredPosts} />
          <ButtonLink className="mt-4" href="/blog">
            See more post
          </ButtonLink>
        </article>
      </section>
      <section className="py-20">
        <article className="layout">
          <h2 className="text-2xl md:text-4xl" id="projects">
            <Accent>Featured Projects</Accent>
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-300">
            Some projects that I'm proud of
          </p>

          <ProjectSection projects={featuredProjects} />

          <ButtonLink className="mt-4" href="/projects">
            See more project
          </ButtonLink>
        </article>
      </section>
    </Container>
  );
}
