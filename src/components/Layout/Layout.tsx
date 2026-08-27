import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import ScrollProgress from "../ScrollProgress/ScrollProgress";

gsap.registerPlugin(ScrollTrigger);

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const scrollConfig = {
        trigger: document.body,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
      };

      // Each orb drifts at a different rate for a subtle depth effect.
      gsap.to(orb1Ref.current, { yPercent: 60, ease: "none", scrollTrigger: scrollConfig });
      gsap.to(orb2Ref.current, { yPercent: -40, ease: "none", scrollTrigger: scrollConfig });
      gsap.to(orb3Ref.current, { yPercent: 90, ease: "none", scrollTrigger: scrollConfig });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-dark relative overflow-hidden">
      <ScrollProgress />

      {/* Cosmic Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div ref={orb1Ref} className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl animate-pulse-slow" />
        <div ref={orb2Ref} className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-highlight/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div ref={orb3Ref} className="absolute top-1/2 left-1/2 w-64 h-64 bg-cosmic-pink/5 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '4s' }} />
      </div>

      {/* Fixed Header */}
      <header className="fixed top-0 left-0 w-full z-50">
        <Navbar />
      </header>

      {/* Main Content with padding for fixed header */}
      <main className="flex-1 w-full pt-20 relative z-10">{children}</main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Layout;
