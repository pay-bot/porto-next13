import Accent from "@/app/components/Accent";
import { getAllFilesFrontmatter } from "@/lib/mdx";
import React from "react";
import type { Metadata } from "next";
import { Alpian } from "../../shared/meta/alpian";
import Container from "@/app/components/Container";
import ProjectSection from "@/app/components/ProjectSection";

export const metadata: Metadata = {
  title: "Projects",
  openGraph: {
    type: "article",
    locale: "en",
    url: "https://www.edotech.app/project",
    siteName: Alpian.name,
    title: "Projects",
    description: "Showcase of my projects on front-end development",
    images: [
      {
        url: "/api/og?title=Projects",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: Alpian.name,
    description: "Showcase of my projects on front-end development",
    creator: `@${Alpian.name.toLowerCase()}`,
    images: ["/api/og?title=Projects"],
  },
};

export default async function Project({ params: { lng } }) {
  const projects = await getAllFilesFrontmatter("projects", lng);
  return (
    <Container className="py-24">
      <div className="flex max-w-4xl flex-col items-start justify-center animate-in slide-in-from-left duration-500">
        <h1 className="text-3xl md:text-5xl" data-fade="0">
          <Accent>Project</Accent>
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300" data-fade="1">
          Showcase of my projects on front-end development
        </p>
      </div>
      <div className="mt-10 mb-24 animate-in slide-in-from-right duration-500">
        <ProjectSection projects={projects} />
      </div>
    </Container>
  );
}
