import { FiGithub, FiLinkedin, FiMail } from "react-icons/fi";
import { motion } from "framer-motion";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FiGithub />,
      label: "GitHub",
      url: "https://github.com/PedroCruz00",
      aria: "Visit my GitHub",
    },
    {
      icon: <FiLinkedin />,
      label: "LinkedIn",
      url: "https://www.linkedin.com/in/pedro-cruz-037309313",
      aria: "Visit my LinkedIn",
    },
    {
      icon: <FiMail />,
      label: "Email",
      url: "mailto:pedro.cruz.lopez001@gmail.com",
      aria: "Send me an email",
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-dark-secondary/80 border-t border-accent/20 mt-16 backdrop-blur-sm">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="mb-8 md:mb-0"
          >
            <h3 className="text-2xl font-bold text-white mb-2">
              <span className="text-gradient-cosmic">Pedro</span>
              <span className="text-highlight">.</span>
            </h3>
            <p className="text-light text-sm max-w-xs">
              Full Stack Developer passionate about building digital experiences
              that matter.
            </p>
          </motion.div>

          {/* Quick Links */}
          <div className="mb-8 md:mb-0">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-light text-sm">
              <li>
                <a
                  href="#about-me"
                  className="hover:text-accent transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="#projects"
                  className="hover:text-accent transition-colors"
                >
                  Projects
                </a>
              </li>
              <li>
                <a
                  href="#tech-stack"
                  className="hover:text-accent transition-colors"
                >
                  Tech Stack
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Follow</h4>
            <div className="flex gap-4">
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={link.aria}
                  whileHover={{ scale: 1.2, color: "#FF6D4D" }}
                  whileTap={{ scale: 0.95 }}
                  className="text-light text-2xl hover:text-accent transition-colors"
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-accent/10 pt-8 mt-8">
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-light text-sm">
            <p>&copy; {currentYear} Pedro Cruz. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a
                href="#privacy"
                className="hover:text-accent transition-colors"
              >
                Privacy
              </a>
              <a href="#terms" className="hover:text-accent transition-colors">
                Terms
              </a>
              <a
                href="#sitemap"
                className="hover:text-accent transition-colors"
              >
                Sitemap
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
