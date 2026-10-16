const socials = [
  { href: 'https://github.com/dikshavishwakarma03', icon: 'fab fa-github', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/diksha-vishwakarma10/', icon: 'fab fa-linkedin', label: 'LinkedIn' },
  { href: 'https://mail.google.com/mail/?view=cm&fs=1&to=vdiksha621@gmail.com', icon: 'fas fa-envelope', label: 'Email' },
];

const LeftSide = () => (
  <div className="fixed bottom-0 left-6 z-30 hidden flex-col items-center gap-5 md:flex">
    {socials.map(({ href, icon, label }, i) => (
      <a
        key={label}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={label}
        style={{ animationDelay: `${1 + i * 0.1}s` }}
        className="animate-fade-up text-xl text-slate-500 transition-all duration-300 hover:-translate-y-1 hover:text-teal-600 motion-reduce:animate-none dark:text-slate-400 dark:hover:text-[#64ffda]"
      >
        <i className={icon} />
      </a>
    ))}
    <span className="h-24 w-px bg-slate-300 dark:bg-slate-600" />
  </div>
);

export default LeftSide;