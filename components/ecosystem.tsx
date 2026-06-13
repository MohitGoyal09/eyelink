"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Ecosystem — the 2×2 product showcase.
 *
 * Each tile is taller than a hero ProductTile: it has a category color, a
 * custom icon, a tiny "live" preview area showing the product in motion,
 * the name + description, three sub-features, and a CTA.
 */
export function Ecosystem() {
	return (
		<section id="how-it-works" className="relative py-24 sm:py-32">
			<div className="eyelink-container">
				{/* Section header */}
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
						The ecosystem
					</p>
					<h2 className="mt-3 font-display text-display-lg text-foreground">
						Four tools. One experience.
					</h2>
					<p className="mt-4 text-base text-muted-foreground">
						Every Eyelink product works on its own. They become something else
						when they work together — your accessibility, joined up.
					</p>
				</div>

				{/* 2×2 grid */}
				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-100px" }}
					variants={{
						hidden: {},
						show: { transition: { staggerChildren: 0.08 } },
					}}
					className="mt-16 grid grid-cols-1 gap-4 sm:grid-cols-2"
				>
					<EcosystemCard
						href="/asl"
						category="asl"
						name="ASL Translator"
						tagline="Real-time sign ↔ speech"
						description="Translate American Sign Language to text and speech, and back. Built for real conversations, not demos."
						features={[
							"Live camera translation",
							"Text-to-sign playback",
							"Works offline",
						]}
					>
						<ASLPreview />
					</EcosystemCard>

					<EcosystemCard
						href="/audioNav"
						category="audionav"
						name="Audio Navigation"
						tagline="See with your ears"
						description="Scene description, obstacle alerts, and wayfinding — spoken into your ear in real time."
						features={[
							"Object & obstacle detection",
							"3D directional audio",
							"Voice-guided routes",
						]}
					>
						<AudioNavPreview />
					</EcosystemCard>

					<EcosystemCard
						href="/cabs"
						category="cabs"
						name="Book Assistant"
						tagline="Accessible rides, on demand"
						description="Wheelchair-friendly cabs and trained travel assistants. Booked in three taps, not three phone calls."
						features={[
							"Verified accessible vehicles",
							"On-demand travel help",
							"Transparent fare estimate",
						]}
					>
						<CabsPreview />
					</EcosystemCard>

					<EcosystemCard
						href="/wheelchair"
						category="wheelchair"
						name="Wheelchair Routes"
						tagline="Routes that actually work"
						description="Route planning that knows about ramps, kerbs, and broken lifts — not just the shortest path."
						features={[
							"Curbside-aware routing",
							"Community-reported barriers",
							"Offline map support",
						]}
					>
						<WheelchairPreview />
					</EcosystemCard>
				</motion.div>
			</div>
		</section>
	);
}

const categoryColor: Record<string, string> = {
	asl: "text-asl",
	audionav: "text-audionav",
	cabs: "text-cabs",
	wheelchair: "text-wheelchair",
};

const categoryBorder: Record<string, string> = {
	asl: "group-hover:border-asl/40",
	audionav: "group-hover:border-audionav/40",
	cabs: "group-hover:border-cabs/40",
	wheelchair: "group-hover:border-wheelchair/40",
};

interface EcosystemCardProps {
	href: string;
	category: "asl" | "audionav" | "cabs" | "wheelchair";
	name: string;
	tagline: string;
	description: string;
	features: string[];
	children: React.ReactNode;
}

function EcosystemCard({
	href,
	category,
	name,
	tagline,
	description,
	features,
	children,
}: EcosystemCardProps) {
	return (
		<motion.div
			variants={{
				hidden: { opacity: 0, y: 16 },
				show: {
					opacity: 1,
					y: 0,
					transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
				},
			}}
		>
			<Link
				href={href}
				className={cn(
					"group relative flex h-full flex-col overflow-hidden rounded-2xl",
					"border border-border/60 bg-surface-raised/40 p-7",
					"transition-all duration-300 ease-out-expo",
					"hover:bg-surface-raised/70",
					categoryBorder[category],
				)}
			>
				{/* Preview area — the "live" part of the card */}
				<div className="mb-7 h-28 overflow-hidden rounded-lg border border-border/40 bg-background/40">
					{children}
				</div>

				{/* Header */}
				<div className="flex items-start justify-between">
					<div>
						<p
							className={cn(
								"text-xs font-medium uppercase tracking-wider",
								categoryColor[category],
							)}
						>
							{tagline}
						</p>
						<h3 className="mt-1.5 font-display text-2xl font-semibold text-foreground">
							{name}
						</h3>
					</div>
				</div>

				{/* Description */}
				<p className="mt-3 text-sm leading-relaxed text-muted-foreground">
					{description}
				</p>

				{/* Feature list */}
				<ul className="mt-5 space-y-2">
					{features.map((f) => (
						<li
							key={f}
							className="flex items-center gap-2 text-sm text-foreground/80"
						>
							<span
								aria-hidden
								className={cn(
									"h-1 w-1 rounded-full bg-current",
									categoryColor[category],
								)}
							/>
							{f}
						</li>
					))}
				</ul>

				{/* CTA */}
				<div
					className={cn(
						"mt-6 inline-flex items-center gap-1.5 text-sm font-medium",
						"transition-transform duration-200 ease-out-expo group-hover:translate-x-1",
						categoryColor[category],
					)}
				>
					Explore {name}
					<MoveRight className="size-3.5" />
				</div>
			</Link>
		</motion.div>
	);
}

