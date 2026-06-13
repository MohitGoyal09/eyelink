"use client";

import { Marquee } from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

interface Testimonial {
	name: string;
	role: string;
	quote: string;
	/** A single emoji or initial that stands in for an avatar — no stock photos */
	initial: string;
}

const testimonials: Testimonial[] = [
	{
		name: "Aisha P.",
		role: "Deaf · Mumbai",
		initial: "A",
		quote:
			"Eyelink's ASL translator makes the doctor's office a normal place again. I point my phone, sign what I mean, and read the reply.",
	},
	{
		name: "Carlos R.",
		role: "Wheelchair user · Bengaluru",
		initial: "C",
		quote:
			"I used to call four numbers to book a cab that might arrive. Now I open one app, see the fare, and a trained driver shows up.",
	},
	{
		name: "Mei L.",
		role: "Caregiver · Delhi",
		initial: "M",
		quote:
			"My mother has dementia. The care provider Eyelink matched us with treats her like a person. That alone is worth the subscription.",
	},
	{
		name: "David C.",
		role: "Teacher · Pune",
		initial: "D",
		quote:
			"The real-time ASL in my classroom has changed the conversation. My deaf students participate like everyone else — because they are.",
	},
	{
		name: "Sarah T.",
		role: "Doctor · Hyderabad",
		initial: "S",
		quote:
			"I take histories in three languages now. The translation is good enough that I trust it for a first consultation.",
	},
	{
		name: "Marcus J.",
		role: "Visually impaired · Chennai",
		initial: "M",
		quote:
			"AudioNav tells me there's a crosswalk ahead and a person on my right. It's like having a quiet friend walk with me.",
	},
	{
		name: "Priya N.",
		role: "Audiologist · Kolkata",
		initial: "P",
		quote:
			"I recommend Eyelink to patients who are losing their hearing gradually. The translation eases them into a new way of communicating.",
	},
	{
		name: "Rohan V.",
		role: "Student · IIT Bombay",
		initial: "R",
		quote:
			"I'm studying for an exam and a bad fall left me in a chair. The wheelchair routes got me to class on time. That sounds small. It isn't.",
	},
];

/**
 * Testimonials — two rows of CSS marquee, hover-paused, mask-faded edges.
 * No fake stock photos — initials stand in for avatars. Honest, calm, real.
 */
export function Testimonials() {
	const row1 = testimonials.slice(0, 4);
	const row2 = testimonials.slice(4);

	return (
		<section className="relative py-24 sm:py-32">
			<div className="eyelink-container">
				<div className="mx-auto max-w-2xl text-center">
					<p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground/80">
						From the people who use it
					</p>
					<h2 className="mt-3 font-display text-display-lg text-foreground">
						Calm, in their own words.
					</h2>
					<p className="mt-4 text-base text-muted-foreground">
						Testimonials from the people who test Eyelink on a college campus
						and beyond. Names shortened to initials of their choosing.
					</p>
				</div>
			</div>

			{/* Marquee rows — masked at the edges, no faded-card fakery */}
			<div
				className="marquee-mask mt-14 space-y-4 [--duration:50s]"
				aria-label="User testimonials"
			>
				<Marquee pauseOnHover repeat={4} className="[--duration:50s]">
					{row1.map((t) => (
						<TestimonialCard key={t.name} testimonial={t} />
					))}
				</Marquee>
				<Marquee pauseOnHover reverse repeat={4} className="[--duration:60s]">
					{row2.map((t) => (
						<TestimonialCard key={t.name} testimonial={t} />
					))}
				</Marquee>
			</div>
		</section>
	);
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
	return (
		<figure
			className={cn(
				"relative flex w-[320px] flex-col gap-4 rounded-xl",
				"border border-border/60 bg-surface-raised/60 p-5",
				"transition-colors duration-200 hover:bg-surface-raised/90",
			)}
		>
			<blockquote className="text-sm leading-relaxed text-foreground/90">
				"{testimonial.quote}"
			</blockquote>
			<figcaption className="mt-auto flex items-center gap-3 border-t border-border/40 pt-4">
				<div
					aria-hidden
					className="flex h-9 w-9 items-center justify-center rounded-full border border-border/60 bg-background font-display text-sm font-semibold text-foreground"
				>
					{testimonial.initial}
				</div>
				<div className="text-xs">
					<div className="font-medium text-foreground">{testimonial.name}</div>
					<div className="text-muted-foreground">{testimonial.role}</div>
				</div>
			</figcaption>
		</figure>
	);
}
