/* ============================================
   VICTORIA QUANT LAB — Main JavaScript
   Navigation, GSAP animations, Particles.js,
   scroll effects, form handling
   ============================================ */

(function () {
  'use strict';

  // ============================================
  // NAVIGATION
  // ============================================
  var navbar    = document.querySelector('.navbar');
  var navToggle = document.querySelector('.nav-toggle');
  var navLinks  = document.querySelector('.nav-links');

  // Scroll effect
  window.addEventListener('scroll', function () {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  });

  // Mobile toggle
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      navToggle.classList.toggle('active');
      navLinks.classList.toggle('open');
    });
    // Close on link click
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  // ============================================
  // PARTICLES.JS
  // ============================================
  if (document.getElementById('particles-js') && typeof particlesJS !== 'undefined') {
    particlesJS('particles-js', {
      particles: {
        number:   { value: 60, density: { enable: true, value_area: 900 } },
        color:    { value: '#00d4ff' },
        shape:    { type: 'circle' },
        opacity:  { value: 0.18, random: true },
        size:     { value: 2, random: true },
        line_linked: {
          enable: true,
          distance: 140,
          color: '#00d4ff',
          opacity: 0.08,
          width: 1
        },
        move: {
          enable: true,
          speed: 0.8,
          direction: 'none',
          random: true,
          straight: false,
          out_mode: 'out'
        }
      },
      interactivity: {
        detect_on: 'canvas',
        events: {
          onhover: { enable: true, mode: 'grab' },
          onclick: { enable: false }
        },
        modes: {
          grab: { distance: 120, line_linked: { opacity: 0.25 } }
        }
      },
      retina_detect: true
    });
  }

  // ============================================
  // GSAP SCROLL ANIMATIONS
  // ============================================
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);

    // Fade-in-up for generic reveal elements
    var reveals = document.querySelectorAll(
      '.section-header, .card, .terminal-panel, .wwd-item, .feat-section, ' +
      '.pg-research-card, .pg-card, .page-hero'
    );
    reveals.forEach(function (el) {
      gsap.from(el, {
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none'
        },
        opacity: 0,
        y: 30,
        duration: 0.7,
        ease: 'power2.out'
      });
    });

    // Stagger feat stat numbers
    var statItems = document.querySelectorAll('.feat-stat-item');
    if (statItems.length) {
      gsap.from(statItems, {
        scrollTrigger: {
          trigger: statItems[0],
          start: 'top 85%'
        },
        opacity: 0,
        y: 20,
        duration: 0.5,
        stagger: 0.12,
        ease: 'power2.out'
      });
    }

    // Hero entrance
    var heroContent = document.querySelector('.hero-content');
    if (heroContent) {
      gsap.from(heroContent, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: 'power3.out',
        delay: 0.2
      });
    }
  }

  // ============================================
  // TERMINAL TYPEWRITER (hero tag)
  // ============================================
  var heroTag = document.querySelector('.hero-tag');
  if (heroTag) {
    var fullText = heroTag.textContent;
    heroTag.textContent = '';
    var idx = 0;
    var typingInterval = setInterval(function () {
      heroTag.textContent += fullText[idx];
      idx++;
      if (idx >= fullText.length) clearInterval(typingInterval);
    }, 40);
  }

  // ============================================
  // FEATURE 02 — Interactive Badge Switcher
  // ============================================
  (function () {
    var toolDisplay     = document.getElementById('toolDisplay');
    var displayIcon     = document.getElementById('toolDisplayIcon');
    var displayCat      = document.getElementById('toolDisplayCat');
    var displayLabel    = document.getElementById('toolDisplayLabel');
    var displayTag      = document.getElementById('toolDisplayTag');
    var badges          = document.querySelectorAll('.feat-badge-list .feat-badge[data-icon]');

    if (!toolDisplay || !badges.length) return;

    var catStyles = {
      LIVE: { color: '#28ca42', border: 'rgba(40,202,66,.35)', bg: 'rgba(40,202,66,.08)' },
      SOON: { color: '#00d4ff', border: 'rgba(0,212,255,.35)', bg: 'rgba(0,212,255,.08)' },
      DEV:  { color: '#a855f7', border: 'rgba(168,85,247,.35)', bg: 'rgba(168,85,247,.08)' }
    };

    function applyDisplay(icon, cat, label, tag) {
      if (displayIcon) {
        displayIcon.className = 'fa-solid ' + icon;
      }
      var style = catStyles[cat] || catStyles.DEV;
      if (displayCat) {
        displayCat.textContent = cat;
        displayCat.style.color = style.color;
        displayCat.style.borderColor = style.border;
        displayCat.style.background  = style.bg;
      }
      if (displayIcon) {
        displayIcon.style.color = style.color;
      }
      if (displayLabel) displayLabel.textContent = label;
      if (displayTag)   displayTag.textContent   = tag;
    }

    function switchTool(badge) {
      var icon  = badge.getAttribute('data-icon')  || 'fa-wave-square';
      var cat   = badge.getAttribute('data-cat')   || 'DEV';
      var label = badge.getAttribute('data-label') || '';
      var tag   = badge.getAttribute('data-tag')   || '';

      // Remove active from all, set on current
      badges.forEach(function (b) { b.classList.remove('feat-badge--active'); });
      badge.classList.add('feat-badge--active');

      if (typeof gsap !== 'undefined') {
        gsap.to(toolDisplay, {
          opacity: 0,
          duration: 0.12,
          onComplete: function () {
            applyDisplay(icon, cat, label, tag);
            gsap.to(toolDisplay, { opacity: 1, duration: 0.2 });
          }
        });
      } else {
        applyDisplay(icon, cat, label, tag);
      }
    }

    badges.forEach(function (badge) {
      badge.addEventListener('mouseenter', function () { switchTool(badge); });
      badge.addEventListener('click',      function () { switchTool(badge); });
    });
  }());

  // ============================================
  // PG-TAB FILTER + SEARCH
  // (tools.html & research.html)
  // ============================================
  (function () {
    function initTabGrid(tabBarId, gridId, emptyId, showingId, searchId) {
      var tabBar  = document.getElementById(tabBarId);
      var grid    = document.getElementById(gridId);
      if (!tabBar || !grid) return;

      var tabs    = tabBar.querySelectorAll('.pg-tab[data-tab]');
      var cards   = grid.querySelectorAll('[data-category]');
      var search  = document.getElementById(searchId);
      var emptyEl = document.getElementById(emptyId);
      var showEl  = document.getElementById(showingId);
      var activeTab = 'all';

      function filter() {
        var q = search ? search.value.toLowerCase().trim() : '';
        var count = 0;
        cards.forEach(function (card) {
          var cat   = card.getAttribute('data-category') || '';
          var title = (card.getAttribute('data-title') || '').toLowerCase();
          var matchTab    = activeTab === 'all' || cat === activeTab;
          var matchSearch = !q || title.indexOf(q) !== -1;
          var show = matchTab && matchSearch;
          card.style.display = show ? '' : 'none';
          if (show) count++;
        });
        if (emptyEl) emptyEl.style.display = count === 0 ? 'flex' : 'none';
        if (showEl) {
          var noun = tabBarId.indexOf('research') !== -1 ? 'notes' : 'tools';
          showEl.textContent = 'Showing ' + count + ' ' + noun;
        }
      }

      tabs.forEach(function (tab) {
        tab.addEventListener('click', function () {
          tabs.forEach(function (t) { t.classList.remove('active'); });
          tab.classList.add('active');
          activeTab = tab.getAttribute('data-tab');
          filter();
        });
      });

      if (search) search.addEventListener('input', filter);
    }

    initTabGrid('toolsTabBar',    'toolsGrid',    'toolsEmpty',    'toolsShowing',    'toolSearch');
    initTabGrid('researchTabBar', 'researchGrid', 'researchEmpty', 'researchShowing', 'researchSearch');

    // Research card expand/collapse toggle
    document.querySelectorAll('.pg-rc-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var card = btn.closest('.pg-research-card');
        var body = card && card.querySelector('.pg-rc-body');
        if (!body) return;
        var isOpen = !body.hidden;
        body.hidden = isOpen;
        btn.setAttribute('aria-expanded', String(!isOpen));
        btn.classList.toggle('open', !isOpen);
      });
    });
  }());

  // ============================================
  // HOME: WHAT WE DO CANVAS ANIMATIONS
  // ============================================
  (function () {
    var candleCanvas = document.getElementById('candleCanvas');
    var volCanvas = document.getElementById('volSurfaceCanvas');
    if (!candleCanvas || !volCanvas) return;

    var candleCtx = candleCanvas.getContext('2d');
    var volCtx = volCanvas.getContext('2d');
    var dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    var series = [];
    var len = 90;
    var base = 100;
    for (var i = 0; i < len; i++) {
      var drift = Math.sin(i * 0.12) * 0.28 + Math.cos(i * 0.035) * 0.18;
      var noise = (Math.random() - 0.5) * 0.42;
      var open = base;
      var close = open + drift + noise;
      var high = Math.max(open, close) + Math.random() * 0.42;
      var low = Math.min(open, close) - Math.random() * 0.42;
      base = close;
      series.push({ open: open, high: high, low: low, close: close });
    }

    function fitCanvas(canvas) {
      var w = canvas.clientWidth || 640;
      var h = canvas.clientHeight || 190;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      var ctx = canvas.getContext('2d');
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return { w: w, h: h };
    }

    function drawGrid(ctx, w, h, pad) {
      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      for (var i = 0; i <= 6; i++) {
        var y = pad.t + ((h - pad.t - pad.b) * i) / 6;
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(w - pad.r, y);
        ctx.stroke();
      }
      for (var j = 0; j <= 8; j++) {
        var x = pad.l + ((w - pad.l - pad.r) * j) / 8;
        ctx.beginPath();
        ctx.moveTo(x, pad.t);
        ctx.lineTo(x, h - pad.b);
        ctx.stroke();
      }
    }

    function drawCandlePanel(t) {
      var size = fitCanvas(candleCanvas);
      var w = size.w;
      var h = size.h;
      var ctx = candleCtx;
      ctx.clearRect(0, 0, w, h);

      var bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, 'rgba(3,18,34,0.92)');
      bg.addColorStop(1, 'rgba(2,9,20,0.98)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      var pad = { l: 30, r: 14, t: 16, b: 20 };
      drawGrid(ctx, w, h, pad);

      // Advance synthetic feed to look live.
      if (Math.random() < 0.22) {
        var last = series[series.length - 1].close;
        var signal = Math.sin((Date.now() * 0.0018) + t * 0.6) * 0.26;
        var epsilon = (Math.random() - 0.5) * 0.34;
        var nextClose = last + signal + epsilon;
        series.push({
          open: last,
          high: Math.max(last, nextClose) + Math.random() * 0.38,
          low: Math.min(last, nextClose) - Math.random() * 0.38,
          close: nextClose
        });
        if (series.length > 110) series.shift();
      }

      var minP = Infinity;
      var maxP = -Infinity;
      for (var i = 0; i < series.length; i++) {
        if (series[i].low < minP) minP = series[i].low;
        if (series[i].high > maxP) maxP = series[i].high;
      }
      var range = Math.max(maxP - minP, 1e-6);
      minP -= range * 0.1;
      maxP += range * 0.1;
      range = maxP - minP;

      function xAt(idx) {
        return pad.l + (idx / Math.max(series.length - 1, 1)) * (w - pad.l - pad.r);
      }
      function yAt(price) {
        return pad.t + ((maxP - price) / range) * (h - pad.t - pad.b);
      }

      var candleW = Math.max(((w - pad.l - pad.r) / series.length) * 0.6, 1.2);
      for (var c = 0; c < series.length; c++) {
        var d = series[c];
        var x = xAt(c);
        var yo = yAt(d.open);
        var yc = yAt(d.close);
        var yh = yAt(d.high);
        var yl = yAt(d.low);
        var up = d.close >= d.open;
        ctx.strokeStyle = up ? 'rgba(40,202,66,0.94)' : 'rgba(255,77,109,0.94)';
        ctx.fillStyle = up ? 'rgba(40,202,66,0.76)' : 'rgba(255,77,109,0.76)';
        ctx.beginPath();
        ctx.moveTo(x, yh);
        ctx.lineTo(x, yl);
        ctx.stroke();
        var top = Math.min(yo, yc);
        var bh = Math.max(Math.abs(yo - yc), 1);
        ctx.fillRect(x - candleW / 2, top, candleW, bh);
      }

      // Swing-point circles and model line to mimic quant annotation overlays.
      ctx.strokeStyle = 'rgba(0,212,255,0.7)';
      ctx.lineWidth = 1.1;
      ctx.beginPath();
      for (var p = 6; p < series.length; p += 10) {
        var px = xAt(p);
        var py = yAt(series[p].close + Math.sin(t * 1.4 + p * 0.25) * 0.35);
        if (p === 6) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      }
      ctx.stroke();
      for (var q = 8; q < series.length; q += 12) {
        var qx = xAt(q);
        var qy = yAt(series[q].close);
        ctx.strokeStyle = 'rgba(255,77,109,0.9)';
        ctx.beginPath();
        ctx.arc(qx, qy, 4.4, 0, Math.PI * 2);
        ctx.stroke();
      }

      var lastClose = series[series.length - 1].close;
      var ly = yAt(lastClose);
      ctx.setLineDash([4, 5]);
      ctx.strokeStyle = 'rgba(229,231,235,0.7)';
      ctx.beginPath();
      ctx.moveTo(pad.l, ly);
      ctx.lineTo(w - pad.r, ly);
      ctx.stroke();
      ctx.setLineDash([]);

      ctx.fillStyle = 'rgba(0,255,245,0.9)';
      ctx.font = '10px monospace';
      ctx.fillText('SMC-LIVE  f(x)=arg max P(r|X)', pad.l, h - 6);
    }

    function drawVolPanel(t) {
      var size = fitCanvas(volCanvas);
      var w = size.w;
      var h = size.h;
      var ctx = volCtx;
      ctx.clearRect(0, 0, w, h);

      var bg = ctx.createLinearGradient(0, 0, 0, h);
      bg.addColorStop(0, 'rgba(6,14,36,0.94)');
      bg.addColorStop(1, 'rgba(2,8,18,0.98)');
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, w, h);

      var cx = w * 0.5;
      var cy = h * 0.63;
      var sx = Math.min(w * 0.43, 240);
      var sy = Math.min(h * 0.3, 85);

      // Draw 3D-like sigma surface mesh (projected) with animated wave.
      var nx = 19;
      var ny = 15;
      function proj(ix, iy) {
        var u = ix / (nx - 1);
        var v = iy / (ny - 1);
        var x = (u - 0.5) * 2;
        var y = (v - 0.5) * 2;
        var z = 0.38 * Math.sin(2.8 * x + t * 1.7) * Math.cos(2.2 * y - t * 1.2)
          + 0.18 * Math.exp(-(x * x * 2.2 + y * y * 1.6));
        var px = cx + x * sx + y * sx * 0.22;
        var py = cy + y * sy - z * 78;
        return { x: px, y: py, z: z };
      }

      for (var row = 0; row < ny; row++) {
        ctx.beginPath();
        for (var col = 0; col < nx; col++) {
          var p = proj(col, row);
          if (col === 0) ctx.moveTo(p.x, p.y);
          else ctx.lineTo(p.x, p.y);
        }
        ctx.strokeStyle = 'rgba(0,212,255,0.42)';
        ctx.lineWidth = 1;
        ctx.stroke();
      }
      for (var col2 = 0; col2 < nx; col2++) {
        ctx.beginPath();
        for (var row2 = 0; row2 < ny; row2++) {
          var p2 = proj(col2, row2);
          if (row2 === 0) ctx.moveTo(p2.x, p2.y);
          else ctx.lineTo(p2.x, p2.y);
        }
        ctx.strokeStyle = 'rgba(167,139,250,0.28)';
        ctx.stroke();
      }

      // Contour markers
      for (var m = 0; m < 8; m++) {
        var iu = 2 + (m * 2) % (nx - 3);
        var iv = 2 + (m * 3) % (ny - 3);
        var pm = proj(iu, iv);
        ctx.strokeStyle = 'rgba(255,77,109,0.9)';
        ctx.beginPath();
        ctx.arc(pm.x, pm.y, 4 + Math.sin(t * 3 + m) * 0.8, 0, Math.PI * 2);
        ctx.stroke();
      }

      ctx.fillStyle = 'rgba(229,231,235,0.9)';
      ctx.font = '10px monospace';
      ctx.fillText('sigma(K,T)  =  a + b log(K/F) + cT + epsilon', 18, 18);
      ctx.fillStyle = 'rgba(0,255,245,0.85)';
      ctx.fillText('VOL-SURF update: t = ' + (t * 12).toFixed(1) + ' ms', 18, h - 8);
    }

    var raf = 0;
    var start = 0;
    function tick(ts) {
      if (!start) start = ts;
      var t = (ts - start) * 0.001;
      drawCandlePanel(t);
      drawVolPanel(t);
      raf = window.requestAnimationFrame(tick);
    }

    function onResize() {
      drawCandlePanel(0);
      drawVolPanel(0);
    }

    window.addEventListener('resize', onResize);
    raf = window.requestAnimationFrame(tick);
  }());

  // ============================================
  // TOOLS: PUBLIC BACKTEST LAB (tools.html)
  // ============================================
  (function () {
    var canvas = document.getElementById('btCanvas');
    if (!canvas) return;

    var ctx = canvas.getContext('2d');
    var runBtn = document.getElementById('btRunBtn');
    var pauseBtn = document.getElementById('btPauseBtn');
    var resetBtn = document.getElementById('btResetBtn');

    var maTypeEl = document.getElementById('btMaType');
    var fastEl = document.getElementById('btFastLen');
    var slowEl = document.getElementById('btSlowLen');
    var riskEl = document.getElementById('btRiskPct');
    var capitalEl = document.getElementById('btCapital');
    var sessionEl = document.getElementById('btSession');
    var speedEl = document.getElementById('btSpeed');
    var speedLabel = document.getElementById('btSpeedLabel');
    var liveStatus = document.getElementById('btLiveStatus');
    var skipBtn = document.getElementById('btSkipBtn');

    var metricEls = {
      netPnl: document.getElementById('btNetPnl'),
      ann: document.getElementById('btAnnReturn'),
      alpha: document.getElementById('btAlpha'),
      mdd: document.getElementById('btMdd'),
      pf: document.getElementById('btPf'),
      winRate: document.getElementById('btWinRate'),
      maxWin: document.getElementById('btMaxWin'),
      maxLoss: document.getElementById('btMaxLoss'),
      trades: document.getElementById('btTrades')
    };

    var rawData = [];
    var data = [];
    var maFast = [];
    var maSlow = [];
    var markers = [];
    var equityCurve = [];
    var trades = [];

    var playbackIndex = 0;
    var running = false;
    var rafId = null;
    var skipInProgress = false;
    var feeRate = 0.0004;

    var state = {
      startCapital: 10000,
      equity: 10000,
      riskPct: 0.01,
      position: null,
      processedIndex: 0
    };

    function parseCsvRow(line) {
      var parts = line.split(',');
      if (parts.length < 6) return null;
      var ts = new Date(parts[0].replace(' ', 'T') + 'Z');
      if (isNaN(ts.getTime())) return null;
      return {
        ts: ts,
        open: Number(parts[1]),
        high: Number(parts[2]),
        low: Number(parts[3]),
        close: Number(parts[4]),
        volume: Number(parts[5])
      };
    }

    function sessionMatch(candle, session) {
      if (session === 'all') return true;
      var h = candle.ts.getUTCHours();
      if (session === 'asia') return h >= 0 && h < 8;
      if (session === 'europe') return h >= 7 && h < 15;
      if (session === 'ny') return h >= 13 && h < 21;
      return true;
    }

    function computeSma(series, len) {
      var out = new Array(series.length).fill(null);
      var sum = 0;
      for (var i = 0; i < series.length; i++) {
        sum += series[i].close;
        if (i >= len) sum -= series[i - len].close;
        if (i >= len - 1) out[i] = sum / len;
      }
      return out;
    }

    function computeEma(series, len) {
      var out = new Array(series.length).fill(null);
      var k = 2 / (len + 1);
      var prev = null;
      for (var i = 0; i < series.length; i++) {
        var c = series[i].close;
        if (prev === null) prev = c;
        else prev = c * k + prev * (1 - k);
        if (i >= len - 1) out[i] = prev;
      }
      return out;
    }

    function computeVwma(series, len) {
      var out = new Array(series.length).fill(null);
      var pvSum = 0;
      var vSum = 0;
      for (var i = 0; i < series.length; i++) {
        var pv = series[i].close * series[i].volume;
        pvSum += pv;
        vSum += series[i].volume;
        if (i >= len) {
          pvSum -= series[i - len].close * series[i - len].volume;
          vSum -= series[i - len].volume;
        }
        if (i >= len - 1 && vSum > 0) out[i] = pvSum / vSum;
      }
      return out;
    }

    function computeMa(series, len, type) {
      if (type === 'sma') return computeSma(series, len);
      if (type === 'vwma') return computeVwma(series, len);
      return computeEma(series, len);
    }

    function crossoverSignal(i) {
      if (i < 1) return 0;
      if (maFast[i] === null || maSlow[i] === null || maFast[i - 1] === null || maSlow[i - 1] === null) return 0;
      var prevDiff = maFast[i - 1] - maSlow[i - 1];
      var currDiff = maFast[i] - maSlow[i];
      if (prevDiff <= 0 && currDiff > 0) return 1;
      if (prevDiff >= 0 && currDiff < 0) return -1;
      return 0;
    }

    function openPosition(i, side) {
      var price = data[i].close;
      var riskValue = state.equity * state.riskPct;
      var qty = Math.max(riskValue / price, 0.000001);
      var fee = qty * price * feeRate;
      state.equity -= fee;
      state.position = {
        side: side,
        entryIndex: i,
        entryPrice: price,
        qty: qty,
        entryFee: fee
      };
      markers.push({ i: i, type: side === 1 ? 'buy' : 'sell', price: price });
    }

    function closePosition(i, reason) {
      if (!state.position) return;
      var exitPrice = data[i].close;
      var p = state.position;
      var gross = p.side === 1 ? (exitPrice - p.entryPrice) * p.qty : (p.entryPrice - exitPrice) * p.qty;
      var exitFee = p.qty * exitPrice * feeRate;
      var net = gross - exitFee;
      state.equity += net;
      trades.push({
        entryIndex: p.entryIndex,
        exitIndex: i,
        side: p.side,
        entryPrice: p.entryPrice,
        exitPrice: exitPrice,
        pnl: net,
        reason: reason
      });
      markers.push({ i: i, type: p.side === 1 ? 'sell' : 'buy', price: exitPrice });
      state.position = null;
    }

    function processCandle(i) {
      var sig = crossoverSignal(i);
      if (state.position) {
        if ((state.position.side === 1 && sig === -1) || (state.position.side === -1 && sig === 1)) {
          closePosition(i, 'cross');
          openPosition(i, sig);
        }
      } else if (sig !== 0) {
        openPosition(i, sig);
      }

      var floating = 0;
      if (state.position) {
        var c = data[i].close;
        floating = state.position.side === 1
          ? (c - state.position.entryPrice) * state.position.qty
          : (state.position.entryPrice - c) * state.position.qty;
      }
      equityCurve[i] = state.equity + floating;
      state.processedIndex = i;
    }

    function fmtMoney(v) {
      var sign = v >= 0 ? '+' : '';
      return sign + '$' + Math.abs(v).toFixed(2);
    }

    function fmtPct(v) {
      var sign = v >= 0 ? '+' : '';
      return sign + (v * 100).toFixed(2) + '%';
    }

    function updateReport(isFinal) {
      if (!equityCurve.length) return;
      var endEq = equityCurve[state.processedIndex] || state.startCapital;
      var netPnl = endEq - state.startCapital;

      var peak = state.startCapital;
      var maxDd = 0;
      for (var i = 0; i <= state.processedIndex; i++) {
        var e = equityCurve[i] || state.startCapital;
        if (e > peak) peak = e;
        var dd = (peak - e) / peak;
        if (dd > maxDd) maxDd = dd;
      }

      var gp = 0;
      var gl = 0;
      var wins = 0;
      var maxWin = -Infinity;
      var maxLoss = Infinity;
      for (var t = 0; t < trades.length; t++) {
        var pnl = trades[t].pnl;
        if (pnl >= 0) {
          gp += pnl;
          wins++;
        } else {
          gl += pnl;
        }
        if (pnl > maxWin) maxWin = pnl;
        if (pnl < maxLoss) maxLoss = pnl;
      }

      var firstTs = data[0].ts.getTime();
      var lastTs = data[state.processedIndex].ts.getTime();
      var years = Math.max((lastTs - firstTs) / (1000 * 60 * 60 * 24 * 365), 1 / 365);
      var ann = Math.pow(Math.max(endEq, 1) / state.startCapital, 1 / years) - 1;

      var buyHold = (data[state.processedIndex].close - data[0].close) / data[0].close;
      var buyHoldAnn = Math.pow(1 + buyHold, 1 / years) - 1;
      var alpha = ann - buyHoldAnn;

      var pf = gl < 0 ? gp / Math.abs(gl) : gp > 0 ? 99 : 0;
      var wr = trades.length ? wins / trades.length : 0;

      metricEls.netPnl.textContent = fmtMoney(netPnl);
      metricEls.ann.textContent = fmtPct(ann);
      metricEls.alpha.textContent = fmtPct(alpha);
      metricEls.mdd.textContent = fmtPct(-maxDd);
      metricEls.pf.textContent = pf.toFixed(2);
      metricEls.winRate.textContent = (wr * 100).toFixed(1) + '%';
      metricEls.maxWin.textContent = trades.length ? fmtMoney(maxWin) : '-';
      metricEls.maxLoss.textContent = trades.length ? fmtMoney(maxLoss) : '-';
      metricEls.trades.textContent = String(trades.length);

      if (isFinal && liveStatus) {
        liveStatus.textContent = 'Completed · ' + trades.length + ' trades';
      }
    }

    function drawChart() {
      var w = canvas.width;
      var h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      if (!data.length || playbackIndex < 2) return;

      var right = playbackIndex;
      var left = Math.max(0, right - 180);
      var view = data.slice(left, right + 1);
      var pad = { l: 56, r: 16, t: 18, b: 40 };
      var chartW = w - pad.l - pad.r;
      var chartH = h - pad.t - pad.b;

      var minP = Infinity;
      var maxP = -Infinity;
      for (var i = left; i <= right; i++) {
        if (data[i].low < minP) minP = data[i].low;
        if (data[i].high > maxP) maxP = data[i].high;
        if (maFast[i] !== null) {
          if (maFast[i] < minP) minP = maFast[i];
          if (maFast[i] > maxP) maxP = maFast[i];
        }
        if (maSlow[i] !== null) {
          if (maSlow[i] < minP) minP = maSlow[i];
          if (maSlow[i] > maxP) maxP = maSlow[i];
        }
      }
      var range = Math.max(maxP - minP, 1e-6);
      minP -= range * 0.1;
      maxP += range * 0.1;
      range = maxP - minP;

      function xAt(idx) {
        return pad.l + ((idx - left) / Math.max(right - left, 1)) * chartW;
      }
      function yAt(price) {
        return pad.t + ((maxP - price) / range) * chartH;
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.09)';
      ctx.lineWidth = 1;
      for (var gy = 0; gy <= 5; gy++) {
        var yy = pad.t + (gy / 5) * chartH;
        ctx.beginPath();
        ctx.moveTo(pad.l, yy);
        ctx.lineTo(w - pad.r, yy);
        ctx.stroke();
      }

      var candleW = Math.max(chartW / view.length * 0.65, 1.2);
      for (var c = left; c <= right; c++) {
        var d = data[c];
        var x = xAt(c);
        var yo = yAt(d.open);
        var yc = yAt(d.close);
        var yh = yAt(d.high);
        var yl = yAt(d.low);
        var up = d.close >= d.open;
        ctx.strokeStyle = up ? '#28ca42' : '#ff4d6d';
        ctx.fillStyle = up ? 'rgba(40,202,66,0.78)' : 'rgba(255,77,109,0.78)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x, yh);
        ctx.lineTo(x, yl);
        ctx.stroke();
        var bodyTop = Math.min(yo, yc);
        var bodyH = Math.max(Math.abs(yo - yc), 1);
        ctx.fillRect(x - candleW / 2, bodyTop, candleW, bodyH);
      }

      function drawMa(arr, color) {
        ctx.strokeStyle = color;
        ctx.lineWidth = 1.6;
        ctx.beginPath();
        var started = false;
        for (var j = left; j <= right; j++) {
          if (arr[j] === null) continue;
          var xx = xAt(j);
          var yy = yAt(arr[j]);
          if (!started) {
            ctx.moveTo(xx, yy);
            started = true;
          } else {
            ctx.lineTo(xx, yy);
          }
        }
        ctx.stroke();
      }

      drawMa(maFast, '#00d4ff');
      drawMa(maSlow, '#f59e0b');

      for (var m = 0; m < markers.length; m++) {
        var mk = markers[m];
        if (mk.i < left || mk.i > right || mk.i > right) continue;
        var mx = xAt(mk.i);
        var my = yAt(mk.price);
        ctx.fillStyle = mk.type === 'buy' ? '#28ca42' : '#ff4d6d';
        ctx.beginPath();
        if (mk.type === 'buy') {
          ctx.moveTo(mx, my - 6);
          ctx.lineTo(mx - 5, my + 4);
          ctx.lineTo(mx + 5, my + 4);
        } else {
          ctx.moveTo(mx, my + 6);
          ctx.lineTo(mx - 5, my - 4);
          ctx.lineTo(mx + 5, my - 4);
        }
        ctx.closePath();
        ctx.fill();
      }

      if (state.position) {
        var startIdx = Math.max(state.position.entryIndex, left);
        var x0 = xAt(startIdx);
        var x1 = xAt(right);
        var yy2 = yAt(state.position.entryPrice);
        ctx.setLineDash([6, 5]);
        ctx.strokeStyle = 'rgba(229,231,235,0.9)';
        ctx.lineWidth = 1.1;
        ctx.beginPath();
        ctx.moveTo(x0, yy2);
        ctx.lineTo(x1, yy2);
        ctx.stroke();
        ctx.setLineDash([]);
      }

      var now = data[right];
      var eqNow = equityCurve[right] || state.equity;
      ctx.fillStyle = 'rgba(255,255,255,0.85)';
      ctx.font = '12px monospace';
      ctx.fillText(now.ts.toISOString().slice(0, 16).replace('T', ' ') + ' UTC', pad.l, h - 14);
      ctx.fillText('Equity: $' + eqNow.toFixed(2), w - 180, h - 14);
    }

    function tick() {
      if (!running) return;
      var speed = Number(speedEl.value) || 1;
      for (var n = 0; n < speed && playbackIndex < data.length - 1; n++) {
        playbackIndex++;
        processCandle(playbackIndex);
      }

      drawChart();
      updateReport(false);

      if (playbackIndex >= data.length - 1) {
        if (state.position) closePosition(playbackIndex, 'end');
        running = false;
        updateReport(true);
        drawChart();
        return;
      }
      rafId = requestAnimationFrame(tick);
    }

    function clearReport() {
      Object.keys(metricEls).forEach(function (k) {
        if (metricEls[k]) metricEls[k].textContent = '-';
      });
    }

    function resetState() {
      if (rafId) cancelAnimationFrame(rafId);
      running = false;
      markers = [];
      trades = [];
      equityCurve = new Array(data.length).fill(state.startCapital);
      state.equity = state.startCapital;
      state.position = null;
      playbackIndex = Math.max(Number(slowEl.value) + 2, 2);
      state.processedIndex = playbackIndex;
      clearReport();
      drawChart();
      if (liveStatus) liveStatus.textContent = 'Idle';
    }

    function buildDataFromSettings() {
      var fastLen = Math.max(Number(fastEl.value) || 9, 2);
      var slowLen = Math.max(Number(slowEl.value) || 21, fastLen + 1);
      slowEl.value = String(slowLen);

      state.riskPct = Math.max(0.001, (Number(riskEl.value) || 1) / 100);
      state.startCapital = Math.max(100, Number(capitalEl.value) || 10000);

      var session = sessionEl.value;
      data = rawData.filter(function (d) { return sessionMatch(d, session); });
      maFast = computeMa(data, fastLen, maTypeEl.value);
      maSlow = computeMa(data, slowLen, maTypeEl.value);
      resetState();
    }

    function runBacktest() {
      if (data.length < 40) {
        if (liveStatus) liveStatus.textContent = 'Not enough candles for selected session';
        return;
      }
      if (running) return;
      running = true;
      if (liveStatus) liveStatus.textContent = 'Running...';
      rafId = requestAnimationFrame(tick);
    }

    function pauseBacktest() {
      running = false;
      if (rafId) cancelAnimationFrame(rafId);
      if (liveStatus) liveStatus.textContent = 'Paused';
    }

    function skipToEnd() {
      if (skipInProgress) return;
      if (!rawData.length) {
        if (liveStatus) liveStatus.textContent = 'Data is still loading...';
        return;
      }

      if (!data.length) {
        buildDataFromSettings();
      }

      if (data.length < 2) {
        if (liveStatus) liveStatus.textContent = 'Not enough candles for current filter';
        return;
      }

      // If already at end, restart with current settings then skip again.
      if (playbackIndex >= data.length - 1) {
        buildDataFromSettings();
      }

      pauseBacktest();
      skipInProgress = true;
      if (liveStatus) liveStatus.textContent = 'Skipping to end...';

      var chunkSize = 5000;
      function stepSkip() {
        var stopAt = Math.min(playbackIndex + chunkSize, data.length - 1);
        while (playbackIndex < stopAt) {
          playbackIndex++;
          processCandle(playbackIndex);
        }

        drawChart();

        if (playbackIndex >= data.length - 1) {
          if (state.position) closePosition(playbackIndex, 'end');
          updateReport(true);
          skipInProgress = false;
          return;
        }

        setTimeout(stepSkip, 0);
      }

      setTimeout(stepSkip, 0);
    }

    function parseCsvText(text) {
      var lines = text.trim().split(/\r?\n/);
      rawData = [];
      for (var i = 1; i < lines.length; i++) {
        var row = parseCsvRow(lines[i]);
        if (row) rawData.push(row);
      }
      if (!rawData.length) {
        if (liveStatus) liveStatus.textContent = 'CSV loaded but no valid rows found';
        return false;
      }
      buildDataFromSettings();
      return true;
    }

    function loadData() {
      var sources = [
        'data/btc5m.csv',
        'https://raw.githubusercontent.com/alvinm30/victoria/main/data/btc5m.csv'
      ];

      function trySource(idx) {
        if (idx >= sources.length) {
          if (liveStatus) {
            liveStatus.textContent = 'Could not load dataset. Please check file path or network.';
          }
          return;
        }
        fetch(sources[idx], { cache: 'no-store' })
          .then(function (res) {
            if (!res.ok) throw new Error('Failed to load CSV');
            return res.text();
          })
          .then(function (text) {
            if (parseCsvText(text) && liveStatus) {
              liveStatus.textContent = 'Ready · ' + rawData.length + ' candles loaded';
            }
          })
          .catch(function () {
            trySource(idx + 1);
          });
      }

      trySource(0);
    }

    if (speedEl && speedLabel) {
      speedEl.addEventListener('input', function () {
        speedLabel.textContent = speedEl.value + ' candles / tick';
      });
    }

    if (runBtn) runBtn.addEventListener('click', function () {
      if (!rawData.length) return;
      if (!running && state.processedIndex >= data.length - 1) {
        buildDataFromSettings();
      }
      runBacktest();
    });

    if (pauseBtn) pauseBtn.addEventListener('click', pauseBacktest);
    if (resetBtn) resetBtn.addEventListener('click', function () {
      if (!rawData.length) return;
      buildDataFromSettings();
    });
    if (skipBtn) skipBtn.addEventListener('click', skipToEnd);

    [maTypeEl, fastEl, slowEl, riskEl, capitalEl, sessionEl].forEach(function (el) {
      if (!el) return;
      el.addEventListener('change', function () {
        if (!rawData.length) return;
        pauseBacktest();
        buildDataFromSettings();
      });
    });

    drawChart();
    loadData();
  }());

  // ============================================
  // TOOLS: KNOW MORE PREVIEW CHART
  // ============================================
  (function () {
    var canvas = document.getElementById('btShowcaseCanvas');
    if (!canvas) return;
    var ctx = canvas.getContext('2d');

    function drawPreviewMessage(text, color) {
      var w = canvas.width;
      var h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = 'rgba(1, 6, 16, 0.95)';
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = color || 'rgba(255,255,255,0.75)';
      ctx.font = '13px monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText(text, w / 2, h / 2);
      ctx.textAlign = 'left';
      ctx.textBaseline = 'alphabetic';
    }

    function drawPreview(rows) {
      var data = rows.slice(-120);
      if (!data.length) return;
      var w = canvas.width;
      var h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      var pad = { l: 24, r: 14, t: 14, b: 22 };
      var cw = w - pad.l - pad.r;
      var ch = h - pad.t - pad.b;

      var minP = Infinity;
      var maxP = -Infinity;
      for (var i = 0; i < data.length; i++) {
        if (data[i].low < minP) minP = data[i].low;
        if (data[i].high > maxP) maxP = data[i].high;
      }
      var range = Math.max(maxP - minP, 1e-6);
      minP -= range * 0.12;
      maxP += range * 0.12;
      range = maxP - minP;

      function xAt(idx) { return pad.l + (idx / Math.max(data.length - 1, 1)) * cw; }
      function yAt(price) { return pad.t + ((maxP - price) / range) * ch; }

      ctx.strokeStyle = 'rgba(255,255,255,0.08)';
      ctx.lineWidth = 1;
      for (var g = 0; g <= 4; g++) {
        var y = pad.t + (g / 4) * ch;
        ctx.beginPath();
        ctx.moveTo(pad.l, y);
        ctx.lineTo(w - pad.r, y);
        ctx.stroke();
      }

      var candleW = Math.max(cw / data.length * 0.58, 1);
      for (var c = 0; c < data.length; c++) {
        var d = data[c];
        var x = xAt(c);
        var yo = yAt(d.open);
        var yc = yAt(d.close);
        var yh = yAt(d.high);
        var yl = yAt(d.low);
        var up = d.close >= d.open;
        ctx.strokeStyle = up ? '#28ca42' : '#ff4d6d';
        ctx.fillStyle = up ? 'rgba(40,202,66,0.78)' : 'rgba(255,77,109,0.78)';
        ctx.beginPath();
        ctx.moveTo(x, yh);
        ctx.lineTo(x, yl);
        ctx.stroke();
        var top = Math.min(yo, yc);
        var bh = Math.max(Math.abs(yo - yc), 1);
        ctx.fillRect(x - candleW / 2, top, candleW, bh);
      }

      ctx.fillStyle = 'rgba(255,255,255,0.72)';
      ctx.font = '11px monospace';
      ctx.fillText('Interactive demo preview', pad.l, h - 8);
    }

    var previewSources = [
      'data/btc5m.csv',
      'victoria-quant-lab/data/btc5m.csv',
      'https://raw.githubusercontent.com/alvinm30/victoria/main/victoria-quant-lab/data/btc5m.csv',
      'https://raw.githubusercontent.com/alvinm30/victoria/main/data/btc5m.csv'
    ];

    function loadPreview(idx) {
      if (idx >= previewSources.length) {
        drawPreviewMessage('Preview unavailable: CSV source not found', 'rgba(255,255,255,0.6)');
        return;
      }
      fetch(previewSources[idx], { cache: 'no-store' })
        .then(function (res) {
          if (!res.ok) throw new Error('bad');
          return res.text();
        })
        .then(function (txt) {
          var lines = txt.trim().split(/\r?\n/);
          var out = [];
          for (var i = 1; i < lines.length; i++) {
            var p = lines[i].split(',');
            if (p.length < 6) continue;
            var open = Number(p[1]);
            var high = Number(p[2]);
            var low = Number(p[3]);
            var close = Number(p[4]);
            if (!isFinite(open) || !isFinite(high) || !isFinite(low) || !isFinite(close)) continue;
            out.push({
              open: open,
              high: high,
              low: low,
              close: close
            });
          }
          if (!out.length) {
            drawPreviewMessage('Preview unavailable: invalid CSV format', 'rgba(255,255,255,0.6)');
            return;
          }
          drawPreview(out);
        })
        .catch(function () {
          loadPreview(idx + 1);
        });
    }

    drawPreviewMessage('Loading preview...', 'rgba(0,212,255,0.9)');
    loadPreview(0);
  }());

  // ============================================
  // MAILBOX FORMS (contact.html + indicator-smc.html)
  // ============================================
  function openGmailCompose(to, subject, body) {
    var gmailUrl = 'https://mail.google.com/mail/?view=cm&fs=1'
      + '&to=' + encodeURIComponent(to)
      + '&su=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);

    var popup = window.open(gmailUrl, '_blank', 'noopener');
    if (popup) return true;

    // Fallback when popup is blocked.
    var mailtoUrl = 'mailto:' + encodeURIComponent(to)
      + '?subject=' + encodeURIComponent(subject)
      + '&body=' + encodeURIComponent(body);
    window.location.href = mailtoUrl;
    return false;
  }

  function wireMailboxForm(formId, config) {
    var form = document.getElementById(formId);
    if (!form) return;

    function val(selector) {
      if (!selector) return '';
      var el = form.querySelector(selector);
      return el ? el.value : '';
    }

    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = val(config.nameSelector);
      var email = val(config.emailSelector);
      var type = val(config.typeSelector);
      var message = val(config.messageSelector);

      var subject = config.subjectPrefix + (type ? ' [' + type + ']' : '');
      var bodyLines = [
        'Name: ' + (name || 'N/A'),
        'Email: ' + (email || 'N/A')
      ];
      if (type) bodyLines.push('Type: ' + type);
      bodyLines.push('Page: ' + config.pageTag);
      bodyLines.push('');
      bodyLines.push('Message:');
      bodyLines.push(message || 'N/A');

      var ok = openGmailCompose(config.toEmail, subject, bodyLines.join('\n'));

      var btn = form.querySelector('[type="submit"]');
      if (btn) {
        var original = btn.textContent;
        btn.textContent = ok ? 'Gmail Opened ✓' : 'Email App Opened ✓';
        btn.disabled = true;
        setTimeout(function () {
          btn.textContent = original;
          btn.disabled = false;
        }, 2200);
      }

      if (config.confirmationId) {
        var confirmEl = document.getElementById(config.confirmationId);
        if (confirmEl) {
          confirmEl.style.display = 'block';
          confirmEl.className = 'no-comments-msg';
          confirmEl.textContent = '> Gmail compose opened with prefilled message. Please send manually.';
        }
      }
    });
  }

  wireMailboxForm('contact-form', {
    toEmail: 'alvin_prestige_co@gmail.com',
    subjectPrefix: 'Contact Message — Victoria Quant Lab',
    pageTag: 'contact',
    nameSelector: '#name',
    emailSelector: '#email',
    messageSelector: '#message',
    confirmationId: 'form-confirmation'
  });

  wireMailboxForm('smc-mailbox-form', {
    toEmail: 'alvin_prestige_co@gmail.com',
    subjectPrefix: 'SMC Mailbox Message — Victoria Quant Lab',
    pageTag: 'indicator-smc',
    nameSelector: '#c-name',
    emailSelector: '#c-email',
    typeSelector: '#c-type',
    messageSelector: '#c-msg'
  });

})();

