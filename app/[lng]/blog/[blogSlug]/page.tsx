import { getFileBySlug, getFiles } from "@/lib/mdx";
import React from "react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { languages } from "@/app/i18n/settings";

type PostPageProps = {
  params: {
    lng: string;
    blogSlug: string[];
  };
};

export default async function blog({
  params: { lng, blogSlug },
}: PostPageProps) {
  console.log("🚀 ~ file: page.tsx:11 ~ blog ~ blogSlug:", blogSlug);
  console.log("🚀 ~ file: page.tsx:11 ~ blog ~ lng:", lng);

  const post = await getFileBySlug("blog", blogSlug as string, lng);
  console.log("🚀 ~ file: page.tsx:18 ~ post:", post);

  return <div className="prose mdx">{post?.content}</div>;
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
