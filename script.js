if (location.pathname.endsWith("/index.html")) {
  history.replaceState(null, "", `${location.pathname.slice(0, -10)}${location.search}${location.hash}`);
}

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

const motionVideos = [...document.querySelectorAll("video[data-viewport-play]")];
if ("IntersectionObserver" in window && motionVideos.length && !prefersReducedMotion) {
  const videoObserver = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) entry.target.play().catch(() => {});
      else entry.target.pause();
    }
  }, { threshold: 0.15 });
  motionVideos.forEach((video) => videoObserver.observe(video));
}

const contactForm = document.querySelector("[data-contact-form]");
if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!contactForm.reportValidity()) return;

    const data = new FormData(contactForm);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const message = String(data.get("message") || "").trim();
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = encodeURIComponent(`${message}\n\nFrom: ${name}\nEmail: ${email}`);
    window.location.href = `mailto:ahmetbahacepni5335@gmail.com?subject=${subject}&body=${body}`;
  });
}
