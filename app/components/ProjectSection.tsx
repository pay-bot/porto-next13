import { formatDate, shimmer, toBase64 } from "utils";
import Container from "./Container";
import KommyLink from "./a";
import KommyImage from "./image";
import TechIcons, { TechListType } from "./TechIcons";

export default function ProjectSection({ projects }) {
  return (
    <Container as="section" className="animate-in fade-in duration-500 px-0">
      <span className="font-mono text-sm font-semibold lowercase text-gray-500">
        scroll &rarr;
      </span>
      <div className="flex flex-row items-start justify-start space-x-6 overflow-x-auto pb-8 ">
        {projects?.length ? (
          <>
            {projects.map((p) => (
              <div
                key={p.slug}
                className="group w-[330px] flex-none rounded-md border border-gray-300 p-4"
              >
                <KommyLink
                  href={`/blog/${p.slug}`}
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
                  <div className="h-[200px] w-full overflow-clip rounded-t-md">
                    <KommyImage
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
                  <p className="animated-underline mt-2 inline-block font-medium ">
                    See more →
                  </p>
                </KommyLink>
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
