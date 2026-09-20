// @ts-nocheck
// @ts-nocheck
'use client';
import { useEffect } from 'react';
import Section1 from './Section1';
import Section2 from './Section2';
import Section3 from './Section3';
import Section8 from './Section8';
import Section9 from './Section9';
import Section10 from './Section10';
import OverlayComponent from './OverlayComponent';

export default function HomeComponent() {
  useEffect(() => {
(function () {
      try {
        var htmlEl = document.documentElement;
        if (!htmlEl) return;
        var startedAt = Date.now();
        var minMs = 500;
        var maxMs = 1800;
        var shown = false;
        var removed = false;
        var ensureOverlay = function () {
          try {
            if (shown) return;
            shown = true;
            var old = document.getElementById('miuBootLoading');
            if (old && old.parentNode) old.parentNode.removeChild(old);
            var d = document.createElement('div');
            d.id = 'miuBootLoading';
            d.innerHTML = '<div class="miuBootSpinner" aria-label="loading"></div>';
            var mount = document.body || document.documentElement;
            mount.appendChild(d);
          } catch (_e) { }
        };
        var release = function () {
          try {
            if (removed) return;
            removed = true;
            var d = document.getElementById('miuBootLoading');
            if (d) {
              try { d.setAttribute('data-hide', '1'); } catch (_e3) { }
              setTimeout(function () { try { if (d && d.parentNode) d.parentNode.removeChild(d); } catch (_e4) { } }, 220);
            }
          } catch (_e5) { }
        };

        ensureOverlay();

        var scheduleRelease = function () {
          try {
            var elapsed = Date.now() - startedAt;
            var wait = Math.max(0, minMs - elapsed);
            setTimeout(release, wait);
          } catch (_e) { release(); }
        };

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', scheduleRelease, { once: true });
        } else {
          scheduleRelease();
        }

        try {
          window.addEventListener('load', scheduleRelease, { once: true });
        } catch (_e) { }

        setTimeout(release, maxMs);
      } catch (_e) { }
    })();
(function () {
      try {
        var cw = 575;
        var phone = 600;
        var vw = 0;
        try { vw = Math.max(0, Number(window.innerWidth || 0)); } catch (e) { vw = 0; }
        if (!cw || !vw) return;
        var sw = vw <= 480 ? vw : Math.min(phone, Math.max(0, vw - 32));
        var s = Math.min(1, sw / cw);
        document.documentElement.style.setProperty('--miu-s', String(s));
      } catch (e) { }
    })();
(function () {
      // Block F12 multiple ways
      document.addEventListener('keydown', function (e) {
        if (e.keyCode === 123 || e.key === 'F12') {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 73) { // Ctrl+Shift+I
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 74) { // Ctrl+Shift+J
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
        if (e.ctrlKey && e.shiftKey && e.keyCode === 67) { // Ctrl+Shift+C
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
        if (e.ctrlKey && e.keyCode === 85) { // Ctrl+U
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      }, true); // Use capture phase

      // Also block on window
      window.addEventListener('keydown', function (e) {
        if (e.keyCode === 123 || e.key === 'F12') {
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
          return false;
        }
      }, true);

      // Block right-click
      document.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }, true);

      window.addEventListener('contextmenu', function (e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        return false;
      }, true);
    })();

    (function () {
      try {
        var sp = null;
        try { sp = new URLSearchParams(window.location.search || ''); } catch (e) { }
        if (sp && sp.get('muteMusic') === '1') return;
        if (window.MIU_MUTE_MUSIC) return;

        var audioRef = null;

        var getAudio = function () {
          if (audioRef && audioRef.play) return audioRef;
          var a = document.getElementById('bgAudio') || document.getElementById('musicPlayer');
          if (!a || !a.play) return null;
          audioRef = a;
          try { a.volume = typeof a.volume === 'number' ? a.volume : 0.5; } catch (e) { }
          return a;
        };

        var add = function (type, handler, options) {
          try { document.addEventListener(type, handler, options); } catch (e) {
            try { document.addEventListener(type, handler, true); } catch (_) { }
          }
        };
        var remove = function (type, handler, options) {
          try { document.removeEventListener(type, handler, options); } catch (e) {
            try { document.removeEventListener(type, handler, true); } catch (_) { }
          }
        };

        var started = false;
        var removeAll = function () {
          remove('pointerdown', start, true);
          remove('touchstart', start, { capture: true, passive: true });
          remove('touchend', start, { capture: true, passive: true });
          remove('keydown', start, true);
          remove('scroll', start, { capture: true, passive: true });
          remove('click', start, true);
        };

        var getStartAt = function () {
          try {
            var v = (window && (window.MIU_BG_START_AT != null)) ? window.MIU_BG_START_AT : null;
            var n = Number(v);
            if (!isFinite(n) || n <= 0) return 0;
            return Math.floor(n);
          } catch (e) { return 0; }
        };
        var trySeekStart = function (aud) {
          try {
            if (!aud) return;
            var t0 = getStartAt();
            if (!t0) return;
            var d = aud.duration;
            var max = (isFinite(d) && d > 0) ? Math.max(0, d - 0.05) : t0;
            var t = Math.max(0, Math.min(t0, max));
            if (!isFinite(aud.currentTime) || aud.currentTime < t - 0.01) { aud.currentTime = t; }
          } catch (e) { }
        };

        var start = function () {
          if (started) return;
          var audio = getAudio();
          if (!audio) return;
          started = true;
          try {
            trySeekStart(audio);
            try {
              audio.addEventListener && audio.addEventListener('loadedmetadata', function () { try { trySeekStart(audio); } catch (e) { } }, { once: true });
              audio.addEventListener && audio.addEventListener('canplay', function () { try { trySeekStart(audio); } catch (e) { } }, { once: true });
              audio.addEventListener && audio.addEventListener('playing', function () { try { trySeekStart(audio); } catch (e) { } }, { once: true });
            } catch (e) { }
            var p = audio.play();
            if (p && p.then) {
              p.then(function () { removeAll(); }).catch(function () { started = false; });
            } else {
              removeAll();
            }
          } catch (e) {
            started = false;
          }
        };

        add('pointerdown', start, true);
        add('touchstart', start, { capture: true, passive: true });
        add('touchend', start, { capture: true, passive: true });
        add('keydown', start, true);
        add('scroll', start, { capture: true, passive: true });
        add('click', start, true);

        // Also attempt as soon as DOM is ready (won't wait for full assets/fonts).
        var onReady
          = function () { try { start(); } catch (e) { } };
        if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', onReady, { once: true });
        else onReady();
      } catch (e) { }
    })();
  
(function () { try { window.MIU_BG_START_AT = 66; } catch (e) { } })();
(function () {
      try {
        function pad(n) { n = Math.max(0, n | 0); return (n < 10 ? '0' : '') + n; }
        function parseTarget(raw) {
          try {
            raw = String(raw || '').trim();
            if (!raw) return NaN;
            // timestamp (ms)
            if (/^d{10,13}$/.test(raw)) {
              var ts = parseInt(raw, 10);
              if (isFinite(ts)) return raw.length === 10 ? ts * 1000 : ts;
            }
            var t = Date.parse(raw);
            if (isFinite(t)) return t;
            // common form: YYYY-MM-DD HH:mm or YYYY-MM-DD HH:mm:ss
            if (/^d{4}-d{2}-d{2}s+d{2}:d{2}(:d{2})?$/.test(raw)) {
              t = Date.parse(raw.replace(' ', 'T'));
              if (isFinite(t)) return t;
              // assume local time -> add Z as a fallback
              t = Date.parse(raw.replace(' ', 'T') + 'Z');
              if (isFinite(t)) return t;
            }
          } catch (e) { }
          return NaN;
        }
        function tick() {
          var els = document.querySelectorAll('[data-countdown="1"]');
          var now = Date.now();
          for (var i = 0; i < els.length; i++) {
            var el = els[i];
            var t = parseTarget(el.getAttribute('data-target') || '');
            if (!isFinite(t)) continue;
            var diff = Math.max(0, t - now);
            var total = Math.floor(diff / 1000);
            var d = Math.floor(total / 86400);
            var h = Math.floor((total % 86400) / 3600);
            var m = Math.floor((total % 3600) / 60);
            var s = total % 60;
            var sep = el.getAttribute('data-sep');
            if (sep == null) sep = ' : ';
            var parts = [];

            var sd = el.getAttribute('data-suf-d');
            var sh = el.getAttribute('data-suf-h');
            var sm = el.getAttribute('data-suf-m');
            var ss = el.getAttribute('data-suf-s');

            // Back-compat: infer suffix from current text content (e.g. "00d: 00h: 00m: 00s")
            if ((sd == null || sh == null || sm == null || ss == null) && el.textContent) {
              try {
                var raw = String(el.textContent || '');
                var chunks = raw.split(sep);
                var pick = function (idx) {
                  try {
                    var c = String(chunks[idx] || '');
                    return c.replace(/[0-9s]/g, '');
                  } catch (e) { return ''; }
                };
                if (sd == null) sd = pick(0);
                if (sh == null) sh = pick(1);
                if (sm == null) sm = pick(2);
                if (ss == null) ss = pick(3);
              } catch (e) { }
            }
            if (sd == null) sd = '';
            if (sh == null) sh = '';
            if (sm == null) sm = '';
            if (ss == null) ss = '';

            if ((el.getAttribute('data-show-d') || '1') === '1') parts.push(pad(d) + sd);
            if ((el.getAttribute('data-show-h') || '1') === '1') parts.push(pad(h) + sh);
            if ((el.getAttribute('data-show-m') || '1') === '1') parts.push(pad(m) + sm);
            if ((el.getAttribute('data-show-s') || '0') === '1') parts.push(pad(s) + ss);
            el.textContent = parts.join(sep);
          }
        }
        tick();
        setInterval(tick, 1000);
      } catch (e) { }
    })();
(function () {
      try {
        var toast = function (msg, kind) {
          try {
            msg = String(msg || '').trim();
            if (!msg) return;
            var wrap = document.querySelector('.miu-toast-wrap');
            if (!wrap) {
              wrap = document.createElement('div');
              wrap.className = 'miu-toast-wrap';
              document.body.appendChild(wrap);
            }
            var el = document.createElement('div');
            el.className = 'miu-toast';
            el.setAttribute('data-kind', kind || 'info');
            el.textContent = msg;
            wrap.appendChild(el);
            setTimeout(function () { try { if (el && el.parentNode) el.parentNode.removeChild(el); } catch (e) { } }, 2000);
          } catch (e) { }
        };

        var overlay = null;
        var overlayContent = null;
        var overlayBackdrop = null;
        var currentModalId = '';

        function ensureOverlay() {
          try {
            if (overlay && overlay.parentNode) return;
            overlay = document.createElement('div');
            overlay.id = 'miuRuntimeModal';
            overlay.style.position = 'fixed';
            overlay.style.inset = '0';
            overlay.style.zIndex = '2147483000';
            overlay.style.display = 'none';
            overlay.style.alignItems = 'center';
            overlay.style.justifyContent = 'center';
            overlay.style.padding = '16px';
            overlay.style.overflow = 'auto';

            overlayBackdrop = document.createElement('div');
            overlayBackdrop.style.position = 'absolute';
            overlayBackdrop.style.inset = '0';
            overlayBackdrop.style.background = 'rgba(0,0,0,0.45)';

            overlayContent = document.createElement('div');
            overlayContent.style.position = 'relative';
            overlayContent.style.maxWidth = '100%';
            overlayContent.style.boxSizing = 'border-box';
            overlayContent.style.boxShadow = '0 18px 60px rgba(0,0,0,0.35)';
            overlayContent.style.overflow = 'hidden';

            overlay.appendChild(overlayBackdrop);
            overlay.appendChild(overlayContent);
            document.body.appendChild(overlay);
          } catch (_e) { }
        }

        function closeModal() {
          try {
            currentModalId = '';
            if (overlayContent) overlayContent.innerHTML = '';
            if (overlay) overlay.style.display = 'none';
          } catch (_e) { }
        }

        function openModal(modalId) {
          try {
            modalId = String(modalId || '').trim();
            if (!modalId) return;
            ensureOverlay();
            var tpl = document.getElementById('miu-modal-tpl-' + modalId);
            if (!tpl) return;

            currentModalId = modalId;
            var html = '';
            try { html = tpl.innerHTML || ''; } catch (_e) { html = ''; }

            var bg = tpl.getAttribute('data-bg') || '#ffffff';
            var mw = parseFloat(tpl.getAttribute('data-w') || '520');
            var mh = parseFloat(tpl.getAttribute('data-h') || '420');
            if (!isFinite(mw) || mw <= 0) mw = 520;
            if (!isFinite(mh) || mh <= 0) mh = 420;
            var radius = parseFloat(tpl.getAttribute('data-radius') || '18');
            if (!isFinite(radius)) radius = 18;
            var pres = tpl.getAttribute('data-pres') || 'center';
            var closeOnBackdrop = (tpl.getAttribute('data-close-backdrop') || '1') === '1';
            var showCloseButton = (tpl.getAttribute('data-show-close') || '1') === '1';

            var vw = 0;
            var vh = 0;
            try { vw = Number(window.innerWidth || 0); } catch (_e) { vw = 0; }
            try { vh = Number(window.innerHeight || 0); } catch (_e) { vh = 0; }
            if (!vw) vw = 1200;
            if (!vh) vh = 800;
            var stage = null;
            try { stage = document.querySelector('.miu-stage'); } catch (_e) { stage = null; }
            var boundW = vw;
            try {
              var sw = stage && stage.clientWidth ? Number(stage.clientWidth) : 0;
              if (sw && isFinite(sw)) boundW = Math.min(boundW, sw);
            } catch (_e) { }
            var availW = Math.max(1, boundW - 24);
            var availH = Math.max(1, vh - 120);
            var s = Math.min(1, Math.min(availW / mw, availH / mh));
            if (!isFinite(s) || s <= 0) s = 1;
            if (s < 0.2) s = 0.2;

            overlay.style.display = 'flex';
            overlay.style.alignItems = pres === 'bottom_sheet' ? 'flex-end' : 'center';
            overlay.style.justifyContent = 'center';

            overlayContent.style.background = bg;
            overlayContent.style.borderRadius = pres === 'bottom_sheet' ? (radius + 'px ' + radius + 'px 0 0') : (radius + 'px');
            overlayContent.style.width = (mw * s) + 'px';
            overlayContent.style.height = (mh * s) + 'px';
            overlayContent.style.marginTop = pres === 'bottom_sheet' ? 'auto' : '0';
            overlayContent.style.marginBottom = pres === 'bottom_sheet' ? '0' : '0';

            overlayContent.innerHTML =
              (showCloseButton
                ? '<button type="button" data-miu-modal-close="1" style="position:absolute;top:10px;right:10px;width:36px;height:36px;border-radius:999px;border:1px solid rgba(0,0,0,0.12);background:rgba(255,255,255,0.95);cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:5">×</button>'
                : '') +
              '<div style="position:absolute;inset:0;overflow:hidden;">' +
              '<div style="transform:scale(' + s + ');transform-origin:top left;width:' + mw + 'px;height:' + mh + 'px;position:relative;">' +
              html +
              '</div>' +
              '</div>';

            overlayBackdrop.onclick = function (ev) {
              try {
                if (!closeOnBackdrop) return;
                if (ev && ev.target !== overlayBackdrop) return;
                closeModal();
              } catch (_e) { }
            };
          } catch (_e) { }
        }

        document.addEventListener('keydown', function (e) {
          try {
            if (!overlay || overlay.style.display === 'none') return;
            if (e && e.key === 'Escape') {
              e.preventDefault();
              closeModal();
            }
          } catch (_e) { }
        }, true);

        var onClick = function (e) {
          try {
            var t = e && e.target;
            if (!t) return;

            // Close button inside modal
            var closeBtn = (t.closest && t.closest('[data-miu-modal-close="1"]')) ? t.closest('[data-miu-modal-close="1"]') : null;
            if (closeBtn) {
              closeModal();
              e.preventDefault();
              e.stopPropagation();
              return;
            }

            var btn = (t.closest && t.closest('[data-miu-btn="1"]')) ? t.closest('[data-miu-btn="1"]') : null;
            if (!btn) return;
            var action = btn.getAttribute('data-action') || '';
            var url = btn.getAttribute('data-url') || '';
            var newTab = btn.getAttribute('data-newtab') === '1';
            var targetId = btn.getAttribute('data-target-id') || '';
            var copyValue = btn.getAttribute('data-copy') || '';
            var modalId = btn.getAttribute('data-modal-id') || '';

            if (action === 'modal' && modalId) {
              openModal(modalId);
              e.preventDefault();
              return;
            }
            if (action === 'modal_close') {
              closeModal();
              e.preventDefault();
              return;
            }
            if (action === 'link' && url) {
              if (newTab) window.open(url, '_blank', 'noopener,noreferrer');
              else window.location.href = url;
              e.preventDefault();
              return;
            }
            if (action === 'scroll' && targetId) {
              var el = document.getElementById(targetId) || document.querySelector('[data-node-id="' + targetId.replace(/"/g, '\"') + '"]');
              if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
              e.preventDefault();
              return;
            }
            if (action === 'copy' && copyValue) {
              try {
                if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(copyValue);
              } catch (_) { }
              try { toast('Đã copy', 'success'); } catch (_) { }
              e.preventDefault();
              return;
            }
          } catch (_e) { }
        };
        document.addEventListener('click', onClick, true);
      } catch (e) { }
    })();
(function () {
      try {
        var stage = document.querySelector('.miu-stage');
        var canvas = document.querySelector('.miu-canvas');
        if (!stage || !canvas) return;
        var sync = function () {
          try {
            var sw = Number(stage.clientWidth || 0);
            var cw = 575;
            if (!sw || !cw) return;
            var s = Math.min(1, sw / cw);
            try { document.documentElement.style.setProperty('--miu-s', String(s)); } catch (_e) { }

            // Auto expand height when some nodes (e.g. RSVP) render taller than configured h
            try {
              var baseH = 10881;
              var sh = Number(canvas.scrollHeight || 0);
              var nextH = Math.max(baseH, sh || 0);
              if (nextH && isFinite(nextH)) {
                canvas.style.height = String(nextH) + 'px';
                try { stage.style.setProperty('--sh', String(nextH) + 'px'); } catch (__e) { }
              }
            } catch (_e2) { }
          } catch (_e) { }
        };
        sync();
        try { setTimeout(sync, 0); setTimeout(sync, 300); setTimeout(sync, 1200); } catch (_e) { }
        window.addEventListener('resize', sync, { passive: true });
      } catch (e) { }
    })();
(function () {
      try {
        function isSingleLine(el) {
          try {
            var t = (el && el.textContent != null) ? String(el.textContent) : '';
            return t.indexOf('\n') === -1;
          } catch (e) { return true; }
        }

        function copyStyle(src, dst) {
          try {
            var cs = window.getComputedStyle(src);
            dst.style.fontFamily = cs.fontFamily;
            dst.style.fontSize = cs.fontSize;
            dst.style.fontWeight = cs.fontWeight;
            dst.style.fontStyle = cs.fontStyle;
            dst.style.letterSpacing = cs.letterSpacing;
            dst.style.textTransform = cs.textTransform;
            dst.style.textDecoration = cs.textDecoration;
            dst.style.lineHeight = cs.lineHeight;
            // Match builder measurement: pre-wrap + max-content width
            dst.style.whiteSpace = 'pre-wrap';
            dst.style.textAlign = cs.textAlign;
          } catch (e) { }
        }

        function getCssPx(el, prop) {
          try {
            var cs = window.getComputedStyle(el);
            var v = cs && cs.getPropertyValue ? cs.getPropertyValue(prop) : '';
            var n = parseFloat(String(v || ''));
            return isFinite(n) ? n : 0;
          } catch (e) { return 0; }
        }

        function measureWidth(el) {
          var span = document.createElement('span');
          span.textContent = (el && el.textContent != null) ? String(el.textContent) : '';
          span.style.position = 'absolute';
          span.style.left = '-99999px';
          span.style.top = '-99999px';
          span.style.padding = '0';
          span.style.margin = '0';
          span.style.display = 'inline-block';
          span.style.width = 'max-content';
          span.style.maxWidth = 'none';
          span.style.pointerEvents = 'none';
          span.style.visibility = 'hidden';
          copyStyle(el, span);
          document.body.appendChild(span);
          var w = 0;
          try { w = Math.ceil(span.scrollWidth || span.getBoundingClientRect().width || 0); } catch (e) { w = 0; }
          try { document.body.removeChild(span); } catch (_e) { }
          return w;
        }

        function measureNoWrapWidth(el) {
          var span = document.createElement('span');
          span.textContent = (el && el.textContent != null) ? String(el.textContent) : '';
          span.style.position = 'absolute';
          span.style.left = '-99999px';
          span.style.top = '-99999px';
          span.style.padding = '0';
          span.style.margin = '0';
          span.style.display = 'inline-block';
          span.style.width = 'max-content';
          span.style.maxWidth = 'none';
          span.style.pointerEvents = 'none';
          span.style.visibility = 'hidden';
          copyStyle(el, span);
          // force single-line to measure required width to avoid wrapping
          span.style.whiteSpace = 'nowrap';
          document.body.appendChild(span);
          var w = 0;
          try { w = Math.ceil(span.scrollWidth || span.getBoundingClientRect().width || 0); } catch (e) { w = 0; }
          try { document.body.removeChild(span); } catch (_e) { }
          return w;
        }

        function detectWrap(el) {
          try {
            // Case 1: overflow-based (some layouts keep fixed height)
            var ch = Number(el.clientHeight || 0);
            var sh = Number(el.scrollHeight || 0);
            if (ch && sh && sh > ch + 1) return true;

            // Case 2: no overflow but actual layout is multiple lines
            // (common when height is auto/large enough)
            var t = (el && el.textContent != null) ? String(el.textContent) : '';
            if (t.indexOf('\n') !== -1) return false;

            var lh = getCssPx(el, 'line-height');
            if (!lh || !isFinite(lh)) {
              var fs = getCssPx(el, 'font-size');
              if (fs && isFinite(fs)) lh = fs * 1.2;
            }

            var h = getCssPx(el, 'height');
            if (!h || !isFinite(h)) h = Number(el.clientHeight || 0);
            if (lh && h && isFinite(lh) && isFinite(h) && h > lh + 1) return true;
          } catch (e) { }
          return false;
        }

        function fitOne(el) {
          try {
            if (!el) return;
            // Builder-strict behavior: only auto-fit when not manualSized and single-line
            if (el.getAttribute('data-manual-sized') === '1') return;
            if (!isSingleLine(el)) return;

            var w = measureWidth(el);
            if (!w || !isFinite(w)) return;
            var target = w + 6;

            // Use unscaled CSS width (builder stores/uses px in schema; canvas may be scaled).
            var cur = getCssPx(el, 'width');
            if (cur && target <= cur + 1) return;

            // Preserve visual center to match builder layout expectation.
            // If we only change width, the box grows to the right and appears shifted.
            try {
              var left = getCssPx(el, 'left');
              var align = '';
              try { align = String((window.getComputedStyle(el) || {}).textAlign || ''); } catch (_e) { align = ''; }
              if (left && isFinite(left) && cur && isFinite(cur)) {
                var delta = target - cur;
                // For center-aligned text (most titles), keep the center constant.
                if (align === 'center') {
                  el.style.left = String(left - delta / 2) + 'px';
                }
              }
            } catch (_e) { }

            el.style.width = String(target) + 'px';
            // ensure height is sufficient after widening
            try {
              var sh = Math.ceil(el.scrollHeight || 0);
              if (sh && isFinite(sh)) el.style.height = String(sh) + 'px';
            } catch (_e) { }
          } catch (e) { }
        }

        function run() {
          try {
            var els = document.querySelectorAll('[data-node-type="element_text"]');
            for (var i = 0; i < els.length; i++) fitOne(els[i]);
          } catch (e) { }
        }

        // Wait for fonts to load so measurement matches preview.
        try {
          if (document.fonts && document.fonts.ready && typeof document.fonts.ready.then === 'function') {
            document.fonts.ready.then(function () { setTimeout(run, 0); }).catch(function () { setTimeout(run, 0); });
          } else {
            setTimeout(run, 0);
          }
        } catch (e) { setTimeout(run, 0); }
      } catch (e) { }
    })();
(function () {
      try {
        var started = false;
        var start = function () {
          if (started) return;
          started = true;

          var prefersReduced = false;
          try {
            prefersReduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
          } catch (e) { }

          var q = function () {
            try { return document.querySelectorAll('[data-anim-preset]'); } catch (e) { return []; }
          };

          var isInfinitePreset = function (p) {
            return p === 'rotate' || p === 'spin' || p === 'flicker' || p === 'pulse' || p === 'wiggle' || p === 'heartBeat' || p === 'swayBottom';
          };

          var applyAnim = function (el) {
            try {
              if (!el) return;
              var preset = el.getAttribute('data-anim-preset') || '';
              var duration = Number(el.getAttribute('data-anim-duration') || 600);
              var delay = Number(el.getAttribute('data-anim-delay') || 0);
              var easing = el.getAttribute('data-anim-easing') || 'cubic-bezier(0.2,0.8,0.2,1)';
              var loopAttr = el.getAttribute('data-anim-loop');
              var loop = loopAttr === '1' || isInfinitePreset(preset);
              var distance = el.getAttribute('data-anim-distance') || '';
              var distanceStyle = distance ? '--miu-anim-distance:' + distance + 'px;' : '';
              var hideAfter = Number(el.getAttribute('data-anim-hide-after') || 0);

              // Use custom cubic-bezier for swayBottom to create smoother pendulum-like motion
              if (preset === 'swayBottom') {
                easing = 'cubic-bezier(0.45, 0.05, 0.55, 0.95)';
              }
              var timing = preset === 'typewriter' ? 'steps(14,end)' : easing;
              var name = 'miu-' + preset;
              try { el.style.opacity = '1'; } catch (e) { }
              try {
                el.style.animation = name + ' ' + duration + 'ms ' + timing + ' ' + delay + 'ms both' + (loop ? ' infinite' : '');
                if (distanceStyle) el.style.cssText += distanceStyle;
              } catch (e) { }
              try {
                // Hide after X ms (plus delay) if configured and not looping
                if (!loop && isFinite(hideAfter) && hideAfter > 0) {
                  try {
                    if (el.__miuHideTimer) clearTimeout(el.__miuHideTimer);
                  } catch (_e) { }
                  var total = Math.max(0, Math.floor(hideAfter + (isFinite(delay) && delay > 0 ? delay : 0)));
                  el.__miuHideTimer = setTimeout(function () {
                    try {
                      el.style.display = 'none';
                      el.setAttribute('data-miu-hidden-by-anim', '1');
                    } catch (_e2) { }
                  }, total);
                }
              } catch (e) { }
              try { el.__miuAnimApplied = true; } catch (e) { }
            } catch (e) {
              try { if (el) el.style.opacity = '1'; } catch (_e) { }
            }
          };

          var els = q();
          if (!els || !els.length) return;

          if (prefersReduced) {
            for (var i = 0; i < els.length; i++) applyAnim(els[i]);
            return;
          }

          if (!('IntersectionObserver' in window)) {
            for (var i = 0; i < els.length; i++) applyAnim(els[i]);
            return;
          }

          var obs = new IntersectionObserver(function (entries) {
            for (var i = 0; i < entries.length; i++) {
              var e = entries[i];
              if (e && e.isIntersecting) {
                applyAnim(e.target);
                try { obs.unobserve(e.target); } catch (_e) { }
              }
            }
          }, { root: null, rootMargin: '0px 0px -12% 0px', threshold: [0.08, 0.15, 0.22] });

          for (var i = 0; i < els.length; i++) {
            try { obs.observe(els[i]); } catch (e) { applyAnim(els[i]); }
          }
        };

        var getOpeningState = function () {
          try {
            var opening = document.getElementById('miuOpening');
            if (!opening) return { exists: false, open: false };
            var openAttr = String(opening.getAttribute('data-open') || '');
            return { exists: true, open: openAttr === '1' };
          } catch (e) {
            return { exists: false, open: false };
          }
        };

        var boot = function () {
          try {
            var st0 = getOpeningState();
            if (!st0.exists) {
              start();
              return;
            }

            var sawOpen = st0.open;

            var onClosed = function () {
              try {
                var st = getOpeningState();
                if (st.exists && st.open) return;
              } catch (e) { }
              cleanup();
              start();
            };

            var obs = null;
            var fallbackTimer = null;

            var cleanup = function () {
              try { window.removeEventListener('miu:opening:closed', onClosed, true); } catch (e) { }
              try { window.removeEventListener('miu:opening:willClose', onWillClose, true); } catch (e) { }
              try { if (obs) obs.disconnect(); } catch (e) { }
              try { if (fallbackTimer) clearTimeout(fallbackTimer); } catch (e) { }
            };

            try {
              window.addEventListener('miu:opening:closed', onClosed, true);
            } catch (e) { }

            var onWillClose = function () {
              try {
                cleanup();
                start();
              } catch (e) { }
            };

            try {
              window.addEventListener('miu:opening:willClose', onWillClose, true);
            } catch (e) { }

            try {
              var opening = document.getElementById('miuOpening');
              if (opening && typeof MutationObserver !== 'undefined') {
                obs = new MutationObserver(function () {
                  try {
                    var st = getOpeningState();
                    if (st.open) {
                      sawOpen = true;
                      try { if (fallbackTimer) { clearTimeout(fallbackTimer); fallbackTimer = null; } } catch (e) { }
                      return;
                    }
                    if (sawOpen && !st.open) onClosed();
                  } catch (e) { }
                });
                obs.observe(opening, { attributes: true, attributeFilter: ['data-open', 'style'] });
              }
            } catch (e) { }

            // If opening never opens (remembered / disabled), start soon.
            fallbackTimer = setTimeout(function () {
              try {
                if (!sawOpen) { cleanup(); start(); }
              } catch (e) { cleanup(); start(); }
            }, 2500);
          } catch (e) {
            start();
          }
        };

        if (document.readyState === 'loading') {
          document.addEventListener('DOMContentLoaded', boot);
        } else {
          boot();
        }
      } catch (e) { }
    })();
(function () {
      try {
        var enabled = true;
        if (!enabled) return;

        var rafId = 0;
        var active = false;
        var prevBehavior = null;
        var lastTop = 0;
        var stallCount = 0;
        var scrollRoot = null;
        var ignoreStopUntil = 0;

        var detectScrollRoot = function () {
          try {
            var cand = [document.scrollingElement, document.documentElement, document.body].filter(Boolean);
            for (var i = 0; i < cand.length; i++) {
              var el = cand[i];
              var delta = (el.scrollHeight - (el.clientHeight || window.innerHeight));
              if (delta > 2) return el;
            }
          } catch (e) { }

          var best = null;
          var bestDelta = 0;
          try {
            var nodes = document.body ? document.body.querySelectorAll('*') : [];
            for (var j = 0; j < nodes.length; j++) {
              var el2 = nodes[j];
              var cs = getComputedStyle(el2);
              var oy = cs.overflowY;
              if (oy === 'auto' || oy === 'scroll') {
                var d2 = el2.scrollHeight - el2.clientHeight;
                if (d2 > bestDelta + 2) { bestDelta = d2; best = el2; }
              }
            }
          } catch (e) { }

          return best || document.scrollingElement || document.documentElement || document.body;
        };

        var stop = function () {
          if (Date.now() < ignoreStopUntil) return;
          if (!active) return;
          active = false;
          if (rafId) { try { cancelAnimationFrame(rafId); } catch (e) { } rafId = 0; }
          try {
            if (prevBehavior !== null) document.documentElement.style.scrollBehavior = prevBehavior || '';
          } catch (e) { }
        };

        var start = function () {
          if (active) return;
          active = true;
          ignoreStopUntil = Date.now() + 700;
          try {
            prevBehavior = document.documentElement.style.scrollBehavior;
            document.documentElement.style.scrollBehavior = 'auto';
          } catch (e) { }

          try {
            scrollRoot = detectScrollRoot();
            var isDocRoot = (scrollRoot === document.scrollingElement || scrollRoot === document.documentElement || scrollRoot === document.body);
            var cur0 = isDocRoot ? (window.pageYOffset || scrollRoot.scrollTop || 0) : (scrollRoot.scrollTop || 0);
            lastTop = cur0;
            if (cur0 === 0) {
              if (isDocRoot) { try { window.scrollTo(0, 1); } catch (e) { } }
              try { scrollRoot.scrollTop = 1; } catch (e) { }
            }
          } catch (e) { }

          var lastTs = 0;
          var SPEED = 40;
          var carryPx = 0;
          var MAX_STEP_PX = 2;

          var tick = function (ts) {
            if (!active) return;
            var root = scrollRoot || detectScrollRoot();
            var isDoc = (root === document.scrollingElement || root === document.documentElement || root === document.body);
            var max = root.scrollHeight - (root.clientHeight || window.innerHeight) - 2;
            var current = isDoc
              ? (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || root.scrollTop || 0)
              : (root.scrollTop || 0);

            if (max <= 0) { scrollRoot = detectScrollRoot(); rafId = requestAnimationFrame(tick); return; }
            if (!lastTs) lastTs = ts;
            var dt = Math.min(64, ts - lastTs);
            lastTs = ts;

            var rawDelta = (dt * SPEED) / 1000 + carryPx;
            var stepPx = Math.max(1, Math.min(MAX_STEP_PX, Math.floor(rawDelta)));
            carryPx = rawDelta - stepPx;
            var next = Math.min(max, current + stepPx);

            if (next !== current) {
              if (isDoc) {
                try { document.documentElement.scrollTop = next; document.body.scrollTop = next; } catch (e) { }
                try { window.scrollTo(0, next); } catch (e) { }
              } else {
                try { root.scrollTop = next; } catch (e) { }
              }
            }

            try {
              var after = isDoc ? (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0) : (root.scrollTop || 0);
              if (after <= lastTop + 0.01) {
                stallCount += 1;
                if (stallCount >= 12) {
                  stallCount = 0;
                  scrollRoot = detectScrollRoot();
                  var r2 = scrollRoot;
                  var isDoc2 = (r2 === document.scrollingElement || r2 === document.documentElement || r2 === document.body);
                  if (isDoc2) {
                    var y2 = Math.min((document.documentElement.scrollTop || document.body.scrollTop || 0) + 2, max);
                    try { document.documentElement.scrollTop = y2; document.body.scrollTop = y2; } catch (e) { }
                    try { window.scrollTo(0, y2); } catch (e) { }
                    lastTop = y2;
                  } else {
                    try { r2.scrollTop = Math.min((r2.scrollTop || 0) + 2, max); } catch (e) { }
                    lastTop = r2.scrollTop || 0;
                  }
                }
              } else {
                stallCount = 0;
              }
              lastTop = after;
            } catch (e) { }

            if (next >= max - 1) { stop(); return; }
            rafId = requestAnimationFrame(tick);
          };

          rafId = requestAnimationFrame(tick);
        };

        // Stop on user intent
        ['wheel', 'touchstart', 'keydown', 'pointerdown'].forEach(function (ev) {
          try { window.addEventListener(ev, stop, { passive: true }); } catch (e) { }
        });

        var opening = document.getElementById('miuOpening');
        if (opening) {
          // start after opening closes
          try {
            var stage = document.getElementById('miuOpeningSides');
            if (stage) {
              var sides = stage.querySelectorAll('.card-side');
              var done = 0;
              var onEnd = function () {
                done += 1;
                if (done >= 2) setTimeout(start, 350);
              };
              for (var i = 0; i < sides.length; i++) {
                try { sides[i].addEventListener('animationend', onEnd, { once: true }); } catch (e) { }
              }
            }
          } catch (e) { }
          // fallback in case animation events fail
          setTimeout(function () {
            try {
              var open = opening.getAttribute('data-open');
              if (open === '0') start();
            } catch (e) { }
          }, 6000);
        } else {
          // no cover => start immediately
          setTimeout(start, 350);
        }
      } catch (e) { }
    })();
(function () {
      try {
        var el = document.getElementById('miuOpening');
        var btn = document.getElementById('miuOpeningBtn');
        var cta = document.getElementById('miuOpeningCtaBtn');
        var stage = document.getElementById('miuOpeningSides');
        var mainStage = document.querySelector('.miu-stage');
        if (!el) return;
        var presetId = "phongbitrang";
        var key = 'miu_opening_opened_' + "quang-anh-ninh-giang-2026-12-31";

        var getParam = function (name) {
          try {
            var qs = (window && window.location && window.location.search) ? window.location.search : '';
            if (!qs) return '';
            var sp = new URLSearchParams(qs);
            return String(sp.get(name) || '');
          } catch (e) { return ''; }
        };

        var forceOpen = getParam('opening') === '1';
        var resetOpen = getParam('openingReset') === '1';

        var remember = false;
        var autoOpen = false;

        var clearOpened = function () {
          if (!remember) return;
          try { localStorage.removeItem(key); } catch (e) { }
          try { document.cookie = key + '=; path=/; max-age=0; samesite=lax'; } catch (e) { }
        };

        if (resetOpen) {
          try { clearOpened(); } catch (e) { }
        }
        var opened = false;
        if (remember) {
          try { opened = localStorage.getItem(key) === '1'; } catch (e) { }
          if (!opened) {
            try {
              opened = (document.cookie || '').indexOf(key + '=1') >= 0;
            } catch (e) { }
          }
        }

        var setOpen = function (v) {
          try {
            el.setAttribute('data-open', v ? '1' : '0');
            try { el.style.display = v ? 'block' : 'none'; } catch (e) { }
            if (v) {
              document.documentElement.style.overflow = 'hidden';
              document.body.style.overflow = 'hidden';
            } else {
              document.documentElement.style.overflow = '';
              document.body.style.overflow = '';
            }
          } catch (e) { }
        };

        var syncStageSize = function () {
          try {
            if (!stage) return;
            var cw = 575;
            var ch = 10881;
            var phone = 600;
            try {
              if (mainStage) {
                var cs = getComputedStyle(mainStage);
                var cw2 = parseFloat((cs.getPropertyValue('--cw') || '').trim());
                var ch2 = parseFloat((cs.getPropertyValue('--ch') || '').trim());
                var phone2 = parseFloat((cs.getPropertyValue('--phone') || '').trim());
                if (isFinite(cw2) && cw2 > 0) cw = cw2;
                if (isFinite(ch2) && ch2 > 0) ch = ch2;
                if (isFinite(phone2) && phone2 > 0) phone = phone2;
              }
            } catch (e) { }

            var vw = (window && window.innerWidth) ? window.innerWidth : phone;
            var s = Math.min(1, phone / cw, vw / cw);
            if (!isFinite(s) || s <= 0) s = 1;
            // For PC, use fixed 600px width for opening
            var openingWidth = vw <= 480 ? String(Math.round(cw * s)) + 'px' : '600px';
            stage.style.setProperty('--miu-opening-w', openingWidth);
          } catch (e) { }
        };

        if (forceOpen || autoOpen) {
          try { syncStageSize(); } catch (e) { }
          setOpen(true);
        } else if (!remember) {
          try { syncStageSize(); } catch (e) { }
          setOpen(true);
        } else if (!opened) {
          try { syncStageSize(); } catch (e) { }
          setOpen(true);
        }

        try {
          window.addEventListener('resize', function () { syncStageSize(); }, { passive: true });
        } catch (e) { }

        try {
          setTimeout(function () { try { syncStageSize(); } catch (e) { } }, 0);
          setTimeout(function () { try { syncStageSize(); } catch (e) { } }, 250);
        } catch (e) { }

        var markOpened = function () {
          if (!remember) return;
          try { localStorage.setItem(key, '1'); } catch (e) { }
          try { document.cookie = key + '=1; path=/; max-age=' + (60 * 60 * 24 * 365) + '; samesite=lax'; } catch (e) { }
        };

        var runOpen = function () {
          try {
            if (!stage) return;
            try { syncStageSize(); } catch (e) { }
            // prevent double click
            try { if (btn) btn.setAttribute('disabled', 'disabled'); } catch (e) { }
            try { if (cta) cta.setAttribute('disabled', 'disabled'); } catch (e) { }

            var sides = stage.querySelectorAll('.card-side');
            var done = 0;
            var earlyTimer = 0;
            var finish = function () {
              try { if (earlyTimer) clearTimeout(earlyTimer); } catch (e) { }
              var doClose = function () {
                try { setOpen(false); } catch (e) { }
                try { markOpened(); } catch (e) { }
                try { stage.classList.remove('_animating'); } catch (e) { }
                try { if (btn) btn.removeAttribute('disabled'); } catch (e) { }
                try { if (cta) cta.removeAttribute('disabled'); } catch (e) { }
                try { window.dispatchEvent(new Event('miu:opening:closed')); } catch (e) { }
              };
              // For envelope presets (phongbixanh), keep the cover a bit longer after parts move away.
              // This avoids revealing the invitation too early.
              if (presetId === 'phongbixanh') {
                doClose();
                return;
              }
              doClose();
            };
            var onEnd = function () {
              done += 1;
              if (done >= 2) finish();
            };

            if (sides && sides.length) {
              // listen once per side, then start animation
              for (var i = 0; i < sides.length; i++) {
                try { sides[i].addEventListener('animationend', onEnd, { once: true }); } catch (e) { }
              }
            } else {
              // fallback: if no sides found
              setTimeout(finish, 1200);
            }
            stage.classList.add('_animating');

            // Fire a bit earlier so page animations start before the cover fully disappears.
            // Compute from actual CSS animation timing to avoid hardcoded constants.
            try {
              var parseMs = function (v) {
                try {
                  var s = String(v || '').trim();
                  if (!s) return 0;
                  var head = (s.split(',')[0] || '').trim();
                  if (!head) return 0;
                  if (head.indexOf('ms') >= 0) return Math.max(0, Math.round(parseFloat(head)) || 0);
                  if (head.indexOf('s') >= 0) return Math.max(0, Math.round((parseFloat(head) || 0) * 1000));
                  var n = Number(head);
                  return isFinite(n) ? Math.max(0, Math.round(n)) : 0;
                } catch (e) { return 0; }
              };

              var total = 0;
              try {
                for (var ti = 0; ti < sides.length; ti++) {
                  var cs = null;
                  try { cs = window.getComputedStyle(sides[ti]); } catch (e) { cs = null; }
                  if (!cs) continue;
                  var d = parseMs(cs.animationDelay);
                  var du = parseMs(cs.animationDuration);
                  total = Math.max(total, d + du);
                }
              } catch (e) { }

              // Default if style read fails
              if (!total) total = 4500;

              // Start a bit before end (tunable)
              var lead = 1200;
              var t = Math.max(0, Math.round(total - lead));
              earlyTimer = setTimeout(function () {
                try { window.dispatchEvent(new Event('miu:opening:willClose')); } catch (e) { }
              }, t);
            } catch (e) { }
          } catch (e) {
            try { setOpen(false); } catch (_e) { }
          }
        };

        // Click anywhere to open
        try {
          el.style.cursor = 'pointer';
          el.addEventListener('click', function () {
            try { runOpen(); } catch (e) { }
          }, true);
        } catch (e) { }

        if (btn) {
          try {
            btn.addEventListener('click', function () {
              try { runOpen(); } catch (e) { }
            }, true);
          } catch (e) { }
        }
        if (cta && "Mở thiệp" !== '') {
          try {
            cta.addEventListener('click', function () {
              try { runOpen(); } catch (e) { }
            }, true);
          } catch (e) { }
        }

        // Auto-open if flag is set
        if (autoOpen) {
          try { setTimeout(function () { runOpen(); }, 500); } catch (e) { }
        }
      } catch (e) { }
    })();
(function () {
      try {
        var btn = document.getElementById('audioToggleBtn');
        var audio = document.getElementById('bgAudio');
        if (!btn || !audio) return;
        var didLoadOnce = false;
        var loadTries = 0;
        var lastLoadAt = 0;
        var startAt = 66;
        if (!isFinite(startAt) || startAt < 0) startAt = 0;
        startAt = Math.floor(startAt);
        var seekTries = 0;
        var ensureStart = function () {
          try {
            if (!audio) return;
            // Avoid calling audio.load() in a retry loop.
            // Repeated load() calls can cause the browser to cancel/restart the media request continuously.
            if (audio.readyState < 1) {
              // Some browsers (notably Safari) may need a few explicit load() attempts before metadata becomes available.
              // Cap attempts to avoid spamming canceled requests.
              try {
                var now = Date.now();
                if (audio.load && loadTries < 4 && (now - lastLoadAt) > 800) {
                  loadTries = (loadTries | 0) + 1;
                  lastLoadAt = now;
                  audio.load();
                }
              } catch (e) { }
              return;
            }
            var d = audio.duration;
            var max = (isFinite(d) && d > 0) ? Math.max(0, d - 0.05) : startAt;
            var t = Math.max(0, Math.min(startAt, max));
            // Only seek when we're at the beginning (or before target) to avoid disrupting user seeking.
            if (!isFinite(audio.currentTime) || audio.currentTime < t - 0.01) {
              audio.currentTime = t;
            }
          } catch (e) { }
        };
        var ensureStartRetry = function () {
          try {
            ensureStart();
            seekTries = (seekTries | 0) + 1;
            if (seekTries > 25) return;
            setTimeout(function () {
              try { ensureStart(); } catch (e) { }
            }, 120);
          } catch (e) { }
        };
        var sync = function () {
          try {
            var playing = !!(audio && !audio.paused);
            if (playing) { btn.classList.add('playing'); btn.classList.remove('muted'); }
            else { btn.classList.remove('playing'); btn.classList.add('muted'); }
          } catch (e) { }
        };
        btn.addEventListener('click', function () {
          try {
            if (!audio) return;
            if (audio.paused) {
              try {
                if (!didLoadOnce && audio.readyState < 1 && audio.load) {
                  didLoadOnce = true;
                  loadTries = 0;
                  lastLoadAt = 0;
                  audio.load();
                }
              } catch (e) { }
              seekTries = 0;
              ensureStartRetry();
              var p = audio.play();
              if (p && p.catch) p.catch(function () { });
              setTimeout(ensureStartRetry, 0);
              setTimeout(ensureStartRetry, 250);
              setTimeout(ensureStartRetry, 700);
            }
            else { audio.pause(); }
          } catch (e) { }
          setTimeout(sync, 50);
        }, true);
        try { audio.addEventListener('loadedmetadata', ensureStart); } catch (e) { }
        try { audio.addEventListener('canplay', ensureStartRetry); } catch (e) { }
        try { audio.addEventListener('play', ensureStart); } catch (e) { }
        try { audio.addEventListener('playing', ensureStartRetry); } catch (e) { }
        audio.addEventListener('play', sync);
        audio.addEventListener('pause', sync);
        audio.addEventListener('ended', sync);
        sync();
      } catch (e) { }
    })();
(function () {
      try {
        var toast = function (msg, kind) {
          try {
            msg = String(msg || '').trim();
            if (!msg) return;
            var wrap = document.querySelector('.miu-toast-wrap');
            if (!wrap) {
              wrap = document.createElement('div');
              wrap.className = 'miu-toast-wrap';
              document.body.appendChild(wrap);
            }
            var el = document.createElement('div');
            el.className = 'miu-toast';
            el.setAttribute('data-kind', kind || 'info');
            el.textContent = msg;
            wrap.appendChild(el);
            setTimeout(function () { try { if (el && el.parentNode) el.parentNode.removeChild(el); } catch (e) { } }, 2400);
          } catch (e) { }
        };

        var esc = function (s) {
          return String(s || '')
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;');
        };
        var sections = document.querySelectorAll('[data-miu-wishes="1"]');
        if (!sections || !sections.length) return;

        var attach = function (sec) {
          try {
            var id = sec.getAttribute('data-miu-wishes-id') || '';
            var slug = sec.getAttribute('data-slug') || '';
            if (!id || !slug) return;
            var listEl = sec.querySelector('[data-miu-wishes-list="1"][data-miu-wishes-id="' + id.replace(/"/g, '\"') + '"]');
            var form = sec.querySelector('[data-miu-wishes-form="1"][data-miu-wishes-id="' + id.replace(/"/g, '\"') + '"]');
            var moreBtn = sec.querySelector('[data-miu-wishes-more="1"][data-miu-wishes-id="' + id.replace(/"/g, '\"') + '"]');
            if (!form) return;

            var initial = parseInt(sec.getAttribute('data-initial-limit') || '3', 10);
            if (!isFinite(initial) || initial < 1) initial = 3;
            var showN = Math.max(1, initial);
            var cache = null;
            var loading = false;

            var renderItems = function (arr, limit) {
              try {
                var out = '';
                for (var i = 0; i < Math.min(limit, arr.length); i++) {
                  var w = arr[i] || {};
                  out += '<div class="miu-wishes-item">'
                    + '<div class="miu-wishes-name">' + esc(w.fullname || '') + '</div>'
                    + '<div class="miu-wishes-comment">' + esc(w.comment || '') + '</div>'
                    + '</div>';
                }
                return out;
              } catch (e) {
                return '';
              }
            };

            var renderPreview = function () {
              try {
                if (!listEl) return;
                var arr = (cache && cache.length) ? cache : [];
                if (!arr.length) {
                  var emptyText = String(sec.getAttribute('data-empty-text') || 'Chưa có lời chúc nào');
                  listEl.innerHTML = '<div class="miu-wishes-empty">' + esc(emptyText) + '</div>';
                  try { listEl.style.display = ''; } catch (e) { }
                  if (moreBtn) moreBtn.style.display = 'none';
                  return;
                }

                try { listEl.style.display = ''; } catch (e) { }
                if (moreBtn) moreBtn.style.display = '';
                listEl.innerHTML = renderItems(arr, showN);
                if (moreBtn) {
                  moreBtn.style.display = (arr.length > showN) ? '' : 'none';
                  if (sec.getAttribute('data-loadmore-text')) moreBtn.textContent = sec.getAttribute('data-loadmore-text');
                }
              } catch (e) { }
            };

            var renderAll = function () {
              try { renderPreview(); } catch (e) { }
            };

            var load = function (force) {
              try {
                if (loading) return;
                if (!listEl) return;
                if (cache && !force) { renderAll(); return; }
                loading = true;
                fetch('/api/invitations/slug/' + encodeURIComponent(slug) + '/wishes', { cache: 'no-store' })
                  .then(function (res) { return res.json().then(function (j) { return { ok: res.ok, json: j }; }); })
                  .then(function (out) {
                    if (!out.ok || !out.json || out.json.success !== true) throw new Error((out.json && out.json.error) || 'Tải thất bại');
                    cache = Array.isArray(out.json.data) ? out.json.data : [];
                    renderAll();
                  })
                  .catch(function (err) { toast((err && err.message) ? err.message : 'Có lỗi xảy ra', 'error'); })
                  .finally(function () { loading = false; });
              } catch (e) { }
            };

            if (moreBtn) {
              moreBtn.addEventListener('click', function () {
                try {
                  var step = Math.max(3, initial);
                  showN = showN + step;
                  renderPreview();
                  try { listEl.scrollTo({ top: listEl.scrollHeight, behavior: 'smooth' }); } catch (_e) { }
                } catch (e) { }
              }, true);
            }

            form.addEventListener('submit', function (ev) {
              try {
                ev.preventDefault();
                var fd = new FormData(form);
                var fullname = String(fd.get('fullname') || '').trim();
                var comment = String(fd.get('comment') || '').trim();
                if (!fullname) { toast('Vui lòng nhập tên', 'error'); return; }
                if (!comment) { toast('Vui lòng nhập lời chúc', 'error'); return; }
                fetch('/api/invitations/slug/' + encodeURIComponent(slug) + '/wishes', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ fullname: fullname, comment: comment })
                }).then(function (res) {
                  return res.json().then(function (j) { return { ok: res.ok, json: j }; });
                }).then(function (out) {
                  if (!out.ok || !out.json || out.json.success !== true) throw new Error((out.json && out.json.error) || 'Gửi thất bại');
                  try { form.reset(); } catch (_e) { }
                  // prepend
                  if (!cache) cache = [];
                  try { cache.unshift(out.json.data || { fullname: fullname, comment: comment }); } catch (_e) { }
                  showN = Math.max(showN, 1);
                  toast('Đã gửi lời chúc!', 'success');
                  if (listEl) renderAll();
                }).catch(function (err) {
                  toast((err && err.message) ? err.message : 'Có lỗi xảy ra', 'error');
                });
              } catch (e) { }
            }, true);
            if (listEl) load(false);
          } catch (e) { }
        };

        for (var i = 0; i < sections.length; i++) attach(sections[i]);
      } catch (e) { }
    })();
(function () {
      try {
        var toast = function (msg, kind) {
          try {
            msg = String(msg || '').trim();
            if (!msg) return;
            var wrap = document.querySelector('.miu-toast-wrap');
            if (!wrap) {
              wrap = document.createElement('div');
              wrap.className = 'miu-toast-wrap';
              document.body.appendChild(wrap);
            }
            var el = document.createElement('div');
            el.className = 'miu-toast';
            el.setAttribute('data-kind', kind || 'info');
            el.textContent = msg;
            wrap.appendChild(el);
            setTimeout(function () { try { if (el && el.parentNode) el.parentNode.removeChild(el); } catch (e) { } }, 2400);
          } catch (e) { }
        };

        var sections = document.querySelectorAll('[data-miu-rsvp="1"]');
        if (!sections || !sections.length) return;
        var attach = function (sec) {
          try {
            var id = sec.getAttribute('data-miu-rsvp-id') || '';
            var slug = sec.getAttribute('data-slug') || '';
            if (!id || !slug) return;
            var form = sec.querySelector('[data-miu-rsvp-form="1"][data-miu-rsvp-id="' + id.replace(/"/g, '\"') + '"]');
            if (!form) return;
            form.addEventListener('submit', function (ev) {
              try {
                ev.preventDefault();
                var fd = new FormData(form);
                var guestName = String(fd.get('guestName') || '').trim();
                var willAttend = String(fd.get('willAttend') || 'yes') === 'yes';
                var eventType = String(fd.get('eventType') || '').trim();
                var eventName = String(fd.get('eventName') || '').trim();
                var message = String(fd.get('message') || '').trim();
                var hasNumField = (function () {
                  try {
                    return fd.get('numberOfGuests') !== null;
                  } catch (e) { return false; }
                })();
                var hasExtraCheckbox = (function () {
                  try {
                    return fd.get('extraCheckbox') !== null;
                  } catch (e) { return false; }
                })();
                var hasExtraOptions = (function () {
                  try {
                    return fd.getAll('extraOptions').length > 0;
                  } catch (e) { return false; }
                })();
                var hasExtraOther = (function () {
                  try {
                    return fd.get('extraOther') !== null;
                  } catch (e) { return false; }
                })();
                var num = (function () {
                  try {
                    if (!hasNumField) return 1;
                    var raw = String(fd.get('numberOfGuests') || '').trim();
                    var n = parseInt(raw, 10);
                    if (!isFinite(n) || n < 1) return 1;
                    if (n > 50) return 50;
                    return n;
                  } catch (e) { return 1; }
                })();
                if (!guestName) { toast('Vui lòng nhập họ tên', 'error'); return; }
                var payload = { guestName: guestName, willAttend: willAttend, eventType: eventType, eventName: eventName, message: message };
                if (hasNumField) payload.numberOfGuests = num;
                if (hasExtraCheckbox) payload.extraCheckbox = String(fd.get('extraCheckbox') || '') === '1';
                if (hasExtraOptions) {
                  try {
                    payload.extraOptions = fd.getAll('extraOptions').map(function (x) { return String(x || '').trim(); }).filter(Boolean);
                  } catch (e) { }
                }
                if (hasExtraOther) {
                  try {
                    var otherChecked = String(fd.get('extraOtherChecked') || '') === '1';
                    var otherText = String(fd.get('extraOther') || '').trim();
                    if (otherChecked && otherText) payload.extraOther = otherText;
                  } catch (e) { }
                }

                try {
                  var custom = {};
                  var customOtherText = {};
                  var customOtherSelected = {};
                  fd.forEach(function (v, k) {
                    try {
                      k = String(k || '');
                      if (k.indexOf('cf_') !== 0) return;
                      if (k.indexOf('__otherText') > -1) {
                        try {
                          var baseKey = k.slice(3).replace(/__otherText.*$/, '');
                          var ov = String(v || '').trim();
                          if (baseKey && ov) customOtherText[baseKey] = ov;
                        } catch (_e2) { }
                        return;
                      }

                      var kk = k.slice(3);
                      if (!kk) return;
                      var vv = String(v || '').trim();
                      if (!vv) return;
                      if (vv === '__other__') {
                        customOtherSelected[kk] = true;
                        return;
                      }
                      if (custom[kk]) {
                        custom[kk] = String(custom[kk]) + ', ' + vv;
                      } else {
                        custom[kk] = vv;
                      }
                    } catch (_e) { }
                  });

                  try {
                    for (var k2 in customOtherSelected) {
                      if (!customOtherSelected.hasOwnProperty(k2)) continue;
                      var txt = customOtherText[k2];
                      if (!txt) continue;
                      if (custom[k2]) custom[k2] = String(custom[k2]) + ', ' + String(txt);
                      else custom[k2] = String(txt);
                    }
                  } catch (_e3) { }

                  if (custom && Object.keys(custom).length) payload.customFields = custom;
                } catch (e) { }

                fetch('/api/invitations/slug/' + encodeURIComponent(slug) + '/rsvp', {
                  method: 'POST',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(payload)
                })
                  .then(function (res) {
                    return res.json().then(function (j) { return { ok: res.ok, json: j }; });
                  }).then(function (out) {
                    if (!out.ok || !out.json || out.json.success !== true) throw new Error((out.json && out.json.error) || 'Gửi thất bại');
                    try { form.reset(); } catch (_e) { }
                    toast('Đã gửi xác nhận. Cảm ơn bạn!', 'success');
                  }).catch(function (err) {
                    toast((err && err.message) ? err.message : 'Có lỗi xảy ra', 'error');
                  });
              } catch (e) { }
            }, true);
          } catch (e) { }
        };
        for (var i = 0; i < sections.length; i++) attach(sections[i]);
      } catch (e) { }
    })();
(function () {
      try {
        var dock = document.getElementById('miuFabDock');
        var t = document.getElementById('miuFabToggle');
        if (!dock || !t) return;

        try {
          var key = 'miu_fab_dock_open';
          var stored = localStorage.getItem(key);
          if (stored === '0' || stored === '1') {
            dock.setAttribute('data-open', stored);
          }
        } catch (e) { }

        t.addEventListener('click', function () {
          try {
            var open = dock.getAttribute('data-open') === '1';
            var next = open ? '0' : '1';
            dock.setAttribute('data-open', next);
            try { localStorage.setItem('miu_fab_dock_open', next); } catch (e) { }
          } catch (e) { }
        }, true);

        var showTip = function (btn) {
          try {
            if (!btn) return;
            btn.classList.add('miu-tip');
            setTimeout(function () { try { btn.classList.remove('miu-tip'); } catch (e) { } }, 1200);
          } catch (e) { }
        };
        dock.addEventListener('touchstart', function (e) {
          try {
            var target = e && e.target ? e.target : null;
            if (!target) return;
            var btn = (target.closest && target.closest('.miu-fab-item')) ? target.closest('.miu-fab-item') : null;
            if (!btn) return;
            showTip(btn);
          } catch (err) { }
        }, { passive: true });
      } catch (e) { }
    })();

    (function () {
      try {
        var modalId = 'miuAlbumModal';
        var ensureModal = function () {
          var existing = document.getElementById(modalId);
          if (existing) return existing;
          var wrap = document.createElement('div');
          wrap.id = modalId;
          wrap.setAttribute('aria-hidden', 'true');
          wrap.style.cssText = 'position:fixed;inset:0;z-index:2147483000;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,0.78);padding:16px;opacity:0;transition:opacity 180ms ease;';
          wrap.innerHTML = '' +
            '<div data-miualbum-panel="1" style="width:min(920px,100%);max-height:min(90vh,860px);display:grid;grid-template-rows:auto 1fr;gap:10px;transform:scale(0.985);opacity:0.98;transition:transform 180ms ease, opacity 180ms ease;will-change:transform,opacity;">' +
            '<div style="display:flex;align-items:center;justify-content:space-between;color:rgba(255,255,255,0.92);font-size:13px;">' +
            '<div data-miualbum-count="1">1 / 1</div>' +
            '<button type="button" data-miualbum-close="1" style="border:0;background:transparent;color:rgba(255,255,255,0.92);font-size:26px;line-height:1;padding:6px 10px;cursor:pointer;">×</button>' +
            '</div>' +
            '<div style="position:relative;border-radius:14px;overflow:hidden;background:rgba(255,255,255,0.04);box-shadow:0 18px 60px rgba(0,0,0,0.45);display:flex;align-items:center;justify-content:center;min-height:320px;">' +
            '<button type="button" data-miualbum-prev="1" style="position:absolute;left:12px;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:9999px;border:1px solid rgba(255,255,255,0.25);background:rgba(0,0,0,0.35);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:20;">‹</button>' +
            '<img data-miualbum-img="1" alt="" style="max-width:100%;max-height:90vh;display:block;object-fit:contain;transition:opacity 220ms ease-in-out;opacity:1;will-change:opacity;position:relative;z-index:1;pointer-events:none;" />' +
            '<button type="button" data-miualbum-next="1" style="position:absolute;right:12px;top:50%;transform:translateY(-50%);width:44px;height:44px;border-radius:9999px;border:1px solid rgba(255,255,255,0.25);background:rgba(0,0,0,0.35);color:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;z-index:20;">›</button>' +
            '</div>' +
            '</div>';
          document.body.appendChild(wrap);
          return wrap;
        };

        var state = { open: false, albumId: '', idx: 0, imgs: [], preloaded: {} };

        var preloadAll = function (albumId, imgs) {
          try {
            if (!imgs || !imgs.length) return;
            if (!state.preloaded) state.preloaded = {};
            var key = String(albumId || '');
            if (!key) return;
            if (state.preloaded[key] === 1) return;
            state.preloaded[key] = 1;
            for (var i = 0; i < imgs.length; i++) {
              try { var im = new Image(); im.decoding = 'async'; im.loading = 'eager'; im.src = imgs[i]; } catch (_e) { }
            }
          } catch (_e) { }
        };

        var setModalImage = function (modal, imgs, idx) {
          try {
            var img = modal.querySelector('[data-miualbum-img="1"]');
            var count = modal.querySelector('[data-miualbum-count="1"]');
            if (!img) return;
            idx = Math.max(0, Math.min(imgs.length - 1, idx || 0));
            if (count) count.textContent = (idx + 1) + ' / ' + imgs.length;
            // fade
            try { img.style.transition = img.style.transition || 'opacity 220ms ease-in-out'; } catch (_e) { }
            try { img.style.opacity = '0'; } catch (_e) { }
            var nextSrc = imgs[idx];
            var preload = new Image();
            preload.onload = function () {
              try { img.setAttribute('src', nextSrc); } catch (_e) { }
              try { requestAnimationFrame(function () { try { img.style.opacity = '1'; } catch (_e2) { } }); } catch (_e) { try { img.style.opacity = '1'; } catch (_e2) { } }
            };
            preload.src = nextSrc;
          } catch (_e) { }
        };

        var openAt = function (albumId, idx) {
          var modal = ensureModal();
          var imgs = [];
          try {
            var nodes = document.querySelectorAll('[data-miu-album-item="1"][data-miu-album-id="' + albumId.replace(/"/g, '\"') + '"]');
            for (var i = 0; i < nodes.length; i++) {
              var s = nodes[i].getAttribute('data-src') || '';
              if (s) imgs.push(s);
            }
          } catch (e) { }
          if (!imgs.length) return;
          preloadAll(albumId, imgs);
          state.open = true;
          state.albumId = albumId;
          state.imgs = imgs;
          state.idx = Math.max(0, Math.min(imgs.length - 1, idx || 0));

          setModalImage(modal, imgs, state.idx);

          modal.style.display = 'flex';
          modal.setAttribute('aria-hidden', 'false');
          try {
            modal.style.opacity = '0';
            var panel = modal.querySelector('[data-miualbum-panel="1"]');
            if (panel) { panel.style.transform = 'scale(0.985)'; panel.style.opacity = '0.98'; }
            requestAnimationFrame(function () {
              try { modal.style.opacity = '1'; } catch (_e) { }
              try { if (panel) { panel.style.transform = 'scale(1)'; panel.style.opacity = '1'; } } catch (_e) { }
            });
          } catch (_e) { }
        };

        var close = function () {
          var modal = document.getElementById(modalId);
          if (!modal) return;
          state.open = false;
          try {
            modal.style.opacity = '0';
            var panel = modal.querySelector('[data-miualbum-panel="1"]');
            if (panel) { panel.style.transform = 'scale(0.985)'; panel.style.opacity = '0.98'; }
            setTimeout(function () {
              try { modal.style.display = 'none'; } catch (_e) { }
              try { modal.setAttribute('aria-hidden', 'true'); } catch (_e) { }
            }, 180);
          } catch (_e) {
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
          }
        };

        var step = function (dir) {
          var modal = document.getElementById(modalId);
          if (!modal || !state.open || !state.imgs || !state.imgs.length) return;
          state.idx = (state.idx + dir + state.imgs.length) % state.imgs.length;
          setModalImage(modal, state.imgs, state.idx);
        };

        var setSliderIdx = function (albumId, idx) {
          try {
            var items = document.querySelectorAll('[data-miu-album-item="1"][data-miu-album-id="' + albumId.replace(/"/g, '\"') + '"]');
            var src = '';
            var len = items ? items.length : 0;
            if (!len) return;
            idx = (Number(idx || 0) % len + len) % len;
            try { src = (items[idx] && items[idx].getAttribute) ? (items[idx].getAttribute('data-src') || '') : ''; } catch (_e) { src = ''; }
            if (!src) return;

            // preload whole album once
            try {
              var all = [];
              for (var ii = 0; ii < len; ii++) {
                try { var ss = (items[ii] && items[ii].getAttribute) ? (items[ii].getAttribute('data-src') || '') : ''; if (ss) all.push(ss); } catch (_e) { }
              }
              preloadAll(albumId, all);
            } catch (_e) { }

            var mainImg = document.querySelector('[data-miu-album-main-img="1"][data-miu-album-id="' + albumId.replace(/"/g, '\"') + '"]');
            if (mainImg) {
              try { mainImg.style.opacity = '0'; } catch (_e) { }
              var preload = new Image();
              preload.onload = function () {
                try { mainImg.setAttribute('src', src); } catch (_e) { }
                try { requestAnimationFrame(function () { try { mainImg.style.opacity = '1'; } catch (_e2) { } }); } catch (_e) { try { mainImg.style.opacity = '1'; } catch (_e2) { } }
              };
              preload.src = src;
            }

            var thumbs = document.querySelectorAll('[data-miu-album-thumb="1"][data-miu-album-id="' + albumId.replace(/"/g, '\"') + '"]');
            for (var i = 0; i < thumbs.length; i++) {
              var th = thumbs[i];
              var isActive = String(th.getAttribute('data-idx') || '') === String(idx);
              try {
                if (isActive) {
                  th.setAttribute('data-active', '1');
                  th.style.boxShadow = '0 0 0 2px rgba(236,72,153,0.95)';
                } else {
                  th.removeAttribute('data-active');
                  th.style.boxShadow = '0 0 0 1px rgba(0,0,0,0.08)';
                }
              } catch (_e) { }
            }

            var slider = document.querySelector('[data-miu-album-slider="1"][data-miu-album-id="' + albumId.replace(/"/g, '\"') + '"]');
            if (slider) slider.setAttribute('data-idx', String(idx));
          } catch (_e) { }
        };

        document.addEventListener('click', function (e) {
          try {
            var t = e && e.target;
            if (!t) return;
            var mainBtn = t.closest ? t.closest('[data-miu-album-main="1"]') : null;
            if (mainBtn) {
              e.preventDefault();
              e.stopPropagation();
              var albumId0 = mainBtn.getAttribute('data-miu-album-id') || '';
              if (!albumId0) return;
              var slider0 = document.querySelector('[data-miu-album-slider="1"][data-miu-album-id="' + albumId0.replace(/"/g, '\"') + '"]');
              var idx0 = 0;
              try { idx0 = Number(slider0 ? (slider0.getAttribute('data-idx') || '0') : '0') || 0; } catch (_e) { idx0 = 0; }
              openAt(albumId0, idx0);
              return;
            }

            var prevBtn = t.closest ? t.closest('[data-miu-album-prev="1"]') : null;
            if (prevBtn) {
              e.preventDefault();
              e.stopPropagation();
              var aidp = prevBtn.getAttribute('data-miu-album-id') || '';
              var slp = document.querySelector('[data-miu-album-slider="1"][data-miu-album-id="' + aidp.replace(/"/g, '\"') + '"]');
              var curp = 0;
              try { curp = Number(slp ? (slp.getAttribute('data-idx') || '0') : '0') || 0; } catch (_e) { curp = 0; }
              setSliderIdx(aidp, curp - 1);
              return;
            }

            var nextBtn = t.closest ? t.closest('[data-miu-album-next="1"]') : null;
            if (nextBtn) {
              e.preventDefault();
              e.stopPropagation();
              var aidn = nextBtn.getAttribute('data-miu-album-id') || '';
              var sln = document.querySelector('[data-miu-album-slider="1"][data-miu-album-id="' + aidn.replace(/"/g, '\"') + '"]');
              var curn = 0;
              try { curn = Number(sln ? (sln.getAttribute('data-idx') || '0') : '0') || 0; } catch (_e) { curn = 0; }
              setSliderIdx(aidn, curn + 1);
              return;
            }

            var thumb = t.closest ? t.closest('[data-miu-album-thumb="1"]') : null;
            if (thumb) {
              e.preventDefault();
              e.stopPropagation();
              var aidt = thumb.getAttribute('data-miu-album-id') || '';
              var idxt = Number(thumb.getAttribute('data-idx') || '0') || 0;
              setSliderIdx(aidt, idxt);
              return;
            }

            var item = t.closest ? t.closest('[data-miu-album-item="1"]') : null;
            if (item) {
              e.preventDefault();
              e.stopPropagation();
              var albumId = item.getAttribute('data-miu-album-id') || '';
              var idx = Number(item.getAttribute('data-idx') || '0') || 0;
              if (albumId) openAt(albumId, idx);
              return;
            }
            var modal = t.closest ? t.closest('#' + modalId) : null;
            if (modal) {
              var closeBtn = (t.closest && t.closest('[data-miualbum-close="1"]')) ? t.closest('[data-miualbum-close="1"]') : null;
              if (closeBtn) { close(); return; }
              var prevBtn2 = (t.closest && t.closest('[data-miualbum-prev="1"]')) ? t.closest('[data-miualbum-prev="1"]') : null;
              if (prevBtn2) { step(-1); return; }
              var nextBtn2 = (t.closest && t.closest('[data-miualbum-next="1"]')) ? t.closest('[data-miualbum-next="1"]') : null;
              if (nextBtn2) { step(1); return; }
              // click backdrop
              if (t === modal) { close(); return; }
            }
          } catch (_e) { }
        }, true);

        document.addEventListener('keydown', function (e) {
          try {
            if (!state.open) return;
            if (e.key === 'Escape') close();
            if (e.key === 'ArrowLeft') step(-1);
            if (e.key === 'ArrowRight') step(1);
          } catch (_e) { }
        }, true);

        // init sliders
        try {
          var sliders = document.querySelectorAll('[data-miu-album-slider="1"]');
          for (var i = 0; i < sliders.length; i++) {
            var s = sliders[i];
            var aid = s.getAttribute('data-miu-album-id') || '';
            if (!aid) continue;
            if (!s.getAttribute('data-idx')) s.setAttribute('data-idx', '0');
            setSliderIdx(aid, Number(s.getAttribute('data-idx') || '0') || 0);

            // autoplay
            try {
              if (s.getAttribute('data-autoplay') !== '1') continue;
              if (s.getAttribute('data-autoplay-init') === '1') continue;
              s.setAttribute('data-autoplay-init', '1');
              (function (sliderEl, albumId) {
                var timer = null;
                var stop = function () { try { if (timer) clearInterval(timer); } catch (_e) { } timer = null; };
                var start = function () {
                  stop();
                  timer = setInterval(function () {
                    try {
                      var cur = Number(sliderEl.getAttribute('data-idx') || '0') || 0;
                      setSliderIdx(albumId, cur + 1);
                    } catch (_e) { }
                  }, 2500);
                };
                sliderEl.addEventListener('pointerdown', stop, true);
                sliderEl.addEventListener('touchstart', stop, { passive: true, capture: true });
                sliderEl.addEventListener('mouseenter', stop, { passive: true });
                sliderEl.addEventListener('mouseleave', start, { passive: true });

                // Lazy-start autoplay only when slider is in viewport
                try {
                  if (typeof window !== 'undefined' && 'IntersectionObserver' in window) {
                    var started = false;
                    var obs = new IntersectionObserver(function (entries) {
                      try {
                        var e = entries && entries[0];
                        if (!e) return;
                        if (e.isIntersecting) {
                          if (!started) {
                            started = true;
                            start();
                          } else {
                            start();
                          }
                        } else {
                          stop();
                        }
                      } catch (_e2) { }
                    }, { root: null, rootMargin: '0px 0px -10% 0px', threshold: [0.08, 0.15] });
                    obs.observe(sliderEl);
                  } else {
                    start();
                  }
                } catch (_e) {
                  start();
                }
              })(s, aid);
            } catch (_e) { }
          }
        } catch (_e) { }
      } catch (e) { }
    })();
  

    (function () {
      try {
        var isZalo = function () {
          try {
            var ua = String(navigator.userAgent || '');
            if (!ua) return false;
            // Zalo iOS/Android
            if (/Zalo/i.test(ua)) return true;
            return false;
          } catch (e) {
            return false;
          }
        };

        var isIOS = function () {
          try {
            var ua = String(navigator.userAgent || '');
            if (!ua) return false;
            return /iPhone|iPad|iPod/i.test(ua);
          } catch (e) {
            return false;
          }
        };

        var hasVipVideo = function () {
          try {
            return !!document.querySelector('video[data-vip-video="1"], video[data-vip-video="true"], [data-vip-video="true"], [data-vip-video="1"]');
          } catch (e) {
            return false;
          }
        };

        var swapVipVideosToGif = function () {
          try {
            var vids = document.querySelectorAll('video[data-vip-video="1"], video[data-vip-video="true"], video[data-vip-video]');
            for (var i = 0; i < vids.length; i++) {
              try {
                var v = vids[i];
                if (!v) continue;
                var src = String(v.getAttribute('src') || '');
                if (!src) continue;

                // Convert any .../api/vip-video/<name>.mp4 to .../api/vip-video/<name>.gif
                // Also handle .../vipvideo/<name>.mp4 just in case.
                var gifSrc = src;
                try {
                  gifSrc = gifSrc.replace(/\.(mp4|webm|ogg)(\?.*)?$/i, '.gif$2');
                } catch (_e1) { }
                try {
                  gifSrc = gifSrc.replace('/vipvideo/', '/api/vip-video/');
                } catch (_e2) { }

                var img = document.createElement('img');
                img.setAttribute('src', gifSrc);
                img.setAttribute('alt', '');
                try { img.setAttribute('decoding', 'async'); } catch (_e3) { }
                try { img.setAttribute('loading', 'eager'); } catch (_e4) { }

                // Preserve sizing/fit similar to the <video>
                try {
                  img.style.width = '100%';
                  img.style.height = '100%';
                  img.style.objectFit = 'cover';
                  img.style.display = 'block';
                } catch (_e5) { }
                try {
                  var cs = v.getAttribute('style');
                  if (cs) img.setAttribute('style', cs + ';width:100%;height:100%;object-fit:cover;display:block;');
                } catch (_e6) { }

                try {
                  var parent = v.parentNode;
                  if (!parent) continue;
                  parent.replaceChild(img, v);
                } catch (_e7) { }
              } catch (_e8) { }
            }
          } catch (e) { }
        };

        var renderGate = function () {
          try {
            var href = String(location.href || '');
            var cleanHref = href;
            var html = '' +
              '<div style="position:fixed;inset:0;z-index:2147483647;background:#0b1220;color:#fff;padding:24px;">' +
              '<div style="position:absolute;top:10px;right:10px;left:10px;height:120px;pointer-events:none;">' +
              '<div style="position:absolute;top:6px;right:6px;width:190px;text-align:right;font-size:13px;opacity:0.95;line-height:1.35;">Bấm dấu <b>3 chấm</b> góc phải</div>' +
              '<div style="position:absolute;top:30px;right:78px;width:120px;height:60px;">' +
              '<svg viewBox="0 0 120 60" width="120" height="60" style="display:block;">' +
              '<path d="M5,55 C40,20 70,20 112,10" fill="none" stroke="rgba(255,255,255,0.92)" stroke-width="3" stroke-linecap="round" />' +
              '<path d="M112,10 L98,6 L102,20 Z" fill="rgba(255,255,255,0.92)" />' +
              '</svg>' +
              '</div>' +
              '</div>' +
              '<div style="max-width:560px;margin:0 auto;padding-top:120px;">' +
              '<div style="font-size:18px;font-weight:800;line-height:1.35;">Thiệp VIP: Mở thiệp bằng Safari để có trải nghiệp tốt nhất!</div>' +
              '<div style="margin-top:14px;font-size:14px;line-height:1.6;">' +
              '<div style="margin-top:8px;"><b>Bước 1:</b> Bấm dấu <b>3 chấm</b> ở góc phải trên.</div>' +
              '<div style="margin-top:8px;"><b>Bước 2:</b> Chọn <b>Mở bằng Safari</b>.</div>' +
              '</div>' +
              '<div style="margin-top:16px;padding:12px 14px;border-radius:14px;background:rgba(255,255,255,0.08);border:1px solid rgba(255,255,255,0.14);">' +
              '<div style="font-size:12px;opacity:0.9;line-height:1.5;">Nếu bạn không thấy mục “Mở bằng Safari”, hãy dùng cách dự phòng:</div>' +
              '<div style="margin-top:10px;display:flex;gap:10px;flex-wrap:wrap;">' +
              '<button id="miuCopyLink" type="button" style="display:inline-flex;align-items:center;justify-content:center;padding:12px 14px;border-radius:12px;background:#ffffff;color:#0b1220;border:0;font-weight:800;">Sao chép link</button>' +
              '<button id="miuShareLink" type="button" style="display:inline-flex;align-items:center;justify-content:center;padding:12px 14px;border-radius:12px;background:rgba(255,255,255,0.12);color:#fff;border:1px solid rgba(255,255,255,0.18);font-weight:700;">Chia sẻ</button>' +
              '</div>' +
              '</div>' +
              '</div>' +
              '</div>';
            document.documentElement.style.background = '#0b1220';
            var mount = document.body;
            if (!mount) {
              try { mount = document.getElementsByTagName('body')[0]; } catch (e) { }
            }
            if (!mount) {
              return;
            }
            mount.innerHTML = html;

            // Share sheet (iOS) gives the user a native way to open in Safari.
            try {
              var shareBtn = document.getElementById('miuShareLink');
              if (shareBtn) {
                shareBtn.addEventListener('click', function () {
                  try {
                    if (navigator.share) {
                      var p = navigator.share({ url: cleanHref, title: document.title || 'Thiệp mời' });
                      try { if (p && typeof p.catch === 'function') p.catch(function () { }); } catch (e) { }
                      return;
                    }
                  } catch (e) { }
                  try {
                    var copyBtn = document.getElementById('miuCopyLink');
                    if (copyBtn && typeof copyBtn.click === 'function') copyBtn.click();
                  } catch (e) { }
                }, { passive: true });
              }
            } catch (e) { }

            // Copy link button
            try {
              var copyBtn2 = document.getElementById('miuCopyLink');
              if (copyBtn2) {
                copyBtn2.addEventListener('click', function () {
                  try {
                    var done = false;
                    if (navigator.clipboard && navigator.clipboard.writeText) {
                      var pp = navigator.clipboard.writeText(cleanHref);
                      done = true;
                      try { if (pp && typeof pp.catch === 'function') pp.catch(function () { }); } catch (e) { }
                    }
                    if (!done) {
                      var ta = document.createElement('textarea');
                      ta.value = cleanHref;
                      ta.setAttribute('readonly', '');
                      ta.style.position = 'fixed';
                      ta.style.left = '-9999px';
                      document.body.appendChild(ta);
                      ta.select();
                      try { document.execCommand('copy'); } catch (e) { }
                      try { document.body.removeChild(ta); } catch (e) { }
                    }
                  } catch (e) { }
                  try { alert('Đã sao chép link. Bạn hãy dán vào Safari/Chrome để mở.'); } catch (e) { }
                }, { passive: true });
              }
            } catch (e) { }
          } catch (e) { }
        };

        // Gate only for Zalo iOS AND only when VIP video exists
        if (isZalo() && isIOS() && hasVipVideo()) {
          try {
            if (!document.body) {
              window.addEventListener('DOMContentLoaded', function () {
                try { renderGate(); } catch (e) { }
              }, { once: true });
            } else {
              renderGate();
            }
          } catch (e) {
            renderGate();
          }
          return;
        }

        // Zalo (both iOS/Android): swap VIP <video> to <img> with .gif source for better compatibility.
        if (isZalo() && hasVipVideo()) {
          try {
            if (!document.body) {
              window.addEventListener('DOMContentLoaded', function () {
                try { swapVipVideosToGif(); } catch (e) { }
              }, { once: true });
            } else {
              swapVipVideosToGif();
            }
          } catch (e) { }
        }

        var playAll = function () {
          try {
            var vids = document.querySelectorAll('video[data-miu-play-on-opening-closed="1"]');
            for (var i = 0; i < vids.length; i++) {
              try {
                var v = vids[i];
                if (!v) continue;
                // Ensure no looping; keep last frame when ended
                try { v.loop = false; } catch (_e) { }
                // Only attempt once
                if (v.getAttribute('data-miu-played') === '1') continue;
                v.setAttribute('data-miu-played', '1');
                // Autoplay policies require muted; we render muted already
                var p = v.play && v.play();
                try { if (p && typeof p.catch === 'function') p.catch(function () { }); } catch (_e2) { }
              } catch (_e3) { }
            }
          } catch (_e4) { }
        };

        var getOpeningState = function () {
          try {
            var opening = document.getElementById('miuOpening');
            if (!opening) return { exists: false, open: false };
            var openAttr = String(opening.getAttribute('data-open') || '');
            return { exists: true, open: openAttr === '1' };
          } catch (e) {
            return { exists: false, open: false };
          }
        };

        var st = getOpeningState();
        if (!st.exists || !st.open) {
          // No opening cover, or already closed
          setTimeout(playAll, 0);
          return;
        }

        var onClosed = function () {
          try { window.removeEventListener('miu:opening:closed', onClosed, true); } catch (_e) { }
          playAll();
        };
        window.addEventListener('miu:opening:closed', onClosed, true);
      } catch (e) { }
    })();
  }, []); // Run logic

  return (
    <>
      <div className="miu-wrap">
        <div className="miu-stage" style={{ "--sh": "10881px" }}>
          <div className="miu-canvas-wrap">
            <div className="miu-canvas" data-invitation-id="6a0e698fd81ce3f11abeeaaf" style={{ height: "10881px" }}>
              <Section1 />
              <Section2 />
              <Section3 />
              <Section8 />
              <Section9 />
              <Section10 />
            </div>
          </div>
        </div>
      </div>
      <OverlayComponent />
    </>
  );
}
