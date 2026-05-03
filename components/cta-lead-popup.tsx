"use client";

import {
	createContext,
	type ReactNode,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from "react";

import { LeadInterestForm } from "@/components/lead-interest-form";

type CtaPopupContextValue = {
	isOpen: boolean;
	open: () => void;
	close: () => void;
};

type CtaButtonProps = {
	className?: string;
	children: ReactNode;
	"data-track"?: string;
	"aria-label"?: string;
};

const CtaPopupContext = createContext<CtaPopupContextValue | null>(null);

export function CtaPopupProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);

	const value = useMemo(
		() => ({
			isOpen,
			open,
			close,
		}),
		[isOpen, open, close],
	);

	return (
		<CtaPopupContext.Provider value={value}>
			{children}
		</CtaPopupContext.Provider>
	);
}

export function useCtaPopup() {
	const context = useContext(CtaPopupContext);
	if (!context) {
		throw new Error("useCtaPopup must be used within CtaPopupProvider");
	}
	return context;
}

export function CtaButton({ className, children, ...rest }: CtaButtonProps) {
	const { open } = useCtaPopup();

	return (
		<button type="button" className={className} onClick={open} {...rest}>
			{children}
		</button>
	);
}

export function CtaLeadPopup() {
	const { isOpen, close } = useCtaPopup();
	const dialogRef = useRef<HTMLDivElement | null>(null);
	const closeButtonRef = useRef<HTMLButtonElement | null>(null);
	const previousFocusRef = useRef<HTMLElement | null>(null);

	useEffect(() => {
		if (!isOpen) {
			return;
		}

		previousFocusRef.current =
			document.activeElement instanceof HTMLElement
				? document.activeElement
				: null;
		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";
		window.setTimeout(() => closeButtonRef.current?.focus(), 0);

		const handleKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				event.preventDefault();
				close();
				return;
			}

			if (event.key !== "Tab" || !dialogRef.current) {
				return;
			}

			const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
				'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
			);

			if (focusable.length === 0) {
				return;
			}

			const first = focusable[0];
			const last = focusable[focusable.length - 1];

			if (event.shiftKey && document.activeElement === first) {
				event.preventDefault();
				last.focus();
			} else if (!event.shiftKey && document.activeElement === last) {
				event.preventDefault();
				first.focus();
			}
		};

		document.addEventListener("keydown", handleKeyDown);
		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = previousOverflow;
			previousFocusRef.current?.focus();
		};
	}, [isOpen, close]);

	if (!isOpen) {
		return null;
	}

	return (
		<div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
			<button
				type="button"
				aria-label="Close popup"
				onClick={close}
				className="absolute inset-0 bg-black/45 backdrop-blur-[2px]"
			/>
			<div
				ref={dialogRef}
				role="dialog"
				aria-modal="true"
				aria-labelledby="cta-lead-popup-title"
				data-track="cta-popup-open"
				className="relative z-10 max-h-[95vh] w-full max-w-xl overflow-y-auto rounded-[var(--radius-xl)] border border-[color:var(--border)] bg-white p-6 shadow-[0_25px_70px_-30px_rgba(30,58,15,0.45)] sm:p-7"
			>
				<button
					ref={closeButtonRef}
					type="button"
					onClick={close}
					aria-label="Dismiss CTA popup"
					data-track="cta-popup-dismiss"
					className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full border border-[color:var(--border)] bg-white text-[color:var(--fg-muted)] transition hover:text-[color:var(--foreground)]"
				>
					<span aria-hidden>&times;</span>
				</button>
				<h2 id="cta-lead-popup-title" className="sr-only">
					Download the free North Alabama field guide
				</h2>
				<LeadInterestForm />
			</div>
		</div>
	);
}
