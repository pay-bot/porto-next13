// "use client";

import { shimmer, toBase64 } from "@/utils";
import { buildUrl } from "cloudinary-build-url";
import Image from "next/image";

type CloudinaryImgType = {
  publicId: string;
  height: string | number;
  width: string | number;
  alt: string;
  title?: string;
  className?: string;
  preview?: boolean;
  noStyle?: boolean;
  aspect?: {
    width: number;
    height: number;
  };
  mdx?: boolean;
};

export default function CloudinaryImg({
  publicId,
  height,
  width,
  alt,
  title,
  className,
  preview = true,
  noStyle = false,
  mdx = false,
  style,
  aspect,
  ...rest
}: CloudinaryImgType) {
  // const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const urlBlurred = buildUrl(publicId, {
    cloud: {
      cloudName: "dkrci6hyh",
    },
    transformations: {
      effect: {
        name: "blur:1000",
      },
      quality: 1,
      rawTransformation: aspect
        ? `c_fill,ar_${aspect.width}:${aspect.height},w_${width}`
        : undefined,
    },
  });
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
    <figure
      className={[
        className,
        "overflow-hidden rounded shadow dark:shadow-none",
      ].join(" ")}
      style={{
        ...(mdx && width <= 800 ? { maxWidth: width } : {}),
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: "relative",
          height: 0,
          paddingTop: aspectRatio
            ? `${aspectRatio * 100}%`
            : `${(+height / +width) * 100}%`,
          cursor: preview ? "zoom-in" : "default",
        }}
        className="img-blur"
      >
        <div className="absolute top-0 left-0 ">
          <Image
            width={width}
            height={height}
            src={url}
            alt={alt}
            title={title || alt}
            placeholder="blur"
            blurDataURL={`data:image/svg+xml;base64,${toBase64(
              shimmer(48, 48)
            )}`}
          />
        </div>
      </div>
    </figure>
  );
}


