import React, { useState, useEffect, useRef, useMemo } from 'react';

/* ============================================================
   HANS WORDMARK — geometric reconstruction
   ============================================================ */
function HansWordmark({ accent = 'var(--accent)', className = '' }) {
  return (
    <svg
      className={className}
      viewBox="0 0 1000 260"
      style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      aria-label="HANS"
    >
      {/* H */}
      <g fill="currentColor">
        <rect x="0" y="0" width="54" height="260" />
        <rect x="186" y="0" width="54" height="260" />
        <rect x="54" y="103" width="132" height="54" />
      </g>

      {/* A */}
      <g fill="currentColor">
        <path d="
          M 280 260
          L 280 0
          L 500 0
          L 500 260
          L 470 260
          L 470 170
          L 310 170
          L 310 260
          Z
          M 310 30
          L 310 140
          L 470 140
          L 470 30
          Z
        " fillRule="evenodd" />
      </g>

      {/* Arrow counter inside A */}
      <g fill={accent}>
        <path d="
          M 390 38
          L 462 100
          L 430 100
          L 430 134
          L 350 134
          L 350 100
          L 318 100
          Z
        " />
      </g>

      {/* N */}
      <g fill="currentColor">
        <rect x="540" y="0" width="54" height="260" />
        <rect x="706" y="0" width="54" height="260" />
        <polygon points="540,0 594,0 760,260 706,260" />
      </g>

      {/* S */}
      <g fill="currentColor">
        <path d="M 810 0 L 1000 0 L 1000 54 L 864 54 L 864 103 L 1000 103 L 1000 260 L 810 260 L 810 206 L 946 206 L 946 157 L 810 157 Z" />
      </g>
    </svg>
  );
}

function IzarrarazSub({ className = '' }) {
  return (
    <div className={`izar-sub ${className}`} aria-label="IZARRARAZ">
      {'IZARRARAZ'.split('').map((c, i) => (
        <span key={i}>{c}</span>
      ))}
    </div>
  );
}

/* ============================================================
   TYPING TERMINAL
   ============================================================ */
function TypingTerminal() {
  const lines = useMemo(() => [
    { cmd: 'whoami', out: 'hans izarraraz · frontend engineer · team lead' },
    { cmd: 'cat role.txt', out: 'building interfaces that ship. leading people that ship harder.' },
    { cmd: 'ls --latest', out: '6 months leading · 4 yrs shipping · 1 obsession: craft' },
    { cmd: 'echo $STATUS', out: 'not hiring-hunting. presence-building.' },
  ], []);

  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [phase, setPhase] = useState('cmd');

  useEffect(() => {
    const current = lines[lineIdx];
    let t;
    if (phase === 'cmd') {
      if (charIdx < current.cmd.length) {
        t = setTimeout(() => setCharIdx(charIdx + 1), 45 + Math.random() * 40);
      } else {
        t = setTimeout(() => { setPhase('out'); setCharIdx(0); }, 280);
      }
    } else if (phase === 'out') {
      if (charIdx < current.out.length) {
        t = setTimeout(() => setCharIdx(charIdx + 1), 18 + Math.random() * 20);
      } else {
        t = setTimeout(() => setPhase('hold'), 1800);
      }
    } else if (phase === 'hold') {
      t = setTimeout(() => {
        setLineIdx((lineIdx + 1) % lines.length);
        setCharIdx(0);
        setPhase('cmd');
      }, 400);
    }
    return () => clearTimeout(t);
  }, [phase, charIdx, lineIdx, lines]);

  const current = lines[lineIdx];
  const cmdText = phase === 'cmd' ? current.cmd.slice(0, charIdx) : current.cmd;
  const outText = phase === 'cmd' ? '' : (phase === 'out' ? current.out.slice(0, charIdx) : current.out);

  return (
    <div className="term">
      <div className="term-line">
        <span className="term-prompt">hans@portfolio <span className="term-tilde">~</span> %</span>
        <span className="term-cmd">{cmdText}</span>
        {phase === 'cmd' && <span className="term-caret" />}
      </div>
      {(phase !== 'cmd' || outText) && (
        <div className="term-out">
          {outText}
          {phase === 'out' && <span className="term-caret" />}
        </div>
      )}
    </div>
  );
}

