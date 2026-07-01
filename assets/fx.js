/* ============================================================================
   SERIGRAFÍA DUATO · v4 · MOTOR FX (sin librerías, performante, a11y-safe)
============================================================================ */
(function () {
  'use strict';
  var RM = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Data-matrix: construir celdas (grafismo de marcaje) ---------- */
  // <div class="datamatrix" data-cols="7" data-rows="7"></div>
  document.querySelectorAll('.datamatrix').forEach(function (dm) {
    var cols = parseInt(dm.getAttribute('data-cols') || '7', 10);
    var rows = parseInt(dm.getAttribute('data-rows') || '7', 10);
    dm.style.gridTemplateColumns = 'repeat(' + cols + ', var(--dm, 10px))';
    // patrón pseudo-aleatorio pero estable (sin Math.random para consistencia)
    var seed = cols * 31 + rows * 17;
    for (var i = 0; i < cols * rows; i++) {
      var c = document.createElement('span');
      c.className = 'dm-cell';
      var v = ((i * 1103515245 + seed) >> 4) & 7;      // hash barato
      // marco tipo DataMatrix: bordes izq/inf sólidos
      var col = i % cols, row = (i / cols) | 0;
      var frame = (col === 0) || (row === rows - 1);
      if (frame) c.classList.add('on');
      else if (v > 3) c.classList.add('on');
      else c.classList.add('off');
      if (v === 7 && !frame) c.classList.add('accent');
      c.style.transitionDelay = (i % cols + row) * 22 + 'ms';
      dm.appendChild(c);
    }
  });

  /* ---------- Ticker: clonar contenido para bucle continuo ---------- */
  document.querySelectorAll('.ticker .ticker-track').forEach(function (tr) {
    tr.innerHTML = tr.innerHTML + tr.innerHTML;   // duplica para -50% seamless
  });

  /* ---------- Revelados: [data-fx] y [data-fx-stagger] ---------- */
  var revealEls = [].slice.call(document.querySelectorAll('[data-fx], [data-fx-stagger]'));
  if (RM || !('IntersectionObserver' in window)) {
    revealEls.forEach(function (el) { el.classList.add('fx-in'); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        var delay = parseFloat(el.getAttribute('data-fx-delay') || '0');
        if (delay) el.style.transitionDelay = delay + 'ms';
        el.classList.add('fx-in');
        ro.unobserve(el);
      });
    }, { threshold: 0.14, rootMargin: '0px 0px -6% 0px' });
    revealEls.forEach(function (el) { ro.observe(el); });
  }

  /* ---------- Contadores [data-count] ---------- */
  function animateCount(el) {
    var target = parseFloat(el.getAttribute('data-count'));
    var prefix = el.getAttribute('data-prefix') || '';
    var suffix = el.getAttribute('data-suffix') || '';
    var dur = 1100, t0 = null;
    if (RM) { el.textContent = prefix + target + suffix; return; }
    function tick(t) {
      if (t0 === null) t0 = t;
      var p = Math.min((t - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);            // easeOutCubic
      var val = Math.round(target * eased);
      el.textContent = prefix + val + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = [].slice.call(document.querySelectorAll('[data-count]'));
  if (counters.length) {
    if (!('IntersectionObserver' in window)) { counters.forEach(animateCount); }
    else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { animateCount(e.target); co.unobserve(e.target); } });
      }, { threshold: 0.6 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }

  /* ---------- Parallax sutil [data-parallax] (transform, rAF) ---------- */
  var pxEls = [].slice.call(document.querySelectorAll('[data-parallax]'));
  if (!RM && pxEls.length && !matchMedia('(hover: none)').matches) {
    var ticking = false;
    function onScroll() {
      if (ticking) return; ticking = true;
      requestAnimationFrame(function () {
        var vh = window.innerHeight;
        pxEls.forEach(function (el) {
          var r = el.getBoundingClientRect();
          if (r.bottom < 0 || r.top > vh) return;
          var speed = parseFloat(el.getAttribute('data-parallax')) || 0.12;
          var mid = r.top + r.height / 2 - vh / 2;
          el.style.transform = 'translate3d(0,' + (-mid * speed).toFixed(1) + 'px,0)';
        });
        ticking = false;
      });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();
  }

  /* ---------- Vídeo b-roll: play/pause según viewport (ahorra CPU) ---------- */
  var vids = [].slice.call(document.querySelectorAll('.media video[data-autoplay]'));
  if (vids.length) {
    if (RM) {
      // Movimiento reducido: no autoreproducir; mostrar primer fotograma (poster)
      vids.forEach(function (v) { v.removeAttribute('autoplay'); try { v.pause(); } catch (e) {} });
    } else if ('IntersectionObserver' in window) {
      var vo = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) {
          var v = e.target;
          if (e.isIntersecting) { var p = v.play(); if (p && p.catch) p.catch(function () {}); }
          else { try { v.pause(); } catch (err) {} }
        });
      }, { threshold: 0.25 });
      vids.forEach(function (v) { vo.observe(v); });
    }
  }

  /* ---------- Hero slider (crossfade, autoplay pausable, teclado) ---------- */
  var hs = document.querySelector('.hero-slider');
  if (hs) {
    var slides = [].slice.call(hs.querySelectorAll('.hero-slide'));
    var dots = [].slice.call(hs.querySelectorAll('.hs-dot'));
    var prev = hs.querySelector('.hs-prev');
    var next = hs.querySelector('.hs-next');
    var idx = 0, timer = null, DUR = 6000;
    function show(n) {
      idx = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        var on = k === idx;
        s.classList.toggle('is-active', on);
        s.setAttribute('aria-hidden', String(!on));
      });
      dots.forEach(function (d, k) {
        var on = k === idx;
        d.classList.toggle('is-active', on);
        d.setAttribute('aria-selected', String(on));
      });
    }
    function stop() { if (timer) { clearInterval(timer); timer = null; } }
    function start() { if (RM) return; stop(); timer = setInterval(function () { show(idx + 1); }, DUR); }
    function go(n) { show(n); start(); }
    if (next) next.addEventListener('click', function () { go(idx + 1); });
    if (prev) prev.addEventListener('click', function () { go(idx - 1); });
    dots.forEach(function (d, k) { d.addEventListener('click', function () { go(k); }); });
    hs.addEventListener('mouseenter', stop);
    hs.addEventListener('mouseleave', start);
    hs.addEventListener('focusin', stop);
    hs.addEventListener('focusout', start);
    hs.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { go(idx + 1); }
      else if (e.key === 'ArrowLeft') { go(idx - 1); }
    });
    document.addEventListener('visibilitychange', function () { document.hidden ? stop() : start(); });
    show(0); start();
  }

  /* ---------- PACK FIRMA (1+2+4): titulares que se imprimen ---------- */
  var titles = [].slice.call(document.querySelectorAll('main h2'));
  if (titles.length) {
    if (RM || !('IntersectionObserver' in window)) {
      titles.forEach(function (h) { h.classList.add('print-in', 'printed'); });
    } else {
      var to = new IntersectionObserver(function (entries) {
        entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('printed'); to.unobserve(e.target); } });
      }, { threshold: 0.55 });
      titles.forEach(function (h) { h.classList.add('print-in'); to.observe(h); });
    }
  }

  /* ---------- PACK FIRMA (7): gota de progreso de scroll ---------- */
  var ink = document.createElement('div');
  ink.className = 'ink-progress'; ink.setAttribute('aria-hidden', 'true');
  document.body.appendChild(ink);
  var inkTick = false;
  function inkUpdate() {
    if (inkTick) return; inkTick = true;
    requestAnimationFrame(function () {
      var d = document.documentElement;
      var max = d.scrollHeight - d.clientHeight;
      var p = max > 0 ? (d.scrollTop / max * 100) : 0;
      ink.style.setProperty('--scroll', p.toFixed(1));
      inkTick = false;
    });
  }
  window.addEventListener('scroll', inkUpdate, { passive: true });
  window.addEventListener('resize', inkUpdate, { passive: true });
  inkUpdate();

  /* ---------- PACK FIRMA (8): botones que estampan ---------- */
  if (!RM) document.addEventListener('click', function (e) {
    var b = e.target.closest('.btn');
    if (!b) return;
    b.classList.remove('stamped'); void b.offsetWidth; b.classList.add('stamped');
    setTimeout(function () { b.classList.remove('stamped'); }, 340);
  });

  /* ---------- Spotlight en secciones oscuras ---------- */
  if (!RM) document.querySelectorAll('.spotlight').forEach(function (s) {
    s.addEventListener('pointermove', function (e) {
      var r = s.getBoundingClientRect();
      s.style.setProperty('--mx', ((e.clientX - r.left) / r.width * 100) + '%');
      s.style.setProperty('--my', ((e.clientY - r.top) / r.height * 100) + '%');
      s.classList.add('is-live');
    });
    s.addEventListener('pointerleave', function () { s.classList.remove('is-live'); });
  });
})();
