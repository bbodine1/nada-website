import Image from "next/image";

import { heroMedia } from "@/lib/hero-media";

export function HeroVideo() {
  return (
    <>
      <video
        className="absolute inset-0 h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster={heroMedia.posterSrc}
      >
        <source src={heroMedia.videoSrc} type={heroMedia.videoType} />
      </video>
      <Image
        src={heroMedia.fallbackImageSrc}
        alt={heroMedia.fallbackImageAlt}
        fill
        sizes="100vw"
        className="hidden object-cover motion-reduce:block"
      />
    </>
  );
}
