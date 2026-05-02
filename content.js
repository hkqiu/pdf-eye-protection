(function () {
  'use strict';

  var MODES = {
    warm:  { filter: 'sepia(0.3) brightness(0.97) saturate(1.2)',        bg: '#f5e6c8' },
    kraft: { filter: 'sepia(0.4) brightness(0.92) contrast(1.05)',       bg: '#f4ecd8' },
    dark:  { filter: 'invert(0.88) hue-rotate(180deg) brightness(0.9)',  bg: '#1a1a2e' },
    green: { filter: 'sepia(0.15) brightness(0.95) saturate(0.9)',       bg: '#C1E6C6' }
  };

  var styleEl = null;

  function isPdfPage() {
    if (document.querySelector('embed[type="application/pdf"]')) return true;
    if (document.querySelector('object[type="application/pdf"]')) return true;
    if (document.getElementById('viewer')) return true;
    if (document.querySelector('pdf-viewer')) return true;
    if (document.querySelector('[data-pdf-viewer]')) return true;
    if (document.body && document.body.childElementCount <= 3 &&
        document.querySelector('embed, object')) return true;
    return false;
  }

  function apply(mode) {
    var m = MODES[mode] || MODES.warm;
    if (!styleEl) {
      styleEl = document.createElement('style');
      styleEl.id = 'eye-protection-style';
      (document.head || document.documentElement).appendChild(styleEl);
    }
    styleEl.textContent =
      'html, body { background: ' + m.bg + ' !important; }' +
      '#viewer canvas, embed[type="application/pdf"], object[type="application/pdf"] { filter: ' + m.filter + ' !important; }';
  }

  function remove() {
    if (styleEl) { styleEl.remove(); styleEl = null; }
  }

  function run(checkAuto) {
    if (!isPdfPage()) return;
    chrome.storage.local.get({ enabled: true, autoStart: true, mode: 'warm' }, function (s) {
      if (checkAuto && !s.autoStart) return;
      if (s.enabled) apply(s.mode);
      else remove();
    });
  }

  run(true);
  setTimeout(function () { run(true); }, 1000);
  setTimeout(function () { run(true); }, 3000);

  var obs = new MutationObserver(function () { run(); });
  obs.observe(document.documentElement, { childList: true, subtree: true });
  setTimeout(function () { obs.disconnect(); }, 10000);

  chrome.storage.onChanged.addListener(function (changes, area) {
    if (area !== 'local') return;
    if (!isPdfPage()) return;
    run(false);
  });
})();
