import { getFileBySlug, getFiles } from "@/lib/mdx";
import React from "react";
import { format } from "date-fns";
import { languages } from "@/app/i18n/settings";
import TableOfContents from "../../../components/TableOfContents";
import { notFound } from "next/navigation";
import CustomLink from "@/app/components/ui/links/CustomLink";
// import { BlogHeader } from "@/app/components";
import { formatDate } from "@/utils";
import BlogHeader from "../../../components/BlogHeader";
import Container from "@/app/components/Container";

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
        url: `https://alpian.dev/posts/${params.slug}`,
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
        creator: "@alpian",
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
        name: "Alpian",
      },
    };

    return (
      <>
        <main>
          <section className="">
            <div className="layout">
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
              <Container className="flex flex-col items-center justify-start lg:flex-row lg:items-start lg:justify-between px-0">
                <article className=" prose mx-auto mt-4 w-full transition-colors dark:prose-invert !max-w-none ">
                  {post?.content}
                </article>
                <TableOfContents source={post.source} slug={blogSlug} />
              </Container>
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
