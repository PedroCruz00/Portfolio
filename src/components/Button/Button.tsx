import React from "react";
import { motion } from "framer-motion";
import { FiArrowRight, FiExternalLink } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  className?: string;
  theme?: "primary" | "secondary" | "outline";
  icon?: "rocket" | "arrow" | "external";
  href?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
}

const icons = {
  rocket: FaRocket,
  arrow: FiArrowRight,
  external: FiExternalLink,
};

// Icons animate together with the button on hover via framer-motion variant
// propagation, so each icon gets a motion that fits what it represents.
const iconVariants = {
  rocket: {
    rest: { x: 0, y: 0, rotate: 0 },
    hover: { x: 3, y: -4, rotate: -25 },
  },
  arrow: {
    rest: { x: 0 },
    hover: { x: 4 },
  },
  external: {
    rest: { x: 0, y: 0 },
    hover: { x: 3, y: -3 },
  },
};

const wrapperVariants = {
  rest: { y: 0 },
  hover: { y: -2 },
};

function Button({
  children,
  onClick,
  type = "button",
  className = "",
  theme = "secondary",
  icon,
  href,
  target,
  rel,
  disabled = false,
}: ButtonProps) {
  const baseClasses =
    "px-6 py-3 rounded-lg font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2";

  const themeClasses = {
    primary:
      "bg-accent text-white border-2 border-transparent hover:bg-accent-hover hover:shadow-cosmic-sm",
    secondary:
      "bg-white/5 backdrop-blur-sm border-2 border-light/20 text-light hover:border-highlight/60 hover:text-white hover:bg-white/10",
    outline:
      "bg-transparent border-2 border-accent/60 text-accent hover:border-accent hover:bg-accent hover:text-dark hover:shadow-cosmic-sm",
  };

  const sharedClassName = `${baseClasses} ${themeClasses[theme]} ${className} ${
    disabled ? "opacity-50 cursor-not-allowed" : ""
  }`;

  const Icon = icon ? icons[icon] : null;

  const content = (
    <>
      {children}
      {Icon && (
        <motion.span
          variants={iconVariants[icon!]}
          transition={{ type: "spring", stiffness: 300, damping: 15 }}
          className="inline-flex"
        >
          <Icon className="text-base" />
        </motion.span>
      )}
    </>
  );

  return (
    <motion.div
      variants={wrapperVariants}
      initial="rest"
      whileHover="hover"
      whileTap={{ scale: 0.98 }}
      className="w-full"
    >
      {href ? (
        <a href={href} target={target} rel={rel} className={sharedClassName}>
          {content}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          disabled={disabled}
          className={sharedClassName}
        >
          {content}
        </button>
      )}
    </motion.div>
  );
}

export default Button;
