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

// export const metadata: Metadata = {
//   title: "Fahri Alpiansyah",
//   siteName: "fahrialpiansyah.my.id",
//   description:
//     "An online portfolio and blog by Fahri Alpiansyah. Showcase of my projects, and some of my thoughts about website development.",
//   url: "https://fahrialpiansyah.my.id",
//   image: "https://fahrialpiansyah.my.id/favicon/large-og.jpg",
//   type: "website",
//   robots: "follow, index",
//   openGraph: {
//     title: "Next.js",
//     description: "The React Framework for the Web",
//     url: "https://nextjs.org",
//     siteName: "Next.js",
//     images: [
//       {
//         url: "https://nextjs.org/og.png",
//         width: 800,
//         height: 600,
//       },
//       {
//         url: "https://nextjs.org/og-alt.png",
//         width: 1800,
//         height: 1600,
//         alt: "My custom alt",
//       },
//     ],
//     locale: "en-US",
//     type: "website",
//   },
//   robots: {
//     index: false,
//     follow: true,
//     nocache: true,
//     googleBot: {
//       index: true,
//       follow: false,
//       noimageindex: true,
//       "max-video-preview": -1,
//       "max-image-preview": "large",
//       "max-snippet": -1,
//     },
//   },
//   icons: {
//     icon: [
//       { url: "/favicon/favicon-32x32.png" },
//       new URL("/favicon/favicon-32x32.png", "https://example.com"),
//     ],
//     shortcut: ["/shortcut-icon.png"],
//     apple: [
//       { url: "/apple-icon.png" },
//       {
//         url: "/static/favicon/apple-icon-57x57.png",
//         // sizes: "180x180",
//         type: "image/png",
//       },
//     ],
//     other: [
//       {
//         rel: "apple-touch-icon-precomposed",
//         url: "/apple-touch-icon-precomposed.png",
//       },
//     ],
//   },
// };

export default async function Home({ params: { lng } }) {
  const blogs = await getAllFilesFrontmatter("blog", lng);
  const featuredPosts = await getFeatured(blogs, ["react-query"]);

  const projects = await getAllFilesFrontmatter("projects", lng);

  const featuredProjects = getFeatured(projects, ["bzpublish", "tbs"]);

  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "common");

  return (
    <main className="">
      <section className="mt-20 flex h-full min-h-[calc(100vh-100px)] flex-col justify-center lg:mt-0">
        <article className="layout">
          <div className="flex flex-col items-center gap-y-20 lg:grid-cols-2 lg:flex-row lg:justify-between lg:gap-y-0">
            <div className="w-full lg:w-6/12">
              <h2 className="text-2xl md:text-4xl 2xl:text-5xl">
                {t("hero.greet1")}
              </h2>
              <h1 className="mt-1 text-3xl md:text-4xl 2xl:text-5xl">
                {t("hero.greet2")} <Accent>Alpian</Accent>
              </h1>
              <p className="mt-4 max-w-xl text-gray-700 dark:text-gray-200 md:mt-6 md:text-lg 2xl:text-xl">
                {t("hero.p1")}
              </p>

              <div className="mt-8 flex flex-wrap gap-4 md:!text-lg">
                <div className="group relative">
                  <div className="absolute -inset-0.5 animate-tilt rounded blur bg-gradient-to-r from-primary-300 to-primary-400 dark:from-primary-200 dark:via-primary-300 opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200" />
                  {/* <ButtonLink href="/blog"> {t("hero.cta1")}</ButtonLink> */}
                </div>
                {/* <ButtonLink href="/about">{t("hero.cta2")}</ButtonLink> */}
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
              </div>
            </div>
            <div className=" overflow-hidden">{/* <MarbleGuest /> */}</div>
          </div>
        </article>
      </section>
      <section className="py-20">
        <article className="layout">
          <h2 className="text-2xl md:text-4xl" id="blog">
            <Accent>Featured Posts</Accent>
          </h2>
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredPosts?.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </ul>
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
          <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {featuredProjects?.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </ul>
          <ButtonLink className="mt-4" href="/projects">
            See more project
          </ButtonLink>
        </article>
      </section>
    </main>
  );
}

