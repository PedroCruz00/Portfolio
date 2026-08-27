import { motion } from "framer-motion";
import Button from "../Button/Button";
import { FiGithub } from "react-icons/fi";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiPostgresql,
  SiTailwindcss,
  SiVite,
  SiDocker,
  SiFigma,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

interface ProjectCardProps {
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  technologies?: string[];
  featured?: boolean;
}

const techIcons: Record<string, { icon: React.ReactNode; color: string }> = {
  React: { icon: <SiReact />, color: "text-cyan-400" },
  TypeScript: { icon: <SiTypescript />, color: "text-blue-500" },
  JavaScript: { icon: <SiJavascript />, color: "text-yellow-400" },
  Python: { icon: <SiPython />, color: "text-blue-500" },
  "Node.js": { icon: <SiNodedotjs />, color: "text-green-600" },
  MongoDB: { icon: <SiMongodb />, color: "text-emerald-500" },
  MySQL: { icon: <SiMysql />, color: "text-blue-600" },
  PostgreSQL: { icon: <SiPostgresql />, color: "text-blue-400" },
  "Tailwind CSS": { icon: <SiTailwindcss />, color: "text-cyan-300" },
  Vite: { icon: <SiVite />, color: "text-purple-400" },
  Docker: { icon: <SiDocker />, color: "text-blue-400" },
  Figma: { icon: <SiFigma />, color: "text-purple-500" },
  Java: { icon: <FaJava />, color: "text-red-600" },
};

const ProjectCard = ({
  title,
  description,
  imageUrl,
  githubUrl,
  technologies = [],
  featured = false,
}: ProjectCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className={`group relative overflow-hidden rounded-xl shadow-lg hover:shadow-cosmic transition-all duration-300 flex flex-col h-full ${
        featured ? "border-2 border-highlight" : "border border-accent/20"
      }`}
    >
      {/* Animated Background Glow */}
      <motion.div
        animate={{
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
        className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-highlight/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
      />
      {/* Animated Border Glow */}
      <motion.div
        animate={{
          boxShadow: [
            "inset 0 0 0px rgba(var(--accent-rgb), 0)",
            "inset 0 0 30px rgba(var(--accent-rgb), 0.4)",
            "inset 0 0 0px rgba(var(--accent-rgb), 0)",
          ],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="absolute inset-0 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-500 rounded-xl"
      />

      {/* Imagen con Overlay */}
      <div className="relative h-48 overflow-hidden bg-dark-secondary">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />

        {/* Overlay con efecto */}
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge si es destacado */}
        {featured && (
          <div className="absolute top-3 right-3 bg-accent text-dark-secondary px-3 py-1 rounded-full text-xs font-bold">
            Destacado
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6 flex flex-col flex-1 bg-dark-secondary">
        <h3 className="text-xl font-bold mb-2 text-white group-hover:text-accent transition-colors">
          {title}
        </h3>
        <p className="text-light text-sm mb-4 flex-1 leading-relaxed">
          {description}
        </p>

        {/* Tech Stack - Solo Iconos */}
        {technologies && technologies.length > 0 && (
          <div className="mb-4 flex gap-1.5 flex-wrap">
            {technologies.map((tech: string) => {
              const techInfo = techIcons[tech];
              return (
                <motion.div
                  key={tech}
                  whileHover={{ scale: 1.15 }}
                  className="relative group"
                  title={tech}
                >
                  <div
                    className={`text-sm ${
                      techInfo?.color || "text-light"
                    } hover:scale-110 transition-transform`}
                  >
                    {techInfo?.icon || "•"}
                  </div>
                  {/* Tooltip */}
                  <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-dark border border-accent/50 rounded text-xs text-light whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                    {tech}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

        {/* Botones */}
        <div className="mt-auto flex gap-3">
          <Button
            theme="outline"
            icon="external"
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 text-sm"
          >
            <FiGithub className="text-lg" />
            View Project
          </Button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
