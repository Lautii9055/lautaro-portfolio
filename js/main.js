/* ==========================================================================
   MAIN — navbar state, mobile menu, tech strip, smooth anchors, form
   ========================================================================== */

/* ---------------- YEAR ---------------- */
document.getElementById("year").textContent = new Date().getFullYear();

/* ---------------- NAVBAR SCROLL STATE ---------------- */
const navbar = document.getElementById("navbar");
function onScroll(){
  if(window.scrollY > 40){
    navbar.classList.add("is-scrolled");
  } else {
    navbar.classList.remove("is-scrolled");
  }
}
window.addEventListener("scroll", onScroll, { passive: true });
onScroll();

/* ---------------- MOBILE MENU ---------------- */
const burgerBtn = document.getElementById("burgerBtn");
const mobileMenu = document.getElementById("mobileMenu");

function toggleMenu(open){
  const isOpen = open !== undefined ? open : !mobileMenu.classList.contains("is-open");
  mobileMenu.classList.toggle("is-open", isOpen);
  burgerBtn.setAttribute("aria-expanded", String(isOpen));
  burgerBtn.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
  document.body.style.overflow = isOpen ? "hidden" : "";
}

burgerBtn.addEventListener("click", () => toggleMenu());
document.querySelectorAll("[data-mobile-link]").forEach(link => {
  link.addEventListener("click", () => toggleMenu(false));
});

/* ---------------- SMOOTH ANCHOR SCROLL ---------------- */
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener("click", e => {
    const id = link.getAttribute("href");
    if(id.length < 2) return;
    const target = document.querySelector(id);
    if(!target) return;
    e.preventDefault();
    const navH = document.getElementById("navbar").offsetHeight;
    const top = target.getBoundingClientRect().top + window.scrollY - navH + 1;
    window.scrollTo({ top, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
});

const scrollTopBtn = document.getElementById("scrollTopBtn");
function updateScrollTopVisibility(){
  if(!scrollTopBtn) return;
  scrollTopBtn.classList.toggle("is-visible", window.scrollY > window.innerHeight / 2);
}

if(scrollTopBtn){
  scrollTopBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" });
  });
  window.addEventListener("scroll", updateScrollTopVisibility, { passive: true });
  updateScrollTopVisibility();
}

/* ---------------- TECH STRIP ---------------- */
const TECHS = ["HTML", "CSS", "JavaScript", "Java", "Python", "Node.js", "SQL", "MySQL", "SQL Server", "Git", "GitHub"];
function buildTechGroup(container){
  if(!container) return;
  container.innerHTML = TECHS.map(t => `<span>${t}</span>`).join("");
}
buildTechGroup(document.getElementById("techGroupA"));
buildTechGroup(document.getElementById("techGroupB"));

/* ---------------- PLACEHOLDER LINKS ----------------
   Enlaces sin URL real todavía (GitHub, demos, contacto).
   Reemplazar el href correspondiente en index.html cuando esté disponible. */
document.querySelectorAll("[data-placeholder-link]").forEach(link => {
  link.addEventListener("click", e => {
    if(link.getAttribute("href") === "#"){
      e.preventDefault();
      console.info("[Lautaro Zanino Portfolio] Reemplazar este link por la URL real en index.html/projects.js");
    }
  });
});

/* ---------------- CONTACT FORM VALIDATION ---------------- */
const form = document.getElementById("contactForm");
const formNote = document.getElementById("formNote");

function setError(field, message){
  const el = form.querySelector(`[data-error-for="${field}"]`);
  if(el) el.textContent = message || "";
}

function validateForm(){
  let valid = true;
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const type = form.projectType.value;
  const message = form.message.value.trim();

  if(name.length < 2){ setError("fName", "Ingresá tu nombre."); valid = false; } else setError("fName");

  const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if(!emailRe.test(email)){ setError("fEmail", "Ingresá un email válido."); valid = false; } else setError("fEmail");

  if(!type){ setError("fType", "Elegí un tipo de proyecto."); valid = false; } else setError("fType");

  if(message.length < 10){ setError("fMessage", "Contame un poco más sobre el proyecto."); valid = false; } else setError("fMessage");

  return valid;
}

if(form){
  form.addEventListener("submit", e => {
    e.preventDefault();
    if(!validateForm()){
      formNote.textContent = "Revisá los campos marcados antes de enviar.";
      formNote.style.color = "var(--danger)";
      return;
    }

    /* TODO: integrar con Formspree, EmailJS o un backend propio.
       Ejemplo con Formspree:
       fetch("https://formspree.io/f/TU_ID", {
         method: "POST",
         headers: { "Accept": "application/json" },
         body: new FormData(form)
       });
    */

    formNote.style.color = "var(--accent-2)";
    formNote.textContent = "¡Gracias! Este formulario todavía no está conectado a un servicio de envío — ver comentario TODO en main.js.";
    form.reset();
  });
}
