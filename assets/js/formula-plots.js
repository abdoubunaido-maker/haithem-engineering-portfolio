/* Formula Student analytical figures — vanilla SVG, no external dependencies.
   Curve coordinates are approximate digitizations of report Figures 15–16.
   Source figures do not state all model inputs; these traces are not regenerated model outputs. */
(function () {
  'use strict';

  var curves = {"acceleration":{"0.5":[[0,0],[0.41,12.65],[0.82,17.39],[1.24,21.87],[1.65,24.95],[2.06,27.65],[2.47,30.01],[2.88,32.09],[3.14,33.3]],"1.0":[[0,0],[0.41,12.65],[0.82,17.39],[1.24,21.56],[1.65,24.43],[2.06,26.88],[2.47,28.91],[2.88,30.68],[3.29,32.17],[3.67,33.3]],"1.5":[[0,0],[0.41,12.65],[0.82,17.79],[1.24,21.25],[1.65,23.94],[2.06,26.13],[2.47,27.92],[2.88,29.4],[3.29,30.61],[3.71,31.61],[4.12,32.47],[4.53,33.15],[4.63,33.3]],"2.0":[[0,0],[0.41,12.65],[0.82,17.65],[1.24,20.96],[1.65,23.48],[2.06,25.45],[2.47,27.05],[2.88,28.3],[3.29,29.27],[3.71,30.07],[4.12,30.72],[4.53,31.23],[4.94,31.64],[5.35,31.96],[5.76,32.22],[6.18,32.44],[6.59,32.6],[7.0,32.75],[7.41,32.86],[7.82,32.95],[8.24,33.01],[8.65,33.07],[9.06,33.13],[9.47,33.15],[9.88,33.18],[10.29,33.21],[10.71,33.24],[11.12,33.24],[11.53,33.27],[11.94,33.27],[12.03,33.3]],"2.5":[[0,0],[0.41,12.65],[0.82,17.39],[1.24,20.64],[1.65,23.03],[2.06,24.81],[2.47,26.22],[2.88,27.28],[3.29,28.11],[3.71,28.73],[4.12,29.22],[4.53,29.6],[4.94,29.89],[5.35,30.13],[5.76,30.3],[6.18,30.45],[6.59,30.56],[7.0,30.64],[7.41,30.71],[7.82,30.74],[8.24,30.8],[8.65,30.83],[9.06,30.83],[9.47,30.85],[9.88,30.87],[10.29,30.88],[10.35,30.91]]},"cornering":{"0":[[0,0],[0.08,1.33],[1.33,4.52],[2.67,6.43],[4.0,7.93],[5.33,9.22],[6.67,10.41],[8.0,11.49],[9.33,12.44],[10.67,12.54],[12.0,13.32],[13.33,14.04],[14.67,14.73],[16.0,15.38],[17.33,16.01],[18.67,16.62],[20.0,17.19],[21.33,17.74],[22.67,18.3],[24.0,18.82],[25.33,19.34],[26.67,19.84],[28.0,20.34],[29.33,20.82],[30.67,21.28],[32.0,21.73],[33.33,22.19],[34.67,22.63],[36.0,23.06],[37.33,23.48],[38.67,23.89],[40,24.28]],"0.5":[[0,0],[0.08,1.33],[1.33,4.52],[2.67,6.43],[4.0,7.93],[5.33,9.22],[6.67,10.41],[8.0,10.93],[9.33,11.81],[10.67,12.68],[12.0,13.47],[13.33,14.23],[14.67,14.94],[16.0,15.61],[17.33,16.28],[18.67,16.91],[20.0,17.53],[21.33,18.11],[22.67,18.7],[24.0,19.27],[25.33,19.81],[26.67,20.35],[28.0,20.88],[29.33,21.41],[30.67,21.89],[32.0,22.41],[33.33,22.9],[34.67,23.38],[36.0,23.86],[37.33,24.32],[38.67,24.8],[40,25.24]],"1.0":[[0,0],[0.08,1.33],[1.33,4.52],[2.67,6.43],[4.0,7.93],[5.33,9.22],[6.67,10.41],[8.0,11.02],[9.33,11.91],[10.67,12.81],[12.0,13.62],[13.33,14.39],[14.67,15.15],[16.0,15.86],[17.33,16.55],[18.67,17.21],[20.0,17.86],[21.33,18.49],[22.67,19.12],[24.0,19.72],[25.33,20.3],[26.67,20.9],[28.0,21.46],[29.33,22.03],[30.67,22.58],[32.0,23.13],[33.33,23.68],[34.67,24.23],[36.0,24.76],[37.33,25.28],[38.67,25.78],[40,26.28]],"1.5":[[0,0],[0.08,1.33],[1.33,4.52],[2.67,6.43],[4.0,7.93],[5.33,9.22],[6.67,10.41],[8.0,11.1],[9.33,12.02],[10.67,12.94],[12.0,13.8],[13.33,14.6],[14.67,15.36],[16.0,16.1],[17.33,16.84],[18.67,17.53],[20.0,18.23],[21.33,18.91],[22.67,19.55],[24.0,20.22],[25.33,20.86],[26.67,21.49],[28.0,22.1],[29.33,22.74],[30.67,23.33],[32.0,23.96],[33.33,24.55],[34.67,25.14],[36.0,25.74],[37.33,26.35],[38.67,26.94],[40,27.47]],"2.0":[[0,0],[0.08,1.33],[1.33,4.52],[2.67,6.43],[4.0,7.93],[5.33,9.22],[6.67,10.41],[8.0,11.18],[9.33,12.13],[10.67,13.07],[12.0,13.96],[13.33,14.79],[14.67,15.6],[16.0,16.37],[17.33,17.15],[18.67,17.89],[20.0,18.62],[21.33,19.34],[22.67,20.05],[24.0,20.76],[25.33,21.44],[26.67,22.13],[28.0,22.81],[29.33,23.49],[30.67,24.18],[32.0,24.86],[33.33,25.52],[34.67,26.2],[36.0,26.89],[37.33,27.56],[38.67,28.23],[40,28.88]],"2.5":[[0,0],[0.08,1.33],[1.33,4.52],[2.67,6.43],[4.0,7.93],[5.33,9.22],[6.67,10.21],[8.0,11.28],[9.33,12.28],[10.67,13.21],[12.0,14.13],[13.33,15.0],[14.67,15.84],[16.0,16.66],[17.33,17.47],[18.67,18.26],[20.0,19.03],[21.33,19.81],[22.67,20.56],[24.0,21.32],[25.33,22.08],[26.67,22.85],[28.0,23.59],[29.33,24.35],[30.67,25.11],[32.0,25.87],[33.33,26.64],[34.67,27.4],[36.0,28.16],[37.33,28.96],[38.67,29.74],[40,30.51]],"3.0":[[0,0],[0.08,1.33],[1.33,4.52],[2.67,6.43],[4.0,7.93],[5.33,9.22],[6.67,10.41],[8.0,11.36],[9.33,12.39],[10.67,13.37],[12.0,14.32],[13.33,15.21],[14.67,16.08],[16.0,16.95],[17.33,17.8],[18.67,18.64],[20.0,19.48],[21.33,20.3],[22.67,21.14],[24.0,21.96],[25.33,22.79],[26.67,23.62],[28.0,24.46],[29.33,25.3],[30.67,26.15],[32.0,27.02],[33.33,27.89],[34.67,28.78],[36.0,29.68],[37.33,30.6],[38.67,31.53],[40,32.42]],"3.5":[[0,0],[0.08,1.33],[1.33,4.52],[2.67,6.43],[4.0,7.93],[5.33,9.22],[6.67,10.41],[8.0,11.49],[9.33,12.53],[10.67,13.53],[12.0,14.5],[13.33,15.43],[14.67,16.35],[16.0,17.27],[17.33,18.17],[18.67,19.06],[20.0,19.95],[21.33,20.84],[22.67,21.73],[24.0,22.65],[25.33,23.55],[26.67,24.49],[28.0,25.42],[29.33,26.37],[30.67,27.34],[32.0,28.35],[33.33,29.35],[34.67,30.38],[36.0,31.46],[37.33,32.56],[38.67,33.7],[40,34.81]]}};
  var NS = 'http://www.w3.org/2000/svg';
  var colors = ['#3574a5', '#bd632b', '#9c8027', '#806196', '#4c805e', '#357b82', '#a7586b', '#5578a5'];

  function node(tag, attrs, text) {
    var el = document.createElementNS(NS, tag);
    Object.keys(attrs || {}).forEach(function (key) { el.setAttribute(key, attrs[key]); });
    if (text != null) el.textContent = text;
    return el;
  }

  function draw(svgId, legendId, opts) {
    var svg = document.getElementById(svgId);
    var legend = document.getElementById(legendId);
    if (!svg || !legend) return;

    var W = 620, H = 320;
    var m = { l: 54, r: 15, t: 16, b: 53 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var series = curves[opts.data];
    var x = function (v) { return m.l + (v - opts.xMin) / (opts.xMax - opts.xMin) * iw; };
    var y = function (v) { return m.t + ih - (v - opts.yMin) / (opts.yMax - opts.yMin) * ih; };
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    legend.textContent = '';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);

    var titleId = svgId + '-title', descId = svgId + '-desc';
    svg.setAttribute('aria-labelledby', titleId + ' ' + descId);
    svg.appendChild(node('title', { id: titleId }, opts.title));
    svg.appendChild(node('desc', { id: descId }, opts.description));

    opts.yTicks.forEach(function (v) {
      var yy = y(v);
      svg.appendChild(node('line', { x1: m.l, y1: yy, x2: W - m.r, y2: yy, class: 'grid-line' }));
      svg.appendChild(node('text', { x: m.l - 9, y: yy + 4, 'text-anchor': 'end' }, String(v)));
    });
    opts.xTicks.forEach(function (v) {
      var xx = x(v);
      svg.appendChild(node('line', { x1: xx, y1: m.t, x2: xx, y2: m.t + ih, class: 'grid-line' }));
      svg.appendChild(node('text', { x: xx, y: m.t + ih + 18, 'text-anchor': 'middle' }, String(v)));
    });
    svg.appendChild(node('line', { x1: m.l, y1: m.t + ih, x2: W - m.r, y2: m.t + ih, class: 'axis-line' }));
    svg.appendChild(node('line', { x1: m.l, y1: m.t, x2: m.l, y2: m.t + ih, class: 'axis-line' }));
    svg.appendChild(node('text', { x: m.l + iw / 2, y: H - 7, 'text-anchor': 'middle', class: 'axis-label' }, opts.xLabel));
    svg.appendChild(node('text', { x: 13, y: m.t + ih / 2, 'text-anchor': 'middle', class: 'axis-label', transform: 'rotate(-90 13 ' + (m.t + ih / 2) + ')' }, opts.yLabel));

    Object.keys(series).forEach(function (key, i) {
      var pts = series[key].filter(function (p) {
        return p[0] >= opts.xMin && p[0] <= opts.xMax && p[1] >= opts.yMin && p[1] <= opts.yMax;
      });
      if (!pts.length) return;
      var d = pts.map(function (p, j) { return (j ? 'L' : 'M') + x(p[0]).toFixed(2) + ' ' + y(p[1]).toFixed(2); }).join(' ');
      var path = node('path', {
        d: d, fill: 'none', stroke: colors[i % colors.length], pathLength: 1,
        'stroke-width': 2.25, 'stroke-linecap': 'round', 'stroke-linejoin': 'round',
        'vector-effect': 'non-scaling-stroke'
      });
      path.appendChild(node('title', {}, opts.label(key)));
      svg.appendChild(path);

      var item = document.createElement('span');
      item.className = 'chart-legend-item';
      var swatch = document.createElement('i');
      swatch.style.setProperty('--series-color', colors[i % colors.length]);
      swatch.setAttribute('aria-hidden', 'true');
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(opts.label(key)));
      legend.appendChild(item);
    });
  }

  function drawLateral() {
    var svg = document.getElementById('fsLateralPlot');
    var legend = document.getElementById('fsLateralLegend');
    if (!svg || !legend) return;
    var W = 620, H = 320, m = { l: 58, r: 18, t: 18, b: 54 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var x = function (v) { return m.l + v / 3.6 * iw; };
    var y = function (v) { return m.t + ih - (v - 14) / 3.5 * ih; };
    var rows = [
      { name: 'Baseline', cl: 0.006, lat: 14.7, label: '≈14.7', color: colors[0], dx: 9, dy: -9, anchor: 'start' },
      { name: 'Wings', cl: 2.70, lat: 16.6, label: '≈16.6', color: colors[1], dx: -8, dy: -10, anchor: 'end' },
      { name: 'Full package', cl: 3.35, lat: 17.0, label: '≈17.0', color: colors[4], dx: -8, dy: 18, anchor: 'end' }
    ];
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    legend.textContent = '';
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('aria-labelledby', 'fsLateralPlot-title fsLateralPlot-desc');
    svg.appendChild(node('title', { id: 'fsLateralPlot-title' }, 'Approximate maximum lateral acceleration results'));
    svg.appendChild(node('desc', { id: 'fsLateralPlot-desc' }, 'Three discrete vehicle configurations. Rounded lift coefficients are exact simulator inputs; maximum lateral acceleration values are approximate readings from the report plot.'));

    [14, 15, 16, 17].forEach(function (v) {
      var yy = y(v);
      svg.appendChild(node('line', { x1: m.l, y1: yy, x2: W - m.r, y2: yy, class: 'grid-line' }));
      svg.appendChild(node('text', { x: m.l - 9, y: yy + 4, 'text-anchor': 'end' }, String(v)));
    });
    [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].forEach(function (v) {
      var xx = x(v);
      svg.appendChild(node('line', { x1: xx, y1: m.t, x2: xx, y2: m.t + ih, class: 'grid-line' }));
      svg.appendChild(node('text', { x: xx, y: m.t + ih + 18, 'text-anchor': 'middle' }, String(v)));
    });
    svg.appendChild(node('line', { x1: m.l, y1: m.t + ih, x2: W - m.r, y2: m.t + ih, class: 'axis-line' }));
    svg.appendChild(node('line', { x1: m.l, y1: m.t, x2: m.l, y2: m.t + ih, class: 'axis-line' }));
    svg.appendChild(node('text', { x: m.l + iw / 2, y: H - 7, 'text-anchor': 'middle', class: 'axis-label' }, 'Downforce coefficient, C_L [-]'));
    svg.appendChild(node('text', { x: 13, y: m.t + ih / 2, 'text-anchor': 'middle', class: 'axis-label', transform: 'rotate(-90 13 ' + (m.t + ih / 2) + ')' }, 'Maximum lateral acceleration [m/s²]'));

    rows.forEach(function (r) {
      var xx = x(r.cl), yy = y(r.lat);
      var point = node('circle', { cx: xx, cy: yy, r: 5, fill: r.color, stroke: 'var(--bg)', 'stroke-width': 2 });
      point.appendChild(node('title', {}, r.name + ': C_L = ' + r.cl + ', max lateral acceleration ' + r.label + ' m/s² (approximate)'));
      svg.appendChild(point);
      svg.appendChild(node('text', { x: xx + r.dx, y: yy + r.dy, 'text-anchor': r.anchor, class: 'bar-label' }, r.label));
      var item = document.createElement('span');
      item.className = 'chart-legend-item';
      var swatch = document.createElement('i');
      swatch.className = 'chart-dot';
      swatch.style.setProperty('--series-color', r.color);
      swatch.setAttribute('aria-hidden', 'true');
      item.appendChild(swatch);
      item.appendChild(document.createTextNode(r.name));
      legend.appendChild(item);
    });
  }

  function drawTradeoff() {
    var svg = document.getElementById('fsAeroTradeoffPlot');
    var note = document.getElementById('fsAeroTradeoffLegend');
    if (!svg || !note) return;
    var W = 620, H = 320, m = { l: 58, r: 24, t: 18, b: 54 };
    var iw = W - m.l - m.r, ih = H - m.t - m.b;
    var x = function (v) { return m.l + (v - 0.5) / 1.4 * iw; };
    var y = function (v) { return m.t + ih - v / 3.7 * ih; };
    var rows = [
      { name: 'Baseline', cd: 0.645, cl: 0.005, lap: '86.71 s', color: colors[0], dx: 10, dy: -12, anchor: 'start' },
      { name: 'Wings', cd: 1.73, cl: 2.69, lap: '85.06 s', color: colors[1], dx: -10, dy: 18, anchor: 'end' },
      { name: 'Full package', cd: 1.70, cl: 3.35, lap: '84.59 s', color: colors[4], dx: -10, dy: -13, anchor: 'end' }
    ];
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('viewBox', '0 0 ' + W + ' ' + H);
    svg.setAttribute('aria-labelledby', 'fsAeroTradeoffPlot-title fsAeroTradeoffPlot-desc');
    svg.appendChild(node('title', { id: 'fsAeroTradeoffPlot-title' }, 'Full-vehicle drag/downforce trade-off from CFD'));
    svg.appendChild(node('desc', { id: 'fsAeroTradeoffPlot-desc' }, 'Three exact coefficient pairs from report Table 10, plotted as discrete points. Labels show the OptimumLap times from Table 12.'));
    [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5].forEach(function (v) {
      var yy = y(v);
      svg.appendChild(node('line', { x1: m.l, y1: yy, x2: W - m.r, y2: yy, class: 'grid-line' }));
      svg.appendChild(node('text', { x: m.l - 9, y: yy + 4, 'text-anchor': 'end' }, String(v)));
    });
    [0.6, 0.8, 1, 1.2, 1.4, 1.6, 1.8].forEach(function (v) {
      var xx = x(v);
      svg.appendChild(node('line', { x1: xx, y1: m.t, x2: xx, y2: m.t + ih, class: 'grid-line' }));
      svg.appendChild(node('text', { x: xx, y: m.t + ih + 18, 'text-anchor': 'middle' }, v.toFixed(1)));
    });
    svg.appendChild(node('line', { x1: m.l, y1: m.t + ih, x2: W - m.r, y2: m.t + ih, class: 'axis-line' }));
    svg.appendChild(node('line', { x1: m.l, y1: m.t, x2: m.l, y2: m.t + ih, class: 'axis-line' }));
    svg.appendChild(node('text', { x: m.l + iw / 2, y: H - 7, 'text-anchor': 'middle', class: 'axis-label' }, 'Drag coefficient, C_D [-]'));
    svg.appendChild(node('text', { x: 13, y: m.t + ih / 2, 'text-anchor': 'middle', class: 'axis-label', transform: 'rotate(-90 13 ' + (m.t + ih / 2) + ')' }, 'Downforce coefficient, C_L [-]'));
    rows.forEach(function (r) {
      var xx = x(r.cd), yy = y(r.cl);
      var point = node('circle', { cx: xx, cy: yy, r: 5.5, fill: r.color, stroke: 'var(--bg)', 'stroke-width': 2 });
      point.appendChild(node('title', {}, r.name + ': C_D = ' + r.cd + ', C_L = ' + r.cl + ', simulated lap ' + r.lap));
      svg.appendChild(point);
      svg.appendChild(node('text', { x: xx + r.dx, y: yy + r.dy, 'text-anchor': r.anchor, class: 'bar-label' }, r.name + ' · ' + r.lap));
    });
    note.textContent = 'Exact CFD coefficient pairs · labels show simulated lap time';
  }

  function initCarousel() {
    var root = document.getElementById('aeroStory');
    var viewport = document.getElementById('aeroStoryViewport');
    var track = document.getElementById('aeroStoryTrack');
    if (!root || !viewport || !track) return;
    var slides = Array.prototype.slice.call(track.querySelectorAll('.aero-slide'));
    var dots = Array.prototype.slice.call(root.querySelectorAll('[data-aero-slide]'));
    var status = document.getElementById('aeroStoryStatus');
    var index = 0, startX = null;

    function show(next) {
      index = (next + slides.length) % slides.length;
      track.style.transform = 'translate3d(-' + (index * 100) + '%,0,0)';
      slides.forEach(function (slide, i) {
        var hidden = i !== index;
        slide.setAttribute('aria-hidden', String(hidden));
        slide.inert = hidden;
      });
      dots.forEach(function (dot, i) {
        var active = i === index;
        dot.classList.toggle('is-active', active);
        if (active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      if (status) status.textContent = String(index + 1).padStart(2, '0') + ' / ' + String(slides.length).padStart(2, '0');
    }

    var prev = document.getElementById('aeroStoryPrev');
    var next = document.getElementById('aeroStoryNext');
    if (prev) prev.addEventListener('click', function () { show(index - 1); });
    if (next) next.addEventListener('click', function () { show(index + 1); });
    dots.forEach(function (dot) { dot.addEventListener('click', function () { show(Number(dot.getAttribute('data-aero-slide'))); }); });
    viewport.addEventListener('keydown', function (event) {
      if (event.key === 'ArrowRight') { event.preventDefault(); show(index + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); show(index - 1); }
    });
    viewport.addEventListener('pointerdown', function (event) {
      if (event.target.closest('button')) return;
      startX = event.clientX;
    });
    viewport.addEventListener('pointerup', function (event) {
      if (startX == null) return;
      var delta = event.clientX - startX;
      startX = null;
      if (Math.abs(delta) > 48) show(index + (delta < 0 ? 1 : -1));
    });
    viewport.addEventListener('pointercancel', function () { startX = null; });
    show(0);
  }

  function drawAll() {
    draw('fsAccelerationPlot', 'fsAccelerationLegend', {
      data: 'acceleration', xMin: 0, xMax: 14, yMin: 0, yMax: 35,
      xTicks: [0, 2, 4, 6, 8, 10, 12, 14], yTicks: [0, 5, 10, 15, 20, 25, 30],
      xLabel: 'Time, t [s]', yLabel: 'Velocity, v [m/s]',
      title: 'Approximate digitization of report Figure 15',
      description: 'Velocity-time curves for C_D A values from 0.5 to 2.5 square metres. Digitized traces are approximate because the report does not state every plotted input.',
      label: function (key) { return 'C_D A = ' + key + ' m²'; }
    });
    draw('fsCorneringPlot', 'fsCorneringLegend', {
      data: 'cornering', xMin: 0, xMax: 40, yMin: 0, yMax: 35,
      xTicks: [0, 5, 10, 15, 20, 25, 30, 35, 40], yTicks: [0, 5, 10, 15, 20, 25, 30, 35],
      xLabel: 'Corner radius, r [m]', yLabel: 'Maximum cornering speed, vₘₐₓ [m/s]',
      title: 'Approximate digitization of report Figure 16',
      description: 'Maximum cornering speed against corner radius for downforce coefficients from zero to 3.5. Digitized traces are approximate because the report does not state mass, tyre friction coefficient, or reference area for the plotted curves.',
      label: function (key) { return 'C_L = ' + key; }
    });
    drawLateral();
    drawTradeoff();
  }

  initCarousel();
  drawAll();
  document.addEventListener('hb:theme', drawAll);
})();
