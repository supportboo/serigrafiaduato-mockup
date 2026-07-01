---
title: "SHELL — instrucciones para page-builders · mockup v4 industrial"
client: serigrafia-duato
phase: v4-industrial
date: 2026-06-30
status: shared-spec
sistema: "Acero & Seguridad"
depends_on:
  - _shared/design-system.css
  - _shared/components.md
---

# SHELL — cómo construir cada página del mockup

> Léelo antes de tocar cualquier página. Garantiza que las 4 páginas del primer mockup
> (Home · `/marcaje-piezas-componentes` · `/presupuesto` · `/capacidades/tampografia`)
> sean **visualmente idénticas** en estructura, header, footer y datos. Cada page-builder
> rellena el contenido central; el caparazón (shell) es común y no se modifica.

---

## 1 · Estructura obligatoria de cada archivo single-file

Cada página es un HTML autónomo con esta secuencia exacta:

```
<!doctype html>
<html lang="es">
<head>
  … meta + <link> Google Fonts + <style> con TODO el design-system.css INLINE …
</head>
<body>
  <header class="site-header"> … idéntico en todas las páginas (components.md §1) … </header>

  <main>
     … contenido propio de la página, en .section / .container …
  </main>

  <footer class="site-footer"> … idéntico en todas las páginas (components.md §11) … </footer>

  <a class="whatsapp-sticky" …> … idéntico (components.md §9) … </a>

  <script> … motion mínimo (ver §6) … </script>
</body>
</html>
```

- `<html lang="es">` siempre.
- Header, footer y WhatsApp sticky se copian **literalmente** de `components.md`. No se
  rediseñan por página. Solo cambia el `aria-current="page"` del enlace de nav activo.

---

## 2 · Cómo inline-ar el CSS

El mockup es single-file: el contenido completo de `_shared/design-system.css` va dentro
de un único `<style>` en el `<head>`, **antes** de cualquier estilo de página.

1. Copia íntegro `design-system.css` dentro de `<style>…</style>`.
2. Si una página necesita un ajuste puntual, añádelo en un segundo `<style>` después,
   reutilizando **tokens** (`var(--…)`), nunca valores sueltos (no `#E8590C` a pelo, usa
   `var(--safety)`). No redefinas tokens.
3. No dupliques el CSS del sistema en varias páginas con divergencias: si cambia, cambia
   en `design-system.css` y se vuelve a inline-ar en todas.

Las fuentes van por `<link>` de Google Fonts (ver `components.md` §0). En producción
Next.js/Astro se self-hostean con `font-display: swap` y subset Latin+Ext.

---

## 3 · Paleta y su disciplina (no negociable)

| Token | HEX | Uso permitido |
|---|---|---|
| `--surface` | `#F4F5F7` | Fondo general |
| `--surface-2` | `#E7E9ED` | Tarjetas, bandas, papel técnico |
| `--ink` | `#15181D` | Texto, titulares |
| `--steel` | `#4A525E` | Texto secundario, bordes, hairlines |
| `--safety` | `#E8590C` | **Solo** CTA · dato clave · alerta · **<8% de superficie** |
| `--safety-2` | `#FFB000` | **Solo** badges de normativa / iconos PRL |
| `--dark` | `#16191E` | Secciones hero / proceso |

- El naranja nunca es fondo de sección, nunca es color de cuerpo de texto. Si dudas, no
  lo uses: el defecto es acero, no naranja.
- Las secciones oscuras usan `.section--dark` (texto se aclara solo) + opcionalmente
  `.blueprint-bg` para la retícula de plano (≤4%).
- Contraste validado WCAG 2.2 AA (4.5:1 cuerpo); diseñado hacia APCA (Lc 90 cuerpo).

---

## 4 · Tipografía y datos

- Titulares y UI: **Inter Tight**. Cuerpo: **Inter**. Todo DATO: **JetBrains Mono** con
  `font-variant-numeric: tabular-nums` (clase `.mono` / `.data` / `td.num`).
- Es DATO (y por tanto va en mono): m², plazos, lotes, series, número de serie,
  técnica×material, teléfono, dirección numérica, año, dimensiones, unidades.
- Eyebrows con `.eyebrow` (UPPERCASE + tracking, tick naranja). Una por sección.
- Sin serif decorativa, sin itálicas decorativas. Énfasis = peso o mono.

---

## 5 · Datos reales — qué se puede afirmar y qué no

**Hechos verificados (se pueden afirmar tal cual):**

- Más de 30 años de oficio.
- 12 técnicas bajo un mismo techo.
- Alboraya (Valencia) · Camino del Mar 36 · 46120.
- Teléfono: +34 96 186 02 75 — `tel:+34961860275`, WhatsApp `https://wa.me/34961860275`.
- Email: info@serigrafiaduato.es.
- Tratamiento de aguas en circuito cerrado.
- Partner de reciclaje RECICLAMAS.

