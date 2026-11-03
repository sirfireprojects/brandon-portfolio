(() => {
  "use strict";

  const header = document.querySelector(".site-header");
  const nav = document.querySelector("#primary-nav");
  const navToggle = document.querySelector(".nav-toggle");
  const navBackdrop = document.querySelector("#nav-backdrop");
  const navLinks = document.querySelectorAll(".nav-list a, .nav-cta");
  const yearEl = document.querySelector("#year");
  const sections = document.querySelectorAll("main section[id]");
  const desktopQuery = window.matchMedia("(min-width: 769px)");

  let lastFocusedBeforeNav = null;

  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }

  const getFocusable = (container) => {
    if (!container) return [];
    return [...container.querySelectorAll('a[href], button:not([disabled])')].filter(
      (el) => !el.hasAttribute("disabled") && el.getAttribute("aria-hidden") !== "true"
    );
  };

  const getHeaderOffset = () => {
    const headerHeight = header ? header.offsetHeight : 72;
    return headerHeight + 24;
  };

  /* ---------- Mobile navigation ---------- */

  const setNavOpen = (isOpen) => {
    if (!nav || !navToggle) return;

    const currentlyOpen = nav.classList.contains("is-open");
    if (isOpen === currentlyOpen) return;

    nav.classList.toggle("is-open", isOpen);
    document.body.classList.toggle("nav-open", isOpen);
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");

    if (navBackdrop) {
      navBackdrop.classList.toggle("is-visible", isOpen);
      navBackdrop.hidden = !isOpen;
    }

    const inertTargets = [
      document.querySelector(".skip-link"),
      document.querySelector(".wordmark"),
      document.querySelector("main"),
      document.querySelector(".site-footer"),
    ];

    if (isOpen) {
      lastFocusedBeforeNav = document.activeElement;
      inertTargets.forEach((el) => {
        if (el) el.setAttribute("inert", "");
      });

      const focusables = getFocusable(nav);
      const firstLink = focusables[0];
      window.requestAnimationFrame(() => {
        if (firstLink) firstLink.focus();
      });
    } else {
      inertTargets.forEach((el) => {
        if (el) el.removeAttribute("inert");
      });

      const returnTo =
        lastFocusedBeforeNav instanceof HTMLElement &&
        lastFocusedBeforeNav !== navBackdrop &&
        document.contains(lastFocusedBeforeNav)
          ? lastFocusedBeforeNav
          : navToggle;
      window.requestAnimationFrame(() => {
        returnTo.focus();
      });
      lastFocusedBeforeNav = null;
    }
  };

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      setNavOpen(!nav.classList.contains("is-open"));
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", () => setNavOpen(false));
    });

    if (navBackdrop) {
      navBackdrop.addEventListener("click", () => setNavOpen(false));
    }

    document.addEventListener("keydown", (event) => {
      if (!nav.classList.contains("is-open")) return;

      if (event.key === "Escape") {
        event.preventDefault();
        setNavOpen(false);
        return;
      }

      if (event.key !== "Tab") return;

      const focusables = getFocusable(nav);
      if (focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = document.activeElement;

      // Keep focus cycling between the toggle and the drawer controls.
      if (event.shiftKey) {
        if (active === first || active === navToggle) {
          event.preventDefault();
          if (active === navToggle) {
            last.focus();
          } else {
            navToggle.focus();
          }
        }
      } else if (active === last) {
        event.preventDefault();
        navToggle.focus();
      } else if (active === navToggle) {
        event.preventDefault();
        first.focus();
      }
    });

    const handleDesktopReset = () => {
      if (desktopQuery.matches) setNavOpen(false);
    };

    if (typeof desktopQuery.addEventListener === "function") {
      desktopQuery.addEventListener("change", handleDesktopReset);
    } else if (typeof desktopQuery.addListener === "function") {
      desktopQuery.addListener(handleDesktopReset);
    }
  }

  /* ---------- Sticky header + active section (single scroll handler) ---------- */

  const updateOnScroll = () => {
    if (header) {
      header.classList.toggle("is-scrolled", window.scrollY > 12);
    }

    const scrollPos = window.scrollY + getHeaderOffset();
    let currentId = "";

    sections.forEach((section) => {
      if (section.offsetTop <= scrollPos) {
        currentId = section.id;
      }
    });

    document.querySelectorAll(".nav-list a").forEach((link) => {
      const href = link.getAttribute("href");
      const isActive = href === `#${currentId}`;
      link.classList.toggle("is-active", isActive);
      if (isActive) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  updateOnScroll();
  window.addEventListener("scroll", updateOnScroll, { passive: true });

  /* ---------- Scroll reveal ---------- */

  const revealTargets = document.querySelectorAll(
    ".section-header, .about-content, .skill-group, .project-card, .experience-item, .contact-panel"
  );

  revealTargets.forEach((el) => el.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.14, rootMargin: "0px 0px -40px 0px" }
    );

    revealTargets.forEach((el) => observer.observe(el));
  } else {
    revealTargets.forEach((el) => el.classList.add("is-visible"));
  }
})();
