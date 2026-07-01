---
title: "Catálogo de componentes · mockup v4 industrial"
client: serigrafia-duato
phase: v4-industrial
date: 2026-06-30
status: shared-spec
sistema: "Acero & Seguridad"
depends_on: _shared/design-system.css
doctrine:
  - boo-data-certainty (solo hechos verificados)
  - feedback_legal_disclaimers (cifra pública = estimación orientativa, no vinculante)
  - feedback_spanish_characters (peninsular: ñ, tildes, ¿¡, raya —, « »)
  - feedback_no_emojis_use_brand_logo (cero emojis · SVG lineal stroke 1.5)
---

# Catálogo de componentes — Serigrafía Duato v4 industrial

> HTML de referencia para todos los page-builders del mockup. Todo se apoya en
> `_shared/design-system.css`. Copia, no reinventes. Iconografía SVG lineal inline
> (stroke 1.5px, esquinas a 90°). Cero emojis. Cero `<img>` a stock genérico — usa
> `.media-pending` hasta la sesión real en Alboraya.

---

## 0 · `<head>` — fuentes Google + CSS inline

Carga Inter, Inter Tight y JetBrains Mono vía Google Fonts. El CSS del sistema va
inline dentro de `<style>` (ver SHELL.md para el procedimiento de inline-ado).

```html
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Serigrafía Duato · Marcaje industrial en Valencia</title>
  <meta name="description" content="Taller de marcaje industrial multitécnica en Alboraya (Valencia). 12 técnicas bajo un techo, más de 30 años. Tampografía, láser, serigrafía cilíndrica, señalética y ropa laboral.">

  <!-- Fuentes -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Inter+Tight:wght@600;700;800&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">

  <!-- Sistema de diseño: en el mockup single-file va INLINE aquí -->
  <style>/* … contenido de _shared/design-system.css … */</style>
</head>
```

> En producción (Next.js/Astro) las fuentes se self-hostean con `font-display: swap`
> y subset Latin+Ext, para corregir el TTFB crítico (1,36 s). En el mockup single-file
> basta el `<link>` de Google Fonts de arriba.

---

## 1 · Header + nav (con CTA dual)

CTA dual canónico: **PEDIR PRESUPUESTO** (primario, naranja) + **HABLAR CON UN TÉCNICO**
(secundario). Logotipo en texto hasta tener el logo real del cliente.

```html
<header class="site-header">
  <div class="container">
    <a class="brand" href="/" aria-label="Serigrafía Duato, inicio">
      Serigrafía Duato
      <span class="brand-sub">Marcaje industrial</span>
    </a>

    <nav class="nav" aria-label="Principal">
      <a href="/marcaje-piezas-componentes">Piezas y componentes</a>
      <a href="/marcaje-trazabilidad-industrial">Trazabilidad</a>
      <a href="/marcaje-cilindrico-envases">Envases</a>
      <a href="/ropa-laboral-epi-empresa">Ropa laboral / EPI</a>
      <a href="/capacidades/tampografia">Capacidades</a>
      <a href="/casos">Casos</a>
    </nav>

    <div class="header-cta">
      <a class="btn btn-ghost" href="/contacto">Hablar con un técnico</a>
      <a class="btn btn-safety" href="/presupuesto">Pedir presupuesto</a>
      <button class="nav-toggle" aria-label="Abrir menú" aria-expanded="false">
        <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18M3 12h18M3 18h18" stroke="currentColor" stroke-linecap="round"/></svg>
      </button>
    </div>
  </div>
</header>
```

---

## 2 · Eyebrow (placa de sección)

```html
<span class="eyebrow">Tampografía · Serie industrial</span>
```

Lenguaje de placa/señalética. Tick naranja a la izquierda (lo pone el CSS). UPPERCASE
con tracking. Úsalo encima de cada `<h2>` de sección.

---

## 3 · Botón CTA

```html
<!-- Primario (naranja seguridad) -->
<a class="btn btn-safety" href="/presupuesto">
  Pedir presupuesto
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>

<!-- Secundario (borde acero) -->
<a class="btn btn-ghost" href="/contacto">Hablar con un técnico</a>

<!-- Neutro oscuro de alto contraste (sin gastar naranja) -->
<a class="btn btn-dark" href="/capacidades/tampografia">Ver capacidad técnica</a>
```

