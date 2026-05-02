"use client";

import Image from "next/image";
import { useState } from "react";

type YoutubeClickPlayProps = {
  videoId: string;
  title: string;
};

/**
 * Defers loading YouTube's embed/player JS until the user opts in.
 * Avoids Chromium permissions-policy noise from the player probing PiP during passive scroll/navigation.
 */
export function YoutubeClickPlay({ videoId, title }: YoutubeClickPlayProps) {
  const [active, setActive] = useState(false);

  if (!active) {
    const thumbSrc = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

    return (
      <button
        type="button"
        className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center outline-none ring-[color:var(--color-primary)] focus-visible:ring-2 focus-visible:ring-offset-2"
        onClick={() => setActive(true)}
        aria-label={`Play video: ${title}`}
      >
        <Image
          src={thumbSrc}
          alt=""
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 896px"
          loading="lazy"
        />
        <span
          aria-hidden="true"
          className="absolute inset-0 bg-black/25 transition-colors group-hover:bg-black/35 group-focus-visible:bg-black/35"
        />
        <span className="relative flex h-16 w-16 items-center justify-center rounded-full bg-[color:var(--color-primary)] text-white shadow-lg ring-4 ring-white/40 transition-transform group-hover:scale-105 group-active:scale-95">
          <svg
            viewBox="0 0 24 24"
            className="ml-1 h-8 w-8 fill-current"
            aria-hidden="true"
          >
            <path d="M8 5v14l11-7z" />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <iframe
      className="absolute inset-0 h-full w-full"
      src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
      title={title}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
      allowFullScreen
    />
  );
}
