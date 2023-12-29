import { formatDate, shimmer, toBase64 } from "@/utils";
import Container from "./Container";
import MyLink from "./MyLink";
import MyImage from "./MyImage";
import TechIcons, { TechListType } from "./TechIcons";

export default function ProjectSection({ projects }) {
  return (
    <Container as="section" className="animate-in fade-in duration-500 px-0">
      <div className="grid sm:grid-cols-2 grid-cols-1 items-start justify-start gap-6 overflow-x-auto pb-8 ">
        {projects?.length ? (
          <>
            {projects.map((p) => (
              <div
                key={p.slug}
                className="group w-full flex-none rounded-md border border-gray-300 p-4"
              >
                <MyLink
                  href={`/project/${p.slug}`}
                  className="group flex flex-col"
                >
                  <div className="flex h-[9rem] flex-col items-start justify-between ">
                    <div className="flex flex-col">
                      <h2 className="h3 mt-1 inline font-bold leading-8">
                        {p.title}
                      </h2>
                      <p className="">{p.description}</p>
                    </div>
                    <div className="pb-4">
                      {p.techs.split(",")?.length ? (
                        <div className="space-x-1">
                          <TechIcons
                            techs={p.techs.split(",") as Array<TechListType>}
                          />
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="h-full w-full overflow-clip rounded-t-md">
                    <MyImage
                      src={p.banner}
                      alt={p.title}
                      width={330}
                      height={200}
                      placeholder="blur"
                      blurDataURL={`data:image/svg+xml;base64,${toBase64(
                        shimmer(330, 200)
                      )}`}
                      className="group-hover:blog-scale h-full w-full object-cover object-center"
                      priority
                    />
                  </div>
                  <p className="animated-underline mt-2 inline-block font-medium w-fit">
                    See more →
                  </p>
                </MyLink>
              </div>
            ))}
          </>
        ) : (
          <p>No projects found</p>
        )}
      </div>
    </Container>
  );
}
