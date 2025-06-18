
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			fontSize: {
                'responsive-xs': ['0.75rem', { lineHeight: '1rem' }],
                'responsive-sm': ['0.875rem', { lineHeight: '1.25rem' }],
                'responsive-base': ['1rem', { lineHeight: '1.5rem' }],
                'responsive-lg': ['1.125rem', { lineHeight: '1.75rem' }],
                'responsive-xl': ['1.25rem', { lineHeight: '1.75rem' }],
                'responsive-2xl': ['1.5rem', { lineHeight: '2rem' }],
                'responsive-3xl': ['1.875rem', { lineHeight: '2.25rem' }],
                'responsive-4xl': ['2.25rem', { lineHeight: '2.5rem' }],
            },
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
				sidebar: {
					DEFAULT: "hsl(var(--sidebar-background))",
					foreground: "hsl(var(--sidebar-foreground))",
					primary: "hsl(var(--sidebar-primary))",
					"primary-foreground": "hsl(var(--sidebar-primary-foreground))",
					accent: "hsl(var(--sidebar-accent))",
					"accent-foreground": "hsl(var(--sidebar-accent-foreground))",
					border: "hsl(var(--sidebar-border))",
					ring: "hsl(var(--sidebar-ring))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
			fontFamily: {
				sans: ["Inter", "sans-serif"],
				display: ["Playfair Display", "serif"],
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
				"fade-in": {
					"0%": { opacity: "0", transform: "translateY(10px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"fade-in-up": {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"slide-up": {
					"0%": { opacity: "0", transform: "translateY(20px)" },
					"100%": { opacity: "1", transform: "translateY(0)" },
				},
				"slide-in-right": {
					"0%": { transform: "translateX(100%)" },
					"100%": { transform: "translateX(0)" },
				},
				"scale-in": {
					"0%": { opacity: "0", transform: "scale(0.95)" },
					"100%": { opacity: "1", transform: "scale(1)" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
				"fade-in": "fade-in 0.5s ease-out",
				"fade-in-up": "fade-in-up 0.6s ease-out",
				"slide-up": "slide-up 0.5s ease-out",
				"slide-in-right": "slide-in-right 0.3s ease-out",
				"scale-in": "scale-in 0.2s ease-out",
			},
			spacing: {
				'18': '4.5rem',
				'22': '5.5rem',
			},
		},
	},
	plugins: [
		require("tailwindcss-animate"),
		function({ addUtilities }: any) {
			const newUtilities = {
				'.container-responsive': {
					'@apply max-w-7xl mx-auto px-4 sm:px-6 lg:px-8': {},
				},
				'.page-padding': {
					'@apply px-4 sm:px-6 lg:px-8 py-6': {},
				},
				'.focus-ring': {
					'@apply focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background': {},
				},
				'.glass-effect': {
					'@apply bg-background/80 backdrop-blur-md border border-border/50': {},
				},
				'.glass-effect-strong': {
					'@apply bg-background/90 backdrop-blur-lg border border-border/60': {},
				},
				'.management-card': {
					'@apply bg-card/50 backdrop-blur-sm border border-border/30 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300': {},
				},
				'.status-badge-base': {
					'@apply inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium transition-colors': {},
				},
				'.btn-luxury': {
					'@apply bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-black font-semibold shadow-lg hover:shadow-xl transition-all duration-300': {},
				},
			}
			addUtilities(newUtilities)
		}
	],
} satisfies Config;
