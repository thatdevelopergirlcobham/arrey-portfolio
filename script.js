'use strict';

gsap.registerPlugin(ScrollTrigger);


(function initTheme() {
  const saved = localStorage.getItem('ag-theme') || 'dark';
  document.documentElement.setAttribute('data-theme', saved);
  document.body.setAttribute('data-theme', saved);
  setThemeIcon(saved);
})();

function setThemeIcon(theme) {
  const sun  = document.getElementById('icon-sun');
  const moon = document.getElementById('icon-moon');
  if (!sun || !moon) return;
  sun.style.display  = theme === 'dark'  ? 'block' : 'none';
  moon.style.display = theme === 'light' ? 'block' : 'none';
}

/* ── Theme toggle button ── */
document.getElementById('theme-btn').addEventListener('click', () => {
  const current = document.documentElement.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-theme', next);
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('ag-theme', next);
  setThemeIcon(next);
  gsap.fromTo('#theme-btn',
    { rotation: 0 },
    { rotation: 360, duration: 0.55, ease: 'back.out(1.5)' }
  );
});

/* =============================================
   MOBILE NAV
============================================= */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', () => {
  const open = mobileNav.classList.toggle('open');
  hamburger.classList.toggle('open', open);
  hamburger.setAttribute('aria-expanded', String(open));
});

mobileNav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    mobileNav.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* =============================================
   CUSTOM CURSOR
============================================= */
const cursorDot  = document.getElementById('cursor-dot');
const cursorRing = document.getElementById('cursor-ring');
let mx = window.innerWidth / 2, my = window.innerHeight / 2;
let rx = mx, ry = my;

document.addEventListener('mousemove', e => {
  mx = e.clientX; my = e.clientY;
  cursorDot.style.left = mx + 'px';
  cursorDot.style.top  = my + 'px';
});

(function lerpRing() {
  rx += (mx - rx) * 0.1;
  ry += (my - ry) * 0.1;
  cursorRing.style.left = rx + 'px';
  cursorRing.style.top  = ry + 'px';
  requestAnimationFrame(lerpRing);
})();

document.querySelectorAll('a, button, .skill-card, .project-card, .journey-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursorDot.style.width  = '16px'; cursorDot.style.height = '16px';
    cursorRing.style.width = '48px'; cursorRing.style.height = '48px';
    cursorRing.style.opacity = '0.4';
  });
  el.addEventListener('mouseleave', () => {
    cursorDot.style.width  = '8px';  cursorDot.style.height = '8px';
    cursorRing.style.width = '32px'; cursorRing.style.height = '32px';
    cursorRing.style.opacity = '0.65';
  });
});

/* =============================================
   HERO SVG — continuous rotation + pulse
============================================= */
gsap.to('#hero-ring-a', { rotation: 360,  transformOrigin: '300px 300px', duration: 28, ease: 'none', repeat: -1 });
gsap.to('#hero-ring-b', { rotation: -360, transformOrigin: '300px 300px', duration: 20, ease: 'none', repeat: -1 });
gsap.to('#hero-ring-c', { rotation: 360,  transformOrigin: '300px 300px', duration: 14, ease: 'none', repeat: -1 });
gsap.to('#hero-core',        { scale: 1.6, duration: 2.5, ease: 'power1.inOut', repeat: -1, yoyo: true, transformOrigin: '300px 300px' });
gsap.to('#hero-core-ring',   { scale: 1.4, opacity: 0.1, duration: 2.5, ease: 'power1.inOut', repeat: -1, yoyo: true, transformOrigin: '300px 300px' });

/* ── Hero entrance ── */
gsap.set('.hero-svg-bg', { opacity: 0, scale: 0.88 });
gsap.set('#hero-name',   { skewY: 2 });

