export const site = {
	fullName: "Brandon Kibochi Njenga",
	brand: "Kibochi",
	brandMark: "KIBOCHI",
	positioning: "IT Professional | Aspiring Software Developer | Technology Enthusiast",
	email: "the.sirfire@gmail.com",
	location: "Kenya",
	description:
		"Portfolio of Brandon Kibochi Njenga — IT professional building practical foundations in software development.",
} as const;

export const social = {
	github: {
		label: "GitHub",
		href: "https://github.com/sirfireprojects",
		handle: "sirfireprojects",
	},
	linkedin: {
		label: "LinkedIn",
		href: "https://www.linkedin.com/in/brandon-njenga-13a88a1a0/",
		handle: "Brandon Njenga",
	},
	email: {
		label: "Email",
		href: "mailto:the.sirfire@gmail.com",
		handle: "the.sirfire@gmail.com",
	},
} as const;

export const navItems = [
	{ label: "About", href: "#about" },
	{ label: "Capabilities", href: "#capabilities" },
	{ label: "Projects", href: "#projects" },
	{ label: "Exploring", href: "#exploring" },
	{ label: "Contact", href: "#contact" },
] as const;

export const exploring = [
	"Modern frontend development",
	"TypeScript",
	"Astro and modern web architecture",
	"Software engineering practices",
	"AI-assisted development workflows",
] as const;
