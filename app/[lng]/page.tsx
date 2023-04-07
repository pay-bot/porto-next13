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
      <div className="py-24 md:pt-32 md:pb-24">
        <H1Heading className="animate-in slide-in-from-left duration-500">
          {t("hero.p1")}
        </H1Heading>
      </div>
      <section className="">
        <h2 className="text-2xl md:text-4xl" id="blog">
          <Accent>Featured Posts</Accent>
        </h2>
        <BlogSection posts={featuredPosts} />
        <ButtonLink className="mt-4" href="/blog">
          See more post
        </ButtonLink>
      </section>
      <section className="mt-20 mb-6">
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
      </section>
    </Container>
  );
}
