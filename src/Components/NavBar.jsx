import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, MotionConfig } from 'framer-motion';

const links = [
  { id: 'home', label: 'Home' },
  { id: 'aboutMe', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'contact', label: 'Contact' },
];

/* ---------- reusable Tailwind class strings ---------- */
const glass =
  'bg-white/95 [.dark_&]:bg-[#0a192f]/95 border border-slate-900/10 [.dark_&]:border-[#64ffda]/20 ' +
  'shadow-lg shadow-slate-900/10 [.dark_&]:shadow-black/40 backdrop-blur-md';
const textMain = 'text-slate-700 [.dark_&]:text-slate-200';
const accent = 'text-teal-600 [.dark_&]:text-[#64ffda]';
const iconBtn =
  'text-slate-700 [.dark_&]:text-slate-200 hover:bg-teal-600/10 [.dark_&]:hover:bg-[#64ffda]/10 transition-colors';

/* ---------- theme hook ---------- */
const useTheme = () => {
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme');
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  });

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle('dark', theme === 'dark');
    root.style.colorScheme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  return [theme, () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))];
};

/* ---------- animated theme toggle ---------- */
const ThemeToggle = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';
  const icon = 'absolute inset-0 grid place-items-center transition-all duration-500';
  return (
    <button
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`relative h-9 w-9 shrink-0 rounded-full ${iconBtn}`}
    >
      <span className={`${icon} ${isDark ? 'rotate-0 scale-100 opacity-100' : 'rotate-90 scale-0 opacity-0'}`}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        </svg>
      </span>
      <span className={`${icon} ${isDark ? '-rotate-90 scale-0 opacity-0' : 'rotate-0 scale-100 opacity-100'}`}>
        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
        </svg>
      </span>
    </button>
  );
};

/* ---------- navbar ---------- */
const NavBar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState('home');
  const [pill, setPill] = useState({ left: 0, width: 0 });
  const [theme, toggleTheme] = useTheme();
  const listRef = useRef(null);

  // scroll: shrink + progress (navbar always stays visible)
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? y / max : 0);
      setScrolled(y > 20);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-40% 0px -55% 0px' }
    );
    links.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // sliding pill follows active link
  const movePill = useCallback(() => {
    const list = listRef.current;
    const el = list?.querySelector(`[data-id="${active}"]`);
    if (!el) return;
    const l = list.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setPill({ left: r.left - l.left, width: r.width });
  }, [active]);

  useEffect(() => {
    movePill();
    window.addEventListener('resize', movePill);
    return () => window.removeEventListener('resize', movePill);
  }, [movePill]);

  // Escape closes mobile menu
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setMenuOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  const linkClass = (id) =>
    `block rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
      active === id
        ? accent
        : `${textMain} hover:text-teal-600 [.dark_&]:hover:text-[#64ffda]`
    }`;

  return (
    <MotionConfig reducedMotion="user">
      <motion.header
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="fixed inset-x-0 top-0 z-50 px-3 pt-3"
      >
        <div className="mx-auto max-w-6xl">
          <nav
            className={`relative flex items-center justify-between overflow-hidden rounded-full px-5 transition-[height] duration-300 ${glass} ${
              scrolled ? 'h-12' : 'h-14'
            }`}
          >
            {/* Logo (left) */}
            <button
              onClick={scrollToTop}
              aria-label="Scroll to top"
              className="group flex items-center gap-1 font-mono text-xl font-bold"
            >
              <span className={`${accent} transition-transform duration-300 group-hover:-translate-x-1`}>&lt;</span>
              <span className={textMain}>Diksha</span>
              <span className={`${accent} transition-transform duration-300 group-hover:translate-x-1`}>/&gt;</span>
            </button>

            {/* Links + theme icon (right) */}
            <div className="flex items-center gap-2">
              <ul ref={listRef} className="relative hidden items-center md:flex">
                <span
                  aria-hidden
                  className="absolute bottom-0 top-0 rounded-full bg-teal-600/10 transition-all duration-300 ease-out [.dark_&]:bg-[#64ffda]/10"
                  style={{ left: pill.left, width: pill.width, opacity: pill.width ? 1 : 0 }}
                />
                {links.map(({ id, label }, i) => (
                  <motion.li
                    key={id}
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.07, duration: 0.5 }}
                  >
                    <a href={`#${id}`} data-id={id} className={`relative z-10 ${linkClass(id)}`}>
                      {label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <ThemeToggle theme={theme} onToggle={toggleTheme} />

              <button
                onClick={() => setMenuOpen((o) => !o)}
                aria-label="Toggle menu"
                aria-expanded={menuOpen}
                className={`grid h-9 w-9 place-items-center rounded-full md:hidden ${iconBtn}`}
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
                </svg>
              </button>
            </div>

            {/* Scroll progress */}
            <span
              aria-hidden
              className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-teal-500 to-sky-400 [.dark_&]:from-[#64ffda] [.dark_&]:to-sky-400"
              style={{ transform: `scaleX(${progress})` }}
            />
          </nav>

          {/* Mobile menu */}
          <div
            className={`mt-2 origin-top overflow-hidden rounded-2xl transition-all duration-300 md:hidden ${glass} ${
              menuOpen ? 'visible max-h-80 scale-100 opacity-100' : 'invisible max-h-0 scale-95 opacity-0'
            }`}
          >
            <ul className="flex flex-col items-center gap-1 py-4">
              {links.map(({ id, label }, i) => (
                <li
                  key={id}
                  className={`transition-all duration-300 ${
                    menuOpen ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'
                  }`}
                  style={{ transitionDelay: menuOpen ? `${i * 50}ms` : '0ms' }}
                >
                  <a href={`#${id}`} onClick={() => setMenuOpen(false)} className={`px-6 py-2 text-base ${linkClass(id)}`}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.header>
    </MotionConfig>
  );
};

export default NavBar;