"use client";

import buildUrl from "cloudinary-build-url";
import { clsxm } from "../../utils";
import Image, { ImageProps } from "next/image";

export interface IKommyImage extends ImageProps {
  blogImage?: boolean;
  caption?: string;
  captionClassName?: string;
}

export default function KommyImage({
  src,
  alt,
  className,
  blogImage = false,
  caption,
  width,
  height,
  captionClassName,
  aspect,
  ...rest
}: IKommyImage) {
  const url = buildUrl(src, {
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

  if (blogImage) {
    return (
      <figure className="mx-auto my-8 h-auto w-auto max-w-3xl overflow-clip rounded-md">
        <Image
          src={url}
          alt={alt}
          width={width}
          height={height}
          className={clsxm(
            "h-auto w-full rounded-md object-cover object-center",
            className
          )}
        />
        <figcaption
          className={clsxm(
            "mx-auto mt-2 max-w-xl text-center text-base italic text-gray-600",
            captionClassName
          )}
        >
          <span>{caption}</span>
        </figcaption>
      </figure>
    );
  }
  return (
    <Image
      className={clsxm("object-cover object-center", className)}
      src={url}
      alt={alt}
      width={width}
      height={height}
      {...rest}
    />
  );
}
