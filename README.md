# Lautaro Zanino — Portfolio

Landing page personal construida con HTML5, CSS3 y JavaScript vanilla, más GSAP/ScrollTrigger para animaciones. Sin frameworks ni build step: se abre directamente en el navegador o se despliega en cualquier hosting estático (Vercel, Netlify, GitHub Pages).

## Cómo verla localmente

Abrí `index.html` en el navegador, o serví la carpeta con cualquier servidor estático, por ejemplo:

```bash
npx serve .
```

## Estructura

```
lautaro-portfolio/
├── index.html
├── css/
│   ├── style.css        → sistema de diseño y layout
│   ├── animations.css   → reveals, marquee, prefers-reduced-motion
│   └── responsive.css   → breakpoints (1024 / 768 / 480)
├── js/
│   ├── main.js           → navbar, menú mobile, scroll suave, formulario
│   ├── animations.js      → preloader, GSAP scroll reveals, canvas del hero, botones magnéticos
│   ├── cursor.js          → cursor personalizado (solo desktop)
│   └── projects.js        → datos de proyectos, filtros y modal de detalle
├── assets/
│   ├── images/  ├── icons/  └── (agregar mockups reales acá)
└── projects/    (reservado para páginas de detalle individuales si se necesitan a futuro)
```

## Antes de publicar — checklist de datos reales

El contenido está listo para producción excepto por lo siguiente, marcado explícitamente en el código para que sea fácil de encontrar:

- [ ] **Email, GitHub y LinkedIn reales** — buscar `[TU EMAIL]`, `[TU GITHUB]`, `[TU LINKEDIN]` en `index.html`.
- [ ] **Links de proyectos** (`github`, `demo`) — están en `js/projects.js`, todos apuntan a `"#"` hasta reemplazarse por URLs reales.
- [ ] **Mockups/capturas reales de proyectos** — hoy las tarjetas usan un marcador visual en lugar de una imagen; agregar imágenes en `assets/images/` y referenciarlas en `js/projects.js`.
- [ ] **Envío del formulario de contacto** — el formulario valida en el cliente pero no envía datos a ningún lado todavía. Ver comentario `TODO` en `js/main.js` con un ejemplo de integración con Formspree (también funciona con EmailJS o un backend propio).
- [ ] **Testimonios** — si en el futuro hay testimonios reales de clientes, se puede agregar una sección "What People Say" siguiendo el mismo sistema de tarjetas usado en `services`.
- [ ] **`og:image`** — agregar una imagen de portada real en `assets/images/og-cover.jpg` para que las previews de redes sociales se vean bien.
- [ ] **Dominio real** — reemplazar `https://lautarozanino.dev/` en las meta tags y el JSON-LD por el dominio definitivo.
- [ ] **`sitemap.xml`** — generar uno una vez que el sitio tenga dominio final (placeholder no incluido para evitar URLs inventadas).

## Agregar un proyecto nuevo

Editar el array `PROJECTS` en `js/projects.js`. Cada objeto acepta:

```js
{
  id: "slug-unico",
  name: "Nombre del proyecto",
  category: "website" | "webapp" | "backend" | "database" | "fullstack",
  categoryLabel: "Texto que se muestra",
  summary: "Descripción corta para la tarjeta",
  description: "Descripción más larga para el modal de detalle",
  tech: ["Tech1", "Tech2"],
  github: "URL real o #",
  demo: "URL real o #"
}
```

No hace falta tocar HTML ni CSS: la grilla y el modal se generan automáticamente.

## Notas técnicas

- El hero usa un canvas 2D (sin Three.js) con una red de nodos que reacciona al mouse — liviano y con buen rendimiento incluso en equipos modestos.
- `prefers-reduced-motion` desactiva animaciones, el cursor personalizado y el canvas del hero para usuarios que lo prefieran.
- El cursor personalizado y los botones magnéticos se desactivan automáticamente en dispositivos táctiles.
- GSAP y ScrollTrigger se cargan por CDN con `defer`; si `window.gsap` no está disponible el sitio degrada a un estado totalmente visible sin animación (no bloquea el contenido).