gsap.timeline({ defaults: { ease: 'power3.out' } })
  .to('.hero-svg-bg',    { opacity: 1, scale: 1, duration: 1.4 }, 0)
  .to('#hero-eyebrow',   { opacity: 1, y: 0, duration: 0.65 }, 0.3)
  .to('#hero-name',      { opacity: 1, y: 0, skewY: 0, duration: 0.85 }, 0.55)
  .to('#hero-underline', { scaleX: 1, duration: 0.7, ease: 'power2.out' }, 1.15)
  .to('#hero-role',      { opacity: 1, y: 0, duration: 0.6 }, 1.0)
  .to('#hero-tagline',   { opacity: 1, y: 0, duration: 0.55 }, 1.2)
  .to('#hero-actions',   { opacity: 1, y: 0, duration: 0.55 }, 1.4)
  .to('#scroll-hint',    { opacity: 1, duration: 0.5 }, 1.8);

/* =============================================
   SCROLL REVEALS — section labels / titles
============================================= */
document.querySelectorAll('.section-label, .section-title, .section-subtitle').forEach(el => {
  gsap.to(el, {
    opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
    scrollTrigger: { trigger: el, start: 'top 88%' }
  });
});

/* ── About bio ── */
gsap.to(['#bio-1','#bio-2','#bio-3'], {
  opacity: 1, y: 0, duration: 0.7, stagger: 0.15, ease: 'power2.out',
  scrollTrigger: { trigger: '#bio-1', start: 'top 85%' }
});
gsap.to('#about-stats', {
  opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
  scrollTrigger: { trigger: '#about-stats', start: 'top 88%' }
});

/* ── Avatar draw-in on scroll ── */
document.querySelectorAll('.draw-path').forEach(path => {
  const len = path.getTotalLength ? path.getTotalLength() : 400;
  gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
  gsap.to(path, {
    strokeDashoffset: 0, duration: 1.8, ease: 'power2.inOut',
    scrollTrigger: { trigger: path, start: 'top 82%' }
  });
});

/* ── Timeline ── */
gsap.to('.timeline-item', {
  opacity: 1, x: 0, duration: 0.65, stagger: 0.12, ease: 'power3.out',
  scrollTrigger: { trigger: '#timeline', start: 'top 80%' }
});

/* ── Skills stagger + proficiency bars ── */
gsap.to('.skill-card', {
  opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out',
  scrollTrigger: { trigger: '#skills-grid', start: 'top 82%' }
});

document.querySelectorAll('.skill-bar-fill').forEach(bar => {
  gsap.to(bar, {
    width: bar.dataset.width + '%', duration: 1.2, ease: 'power2.out',
    scrollTrigger: { trigger: bar, start: 'top 88%' }
  });
});

/* ── Journey cards ── */
gsap.to('.journey-card', {
  opacity: 1, y: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out',
  scrollTrigger: { trigger: '#journey-grid', start: 'top 82%' }
});

/* ── Journey toggle interaction ── */
document.querySelectorAll('.journey-toggle').forEach(btn => {
  btn.addEventListener('click', () => {
    const card     = btn.closest('.journey-card');
    const expand   = card.querySelector('.journey-expand');
    const inner    = card.querySelector('.journey-expand-inner');
    const statusTx = card.querySelector('.journey-status-text');
    const isActive = card.dataset.active === 'true';

    if (!isActive) {
      card.dataset.active = 'true';
      if (statusTx) statusTx.textContent = 'Confirmed true';
      gsap.fromTo(btn,
        { scale: 0.55, rotation: -15 },
        { scale: 1, rotation: 0, duration: 0.55, ease: 'back.out(2.2)' }
      );
      const targetH = inner.offsetHeight;
      gsap.fromTo(expand,
        { height: 0, opacity: 0 },
        { height: targetH, opacity: 1, duration: 0.42, ease: 'power2.out',
          onComplete: () => gsap.set(expand, { height: 'auto' }) }
      );
    } else {
      card.dataset.active = 'false';
      if (statusTx) statusTx.textContent = 'Tap to confirm';
      gsap.fromTo(btn, { scale: 1.1 }, { scale: 1, duration: 0.3, ease: 'power2.out' });
      gsap.to(expand, { height: 0, opacity: 0, duration: 0.32, ease: 'power2.in' });
    }
  });
});

/* ── Projects alternating slide-in ── */
document.querySelectorAll('.project-card').forEach((card, i) => {
  gsap.set(card, { x: i % 2 === 0 ? -60 : 60 });
  gsap.to(card, {
    opacity: 1, x: 0, duration: 0.75, ease: 'power3.out',
    scrollTrigger: { trigger: card, start: 'top 82%' }
  });
});

