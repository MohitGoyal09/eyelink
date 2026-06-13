"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Plan {
	name: string;
	price: { monthly: number; annual: number };
	period: string;
	description: string;
	features: string[];
	cta: { label: string; href: string };
	highlighted?: boolean;
	badge?: string;
}

const plans: Plan[] = [
	{
		name: "Basic",
		price: { monthly: 0, annual: 0 },
		period: "Free",
		description: "Get started with one product, no credit card required.",
		features: [
			"ASL Translator with 50 daily translations",
			"Web access on any device",
			"Community support",
		],
		cta: { label: "Start free", href: "/sign-up" },
	},
	{
		name: "Pro",
		price: { monthly: 299, annual: 239 },
		period: "/month",
		description: "All four products, unlimited. For daily independence.",
		features: [
			"Unlimited ASL translation",
			"Audio Navigation (scene + obstacles)",
			"Book Assistant ride booking",
			"Wheelchair-friendly routes",
			"Mobile + desktop apps",
			"Priority email support",
		],
		cta: { label: "Start 14-day trial", href: "/sign-up-pro" },
		highlighted: true,
		badge: "Most chosen",
	},
	{
		name: "Care",
		price: { monthly: 999, annual: 799 },
		period: "/month",
		description: "Pro, plus on-demand travel assistants and care coordination.",
		features: [
			"Everything in Pro",
			"On-demand travel assistants",
			"Care provider matching",
			"Family member dashboard",
			"Dedicated support line",
			"Quarterly accessibility review",
		],
		cta: { label: "Talk to our team", href: "/contact" },
	},
];

/**
 * Pricing — three honest tiers, no fake "save 20%" with confetti theater.
 * The middle tier is highlighted because it's the one most users need.
 */
export function Pricing() {
	return (
		<section id="pricing" className="relative py-24 sm:py-32">
			<div className="eyelink-container">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
						Pricing
					</p>
					<h2 className="mt-3 font-display text-display-lg text-foreground">
						Three plans. No surprise charges.
					</h2>
					<p className="mt-4 text-base text-muted-foreground">
						Pay for what you use. Cancel any time. The hardware wearable
						(AudioNav device) will be priced separately when it ships.
					</p>
				</div>

				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={{ once: true, margin: "-80px" }}
					variants={{
						hidden: {},
						show: { transition: { staggerChildren: 0.08 } },
					}}
					className="mx-auto mt-16 grid max-w-5xl grid-cols-1 gap-4 md:grid-cols-3"
				>
					{plans.map((plan) => (
						<PlanCard key={plan.name} plan={plan} />
					))}
				</motion.div>

				{/* Institutional note — keeps the partnership story in the pitch */}
				<p className="mx-auto mt-12 max-w-2xl text-center text-sm text-muted-foreground/80">
					Schools, NGOs, and government programs: Eyelink offers institutional
					licensing with deployment support.{" "}
					<Link
						href="/contact"
						className="text-foreground underline-offset-4 hover:underline"
					>
						Talk to our partnerships team
					</Link>
					.
				</p>
			</div>
		</section>
	);
}

function PlanCard({ plan }: { plan: Plan }) {
	const isFree = plan.price.monthly === 0;

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
			className={cn(
				"relative flex h-full flex-col rounded-2xl border p-7",
				"bg-surface-raised/40 transition-colors duration-200",
				plan.highlighted
					? "border-foreground/20 bg-surface-raised/80 shadow-[0_0_0_1px_hsl(var(--foreground)/0.04)]"
					: "border-border/60 hover:bg-surface-raised/70",
			)}
		>
			{plan.badge && (
				<span className="absolute -top-3 left-7 inline-flex items-center rounded-full border border-foreground/15 bg-foreground px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-background">
					{plan.badge}
				</span>
			)}

			{/* Plan name */}
			<h3 className="font-display text-xl font-semibold text-foreground">
				{plan.name}
			</h3>

			{/* Price */}
			<div className="mt-4 flex items-baseline gap-1.5">
				{isFree ? (
					<span className="font-display text-4xl font-semibold text-foreground">
						Free
					</span>
				) : (
					<>
						<span className="font-display text-4xl font-semibold text-foreground">
							₹{plan.price.monthly}
						</span>
						<span className="text-sm text-muted-foreground">{plan.period}</span>
					</>
				)}
			</div>
			{!isFree && (
				<p className="mt-1 text-xs text-muted-foreground/80">
					or ₹{plan.price.annual}/mo billed annually
				</p>
			)}

			<p className="mt-5 text-sm text-muted-foreground">{plan.description}</p>

			{/* Divider */}
			<div className="my-6 h-px w-full bg-border/60" />

			{/* Features */}
			<ul className="flex-1 space-y-3">
				{plan.features.map((f) => (
					<li
						key={f}
						className="flex items-start gap-2.5 text-sm text-foreground/90"
					>
						<Check
							className={cn(
								"mt-0.5 h-4 w-4 shrink-0",
								plan.highlighted ? "text-foreground" : "text-muted-foreground",
							)}
						/>
						<span>{f}</span>
					</li>
				))}
			</ul>

			{/* CTA */}
			<Link
				href={plan.cta.href}
				className={cn(
					"press mt-8 inline-flex h-11 w-full items-center justify-center rounded-md text-sm font-medium",
					"transition-colors duration-200",
					plan.highlighted
						? "bg-foreground text-background hover:bg-foreground/90"
						: "border border-border/70 bg-background/30 text-foreground hover:bg-accent hover:border-border",
				)}
			>
				{plan.cta.label}
			</Link>
		</motion.div>
	);
}
