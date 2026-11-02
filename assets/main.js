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
window.matchMedia("(min-width: 541px)").addEventListener("change", (event) => {
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