/* ============================================================
   HERO
   ============================================================ */
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="corner tl">//01 — HERO / INDEX 2026</div>
      <div className="corner tr">EST · {new Date().getFullYear()} · MX</div>
      <div className="corner bl">N 19.43° · W 99.13°</div>
      <div className="corner br">↓ scroll or press <kbd>J</kbd></div>

      <div className="hero-grid">
        <div className="hero-meta hero-meta-l">
          <div className="meta-row"><span className="meta-k">ROLE</span><span className="meta-v">FRONTEND /<br/>TEAM LEAD</span></div>
          <div className="meta-row"><span className="meta-k">YRS</span><span className="meta-v">04 → ∞</span></div>
        </div>

        <div className="hero-center">
          <HansWordmark />
          <IzarrarazSub />
        </div>

        <div className="hero-meta hero-meta-r">
          <div className="meta-row"><span className="meta-k">FOCUS</span><span className="meta-v">INTERFACES<br/>THAT SHIP</span></div>
          <div className="meta-row"><span className="meta-k">STATUS</span><span className="meta-v dot">ONLINE</span></div>
        </div>
      </div>

      <div className="hero-term-wrap">
        <TypingTerminal />
      </div>

      <div className="hero-scroll">
        <div className="chev"></div>
        <div className="chev"></div>
      </div>
    </section>
  );
}

/* ============================================================
   INDEX STRIP
   ============================================================ */
function IndexStrip() {
  const rows = [
    { n: '02', label: 'ABOUT / MANIFIESTO', href: '#about' },
    { n: '03', label: 'EXPERIENCE', href: '#experience' },
    { n: '04', label: 'SELECTED WORK', href: '#work' },
    { n: '05', label: 'STACK', href: '#stack' },
    { n: '06', label: 'CONTACT / CV', href: '#contact' },
  ];
  return (
    <section className="index-strip">
      {rows.map((r) => (
        <a className="index-row" key={r.n} href={r.href}>
          <span className="index-n">{r.n}</span>
          <span className="index-label">{r.label}</span>
          <span className="index-arrow">→</span>
        </a>
      ))}
    </section>
  );
}

/* ============================================================
   ABOUT
   ============================================================ */
