const STORAGE_KEY = "theme";

export type Theme = "light" | "dark";

let mediaQueryBound = false;

export function getStoredTheme(): Theme | null {
	const value = localStorage.getItem(STORAGE_KEY);
	return value === "light" || value === "dark" ? value : null;
}

export function getPreferredTheme(): Theme {
	const stored = getStoredTheme();
	if (stored) return stored;
	return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(theme: Theme): void {
	document.documentElement.classList.toggle("dark", theme === "dark");
	document.documentElement.dataset.theme = theme;
}

export function setTheme(theme: Theme): void {
	localStorage.setItem(STORAGE_KEY, theme);
	applyTheme(theme);
}

export function toggleTheme(): Theme {
	const next: Theme = document.documentElement.classList.contains("dark") ? "light" : "dark";
	setTheme(next);
	return next;
}

export function syncThemeToggle(button: HTMLButtonElement): void {
	const isDark = document.documentElement.classList.contains("dark");
	button.setAttribute("aria-pressed", String(isDark));
	button.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
}

export function initThemeControls(): void {
	applyTheme(getPreferredTheme());

	const buttons = document.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]");
	const syncAll = () => {
		document
			.querySelectorAll<HTMLButtonElement>("[data-theme-toggle]")
			.forEach((button) => syncThemeToggle(button));
	};

	for (const button of buttons) {
		syncThemeToggle(button);
		if (button.dataset.themeBound === "true") continue;
		button.dataset.themeBound = "true";
		button.addEventListener("click", () => {
			toggleTheme();
			syncAll();
		});
	}

	if (mediaQueryBound) return;
	mediaQueryBound = true;

	window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", (event) => {
		if (getStoredTheme()) return;
		applyTheme(event.matches ? "dark" : "light");
		syncAll();
	});
}