Microcopy de apoyo bajo el CTA primario, con disclaimer:

```html
<p class="disclaimer">Respuesta en menos de X h hábiles. Estimación orientativa, sujeta a brief.</p>
```

> X es **[SIN DATOS]** hasta confirmar con el cliente. Mientras tanto, lenguaje
> cualitativo: "te respondemos lo antes posible en horario de taller".

---

## 4 · Tarjeta de capacidad / solución

Módulo uniforme tipo ficha de catálogo. Icono lineal + título + descripción + metadato
mono + enlace.

```html
<article class="card card--accent">
  <svg class="card-icon" viewBox="0 0 24 24" aria-hidden="true">
    <rect x="3" y="4" width="18" height="16" rx="1" stroke="currentColor" stroke-width="1.5"/>
    <path d="M7 9h10M7 13h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  <h3>Tampografía sobre piezas</h3>
  <p>Marcaje permanente sobre geometrías irregulares: mandos, paneles, carcasas e instrumental. La pieza 1 y la 10.000 salen idénticas.</p>
  <p class="card-meta">TÉCNICA: tampografía · MATERIAL: ABS / PP / metal · SERIE: unidades → grandes tiradas</p>
  <a class="card-link" href="/capacidades/tampografia">
    Ver capacidad
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>
  </a>
</article>
```

> Series/materiales solo cualitativos salvo dato confirmado. Nada de mínimos numéricos
> inventados (`boo-data-certainty`).

---

## 5 · Tabla técnica (mono tabular)

Cabecera tipo placa, cifras en mono tabular. Añade `collapsible` + `data-label` para que
colapse a tarjetas en móvil.

```html
<table class="spec-table collapsible">
  <caption>Técnica × material × resistencia</caption>
  <thead>
    <tr>
      <th>Material</th>
      <th>Técnica</th>
      <th>Lavado ind.</th>
      <th>Intemperie</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Material" class="mono">ABS</td>
      <td data-label="Técnica">Tampografía</td>
      <td data-label="Lavado ind." class="num">consultar</td>
      <td data-label="Intemperie" class="num">consultar</td>
    </tr>
    <tr>
      <td data-label="Material" class="mono">INOX</td>
      <td data-label="Técnica">Láser fibra</td>
      <td data-label="Lavado ind." class="num">alta</td>
      <td data-label="Intemperie" class="num">alta</td>
    </tr>
  </tbody>
</table>
<p class="disclaimer">Aguante orientativo, sujeto a sustrato y proceso del cliente. No vinculante.</p>
```

> Cifras de resistencia concretas son **[SIN DATOS]** hasta validación: usa "consultar",
> "alta/media" cualitativo, o `.badge-pending`. Nunca inventes valores.

---

## 6 · Badge de normativa / PRL (ámbar)

```html
<span class="badge-normativa">
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3l8 4v5c0 5-3.5 7.5-8 9-4.5-1.5-8-4-8-9V7l8-4z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
  EN ISO 20471
</span>
```

Para marcar el lenguaje normativo verificable (RD 485/1997, ISO 7010, EN ISO 20471…).
Chip de dato pendiente cuando algo está sin confirmar:

```html
<span class="badge-pending">
  <svg class="icon" width="14" height="14" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.5"/><path d="M12 8v4l3 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  Dato pendiente de cliente
</span>
```

---

## 7 · Placeholder de imagen honesto (`.media-pending`)

NUNCA un `<img>` a stock de moda ni render falso. Retícula blueprint + etiqueta honesta.

```html
<figure class="media-pending" role="img" aria-label="Foto real del taller, pendiente de sesión en Alboraya">
  <figcaption class="media-label">
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="1" stroke="currentColor" stroke-width="1.5"/><circle cx="9" cy="10" r="2" stroke="currentColor" stroke-width="1.5"/><path d="M3 17l5-4 4 3 3-2 6 5" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/></svg>
    Foto real del taller — pendiente sesión Alboraya
  </figcaption>
</figure>
```

Variante para secciones oscuras (hero/proceso): añade `media-pending--dark`.

