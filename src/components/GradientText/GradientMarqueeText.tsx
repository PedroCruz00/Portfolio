import { motion } from "framer-motion";

type GradientMarqueeTextProps = {
  text: string; // Texto obligatorio (dinámico)
  gradientColors?: string[];
  duration?: number; // Velocidad de animación
  className?: string; // Clases adicionales (ej: tamaño)
};

export default function GradientMarqueeText({
  text,
  gradientColors = ["#FF6D4D", "#FFDE59", "#D9D9D9"], // Tu paleta: acento → highlight → light
  duration = 8,
  className = "",
}: GradientMarqueeTextProps) {
  return (
    <div className="w-full flex items-center overflow-hidden py-6">
      <motion.div
        className={`font-heading font-extrabold whitespace-nowrap tracking-tight ${className}`}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration,
          ease: "linear",
          repeat: Infinity,
        }}
        style={{
          backgroundImage: `linear-gradient(90deg, ${gradientColors.join(
            ", "
          )})`,
          backgroundSize: "200% 100%",
          backgroundClip: "text",
          WebkitBackgroundClip: "text",
          color: "transparent",
        }}
      >
        {text}
      </motion.div>
    </div>
  );
}
