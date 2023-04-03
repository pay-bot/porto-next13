import Link from "next/link";
import React from "react";
import CloudinaryImg from "../images/CloudinaryImg";

export default function BlogCard({ post }) {
  return (
    <li className="w-full rounded-md border border-gray-300 bg-white dark:border-gray-600 dark:bg-dark">
      <Link
        className="block h-full rounded-md focus:outline-none focus-visible:ring focus-visible:ring-primary-300"
        href={`/blog/${post.slug}`}
      >
        <div className="relative">
          <CloudinaryImg
            noStyle
            className="pointer-events-none overflow-hidden rounded-t-md"
            publicId={`/${post.banner}`}
            alt="Photo taken from unsplash"
            width={1200}
            height={(1200 * 2) / 5}
            aspect={{ height: 2, width: 5 }}
            preview={false}
          />
          <div className={"absolute bottom-0 w-full px-4 py-2"}>
            {/* {post.tags.split(",").map((tag) => (
                    <Tag
                      tabIndex={-1}
                      className="bg-opacity-80 dark:!bg-opacity-60"
                      key={tag}
                    >
                      {checkTagged?.(tag) ? <Accent>{tag}</Accent> : tag}
                    </Tag>
                  ))} */}
          </div>
        </div>
        <div className="p-4">
          <h4 className="text-gray-800 dark:text-gray-100">{post.title}</h4>
          <div className="mt-2 flex items-center justify-start gap-2 text-sm font-medium text-gray-600 dark:text-gray-300">
            <div className="flex items-center gap-1">
              {/* <HiOutlineClock className="inline-block text-base" />
                    <Accent>{post.readingTime.text}</Accent> */}
            </div>
            <div className="flex items-center gap-1">
              {/* <HiOutlineEye className="inline-block text-base" />
                    <Accent>
                      {post?.views?.toLocaleString() ?? "–––"} views
                    </Accent> */}
            </div>
          </div>
          <p className="mt-4 mb-2 text-sm text-gray-600 dark:text-gray-300">
            {/* <span className="font-bold text-gray-800 dark:text-gray-100">
                    {format(
                      new Date(post.lastUpdated ?? post.publishedAt),
                      "MMMM dd, yyyy"
                    )}
                  </span> */}
          </p>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {post.description}
          </p>
        </div>
      </Link>
    </li>
  );
}