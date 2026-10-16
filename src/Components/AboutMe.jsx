import { motion, MotionConfig } from 'framer-motion';

/* ---------- shared tokens (same palette as Home / NavBar) ---------- */
const accent = 'text-teal-600 [.dark_&]:text-[#64ffda]';
const heading = 'text-slate-900 [.dark_&]:text-[#ccd6f6]';
const muted = 'text-slate-600 [.dark_&]:text-[#8892b0]';
const hairline = 'border-slate-900/10 [.dark_&]:border-[#64ffda]/15';
const lineBg = 'bg-teal-600/30 [.dark_&]:bg-[#64ffda]/30';
const dotBg = 'bg-teal-600 [.dark_&]:bg-[#64ffda]';

/* ---------- content ---------- */
const nodes = [
  {
    title: 'Frontend',
    tag: 'UI',
    note: 'Micro frontends with Module Federation',
    items: ['React JS', 'Next.js', 'Tailwind CSS', 'Module Federation'],
  },
  {
    title: 'Services',
    tag: 'API',
    note: 'The APIs behind the interface',
    items: ['Go', 'Node.js', 'REST APIs'],
  },
  {
    title: 'Data',
    tag: 'DB',
    note: 'Where it all lives',
    items: ['SQL', 'PostgreSQL', 'MongoDB'],
  },
];

const testing = {
  title: 'Testing',
  tag: 'QA',
  note: 'Keeping the whole stack reliable and secure',
  items: ['Jest', 'PenTest'],
};

/* ---------- pieces ---------- */
const Chip = ({ children }) => (
  <span className="rounded-md border border-slate-900/10 bg-white px-2 py-0.5 font-mono text-[12.5px] text-slate-700 transition-colors hover:border-teal-600 hover:text-teal-600 [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0a192f]/70 [.dark_&]:text-[#ccd6f6] [.dark_&]:hover:border-[#64ffda] [.dark_&]:hover:text-[#64ffda]">
    {children}
  </span>
);

/* A wire with a small packet travelling along it.
   Horizontal between boxes on desktop, vertical on mobile. */
const Wire = ({ label, delay = 0 }) => (
  <>
    {/* desktop */}
    <div aria-hidden className="hidden w-16 flex-col items-center justify-center gap-1.5 lg:flex xl:w-20">
      <span className={`font-mono text-[11px] ${muted}`}>{label}</span>
      <span className={`relative h-px w-full ${lineBg}`}>
        <motion.span
          animate={{ left: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: 'linear', delay }}
          className={`absolute -top-[2px] h-[5px] w-[5px] -translate-x-1/2 rounded-full ${dotBg}`}
        />
      </span>
    </div>
    {/* mobile */}
    <span aria-hidden className={`relative mx-auto h-6 w-px lg:hidden ${lineBg}`}>
      <motion.span
        animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay }}
        className={`absolute -left-[2px] h-[5px] w-[5px] -translate-y-1/2 rounded-full ${dotBg}`}
      />
    </span>
  </>
);

/* Vertical wire (all screen sizes) that connects the diagram to the Testing box. */
const VWire = ({ label, delay = 0 }) => (
  <div aria-hidden className="flex items-center justify-center gap-2 py-0.5">
    <span className={`relative h-7 w-px ${lineBg}`}>
      <motion.span
        animate={{ top: ['0%', '100%'], opacity: [0, 1, 1, 0] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'linear', delay }}
        className={`absolute -left-[2px] h-[5px] w-[5px] -translate-y-1/2 rounded-full ${dotBg}`}
      />
    </span>
    <span className={`font-mono text-[11px] ${muted}`}>{label}</span>
  </div>
);

const Node = ({ title, tag, note, items }) => (
  <div className="rounded-xl border border-slate-900/10 bg-white/70 p-4 shadow-lg shadow-slate-900/5 backdrop-blur-md transition-colors hover:border-teal-600/50 [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0d2240]/70 [.dark_&]:shadow-black/30 [.dark_&]:hover:border-[#64ffda]/50">
    <div className="flex items-center justify-between">
      <p className={`font-mono text-sm font-semibold ${accent}`}>{title}</p>
      <span className={`rounded border px-1.5 font-mono text-[10px] leading-5 ${hairline} ${muted}`}>{tag}</span>
    </div>
    <p className={`mt-1 text-[13px] leading-snug ${muted}`}>{note}</p>
    <div className="mt-3 flex flex-wrap gap-1.5">
      {items.map((t) => (
        <Chip key={t}>{t}</Chip>
      ))}
    </div>
  </div>
);

const AboutMe = () => (
  <MotionConfig reducedMotion="user">
    <section
      id="aboutMe"
      className="relative isolate overflow-hidden bg-gradient-to-br from-white via-slate-50 to-teal-50 px-6 py-20 md:px-12 [.dark_&]:from-[#0a192f] [.dark_&]:via-[#0d2240] [.dark_&]:to-[#0a192f]"
    >
      {/* Background patches (same style as Home, placed differently) */}
      <motion.div
        aria-hidden
        animate={{ x: [0, -30, 20, 0], y: [0, 30, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -right-24 top-10 -z-10 h-64 w-72 rounded-full bg-sky-300/40 blur-3xl [.dark_&]:bg-sky-500/10"
      />
      <motion.div
        aria-hidden
        animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: 'easeInOut' }}
        className="pointer-events-none absolute -left-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-teal-300/40 blur-3xl [.dark_&]:bg-[#64ffda]/10"
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
            About <span className={accent}>me</span>
          </h2>
          <span aria-hidden className={`h-px flex-1 border-t ${hairline}`} />
        </div>

        {/* Intro */}
        <p className={`mt-6 max-w-2xl text-base leading-relaxed sm:text-lg ${muted}`}>
          I&apos;m Diksha, a software developer at{' '}
          <span className={`font-semibold ${accent}`}>Mahity Systems</span> with a B.E. in
          Information Technology. I build and test web applications end to end, from the interface
          to the database, and this is how the pieces fit together.
        </p>

        {/* Diagram */}
        <div className="mt-8 grid gap-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:gap-3">
          <Node {...nodes[0]} />
          <Wire label="HTTP" />
          <Node {...nodes[1]} />
          <Wire label="query" delay={1.2} />
          <Node {...nodes[2]} />

          {/* Testing sits under the whole stack */}
          <div className="mx-auto w-full lg:col-span-5 lg:max-w-md">
            <VWire label="verify" delay={0.6} />
            <Node {...testing} />
          </div>
        </div>

        {/* Footer line */}
        <p className={`mt-6 font-mono text-sm ${muted}`}>
          <span className={accent}>$</span> learning since 2021, working as a web developer since 2024
        </p>
      </motion.div>
    </section>
  </MotionConfig>
);

export default AboutMe;