```html
<figure class="media-pending media-pending--dark" role="img" aria-label="Pieza marcada real, pendiente de sesión">
  <figcaption class="media-label">… Foto real del taller — pendiente sesión Alboraya</figcaption>
</figure>
```

---

## 8 · Stat / trust signal numérico

```html
<div class="cluster" style="gap: var(--sp-8)">
  <div class="stat">
    <span class="stat-value"><span class="accent">+</span>30</span>
    <span class="stat-label">Años de oficio</span>
  </div>
  <div class="stat">
    <span class="stat-value">12</span>
    <span class="stat-label">Técnicas bajo un techo</span>
  </div>
  <div class="stat">
    <span class="stat-value">Alboraya</span>
    <span class="stat-label">Valencia · taller propio</span>
  </div>
</div>
```

> Solo hechos verificados: +30 años, 12 técnicas, Alboraya. Nada de "X clientes" o
> "Y% satisfacción" sin fuente.

---

## 9 · WhatsApp sticky (móvil) + atajo de urgencias

Visible solo en móvil (lo controla el CSS). Atajo permanente para plazos críticos.

```html
<a class="whatsapp-sticky" href="https://wa.me/34961860275" aria-label="Escríbenos por WhatsApp">
  <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 20l1.4-4A8 8 0 1 1 9 18.6L4 20z" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round"/><path d="M9 10c0 3 2 5 5 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
  WhatsApp
</a>
```

> Teléfono real verificado: +34 96 186 02 75 → formato wa.me `34961860275`.

---

## 10 · Paso de RFQ (formulario multipaso)

Barra de progreso + chips multi-técnica + campos + zona de subida de plano. 3-4 pasos.

```html
<div class="rfq-step">
  <p class="rfq-progress-label">Paso 1 de 4</p>
  <div class="rfq-progress" role="progressbar" aria-valuenow="1" aria-valuemin="1" aria-valuemax="4">
    <span class="step is-active"></span>
    <span class="step"></span>
    <span class="step"></span>
    <span class="step"></span>
  </div>

  <span class="eyebrow">¿Qué necesitas marcar?</span>
  <h3>Elige una o varias técnicas</h3>

  <div class="cluster" style="margin-top: var(--sp-4)">
    <label class="chip"><input type="checkbox" name="tecnica" value="tampografia"> Tampografía</label>
    <label class="chip"><input type="checkbox" name="tecnica" value="laser"> Láser</label>
    <label class="chip"><input type="checkbox" name="tecnica" value="serigrafia-cilindrica"> Serigrafía cilíndrica</label>
    <label class="chip"><input type="checkbox" name="tecnica" value="serigrafia-textil"> Serigrafía textil / EPI</label>
    <label class="chip"><input type="checkbox" name="tecnica" value="senaletica"> Señalética técnica</label>
    <label class="chip"><input type="checkbox" name="tecnica" value="no-lo-se"> No lo sé, asesoradme</label>
  </div>

  <div class="field" style="margin-top: var(--sp-5)">
    <label for="desc">Describe brevemente la pieza o el trabajo</label>
    <textarea id="desc" name="descripcion" placeholder="Ej.: marcaje de número de serie sobre carcasa de ABS, serie recurrente"></textarea>
  </div>

  <div class="between" style="margin-top: var(--sp-6)">
    <a class="btn btn-ghost" href="/contacto">Prefiero hablar con un técnico</a>
    <button class="btn btn-safety" type="button">Siguiente</button>
  </div>
</div>
```

Paso 2 incluye la zona de subida de plano/artwork (decisiva en industrial):

```html
<div class="field">
  <label for="plano">Sube tu plano o artwork (opcional)</label>
  <label class="dropzone" for="plano">
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M12 16V4m0 0L8 8m4-4l4 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M4 16v3a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/></svg>
    Arrastra aquí PDF, AI, PNG o DXF — o pulsa para seleccionar
    <input id="plano" type="file" accept=".pdf,.ai,.png,.dxf" multiple hidden>
  </label>
</div>
```

> Validación Zod en servidor, rate-limit del endpoint, anti-spam honeypot + timing
> (sin captcha agresivo). Datos personales (nombre, empresa, email, teléfono) solo en
> el paso 3, ≤5 campos.

