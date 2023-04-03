import Accent from "@/app/components/Accent";
import BlogCard from "@/app/components/blog/BlogCard";
import ContentPlaceholder from "@/app/components/content/ContentPlaceholder";
import { getAllFilesFrontmatter } from "@/lib/mdx";
import React from "react";

export default async function Blog({ params: { lng } }) {
  const blogs = await getAllFilesFrontmatter("blog", lng);
  return (
    <main>
      <section>
        <div className="layout py-12">
          <h1 className="text-3xl md:text-5xl" data-fade="0">
            <Accent>Blog </Accent>
          </h1>
          <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
            Tutorials about front-end development.
          </p>

          <ul
            className="mt-4 grid gap-4 sm:grid-cols-2 xl:grid-cols-3"
            data-fade="5"
          >
            {blogs.length > 0 ? (
              blogs.map((post) => (
                <BlogCard
                  key={post.slug}
                  post={post}
                  // checkTagged={checkTagged}
                />
              ))
            ) : (
              <ContentPlaceholder />
            )}
          </ul>
        </div>
      </section>
    </main>
  );
}
