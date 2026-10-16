import { useTypewriter, Cursor } from 'react-simple-typewriter';
import { motion, MotionConfig } from 'framer-motion';
import ParticleBackground from './ParticleBackground';

const RESUME =
  'https://drive.google.com/file/d/16yy4m6VtcjQeoQCkEqmLQ9YKNsNoasN_/view?usp=sharing';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.3 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const accent = 'text-teal-600 [.dark_&]:text-[#64ffda]';
const muted = 'text-slate-600 [.dark_&]:text-[#8892b0]';
const kw = 'text-pink-600 [.dark_&]:text-pink-400';
const str = 'text-amber-600 [.dark_&]:text-amber-300';

const Home = () => {
  const [text] = useTypewriter({
    words: ['Software engineer', 'Web Developer', 'Front End Developer', 'ReactJs Developer', 'Java Developer'],
    loop: true,
    typeSpeed: 90,
    deleteSpeed: 45,
    delaySpeed: 1200,
  });

  return (
    <MotionConfig reducedMotion="user">
      {/* min-h-[80vh]: roomier than fully compact, shorter than full screen.
          Try 70vh for tighter or 85vh for more space. */}
      <section
        id="home"
        className="relative isolate flex min-h-[80vh] items-center overflow-hidden bg-gradient-to-br from-white via-slate-50 to-teal-50 [.dark_&]:from-[#0a192f] [.dark_&]:via-[#0d2240] [.dark_&]:to-[#0a192f]"
      >
        {/* Background layers */}
        <ParticleBackground />
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

        {/* Content */}
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto grid w-full max-w-6xl items-center gap-10 px-6 pb-16 pt-28 md:px-16 lg:grid-cols-[1.15fr_0.85fr]"
        >
          <div>
            <motion.p variants={item} className={`font-mono text-sm tracking-wider ${accent}`}>
              Hi, my name is
            </motion.p>

            <motion.h1
              variants={item}
              className="mt-3 text-4xl font-bold tracking-tight text-slate-900 [.dark_&]:text-[#ccd6f6] sm:text-5xl"
            >
              Diksha Vishwakarma.
            </motion.h1>

            <motion.h2
              variants={item}
              className="mt-2 text-2xl font-semibold tracking-tight text-slate-500 [.dark_&]:text-[#8892b0] sm:text-3xl lg:text-4xl"
            >
              I build things for the{' '}
              <span className="bg-gradient-to-r from-teal-600 to-sky-500 bg-clip-text text-transparent [.dark_&]:from-[#64ffda] [.dark_&]:to-sky-400">
                web.
              </span>
            </motion.h2>

            <motion.p variants={item} className={`mt-5 max-w-xl text-base leading-relaxed sm:text-lg ${muted}`}>
              I&apos;m a software engineer specializing in building clean, fast and
              accessible websites.
            </motion.p>

            <motion.p variants={item} className={`mt-3 font-mono text-sm sm:text-base ${muted}`}>
              I&apos;m a <span className={`font-semibold ${accent}`}>{text}</span>
              <Cursor cursorStyle="|" cursorColor="#14b8a6" />
            </motion.p>

            <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-4">
              <motion.a
                href={RESUME}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="group inline-flex items-center gap-2 rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-colors hover:bg-teal-700 [.dark_&]:bg-[#64ffda] [.dark_&]:text-[#0a192f] [.dark_&]:shadow-[#64ffda]/20 [.dark_&]:hover:bg-[#8affea]"
              >
                Resume
                <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.a>

              <motion.a
                href="#contact"
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center rounded-full border border-slate-900/15 px-6 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:border-teal-600 hover:text-teal-600 [.dark_&]:border-white/15 [.dark_&]:text-slate-200 [.dark_&]:hover:border-[#64ffda] [.dark_&]:hover:text-[#64ffda]"
              >
                Contact me
              </motion.a>
            </motion.div>
          </div>

          {/* Code card (desktop only) */}
          <motion.div variants={item} className="hidden lg:block">
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              className="rounded-2xl border border-slate-900/10 bg-white/70 p-5 shadow-xl shadow-slate-900/10 backdrop-blur-md [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0d2240]/70 [.dark_&]:shadow-black/40"
            >
              <div className="mb-4 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400" />
                <span className="h-3 w-3 rounded-full bg-amber-400" />
                <span className="h-3 w-3 rounded-full bg-emerald-400" />
              </div>

              <div className="space-y-0.5 font-mono text-[13px] leading-6 text-slate-700 [.dark_&]:text-[#ccd6f6]">
                <p>
                  <span className={kw}>const</span>{' '}
                  <span className={accent}>diksha</span> = {'{'}
                </p>

                <p className="pl-5">
                  role: <span className={str}>{"'Full Stack Developer'"}</span>,
                </p>

                <p className="pl-5">
                  frontend: [
                  <span className={str}>{"'React'"}</span>,{' '}
                  <span className={str}>{"'TypeScript'"}</span>
                  ],
                </p>

                <p className="pl-5">
                  backend: [
                  <span className={str}>{"'Go Lang'"}</span>,{' '}
                  <span className={str}>{"'REST APIs'"}</span>,{' '}
                  <span className={str}>{"'Node.js'"}</span>
                  ],
                </p>

                <p className="pl-5">
                  database: [
                  <span className={str}>{"'MongoDB'"}</span>,{' '}
                  <span className={str}>{"'SQL'"}</span>
                  ],
                </p>

                <p className="pl-5">
                  tools: [
                  <span className={str}>{"'Docker'"}</span>,{' '}
                  <span className={str}>{"'Git'"}</span>,{' '}
                  <span className={str}>{"'Keycloak'"}</span>
                  ],
                </p>

                <p className="pl-5">
                  mindset: <span className={str}>{"'Clean code, performance, security'"}</span>,
                </p>

                <p>{'};'}</p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    </MotionConfig>
  );
};

export default Home;