/* ── Contact socials ── */
gsap.set('#social-icons', { opacity: 0, y: 24 });
gsap.to('#social-icons', {
  opacity: 1, y: 0, duration: 0.65, ease: 'power2.out',
  scrollTrigger: { trigger: '#social-icons', start: 'top 88%' }
});

/* ── Nav active section ── */
document.querySelectorAll('section[id]').forEach(section => {
  ScrollTrigger.create({
    trigger: section, start: 'top 55%', end: 'bottom 55%',
    onEnter:     () => setActiveNav(section.id),
    onEnterBack: () => setActiveNav(section.id),
  });
});

function setActiveNav(id) {
  document.querySelectorAll('.nav-link').forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
  });
}

/* ── Hero parallax ── */
gsap.to('.hero-svg-bg', {
  y: 80, ease: 'none',
  scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: true }
});

/* =============================================
   PROJECT DETAIL DRAWER
============================================= */

/* Project data */
const PROJECTS = {
  'proj-1': {
    num:   'Project 01',
    title: 'SyncSpace',
    desc:  'A real-time collaborative whiteboard built for distributed teams. Features live cursor sharing, conflict-free concurrent editing via Operational Transformation, and persistent session state.',
    problem: 'Distributed teams needed a low-friction visual collaboration tool. Existing solutions were either too complex to set up or too limited in functionality for real creative work.',
    solution: 'Built a WebSocket server broadcasting drawing operations in real-time, with an OT algorithm that resolves conflicting concurrent edits automatically — no locks, no overwrites, no conflicts.',
    features: [
      'Live cursor positions shared across all connected clients in real time',
      'Multi-user canvas with conflict-free concurrent editing via OT',
      'Persistent session state with automatic reconnect support',
      'Shared undo/redo history that respects all users\' actions',
      'One-click export of the whiteboard as a PNG',
    ],
    tech: ['React', 'WebSockets', 'Canvas API', 'Node.js', 'Express', 'OT Algorithm'],
  },
  'proj-2': {
    num:   'Project 02',
    title: 'Pathfinder',
    desc:  'An interactive algorithm visualizer that animates graph traversal step by step on a live grid. Designed to make abstract CS concepts tangible for students and educators.',
    problem: 'Graph algorithms like Dijkstra and A* are notoriously hard to grasp from textbook diagrams alone — students need to see the algorithms thinking in real time.',
    solution: 'Architected the algorithm layer as JavaScript generators that yield intermediate states. GSAP-driven rendering visualizes each yield frame-by-frame at a user-controlled pace.',
    features: [
      'Dijkstra, A*, BFS, and DFS with step-by-step visual breakdown',
      'Adjustable animation speed from slow-motion to instant solve',
      'Draw custom walls, weighted cells, and drag start / end points',
      'Live path-cost counter and nodes-visited display',
      'Procedural maze generation using recursive backtracking',
    ],
    tech: ['Next.js', 'GSAP', 'Tailwind CSS', 'TypeScript', 'Generator Functions'],
  },
  'proj-3': {
    num:   'Project 03',
    title: 'PulseUI',
    desc:  'A minimal, fully accessible React component library built on CSS custom properties. Zero runtime dependencies, complete TypeScript types, and documented in Storybook.',
    problem: 'Starting every new project meant rebuilding the same 15 foundational components from scratch — burning time and letting inconsistency creep in across codebases.',
    solution: 'Extracted the shared component layer into a typed, token-based library. Design decisions are encoded as CSS custom properties, making theming trivial without any runtime overhead.',
    features: [
      '20+ fully accessible components meeting WCAG 2.1 AA',
      'Token-based design system using CSS custom properties',
      'Zero runtime dependencies — pure React + CSS output',
      'Complete TypeScript types and Storybook documentation',
      'Tree-shakeable build — import only what you actually use',
    ],
    tech: ['React', 'TypeScript', 'CSS Variables', 'Storybook', 'Rollup', 'WCAG 2.1'],
  },
};

