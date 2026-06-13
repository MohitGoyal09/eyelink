"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Category = "asl" | "audionav" | "cabs" | "wheelchair";

interface ProductTileProps {
	href: string;
	name: string;
	description: string;
	category: Category;
	ctaLabel: string;
	className?: string;
}

const categoryClass: Record<Category, string> = {
	asl: "text-asl",
	audionav: "text-audionav",
	cabs: "text-cabs",
	wheelchair: "text-wheelchair",
};

/**
 * ProductTile — a single product surface used in the hero 2×2 grid
 * and the ecosystem section. Each category has a custom geometric icon,
 * a category color, and an honest "press" interaction.
 */
export function ProductTile({
	href,
	name,
	description,
	category,
	ctaLabel,
	className,
}: ProductTileProps) {
	return (
		<Link
			href={href}
			className={cn(
				"group relative flex flex-col justify-between overflow-hidden rounded-xl",
				"border border-border/60 bg-surface-raised/40 p-6",
				"transition-all duration-300 ease-out-expo",
				"hover:border-border hover:bg-surface-raised/70",
				"min-h-[180px] sm:min-h-[200px]",
				className,
			)}
		>
			{/* Top row: icon + category dot */}
			<div className="flex items-start justify-between">
				<ProductIcon category={category} />
				<span
					aria-hidden
					className={cn(
						"h-1.5 w-1.5 rounded-full",
						"bg-current opacity-40 transition-opacity duration-300 group-hover:opacity-100",
						categoryClass[category],
					)}
				/>
			</div>

			{/* Body */}
			<div className="mt-8">
				<h3 className="font-display text-lg font-semibold text-foreground">
					{name}
				</h3>
				<p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
					{description}
				</p>
			</div>

			{/* CTA row */}
			<div
				className={cn(
					"mt-5 inline-flex items-center gap-1.5 text-sm font-medium",
					"transition-colors duration-200",
					categoryClass[category],
				)}
			>
				{ctaLabel}
				<MoveRight
					className={cn(
						"size-3.5 transition-transform duration-200 ease-out-expo",
						"group-hover:translate-x-1",
					)}
				/>
			</div>

			{/* Subtle hover sheen — a single line that draws across on hover */}
			<span
				aria-hidden
				className={cn(
					"pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0",
					"bg-gradient-to-r from-transparent via-current to-transparent opacity-0",
					"transition-all duration-500 ease-out-expo",
					"group-hover:scale-x-100 group-hover:opacity-40",
					categoryClass[category],
				)}
			/>
		</Link>
	);
}

/**
 * ProductIcon — a small, geometric, custom SVG mark per category.
 * No Lucide clipart. Each one fits a 24x24 box and inherits currentColor.
 */
function ProductIcon({ category }: { category: Category }) {
	const cls = cn("h-6 w-6", categoryClass[category]);

	if (category === "asl") {
		// Two abstract hands in conversation — two arcs facing each other
		return (
			<svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
				<path
					d="M3 12c0-3.5 2.5-6 6-6"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					d="M21 12c0-3.5-2.5-6-6-6"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					d="M3 12c0 3.5 2.5 6 6 6"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					d="M21 12c0 3.5-2.5 6-6 6"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<circle cx="12" cy="12" r="1.5" fill="currentColor" />
			</svg>
		);
	}

	if (category === "audionav") {
		// Concentric sound waves emanating from a point
		return (
			<svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
				<circle cx="12" cy="12" r="1.5" fill="currentColor" />
				<path
					d="M9 9c1.5-1.5 4.5-1.5 6 0"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					d="M6.5 6.5c2.7-2.7 8.3-2.7 11 0"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					opacity="0.7"
				/>
				<path
					d="M15 15c-1.5 1.5-4.5 1.5-6 0"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
				/>
				<path
					d="M17.5 17.5c-2.7 2.7-8.3 2.7-11 0"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinecap="round"
					opacity="0.7"
				/>
			</svg>
		);
	}

	if (category === "cabs") {
		// Accessible vehicle — a car silhouette with a small access symbol
		return (
			<svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
				<path
					d="M3 14h18l-1.5-4.5a2 2 0 0 0-1.9-1.4H6.4a2 2 0 0 0-1.9 1.4L3 14Z"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
				<path
					d="M3 14v3.5a1 1 0 0 0 1 1h1.5a1 1 0 0 0 1-1V16.5h11V17.5a1 1 0 0 0 1 1H20a1 1 0 0 0 1-1V14"
					stroke="currentColor"
					strokeWidth="1.5"
					strokeLinejoin="round"
				/>
				<circle cx="7.5" cy="14" r="1.25" fill="currentColor" />
				<circle cx="16.5" cy="14" r="1.25" fill="currentColor" />
				{/* Small accessibility indicator — a person standing */}
				<circle cx="12" cy="10.5" r="0.8" fill="currentColor" />
				<path
					d="M12 11.3v2m-1 0h2"
					stroke="currentColor"
					strokeWidth="1.2"
					strokeLinecap="round"
				/>
			</svg>
		);
	}

	// wheelchair
	// Wheelchair pictogram refined
	return (
		<svg viewBox="0 0 24 24" fill="none" className={cls} aria-hidden>
			<circle cx="11" cy="4.5" r="1.6" fill="currentColor" />
			<path
				d="M11 7v5.5h5.5l1.5 4.5"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<circle cx="10.5" cy="17" r="4" stroke="currentColor" strokeWidth="1.5" />
			<circle cx="10.5" cy="17" r="1.2" fill="currentColor" />
			<path
				d="M9 13.5l-1-2.5a1 1 0 0 1 .95-1.3h2.55"
				stroke="currentColor"
				strokeWidth="1.5"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
}
