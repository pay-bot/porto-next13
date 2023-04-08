import Accent from "@/app/components/Accent";
import BlogCard from "@/app/components/blog/BlogCard";
import ContentPlaceholder from "@/app/components/content/ContentPlaceholder";
import { getAllFilesFrontmatter } from "@/lib/mdx";
import React from "react";
import type { Metadata } from "next";
import { Alpian } from "../../shared/meta/alpian";
import BlogSection from "@/app/components/BlogSection";
import Container from "@/app/components/Container";

export const metadata: Metadata = {
  title: "Blog",
  openGraph: {
    type: "article",
    locale: "en",
    url: "https://www.fahrialpiansyah.my.id/blog",
    siteName: Alpian.name,
    title: "Blog",
    description: "Tutorials about front-end development.",
    images: [
      {
        url: "/api/og?title=Blog",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: Alpian.name,
    description: "Tutorials about front-end development.",
    creator: `@${Alpian.name.toLowerCase()}`,
    images: ["/api/og?title=Blog"],
  },
};

export default async function Blog({ params: { lng } }) {
  const blogs = await getAllFilesFrontmatter("blog", lng);
  return (
    <Container className="py-24">
      <div className="flex max-w-4xl flex-col items-start justify-center animate-in slide-in-from-left duration-500">
        <h1 className="text-3xl md:text-5xl" data-fade="0">
          <Accent>Blog </Accent>
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
          Tutorials about front-end development.
        </p>
        <div className="mt-10 mb-24 max-w-3xl animate-in slide-in-from-right duration-500">
          <BlogSection posts={blogs} />
        </div>
      </div>
    </Container>
  );
}
