import { motion } from "framer-motion";
import ProjectCard from "./ProjectCard";

interface ProjectCardProps {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  githubUrl: string;
  technologies?: string[];
  featured?: boolean;
}

interface ProjectGridProps {
  projects: ProjectCardProps[];
}

const ProjectGrid = ({ projects }: ProjectGridProps) => {
  const featured = projects.find((p: ProjectCardProps) => p.featured);
  const rest = projects.filter((p: ProjectCardProps) => !p.featured);

  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="space-y-8"
    >
      {/* Featured Project */}
      {featured && (
        <div className="mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <ProjectCard {...featured} />
          </motion.div>
        </div>
      )}

      {/* Other Projects Grid */}
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {rest.map((project: ProjectCardProps, index: number) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ProjectCard {...project} />
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default ProjectGrid;
