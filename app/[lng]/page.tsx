import { getAllFilesFrontmatter, getFeatured } from "@/lib/mdx";
import BlogCard from "./components/blog/BlogCard";
import ProjectCard from "./components/project/ProjectCard";
import { Trans } from "react-i18next/TransWithoutContext";
import { languages, fallbackLng } from "../i18n/settings";
import { useTranslation } from "../i18n";
import clsx from "clsx";
import Link from "next/link";
import Accent from "./components/Accent";

export default async function Home({ params: { lng } }) {
  const blogs = await getAllFilesFrontmatter("blog", lng);
  const featuredPosts = await getFeatured(blogs, ["react-query"]);

  const projects = await getAllFilesFrontmatter("projects", lng);

  const featuredProjects = getFeatured(projects, ["bzpublish", "tbs"]);
  console.log(
    "🚀 ~ file: page.tsx:12 ~ Home ~ featuredProjects:",
    featuredProjects
  );

  if (languages.indexOf(lng) < 0) lng = fallbackLng;
  const { t } = await useTranslation(lng, "common");
  console.log("🚀 ~ file: page.tsx:24 ~ Home ~ t:", t);

  return (
    <main className="">
      <section
        className={clsx(
          "mt-20 flex h-full min-h-[calc(100vh-100px)] flex-col justify-center lg:mt-0"
        )}
      >
        <article className="layout">
          <div className="flex flex-col items-center gap-y-20 lg:grid-cols-2 lg:flex-row lg:justify-between lg:gap-y-0">
            <div className="w-full lg:w-6/12">
              <h2 className="text-2xl md:text-4xl 2xl:text-5xl" data-fade="1">
                {t("hero.greet1")}
              </h2>
              <h1
                className="mt-1 text-3xl md:text-4xl 2xl:text-5xl"
                data-fade="2"
              >
                {t("hero.greet2")} <Accent>Alfian</Accent>
              </h1>
              <p
                className={clsx(
                  "mt-4 max-w-xl text-gray-700 dark:text-gray-200 md:mt-6",
                  "md:text-lg 2xl:text-xl"
                )}
                data-fade="3"
              >
                {t("hero.p1")}
              </p>

              <div
                data-fade="5"
                className="mt-8 flex flex-wrap gap-4 md:!text-lg"
              >
                <div className="group relative">
                  <div
                    className={clsx(
                      "absolute -inset-0.5 animate-tilt rounded blur",
                      "bg-gradient-to-r from-primary-300 to-primary-400",
                      "dark:from-primary-200 dark:via-primary-300",
                      "opacity-75 transition duration-1000 group-hover:opacity-100 group-hover:duration-200"
                    )}
                  />
                  {/* <ButtonLink href="/blog"> {t("hero.cta1")}</ButtonLink> */}
                </div>
                {/* <ButtonLink href="/about">{t("hero.cta2")}</ButtonLink> */}
              </div>
              <div
                data-fade="6"
                className="mt-4 flex flex-wrap gap-4 gap-y-2 md:mt-8"
              >
                <Link
                  href="https://drive.google.com/file/d/12PE3fknn3DTGdVNYYv55bgJh7g6T81u6/view?usp=sharing"
                  className={clsx(
                    "inline-flex items-center gap-1 text-sm font-medium md:text-base",
                    "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
                    "focus:outline-none focus-visible:ring focus-visible:ring-primary-300",
                    "transition-colors"
                  )}
                >
                  {/* <IoNewspaperSharp className="shrink-0" /> */}
                  <span>Resume</span>
                </Link>

                <Link
                  href="https://github.com/pay-bot"
                  className={clsx(
                    "inline-flex items-center gap-1 text-sm font-medium md:text-base",
                    "text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white",
                    "focus:outline-none focus-visible:ring focus-visible:ring-primary-300",
                    "transition-colors"
                  )}
                >
                  {/* <SiGithub className="shrink-0" /> */}
                  <span>github.com/pay-bot</span>
                </Link>
              </div>
            </div>
            <div className=" overflow-hidden">{/* <MarbleGuest /> */}</div>
          </div>
        </article>
      </section>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {featuredPosts?.map((post) => (
          <BlogCard post={post} />
        ))}
      </ul>
      <ul className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {featuredProjects?.map((project) => (
          <ProjectCard project={project} />
        ))}
      </ul>
    </main>
  );
}

export async function generateStaticParams() {
  return [{ lng: "en" }, { lng: "id" }];
}