/* Build mockup SVG per project */
function buildMockup(id) {
  /* shared browser chrome */
  const chrome = `
    <rect x="0" y="0" width="580" height="326" rx="12" fill="var(--surface)"/>
    <rect x="0" y="0" width="580" height="34" rx="12" fill="var(--border)"/>
    <rect x="0" y="22" width="580" height="12" fill="var(--border)"/>
    <circle cx="18" cy="17" r="4.5" fill="rgba(255,95,87,0.55)"/>
    <circle cx="32" cy="17" r="4.5" fill="rgba(255,189,46,0.55)"/>
    <circle cx="46" cy="17" r="4.5" fill="rgba(0,255,65,0.55)"/>
    <rect x="70" y="10" width="440" height="14" rx="7" fill="var(--bg)" opacity="0.45"/>`;

  if (id === 'proj-1') {
    /* SyncSpace — collaborative canvas */
    let dots = '';
    for (let x = 52; x < 415; x += 22) for (let y = 52; y < 320; y += 22)
      dots += `<circle cx="${x}" cy="${y}" r="1" fill="var(--border)" opacity="0.6"/>`;
    return `<svg viewBox="0 0 580 326" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${chrome}
      <rect x="12" y="46" width="556" height="268" rx="4" fill="var(--bg)" opacity="0.2"/>
      ${dots}
      <rect x="82" y="148" width="105" height="65" rx="6" stroke="var(--text)" stroke-width="1.5" fill="rgba(255,255,255,0.03)" opacity="0.5"/>
      <circle cx="355" cy="205" r="40" stroke="var(--text)" stroke-width="1.5" fill="rgba(255,255,255,0.02)" opacity="0.5"/>
      <path d="M187 180 Q270 138 315 188" stroke="#00FF41" stroke-width="2" fill="none" stroke-dasharray="5 3" opacity="0.8"/>
      <polygon points="115,100 122,117 125,110 132,117" fill="#00FF41" opacity="0.9"/>
      <rect x="136" y="93" width="54" height="18" rx="9" fill="#00FF41" opacity="0.85"/>
      <text x="163" y="106" font-size="9" fill="#000" font-family="sans-serif" font-weight="700" text-anchor="middle">Arrey</text>
      <polygon points="410,152 417,169 420,162 427,169" fill="#60A5FA" opacity="0.9"/>
      <rect x="432" y="145" width="58" height="18" rx="9" fill="#60A5FA" opacity="0.85"/>
      <text x="461" y="158" font-size="9" fill="#000" font-family="sans-serif" font-weight="700" text-anchor="middle">User 2</text>
      <rect x="453" y="82" width="90" height="72" rx="6" fill="rgba(0,255,65,0.08)" stroke="#00FF41" stroke-width="1" opacity="0.7"/>
      <line x1="466" y1="100" x2="530" y2="100" stroke="#00FF41" stroke-width="1" opacity="0.45"/>
      <line x1="466" y1="112" x2="530" y2="112" stroke="#00FF41" stroke-width="1" opacity="0.45"/>
      <line x1="466" y1="124" x2="510" y2="124" stroke="#00FF41" stroke-width="1" opacity="0.45"/>
      <rect x="14" y="48" width="34" height="264" rx="4" fill="var(--surface)" opacity="0.8"/>
      <circle cx="31" cy="68" r="5" stroke="#00FF41" stroke-width="1.5" fill="none"/>
      <rect x="24" y="82" width="14" height="14" rx="2" stroke="var(--text)" stroke-width="1.2" fill="none" opacity="0.5"/>
      <line x1="24" y1="106" x2="38" y2="106" stroke="var(--text)" stroke-width="1.2" opacity="0.5"/>
      <line x1="24" y1="114" x2="38" y2="114" stroke="var(--text)" stroke-width="1.2" opacity="0.5"/>
    </svg>`;
  }

  if (id === 'proj-2') {
    /* Pathfinder — grid visualizer */
    const cs = 17, ox = 50, oy = 48, cols = 20, rows = 14;
    const path = new Set(['4,7','5,7','6,7','6,6','7,6','8,6','9,6','9,7','10,7','11,7','12,7','13,7']);
    const visited = new Set(['4,6','4,8','5,6','5,8','6,5','6,8','7,5','7,7','8,5','9,5','10,6','11,6','12,6','10,8','11,8']);
    const walls = new Set(['7,3','7,4','7,5','7,6','7,7','7,8','7,9','7,10','8,10','9,10','10,10']);
    let cells = '';
    for (let c = 0; c < cols; c++) for (let r = 0; r < rows; r++) {
      const k = `${c},${r}`, x = ox + c*cs, y = oy + r*cs;
      if (x + cs > 400) continue;
      let fill = 'none', stroke = 'var(--border)', so = '0.35';
      if      (k==='4,7')  { fill='#00FF41'; stroke='#00FF41'; so='1'; }
      else if (k==='13,7') { fill='#FF6B6B'; stroke='#FF6B6B'; so='1'; }
      else if (walls.has(k))   { fill='var(--text)'; stroke='none'; so='0.2'; }
      else if (path.has(k))    { fill='#00FF41'; stroke='#00FF41'; so='0.55'; }
      else if (visited.has(k)) { fill='#60A5FA'; stroke='#60A5FA'; so='0.2'; }
      cells += `<rect x="${x}" y="${y}" width="${cs-1}" height="${cs-1}" rx="2" fill="${fill}" stroke="${stroke}" stroke-width="0.5" opacity="${so}"/>`;
    }
    return `<svg viewBox="0 0 580 326" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${chrome}
      <rect x="12" y="46" width="556" height="268" rx="4" fill="var(--bg)" opacity="0.2"/>
      ${cells}
      <rect x="408" y="56" width="158" height="250" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="1"/>
      <text x="422" y="76" font-size="8" fill="#00FF41" font-family="monospace" letter-spacing="1">ALGORITHM</text>
      <text x="422" y="96" font-size="13" fill="var(--text)" font-family="sans-serif" font-weight="700">A* Search</text>
      <line x1="420" y1="106" x2="554" y2="106" stroke="var(--border)" stroke-width="1"/>
      <text x="422" y="124" font-size="8" fill="var(--text-soft)" font-family="monospace">Visited nodes</text>
      <text x="556" y="124" font-size="9" fill="#00FF41" font-family="monospace" text-anchor="end">247</text>
      <text x="422" y="142" font-size="8" fill="var(--text-soft)" font-family="monospace">Path length</text>
      <text x="556" y="142" font-size="9" fill="#00FF41" font-family="monospace" text-anchor="end">32</text>
      <text x="422" y="160" font-size="8" fill="var(--text-soft)" font-family="monospace">Status</text>
      <text x="556" y="160" font-size="9" fill="#00FF41" font-family="monospace" text-anchor="end">DONE</text>
      <line x1="420" y1="172" x2="554" y2="172" stroke="var(--border)" stroke-width="1"/>
      <text x="422" y="188" font-size="8" fill="var(--text-soft)" font-family="monospace">Speed</text>
      <rect x="422" y="196" width="132" height="4" rx="2" fill="var(--border)"/>
      <rect x="422" y="196" width="80"  height="4" rx="2" fill="#00FF41"/>
      <rect x="422" y="212" width="22" height="22" rx="4" fill="rgba(0,255,65,0.15)" stroke="#00FF41" stroke-width="1"/>
      <text x="433" y="228" font-size="10" fill="#00FF41" font-family="monospace" text-anchor="middle" font-weight="700">▶</text>
    </svg>`;
  }

  if (id === 'proj-3') {
    /* PulseUI — component library */
    const sideItems = ['Components','Buttons','Inputs','Cards','Modals','Badges','Tables','Toast'];
    let sidebar = '';
    sideItems.forEach((item, i) => {
      const y = 94 + i * 22;
      if (i === 0) {
        sidebar += `<rect x="18" y="${y-3}" width="102" height="18" rx="4" fill="rgba(0,255,65,0.12)"/>`;
        sidebar += `<text x="28" y="${y+10}" font-size="9" fill="#00FF41" font-family="sans-serif" font-weight="600">${item}</text>`;
      } else {
        sidebar += `<text x="28" y="${y+10}" font-size="9" fill="var(--text-soft)" font-family="sans-serif">${item}</text>`;
      }
    });
    return `<svg viewBox="0 0 580 326" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${chrome}
      <rect x="12" y="46" width="556" height="268" rx="4" fill="var(--bg)" opacity="0.2"/>
      <rect x="14" y="48" width="122" height="264" rx="4" fill="var(--surface)" opacity="0.85"/>
      <text x="24" y="72" font-size="10" fill="#00FF41" font-family="monospace" letter-spacing="1" font-weight="700">PULSEUI</text>
      <line x1="18" y1="80" x2="124" y2="80" stroke="var(--border)" stroke-width="1"/>
      ${sidebar}
      <text x="152" y="72" font-size="12" fill="var(--text)" font-family="sans-serif" font-weight="700">Button</text>
      <text x="386" y="72" font-size="9" fill="var(--text-soft)" font-family="sans-serif">20+ components</text>
      <line x1="148" y1="80" x2="560" y2="80" stroke="var(--border)" stroke-width="1"/>
      <rect x="152" y="94" width="84" height="30" rx="15" fill="#00FF41"/>
      <text x="194" y="114" font-size="10" fill="#000" font-family="sans-serif" font-weight="700" text-anchor="middle">Primary</text>
      <rect x="246" y="94" width="84" height="30" rx="15" fill="none" stroke="var(--border)" stroke-width="1"/>
      <text x="288" y="114" font-size="10" fill="var(--text)" font-family="sans-serif" text-anchor="middle">Secondary</text>
      <rect x="340" y="94" width="80" height="30" rx="15" fill="var(--surface)"/>
      <text x="380" y="114" font-size="10" fill="var(--text)" font-family="sans-serif" text-anchor="middle">Ghost</text>
      <rect x="432" y="94" width="52" height="22" rx="11" fill="rgba(0,255,65,0.15)" stroke="#00FF41" stroke-width="1"/>
      <text x="458" y="110" font-size="9" fill="#00FF41" font-family="monospace" text-anchor="middle">badge</text>
      <rect x="152" y="142" width="290" height="34" rx="8" fill="var(--surface)" stroke="rgba(0,255,65,0.5)" stroke-width="1.5"/>
      <text x="166" y="164" font-size="9" fill="var(--text-soft)" font-family="sans-serif">Search components...</text>
      <text x="426" y="164" font-size="9" fill="var(--text-soft)" font-family="sans-serif">⌘K</text>
      <rect x="152" y="194" width="120" height="88" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="1"/>
      <rect x="164" y="206" width="44" height="44" rx="8" fill="rgba(0,255,65,0.1)"/>
      <text x="186" y="234" font-size="16" text-anchor="middle" fill="#00FF41">⬜</text>
      <text x="164" y="268" font-size="9" fill="var(--text)" font-family="sans-serif" font-weight="600">Button</text>
      <text x="164" y="279" font-size="8" fill="var(--text-soft)" font-family="sans-serif">Interactive</text>
      <rect x="284" y="194" width="120" height="88" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="1"/>
      <rect x="296" y="206" width="44" height="44" rx="8" fill="rgba(0,255,65,0.1)"/>
      <text x="318" y="234" font-size="16" text-anchor="middle" fill="#00FF41">▭</text>
      <text x="296" y="268" font-size="9" fill="var(--text)" font-family="sans-serif" font-weight="600">Input</text>
      <text x="296" y="279" font-size="8" fill="var(--text-soft)" font-family="sans-serif">Form element</text>
      <rect x="416" y="194" width="120" height="88" rx="10" fill="var(--surface)" stroke="var(--border)" stroke-width="1"/>
      <rect x="428" y="206" width="44" height="44" rx="8" fill="rgba(0,255,65,0.1)"/>
      <text x="450" y="234" font-size="16" text-anchor="middle" fill="#00FF41">◱</text>
      <text x="428" y="268" font-size="9" fill="var(--text)" font-family="sans-serif" font-weight="600">Modal</text>
      <text x="428" y="279" font-size="8" fill="var(--text-soft)" font-family="sans-serif">Overlay</text>
    </svg>`;
  }

  return `<svg viewBox="0 0 580 326" fill="none" xmlns="http://www.w3.org/2000/svg">${chrome}</svg>`;
}