/* ---------- Mini product previews ---------- */

function ASLPreview() {
	return (
		<div className="flex h-full items-center justify-center gap-2 p-3">
			{["Hello", "Help", "Thanks"].map((word, i) => (
				<motion.span
					key={word}
					className="rounded-md border border-asl/30 bg-asl/10 px-2.5 py-1 font-mono text-xs text-asl"
					initial={{ opacity: 0, y: 6 }}
					animate={{ opacity: [0, 1, 1, 0], y: 0 }}
					transition={{
						duration: 3,
						delay: i * 0.8,
						repeat: Infinity,
						repeatDelay: 0.6,
						times: [0, 0.2, 0.7, 1],
					}}
				>
					{word}
				</motion.span>
			))}
		</div>
	);
}

function AudioNavPreview() {
	return (
		<div className="flex h-full items-end justify-center gap-1.5 p-4 text-audionav">
			{[0.4, 0.7, 1, 0.6, 0.8, 0.5].map((h, i) => (
				<motion.span
					key={i}
					className="block w-1.5 rounded-full bg-current"
					initial={{ height: `${h * 40}%` }}
					animate={{
						height: [`${h * 40}%`, `${(1.1 - h) * 60 + 10}%`, `${h * 40}%`],
					}}
					transition={{
						duration: 1.4,
						delay: i * 0.1,
						repeat: Infinity,
						ease: "easeInOut",
					}}
					style={{ minHeight: 6 }}
				/>
			))}
		</div>
	);
}

function CabsPreview() {
	return (
		<div className="relative h-full overflow-hidden p-3">
			{/* Stylized map grid */}
			<div
				className="absolute inset-0 opacity-30"
				style={{
					backgroundImage:
						"linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
					backgroundSize: "16px 16px",
				}}
			/>
			{/* Route line */}
			<svg viewBox="0 0 200 80" className="absolute inset-0 h-full w-full">
				<motion.path
					d="M 10 60 Q 60 10, 120 40 T 190 30"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					className="text-cabs"
					strokeDasharray="220"
					initial={{ strokeDashoffset: 220 }}
					animate={{ strokeDashoffset: 0 }}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
						repeatType: "reverse",
					}}
				/>
				<motion.circle
					r="4"
					fill="currentColor"
					className="text-cabs"
					initial={{ cx: 10, cy: 60 }}
					animate={{ cx: [10, 190], cy: [60, 30] }}
					transition={{
						duration: 2,
						repeat: Infinity,
						ease: "easeInOut",
						repeatType: "reverse",
					}}
				/>
			</svg>
		</div>
	);
}

function WheelchairPreview() {
	return (
		<div className="relative h-full overflow-hidden p-3">
			<div
				className="absolute inset-0 opacity-20"
				style={{
					backgroundImage:
						"linear-gradient(to right, hsl(var(--border)) 1px, transparent 1px), linear-gradient(to bottom, hsl(var(--border)) 1px, transparent 1px)",
					backgroundSize: "20px 20px",
				}}
			/>
			<svg viewBox="0 0 200 80" className="absolute inset-0 h-full w-full">
				{/* Route */}
				<motion.path
					d="M 10 60 L 60 60 L 60 20 L 130 20 L 130 50 L 190 50"
					fill="none"
					stroke="currentColor"
					strokeWidth="2"
					strokeLinecap="round"
					strokeLinejoin="round"
					className="text-wheelchair"
					strokeDasharray="300"
					initial={{ strokeDashoffset: 300 }}
					animate={{ strokeDashoffset: 0 }}
					transition={{
						duration: 2.5,
						repeat: Infinity,
						ease: "easeInOut",
						repeatType: "reverse",
					}}
				/>
				{/* Accessibility nodes */}
				{[
					[60, 60],
					[60, 20],
					[130, 20],
					[130, 50],
				].map(([cx, cy], i) => (
					<motion.circle
						key={i}
						cx={cx}
						cy={cy}
						r="3"
						fill="currentColor"
						className="text-wheelchair"
						initial={{ opacity: 0, scale: 0 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{
							duration: 0.4,
							delay: 0.2 + i * 0.2,
							repeat: Infinity,
							repeatDelay: 2,
							repeatType: "reverse",
						}}
					/>
				))}
				{/* Wheelchair pictogram at start */}
				<g
					transform="translate(2,52)"
					className="text-wheelchair"
					fill="currentColor"
				>
					<circle cx="6" cy="2" r="1.6" />
					<path
						d="M6 4v5h5l1.5 4.5"
						stroke="currentColor"
						strokeWidth="1.4"
						fill="none"
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<circle
						cx="6"
						cy="14"
						r="3.5"
						stroke="currentColor"
						strokeWidth="1.2"
						fill="none"
					/>
				</g>
			</svg>
		</div>
	);
}
