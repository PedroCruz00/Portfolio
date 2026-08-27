import { motion } from "framer-motion";
import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiPython,
  SiNodedotjs,
  SiMongodb,
  SiMysql,
  SiOracle,
  SiGit,
  SiPostgresql,
  SiTailwindcss,
  SiVite,
  SiDocker,
  SiFigma,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const techCategories = [
  {
    name: "Frontend",
    techs: [
      { name: "React", icon: <SiReact />, color: "text-cyan-400" },
      { name: "TypeScript", icon: <SiTypescript />, color: "text-blue-500" },
      { name: "JavaScript", icon: <SiJavascript />, color: "text-yellow-400" },
      { name: "Tailwind CSS", icon: <SiTailwindcss />, color: "text-cyan-300" },
      { name: "Vite", icon: <SiVite />, color: "text-purple-400" },
    ],
  },
  {
    name: "Backend",
    techs: [
      { name: "Node.js", icon: <SiNodedotjs />, color: "text-green-600" },
      { name: "Python", icon: <SiPython />, color: "text-blue-500" },
      { name: "Java", icon: <FaJava />, color: "text-red-600" },
    ],
  },
  {
    name: "Databases",
    techs: [
      { name: "MongoDB", icon: <SiMongodb />, color: "text-emerald-500" },
      { name: "PostgreSQL", icon: <SiPostgresql />, color: "text-blue-400" },
      { name: "MySQL", icon: <SiMysql />, color: "text-blue-600" },
      { name: "Oracle", icon: <SiOracle />, color: "text-red-500" },
    ],
  },
  {
    name: "Tools & DevOps",
    techs: [
      { name: "Git", icon: <SiGit />, color: "text-orange-500" },
      { name: "Docker", icon: <SiDocker />, color: "text-blue-400" },
      { name: "Figma", icon: <SiFigma />, color: "text-purple-500" },
    ],
  },
];

interface Tech {
  name: string;
  icon: React.ReactNode;
  color: string;
}

interface TechCardProps {
  tech: Tech;
  delay: number;
}

const TechCard = ({ tech, delay }: TechCardProps) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ delay }}
    whileHover={{ y: -8, scale: 1.05 }}
    className="flex flex-col items-center justify-center p-6 rounded-xl bg-gradient-to-br from-dark-secondary/80 to-dark border border-accent/20 hover:border-highlight/50 hover:shadow-lg hover:shadow-accent/30 transition-all duration-300 group backdrop-blur-sm"
  >
    <div
      className={`text-5xl mb-3 ${tech.color} group-hover:scale-110 group-hover:drop-shadow-glow transition-all duration-300`}
    >
      {tech.icon}
    </div>
    <p className="text-sm font-medium text-light text-center">{tech.name}</p>
  </motion.div>
);

export default function TechStack() {
  return (
    <section id="tech-stack" className="w-full py-16 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-gradient-cosmic">Tech</span> Stack
          </h2>
          <p className="text-light text-lg max-w-2xl mx-auto">
            Technologies and tools I use to build scalable, modern applications.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="space-y-12">
          {techCategories.map((category, categoryIndex) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h3 className="text-2xl font-bold text-white mb-6 flex items-center">
                <span className="text-highlight text-3xl mr-3">◆</span>
                {category.name}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                {category.techs.map((tech, index) => (
                  <TechCard
                    key={tech.name}
                    tech={tech}
                    delay={categoryIndex * 0.05 + index * 0.05}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
