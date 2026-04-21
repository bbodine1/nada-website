'use client'

import { useRef, useState } from 'react'

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
				className="absolute inset-0 h-full w-full object-cover"
				autoPlay
				muted
				loop
				playsInline
				preload="metadata"
				poster="/hero-fallback.jpg"
			>
				<source
					src="/video/farm-spraying.mp4"
					type="video/mp4"
				/>
			</video>
			<button
				type="button"
				onClick={handleTogglePlayback}
				aria-pressed={isPaused}
				className="absolute bottom-6 right-6 z-20 rounded-md border border-white/60 bg-black/45 px-3 py-2 text-xs font-semibold text-white backdrop-blur-sm md:hidden"
			>
				{isPaused ? 'Play Background Video' : 'Stop Background Video'}
			</button>
		</>
	)
}
