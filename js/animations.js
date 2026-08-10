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

/* ---------------- HERO CANVAS — node network ---------------- */
(function heroCanvas(){
  const canvas = document.getElementById("heroCanvas");
  if(!canvas) return;
  const ctx = canvas.getContext("2d");
  let w, h, points, mouse = { x: null, y: null };
  const isSmall = window.matchMedia("(max-width: 768px)").matches;
  const density = isSmall ? 60 : 46;

  function resize(){
    w = canvas.width = canvas.offsetWidth * devicePixelRatio;
    h = canvas.height = canvas.offsetHeight * devicePixelRatio;
    canvas.style.width = canvas.offsetWidth + "px";
    canvas.style.height = canvas.offsetHeight + "px";
  }

  function init(){
    resize();
    const count = Math.floor((canvas.offsetWidth * canvas.offsetHeight) / (density * 1000));
    points = Array.from({ length: Math.min(count, 90) }, () => ({
      x: Math.random() * canvas.offsetWidth,
      y: Math.random() * canvas.offsetHeight,
      vx: (Math.random() - 0.5) * 0.25,
      vy: (Math.random() - 0.5) * 0.25
    }));
  }

  function draw(){
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
    ctx.clearRect(0, 0, canvas.offsetWidth, canvas.offsetHeight);

    const accent = "110,91,255";
    const accent2 = "88,230,201";

    points.forEach(p => {
      p.x += p.vx; p.y += p.vy;
      if(p.x < 0 || p.x > canvas.offsetWidth) p.vx *= -1;
      if(p.y < 0 || p.y > canvas.offsetHeight) p.vy *= -1;

      if(mouse.x !== null){
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 140){
          p.x += dx / dist * 0.6;
          p.y += dy / dist * 0.6;
        }
      }
    });

    for(let i = 0; i < points.length; i++){
      for(let j = i + 1; j < points.length; j++){
        const dx = points[i].x - points[j].x;
        const dy = points[i].y - points[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 140){
          ctx.strokeStyle = `rgba(${accent}, ${0.14 * (1 - dist/140)})`;
          ctx.lineWidth = 1;
          ctx.beginPath();
          ctx.moveTo(points[i].x, points[i].y);
          ctx.lineTo(points[j].x, points[j].y);
          ctx.stroke();
        }
      }
    }

    points.forEach((p, i) => {
      ctx.fillStyle = i % 5 === 0 ? `rgba(${accent2}, .8)` : `rgba(${accent}, .6)`;
      ctx.beginPath();
      ctx.arc(p.x, p.y, i % 5 === 0 ? 2 : 1.4, 0, Math.PI * 2);
      ctx.fill();
    });

    if(!prefersReduced) requestAnimationFrame(draw);
  }

  window.addEventListener("resize", init);
  canvas.parentElement.addEventListener("mousemove", e => {
    const r = canvas.getBoundingClientRect();
    mouse.x = e.clientX - r.left;
    mouse.y = e.clientY - r.top;
  });
  canvas.parentElement.addEventListener("mouseleave", () => { mouse.x = null; mouse.y = null; });

  init();
  if(prefersReduced){
    draw();
  } else {
    requestAnimationFrame(draw);
  }
})();
