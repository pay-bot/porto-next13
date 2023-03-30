/* eslint-disable @typescript-eslint/no-explicit-any */
import { readdirSync, readFileSync } from "fs";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import { join } from "path";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrism from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";

import { ContentType, Frontmatter, PickFrontmatter } from "../app/types";

export const getFiles = (type: ContentType, locale: string): string[] => {
  return readdirSync(join(process.cwd(), "app", "contents", type, locale));
};

export async function getFileBySlug(
  type: ContentType,
  slug: string,
  locale: string
) {
  const source = slug
    ? readFileSync(
        join(process.cwd(), "app", "contents", type, locale, `${slug}.mdx`),
        "utf8"
      )
    : readFileSync(
        join(process.cwd(), "app", "contents", locale, `${type}.mdx`),
        "utf8"
      );

  const { content, frontmatter } = await compileMDX({
    source,
    options: {
      parseFrontmatter: true,
      mdxOptions: {
        recmaPlugins: remarkGfm,
        rehypePlugins: [
          rehypeSlug,
          rehypePrism,
          [
            rehypeAutolinkHeadings,
            {
              properties: {
                className: ["hash-anchor"],
              },
            },
          ],
        ],
      },
    },
  });
  console.log("🚀 ~ file: mdx.ts:54 ~ content:", content);

  return {
    content,
    frontmatter: {
      wordCount: source.split(/\s+/gu).length,
      readingTime: readingTime(source),
      slug: slug || null,
      ...frontmatter,
    },
  };
}

export async function getAllFilesFrontmatter<T extends ContentType>(
  type: T,
  locale: string
) {
  const files = readdirSync(
    join(process.cwd(), "app", "contents", type, locale)
  );

  return files.reduce((allPosts: Array<PickFrontmatter<T>>, postSlug) => {
    const source = readFileSync(
      join(process.cwd(), "app", "contents", type, locale, postSlug),
      "utf8"
    );
    const { data } = matter(source);

    const res = [
      {
        ...(data as PickFrontmatter<T>),
        slug: postSlug.replace(".mdx", ""),
        readingTime: readingTime(source),
      },
      ...allPosts,
    ];
    return res;
  }, []);
}

export async function getRecommendations(currSlug: string, locale: string) {
  const frontmatters = await getAllFilesFrontmatter("blog", locale);

  // Get current frontmatter
  const currentFm = frontmatters.find((fm) => fm.slug === currSlug);

  // Remove currentFm and Bahasa Posts, then randomize order
  const otherFms = frontmatters
    .filter((fm) => !fm.slug.startsWith("id-") && fm.slug !== currSlug)
    .sort(() => Math.random() - 0.5);

  // Find with similar tags
  const recommendations = otherFms.filter((op) =>
    op.tags.split(",").some((p) => currentFm?.tags.split(",").includes(p))
  );

  // Populate with random recommendations if not enough
  const threeRecommendations =
    recommendations.length >= 3
      ? recommendations
      : [
          ...recommendations,
          ...otherFms.filter(
            (fm) => !recommendations.some((r) => r.slug === fm.slug)
          ),
        ];

  // Only return first three
  return threeRecommendations.slice(0, 3);
}

/**
 * Get and order frontmatters by specified array
 */
export function getFeatured<T extends Frontmatter>(
  contents: Array<T>,
  features: string[]
) {
  // override as T because there is no typechecking on the features array
  return features.map(
    (feat) => contents.find((content) => content.slug === feat) as T
  );
}
