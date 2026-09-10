import React from "react";

interface ResponsivePictureProps {
  alt: string;
  width: number;
  height: number;
  sizes: string;
  avifSrcSet: string;
  webpSrcSet: string;
  fallbackSrc: string;
  className?: string;
  loading?: "lazy" | "eager";
  fetchPriority?: "high" | "low" | "auto";
  decoding?: "async" | "auto" | "sync";
  "aria-hidden"?: boolean;
}

/**
 * Art-directed landing-page image: AVIF → WebP → JPEG, with explicit
 * dimensions and a responsive srcset.
 */
export const ResponsivePicture: React.FC<ResponsivePictureProps> = ({
  alt,
  width,
  height,
  sizes,
  avifSrcSet,
  webpSrcSet,
  fallbackSrc,
  className,
  loading = "lazy",
  fetchPriority = "auto",
  decoding = "async",
  "aria-hidden": ariaHidden,
}) => {
  return (
    <picture>
      <source type="image/avif" srcSet={avifSrcSet} sizes={sizes} />
      <source type="image/webp" srcSet={webpSrcSet} sizes={sizes} />
      <img
        src={fallbackSrc}
        alt={ariaHidden ? "" : alt}
        width={width}
        height={height}
        sizes={sizes}
        className={className}
        loading={loading}
        fetchPriority={fetchPriority}
        decoding={decoding}
        aria-hidden={ariaHidden}
      />
    </picture>
  );
};
