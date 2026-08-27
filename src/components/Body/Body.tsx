import ProjectGrid from "../Projects/ProjectGrid";
import GradientMarqueeText from "../GradientText/GradientMarqueeText";
import TechStack from "../TechStack/TechStack";
import ParticleBackground from "../Particles/ParticleBackground";
import ContactForm from "../Contact/ContactForm";
import Button from "../Button/Button";
import { motion } from "framer-motion";
import { FiChevronDown } from "react-icons/fi";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Body() {
  const heroSectionRef = useRef<HTMLElement>(null);
  const heroContentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      // Fades and lifts the hero content away as it scrolls out of view,
      // giving a "warp" transition into the About section.
      gsap.to(heroContentRef.current, {
        opacity: 0.15,
        y: -80,
        scale: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: heroSectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1,
        },
      });
    }, heroSectionRef);

    return () => ctx.revert();
  }, []);

  const projects = [
    {
      id: 1,
      title: "E-Commerce Platform",
      description:
        "Full-stack e-commerce solution with real-time inventory management, payment integration, and admin dashboard. Built with React, Node.js, and PostgreSQL.",
      imageUrl: "/images/banner.jpg",
      githubUrl: "https://github.com",
      technologies: ["React", "Node.js", "PostgreSQL", "Stripe"],
      featured: true,
    },
    {
      id: 2,
      title: "AI Chat Application",
      description:
        "Real-time chat platform with AI assistance, message encryption, and user authentication. Features WebSocket for instant messaging.",
      imageUrl: "/images/chat-ai.png",
      githubUrl: "https://github.com",
      technologies: ["React", "TypeScript", "WebSocket", "OpenAI API"],
      featured: false,
    },
    {
      id: 3,
      title: "Analytics Dashboard",
      description:
        "Interactive data visualization dashboard with real-time analytics, custom reports, and data export capabilities.",
      imageUrl: "/images/analytics.png",
      githubUrl: "https://github.com",
      technologies: ["React", "D3.js", "MongoDB", "Express"],
      featured: false,
    },
    {
      id: 4,
      title: "Task Management App",
      description:
        "Collaborative task manager with drag-and-drop functionality, team collaboration, and real-time synchronization.",
      imageUrl: "/images/tasks.png",
      githubUrl: "https://github.com",
      technologies: ["React", "Firebase", "Tailwind CSS"],
      featured: false,
    },
  ];

  return (
    <div id="main-content" className="flex flex-col">
      {/* Hero Section */}
      <section
        id="about-me"
        ref={heroSectionRef}
        className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden"
      >
        <ParticleBackground
          particleCount={100}
          connectionDistance={150}
          repelDistance={120}
          repelForce={2.5}
          particleSpeed={0.3}
          particleSize={2}
          opacity={0.9}
          className="z-0"
        />

        <div
          ref={heroContentRef}
          className="relative z-10 max-w-4xl mx-auto px-6 text-center"
        >
          {/* Main Gradient Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <GradientMarqueeText
              text="Hello, I'm Pedro Cruz"
              className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
              gradientColors={["#7c3aed", "#06b6d4", "#ec4899"]}
              duration={7}
            />
          </motion.div>

          {/* Subtitle */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-2xl md:text-3xl text-accent font-semibold mb-6"
          >
            Full Stack Developer & Digital Creative
          </motion.h2>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-light text-lg md:text-xl max-w-2xl mx-auto mb-8 leading-relaxed"
          >
            I craft modern, scalable web applications that combine elegant
            design with powerful functionality. Specialized in React,
            TypeScript, and full-stack development.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <div className="w-full sm:w-auto">
              <Button theme="primary" icon="rocket" href="#contact" className="px-8">
                Start a Project
              </Button>
            </div>

            <div className="w-full sm:w-auto">
              <Button theme="secondary" icon="arrow" href="#projects" className="px-8">
                Explore My Work
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
        >
          <FiChevronDown className="text-highlight text-3xl" />
        </motion.div>
      </section>

      {/* About Section */}
      <section className="py-20 px-6 bg-dark-secondary/30 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="text-gradient-cosmic">Me</span>
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="prose prose-invert max-w-none"
          >
            <p className="text-light text-lg text-center leading-relaxed mb-6">
              With over 5 years of experience in web development, I've worked
              with startups and enterprises to deliver high-impact digital
              solutions. My passion lies in writing clean, maintainable code and
              creating intuitive user experiences.
            </p>
            <p className="text-light text-lg text-center leading-relaxed">
              When I'm not coding, you'll find me contributing to open-source
              projects, exploring new technologies, or sharing knowledge with
              the developer community.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Featured <span className="text-gradient-cosmic">Projects</span>
            </h2>
            <p className="text-light text-lg">
              Showcasing some of my recent work and contributions.
            </p>
          </motion.div>
          <ProjectGrid projects={projects} />
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-20 px-6 bg-dark-secondary/50">
        <TechStack />
      </section>

      {/* Contact Section */}
      <ContactForm />
    </div>
  );
}

export default Body;
