/* ==========================================================================
   CUSTOM CURSOR — desktop only, disabled on touch devices & reduced motion
   ========================================================================== */

(function(){
  const isTouch = window.matchMedia("(pointer: coarse)").matches;
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if(isTouch || prefersReduced) return;

  const cursor = document.getElementById("cursor");
  const dot = cursor.querySelector(".cursor__dot");
  const ring = cursor.querySelector(".cursor__ring");
  const label = document.getElementById("cursorLabel");
  if(!cursor) return;

  cursor.style.display = "block";

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener("mousemove", e => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + "px";
    dot.style.top = mouseY + "px";
    label.style.left = mouseX + "px";
    label.style.top = mouseY + "px";
  });

  function loop(){
    ringX += (mouseX - ringX);
    ringY += (mouseY - ringY);
    ring.style.left = ringX + "px";
    ring.style.top = ringY + "px";
    requestAnimationFrame(loop);
  }
  loop();

  /* Mantener el cursor constante sin cambios al pasar por botones o proyectos */
})();