/* Build full detail HTML */
function buildDetailHTML(id) {
  const d = PROJECTS[id];
  if (!d) return '';
  const features = d.features.map(f => `<li>${f}</li>`).join('');
  const tags = d.tech.map(t => `<span class="tag">${t}</span>`).join('');
  return `
    <p class="proj-detail-num">${d.num}</p>
    <h2 class="proj-detail-title">${d.title}</h2>

    <div class="proj-mockup">${buildMockup(id)}</div>

    <div class="proj-section">
      <p class="proj-section-label">Overview</p>
      <p class="proj-section-text">${d.desc}</p>
    </div>
    <div class="proj-section">
      <p class="proj-section-label">The Problem</p>
      <p class="proj-section-text">${d.problem}</p>
    </div>
    <div class="proj-section">
      <p class="proj-section-label">The Solution</p>
      <p class="proj-section-text">${d.solution}</p>
    </div>
    <div class="proj-section">
      <p class="proj-section-label">Key Features</p>
      <ul class="proj-features">${features}</ul>
    </div>
    <div class="proj-section">
      <p class="proj-section-label">Tech Stack</p>
      <div class="proj-tags-row">${tags}</div>
    </div>
    <div class="proj-actions">
      <button class="proj-btn proj-btn-primary" onclick="window.open('#','_blank')">
        View Live
        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <button class="proj-btn proj-btn-secondary" onclick="window.open('#','_blank')">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" aria-hidden="true">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
        View on GitHub
      </button>
    </div>`;
}