function About() {
  return (
    <section id="about" className="about">
      <div className="section-head">
        <span className="sec-num">//02</span>
        <span className="sec-name">ABOUT</span>
        <span className="sec-rule" />
      </div>

      <div className="about-grid">
        <div className="about-kicker">
          <div className="kicker-lg">
            I build <em>interfaces</em><br/>
            that ship. I lead<br/>
            <em>people</em> that<br/>
            ship harder.
          </div>
        </div>

        <div className="about-body">
          <p className="dropcap">
            Frontend engineer, 4+ years deep in the part of the stack users
            actually touch. Recently handed the keys to a team — 6 months in,
            still allergic to bad craft.
          </p>
          <p>
            I care about the boring stuff: loading states, empty states, the
            400ms after a click where most products disappoint. I treat a
            <code>useState</code> like a decision and a <code>className</code> like a sentence.
          </p>
          <p>
            Not looking for a job. Looking for a record.
          </p>

          <div className="about-stats">
            <div><b>04+</b><span>years shipping</span></div>
            <div><b>06</b><span>months leading</span></div>
            <div><b>17</b><span>production apps</span></div>
            <div><b>01</b><span>obsession</span></div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   EXPERIENCE
   ============================================================ */
function Experience() {
  const jobs = [
    {
      year: '2025',
      range: '→ NOW',
      role: 'Team Lead · Frontend',
      company: '[CURRENT COMPANY]',
      tags: ['leadership', 'react', 'architecture', 'mentoring'],
      note: 'Leading a squad of 4. Owning roadmap, code review, and the uncomfortable conversations.',
    },
    {
      year: '2023',
      range: '— 2025',
      role: 'Senior Frontend Engineer',
      company: '[COMPANY NAME]',
      tags: ['react', 'next', 'design systems', 'performance'],
      note: 'Rebuilt the design system from scratch. Shipped the redesign. Broke, then fixed, production.',
    },
    {
      year: '2022',
      range: '— 2023',
      role: 'Frontend Engineer',
      company: '[COMPANY NAME]',
      tags: ['react', 'typescript', 'figma→code'],
      note: 'First team where I learned what "ship it" really meant.',
    },
    {
      year: '2021',
      range: '— 2022',
      role: 'Junior → Mid',
      company: '[COMPANY NAME]',
      tags: ['html/css', 'react', 'growing up'],
      note: 'Wrote my first production bug. And my first production fix.',
    },
  ];
  return (
    <section id="experience" className="experience">
      <div className="section-head">
        <span className="sec-num">//03</span>
        <span className="sec-name">EXPERIENCE</span>
        <span className="sec-rule" />
      </div>

      <ol className="exp-list">
        {jobs.map((j, i) => (
          <li className="exp-row" key={i}>
            <div className="exp-year">
              <span className="exp-year-num">{j.year}</span>
              <span className="exp-year-range">{j.range}</span>
            </div>
            <div className="exp-body">
              <div className="exp-role">{j.role}</div>
              <div className="exp-company">{j.company}</div>
              <div className="exp-note">{j.note}</div>
              <div className="exp-tags">
                {j.tags.map((t, k) => <span key={k} className="exp-tag">{t}</span>)}
              </div>
            </div>
            <div className="exp-index">0{jobs.length - i}</div>
          </li>
        ))}
      </ol>
    </section>
  );
}

/* ============================================================
   WORK
   ============================================================ */
const PROJECTS = [
  {
    n: '01',
    name: 'MERIDIAN',
    kicker: 'Design system + component lab',
    year: '2025',
    role: 'Architect + IC',
    stack: ['react', 'typescript', 'radix', 'stitches', 'storybook'],
    blurb: 'A design system built for a 40-engineer frontend org. 110 components, dark/light, 3 brands, one source of truth. Shipped the migration in 9 weeks.',
    metric: '110 components · 9 wks',
    color: 'var(--accent)',
  },
  {
    n: '02',
    name: 'SILO',
    kicker: 'Internal ops dashboard',
    year: '2024',
    role: 'Tech Lead',
    stack: ['next', 'trpc', 'prisma', 'tanstack', 'd3'],
    blurb: 'Rebuilt an internal ops tool from a jQuery legacy to a typed, real-time dashboard. Saved the ops team ~6 hours a week and my sanity.',
    metric: '−6h/wk · 18k daily req',
    color: 'var(--accent-2)',
  },
  {
    n: '03',
    name: 'NORTH',
    kicker: 'Personal experiment',
    year: '2024',
    role: 'Everything',
    stack: ['svelte', 'webgl', 'three', 'rust-wasm'],
    blurb: 'A procedural terrain playground. No product, no roadmap, no users. Just shaders and a love letter to the part of this job nobody pays for.',
    metric: 'shader #47 · no users',
    color: 'var(--fg)',
  },
];

function WorkIndex() {
  return (
    <div className="work-index">
      {PROJECTS.map((p) => (
        <a className="work-row" key={p.n} href={`#project-${p.n}`}>
          <div className="work-n">{p.n}</div>
          <div className="work-name" style={{ '--hover-c': p.color }}>{p.name}</div>
          <div className="work-kicker">{p.kicker}</div>
          <div className="work-year">{p.year}</div>
          <div className="work-preview">
            <div className="work-preview-inner" style={{ background: p.color }}>
              <div className="wp-name">{p.name}</div>
              <div className="wp-stripes" />
            </div>
          </div>
        </a>
      ))}
    </div>
  );
}

function WorkGrid() {
  return (
    <div className="work-grid">
      {PROJECTS.map((p) => (
        <article className="wg-card" key={p.n}>
          <div className="wg-cover" style={{ '--c': p.color }}>
            <div className="wg-cover-label">
              <div>{p.n} / {p.name}</div>
              <div className="wg-cover-kicker">{p.kicker.toUpperCase()}</div>
            </div>
            <svg className="wg-cover-art" viewBox="0 0 400 300" preserveAspectRatio="none">
              <defs>
                <pattern id={`pat-${p.n}`} width="12" height="12" patternUnits="userSpaceOnUse">
                  <path d="M 0 12 L 12 0" stroke={p.color} strokeWidth="1.2" opacity="0.5" />
                </pattern>
              </defs>
              <rect width="400" height="300" fill={`url(#pat-${p.n})`} />
              <rect x="0" y="0" width="400" height="300" fill="none" stroke={p.color} strokeWidth="2" />
            </svg>
          </div>
          <div className="wg-meta">
            <div className="wg-year">{p.year}</div>
            <div className="wg-name">{p.name}</div>
            <div className="wg-role">{p.role}</div>
            <p className="wg-blurb">{p.blurb}</p>
            <div className="wg-stack">{p.stack.join(' · ')}</div>
            <div className="wg-metric">{p.metric}</div>
          </div>
        </article>
      ))}
    </div>
  );
}

function WorkSlabs() {
  return (
    <div className="work-slabs">
      {PROJECTS.map((p, i) => (
        <article className={`slab ${i % 2 === 1 ? 'slab-rev' : ''}`} key={p.n}>
          <div className="slab-visual" style={{ '--c': p.color }}>
            <div className="slab-code">{p.n}</div>
            <div className="slab-name">{p.name}</div>
            <div className="slab-bars">
              {Array.from({ length: 14 }).map((_, k) => (
                <div key={k} className="slab-bar" style={{ height: `${20 + Math.sin(k * 0.7 + i) * 40 + 40}%` }} />
              ))}
            </div>
          </div>
          <div className="slab-copy">
            <div className="slab-year">{p.year} · {p.role}</div>
            <h3 className="slab-title">{p.kicker}</h3>
            <p className="slab-blurb">{p.blurb}</p>
            <div className="slab-stack">
              {p.stack.map((s, k) => <span key={k}>{s}</span>)}
            </div>
            <div className="slab-metric">→ {p.metric}</div>
          </div>
        </article>
      ))}
    </div>
  );
}

function Work({ layout }) {
  return (
    <section id="work" className="work">
      <div className="section-head">
        <span className="sec-num">//04</span>
        <span className="sec-name">SELECTED WORK</span>
        <span className="sec-count">(03)</span>
        <span className="sec-rule" />
      </div>
      {layout === 'grid' && <WorkGrid />}
      {layout === 'slabs' && <WorkSlabs />}
      {layout === 'index' && <WorkIndex />}
    </section>
  );
}

/* ============================================================
   STACK
   ============================================================ */
function Stack() {
  const groups = [
    { k: 'CORE', items: ['TypeScript', 'React', 'Next.js', 'Node'] },
    { k: 'STYLE', items: ['Tailwind', 'Stitches', 'CSS-in-JS', 'Radix'] },
    { k: 'DATA', items: ['tRPC', 'TanStack', 'Prisma', 'Zod'] },
    { k: 'CRAFT', items: ['Figma', 'Storybook', 'Playwright', 'Vercel'] },
    { k: 'LEARNING', items: ['Rust', 'WebGPU', 'Bun', 'Effect.ts'] },
  ];
  const tickerItems = ['TYPESCRIPT', 'REACT', 'NEXT.JS', 'NODE', 'TAILWIND', 'PRISMA', 'FIGMA', 'PLAYWRIGHT', 'RUST', 'WEBGPU', 'EFFECT.TS', 'VERCEL'];
  return (
    <section id="stack" className="stack">
      <div className="section-head">
        <span className="sec-num">//05</span>
        <span className="sec-name">STACK</span>
        <span className="sec-rule" />
      </div>

      <div className="ticker">
        <div className="ticker-track">
          {[...tickerItems, ...tickerItems].map((t, i) => (
            <span key={i} className="ticker-item">
              {t}<span className="ticker-dot">●</span>
            </span>
          ))}
        </div>
      </div>

      <div className="stack-grid">
        {groups.map((g) => (
          <div className="stack-col" key={g.k}>
            <div className="stack-k">{g.k}</div>
            <ul>
              {g.items.map((it) => (
                <li key={it}>{it}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================================================
   CONTACT
   ============================================================ */
function Contact() {
  const [copied, setCopied] = useState(false);
  const email = 'hans@izarraraz.dev';
  const copy = () => {
    navigator.clipboard?.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <section id="contact" className="contact">
      <div className="section-head">
        <span className="sec-num">//06</span>
        <span className="sec-name">CONTACT</span>
        <span className="sec-rule" />
      </div>

      <div className="contact-grid">
        <div className="contact-big">
          <div className="contact-pre">write. not a form.</div>
          <a className="contact-mail" href={`mailto:${email}`} onClick={(e) => { e.preventDefault(); copy(); }}>
            {email}
            <span className="contact-copy">{copied ? '✓ copied' : 'click to copy'}</span>
          </a>
        </div>

        <div className="contact-side">
          <div className="contact-block">
            <div className="cb-k">CV</div>
            <a className="cb-cta" href="#" onClick={(e) => e.preventDefault()}>
              <span>↓ DOWNLOAD.PDF</span>
              <span className="cb-meta">updated apr 2026</span>
            </a>
          </div>
          <div className="contact-block">
            <div className="cb-k">ELSEWHERE</div>
            <ul className="cb-links">
              <li><a href="#" onClick={(e) => e.preventDefault()}>→ GITHUB</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>→ LINKEDIN</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>→ READ.CV</a></li>
              <li><a href="#" onClick={(e) => e.preventDefault()}>→ X / TWITTER</a></li>
            </ul>
          </div>
          <div className="contact-block">
            <div className="cb-k">LOCATION</div>
            <div className="cb-val">MÉXICO · GMT-6</div>
            <div className="cb-val">AVAILABLE FOR: SIDE PROJECTS, MENTORING, COFFEE</div>
          </div>
        </div>
      </div>

      <footer className="footer">
        <div>© {new Date().getFullYear()} HANS IZARRARAZ</div>
        <div className="footer-mid">hand-coded · no builder · no template</div>
        <div>press <kbd>~</kbd> for console</div>
      </footer>
    </section>
  );
}

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const [hovering, setHovering] = useState(null);

  useEffect(() => {
    const onMove = (e) => { pos.current.x = e.clientX; pos.current.y = e.clientY; };
    window.addEventListener('mousemove', onMove);

    let raf;
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.2;
      ring.current.y += (pos.current.y - ring.current.y) * 0.2;
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0)`;
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0)`;
      if (labelRef.current) labelRef.current.style.transform = `translate3d(${pos.current.x + 18}px, ${pos.current.y + 18}px, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onOver = (e) => {
      const el = e.target.closest('[data-cursor]');
      if (el) setHovering(el.getAttribute('data-cursor'));
    };
    const onOut = (e) => {
      if (!e.relatedTarget || !e.relatedTarget.closest?.('[data-cursor]')) setHovering(null);
    };
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);

    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className={`cursor-ring ${hovering ? 'is-hover' : ''}`} />
      <div ref={dotRef} className="cursor-dot" />
      <div ref={labelRef} className={`cursor-label ${hovering ? 'show' : ''}`}>{hovering}</div>
    </>
  );
}

/* ============================================================
   NAV
   ============================================================ */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <nav className={`nav ${scrolled ? 'nav-scrolled' : ''}`}>
      <div className="nav-brand">
        <span className="nav-dot" />
        HANS.IZARRARAZ
      </div>
      <div className="nav-links">
        <a href="#home" data-cursor="home">//HOME</a>
        <a href="#about" data-cursor="about">//ABOUT</a>
        <a href="#experience" data-cursor="exp">//EXP</a>
        <a href="#work" data-cursor="work">//WORK</a>
        <a href="#stack" data-cursor="stack">//STACK</a>
        <a href="#contact" data-cursor="contact">//CONTACT</a>
      </div>
      <div className="nav-cta">
        <span className="nav-kbd">press <kbd>~</kbd></span>
      </div>
    </nav>
  );
}

/* ============================================================
   CONSOLE — easter egg
   ============================================================ */
function Console({ setAccent, setLayout }) {
  const [open, setOpen] = useState(false);
  const [history, setHistory] = useState([
    { type: 'sys', text: 'hans.sh v2026.04 — type `help`' },
  ]);
  const [value, setValue] = useState('');
  const inputRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === '`' || e.key === '~') {
        if (document.activeElement?.tagName === 'INPUT' && document.activeElement !== inputRef.current) return;
        e.preventDefault();
        setOpen((o) => !o);
      } else if (e.key === 'Escape') {
        setOpen(false);
      } else if (e.key.toLowerCase() === 'j' && !e.metaKey && !e.ctrlKey && document.activeElement?.tagName !== 'INPUT') {
        window.scrollBy({ top: window.innerHeight * 0.8, behavior: 'smooth' });
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 50);
  }, [open]);

  useEffect(() => {
    if (bodyRef.current) bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
  }, [history]);

  const run = (raw) => {
    const cmd = raw.trim();
    const next = [...history, { type: 'cmd', text: cmd }];
    const [name, ...args] = cmd.split(/\s+/);
    const push = (t, type = 'out') => next.push({ type, text: t });

    switch (name) {
      case '':
        break;
      case 'help':
        push('available: whoami · ls · cat about · open <01|02|03> · theme <red|lime|cyan|amber> · layout <index|grid|slabs> · matrix · sudo · clear · exit');
        break;
      case 'whoami':
        push('hans izarraraz');
        push('frontend engineer · team lead · mexico city');
        break;
      case 'ls':
        push('about.md  experience.md  work/  stack.md  contact.md  .secret');
        break;
      case 'cat':
        if (args[0] === 'about') {
          push('I build interfaces that ship. I lead people that ship harder.');
        } else if (args[0] === '.secret') {
          push('you found it. coffee on me if we ever meet.', 'accent');
        } else {
          push(`cat: ${args[0] || ''}: no such file`, 'err');
        }
        break;
      case 'open': {
        const map = { '01': '#work', '02': '#work', '03': '#work', about: '#about', work: '#work', contact: '#contact' };
        if (map[args[0]]) {
          push(`→ navigating to ${args[0]}`);
          setTimeout(() => document.querySelector(map[args[0]])?.scrollIntoView?.({ behavior: 'smooth' }), 300);
        } else {
          push(`open: unknown target '${args[0] || ''}'`, 'err');
        }
        break;
      }
      case 'theme': {
        const themes = { red: '#ff2d3a', lime: '#c8ff3d', cyan: '#5ce1e6', amber: '#ffb020', crimson: '#7a0000' };
        if (themes[args[0]]) {
          setAccent(themes[args[0]]);
          push(`theme → ${args[0]}`, 'accent');
        } else {
          push('theme: red | lime | cyan | amber | crimson', 'err');
        }
        break;
      }
      case 'layout':
        if (['index', 'grid', 'slabs'].includes(args[0])) {
          setLayout(args[0]);
          push(`layout → ${args[0]}`, 'accent');
        } else {
          push('layout: index | grid | slabs', 'err');
        }
        break;
      case 'matrix':
        push('initializing matrix...', 'accent');
        document.body.classList.add('matrix-mode');
        setTimeout(() => document.body.classList.remove('matrix-mode'), 4000);
        break;
      case 'sudo':
        if (args.join(' ') === 'make-me-senior') {
          push('access denied. ship more.', 'err');
        } else {
          push('nice try.', 'err');
        }
        break;
      case 'clear':
        setHistory([]);
        setValue('');
        return;
      case 'exit':
        setOpen(false);
        setValue('');
        return;
      default:
        push(`hans.sh: command not found: ${name}`, 'err');
    }
    setHistory(next);
    setValue('');
  };

  if (!open) return null;
  return (
    <div className="console">
      <div className="console-bar">
        <span className="console-dots"><i /><i /><i /></span>
        <span className="console-title">hans@portfolio — ~/public</span>
        <button className="console-x" onClick={() => setOpen(false)}>×</button>
      </div>
      <div className="console-body" ref={bodyRef}>
        {history.map((h, i) => (
          <div key={i} className={`console-line console-${h.type}`}>
            {h.type === 'cmd' && <span className="console-prompt">hans@portfolio ~ % </span>}
            <span>{h.text}</span>
          </div>
        ))}
        <div className="console-input-row">
          <span className="console-prompt">hans@portfolio ~ % </span>
          <input
            ref={inputRef}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') run(value); }}
            spellCheck={false}
            autoComplete="off"
          />
        </div>
      </div>
    </div>
  );
}

/* ============================================================
   APP
   ============================================================ */
export default function App() {
  const [accent, setAccent] = useState('#ff2d3a');
  const [accent2] = useState('#c8ff3d');
  const [layout, setLayout] = useState('grid');

  useEffect(() => {
    document.documentElement.style.setProperty('--accent', accent);
  }, [accent]);

  useEffect(() => {
    document.documentElement.style.setProperty('--accent-2', accent2);
  }, [accent2]);

  useEffect(() => {
    const els = document.querySelectorAll('.section-head, .exp-row, .work-row, .wg-card, .slab, .stack-col, .about-body p, .contact-block, .index-row');
    els.forEach((el) => el.classList.add('reveal'));
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('reveal-in');
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -5% 0px' });
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [layout]);

  return (
    <>
      <Cursor />
      <Nav />
      <main>
        <Hero />
        <IndexStrip />
        <About />
        <Experience />
        <Work layout={layout} />
        <Stack />
        <Contact />
      </main>
      <Console setAccent={setAccent} setLayout={setLayout} />
    </>
  );
}
