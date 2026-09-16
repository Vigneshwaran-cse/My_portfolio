/* ============================================================
   VIGNESHWARAN K — Portfolio v2 JavaScript
   Includes: Particle BG · Cursor Glow · Typewriter Terminal
             Scroll Animations · 3D Tilt Cards · Rail Active State
   ============================================================ */

"use strict";

// ─────────────────────────────────────────────────
//  UTILITIES
// ─────────────────────────────────────────────────
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// ─────────────────────────────────────────────────
//  1. PARTICLE CANVAS BACKGROUND
// ─────────────────────────────────────────────────
(function initParticles() {
  const canvas = document.getElementById("particleCanvas");
  if (!canvas || reduceMotion) return;

  const ctx = canvas.getContext("2d");
  let W, H, particles;

  const PARTICLE_COUNT = 55;
  const COLORS = ["rgba(0,229,255,", "rgba(255,182,39,", "rgba(160,100,255,"];

  function resize() {
    W = canvas.width = window.innerWidth;
    H = canvas.height = window.innerHeight;
  }

  function makeParticle() {
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];
    return {
      x: Math.random() * W,
      y: Math.random() * H,
      r: Math.random() * 1.4 + 0.4,
      dx: (Math.random() - 0.5) * 0.28,
      dy: (Math.random() - 0.5) * 0.28,
      alpha: Math.random() * 0.35 + 0.08,
      color,
    };
  }

  function initParticleList() {
    particles = Array.from({ length: PARTICLE_COUNT }, makeParticle);
  }

  function drawLines() {
    const MAX_DIST = 130;
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.06;
          ctx.strokeStyle = `rgba(0,229,255,${alpha})`;
          ctx.lineWidth = 0.5;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawLines();
    particles.forEach((p) => {
      p.x += p.dx;
      p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color + p.alpha + ")";
      ctx.fill();
    });
    requestAnimationFrame(animate);
  }

  resize();
  initParticleList();
  animate();
  window.addEventListener("resize", () => { resize(); initParticleList(); });
})();

// ─────────────────────────────────────────────────
//  2. CURSOR GLOW
// ─────────────────────────────────────────────────
(function initCursorGlow() {
  const glow = document.getElementById("cursorGlow");
  if (!glow || reduceMotion) return;

  let mx = -500, my = -500;
  let cx = -500, cy = -500;
  let raf;

  document.addEventListener("mousemove", (e) => {
    mx = e.clientX;
    my = e.clientY;
  });

  document.addEventListener("mouseleave", () => {
    glow.style.opacity = "0";
  });
  document.addEventListener("mouseenter", () => {
    glow.style.opacity = "1";
  });

  function lerp(a, b, t) { return a + (b - a) * t; }

  function tick() {
    cx = lerp(cx, mx, 0.09);
    cy = lerp(cy, my, 0.09);
    glow.style.left = cx + "px";
    glow.style.top = cy + "px";
    raf = requestAnimationFrame(tick);
  }
  tick();
})();

// ─────────────────────────────────────────────────
//  3. BOOT TERMINAL TYPEWRITER
// ─────────────────────────────────────────────────
(function initTerminal() {
  const termBodyEl = document.getElementById("terminalBody");
  if (!termBodyEl) return;

  const bootLines = [
    { prompt: true,  text: "whoami" },
    { prompt: false, text: "vigneshwaran_k — java / full-stack developer (fresher)" },
    { prompt: true,  text: "status --availability" },
    { prompt: false, text: "open to relocation · available for full-time roles" },
    { prompt: true,  text: "cgpa --show" },
    { prompt: false, text: "8.81 / 10.0  ·  B.E. Computer Science Engineering" },
  ];

  function renderStatic() {
    termBodyEl.innerHTML =
      bootLines
        .map((l) =>
          l.prompt
            ? `<span class="tprompt">$</span> ${l.text}`
            : `<span class="tresult">${l.text}</span>`
        )
        .join("\n") +
      '\n<span class="tprompt">$</span> <span class="cursor">▍</span>';
  }

  function typeBoot() {
    let lineIndex = 0;
    let charIndex = 0;
    let buffer = "";

    function step() {
      if (lineIndex >= bootLines.length) {
        termBodyEl.innerHTML =
          buffer + '\n<span class="tprompt">$</span> <span class="cursor">▍</span>';
        return;
      }
      const line = bootLines[lineIndex];
      const prefix = line.prompt
        ? '<span class="tprompt">$</span> '
        : '<span class="tresult">';
      const suffix = line.prompt ? "" : "</span>";

      if (charIndex <= line.text.length) {
        const partial = line.text.slice(0, charIndex);
        termBodyEl.innerHTML =
          buffer +
          prefix +
          partial +
          (line.prompt ? "" : suffix) +
          '<span class="cursor">▍</span>';
        charIndex++;
        setTimeout(step, line.prompt ? 45 : 18);
      } else {
        buffer += prefix + line.text + suffix + "\n";
        lineIndex++;
        charIndex = 0;
        setTimeout(step, 280);
      }
    }
    step();
  }

  if (reduceMotion) {
    renderStatic();
  } else {
    setTimeout(typeBoot, 300);
  }
})();

