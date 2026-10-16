import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, MotionConfig } from 'framer-motion';
import { Send, X, Check, Mail, Github, Linkedin } from 'lucide-react';

const ACCESS_KEY = 'a72bce3a-292e-46e5-8b06-cf75bb2daf19';
const MAX_CHARS = 500;

/* ---------- content: check these ---------- */
const EMAIL = 'vdiksha621@gmail.com'; // <- confirm this is correct
const socials = [
  { label: 'GitHub', icon: Github, href: 'https://github.com/dikshavishwakarma03' },
  { label: 'LinkedIn', icon: Linkedin, href: 'https://www.linkedin.com/in/your-profile' }, // <- add yours
];

/* ---------- shared tokens (same palette as the rest of the site) ---------- */
const accent = 'text-teal-600 [.dark_&]:text-[#64ffda]';
const heading = 'text-slate-900 [.dark_&]:text-[#ccd6f6]';
const muted = 'text-slate-600 [.dark_&]:text-[#8892b0]';
const field =
  'w-full rounded-lg border border-slate-900/15 bg-white px-3.5 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 outline-none transition focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0a192f] [.dark_&]:text-[#ccd6f6] [.dark_&]:placeholder:text-[#8892b0]/70 [.dark_&]:focus:border-[#64ffda] [.dark_&]:focus:ring-[#64ffda]/20';

