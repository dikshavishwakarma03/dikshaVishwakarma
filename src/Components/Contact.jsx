import { useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { Github, Linkedin, Instagram, Mail, ArrowUpRight } from 'lucide-react';
import ContactMe from './ContactMe';

/* ---------- shared tokens (same palette as the other sections) ---------- */
const accent = 'text-teal-600 [.dark_&]:text-[#64ffda]';
const heading = 'text-slate-900 [.dark_&]:text-[#ccd6f6]';
const muted = 'text-slate-600 [.dark_&]:text-[#8892b0]';
const hairline = 'border-slate-900/10 [.dark_&]:border-[#64ffda]/15';

/* ---------- content: check these ---------- */
const EMAIL = 'vdiksha621@gmail.com'; 
const channels = [
  { label: 'Email', value: EMAIL, icon: Mail, href: `mailto:${EMAIL}` },
  { label: 'GitHub', value: 'dikshavishwakarma03', icon: Github, href: 'https://github.com/dikshavishwakarma03' },
  { label: 'LinkedIn', value: 'Connect with me', icon: Linkedin, href: 'https://www.linkedin.com/in/diksha-vishwakarma10/' }, // <- add yours
];

const Contact = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <MotionConfig reducedMotion="user">
      <section
        id="contact"
        className="relative isolate overflow-hidden bg-gradient-to-br from-white via-slate-50 to-sky-50 px-6 py-16 md:px-12 [.dark_&]:from-[#0a192f] [.dark_&]:via-[#0d2240] [.dark_&]:to-[#0a192f]"
      >
        {/* Background patches */}
        <motion.div
          aria-hidden
          animate={{ x: [0, 30, -20, 0], y: [0, -40, 20, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -left-24 top-10 -z-10 h-56 w-64 rounded-full bg-teal-300/40 blur-3xl [.dark_&]:bg-[#64ffda]/10"
        />
        <motion.div
          aria-hidden
          animate={{ x: [0, -30, 20, 0], y: [0, 30, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
          className="pointer-events-none absolute -right-20 bottom-0 -z-10 h-64 w-64 rounded-full bg-sky-300/40 blur-3xl [.dark_&]:bg-sky-500/10"
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto max-w-5xl"
        >
          {/* Title */}
          <div className="flex items-center gap-4">
            <h2 className={`text-3xl font-bold tracking-tight sm:text-4xl ${heading}`}>
              Get in <span className={accent}>touch</span>
            </h2>
            <span aria-hidden className={`h-px flex-1 border-t ${hairline}`} />
          </div>

          <div className="mt-8 grid items-stretch gap-6 lg:grid-cols-[1.2fr_0.8fr]">
            {/* Left: message + channels (2 x 2 grid keeps it short) */}
            <div className="flex flex-col justify-between gap-5">
              <p className={`max-w-xl text-sm leading-relaxed sm:text-base ${muted}`}>
                Although I&apos;m currently looking for new opportunities, my inbox is always open.
                Whether you have a question or just want to say hi, I&apos;ll try my best to get back to
                you!
              </p>

              <ul className="grid gap-3 sm:grid-cols-2">
                {channels.map(({ label, value, icon: Icon, href }) => (
                  <li key={label}>
                    <motion.a
                      href={href}
                      target={href.startsWith('mailto:') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      whileHover={{ y: -2 }}
                      className="group flex items-center gap-3 rounded-xl border border-slate-900/10 bg-white/70 px-3 py-2.5 backdrop-blur-md transition-colors hover:border-teal-600/60 [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0d2240]/70 [.dark_&]:hover:border-[#64ffda]/60"
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-teal-600/10 text-teal-600 [.dark_&]:bg-[#64ffda]/10 [.dark_&]:text-[#64ffda]">
                        <Icon size={16} />
                      </span>
                      <span className="min-w-0 flex-1 leading-tight">
                        <span className={`block font-mono text-[10px] uppercase tracking-wider ${muted}`}>{label}</span>
                        <span className={`block truncate text-sm font-semibold ${heading}`}>{value}</span>
                      </span>
                      <ArrowUpRight
                        size={15}
                        className={`shrink-0 ${muted} transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-teal-600 [.dark_&]:group-hover:text-[#64ffda]`}
                      />
                    </motion.a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Right: call to action card */}
            <div className="flex flex-col justify-center rounded-2xl border border-slate-900/10 bg-white/70 p-6 shadow-xl shadow-slate-900/10 backdrop-blur-md [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0d2240]/70 [.dark_&]:shadow-black/40">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs text-emerald-600 [.dark_&]:text-emerald-300">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
                </span>
                Open to opportunities
              </span>

              <h3 className={`mt-4 text-xl font-bold sm:text-2xl ${heading}`}>
                Let&apos;s build something <span className={accent}>together.</span>
              </h3>
              <p className={`mt-2 text-sm leading-relaxed ${muted}`}>
                Send me a message and I&apos;ll get back to you.
              </p>

              <motion.button
                onClick={() => setIsPopupOpen(true)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="mt-5 w-fit rounded-full bg-teal-600 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-colors hover:bg-teal-700 [.dark_&]:bg-[#64ffda] [.dark_&]:text-[#0a192f] [.dark_&]:shadow-[#64ffda]/20 [.dark_&]:hover:bg-[#8affea]"
              >
                Say Hello
              </motion.button>
            </div>
          </div>

          <p className={`mt-10 text-center font-mono text-sm ${muted}`}>
            Designed &amp; built by <span className={accent}>Diksha Vishwakarma</span>
          </p>
        </motion.div>

        {/* Always mounted so the popup's close animation can play */}
        <ContactMe isOpen={isPopupOpen} setIsOpen={setIsPopupOpen} />
      </section>
    </MotionConfig>
  );
};

export default Contact;