import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useSpring } from "motion/react";
import { Star, Sparkles, Flame, Sparkle } from "lucide-react";

interface Particle {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  rotationSpeed: number;
  opacity: number;
}

export default function StarCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const particleIdRef = useRef(0);

  // Smooth springs for tracking the primary cursor
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 280, mass: 0.5 };
  const trailConfig = { damping: 15, stiffness: 120, mass: 0.8 };

  const cursorSpringX = useSpring(cursorX, springConfig);
  const cursorSpringY = useSpring(cursorY, springConfig);

  // Smooth springs for the trailing star (creates a double dual-layered star effect)
  const trailSpringX = useSpring(cursorX, trailConfig);
  const trailSpringY = useSpring(cursorY, trailConfig);

  useEffect(() => {
    // Only enable custom cursor for desktops / fine pointers
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    // Add CSS class to body to hide standard hardware pointer
    document.body.classList.add("custom-cursor-enabled");

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Subtle chance to spawn trailing neon dust when moving rapidly
      if (Math.random() < 0.22) {
        spawnParticle(e.clientX, e.clientY, "move");
      }
    };

    const handlePointerOver = (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Detect if hover target is interactive
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.tagName === "INPUT" ||
        target.tagName === "SELECT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("button") ||
        target.closest("a") ||
        target.closest(".cursor-pointer") ||
        target.classList.contains("cursor-pointer") ||
        target.getAttribute("role") === "button" ||
        window.getComputedStyle(target).cursor === "pointer";

      setIsHovered(!!isInteractive);
    };

    const handleMouseDown = (e: MouseEvent) => {
      setIsPressed(true);
      // Explode beautiful multi-color particles upon clicking
      spawnClickExplosion(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsPressed(false);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseover", handlePointerOver);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseover", handlePointerOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [cursorX, cursorY, isVisible]);

  // Particle Engine loop for animating explosion dust
  useEffect(() => {
    if (particles.length === 0) return;

    let animId: number;
    const updateTick = () => {
      setParticles((prev) =>
        prev
          .map((p) => ({
            ...p,
            x: p.x + p.vx,
            y: p.y + p.vy,
            vy: p.vy + 0.1, // Slight gravity pull
            opacity: p.opacity - 0.024,
            rotation: p.rotation + p.rotationSpeed
          }))
          .filter((p) => p.opacity > 0)
      );
      animId = requestAnimationFrame(updateTick);
    };

    animId = requestAnimationFrame(updateTick);
    return () => cancelAnimationFrame(animId);
  }, [particles]);

  const spawnParticle = (x: number, y: number, type: "click" | "move") => {
    particleIdRef.current += 1;
    const colors = ["#00f3ff", "#fe00fe", "#00ff41", "#ffabf3", "#ffd7f5"];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];

    const angle = Math.random() * Math.PI * 2;
    const speed = type === "click" ? Math.random() * 4 + 2 : Math.random() * 0.8 + 0.2;

    const newParticle: Particle = {
      id: particleIdRef.current,
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - (type === "click" ? 1.5 : 0),
      size: type === "click" ? Math.random() * 12 + 6 : Math.random() * 6 + 3,
      color: randomColor,
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() * 10 - 5) * (type === "click" ? 2 : 0.5),
      opacity: 1
    };

    setParticles((prev) => [...prev.slice(-40), newParticle]);
  };

  const spawnClickExplosion = (x: number, y: number) => {
    for (let i = 0; i < 12; i++) {
      spawnParticle(x, y, "click");
    }
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Global CSS bypass injection to hide normal hardware pointer inside viewport */}
      <style>{`
        @media (pointer: fine) {
          body.custom-cursor-enabled,
          body.custom-cursor-enabled * {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Particles canvas-free overlay */}
      <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            style={{
              position: "absolute",
              left: p.x,
              top: p.y,
              width: p.size,
              height: p.size,
              transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
              opacity: p.opacity,
              color: p.color,
            }}
            className="flex items-center justify-center drop-shadow-[0_0_8px_currentColor]"
          >
            {p.size > 10 ? (
              <Star className="w-full h-full fill-current" />
            ) : p.size > 6 ? (
              <Sparkle className="w-full h-full fill-current" />
            ) : (
              <div 
                className="w-1.5 h-1.5 rounded-full" 
                style={{ backgroundColor: p.color }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Trailing Soft Star (Inertia star) */}
      <motion.div
        style={{
          x: trailSpringX,
          y: trailSpringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
        }}
        className="fixed z-[9998] hidden md:block"
        animate={{
          scale: isHovered ? [1.2, 1.4, 1.2] : 1,
          rotate: isHovered ? -360 : 360,
        }}
        transition={{
          rotate: {
            repeat: Infinity,
            duration: isHovered ? 4 : 20,
            ease: "linear",
          },
          scale: {
            repeat: isHovered ? Infinity : 0,
            duration: 1.5,
            ease: "easeInOut",
          }
        }}
      >
        <div 
          className={`transition-colors duration-200 ${
            isHovered ? "text-secondary opacity-80" : "text-primary-container/40"
          } drop-shadow-[0_0_12px_currentColor]`}
        >
          <Sparkles className="w-5 h-5" />
        </div>
      </motion.div>

      {/* Core Star Cursor Component */}
      <motion.div
        style={{
          x: cursorSpringX,
          y: cursorSpringY,
          translateX: "-50%",
          translateY: "-50%",
          pointerEvents: "none",
        }}
        className="fixed z-[9999] hidden md:block"
        animate={{
          scale: isPressed ? 0.82 : isHovered ? 1.45 : 1,
          rotate: isHovered ? 360 : 0,
        }}
        transition={{
          scale: { type: "spring", stiffness: 400, damping: 20 },
          rotate: {
            repeat: isHovered ? Infinity : 0,
            duration: 3,
            ease: "linear",
          }
        }}
      >
        <div 
          className={`flex items-center justify-center transition-colors duration-200 ${
            isHovered 
              ? "text-primary-container fill-primary-container" 
              : "text-secondary fill-secondary/20"
          } drop-shadow-[0_0_10px_currentColor]`}
        >
          {isHovered ? (
            <Star className="w-6 h-6 animate-pulse" />
          ) : (
            <Star className="w-5 h-5 transition-transform" />
          )}
        </div>
      </motion.div>
    </>
  );
}