---

## 11 · Footer (datos reales verificados)

Solo hechos confirmados del taller. Incluye gestión ambiental verificable.

```html
<footer class="site-footer">
  <div class="container">
    <div class="footer-grid">
      <div>
        <a class="brand" href="/" style="color: var(--ink-on-dark)">
          Serigrafía Duato
          <span class="brand-sub" style="color: var(--steel-on-dark)">Marcaje industrial</span>
        </a>
        <p class="text-sm" style="margin-top: var(--sp-4); max-width: 42ch; color: var(--steel-on-dark)">
          Taller de marcaje industrial multitécnica en Alboraya (Valencia).
          12 técnicas bajo un techo, más de 30 años de oficio.
        </p>
        <p class="text-sm" style="margin-top: var(--sp-4); color: var(--steel-on-dark)">
          Tratamiento de aguas en circuito cerrado. Partner de reciclaje RECICLAMAS.
        </p>
      </div>

      <div>
        <h4>Contacto</h4>
        <address class="footer-data" style="font-style: normal">
          Camino del Mar 36<br>
          46120 Alboraya · Valencia<br>
          <a href="tel:+34961860275">+34 96 186 02 75</a><br>
          <a href="mailto:info@serigrafiaduato.es">info@serigrafiaduato.es</a>
        </address>
      </div>

      <div>
        <h4>Capacidades</h4>
        <ul class="stack" style="--sp-4: 8px">
          <li><a href="/marcaje-piezas-componentes">Piezas y componentes</a></li>
          <li><a href="/marcaje-trazabilidad-industrial">Trazabilidad industrial</a></li>
          <li><a href="/marcaje-cilindrico-envases">Envases y cilíndrico</a></li>
          <li><a href="/ropa-laboral-epi-empresa">Ropa laboral y EPI</a></li>
          <li><a href="/capacidades/tampografia">Todas las técnicas</a></li>
        </ul>
      </div>
    </div>

    <div class="footer-bottom">
      <span>© <span class="mono">2026</span> Serigrafía Duato S.L.</span>
      <nav class="footer-legal" aria-label="Legal">
        <a href="/legal/aviso">Aviso legal</a>
        <a href="/legal/privacidad">Privacidad</a>
        <a href="/legal/cookies">Cookies</a>
      </nav>
    </div>
  </div>
</footer>
```

> Datos verificados: Alboraya · Camino del Mar 36 · +34 96 186 02 75 ·
> info@serigrafiaduato.es · circuito cerrado de aguas · RECICLAMAS.
> El año del © se mantiene **vivo** (2026), nunca congelado.

---

## 12 · Sección oscura con retícula de plano (hero / proceso)

```html
<section class="section section--dark blueprint-bg">
  <div class="container">
    <span class="eyebrow">Marcaje industrial · Valencia</span>
    <h1>Marcamos tus piezas, series y envases. Y la reposición sale idéntica a la primera.</h1>
    <p class="lead">12 técnicas bajo un techo en Alboraya, más de 30 años de oficio. Un solo taller para todo el marcaje de tu planta.</p>
    <div class="cluster" style="margin-top: var(--sp-6)">
      <a class="btn btn-safety" href="/presupuesto">Pedir presupuesto</a>
      <a class="btn btn-ghost" href="/contacto">Hablar con un técnico</a>
    </div>
  </div>
</section>
```

---

## Reglas de uso (resumen)

- Naranja (`--safety`) solo en CTA / dato clave / alerta. Si una pantalla tiene más de un
  bloque grande en naranja, está mal: reduce.
- Todo número (m², plazo, lote, serie, técnica×material, teléfono, año) en `.mono` /
  `.data` / `td.num`.
- Cero emojis. Iconos SVG lineales inline, stroke 1.5, `aria-hidden="true"`.
- Toda cifra pública lleva `.disclaimer` "estimación orientativa, sujeta a brief".
- Imágenes: `.media-pending` con etiqueta honesta hasta sesión real. Nunca stock/render.
- Español peninsular: ñ, tildes, ¿¡, raya —. Cero latinoamericanismos.
