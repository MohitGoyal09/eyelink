import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		container: {
			center: true,
			padding: "1.5rem",
			screens: {
				"2xl": "1280px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},
				// Eyelink product category colors
				asl: "hsl(var(--asl))",
				audionav: "hsl(var(--audionav))",
				cabs: "hsl(var(--cabs))",
				wheelchair: "hsl(var(--wheelchair))",
				// Signal accent
				signal: "hsl(var(--signal))",
				// Surfaces (used for layered backgrounds in dark mode)
				surface: {
					DEFAULT: "hsl(var(--surface))",
					raised: "hsl(var(--surface-raised))",
					sunken: "hsl(var(--surface-sunken))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 4px)",
				sm: "calc(var(--radius) - 8px)",
				xl: "calc(var(--radius) + 4px)",
				"2xl": "calc(var(--radius) + 8px)",
			},
			fontFamily: {
				display: ["var(--font-display)", "ui-sans-serif", "system-ui"],
				body: ["var(--font-body)", "ui-sans-serif", "system-ui"],
				mono: ["var(--font-mono)", "ui-monospace", "monospace"],
			},
			fontSize: {
				"display-2xl": [
					"clamp(3rem, 6vw + 1rem, 5.5rem)",
					{ lineHeight: "0.95", letterSpacing: "-0.035em", fontWeight: "600" },
				],
				"display-xl": [
					"clamp(2.5rem, 4.5vw + 1rem, 4rem)",
					{ lineHeight: "1", letterSpacing: "-0.03em", fontWeight: "600" },
				],
				"display-lg": [
					"clamp(2rem, 3vw + 1rem, 3rem)",
					{ lineHeight: "1.1", letterSpacing: "-0.025em", fontWeight: "600" },
				],
				"display-md": [
					"clamp(1.5rem, 1.5vw + 1rem, 2rem)",
					{ lineHeight: "1.2", letterSpacing: "-0.02em", fontWeight: "600" },
				],
				"display-sm": [
					"1.25rem",
					{ lineHeight: "1.3", letterSpacing: "-0.015em", fontWeight: "600" },
				],
			},
			spacing: {
				"4.5": "1.125rem",
				"5.5": "1.375rem",
				"15": "3.75rem",
				"18": "4.5rem",
				"22": "5.5rem",
				"30": "7.5rem",
				"34": "8.5rem",
			},
			keyframes: {
				"fade-in": {
					from: { opacity: "0" },
					to: { opacity: "1" },
				},
				"fade-up": {
					from: { opacity: "0", transform: "translateY(8px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"fade-down": {
					from: { opacity: "0", transform: "translateY(-8px)" },
					to: { opacity: "1", transform: "translateY(0)" },
				},
				"pulse-signal": {
					"0%, 100%": { opacity: "0.4", transform: "scale(1)" },
					"50%": { opacity: "0.8", transform: "scale(1.05)" },
				},
				"sound-wave": {
					"0%, 100%": { transform: "scaleY(0.4)" },
					"50%": { transform: "scaleY(1)" },
				},
				marquee: {
					from: { transform: "translateX(0)" },
					to: { transform: "translateX(calc(-50% - var(--gap, 1rem)))" },
				},
				"marquee-reverse": {
					from: { transform: "translateX(calc(-50% - var(--gap, 1rem)))" },
					to: { transform: "translateX(0)" },
				},
				"draw-line": {
					from: { strokeDashoffset: "100%" },
					to: { strokeDashoffset: "0" },
				},
				"iris-blink": {
					"0%, 92%, 100%": { transform: "scaleY(1)" },
					"95%": { transform: "scaleY(0.05)" },
				},
				shimmer: {
					from: { backgroundPosition: "-200% 0" },
					to: { backgroundPosition: "200% 0" },
				},
			},
			animation: {
				"fade-in": "fade-in 400ms cubic-bezier(0.16, 1, 0.3, 1) both",
				"fade-up": "fade-up 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
				"fade-down": "fade-down 600ms cubic-bezier(0.16, 1, 0.3, 1) both",
				"pulse-signal": "pulse-signal 3s ease-in-out infinite",
				"sound-wave": "sound-wave 1.4s ease-in-out infinite",
				marquee: "marquee var(--marquee-duration, 40s) linear infinite",
				"marquee-reverse":
					"marquee-reverse var(--marquee-duration, 40s) linear infinite",
				"draw-line": "draw-line 1.2s cubic-bezier(0.65, 0, 0.35, 1) forwards",
				"iris-blink": "iris-blink 6s ease-in-out infinite",
				shimmer: "shimmer 3s linear infinite",
			},
			transitionTimingFunction: {
				"out-expo": "cubic-bezier(0.16, 1, 0.3, 1)",
				"in-out-expo": "cubic-bezier(0.87, 0, 0.13, 1)",
				"out-quart": "cubic-bezier(0.25, 1, 0.5, 1)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
