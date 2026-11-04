export function initReveal(): void {
	const elements = document.querySelectorAll<HTMLElement>(".reveal:not(.is-visible)");
	if (!elements.length) return;

	const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
	if (reduceMotion) {
		elements.forEach((element) => element.classList.add("is-visible"));
		return;
	}

	const observer = new IntersectionObserver(
		(entries) => {
			for (const entry of entries) {
				if (!entry.isIntersecting) continue;
				entry.target.classList.add("is-visible");
				observer.unobserve(entry.target);
			}
		},
		{ threshold: 0.12, rootMargin: "0px 0px -6% 0px" },
	);

	elements.forEach((element) => observer.observe(element));
}
