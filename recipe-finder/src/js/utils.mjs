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
  const header = await fetch("/public/partials/header.html");
  const footer = await fetch("/public/partials/footer.html");

  document.getElementById("site-header").innerHTML = await header.text();
  document.getElementById("site-footer").innerHTML = await footer.text();

  setupHamburgerToggle(); 
}
