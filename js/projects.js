/* ==========================================================================
   PROJECTS DATA
   Agregar nuevos proyectos acá — no requiere tocar el resto del código.
   github / demo: reemplazar "#" por la URL real cuando esté disponible.
   ========================================================================== */

const PROJECTS = [
  {
    id: "bank-management-system",
    name: "Sistema de gestión bancaria",
    category: "backend",
    categoryLabel: "Backend · Full Stack",
    summary: "Gestión de clientes, préstamos, pagos y transacciones financieras.",
    description: "Aplicación web para administrar clientes, préstamos, pagos y el historial de transacciones de una entidad financiera desde un panel centralizado.",
    tech: ["Java", "MySQL", "JDBC", "JSP", "Servlets"],
    github: "#",
    demo: "#"
  },
  {
    id: "inventory-control",
    name: "Sistema de control de inventario",
    category: "database",
    categoryLabel: "Base de datos",
    summary: "Control de stock, movimientos y reportes en tiempo real.",
    description: "Sistema para registrar productos, controlar stock, movimientos de entrada/salida y generar reportes de inventario con consultas optimizadas.",
    tech: ["Python", "PostgreSQL", "SQL"],
    github: "#",
    demo: "#"
  },
  {
    id: "business-landing",
    name: "Página de aterrizaje — negocio local",
    category: "website",
    categoryLabel: "Sitio web",
    summary: "Landing enfocada en conversión para un negocio local.",
    description: "Landing page responsive orientada a captar clientes: propuesta de valor clara, formulario de contacto y optimización para buscadores.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "#",
    demo: "#"
  },
  {
    id: "task-manager-app",
    name: "Aplicación de gestión de tareas",
    category: "webapp",
    categoryLabel: "Aplicación web",
    summary: "Gestión de tareas y proyectos con usuarios y permisos.",
    description: "Aplicación para crear y organizar tareas por proyecto, con autenticación de usuarios, estados y notificaciones internas.",
    tech: ["Node.js", "Express", "MySQL", "JavaScript"],
    github: "#",
    demo: "#"
  },
  {
    id: "booking-system",
    name: "Sistema de reservas",
    category: "fullstack",
    categoryLabel: "Full Stack",
    summary: "Reservas online con calendario y disponibilidad en tiempo real.",
    description: "Plataforma para reservar turnos u horarios, con validación de disponibilidad, panel administrativo y base de datos relacional.",
    tech: ["JavaScript", "Node.js", "SQL Server"],
    github: "#",
    demo: "#"
  },
  {
    id: "portfolio-template",
    name: "Plantilla de portafolio",
    category: "website",
    categoryLabel: "Sitio web",
    summary: "Sitio personal minimalista, rápido y accesible.",
    description: "Plantilla de portfolio personal enfocada en performance, accesibilidad y una experiencia de usuario clara sin dependencias pesadas.",
    tech: ["HTML5", "CSS3", "JavaScript"],
    github: "#",
    demo: "#"
  }
];

const projectsGrid = document.getElementById("projectsGrid");
const filterButtons = document.querySelectorAll(".filter-btn");
const modal = document.getElementById("projectModal");
const modalContent = document.getElementById("projectModalContent");

function renderProjects(filter = "all"){
  if(!projectsGrid) return;
  const list = filter === "all" ? PROJECTS : PROJECTS.filter(p => p.category === filter);

  projectsGrid.innerHTML = list.map(p => `
    <article class="project-card fade-up" data-id="${p.id}" tabindex="0" role="button" aria-label="Ver detalle de ${p.name}">
      <div class="project-card__media">
        <span class="project-card__media-glyph">[ ${p.categoryLabel.toUpperCase()} ]</span>
        <div class="project-card__overlay">Ver proyecto</div>
      </div>
      <div class="project-card__body">
        <span class="project-card__cat">${p.categoryLabel}</span>
        <h3>${p.name}</h3>
        <p>${p.summary}</p>
        <div class="project-card__tech">
          ${p.tech.map(t => `<span>${t}</span>`).join("")}
        </div>
      </div>
    </article>
  `).join("");

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => openModal(card.dataset.id));
    card.addEventListener("keydown", e => {
      if(e.key === "Enter" || e.key === " "){ e.preventDefault(); openModal(card.dataset.id); }
    });
  });

  if(window.gsap){
    gsap.fromTo(".project-card", { opacity: 0, y: 28 }, { opacity: 1, y: 0, duration: .6, stagger: .08, ease: "power2.out" });
  } else {
    document.querySelectorAll(".project-card").forEach(c => { c.style.opacity = 1; c.style.transform = "none"; });
  }
}

function openModal(id){
  const p = PROJECTS.find(item => item.id === id);
  if(!p || !modal) return;

  modalContent.innerHTML = `
    <span class="modal-cat">${p.categoryLabel}</span>
    <h3 id="modalTitle">${p.name}</h3>
    <p>${p.description}</p>
    <div class="modal-tech">${p.tech.map(t => `<span>${t}</span>`).join("")}</div>
    <div class="modal-actions">
      <a href="${p.demo}" class="btn btn--primary magnetic" data-placeholder-link>Demo en vivo</a>
      <a href="${p.github}" class="btn btn--ghost magnetic" data-placeholder-link>GitHub</a>
    </div>
  `;
  modal.classList.add("is-open");
  modal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeModal(){
  if(!modal) return;
  modal.classList.remove("is-open");
  modal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

document.querySelectorAll("[data-close-modal]").forEach(el => el.addEventListener("click", closeModal));
document.addEventListener("keydown", e => { if(e.key === "Escape") closeModal(); });

filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    filterButtons.forEach(b => { b.classList.remove("is-active"); b.setAttribute("aria-selected", "false"); });
    btn.classList.add("is-active");
    btn.setAttribute("aria-selected", "true");
    renderProjects(btn.dataset.filter);
  });
});

renderProjects();
