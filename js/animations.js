/* ==========================================================================
   ANIMATIONS — preloader, hero canvas, scroll reveals, magnetic buttons
   ========================================================================== */

const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------------- PRELOADER ---------------- */
(function preloader(){
  const el = document.getElementById("preloader");
  const fill = document.getElementById("preloaderFill");
  if(!el) return;

  document.body.style.overflow = "hidden";

  let progress = 0;
  const duration = prefersReduced ? 200 : 1400;
  const start = performance.now();

  function tick(now){
    const t = Math.min(1, (now - start) / duration);
    progress = t * 100;
    fill.style.width = progress + "%";
    if(t < 1){
      requestAnimationFrame(tick);
    } else {
      setTimeout(() => {
        el.classList.add("is-hidden");
        document.body.style.overflow = "";
        document.body.classList.add("js-ready");
        runHeroReveal();
        setTimeout(() => el.remove(), 700);
      }, 150);
    }
  }
  requestAnimationFrame(tick);
})();

/* ---------------- HERO REVEAL ---------------- */
function runHeroReveal(){
  const insides = document.querySelectorAll(".hero .reveal-inner");
  const lines = document.querySelectorAll(".hero__eyebrow.reveal-line, .hero__subtext.reveal-line, .hero__actions.reveal-line");

  if(window.gsap){
    const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
    tl.to(".hero__eyebrow.reveal-line", { opacity: 1, y: 0, duration: .6 })
      .to(insides, { y: "0%", duration: 1, stagger: .12 }, "-=.3")
      .to(".hero__subtext.reveal-line, .hero__actions.reveal-line", { opacity: 1, y: 0, duration: .7, stagger: .1 }, "-=.5");
  } else {
    insides.forEach(el => el.style.transform = "translateY(0%)");
    lines.forEach(el => { el.style.opacity = 1; el.style.transform = "none"; });
  }
}

/* ---------------- SCROLL REVEALS ---------------- */
window.addEventListener("load", () => {
  if(!window.gsap || !window.ScrollTrigger){
    document.querySelectorAll(".fade-up, .section-head, .service-card, .why__item, .stack__category").forEach(el => {
      el.style.opacity = 1; el.style.transform = "none";
    });
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  const groups = [
    ".about__text > *",
    ".about__panel",
    ".service-card",
    ".process__step",
    ".stack__category",
    ".why__item",
    ".featured__visual, .featured__content > *",
    ".contact__intro > *, .contact__form"
  ];

  groups.forEach(sel => {
    const els = document.querySelectorAll(sel);
    if(!els.length) return;
    gsap.set(els, { opacity: 0, y: 26 });
    gsap.to(els, {
      opacity: 1, y: 0, duration: .7, stagger: .08, ease: "power2.out",
      scrollTrigger: { trigger: els[0], start: "top 88%" }
    });
  });

  document.querySelectorAll(".section-head").forEach(head => {
    gsap.set(head, { opacity: 0, y: 20 });
    gsap.to(head, {
      opacity: 1, y: 0, duration: .7, ease: "power2.out",
      scrollTrigger: { trigger: head, start: "top 90%" }
    });
  });

  /* process progress line */
  const processFill = document.getElementById("processFill");
  if(processFill){
    gsap.to(processFill, {
      width: "100%",
      ease: "none",
      scrollTrigger: {
        trigger: ".process",
        start: "top 70%",
        end: "bottom 60%",
        scrub: true
      }
    });
  }
});

/* ---------------- MAGNETIC BUTTONS ---------------- */
(function magnetic(){
  if(prefersReduced || window.matchMedia("(pointer: coarse)").matches) return;

  document.addEventListener("mousemove", e => {
    const el = e.target.closest && e.target.closest(".magnetic");
    document.querySelectorAll(".magnetic").forEach(btn => {
      const r = btn.getBoundingClientRect();
      const inside = e.clientX > r.left - 20 && e.clientX < r.right + 20 && e.clientY > r.top - 20 && e.clientY < r.bottom + 20;
      if(inside){
        const x = (e.clientX - (r.left + r.width/2)) * 0.25;
        const y = (e.clientY - (r.top + r.height/2)) * 0.25;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      } else {
        btn.style.transform = "translate(0,0)";
      }
    });
  });
})();

/* ---------------- HERO GLOW — soft cursor-follow light ---------------- */
(function heroGlow(){
  const glow = document.getElementById("heroGlow");
  const hero = document.querySelector(".hero");
  if(!glow || !hero) return;
  if(prefersReduced || window.matchMedia("(pointer: coarse)").matches) return;

  hero.addEventListener("mousemove", e => {
    const r = hero.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    glow.style.transform = `translate(${x - 310}px, ${y - 310}px)`;
  });
})();
