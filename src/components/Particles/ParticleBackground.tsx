import { useEffect, useRef, useState } from "react";

interface ParticleBackgroundProps {
  particleCount?: number;
  connectionDistance?: number;
  repelDistance?: number;
  repelForce?: number;
  particleSpeed?: number;
  particleSize?: number;
  className?: string;
  opacity?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  originalVx: number;
  originalVy: number;
  size: number;
  update(width: number, height: number, mouse: Mouse): void;
  draw(ctx: CanvasRenderingContext2D): void;
}

interface Mouse {
  x: number;
  y: number;
  isActive: boolean;
}

const ParticleBackground = ({
  particleCount = 80,
  connectionDistance = 120,
  repelDistance = 100,
  repelForce = 2,
  particleSpeed = 0.5,
  particleSize = 2,
  className = "",
  opacity = 0.8,
}: ParticleBackgroundProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number | null>(null);
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Mouse>({ x: 0, y: 0, isActive: false });
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  // Clase para las partículas
  class ParticleClass implements Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    originalVx: number;
    originalVy: number;
    size: number;

    constructor(width: number, height: number) {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.vx = (Math.random() - 0.5) * particleSpeed;
      this.vy = (Math.random() - 0.5) * particleSpeed;
      this.originalVx = this.vx;
      this.originalVy = this.vy;
      this.size = particleSize + Math.random() * 2;
    }

    update(width: number, height: number, mouse: Mouse) {
      // Calcular distancia al mouse
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Repulsión del mouse
      if (mouse.isActive && distance < repelDistance) {
        const angle = Math.atan2(dy, dx);
        const force = ((repelDistance - distance) / repelDistance) * repelForce;
        this.vx = this.originalVx + Math.cos(angle) * force;
        this.vy = this.originalVy + Math.sin(angle) * force;
      } else {
        // Volver gradualmente a la velocidad original
        this.vx += (this.originalVx - this.vx) * 0.02;
        this.vy += (this.originalVy - this.vy) * 0.02;
      }

      // Actualizar posición
      this.x += this.vx;
      this.y += this.vy;

      // Rebote en bordes
      if (this.x < 0 || this.x > width) {
        this.vx *= -1;
        this.originalVx *= -1;
        this.x = Math.max(0, Math.min(width, this.x));
      }
      if (this.y < 0 || this.y > height) {
        this.vy *= -1;
        this.originalVy *= -1;
        this.y = Math.max(0, Math.min(height, this.y));
      }
    }

    draw(ctx: CanvasRenderingContext2D): void {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      // Cosmic colors - random between purple, cyan, and white
      const colors = [
        `rgba(124, 58, 237, ${opacity})`,   // purple
        `rgba(6, 182, 212, ${opacity})`,    // cyan
        `rgba(236, 72, 153, ${opacity * 0.8})`, // pink
        `rgba(255, 255, 255, ${opacity * 0.6})`, // white
      ];
      const colorIndex = Math.floor(this.x + this.y) % colors.length;
      ctx.fillStyle = colors[colorIndex];
      ctx.fill();
    }
  }

  // Inicializar partículas
  const initParticles = (width: number, height: number): void => {
    particlesRef.current = [];
    for (let i = 0; i < particleCount; i++) {
      particlesRef.current.push(new ParticleClass(width, height));
    }
  };

  // Dibujar conexiones entre partículas
  const drawConnections = (ctx: CanvasRenderingContext2D): void => {
    const particles = particlesRef.current;

    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < connectionDistance) {
          const opacity_connection =
            Math.max(0, 1 - distance / connectionDistance) * opacity * 0.5;

          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);

          // Gradiente de color cosmic
          const gradient = ctx.createLinearGradient(
            particles[i].x,
            particles[i].y,
            particles[j].x,
            particles[j].y
          );
          gradient.addColorStop(0, `rgba(124, 58, 237, ${opacity_connection})`);
          gradient.addColorStop(
            0.5,
            `rgba(6, 182, 212, ${opacity_connection * 0.8})`
          );
          gradient.addColorStop(
            1,
            `rgba(236, 72, 153, ${opacity_connection})`
          );

          ctx.strokeStyle = gradient;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }
    }
  };

  // Función de animación
  const animate = (): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const { width, height } = canvas;

    // Limpiar canvas
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);

    // Actualizar y dibujar partículas
    particlesRef.current.forEach((particle) => {
      particle.update(width, height, mouseRef.current);
      particle.draw(ctx);
    });

    // Dibujar conexiones
    drawConnections(ctx);

    animationRef.current = requestAnimationFrame(animate);
  };

  // Manejo del resize
  const handleResize = (): void => {
    const canvas = canvasRef.current;
    if (!canvas || !canvas.parentElement) return;

    const rect = canvas.parentElement.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    canvas.width = width * window.devicePixelRatio;
    canvas.height = height * window.devicePixelRatio;
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    }

    setDimensions({ width, height });
  };

  // Manejo del mouse
  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>): void => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    mouseRef.current.x = e.clientX - rect.left;
    mouseRef.current.y = e.clientY - rect.top;
    mouseRef.current.isActive = true;
  };

  const handleMouseLeave = () => {
    mouseRef.current.isActive = false;
  };

  // Effects
  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (dimensions.width && dimensions.height) {
      initParticles(dimensions.width, dimensions.height);
      animate();
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [
    dimensions,
    particleCount,
    connectionDistance,
    repelDistance,
    particleSpeed,
  ]);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      <canvas
        ref={canvasRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="block w-full h-full"
        style={{
          background: "transparent",
        }}
      />
    </div>
  );
};

export default ParticleBackground;
