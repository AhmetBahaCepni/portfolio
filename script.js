const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const revealItems = [...document.querySelectorAll(".reveal")];

if (!prefersReducedMotion && "IntersectionObserver" in window && revealItems.length) {
  document.documentElement.classList.add("motion-ready");
  const revealObserver = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    }
  }, { rootMargin: "0px 0px -36px 0px", threshold: 0.08 });
  revealItems.forEach((item) => revealObserver.observe(item));
}

const dockLinks = [...document.querySelectorAll(".dock a[data-section]")];
const setActive = (id) => {
  for (const link of dockLinks) {
    if (link.dataset.section === id) link.setAttribute("aria-current", "location");
    else link.removeAttribute("aria-current");
  }
};

if (dockLinks.length) {
  setActive(location.hash.slice(1) || "home");
  dockLinks.forEach((link) => link.addEventListener("click", () => setActive(link.dataset.section)));

  const sections = ["home", "work", "about", "contact"]
    .map((id) => document.getElementById(id))
    .filter(Boolean);
  if ("IntersectionObserver" in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (visible) setActive(visible.target.id);
    }, { rootMargin: "-15% 0px -50% 0px", threshold: [0, 0.15, 0.4, 0.7] });
    sections.forEach((section) => sectionObserver.observe(section));
  }
}