/* Open drawer */
let lastFocused = null;
function openDrawer(projectId) {
  const overlay = document.getElementById('project-overlay');
  const panel   = document.getElementById('proj-panel');
  const content = document.getElementById('proj-content');
  const closeBtn = document.getElementById('proj-close-btn');

  lastFocused = document.activeElement;
  content.innerHTML = buildDetailHTML(projectId);
  overlay.classList.add('open');
  overlay.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  gsap.to('#proj-backdrop', { opacity: 1, duration: 0.35, ease: 'power2.out' });
  gsap.fromTo(panel,
    { x: '100%' },
    { x: '0%', duration: 0.48, ease: 'power3.out' }
  );
  gsap.from('.proj-detail-num, .proj-detail-title, .proj-mockup, .proj-section, .proj-actions', {
    opacity: 0, y: 22, stagger: 0.07, duration: 0.5, ease: 'power2.out', delay: 0.3
  });

  /* trap focus */
  setTimeout(() => closeBtn && closeBtn.focus(), 500);
}

/* Close drawer */
function closeDrawer() {
  const overlay = document.getElementById('project-overlay');
  const panel   = document.getElementById('proj-panel');

  gsap.to(panel, { x: '100%', duration: 0.4, ease: 'power3.in' });
  gsap.to('#proj-backdrop', {
    opacity: 0, duration: 0.32,
    onComplete: () => {
      overlay.classList.remove('open');
      overlay.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocused) lastFocused.focus();
    }
  });
}

