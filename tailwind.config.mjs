/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				background: "var(--background)",
				foreground: "var(--foreground)",
			},
			fontSize: {
				display: "clamp(2.5rem, 5vw, 4rem)",
				h1: "clamp(2rem, 4vw, 3.5rem)",
				h2: "clamp(1.75rem, 3vw, 2.5rem)",
				h3: "clamp(1.5rem, 2.5vw, 2rem)",
				h4: "clamp(1.25rem, 2vw, 1.75rem)",
				bodyLg: "clamp(1.125rem, 1.5vw, 1.25rem)",
				bodyMd: "clamp(1rem, 1.25vw, 1.125rem)",
				body: "clamp(1rem, 1.25vw, 1.125rem)",
				bodySm: "clamp(0.875rem, 1vw, 1rem)",
				bodyXs: "clamp(0.75rem, 0.875vw, 0.875rem)",
				"display-hero": "clamp(2.5rem, 6vw, 5rem)",
				banner: "clamp(0.75rem, 1vw, 0.875rem)",
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
};
