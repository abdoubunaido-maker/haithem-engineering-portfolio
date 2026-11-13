/* ==========================================================================
   Portfolio behaviour — vanilla JS, no dependencies.
   Charts are rendered from data transcribed from the project reports.
   ========================================================================== */
(function () {
  'use strict';

  /* ---------------- Theme ---------------- */
  var root = document.documentElement;
  var stored = null;
  try { stored = localStorage.getItem('hb-theme'); } catch (e) {}
  if (stored === 'light' || stored === 'dark') root.setAttribute('data-theme', stored);

  function syncThemeIcon() {
    var btn = document.getElementById('themeBtn');
    if (!btn) return;
    var light = root.getAttribute('data-theme') === 'light';
    btn.setAttribute('aria-label', light ? 'Switch to dark theme' : 'Switch to light theme');
    btn.innerHTML = light
      ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z"/></svg>'
      : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2v2M12 20v2M2 12h2M20 12h2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M19.1 4.9l-1.4 1.4M6.3 17.7l-1.4 1.4"/></svg>';
  }

  document.addEventListener('click', function (ev) {
    var t = ev.target.closest('#themeBtn');
    if (!t) return;
    var next = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    root.setAttribute('data-theme', next);
    try { localStorage.setItem('hb-theme', next); } catch (e) {}
    syncThemeIcon();
    document.dispatchEvent(new Event('hb:theme'));
  });
  syncThemeIcon();

  /* ---------------- Mobile nav ---------------- */
  var navToggle = document.getElementById('navToggle');
  var navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var open = navLinks.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(open));
    });
    navLinks.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        navLinks.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------------- In-page navigation state ---------------- */
  var sectionLinks = Array.prototype.slice.call(document.querySelectorAll('.nav-links a[href^="#"]'));
  if (sectionLinks.length && 'IntersectionObserver' in window) {
    var navTargets = sectionLinks.map(function (link) {
      return { link: link, section: document.getElementById(link.getAttribute('href').slice(1)) };
    }).filter(function (item) { return !!item.section; });
    if (navTargets.length) {
      var navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navTargets.forEach(function (item) {
            var active = item.section === entry.target;
            item.link.classList.toggle('is-active', active);
            if (active) item.link.setAttribute('aria-current', 'location');
            else if (item.link.getAttribute('aria-current') === 'location') item.link.removeAttribute('aria-current');
          });
        });
      }, { rootMargin: '-22% 0px -66% 0px', threshold: 0 });
      navTargets.forEach(function (item) { navObserver.observe(item.section); });
    }
  }

  /* ---------------- Lightbox ---------------- */
  var media = Array.prototype.slice.call(document.querySelectorAll('.figure-media'));
  if (media.length) {
    var lb = document.createElement('div');
    lb.className = 'lightbox';
    lb.setAttribute('role', 'dialog');
    lb.setAttribute('aria-modal', 'true');
    lb.setAttribute('aria-label', 'Figure viewer');
    lb.innerHTML =
      '<button class="lb-close" aria-label="Close figure viewer">&times;</button>' +
      '<button class="lb-nav lb-prev" aria-label="Previous figure">&#8249;</button>' +
      '<button class="lb-nav lb-next" aria-label="Next figure">&#8250;</button>' +
      '<figure><img alt=""><figcaption></figcaption></figure>';
    document.body.appendChild(lb);

    var lbImg = lb.querySelector('img');
    var lbCap = lb.querySelector('figcaption');
    var idx = 0;
    var lastFocus = null;

    function show(i) {
      idx = (i + media.length) % media.length;
      var host = media[idx];
      var img = host.querySelector('img');
      var fig = host.closest('figure');
      var cap = fig ? fig.querySelector('figcaption') : null;
      lbImg.src = img.getAttribute('src');
      lbImg.alt = img.getAttribute('alt') || '';
      lbCap.textContent = cap ? cap.textContent.trim() : (img.getAttribute('alt') || '');
    }
    function open(i) {
      lastFocus = document.activeElement;
      show(i);
      lb.classList.add('open');
      document.body.style.overflow = 'hidden';
      lb.querySelector('.lb-close').focus();
    }
    function close() {
      lb.classList.remove('open');
      document.body.style.overflow = '';
      if (lastFocus) lastFocus.focus();
    }

    media.forEach(function (m, i) {
      m.setAttribute('tabindex', '0');
      m.setAttribute('role', 'button');
      m.setAttribute('aria-label', 'Enlarge figure');
      m.addEventListener('click', function () { open(i); });
      m.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    lb.querySelector('.lb-close').addEventListener('click', close);
    lb.querySelector('.lb-prev').addEventListener('click', function () { show(idx - 1); });
    lb.querySelector('.lb-next').addEventListener('click', function () { show(idx + 1); });
    lb.addEventListener('click', function (e) { if (e.target === lb) close(); });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------------- TOC scroll-spy ---------------- */
  var tocLinks = Array.prototype.slice.call(document.querySelectorAll('.toc a'));
  if (tocLinks.length && 'IntersectionObserver' in window) {
    var map = {};
    tocLinks.forEach(function (a) {
      var id = a.getAttribute('href').slice(1);
      var sec = document.getElementById(id);
      if (sec) map[id] = a;
    });
    var visible = {};
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { visible[en.target.id] = en.isIntersecting ? en.intersectionRatio : 0; });
      var best = null, bestVal = 0;
      Object.keys(visible).forEach(function (k) {
        if (visible[k] > bestVal) { bestVal = visible[k]; best = k; }
      });
      tocLinks.forEach(function (a) { a.classList.remove('active'); });
      if (best && map[best]) map[best].classList.add('active');
    }, { rootMargin: '-80px 0px -62% 0px', threshold: [0, .15, .4, .75, 1] });
    Object.keys(map).forEach(function (id) { obs.observe(document.getElementById(id)); });
  }

  /* ---------------- SVG helpers ---------------- */
  var NS = 'http://www.w3.org/2000/svg';
  function s(tag, attrs, text) {
    var n = document.createElementNS(NS, tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  }
  function css(name) {
    return getComputedStyle(root).getPropertyValue(name).trim() || '#888';
  }
  function clear(node) { while (node.firstChild) node.removeChild(node.firstChild); }

  /* ======================================================================
     Formula Student — full-vehicle configuration comparison
     Source: report Tables 10 and 12 (CFD coefficients, OptimumLap lap times).
     ====================================================================== */
  var FS_CONFIGS = [
    { name: 'Baseline',  cl: 0.005, cd: 0.645, ld: 0.00, lap: 86.71, lat: 14.7 },
    { name: 'Wings',     cl: 2.69,  cd: 1.73,  ld: 1.56, lap: 85.06, lat: 16.6 },
    { name: 'Full aero', cl: 3.35,  cd: 1.70,  ld: 1.97, lap: 84.59, lat: 17.0 }
  ];

  var fsChart = document.getElementById('fsChart');
  if (fsChart) {
    var FS_METRICS = {
      cl:  { key: 'cl',  label: 'Downforce coefficient  C_L', unit: '',      max: 3.8,  fmt: function (v) { return v < 0.1 ? v.toFixed(3) : v.toFixed(2); } },
      cd:  { key: 'cd',  label: 'Drag coefficient  C_D',      unit: '',      max: 2.0,  fmt: function (v) { return v.toFixed(2); } },
      ld:  { key: 'ld',  label: 'Efficiency  C_L / C_D',      unit: '',      max: 2.3,  fmt: function (v) { return v.toFixed(2); } },
      lap: { key: 'lap', label: 'Simulated lap time',         unit: ' s',    max: 90,   fmt: function (v) { return v.toFixed(2); }, baseline: 80 }
    };
    var fsMetric = 'cl';

    function drawFS() {
      var m = FS_METRICS[fsMetric];
      var W = 620, H = 250, padL = 46, padR = 16, padT = 26, padB = 46;
      var iw = W - padL - padR, ih = H - padT - padB;
      var lo = m.baseline || 0, hi = m.max;
      clear(fsChart);
      fsChart.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      for (var g = 0; g <= 4; g++) {
        var val = lo + (hi - lo) * g / 4;
        var y = padT + ih - ih * g / 4;
        fsChart.appendChild(s('line', { x1: padL, y1: y, x2: W - padR, y2: y, class: 'grid-line' }));
        fsChart.appendChild(s('text', { x: padL - 8, y: y + 3.5, 'text-anchor': 'end' }, m.fmt(val)));
      }
      fsChart.appendChild(s('text', { x: padL, y: 14, class: 'axis-label' }, m.label + (m.unit ? ' [' + m.unit.trim() + ']' : '')));

      var bw = iw / FS_CONFIGS.length;
      var colors = [css('--muted-2'), css('--accent-2'), css('--accent')];
      FS_CONFIGS.forEach(function (c, i) {
        var v = c[m.key];
        var h = Math.max(1.5, ih * (v - lo) / (hi - lo));
        var x = padL + bw * i + bw * 0.24;
        var w = bw * 0.52;
        var y = padT + ih - h;
        var r = s('rect', { x: x, y: y, width: w, height: h, rx: 5, fill: colors[i], opacity: .92 });
        r.appendChild(s('title', null, c.name + ': ' + m.fmt(v) + m.unit));
        fsChart.appendChild(r);
        fsChart.appendChild(s('text', { x: x + w / 2, y: y - 7, 'text-anchor': 'middle', class: 'bar-label' }, m.fmt(v) + m.unit));
        fsChart.appendChild(s('text', { x: x + w / 2, y: padT + ih + 18, 'text-anchor': 'middle' }, c.name));
      });
      fsChart.appendChild(s('line', { x1: padL, y1: padT + ih, x2: W - padR, y2: padT + ih, class: 'axis-line' }));

      var note = document.getElementById('fsChartNote');
      if (note) {
        var texts = {
          cl: 'Downforce rises from essentially zero to C_L = 3.35. The underbody devices add about 25% on top of the wings.',
          cd: 'The wings cost a large drag penalty (0.645 \u2192 1.73). The underbody devices then add downforce at essentially no extra drag.',
          ld: 'Efficiency improves from 1.56 to 1.97 once the side diffusers and underbody walls are fitted \u2014 the cheaper place to find downforce.',
          lap: 'OptimumLap, FSG 2012 endurance. Total gain 2.12 s (2.4%). Bars are truncated at 80 s to make the differences visible.'
        };
        note.textContent = texts[fsMetric];
      }
    }

    document.querySelectorAll('[data-fs-metric]').forEach(function (b) {
      b.addEventListener('click', function () {
        fsMetric = b.getAttribute('data-fs-metric');
        document.querySelectorAll('[data-fs-metric]').forEach(function (o) {
          o.setAttribute('aria-pressed', String(o === b));
        });
        drawFS();
      });
    });
    drawFS();
    document.addEventListener('hb:theme', drawFS);
  }

  /* ======================================================================
     Formula Student — 2D CFD design space
     Source: report Tables 4, 5, 6 (27 ANSYS Fluent runs).
     NOTE: Table 6 config 9 repeats Table 5 config 9 in the source report;
     it is flagged below rather than silently corrected.
     ====================================================================== */
  var RUNS = [
    [350,1,25,55,10.24,309.4,5.637,0.1865,30.2],
    [350,2,25,60,10.41,318.9,5.810,0.1896,30.6],
    [350,3,25,65,10.74,325.0,5.920,0.1957,30.3],
    [350,4,30,55,12.09,267.4,4.873,0.2202,22.1],
    [350,5,30,60,15.32,251.6,4.584,0.2791,16.4],
    [350,6,30,65,11.84,303.8,5.536,0.2157,25.7],
    [350,7,35,55,12.07,281.4,5.128,0.2200,23.3],
    [350,8,35,60,16.04,266.2,4.851,0.2923,16.6],
    [350,9,35,65,15.36,257.3,4.688,0.2798,16.8],
    [400,1,25,55,10.24,341.8,5.450,0.1612,33.8],
    [400,2,25,60,10.40,336.7,5.368,0.1658,32.4],
    [400,3,25,65,11.00,346.3,5.521,0.1754,31.5],
    [400,4,30,55,10.32,339.3,5.410,0.1646,32.9],
    [400,5,30,60,11.44,320.2,5.106,0.1823,28.0],
    [400,6,30,65,11.72,345.1,5.536,0.1869,29.6],
    [400,7,35,55,12.96,286.8,4.573,0.2066,22.1],
    [400,8,35,60,13.30,292.0,4.655,0.2120,22.0],
    [400,9,35,65,14.10,297.3,4.740,0.2247,21.1],
    [450,1,25,55,9.81,341.8,4.922,0.1391,35.4],
    [450,2,25,60,10.43,359.9,5.120,0.1478,34.6],
    [450,3,25,65,11.22,378.9,5.369,0.1591,33.8],
    [450,4,30,55,10.44,359.8,5.099,0.1480,34.5],
    [450,5,30,60,11.34,353.2,5.005,0.1607,31.1],
    [450,6,30,65,11.59,373.0,5.286,0.1643,32.2],
    [450,7,35,55,12.11,323.1,5.152,0.1930,26.7],
    [450,8,35,60,12.19,339.7,5.416,0.1943,27.9],
    [450,9,35,65,14.10,297.3,4.740,0.2247,21.1]
  ].map(function (r) {
    return {
      chord: r[0], cfg: r[1], aF1: r[2], aF2: r[3],
      drag: r[4], down: r[5], cl: r[6], cd: r[7], ld: r[8],
      flagged: (r[0] === 450 && r[1] === 9)
    };
  });

  var scatter = document.getElementById('designScatter');
  if (scatter) {
    var chordFilter = 'all';
    var tip = document.getElementById('scatterTip');

    function drawScatter() {
      var W = 620, H = 320, padL = 52, padR = 18, padT = 24, padB = 48;
      var iw = W - padL - padR, ih = H - padT - padB;
      var xMin = 240, xMax = 390, yMin = 14, yMax = 38;
      clear(scatter);
      scatter.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      function X(v) { return padL + iw * (v - xMin) / (xMax - xMin); }
      function Y(v) { return padT + ih - ih * (v - yMin) / (yMax - yMin); }

      for (var gy = yMin; gy <= yMax; gy += 4) {
        scatter.appendChild(s('line', { x1: padL, y1: Y(gy), x2: W - padR, y2: Y(gy), class: 'grid-line' }));
        scatter.appendChild(s('text', { x: padL - 8, y: Y(gy) + 3.5, 'text-anchor': 'end' }, String(gy)));
      }
      for (var gx = 250; gx <= xMax; gx += 25) {
        scatter.appendChild(s('line', { x1: X(gx), y1: padT, x2: X(gx), y2: padT + ih, class: 'grid-line' }));
        scatter.appendChild(s('text', { x: X(gx), y: padT + ih + 17, 'text-anchor': 'middle' }, String(gx)));
      }
      scatter.appendChild(s('text', { x: padL + iw / 2, y: H - 8, 'text-anchor': 'middle', class: 'axis-label' }, 'Downforce per unit span [N]'));
      scatter.appendChild(s('text', { x: 12, y: padT + ih / 2, class: 'axis-label', transform: 'rotate(-90 12 ' + (padT + ih / 2) + ')', 'text-anchor': 'middle' }, 'C_L / C_D'));
      scatter.appendChild(s('line', { x1: padL, y1: padT + ih, x2: W - padR, y2: padT + ih, class: 'axis-line' }));
      scatter.appendChild(s('line', { x1: padL, y1: padT, x2: padL, y2: padT + ih, class: 'axis-line' }));

      var palette = { 350: css('--danger'), 400: css('--accent-2'), 450: css('--accent') };
      RUNS.forEach(function (r) {
        var on = chordFilter === 'all' || String(r.chord) === chordFilter;
        var c = s('circle', {
          cx: X(r.down), cy: Y(r.ld), r: on ? 6 : 3.5,
          fill: palette[r.chord], opacity: on ? .9 : .16,
          stroke: r.flagged ? css('--warn') : 'none',
          'stroke-width': r.flagged ? 2 : 0,
          style: 'cursor:pointer'
        });
        c.appendChild(s('title', null,
          'C = ' + r.chord + ' mm \u00b7 config ' + r.cfg +
          '\n\u03b1F1 = ' + r.aF1 + '\u00b0, \u03b1F2 = ' + r.aF2 + '\u00b0' +
          '\nDownforce ' + r.down.toFixed(1) + ' N \u00b7 Drag ' + r.drag.toFixed(2) + ' N' +
          '\nC_L = ' + r.cl.toFixed(3) + ' \u00b7 C_D = ' + r.cd.toFixed(4) + ' \u00b7 C_L/C_D = ' + r.ld.toFixed(1) +
          (r.flagged ? '\n\u26a0 Repeats Table 5 config 9 in the source report' : '')
        ));
        function info() {
          if (!tip) return;
          tip.innerHTML = '<strong>c = ' + r.chord + ' mm · config ' + r.cfg + '</strong> · α<sub>F1</sub> ' + r.aF1 + '° / α<sub>F2</sub> ' + r.aF2 +
            '° — downforce <strong>' + r.down.toFixed(1) + ' N</strong>, drag ' + r.drag.toFixed(2) + ' N, C<sub>L</sub>/C<sub>D</sub> <strong>' +
            r.ld.toFixed(1) + '</strong>' + (r.flagged ? ' <span style="color:var(--warn)">⚠ duplicate row in source</span>' : '');
        }
        c.addEventListener('mouseenter', info);
        c.addEventListener('focus', info);
        c.setAttribute('tabindex', on ? '0' : '-1');
        scatter.appendChild(c);
      });

      var best = RUNS.filter(function (r) { return r.chord === 450 && r.cfg === 3; })[0];
      scatter.appendChild(s('circle', { cx: X(best.down), cy: Y(best.ld), r: 11, fill: 'none', stroke: css('--accent'), 'stroke-width': 1.5, 'stroke-dasharray': '3 3' }));
    }

    document.querySelectorAll('[data-chord]').forEach(function (b) {
      b.addEventListener('click', function () {
        chordFilter = b.getAttribute('data-chord');
        document.querySelectorAll('[data-chord]').forEach(function (o) {
          o.setAttribute('aria-pressed', String(o === b));
        });
        drawScatter();
      });
    });
    drawScatter();
    document.addEventListener('hb:theme', drawScatter);
  }

  /* ======================================================================
     Riyah — classical actuator-disk (momentum) theory illustration.
     Cp = 4a(1-a)^2 ; Ct = 4a(1-a). Exact 1-D momentum theory, valid for
     a < ~0.4. This is a teaching illustration of the method Riyah builds on,
     NOT output from the application.
     ====================================================================== */
  var mom = document.getElementById('momentumChart');
  if (mom) {
    var slider = document.getElementById('inductionSlider');
    var outA = document.getElementById('outA');
    var outCp = document.getElementById('outCp');
    var outCt = document.getElementById('outCt');

    function cp(a) { return 4 * a * Math.pow(1 - a, 2); }
    function ct(a) { return 4 * a * (1 - a); }

    function drawMom() {
      var a = slider ? parseFloat(slider.value) : 1 / 3;
      var W = 620, H = 300, padL = 48, padR = 18, padT = 22, padB = 46;
      var iw = W - padL - padR, ih = H - padT - padB;
      var aMax = 0.5, yMax = 1.05;
      clear(mom);
      mom.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

      function X(v) { return padL + iw * v / aMax; }
      function Y(v) { return padT + ih - ih * v / yMax; }

      for (var gy = 0; gy <= 1; gy += 0.25) {
        mom.appendChild(s('line', { x1: padL, y1: Y(gy), x2: W - padR, y2: Y(gy), class: 'grid-line' }));
        mom.appendChild(s('text', { x: padL - 8, y: Y(gy) + 3.5, 'text-anchor': 'end' }, gy.toFixed(2)));
      }
      for (var gx = 0; gx <= aMax + 1e-9; gx += 0.1) {
        mom.appendChild(s('text', { x: X(gx), y: padT + ih + 17, 'text-anchor': 'middle' }, gx.toFixed(1)));
      }
      mom.appendChild(s('text', { x: padL + iw / 2, y: H - 8, 'text-anchor': 'middle', class: 'axis-label' }, 'Axial induction factor  a'));
      mom.appendChild(s('line', { x1: padL, y1: padT + ih, x2: W - padR, y2: padT + ih, class: 'axis-line' }));
      mom.appendChild(s('line', { x1: padL, y1: padT, x2: padL, y2: padT + ih, class: 'axis-line' }));

      // Momentum-theory validity shading (a > 0.4)
      mom.appendChild(s('rect', { x: X(0.4), y: padT, width: X(0.5) - X(0.4), height: ih, fill: css('--warn'), opacity: .07 }));
      mom.appendChild(s('text', { x: X(0.45), y: padT + 14, 'text-anchor': 'middle', fill: css('--warn'), 'font-size': 9 }, 'empirical'));

      function path(fn, color) {
        var d = '';
        for (var i = 0; i <= 200; i++) {
          var av = aMax * i / 200;
          d += (i ? 'L' : 'M') + X(av).toFixed(2) + ' ' + Y(fn(av)).toFixed(2) + ' ';
        }
        mom.appendChild(s('path', { d: d, fill: 'none', stroke: color, 'stroke-width': 2.2, 'stroke-linejoin': 'round' }));
      }
      path(ct, css('--accent-2'));
      path(cp, css('--accent'));

      // Betz limit
      var betz = 16 / 27;
      mom.appendChild(s('line', { x1: X(1 / 3), y1: Y(betz), x2: X(1 / 3), y2: padT + ih, stroke: css('--muted-2'), 'stroke-width': 1, 'stroke-dasharray': '4 3' }));
      mom.appendChild(s('line', { x1: padL, y1: Y(betz), x2: X(1 / 3), y2: Y(betz), stroke: css('--muted-2'), 'stroke-width': 1, 'stroke-dasharray': '4 3' }));
      mom.appendChild(s('circle', { cx: X(1 / 3), cy: Y(betz), r: 4, fill: css('--muted') }));
      mom.appendChild(s('text', { x: X(1 / 3) + 8, y: Y(betz) - 8, fill: css('--muted'), 'font-size': 10 }, 'Betz limit 16/27 \u2248 0.593'));

      // Operating marker
      mom.appendChild(s('line', { x1: X(a), y1: padT, x2: X(a), y2: padT + ih, stroke: css('--accent'), 'stroke-width': 1, opacity: .45 }));
      mom.appendChild(s('circle', { cx: X(a), cy: Y(cp(a)), r: 5.5, fill: css('--accent'), stroke: css('--bg'), 'stroke-width': 2 }));
      mom.appendChild(s('circle', { cx: X(a), cy: Y(ct(a)), r: 5.5, fill: css('--accent-2'), stroke: css('--bg'), 'stroke-width': 2 }));

      if (outA) outA.textContent = a.toFixed(3);
      if (outCp) outCp.textContent = cp(a).toFixed(4);
      if (outCt) outCt.textContent = ct(a).toFixed(4);
    }

    if (slider) slider.addEventListener('input', drawMom);
    drawMom();
    document.addEventListener('hb:theme', drawMom);
  }

  /* ---------------- Footer year ---------------- */
  var yr = document.getElementById('year');
  if (yr) yr.textContent = String(new Date().getFullYear());
})();
