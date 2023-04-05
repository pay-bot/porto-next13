import { getFileBySlug, getFiles } from "@/lib/mdx";
import React from "react";
import { format } from "date-fns";
import { languages } from "@/app/i18n/settings";
import TableOfContents from "../../../components/content/TableOfContents";
import CloudinaryImg from "../../../components/images/CloudinaryImg";
import Accent from "../../../components/Accent";
import { HiOutlineClock, HiOutlineEye } from "react-icons/hi";
import { notFound } from "next/navigation";
import CustomLink from "@/app/components/links/CustomLink";
// import { BlogHeader } from "@/app/components";
import { formatDate } from "@/utils";
import BlogHeader from "../../../components/BlogHeader";

type PostPageProps = {
  params: {
    lng: string;
    blogSlug: string[];
  };
};

export const generateMetadata = async ({
  params,
}: {
  params: PostPageProps;
}): Promise<Metadata> => {
  try {
    const { frontmatter } = await getFileBySlug(
      "blog",
      params.blogSlug as string,
      params.lng
    );
    return {
      title: frontmatter?.title,
      keywords: frontmatter?.tags?.split(",") || undefined,
      description: frontmatter?.excerpt,
      openGraph: {
        type: "article",
        locale: "zh_TW",
        url: `https://alpian1104.dev/posts/${params.slug}`,
        siteName: "Alpian",
        title: frontmatter?.title,
        description: frontmatter?.excerpt,
        images: [
          {
            url: `/api/og?title=${encodeURIComponent(
              frontmatter?.title ?? ""
            )}`,
            width: 1200,
            height: 630,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: "Alpian",
        description: frontmatter?.excerpt,
        creator: "@alpian1104",
        images: [
          `/api/og?title=${encodeURIComponent(frontmatter?.title ?? "")}`,
        ],
      },
    };
  } catch (error) {
    console.error(error);
    return {};
  }
};

export default async function blog({
  params: { lng, blogSlug },
}: PostPageProps) {
  try {
    const post = await getFileBySlug("blog", blogSlug as string, lng);

    const jsonLd: WithContext<Blog> = {
      "@context": "https://schema.org",
      "@type": "Blog",
      headline: post?.title,
      datePublished: post?.publishedAt,
      dateModified: post?.publishedAt,
      name: post?.title,
      description: post?.description,
      image: `/api/og?title=${encodeURIComponent(post?.title ?? "")}`,
      keywords: post?.tags?.join(","),
      author: {
        "@type": "Person",
        name: "Alpian1104",
      },
    };

    return (
      <>
        <main>
          <section className="">
            <div className="layout">
              {/* <div className="pb-4 dark:border-gray-600">
                <CloudinaryImg
                  publicId={`/v1673511475/${post.frontmatter.banner}`}
                  alt={`Photo from unsplash: ${post.frontmatter.banner}`}
                  width={1200}
                  height={(1200 * 2) / 5}
                  aspect={{ height: 2, width: 5 }}
                />

                <h1 className="mt-4">{post.frontmatter.title}</h1>

                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Written on{" "}
                  {format(
                    new Date(post.frontmatter.publishedAt),
                    "MMMM dd, yyyy"
                  )}{" "}
                  by Fahri Alpiansyah.
                </p>
                {post.frontmatter.lastUpdated && (
                  <div className="mt-2 flex flex-wrap gap-2 text-sm text-gray-700 dark:text-gray-200">
                    <p>
                      Last updated{" "}
                      {format(
                        new Date(post.frontmatter.lastUpdated),
                        "MMMM dd, yyyy"
                      )}
                      .
                    </p>
                  </div>
                )}
                <div className="mt-6 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
                  <div className="flex items-center gap-1">
                    <HiOutlineClock className="inline-block text-base" />
                    <Accent>{post.frontmatter.readingTime.text}</Accent>
                  </div>
                </div>
              </div> */}
              <BlogHeader
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
                date={post.frontmatter.publishedAt}
                title={post.frontmatter.title}
                imgSrc={`/v1673511475/${post.frontmatter.banner}`}
                imgAlt={`/v1673511475/${post.frontmatter.banner}`}
                publicId={`/v1673511475/${post.frontmatter.banner}`}
                readingTime={post.frontmatter.readingTime.text}
              />

              <hr className="dark:border-gray-600" />
              <section className="lg:grid lg:grid-cols-[auto,250px] lg:gap-8">
                <article className="mdx prose mx-auto mt-4 w-full transition-colors dark:prose-invert">
                  {post?.content}
                </article>
                <aside className="py-4">
                  <div className="sticky top-36">
                    <TableOfContents source={post.source} slug={blogSlug} />
                  </div>
                </aside>
              </section>
              <div className="mt-8 flex flex-col items-start gap-4 ">
                <CustomLink href="/blog">← Back to blog</CustomLink>
              </div>
            </div>
          </section>
        </main>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </>
    );
  } catch (error) {
    notFound();
  }
}

export async function generateStaticParams() {
  const localesPost = languages
    ?.map((locale) => {
      const posts = getFiles("blog", locale);
      return posts?.map((post) => [post, locale]);
    })
    .flat();

  return localesPost?.map(([slug, locale]) => ({
    blogSlug: slug.replace(/\.mdx/, ""),
    lng: locale,
  }));
}

