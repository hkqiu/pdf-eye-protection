var toggle = document.getElementById('toggle');
var autoToggle = document.getElementById('autoToggle');
var select = document.getElementById('modeSelect');
var preview = document.getElementById('preview');
var status = document.getElementById('status');

var MODES = {
  warm:  { filter: 'sepia(0.3) brightness(0.97) saturate(1.2)',        bg: '#f5e6c8', name: '暖色调' },
  kraft: { filter: 'sepia(0.4) brightness(0.92) contrast(1.05)',       bg: '#f4ecd8', name: '牛皮纸' },
  dark:  { filter: 'invert(0.88) hue-rotate(180deg) brightness(0.9)',  bg: '#1a1a2e', name: '深色模式' },
  green: { filter: 'sepia(0.15) brightness(0.95) saturate(0.9)',       bg: '#C1E6C6', name: '豆沙绿' }
};

function updatePreview() {
  var m = MODES[select.value];
  preview.style.background = m.bg;
  preview.style.filter = m.filter;
  preview.textContent = m.name;
}

chrome.storage.local.get({ enabled: true, autoStart: true, mode: 'warm' }, function (s) {
  toggle.checked = s.enabled;
  autoToggle.checked = s.autoStart;
  select.value = s.mode;
  updatePreview();
  status.textContent = s.enabled ? '已启用' : '已禁用';
  status.className = s.enabled ? 'status' : 'status disabled';
  select.disabled = !s.enabled;
  autoToggle.disabled = !s.enabled;
});

toggle.addEventListener('change', function () {
  var on = toggle.checked;
  chrome.storage.local.set({ enabled: on });
  select.disabled = !on;
  autoToggle.disabled = !on;
  status.textContent = on ? '已启用' : '已禁用';
  status.className = on ? 'status' : 'status disabled';
});

autoToggle.addEventListener('change', function () {
  chrome.storage.local.set({ autoStart: autoToggle.checked });
});

select.addEventListener('change', function () {
  chrome.storage.local.set({ mode: select.value });
  updatePreview();
});