/* Wire up project "View Details" buttons */
document.querySelectorAll('.project-link').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const card = link.closest('.project-card');
    if (card) openDrawer(card.id);
  });
});

document.getElementById('proj-close-btn').addEventListener('click', closeDrawer);
document.getElementById('proj-backdrop').addEventListener('click', closeDrawer);
document.getElementById('proj-back-btn').addEventListener('click', closeDrawer);

document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && document.getElementById('project-overlay').classList.contains('open'))
    closeDrawer();
});

/* =============================================
   CONTACT FORM — scroll reveal + validation
============================================= */

/* Reveal the form on scroll */
gsap.to('#contact-form', {
  opacity: 1, y: 0, duration: 0.75, ease: 'power3.out',
  scrollTrigger: { trigger: '#contact-form', start: 'top 88%' }
});

/* ── helpers ── */
function setError(inputEl, errEl, msg) {
  inputEl.classList.add('cf-error');
  inputEl.classList.remove('cf-valid');
  errEl.textContent = msg;
  errEl.classList.add('visible');
  gsap.fromTo(inputEl, { x: -5 }, { x: 0, duration: 0.35, ease: 'elastic.out(1, 0.4)' });
}

function setValid(inputEl, errEl) {
  inputEl.classList.remove('cf-error');
  inputEl.classList.add('cf-valid');
  errEl.classList.remove('visible');
}

