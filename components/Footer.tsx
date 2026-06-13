import Link from "next/link";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

const products = [
	{ name: "ASL Translator", href: "/asl" },
	{ name: "Audio Navigation", href: "/audioNav" },
	{ name: "Book Assistant", href: "/cabs" },
	{ name: "Wheelchair Routes", href: "/wheelchair" },
];

const company = [
	{ name: "About", href: "/about" },
	{ name: "Contact", href: "/contact" },
	{ name: "Careers", href: "/careers" },
	{ name: "Press", href: "/press" },
];

const resources = [
	{ name: "Pricing", href: "/pricing" },
	{ name: "FAQ", href: "/faq" },
	{ name: "Accessibility statement", href: "/accessibility" },
	{ name: "Research", href: "/research" },
];

const legal = [
	{ name: "Privacy", href: "/privacy" },
	{ name: "Terms", href: "/terms" },
	{ name: "Cookies", href: "/cookies" },
];

/**
 * Footer — four columns + bottom bar, dark, calm, with the Eyelink voice.
 * No blue/purple gradient logo, no stock social icon blob.
 */
export default function Footer() {
	return (
		<footer className="relative mt-24 border-t border-border/40">
			<div className="eyelink-container py-16">
				<div className="grid grid-cols-2 gap-10 md:grid-cols-5">
					{/* Brand column — spans 2 on md */}
					<div className="col-span-2 md:col-span-2">
						<Link href="/" className="inline-flex">
							<Logo size="md" />
						</Link>
						<p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
							One platform for the people who don't have time to juggle five
							apps. Made for hearing, visual, and mobility independence.
						</p>

						{/* Social — text links, no gradient icons */}
						<div className="mt-6 flex items-center gap-4 text-sm">
							<FooterSocialLink
								href="https://twitter.com"
								label="X (Twitter)"
							/>
							<FooterSocialLink href="https://linkedin.com" label="LinkedIn" />
							<FooterSocialLink href="https://github.com" label="GitHub" />
						</div>
					</div>

					{/* Products */}
					<FooterColumn title="Products" links={products} />

					{/* Company */}
					<FooterColumn title="Company" links={company} />

					{/* Resources */}
					<FooterColumn title="Resources" links={resources} />
				</div>

				{/* Bottom bar */}
				<div className="mt-16 flex flex-col items-start justify-between gap-4 border-t border-border/40 pt-8 md:flex-row md:items-center">
					<p className="text-xs text-muted-foreground">
						© {new Date().getFullYear()} Eyelink. Made for independence.
					</p>
					<ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
						{legal.map((l) => (
							<li key={l.href}>
								<Link
									href={l.href}
									className="text-xs text-muted-foreground transition-colors duration-200 hover:text-foreground"
								>
									{l.name}
								</Link>
							</li>
						))}
					</ul>
				</div>
			</div>
		</footer>
	);
}

function FooterColumn({
	title,
	links,
}: {
	title: string;
	links: { name: string; href: string }[];
}) {
	return (
		<div>
			<h3 className="text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
				{title}
			</h3>
			<ul className="mt-4 space-y-2.5">
				{links.map((l) => (
					<li key={l.href}>
						<Link
							href={l.href}
							className={cn(
								"text-sm text-foreground/80 transition-colors duration-200",
								"hover:text-foreground",
							)}
						>
							{l.name}
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}

function FooterSocialLink({ href, label }: { href: string; label: string }) {
	return (
		<Link
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			aria-label={label}
			className={cn(
				"text-muted-foreground transition-colors duration-200 hover:text-foreground",
			)}
		>
			<span className="text-sm underline-offset-4 hover:underline">
				{label}
			</span>
		</Link>
	);
}
