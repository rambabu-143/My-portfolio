'use client';
import { motion } from "framer-motion";

const socials = [
  { platform: "LinkedIn", handle: "rambabuarabandi", href: "https://www.linkedin.com/in/rambabuarabandi" },
  { platform: "GitHub", handle: "rambabu-143", href: "https://github.com/rambabu-143" },
  { platform: "X (Twitter)", handle: "@rambabu_143", href: "https://x.com/rambabu_143" },
];

const EMAIL = "rambabuarabandi2001@gmail.com";

const Contact = () => {
  return (
    <div className="w-full glass rounded-2xl p-10 sm:p-16 text-center">
      <p className="eyebrow mb-6">Contact</p>
      <h2 className="font-display font-semibold text-3xl sm:text-5xl mb-6 max-w-2xl mx-auto leading-tight">
        Open to AI Engineer roles. Let&apos;s talk.
      </h2>
      <p className="text-muted-foreground max-w-lg mx-auto mb-10">
        Based in Hyderabad, India. The fastest way to reach me is email, and I&apos;m also active on LinkedIn and GitHub.
      </p>

      <motion.a
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        href={`mailto:${EMAIL}`}
        className="btn-primary !px-8 !py-4 text-base mb-10"
      >
        {EMAIL}
      </motion.a>

      <div className="flex items-center justify-center gap-6">
        {socials.map((social) => (
          <a
            key={social.platform}
            href={social.href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground link-underline"
          >
            {social.platform}
          </a>
        ))}
      </div>
    </div>
  );
};

export default Contact;
