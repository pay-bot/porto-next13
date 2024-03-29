import { shimmer, toBase64 } from "@/utils";
import MyImage from "./MyImage";
import MyLink from "./MyLink";
import Container from "./Container";
import buildUrl from "cloudinary-build-url";
// import { MyLink, Container, MyImage } from "components";
interface IBlogHeader {
  title: string;
  date: string;
  readingTime: string;
  imgSrc: string;
  imgAlt: string;
  publicId: string;
  authorName: React.ReactNode;
  coverImageAttributionText: string;
  coverImageAttributionLink: string;
  aspect?: {
    width: number;
    height: number;
  };
}

export default function BlogHeader({
  title,
  authorName,
  coverImageAttributionText,
  coverImageAttributionLink,
  date,
  readingTime,
  imgSrc,
  imgAlt,
  publicId,
  aspect,
}: IBlogHeader) {
  const url = buildUrl(publicId, {
    cloud: {
      cloudName: "dkrci6hyh",
    },
    transformations: {
      rawTransformation: aspect
        ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
        : undefined,
    },
  });

  const aspectRatio = aspect ? aspect.height / aspect.width : undefined;

  return (
    <Container className="mt-32 mb-14 px-0">
      <div className="animate-in slide-in-from-left duration-500">
        <div className="mt-2 space-x-2 text-base italic tracking-wide">
          <span> Published: {date}</span>
          <span>&mdash;</span>
          <span>{readingTime}</span>
        </div>
        <h1 className="mb-4 text-5xl font-bold md:text-7xl">{title}</h1>
        <div className="flex flex-row justify-start text-lg md:text-xl">
          <div className="font-medium">Written by: {authorName}</div>
        </div>
      </div>
      <MyImage
        src={imgSrc}
        width={1200}
        height={630}
        alt={imgSrc}
        className="my-8 h-[280px] w-full rounded-md border border-gray-300 object-cover object-center animate-in fade-in duration-500 md:h-[500px]"
        placeholder="blur"
        blurDataURL={`data:image/svg+xml;base64,${toBase64(
          shimmer(1200, 630)
        )}`}
        priority
      />
    </Container>
  );
}
