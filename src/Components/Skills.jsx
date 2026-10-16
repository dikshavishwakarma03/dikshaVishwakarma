import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';

import html from '../assets/img/html.svg';
import css from '../assets/img/css.svg';
import js from '../assets/img/js.svg';
import react from '../assets/img/react.svg';
import nextjs from '../assets/img/nextjs.svg';
import tailwind from '../assets/img/tailwind.svg';
import bootstrap from '../assets/img/bootstrap.svg';
import sql from '../assets/img/sql.svg';
import java from '../assets/img/java.svg';

/* ---------- shared tokens (same palette as Home / About / NavBar) ---------- */
const accent = 'text-teal-600 [.dark_&]:text-[#64ffda]';
const heading = 'text-slate-900 [.dark_&]:text-[#ccd6f6]';
const muted = 'text-slate-600 [.dark_&]:text-[#8892b0]';
const hairline = 'border-slate-900/10 [.dark_&]:border-[#64ffda]/15';

/* ---------- content: add or remove skills here ----------
   `cat` decides which tab a skill belongs to.
   `logo` is optional; skills without one get a 2-letter badge. */
const skills = [
  { name: 'HTML', cat: 'Frontend', logo: html, href: 'https://html.com/' },
  { name: 'CSS', cat: 'Frontend', logo: css, href: 'https://www.w3.org/Style/CSS/Overview.en.html' },
  { name: 'JavaScript', cat: 'Frontend', logo: js, href: 'https://www.javascript.com/' },
  { name: 'TypeScript', cat: 'Frontend', href: 'https://www.typescriptlang.org/' },
  { name: 'React', cat: 'Frontend', logo: react, href: 'https://react.dev/' },
  { name: 'Next.js', cat: 'Frontend', logo: nextjs, href: 'https://nextjs.org/' },
  { name: 'Tailwind CSS', cat: 'Frontend', logo: tailwind, href: 'https://tailwindcss.com/' },
  { name: 'Bootstrap', cat: 'Frontend', logo: bootstrap, href: 'https://getbootstrap.com/' },
  { name: 'Module Federation', cat: 'Frontend', href: 'https://module-federation.io/' },
  { name: 'Go', cat: 'Backend', href: 'https://go.dev/' },
  { name: 'Node.js', cat: 'Backend', href: 'https://nodejs.org/' },
  { name: 'Java', cat: 'Backend', logo: java, href: 'https://www.java.com/en/' },
  { name: 'REST APIs', cat: 'Backend' },
  { name: 'SQL', cat: 'Data', logo: sql, href: 'https://www.mysql.com/' },
  { name: 'MongoDB', cat: 'Data', href: 'https://www.mongodb.com/' },
  { name: 'PostGres', cat: 'Data', href: 'https://www.postgresql.org/' },
  { name: 'Docker', cat: 'Tools', href: 'https://www.docker.com/' },
  { name: 'Git', cat: 'Tools', href: 'https://git-scm.com/' },
  { name: 'Keycloak', cat: 'Tools', href: 'https://www.keycloak.org/' },
  { name: 'Jest', cat: 'Testing', href: 'https://jestjs.io/' },
  { name: 'PenTest', cat: 'Testing', href: 'https://Pentest.io/' },
];

const tabs = ['All', 'Frontend', 'Backend', 'Data', 'Testing', 'Tools'];

/* A row needs enough pills to fill a wide screen, so short lists are repeated. */
const MIN_PER_HALF = 14;
const fill = (items) =>
  Array.from({ length: Math.ceil(MIN_PER_HALF / items.length) }, () => items).flat();

