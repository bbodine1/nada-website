'use client'

import { useEffect } from 'react'

export function InPageAnchorHandler() {
	useEffect(() => {
		const onDocumentClick = (event: MouseEvent) => {
			if (event.button !== 0) return
			if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return

			const target = event.target as Element | null
			const anchor = target?.closest('a[href]') as HTMLAnchorElement | null
			if (!anchor) return

			const href = anchor.getAttribute('href')
			if (!href) return
			if (!href.includes('#')) return

			const url = new URL(anchor.href, window.location.href)
			const isSamePage =
				url.origin === window.location.origin &&
				url.pathname.replace(/\/+$/, '') === window.location.pathname.replace(/\/+$/, '')
			if (!isSamePage) return

			const rawHash = url.hash.replace(/^#/, '')
			const hash = decodeURIComponent(rawHash)
			const destination = hash ? document.getElementById(hash) : document.getElementById('top')
			if (!destination) return

			event.preventDefault()
			destination.scrollIntoView({ behavior: 'smooth', block: 'start' })

			const nextHash = hash ? `#${rawHash}` : '#top'
			if (window.location.hash !== nextHash) {
				window.history.pushState(null, '', nextHash)
			}
		}

		document.addEventListener('click', onDocumentClick, true)
		return () => document.removeEventListener('click', onDocumentClick, true)
	}, [])

	return null
}