function clearState(inputEl, errEl) {
  inputEl.classList.remove('cf-error', 'cf-valid');
  errEl.classList.remove('visible');
}

/* ── live validation (on blur) ── */
const cfName  = document.getElementById('cf-name');
const cfEmail = document.getElementById('cf-email');
const cfPhone = document.getElementById('cf-phone');
const cfMsg   = document.getElementById('cf-message');

const cfNameErr  = document.getElementById('cf-name-err');
const cfEmailErr = document.getElementById('cf-email-err');
const cfPhoneErr = document.getElementById('cf-phone-err');
const cfMsgErr   = document.getElementById('cf-msg-err');

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[\d\s\+\-\(\)]{7,20}$/;

cfName.addEventListener('blur', () => {
  if (!cfName.value.trim()) setError(cfName, cfNameErr, 'Please enter your name.');
  else setValid(cfName, cfNameErr);
});

cfEmail.addEventListener('blur', () => {
  if (!cfEmail.value.trim()) setError(cfEmail, cfEmailErr, 'Email is required.');
  else if (!EMAIL_RE.test(cfEmail.value.trim())) setError(cfEmail, cfEmailErr, 'Please enter a valid email.');
  else setValid(cfEmail, cfEmailErr);
});

cfPhone.addEventListener('blur', () => {
  const val = cfPhone.value.trim();
  if (val && !PHONE_RE.test(val)) setError(cfPhone, cfPhoneErr, 'Phone number looks invalid.');
  else if (val) setValid(cfPhone, cfPhoneErr);
  else clearState(cfPhone, cfPhoneErr);
});

cfMsg.addEventListener('blur', () => {
  if (!cfMsg.value.trim()) setError(cfMsg, cfMsgErr, 'Please write a message.');
  else if (cfMsg.value.trim().length < 10) setError(cfMsg, cfMsgErr, 'Message is too short.');
  else setValid(cfMsg, cfMsgErr);
});

/* ── submit ── */
document.getElementById('contact-form').addEventListener('submit', function (e) {
  e.preventDefault();

  /* run all field checks */
  let valid = true;

  if (!cfName.value.trim()) {
    setError(cfName, cfNameErr, 'Please enter your name.'); valid = false;
  } else setValid(cfName, cfNameErr);

  if (!cfEmail.value.trim()) {
    setError(cfEmail, cfEmailErr, 'Email is required.'); valid = false;
  } else if (!EMAIL_RE.test(cfEmail.value.trim())) {
    setError(cfEmail, cfEmailErr, 'Please enter a valid email.'); valid = false;
  } else setValid(cfEmail, cfEmailErr);

  const phoneVal = cfPhone.value.trim();
  if (phoneVal && !PHONE_RE.test(phoneVal)) {
    setError(cfPhone, cfPhoneErr, 'Phone number looks invalid.'); valid = false;
  } else if (phoneVal) setValid(cfPhone, cfPhoneErr);
  else clearState(cfPhone, cfPhoneErr);

  if (!cfMsg.value.trim()) {
    setError(cfMsg, cfMsgErr, 'Please write a message.'); valid = false;
  } else if (cfMsg.value.trim().length < 10) {
    setError(cfMsg, cfMsgErr, 'Message is too short.'); valid = false;
  } else setValid(cfMsg, cfMsgErr);

  if (!valid) return;

  /* success state */
  const btn     = document.getElementById('cf-submit-btn');
  const success = document.getElementById('cf-success');

  btn.disabled = true;
  btn.textContent = 'Sending…';

  /* simulate async send */
  setTimeout(() => {
    this.reset();
    [cfName, cfEmail, cfPhone, cfMsg].forEach(el => el.classList.remove('cf-valid'));
    btn.disabled = false;
    btn.innerHTML = `Send Message <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    success.hidden = false;
    gsap.fromTo(success, { opacity: 0, y: 8 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
    setTimeout(() => {
      gsap.to(success, { opacity: 0, y: -6, duration: 0.35, onComplete: () => { success.hidden = true; } });
    }, 5000);
  }, 900);
});