/* ---------- pieces ---------- */
const Logo = ({ src, name }) =>
  src ? (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-white p-1.5 ring-1 ring-slate-900/10 [.dark_&]:ring-white/10">
      <img src={src} alt="" className="h-full w-full object-contain" />
    </span>
  ) : (
    <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-600/10 font-mono text-xs font-bold text-teal-600 ring-1 ring-teal-600/20 [.dark_&]:bg-[#64ffda]/10 [.dark_&]:text-[#64ffda] [.dark_&]:ring-[#64ffda]/25">
      {name.slice(0, 2)}
    </span>
  );

const Pill = ({ name, cat, logo, href, hidden }) => {
  const Tag = href ? 'a' : 'span';
  const props = href
    ? { href, target: '_blank', rel: 'noopener noreferrer', tabIndex: hidden ? -1 : undefined }
    : {};
  return (
    <Tag
      {...props}
      className="flex shrink-0 items-center gap-3 rounded-xl border border-slate-900/10 bg-white/70 px-4 py-2.5 backdrop-blur-md transition-all duration-300 hover:border-teal-600/60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-teal-600 [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0d2240] [.dark_&]:hover:border-[#64ffda]/60 [.dark_&]:hover:bg-[#112a4d] [.dark_&]:hover:shadow-[0_0_24px_-8px_rgba(100,255,218,0.5)] [.dark_&]:focus-visible:outline-[#64ffda]"
    >
      <Logo src={logo} name={name} />
      <span className="leading-tight">
        <span className={`block whitespace-nowrap text-sm font-semibold ${heading}`}>{name}</span>
        <span className={`block font-mono text-[11px] ${muted}`}>{cat.toLowerCase()}</span>
      </span>
    </Tag>
  );
};

/* The list is rendered twice so the loop is seamless. */
const Row = ({ items, reverse = false }) => {
  const list = fill(items);
  return (
    <div
      className="sk-row overflow-hidden py-1"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, #000 8%, #000 92%, transparent)',
      }}
    >
      <div
        className={`sk-track flex w-max ${reverse ? 'sk-reverse' : ''}`}
        style={{ animationDuration: `${list.length * 3.2}s` }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} className="flex gap-3 pr-3" aria-hidden={copy === 1}>
            {list.map((s, i) => (
              <Pill key={`${s.name}-${i}`} {...s} hidden={copy === 1} />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

const Skills = () => {
  const [active, setActive] = useState('All');

  // "All" shows two rows (frontend, then everything else); a tab shows one row.
  const shown = active === 'All' ? skills : skills.filter((s) => s.cat === active);
  const rows =
    active === 'All'
      ? [skills.filter((s) => s.cat === 'Frontend'), skills.filter((s) => s.cat !== 'Frontend')]
      : [shown];

  return (
    <MotionConfig reducedMotion="user">
      {/* scoped marquee styles: pauses on hover or keyboard focus, off for reduced motion */}
      <style>{`
        @keyframes sk-scroll { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        .sk-track { animation: sk-scroll linear infinite; }
        .sk-reverse { animation-direction: reverse; }
        .sk-row:hover .sk-track, .sk-row:focus-within .sk-track { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) { .sk-track { animation: none; } }
      `}</style>

      {/* Background is a gradient made of SOLID colours (no translucent dark fill,
          which blended with the white page behind it and turned grey). */}
      <section
        id="skills"
        className="relative isolate overflow-hidden bg-gradient-to-br from-white via-slate-50 to-sky-50 px-6 py-20 md:px-12 [.dark_&]:from-[#0b1d36] [.dark_&]:via-[#0d2240] [.dark_&]:to-[#0b1d36]"
      >
        {/* Background patches (same style as Home) */}
        <motion.div
          aria-hidden
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 19, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-24 top-24 -z-10 h-60 w-72 rounded-full bg-teal-300/40 blur-3xl [.dark_&]:bg-[#64ffda]/10"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 23, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-20 bottom-4 -z-10 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl [.dark_&]:bg-sky-500/10"
        />

        {/* soft teal glow at the top, dark mode only */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 -z-10 hidden h-72 bg-[radial-gradient(ellipse_at_top,rgba(100,255,218,0.07),transparent_70%)] [.dark_&]:block"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-6xl"
        >
          {/* Title */}
          <div className="flex items-center gap-4">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
              My <span className={accent}>skills</span>
            </h2>
            <span aria-hidden className={`h-px flex-1 border-t ${hairline}`} />
          </div>

          <p className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${muted}`}>
            The tools I use to build web applications, from the interface to the database.
          </p>

          {/* Tabs */}
          <div role="tablist" aria-label="Skill categories" className="mt-8 flex flex-wrap items-center gap-1">
            {tabs.map((t) => {
              const on = t === active;
              return (
                <button
                  key={t}
                  role="tab"
                  aria-selected={on}
                  onClick={() => setActive(t)}
                  className={`relative rounded-full px-4 py-1.5 font-mono text-sm transition-colors ${
                    on ? accent : `${muted} hover:text-teal-600 [.dark_&]:hover:text-[#64ffda]`
                  }`}
                >
                  {on && (
                    <motion.span
                      layoutId="skill-tab"
                      className="absolute inset-0 -z-10 rounded-full bg-teal-600/10 [.dark_&]:bg-[#64ffda]/10 [.dark_&]:ring-1 [.dark_&]:ring-[#64ffda]/30"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                  {t}
                </button>
              );
            })}
            <span className={`ml-auto font-mono text-xs ${muted}`}>{shown.length} technologies</span>
          </div>

          {/* Marquee rows: rebuilt with a soft fade whenever the tab changes */}
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
            className="mt-6 space-y-2"
          >
            {rows.map((items, i) => (
              <Row key={i} items={items} reverse={i % 2 === 1} />
            ))}
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
};

export default Skills;