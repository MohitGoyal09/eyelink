"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, MoveRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ThemeToggle } from "@/components/theme-toggle";
import { usePathname } from "next/navigation";
import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

type NavItem = {
	title: string;
	href: string;
	description?: string;
};

const products: NavItem[] = [
	{
		title: "ASL Translator",
		href: "/asl",
		description: "Sign language to text and speech, in real time.",
	},
	{
		title: "Audio Navigation",
		href: "/audioNav",
		description: "Hear your surroundings, walk with confidence.",
	},
	{
		title: "Book Assistant",
		href: "/cabs",
		description: "Accessible rides and on-demand travel help.",
	},
	{
		title: "Wheelchair Routes",
		href: "/wheelchair",
		description: "Routes that actually work for your wheels.",
	},
];

const secondary: NavItem[] = [
	{ title: "Pricing", href: "/pricing" },
	{ title: "FAQ", href: "/faq" },
	{ title: "About", href: "/about" },
	{ title: "Contact", href: "/contact" },
];

export default function Header() {
	const [isOpen, setIsOpen] = useState(false);
	const [scrolled, setScrolled] = useState(false);
	const pathname = usePathname();

	// Track scroll for backdrop-blur transition (per Emil: small detail that compounds)
	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 8);
		onScroll();
		window.addEventListener("scroll", onScroll, { passive: true });
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	// Close mobile menu on route change
	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	return (
		<header
			className={cn(
				"fixed top-0 left-0 right-0 z-50",
				"border-b transition-[background-color,backdrop-filter,border-color] duration-300 ease-out-expo",
				scrolled
					? "border-border/60 bg-background/75 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
					: "border-transparent bg-transparent",
			)}
		>
			<div className="eyelink-container">
				<nav className="flex h-16 items-center justify-between">
					<Link href="/" className="press" aria-label="Eyelink home">
						<Logo size="md" />
					</Link>

					{/* Desktop nav */}
					<div className="hidden lg:flex lg:items-center lg:gap-1">
						<NavigationMenu>
							<NavigationMenuList>
								{products.map((item) => {
									const active = pathname === item.href;
									return (
										<NavigationMenuItem key={item.title}>
											<NavigationMenuLink asChild>
												<Link
													href={item.href}
													className={cn(
														"group relative inline-flex h-10 items-center px-3 text-sm font-medium",
														"text-muted-foreground transition-colors duration-200",
														"hover:text-foreground",
														"focus-visible:text-foreground",
														active && "text-foreground",
													)}
												>
													{item.title}
													{/* Underline that grows from center on hover/active */}
													<span
														className={cn(
															"pointer-events-none absolute inset-x-3 -bottom-px h-px",
															"origin-center scale-x-0 bg-foreground/80",
															"transition-transform duration-300 ease-out-expo",
															"group-hover:scale-x-100",
															active && "scale-x-100",
														)}
													/>
												</Link>
											</NavigationMenuLink>
										</NavigationMenuItem>
									);
								})}

								<NavigationMenuItem>
									<NavigationMenuTrigger className="text-muted-foreground hover:text-foreground">
										More
									</NavigationMenuTrigger>
									<NavigationMenuContent>
										<ul className="grid w-[320px] gap-1 p-3">
											{secondary.map((item) => (
												<li key={item.title}>
													<NavigationMenuLink asChild>
														<Link
															href={item.href}
															className="block select-none rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
														>
															<div className="text-sm font-medium leading-none">
																{item.title}
															</div>
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</NavigationMenuContent>
								</NavigationMenuItem>
							</NavigationMenuList>
						</NavigationMenu>
					</div>

					<div className="hidden items-center gap-2 lg:flex">
						<ThemeToggle />
						<Link
							href="/sign-in"
							className={cn(
								buttonVariants({ variant: "ghost", size: "sm" }),
								"text-muted-foreground hover:text-foreground",
							)}
						>
							Sign in
						</Link>
						<Button size="sm" className="press group gap-1.5" asChild>
							<Link href="/asl">
								Try the demo
								<MoveRight className="size-3.5 transition-transform duration-200 ease-out-expo group-hover:translate-x-0.5" />
							</Link>
						</Button>
					</div>

					{/* Mobile nav trigger */}
					<div className="flex items-center gap-2 lg:hidden">
						<ThemeToggle />
						<button
							type="button"
							onClick={() => setIsOpen(!isOpen)}
							className="press inline-flex h-10 w-10 items-center justify-center rounded-md text-foreground/80 hover:bg-accent hover:text-foreground"
							aria-label={isOpen ? "Close menu" : "Open menu"}
							aria-expanded={isOpen}
						>
							{isOpen ? (
								<X className="h-5 w-5" />
							) : (
								<Menu className="h-5 w-5" />
							)}
						</button>
					</div>
				</nav>

				{/* Mobile menu */}
				{isOpen && (
					<div className="border-t border-border/40 py-4 lg:hidden">
						<div className="space-y-1">
							<p className="px-3 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
								Products
							</p>
							{products.map((item) => (
								<Link
									key={item.title}
									href={item.href}
									className="block rounded-md px-3 py-2.5 text-base font-medium text-foreground/90 hover:bg-accent hover:text-foreground"
									onClick={() => setIsOpen(false)}
								>
									{item.title}
								</Link>
							))}

							<p className="px-3 pb-2 pt-4 text-xs font-medium uppercase tracking-wider text-muted-foreground/70">
								More
							</p>
							{secondary.map((item) => (
								<Link
									key={item.title}
									href={item.href}
									className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
									onClick={() => setIsOpen(false)}
								>
									{item.title}
								</Link>
							))}

							<div className="mt-4 flex flex-col gap-2 border-t border-border/40 pt-4">
								<Link
									href="/sign-in"
									className="rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-foreground"
									onClick={() => setIsOpen(false)}
								>
									Sign in
								</Link>
								<Link
									href="/asl"
									className={buttonVariants({ size: "default" }) + " w-full"}
									onClick={() => setIsOpen(false)}
								>
									Try the demo
									<MoveRight className="ml-2 size-4" />
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</header>
	);
}
