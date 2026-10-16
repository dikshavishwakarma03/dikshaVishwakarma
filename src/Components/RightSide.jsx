const EMAIL = 'vdiksha621@gmail.com';

const RightSide = () => (
  <div className="fixed bottom-0 right-6 z-30 hidden flex-col items-center gap-5 md:flex">
    <a
      href={`https://mail.google.com/mail/?view=cm&fs=1&to=${EMAIL}`}
      target="_blank"
      rel="noopener noreferrer"
      className="animate-fade-up font-mono text-xs tracking-widest text-slate-500 transition-all duration-300 [animation-delay:1.3s] [writing-mode:vertical-rl] hover:-translate-y-1 hover:text-teal-600 motion-reduce:animate-none dark:text-slate-400 dark:hover:text-[#64ffda]"
    >
      {EMAIL}
    </a>
    <span className="h-24 w-px bg-slate-300 dark:bg-slate-600" />
  </div>
);

export default RightSide;