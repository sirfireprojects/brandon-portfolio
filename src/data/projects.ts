export type ProjectStatus = "active" | "learning" | "legacy";
export type ProjectPreview = "lab" | "cart" | "profile" | "chain";

export interface ProjectImages {
	desktop: string;
	desktopAlt: string;
	desktopWidth: number;
	desktopHeight: number;
	mobile?: string;
	mobileAlt?: string;
	mobileWidth?: number;
	mobileHeight?: number;
}

export interface Project {
	id: string;
	title: string;
	description: string;
	technologies: string[];
	status: ProjectStatus;
	statusLabel: string;
	preview: ProjectPreview;
	images?: ProjectImages;
	features?: string[];
	githubUrl?: string;
	liveUrl?: string;
	featured?: boolean;
}

const asset = (path: string) => {
	const base = import.meta.env.BASE_URL.endsWith("/")
		? import.meta.env.BASE_URL
		: `${import.meta.env.BASE_URL}/`;
	return `${base}${path.replace(/^\//, "")}`;
};

export const projects: Project[] = [
	{
		id: "shopping-cart-v2",
		title: "Shopping Cart V2",
		description:
			"A responsive, client-side shopping cart application built to demonstrate practical frontend development skills and modern JavaScript application logic. This is a frontend demonstration — it does not include a backend, real inventory integration, user authentication or payment processing.",
		technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Browser LocalStorage"],
		status: "active",
		statusLabel: "Live",
		preview: "cart",
		featured: true,
		liveUrl: "https://kibochi-shopping-cart.netlify.app/",
		githubUrl: "https://github.com/sirfireprojects/learning-lab/tree/main/html-css/shopping-cart",
		images: {
			desktop: asset("images/projects/shopping-cart-desktop.png"),
			desktopAlt:
				"Desktop view of Shopping Cart V2 showing the product catalogue with category filters, search, stock indicators and an open cart sidebar with KES totals",
			desktopWidth: 3072,
			desktopHeight: 1738,
			mobile: asset("images/projects/shopping-cart-mobile.png"),
			mobileAlt:
				"Mobile view of Shopping Cart V2 showing the product catalogue, search field, category filters and add-to-cart controls",
			mobileWidth: 716,
			mobileHeight: 1564,
		},
		features: [
			"Product catalogue with multiple categories",
			"Product search and category filtering",
			"Stock availability indicators",
			"Add and remove products with stock-limited quantity controls",
			"Automatic subtotal and cart total calculations",
			"Persistent cart using LocalStorage",
			"Responsive desktop and mobile layouts",
			"Accessible interaction feedback and controls",
			"Kenyan Shilling (KES) currency formatting",
		],
	},
	{
		id: "learning-lab",
		title: "Learning Lab",
		description:
			"A practical programming learning environment for experiments, exercises and small builds as concepts click into place.",
		technologies: ["JavaScript", "HTML", "CSS"],
		status: "learning",
		statusLabel: "Active learning",
		preview: "lab",
	},
	{
		id: "profile-card",
		title: "Personal Profile Card",
		description:
			"A front-end exploration of layout, typography and component structure — a focused study in visual hierarchy.",
		technologies: ["HTML", "CSS", "Typography"],
		status: "active",
		statusLabel: "Design study",
		preview: "profile",
	},
	{
		id: "landchain",
		title: "LandChain DApp",
		description:
			"An earlier blockchain concept for land registration and ownership transfer, built with Solidity, Truffle and Web3.js. A legacy experiment being revisited — not a production-ready registry.",
		technologies: ["Solidity", "Truffle", "Web3.js"],
		status: "legacy",
		statusLabel: "Legacy · revisiting",
		preview: "chain",
	},
];