// ─────────────────────────────────────────────────
//  4. SCROLL-TRIGGERED ENTRY ANIMATIONS
// ─────────────────────────────────────────────────
(function initScrollAnimations() {
  const targets = document.querySelectorAll(".fade-up, .slide-in-left");
  if (!targets.length) return;

  if (reduceMotion) {
    targets.forEach((el) => el.classList.add("visible"));
    return;
  }

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
  );

  targets.forEach((el) => obs.observe(el));
})();

// ─────────────────────────────────────────────────
//  5. 3D TILT CARD EFFECT
// ─────────────────────────────────────────────────
(function initTiltCards() {
  const cards = document.querySelectorAll(".tilt-card");
  if (!cards.length || reduceMotion) return;

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const cx = rect.width / 2;
      const cy = rect.height / 2;
      const rotX = ((y - cy) / cy) * -7;
      const rotY = ((x - cx) / cx) * 7;
      const mxPct = ((x / rect.width) * 100).toFixed(1) + "%";
      const myPct = ((y / rect.height) * 100).toFixed(1) + "%";

      card.style.transform = `perspective(900px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(4px)`;
      card.style.setProperty("--mx", mxPct);
      card.style.setProperty("--my", myPct);
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform =
        "perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    });
  });
})();

// ─────────────────────────────────────────────────
//  6. ACTIVE STAGE TRACKING (Rail + Mobile)
// ─────────────────────────────────────────────────
(function initActiveStage() {
  const stages = document.querySelectorAll(".stage");
  const mobileLinks = document.querySelectorAll(".mobile-menu a[data-stage]");
  const sections = document.querySelectorAll(".section[id]");

  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          stages.forEach((s) =>
            s.classList.toggle("active", s.dataset.stage === id)
          );
          mobileLinks.forEach((l) =>
            l.classList.toggle("active", l.dataset.stage === id)
          );
        }
      });
    },
    { rootMargin: "-40% 0px -50% 0px", threshold: 0 }
  );

  sections.forEach((sec) => obs.observe(sec));
})();

// ─────────────────────────────────────────────────
//  7. MOBILE MENU TOGGLE
// ─────────────────────────────────────────────────
(function initMobileMenu() {
  const btn = document.getElementById("mobileToggle");
  const menu = document.getElementById("mobileMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    btn.setAttribute("aria-expanded", isOpen);
    btn.textContent = isOpen ? "✕" : "☰";
  });

  menu.querySelectorAll("a").forEach((a) => {
    a.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
      btn.textContent = "☰";
    });
  });
})();

// ─────────────────────────────────────────────────
//  8. STAT CHIP COUNTER ANIMATION (on scroll)
// ─────────────────────────────────────────────────
(function initCounters() {
  const chips = document.querySelectorAll(".stat-num");
  if (!chips.length || reduceMotion) return;

  const targets = [
    { el: null, from: 8.0, to: 8.81, dec: 2 },
    { el: null, from: 0,   to: 2,    dec: 0 },
    { el: null, from: 0,   to: 2,    dec: 0 },
  ];

  // Assign elements - only numeric chips
  let idx = 0;
  chips.forEach((chip) => {
    if (!isNaN(parseFloat(chip.textContent)) && idx < targets.length) {
      targets[idx].el = chip;
      idx++;
    }
  });

  function animateCount(obj) {
    if (!obj.el) return;
    const start = performance.now();
    const dur = 1200;
    function tick(now) {
      const t = Math.min((now - start) / dur, 1);
      const ease = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const val = obj.from + (obj.to - obj.from) * ease;
      obj.el.textContent = val.toFixed(obj.dec);
      if (t < 1) requestAnimationFrame(tick);
      else obj.el.textContent = obj.to.toFixed(obj.dec);
    }
    requestAnimationFrame(tick);
  }

  const chipSection = document.querySelector(".stat-chips");
  if (!chipSection) return;

  let triggered = false;
  const obs = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !triggered) {
      triggered = true;
      targets.forEach((t) => animateCount(t));
      obs.disconnect();
    }
  }, { threshold: 0.5 });
  obs.observe(chipSection);
})();
