"use client";

import { motion, useReducedMotion } from "framer-motion";
import { MoveRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { ProductTile } from "@/components/product-tile";

/**
 * Hero — "One platform. Every accessibility need."
 *
 * Composition:
 *   Eyebrow → Headline → Subhead → CTA pair → 2×2 product grid
 *
 * Motion: staggered text reveal (60-80ms), ease-out-expo, 600ms. The 2×2 grid
 * fades up after the headline lands so the eye reads top-down.
 */
export function Hero() {
	const reduceMotion = useReducedMotion();

	const ease = [0.16, 1, 0.3, 1] as const;
	const stagger = {
		hidden: {},
		show: {
			transition: {
				staggerChildren: reduceMotion ? 0 : 0.08,
				delayChildren: 0.05,
			},
		},
	};
	const item = {
		hidden: { opacity: 0, y: 12 },
		show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
	};

	return (
		<section className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28">
			{/* Background: subtle radial brand wash + grain, no aurora blobs */}
			<div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
				<div
					className="absolute inset-0"
					style={{
						background:
							"radial-gradient(ellipse 80% 50% at 50% -10%, hsl(var(--signal) / 0.08), transparent 60%), radial-gradient(ellipse 60% 40% at 100% 50%, hsl(var(--audionav) / 0.05), transparent 60%)",
					}}
				/>
				<div className="absolute inset-0 vignette-bottom" />
			</div>

			<div className="eyelink-container">
				<motion.div
					variants={stagger}
					initial="hidden"
					animate="show"
					className="mx-auto max-w-3xl text-center"
				>
					{/* Eyebrow */}
					<motion.div variants={item}>
						<span
							className={cn(
								"inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-surface-raised/50 px-3 py-1",
								"text-xs font-medium text-muted-foreground",
							)}
						>
							<span className="relative flex h-1.5 w-1.5">
								<span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-signal opacity-60" />
								<span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-signal" />
							</span>
							For people with hearing, visual, and mobility needs
						</span>
					</motion.div>

					{/* Headline */}
					<motion.h1
						variants={item}
						className="mt-6 font-display text-display-2xl text-foreground"
					>
						One platform.
						<br />
						<span className="text-muted-foreground">
							Every accessibility need.
						</span>
					</motion.h1>

					{/* Subhead */}
					<motion.p
						variants={item}
						className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg"
					>
						Eyelink unifies ASL translation, audio navigation, accessible rides,
						and wheelchair-friendly routes — so independence doesn't mean
						juggling five apps.
					</motion.p>

					{/* CTAs */}
					<motion.div
						variants={item}
						className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-3"
					>
						<Link
							href="/asl"
							className={cn(
								"press group inline-flex h-11 items-center justify-center gap-2 rounded-md bg-foreground px-6 text-sm font-medium text-background",
								"transition-colors duration-200 hover:bg-foreground/90",
							)}
						>
							Try the ASL demo
							<MoveRight className="size-4 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5" />
						</Link>
						<Link
							href="#how-it-works"
							className={cn(
								"press group inline-flex h-11 items-center justify-center gap-2 rounded-md border border-border/70 bg-background/30 px-6 text-sm font-medium text-foreground",
								"backdrop-blur-sm transition-colors duration-200 hover:bg-accent hover:border-border",
							)}
						>
							See how it works
						</Link>
					</motion.div>

					{/* Quiet social proof line */}
					<motion.p
						variants={item}
						className="mt-6 text-xs text-muted-foreground/70"
					>
						Tested on a college campus. Surveyed 150+ users. Free to start.
					</motion.p>
				</motion.div>

				{/* 2×2 product grid — the "one platform, four facets" idea */}
				<motion.div
					variants={stagger}
					initial="hidden"
					animate="show"
					className="mx-auto mt-20 grid max-w-5xl grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4"
				>
					<motion.div variants={item}>
						<ProductTile
							href="/asl"
							name="ASL Translator"
							description="Real-time sign language to text and speech."
							category="asl"
							ctaLabel="Translate"
						/>
					</motion.div>
					<motion.div variants={item}>
						<ProductTile
							href="/audioNav"
							name="Audio Navigation"
							description="Hear your surroundings, walk with confidence."
							category="audionav"
							ctaLabel="Listen"
						/>
					</motion.div>
					<motion.div variants={item}>
						<ProductTile
							href="/cabs"
							name="Book Assistant"
							description="Accessible rides and on-demand travel help."
							category="cabs"
							ctaLabel="Book"
						/>
					</motion.div>
					<motion.div variants={item}>
						<ProductTile
							href="/wheelchair"
							name="Wheelchair Routes"
							description="Routes that actually work for your wheels."
							category="wheelchair"
							ctaLabel="Explore"
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}
