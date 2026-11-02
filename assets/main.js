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

// A manual gallery: visitors control the pace, including with touch or a keyboard.
document.querySelectorAll("[data-credential-gallery]").forEach((gallery) => {
  const stage = gallery.querySelector(".credential-stage");
  const slides = [...gallery.querySelectorAll(".credential-slide")];
  const browse = gallery.querySelector("select");
  const count = gallery.querySelector(".gallery-count");
  const status = gallery.querySelector("[aria-live]");
  let current = 0;
  let drag;
  let suppressClick = false;

  function showSlide(index, announce = true) {
    current = (index + slides.length) % slides.length;
    slides.forEach((slide, i) => {
      const previous = i === (current - 1 + slides.length) % slides.length;
      const next = i === (current + 1) % slides.length;
      slide.classList.toggle("is-current", i === current);
      slide.classList.toggle("is-previous", previous);
      slide.classList.toggle("is-next", next);
      slide.inert = i !== current;
      slide.setAttribute("aria-hidden", String(i !== current));
      slide.setAttribute("aria-label", `${i + 1} of ${slides.length}`);
    });
    browse.value = String(current);
    count.textContent = `${String(current + 1).padStart(2, "0")} / ${slides.length}`;
    if (announce)
      status.textContent = `${slides[current].dataset.label}. ${current + 1} of ${slides.length}.`;
  }

  function followHash() {
    const index = slides.findIndex((slide) => `#${slide.id}` === location.hash);
    if (index !== -1) showSlide(index);
  }

  gallery.classList.add("is-enhanced");
  showSlide(0, false);
  followHash();
  window.addEventListener("hashchange", followHash);
  gallery
    .querySelector("[data-gallery-prev]")
    .addEventListener("click", () => showSlide(current - 1));
  gallery
    .querySelector("[data-gallery-next]")
    .addEventListener("click", () => showSlide(current + 1));
  browse.addEventListener("change", () => showSlide(Number(browse.value)));
  gallery.addEventListener("keydown", (event) => {
    if (
      event.target.closest("select") ||
      event.altKey ||
      event.ctrlKey ||
      event.metaKey
    )
      return;
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      // Leave focus on a stable element when the focused slide becomes inert.
      if (stage.contains(document.activeElement))
        stage.focus({ preventScroll: true });
      showSlide(current + (event.key === "ArrowRight" ? 1 : -1));
    }
  });

  stage.addEventListener("pointerdown", (event) => {
    if (!event.isPrimary || event.button !== 0) return;
    drag = {
      id: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      active: false,
    };
  });
  stage.addEventListener("pointermove", (event) => {
    if (!drag || drag.id !== event.pointerId) return;
    const dx = event.clientX - drag.x;
    const dy = event.clientY - drag.y;
    if (
      !drag.active &&
      Math.abs(dx) > 12 &&
      Math.abs(dx) > Math.abs(dy) * 1.3
    ) {
      drag.active = true;
      stage.setPointerCapture(event.pointerId);
      stage.classList.add("is-dragging");
    }
    if (drag.active) {
      stage.style.setProperty(
        "--drag-offset",
        `${Math.max(-75, Math.min(75, dx * 0.35))}px`,
      );
    }
  });
  function finishDrag(event) {
    if (!drag || drag.id !== event.pointerId) return;
    if (drag.active) {
      const dx = event.clientX - drag.x;
      if (event.type === "pointerup" && Math.abs(dx) > 50)
        showSlide(current + (dx < 0 ? 1 : -1));
      suppressClick = true;
      window.setTimeout(() => {
        suppressClick = false;
      }, 300);
    }
    if (stage.hasPointerCapture(event.pointerId))
      stage.releasePointerCapture(event.pointerId);
    stage.classList.remove("is-dragging");
    stage.style.removeProperty("--drag-offset");
    drag = undefined;
  }
  stage.addEventListener("pointerup", finishDrag);
  stage.addEventListener("pointercancel", finishDrag);
  stage.addEventListener("lostpointercapture", (event) => {
    // Touch starts with implicit capture on the image. Its handoff to the
    // stage must not cancel the horizontal gesture in progress.
    if (event.target !== stage) return;
    stage.classList.remove("is-dragging");
    stage.style.removeProperty("--drag-offset");
    drag = undefined;
  });
  stage.addEventListener("dragstart", (event) => event.preventDefault());
  stage.addEventListener(
    "click",
    (event) => {
      if (suppressClick) {
        event.preventDefault();
        event.stopImmediatePropagation();
      }
    },
    true,
  );
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
