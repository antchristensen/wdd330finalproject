export const BASE_PATH = import.meta.env.BASE_URL || "";

export function setupHamburgerToggle() {
  const hamburger = document.getElementById("hamburger");
  const nav = document.getElementById("main-nav");

  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("show");
    });
  }
}

export async function loadPartials() {
  const base = `${BASE_PATH}partials`;

  const header = await fetch(`${base}/header.html`);
  const footer = await fetch(`${base}/footer.html`);

  document.getElementById("site-header").innerHTML = await header.text();
  document.getElementById("site-footer").innerHTML = await footer.text();

  setupHamburgerToggle();

  
  document.querySelectorAll('[data-hardload]').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = link.href; 
    });
  });
}
