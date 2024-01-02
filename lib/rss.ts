import format from "date-fns/format";
import fs from "fs";

import { getAllFilesFrontmatter } from "@/lib/mdx";

export async function getRssXml(locale: string) {
  const frontmatters = await getAllFilesFrontmatter("blog", locale);

  const blogUrl = "https://edotech.app/blog";

  const itemXml = frontmatters
    .filter((fm) => !fm.slug.startsWith("id-"))
    .map(({ slug, title, description, publishedAt, lastUpdated }) =>
      `
    <item>
      <title>${cdata(title)}</title>
      <description>${cdata(description)}</description>
      <link>${blogUrl}/${slug}</link>
      <guid>${blogUrl}/${slug}</guid>
      <pubDate>${format(
        new Date(lastUpdated ?? publishedAt),
        "yyyy-MM-dd"
      )}</pubDate>
    </item>
    `.trim()
    );

  return `
    <rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:blogChannel="${blogUrl}">
      <channel>
        <title>Fahri Alpiansyah Blog</title>
        <link>${blogUrl}</link>
        <description>The Fahri Alpiansyah Blog, Tutorials about front-end development.</description>
        <language>en</language>
        <ttl>40</ttl>
        ${itemXml.join("\n")}
      </channel>
    </rss>
  `.trim();
}

function cdata(s: string) {
  return `<![CDATA[${s}]]>`;
}

export async function generateRss(locale: string) {
  const xml = await getRssXml(locale);
  fs.writeFileSync("public/rss.xml", xml);
}
