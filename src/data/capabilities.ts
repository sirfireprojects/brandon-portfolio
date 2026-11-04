export type CapabilityLevel = "practiced" | "learning";

export interface CapabilityItem {
	label: string;
	level: CapabilityLevel;
}

export interface CapabilityGroup {
	id: string;
	title: string;
	summary: string;
	items: CapabilityItem[];
}

export const capabilityGroups: CapabilityGroup[] = [
	{
		id: "it-support",
		title: "IT Support & Systems",
		summary: "Hands-on experience keeping people and machines productive.",
		items: [
			{ label: "Hardware and software troubleshooting", level: "practiced" },
			{ label: "Windows and macOS", level: "practiced" },
			{ label: "Networking fundamentals", level: "practiced" },
			{ label: "Technical operations", level: "practiced" },
		],
	},
	{
		id: "web",
		title: "Web Development",
		summary: "Building responsive interfaces and exploring the web stack.",
		items: [
			{ label: "HTML and CSS", level: "practiced" },
			{ label: "JavaScript", level: "practiced" },
			{ label: "Responsive interfaces", level: "practiced" },
			{ label: "WordPress exploration", level: "learning" },
		],
	},
	{
		id: "programming",
		title: "Programming",
		summary: "Practical problem-solving through code, still expanding depth.",
		items: [
			{ label: "JavaScript", level: "practiced" },
			{ label: "Python", level: "learning" },
			{ label: "Practical programming and problem-solving", level: "practiced" },
		],
	},
	{
		id: "tools",
		title: "Tools",
		summary: "Everyday tooling for collaboration, editing and IT work.",
		items: [
			{ label: "Git and GitHub", level: "practiced" },
			{ label: "Cursor", level: "learning" },
			{ label: "VS Code", level: "practiced" },
			{ label: "Microsoft 365 and relevant IT tools", level: "practiced" },
		],
	},
];
