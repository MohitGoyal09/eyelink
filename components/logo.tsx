"use client";

import { cn } from "@/lib/utils";

interface LogoProps {
	className?: string;
	showWordmark?: boolean;
	size?: "sm" | "md" | "lg";
}

/**
 * Eyelink logo — a refined eye mark with concentric sound ripples,
 * signaling the brand's reach: a platform that hears, sees, and connects.
 *
 * The iris pulses subtly. Three outer ripples emanate on hover.
 */
export function Logo({
	className,
	showWordmark = true,
	size = "md",
}: LogoProps) {
	const sizes = {
		sm: { mark: 22, text: "text-base" },
		md: { mark: 28, text: "text-xl" },
		lg: { mark: 36, text: "text-2xl" },
	};
	const s = sizes[size];

	return (
		<div className={cn("group inline-flex items-center gap-2.5", className)}>
			<span
				className="relative inline-flex shrink-0"
				style={{ width: s.mark, height: s.mark }}
				aria-hidden
			>
				<svg
					viewBox="0 0 40 40"
					width={s.mark}
					height={s.mark}
					className="overflow-visible"
				>
					{/* Outer ripple rings — appear on hover, staggered */}
					<circle
						cx="20"
						cy="20"
						r="14"
						fill="none"
						stroke="currentColor"
						strokeOpacity="0"
						strokeWidth="1"
						className="text-signal transition-all duration-700 ease-out-expo group-hover:stroke-opacity-30 group-hover:[r:19]"
						style={{ transitionDelay: "0ms" }}
					/>
					<circle
						cx="20"
						cy="20"
						r="14"
						fill="none"
						stroke="currentColor"
						strokeOpacity="0"
						strokeWidth="1"
						className="text-signal transition-all duration-700 ease-out-expo group-hover:stroke-opacity-20 group-hover:[r:21]"
						style={{ transitionDelay: "100ms" }}
					/>
					<circle
						cx="20"
						cy="20"
						r="14"
						fill="none"
						stroke="currentColor"
						strokeOpacity="0"
						strokeWidth="1"
						className="text-signal transition-all duration-700 ease-out-expo group-hover:stroke-opacity-10 group-hover:[r:23]"
						style={{ transitionDelay: "200ms" }}
					/>

					{/* Eye outline — the brand mark */}
					<path
						d="M4 20 Q 20 6, 36 20 Q 20 34, 4 20 Z"
						fill="none"
						stroke="currentColor"
						strokeWidth="1.5"
						strokeLinejoin="round"
						className="text-foreground/85"
					/>

					{/* Iris — the signal color, gently pulsing */}
					<circle
						cx="20"
						cy="20"
						r="6"
						fill="currentColor"
						className="text-signal animate-pulse-signal"
					/>

					{/* Pupil — a single dark dot, the focus point */}
					<circle cx="20" cy="20" r="2" fill="hsl(var(--background))" />
				</svg>
			</span>

			{showWordmark && (
				<span
					className={cn(
						"font-display font-semibold tracking-tight text-foreground",
						s.text,
					)}
				>
					Eyelink
				</span>
			)}
		</div>
	);
}
