import { Link } from "react-scroll";
import { motion } from "framer-motion";
import Button from "../Button/Button";
import { useState } from "react";
import { HiMenuAlt3, HiX } from "react-icons/hi";
import avatarUrl from "../../assets/Avatar_wth.svg";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "About", to: "about-me" },
    { label: "Projects", to: "projects" },
    { label: "Tech", to: "tech-stack" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className="relative px-6 py-4 flex justify-between items-center bg-dark/90 backdrop-blur-xl border-b border-accent/20 shadow-cosmic-sm"
    >
      {/* Logo */}
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="flex items-center gap-2 text-white font-bold text-xl tracking-tight cursor-pointer"
      >
        <img src={avatarUrl} alt="Pedro Cruz" className="w-14 h-14" />
        <span className="text-white">pedro.dev</span>
      </motion.div>

      {/* Desktop Nav */}
      <div className="hidden md:flex items-center space-x-1">
        {navItems.map((item) => (
          <Link
            key={item.to}
            to={item.to}
            smooth={true}
            duration={600}
            offset={-80}
          >
            <motion.button
              whileHover={{ color: "#7c3aed" }}
              className="px-4 py-2 text-light hover:text-accent transition-colors cursor-pointer relative group"
            >
              {item.label}
              <span className="absolute bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-accent to-highlight group-hover:w-full transition-all duration-300" />
            </motion.button>
          </Link>
        ))}
      </div>

      {/* CTA Button Desktop */}
      <div className="hidden md:block">
        <Button
          theme="primary"
          icon="rocket"
          href="#contact"
          className="text-sm"
        >
          Contact
        </Button>
      </div>

      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="md:hidden text-light text-2xl"
      >
        {isOpen ? <HiX /> : <HiMenuAlt3 />}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-dark-secondary border-b border-accent/20 md:hidden flex flex-col space-y-3 p-6"
        >
          {navItems.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              smooth={true}
              duration={600}
              offset={-80}
            >
              <motion.button
                whileHover={{ color: "#FF6D4D" }}
                onClick={() => setIsOpen(false)}
                className="w-full text-left text-light hover:text-accent transition-colors cursor-pointer pb-2"
              >
                {item.label}
              </motion.button>
            </Link>
          ))}
          <Button
            theme="primary"
            icon="rocket"
            href="#contact"
            className="w-full text-sm"
          >
            Contact
          </Button>
        </motion.div>
      )}
    </motion.nav>
  );
}
