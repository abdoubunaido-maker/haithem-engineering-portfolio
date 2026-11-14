/* Formula Student bodywork case-study interactions. */
(function () {
  'use strict';
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Persistent, accessible chapter index. */
  var stageLinks = Array.prototype.slice.call(document.querySelectorAll('[data-stage-link]'));
  var stages = Array.prototype.slice.call(document.querySelectorAll('[data-stage]'));
  function setActiveStage(name) {
    stageLinks.forEach(function (link) {
      var active = link.getAttribute('data-stage-link') === name;
      if (active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }
  if (stageLinks.length) setActiveStage('surface');
  if ('IntersectionObserver' in window && stages.length) {
    var stageObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveStage(entry.target.getAttribute('data-stage'));
      });
    }, { rootMargin: '-26% 0px -62% 0px', threshold: 0 });
    stages.forEach(function (stage) { stageObserver.observe(stage); });
  }

  /* Highlight the engineering components in the sectional-buck diagram. */
  var buckDiagram = document.getElementById('buckDiagram');
  var buckButtons = Array.prototype.slice.call(document.querySelectorAll('[data-buck-mode]'));
  buckButtons.forEach(function (button) {
    button.addEventListener('click', function () {
      var mode = button.getAttribute('data-buck-mode');
      if (buckDiagram) buckDiagram.setAttribute('data-mode', mode);
      buckButtons.forEach(function (item) {
        item.setAttribute('aria-pressed', String(item === button));
      });
    });
  });

  /* Stack / explode the four documented laminate plies. */
  var laminateDiagram = document.getElementById('laminateDiagram');
  var laminateToggle = document.getElementById('laminateToggle');
  if (laminateDiagram && laminateToggle) {
    laminateToggle.addEventListener('click', function () {
      var exploded = laminateDiagram.getAttribute('data-exploded') !== 'true';
      laminateDiagram.setAttribute('data-exploded', String(exploded));
      laminateToggle.setAttribute('aria-pressed', String(exploded));
      laminateToggle.textContent = exploded ? 'Stack the layers' : 'Explode the layers';
    });
  }

  /* Separate and rejoin the mould halves; mounting points remain schematic. */
  var mouldDiagram = document.getElementById('mouldDiagram');
  var mouldToggle = document.getElementById('mouldSplitToggle');
  if (mouldDiagram && mouldToggle) {
    mouldToggle.addEventListener('click', function () {
      var separated = mouldDiagram.getAttribute('data-state') !== 'separated';
      mouldDiagram.setAttribute('data-state', separated ? 'separated' : 'joined');
      mouldToggle.setAttribute('aria-pressed', String(separated));
      mouldToggle.textContent = separated ? 'Rejoin the mould halves' : 'Separate the mould halves';
    });
  }

  /* Low-amplitude parallax on the real CAD model image; off for reduced motion. */
  var hero = document.querySelector('.bodywork-hero');
  var heroPhoto = document.querySelector('.bw-hero-cad img');
  if (hero && heroPhoto && !reduceMotion) {
    var visible = true, frame = 0;
    if ('IntersectionObserver' in window) {
      new IntersectionObserver(function (entries) {
        visible = entries[0].isIntersecting;
      }).observe(hero);
    }
    function updateParallax() {
      if (frame || !visible) return;
      frame = window.requestAnimationFrame(function () {
        frame = 0;
        var rect = hero.getBoundingClientRect();
        var y = Math.max(-14, Math.min(20, (window.innerHeight - rect.top) * .025));
        heroPhoto.style.transform = 'translate3d(0,' + y.toFixed(1) + 'px,0) scale(1.035)';
      });
    }
    window.addEventListener('scroll', updateParallax, { passive: true });
  }
})();
