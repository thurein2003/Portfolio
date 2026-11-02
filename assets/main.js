const menuButton = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}
menuButton.addEventListener("click", () => {
  const open = menuButton.getAttribute("aria-expanded") !== "true";
  menuButton.setAttribute("aria-expanded", String(open));
  menuButton.setAttribute(
    "aria-label",
    open ? "Close navigation" : "Open navigation",
  );
  mobileNav.hidden = !open;
});
mobileNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) closeMenu();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
document.addEventListener("click", (event) => {
  if (!event.target.closest(".site-header")) closeMenu();
});
window.matchMedia("(min-width: 651px)").addEventListener("change", (event) => {
  if (event.matches) closeMenu();
});

const dialog = document.querySelector(".certificate-dialog");
let certificateTrigger;
document.querySelectorAll("[data-certificate]").forEach((button) => {
  button.addEventListener("click", () => {
    certificateTrigger = button;
    document.querySelector("#certificate-title").textContent =
      button.dataset.title;
    const certificateImage = document.querySelector("#certificate-image");
    certificateImage.src = button.dataset.certificate;
    certificateImage.alt = button.dataset.title;
    document.querySelector("#certificate-original").href =
      button.dataset.certificate;
    dialog.showModal();
    document.body.classList.add("dialog-open");
  });
});
dialog
  .querySelector(".dialog-close")
  .addEventListener("click", () => dialog.close());
dialog.addEventListener("click", (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (
    event.target === dialog &&
    (event.clientX < bounds.left ||
      event.clientX > bounds.right ||
      event.clientY < bounds.top ||
      event.clientY > bounds.bottom)
  )
    dialog.close();
});
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-open");
  certificateTrigger?.focus();
});

const copyButton = document.querySelector(".copy-email");
copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(copyButton.dataset.email);
    copyButton.textContent = "Email copied ✓";
    document.querySelector("#copy-status").textContent =
      "Email address copied to clipboard.";
    window.setTimeout(() => {
      copyButton.textContent = "Copy email ⧉";
    }, 2500);
  } catch {
    document.querySelector("#copy-status").textContent =
      `Select and copy the email address: ${copyButton.dataset.email}`;
    copyButton.textContent = "Select email above";
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();

// Keep the navigation tied to the section currently being read.
const sections = [...document.querySelectorAll("main section[id]")];
const sectionObserver = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    document.querySelectorAll(".desktop-nav a").forEach((link) => {
      if (link.hash === "#" + visible.target.id)
        link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
  },
  { rootMargin: "-10% 0px -65% 0px", threshold: 0 },
);
sections.forEach((section) => sectionObserver.observe(section));

// A static, decorative network follows the reference's technical visual language.
// Redraw only on resize: no continuous motion, timers, or animation workload.
const network = document.querySelector(".hero-network");
const hero = document.querySelector(".hero");
function drawNetwork() {
  const ctx = network.getContext("2d");
  if (!ctx) return;
  const width = hero.clientWidth;
  const height = hero.clientHeight;
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  network.width = width * ratio;
  network.height = height * ratio;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
  ctx.clearRect(0, 0, width, height);
  let seed = 101;
  const random = () => {
    seed = (seed * 16807) % 2147483647;
    return (seed - 1) / 2147483646;
  };
  const points = Array.from({ length: width < 650 ? 27 : 52 }, () => ({
    x: random() * width,
    y: random() * height,
  }));
  ctx.lineWidth = 0.6;
  points.forEach((point, i) => {
    points.slice(i + 1).forEach((other) => {
      const distance = Math.hypot(point.x - other.x, point.y - other.y);
      if (distance < 155) {
        ctx.strokeStyle = `rgba(143,190,41,${(1 - distance / 155) * 0.18})`;
        ctx.beginPath();
        ctx.moveTo(point.x, point.y);
        ctx.lineTo(other.x, other.y);
        ctx.stroke();
      }
    });
    ctx.fillStyle = "rgba(25,207,144,.42)";
    ctx.beginPath();
    ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2);
    ctx.fill();
  });
  ctx.font = "8px monospace";
  for (let x = 10; x < width; x += 83) {
    const offset = random() * height;
    for (let i = 0; i < 9; i++) {
      ctx.fillStyle = `rgba(164,211,39,${0.03 + random() * 0.08})`;
      ctx.fillText(random() > 0.5 ? "1" : "0", x, (offset + i * 13) % height);
    }
  }
}
new ResizeObserver(drawNetwork).observe(hero);