const ContactMe = ({ isOpen, setIsOpen }) => {
  const [status, setStatus] = useState('idle'); // idle | sending | success | error
  const [error, setError] = useState('');
  const [count, setCount] = useState(0);
  const firstRef = useRef(null);
  const closeTimer = useRef(null);

  const close = () => setIsOpen(false);

  useEffect(() => {
    if (isOpen) {
      setStatus('idle');
      setError('');
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const onKey = (e) => e.key === 'Escape' && setIsOpen(false);
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    firstRef.current?.focus();
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [isOpen, setIsOpen]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const onSubmit = async (e) => {
    e.preventDefault();
    setStatus('sending');
    setError('');

    try {
      const formData = new FormData(e.currentTarget);
      formData.append('access_key', ACCESS_KEY);
      formData.append('subject', 'New message from your portfolio');

      const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: formData });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        setCount(0);
        closeTimer.current = setTimeout(close, 2200);
      } else {
        setStatus('error');
        setError(data.message || 'Something went wrong. Please try again.');
      }
    } catch {
      setStatus('error');
      setError('Network error. Please check your connection and try again.');
    }
  };

  const sending = status === 'sending';

  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={(e) => e.target === e.currentTarget && close()}
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-sm"
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-labelledby="contact-title"
              initial={{ scale: 0.95, opacity: 0, y: 12 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 12 }}
              transition={{ type: 'spring', stiffness: 300, damping: 26 }}
              className="relative grid max-h-[90vh] w-full max-w-3xl overflow-hidden overflow-y-auto rounded-2xl border border-slate-900/10 bg-white shadow-2xl shadow-slate-900/20 md:grid-cols-[0.85fr_1.15fr] [.dark_&]:border-[#64ffda]/15 [.dark_&]:bg-[#0d2240] [.dark_&]:shadow-black/50"
            >
              {/* Left: info panel */}
              <div className="relative flex flex-col justify-between gap-6 bg-gradient-to-br from-teal-600 to-sky-600 p-6 text-white sm:p-8 [.dark_&]:from-[#112a4d] [.dark_&]:to-[#0a192f]">
                <div>
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 font-mono text-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-300 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-300" />
                    </span>
                    Open to opportunities
                  </span>

                  <h2 id="contact-title" className="mt-5 text-3xl font-bold leading-tight">
                    Let&apos;s <span className="[.dark_&]:text-[#64ffda]">talk.</span>
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-white/85 [.dark_&]:text-[#8892b0]">
                    Have a question or an opportunity in mind? Send me a message and I&apos;ll reply as soon
                    as I can.
                  </p>
                </div>

                <div className="space-y-3 text-sm">
                  <a
                    href={`mailto:${EMAIL}`}
                    className="flex items-center gap-2 break-all text-white/90 transition-colors hover:text-white [.dark_&]:hover:text-[#64ffda]"
                  >
                    <Mail size={16} className="shrink-0" /> {EMAIL}
                  </a>
                  <div className="flex items-center gap-3">
                    {socials.map(({ label, icon: Icon, href }) => (
                      <a
                        key={label}
                        href={href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="grid h-9 w-9 place-items-center rounded-full border border-white/25 transition-colors hover:bg-white/15 [.dark_&]:hover:border-[#64ffda] [.dark_&]:hover:text-[#64ffda]"
                      >
                        <Icon size={16} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right: form */}
              <div className="relative p-6 sm:p-8">
                <motion.button
                  whileHover={{ rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={close}
                  aria-label="Close"
                  className={`absolute right-4 top-4 rounded-full p-1.5 ${muted} transition-colors hover:text-teal-600 [.dark_&]:hover:text-[#64ffda]`}
                >
                  <X size={20} />
                </motion.button>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      className="flex h-full min-h-[18rem] flex-col items-center justify-center text-center"
                    >
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 16, delay: 0.1 }}
                        className="grid h-16 w-16 place-items-center rounded-full bg-emerald-500/15 text-emerald-600 [.dark_&]:text-emerald-300"
                      >
                        <Check size={34} strokeWidth={3} />
                      </motion.span>
                      <h3 className={`mt-5 text-2xl font-bold ${heading}`}>Thank you for reaching out!</h3>
                      <p className={`mt-2 text-sm ${muted}`}>I&apos;ll get back to you soon.</p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      onSubmit={onSubmit}
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="space-y-4 pt-4 md:pt-0"
                    >
                      <h3 className={`text-xl font-bold ${heading}`}>
                        Send a <span className={accent}>message</span>
                      </h3>

                      <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

                      <div>
                        <label htmlFor="cm-name" className={`mb-1.5 block font-mono text-xs ${muted}`}>
                          Name
                        </label>
                        <input
                          ref={firstRef}
                          id="cm-name"
                          name="name"
                          type="text"
                          placeholder="Your name"
                          autoComplete="name"
                          required
                          className={field}
                        />
                      </div>

                      <div>
                        <label htmlFor="cm-email" className={`mb-1.5 block font-mono text-xs ${muted}`}>
                          Email
                        </label>
                        <input
                          id="cm-email"
                          name="email"
                          type="email"
                          placeholder="you@example.com"
                          autoComplete="email"
                          required
                          className={field}
                        />
                      </div>

                      <div>
                        <div className="mb-1.5 flex items-center justify-between">
                          <label htmlFor="cm-message" className={`font-mono text-xs ${muted}`}>
                            Message
                          </label>
                          <span className={`font-mono text-[11px] ${muted}`}>
                            {count}/{MAX_CHARS}
                          </span>
                        </div>
                        <textarea
                          id="cm-message"
                          name="message"
                          rows={5}
                          maxLength={MAX_CHARS}
                          onChange={(e) => setCount(e.target.value.length)}
                          placeholder="Tell me a little about what you have in mind..."
                          required
                          className={`${field} resize-none`}
                        />
                      </div>

                      <motion.button
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        type="submit"
                        disabled={sending}
                        className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/25 transition-colors hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-70 [.dark_&]:bg-[#64ffda] [.dark_&]:text-[#0a192f] [.dark_&]:shadow-[#64ffda]/20 [.dark_&]:hover:bg-[#8affea]"
                      >
                        {sending ? (
                          <>
                            <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={16} /> Send message
                          </>
                        )}
                      </motion.button>

                      <p aria-live="polite" className="min-h-[1.25rem] text-center text-sm text-red-600 [.dark_&]:text-red-400">
                        {status === 'error' ? error : ''}
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </MotionConfig>
  );
};

export default ContactMe;