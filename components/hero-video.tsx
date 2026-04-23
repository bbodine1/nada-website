'use client'

import Image from 'next/image'
import { useRef, useState } from 'react'

import { heroMedia } from '@/lib/hero-media'

export function HeroVideo() {
	const videoRef = useRef<HTMLVideoElement>(null)
	const [isPaused, setIsPaused] = useState(false)

	const handleTogglePlayback = () => {
		const video = videoRef.current
		if (!video) return

		if (video.paused) {
			void video.play()
			setIsPaused(false)
			return
		}

		video.pause()
		setIsPaused(true)
	}

	return (
		<>
			<video
				ref={videoRef}
				className="absolute inset-0 hidden h-full w-full object-cover md:block"
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
				sizes="(max-width: 767px) 100vw, 0vw"
				className="object-cover md:hidden"
				priority
			/>
			<button
				type="button"
				onClick={handleTogglePlayback}
				aria-pressed={isPaused}
				className="absolute bottom-6 right-6 z-20 hidden rounded-md border border-white/60 bg-black/45 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm md:inline-flex"
			>
				{isPaused ? 'Play Background Video' : 'Stop Background Video'}
			</button>
		</>
	)
}
