import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import projImg1 from '../assets/img/netflix-clone.png';
import projImg2 from '../assets/img/music-academy.jpg';
import projImg3 from '../assets/img/Weather.png';

/* ---------- shared tokens (same palette as Home / About / Skills) ---------- */
const accent = 'text-teal-600 [.dark_&]:text-[#64ffda]';
const heading = 'text-slate-900 [.dark_&]:text-[#ccd6f6]';
const muted = 'text-slate-600 [.dark_&]:text-[#8892b0]';
const hairline = 'border-slate-900/10 [.dark_&]:border-[#64ffda]/15';

/* ---------- content ----------
   file         -> name shown in the list, like a file in an editor
   tech         -> small tags; leave [] to hide them
   links.live   -> optional; shows a "live demo" icon when set */
const projects = [
  {
    file: 'music-academy',
    title: 'Music Academy',
    description:
      'A web app for learning and teaching music, where users can explore courses and educational content.',
    image: projImg2,
    tech: [], // add the stack you used
    links: {},
  },
  {
    file: 'weather-app',
    title: 'Weather App',
    description:
      'A React app that shows current weather for any city, including temperature, humidity and wind speed, using live data from the OpenWeatherMap API.',
    image: projImg3,
    tech: ['React', 'OpenWeatherMap API'],
    links: { github: 'https://github.com/dikshavishwakarma03/weather-app' },
  },
  {
    file: 'Netflix-Web',
    title: 'Netflix-Web',
    description:
      'A Netflix-style front end built with React and Vite, with ESLint for code quality. A foundation for a streaming-site interface.',
    image: projImg1,
    tech: ['React', 'Vite', 'ESLint'],
    links: { github: 'https://github.com/dikshavishwakarma03/Netflix-Web' },
  },
];

const Project = () => {
  const [index, setIndex] = useState(0);
  const p = projects[index];

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="projects"
        className="relative isolate overflow-hidden bg-gradient-to-br from-white via-slate-50 to-teal-50 px-6 py-20 md:px-12 [.dark_&]:from-[#0a192f] [.dark_&]:via-[#0d2240] [.dark_&]:to-[#0a192f]"
      >
        {/* Background patches (same as Home) */}
        <motion.div
          aria-hidden
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-24 top-16 -z-10 h-60 w-72 rounded-full bg-teal-300/40 blur-3xl [.dark_&]:bg-[#64ffda]/10"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-72 w-72 rounded-full bg-sky-300/40 blur-3xl [.dark_&]:bg-sky-500/10"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-6xl"
        >
          <div className="flex items-center gap-4">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
              Things I&apos;ve <span className={accent}>built</span>
            </h2>
            <span aria-hidden className={`h-px flex-1 border-t ${hairline}`} />
          </div>

          <div className="mt-10 overflow-hidden rounded-2xl border border-slate-900/10 bg-white/70 shadow-xl shadow-slate-900/10 backdrop-blur-md [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0d2240]/70 [.dark_&]:shadow-black/40">
            {/* title bar */}
            <div className={`flex items-center gap-2 border-b px-4 py-3 ${hairline}`}>
              <span className="h-3 w-3 rounded-full bg-red-400" />
              <span className="h-3 w-3 rounded-full bg-amber-400" />
              <span className="h-3 w-3 rounded-full bg-emerald-400" />
              <span className={`ml-3 font-mono text-xs ${muted}`}>projects/</span>
            </div>

            <div className="grid md:grid-cols-[220px_1fr]">
              {/* file list: sidebar on desktop, scrolling row on mobile */}
              <div
                role="tablist"
                aria-label="Projects"
                className={`flex overflow-x-auto border-b md:block md:border-b-0 md:border-r ${hairline}`}
              >
                {projects.map((proj, i) => {
                  const on = i === index;
                  return (
                    <button
                      key={proj.file}
                      role="tab"
                      aria-selected={on}
                      onClick={() => setIndex(i)}
                      className={`relative block w-full shrink-0 whitespace-nowrap px-4 py-3 text-left font-mono text-sm transition-colors ${
                        on
                          ? `${accent} bg-teal-600/10 [.dark_&]:bg-[#64ffda]/10`
                          : `${muted} hover:text-teal-600 [.dark_&]:hover:text-[#64ffda]`
                      }`}
                    >
                      {on && (
                        <motion.span
                          layoutId="project-marker"
                          aria-hidden
                          className="absolute inset-y-0 left-0 w-0.5 bg-teal-600 [.dark_&]:bg-[#64ffda]"
                        />
                      )}
                      {proj.file}
                    </button>
                  );
                })}
              </div>

              {/* preview */}
              <motion.div
                key={p.file}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                role="tabpanel"
                className="grid gap-6 p-5 lg:grid-cols-[1.1fr_1fr] lg:items-center"
              >
                <img
                  src={p.image}
                  alt={`${p.title} screenshot`}
                  className="aspect-[16/10] w-full rounded-lg border border-slate-900/10 object-cover object-top [.dark_&]:border-[#64ffda]/15"
                />
                <div>
                  <h3 className={`text-2xl font-bold ${heading}`}>{p.title}</h3>
                  <p className={`mt-3 text-sm leading-relaxed sm:text-base ${muted}`}>{p.description}</p>

                  {p.tech.length > 0 && (
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {p.tech.map((t) => (
                        <li
                          key={t}
                          className="rounded-md border border-slate-900/10 bg-white px-2 py-0.5 font-mono text-xs text-slate-700 [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0a192f]/70 [.dark_&]:text-[#ccd6f6]"
                        >
                          {t}
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="mt-5 flex gap-4">
                    {p.links.github && (
                      <a
                        href={p.links.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} on GitHub`}
                        className={`${muted} transition-colors hover:text-teal-600 [.dark_&]:hover:text-[#64ffda]`}
                      >
                        <Github size={20} />
                      </a>
                    )}
                    {p.links.live && (
                      <a
                        href={p.links.live}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${p.title} live demo`}
                        className={`${muted} transition-colors hover:text-teal-600 [.dark_&]:hover:text-[#64ffda]`}
                      >
                        <ExternalLink size={20} />
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="mt-10 text-center">
            <a
              href="https://github.com/dikshavishwakarma03?tab=repositories"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full border border-teal-600 px-6 py-2.5 text-sm font-semibold text-teal-600 transition-colors hover:bg-teal-600/10 [.dark_&]:border-[#64ffda] [.dark_&]:text-[#64ffda] [.dark_&]:hover:bg-[#64ffda]/10"
            >
              View more on GitHub
            </a>
          </div>
        </motion.div>
      </section>
    </MotionConfig>
  );
};

export default Project;