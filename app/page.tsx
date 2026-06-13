import { Hero } from "@/components/hero";
import { Ecosystem } from "@/components/ecosystem";
import { Testimonials } from "@/components/testimonials";
import { Pricing } from "@/components/pricing";

/**
 * Eyelink landing page.
 *
 * Header and Footer are mounted in `app/layout.tsx` so they appear on every
 * page. The page itself is a tight sequence:
 *
 *   1. Hero            — pitch + 2×2 product grid
 *   2. Ecosystem       — 2×2 detailed product showcase with live previews
 *   3. Testimonials    — CSS marquee, two rows, hover-paused
 *   4. Pricing         — three honest tiers
 *
 * Section order is deliberate: each section earns the next one.
 */
export default function Home() {
	return (
		<main>
			<Hero />
			<Ecosystem />
			<Testimonials />
			<Pricing />
		</main>
	);
}
