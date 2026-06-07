'use client';
import { motion } from "framer-motion";

const socials = [
  {
    platform: "LinkedIn",
    handle: "rambabuarabandi",
    description: "Professional updates & AI insights",
    href: "https://www.linkedin.com/in/rambabuarabandi",
    colorClasses: {
      card: "border-white/8 hover:border-white/25 hover:bg-white/4",
      icon: "bg-white/8 text-white/60 group-hover:bg-white/12",
      label: "text-white/50",
      handle: "group-hover:text-white",
    },
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    platform: "GitHub",
    handle: "rambabu-143",
    description: "Projects, code & open source work",
    href: "https://github.com/rambabu-143",
    colorClasses: {
      card: "border-white/8 hover:border-white/25 hover:bg-white/4",
      icon: "bg-white/8 text-white/60 group-hover:bg-white/12",
      label: "text-white/50",
      handle: "group-hover:text-white",
    },
    icon: (
      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    platform: "X (Twitter)",
    handle: "@rambabu_143",
    description: "Thoughts on AI, building in public",
    href: "https://x.com/rambabu_143",
    colorClasses: {
      card: "border-white/8 hover:border-white/25 hover:bg-white/4",
      icon: "bg-white/8 text-white/60 group-hover:bg-white/12",
      label: "text-white/50",
      handle: "group-hover:text-white",
    },
    icon: (
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.737-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    platform: "Email",
    handle: "rambabuarabandi2001@gmail.com",
    description: "For collaborations & opportunities",
    href: "mailto:rambabuarabandi2001@gmail.com",
    colorClasses: {
      card: "border-white/8 hover:border-white/25 hover:bg-white/4",
      icon: "bg-white/8 text-white/60 group-hover:bg-white/12",
      label: "text-white/50",
      handle: "group-hover:text-white",
    },
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    ),
  },
];

const Connect = () => {
  return (
    <div className="w-full py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.5 }}
        className="text-center mb-14"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
          Let&apos;s Connect
        </h2>
        <p className="text-white/50 max-w-xl mx-auto">
          No forms. Just find me where I&apos;m actually active.
        </p>
      </motion.div>

      <div className="max-w-3xl mx-auto grid sm:grid-cols-2 gap-4">
        {socials.map((social, index) => (
          <motion.a
            key={social.platform}
            href={social.href}
            target={social.href.startsWith("mailto") ? "_self" : "_blank"}
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-30px" }}
            transition={{ delay: index * 0.07, duration: 0.4 }}
            whileHover={{ y: -4 }}
            className={`group glass rounded-2xl p-6 border flex items-center gap-5 transition-all duration-300 ${social.colorClasses.card}`}
          >
            <div className={`w-14 h-14 shrink-0 rounded-xl flex items-center justify-center transition-colors duration-300 ${social.colorClasses.icon}`}>
              {social.icon}
            </div>
            <div className="min-w-0 flex-1">
              <p className={`text-xs font-semibold uppercase tracking-wider mb-0.5 ${social.colorClasses.label}`}>
                {social.platform}
              </p>
              <p className={`text-white font-medium truncate transition-colors duration-200 ${social.colorClasses.handle}`}>
                {social.handle}
              </p>
              <p className="text-white/30 text-xs mt-0.5">{social.description}</p>
            </div>
            <svg
              className="w-4 h-4 text-gray-600 group-hover:text-gray-400 shrink-0 transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              fill="none" stroke="currentColor" viewBox="0 0 24 24"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </motion.a>
        ))}
      </div>
    </div>
  );
};

export default Connect;