**Sin datos confirmados — usar lenguaje cualitativo + disclaimer o `.badge-pending`:**

- SLA / tiempo de respuesta ("respuesta lo antes posible"; la cifra "X h" queda
  pendiente de cliente).
- Plazos y mínimos de tirada por técnica ("series desde unidades hasta grandes tiradas —
  consultar disponibilidad").
- Resistencias concretas (lavado, abrasión, intemperie): "alta/media" cualitativo o
  "consultar", nunca un número inventado.
- Sectores atendidos, casos, clientes, testimonios: **no inventar**. `.media-pending` y
  `.badge-pending` mientras no haya permiso ni dato.
- **Prohibido**: certificaciones ISO, cifras de clientes/satisfacción, logos de cliente,
  fotos de piezas inventadas, renders, stock de moda.

Toda cifra pública lleva `.disclaimer`: "estimación orientativa, sujeta a brief".

---

## 6 · Motion (mínimo, en `<script>` al final del body)

Reveals discretos por sección, contadores funcionales. Respeta `prefers-reduced-motion`.

```html
<script>
  const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (!rm && 'IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
    }, { threshold: 0.15 });
    document.querySelectorAll('.reveal').forEach(el => io.observe(el));
  } else {
    document.querySelectorAll('.reveal').forEach(el => el.classList.add('is-in'));
  }

  // Nav móvil
  const toggle = document.querySelector('.nav-toggle');
  if (toggle) toggle.addEventListener('click', () => {
    const nav = document.querySelector('.nav');
    const open = nav.style.display === 'flex';
    nav.style.display = open ? 'none' : 'flex';
    toggle.setAttribute('aria-expanded', String(!open));
  });
</script>
```

- Transiciones 150–250 ms, easing `cubic-bezier(0.2,0,0,1)` (ya en los tokens).
- Nada de parallax pesado, autoplay espectáculo, rebotes/spring lúdicos.

---

## 7 · Layout y responsive

- `.container` (máx. 1280px) + grid 12 col. Escala de espaciado 4/8 vía tokens `--sp-*`.
- Mobile-first: auditar 320 / 375 / 390 / 430. El CSS ya colapsa nav, grid, footer y
  tablas (`.spec-table.collapsible` + `data-label`).
- WhatsApp sticky aparece solo en móvil (lo controla el CSS). No lo escondas.

---

## 8 · Do / Don't

**Do**

- Copiar header, footer y WhatsApp sticky literalmente de `components.md`.
- Usar tokens `var(--…)` para todo color/espaciado/tipografía.
- Empezar cada sección con un `.eyebrow` + `<h2>`.
- Poner una señal de confianza (stat, +30 años, circuito cerrado) a la vista de cada CTA.
- Hero y secciones de proceso en `.section--dark.blueprint-bg`.
- `.media-pending` honesto para toda imagen aún no fotografiada.
- Disclaimer en toda cifra pública.

**Don't**

- No usar naranja como fondo de sección ni color de cuerpo.
- No inventar SLA, plazos, mínimos, sectores, certificaciones, casos ni testimonios.
- No insertar `<img>` a stock genérico, render ni foto de pieza inventada.
- No usar emojis; iconos SVG lineales stroke 1.5 inline.
- No serif decorativa ni itálicas; no gradientes cinematográficos; no parallax pesado.
- No latinoamericanismos; español peninsular estricto (ñ, tildes, ¿¡, raya —, « »).
- No jerga de v2/v3 (drops, lookbook, streetwear, editorial, festival, "production house").
- No congelar el año del footer ni dejar contenido "© 2021".

---

## 9 · Orden de construcción del primer mockup

1. **Home** (`/`) — segmentadora industrial: hero oscuro + barra de prueba numérica +
   6 bloques de solución (tarjetas) + asistente embebido + repetibilidad/continuidad +
   cumplimiento honesto + contacto técnico. CTA dual.
2. **`/marcaje-piezas-componentes`** — landing de solución insignia (tampografía + láser).
   Lenguaje de comprador: dolor → técnica → sustratos → prueba → muestra. CTA "Pide
   muestra sobre tu pieza".
3. **`/presupuesto`** — RFQ multipaso 3–4 pasos (chips multi-técnica, subida de plano,
   campos condicionales, datos personales al final). Núcleo de conversión.
4. **`/capacidades/tampografia`** — página de capacidad: qué resuelve · sustratos ·
   series · resistencia · plazo orientativo · ficha PDF · CTA a RFQ preseleccionado.
   La jerga técnica vive aquí.

Cada una usa el mismo shell. La coherencia visual entre las cuatro es el entregable.
