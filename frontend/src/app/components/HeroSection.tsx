import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState, useEffect } from "react";
import { Volume2, VolumeX, ChevronDown } from "lucide-react";

export function HeroSection() {
  const [soundEnabled, setSoundEnabled] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const bottleScale = useTransform(scrollYProgress, [0, 1], [1, 1.5]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);

  return (
    <div ref={containerRef} className="relative h-screen overflow-hidden">
      {/* Animated Background - Dark aqua gradient */}
      <motion.div 
        style={{ y: backgroundY }}
        className="absolute inset-0 bg-gradient-to-br from-[#0A2540] via-[#0c3557] to-[#0A2540]"
      >
        {/* Animated waves */}
        <div className="absolute inset-0 opacity-20">
          <motion.div
            animate={{
              backgroundPosition: ['0% 0%', '100% 100%'],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: 'reverse',
            }}
            className="absolute inset-0"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 50 Q 25 30, 50 50 T 100 50' stroke='%230EA5E9' stroke-width='0.5' fill='none' opacity='0.3'/%3E%3C/svg%3E")`,
              backgroundSize: '100px 100px',
            }}
          />
        </div>
      </motion.div>

      {/* Floating water droplets */}
      {[...Array(12)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1.5 h-1.5 bg-cyan-300/60 rounded-full blur-[1px]"
          initial={{ 
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000, 
            y: -20,
            opacity: 0.6 
          }}
          animate={{
            y: typeof window !== 'undefined' ? window.innerHeight + 20 : 800,
            x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : Math.random() * 1000,
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
          }}
        />
      ))}

      {/* Sound toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="absolute top-8 right-8 z-50 p-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300"
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-white" />
        ) : (
          <VolumeX className="w-5 h-5 text-white" />
        )}
      </button>

      {/* Main content */}
      <motion.div 
        style={{ opacity }}
        className="relative z-10 h-full flex flex-col items-center justify-center px-6 py-12"
      >
        {/* Large center-focused hyper-realistic 3D bottle */}
        <motion.div
          style={{ 
            scale: bottleScale,
          }}
          className="relative mb-8 max-w-full overflow-visible"
        >
          {/* Soft glow around bottle */}
          <div className="absolute inset-0 bg-cyan-400/30 blur-[80px] scale-150" />
          
          {/* Studio lighting effect */}
          <div className="absolute -top-20 -left-20 w-40 h-40 bg-white/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -right-20 w-40 h-40 bg-cyan-400/30 rounded-full blur-3xl" />

          {/* Realistic 3D Bottle with smooth 360° rotation */}
          <motion.div
            animate={{
              rotateY: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
            className="relative flex items-center justify-center"
            style={{
              transformStyle: 'preserve-3d',
            }}
          >
            <div className="scale-75 md:scale-90 lg:scale-100">
              <RealisticLifeeBottle />
            </div>
          </motion.div>

          {/* Water droplets falling from bottle */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-3 bg-gradient-to-b from-cyan-200/80 to-cyan-300/60 rounded-full blur-[0.5px]"
              style={{
                left: `${30 + i * 10}%`,
                top: '85%',
              }}
              animate={{
                y: [0, 100],
                opacity: [0.8, 0],
                scaleY: [1, 1.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeIn",
              }}
            />
          ))}
        </motion.div>

        {/* Premium Copy */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 1 }}
          className="text-center max-w-4xl space-y-6"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold text-white tracking-tight"
            style={{
              textShadow: '0 0 40px rgba(14, 165, 233, 0.5)',
            }}
          >
            Purity Engineered.
            <br />
            <span className="bg-gradient-to-r from-cyan-300 to-blue-300 bg-clip-text text-transparent">
              Hydration Perfected.
            </span>
          </motion.h1>

          <p className="text-lg md:text-xl text-cyan-100 max-w-2xl mx-auto leading-relaxed">
            Crafted with advanced purification technology, delivering unmatched 
            freshness and safety in every drop across Madhya Pradesh.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-gradient-to-r from-cyan-400 to-blue-500 text-white rounded-full font-semibold shadow-lg shadow-cyan-500/50 hover:shadow-cyan-500/70 transition-all duration-300"
            >
              Order Now
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-8 py-4 bg-white/10 backdrop-blur-md border-2 border-white/30 text-white rounded-full font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Become a Distributor
            </motion.button>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <ChevronDown className="w-8 h-8 text-white/60" />
        </motion.div>
      </motion.div>

      {/* Glassmorphic overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}

// Hyper-realistic LIFEE bottle component with condensation and water effects
function RealisticLifeeBottle() {
  const bottleWidth = 200;
  const bottleHeight = 500;

  return (
    <div 
      className="relative"
      style={{ 
        width: bottleWidth,
        height: bottleHeight,
        filter: 'drop-shadow(0 30px 60px rgba(0, 0, 0, 0.4))',
      }}
    >
      <svg
        viewBox="0 0 200 500"
        className="w-full h-full"
        style={{
          filter: 'drop-shadow(0 0 30px rgba(14, 165, 233, 0.4))',
        }}
      >
        <defs>
          {/* Ultra-realistic gradients */}
          <linearGradient id="bottleGlass" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#E0F7FF" stopOpacity="0.25" />
            <stop offset="30%" stopColor="#FFFFFF" stopOpacity="0.7" />
            <stop offset="50%" stopColor="#B3E5FC" stopOpacity="0.5" />
            <stop offset="70%" stopColor="#FFFFFF" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#E0F7FF" stopOpacity="0.2" />
          </linearGradient>

          {/* Water inside gradient */}
          <linearGradient id="waterInside" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#B3E5FC" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#81D4FA" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#4FC3F7" stopOpacity="0.85" />
          </linearGradient>

          {/* Label gradient */}
          <linearGradient id="labelBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0EA5E9" stopOpacity="0.95" />
            <stop offset="100%" stopColor="#06B6D4" stopOpacity="1" />
          </linearGradient>

          {/* Shine effect for realistic lighting */}
          <linearGradient id="shine" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
          </linearGradient>

          {/* Condensation pattern */}
          <filter id="condensation">
            <feTurbulence baseFrequency="0.05" numOctaves="3" seed="2" />
            <feDisplacementMap in="SourceGraphic" scale="3" />
          </filter>
        </defs>

        {/* Bottle cap - blue */}
        <g>
          <rect x="65" y="20" width="70" height="35" rx="5" fill="#1E40AF" />
          <ellipse cx="100" cy="20" rx="35" ry="10" fill="#2563EB" />
          <ellipse cx="100" cy="22" rx="32" ry="9" fill="#3B82F6" />
          <ellipse cx="90" cy="28" rx="12" ry="4" fill="rgba(255, 255, 255, 0.4)" />
        </g>

        {/* Bottle neck */}
        <path
          d="M 75 55 L 65 75 L 65 100 L 135 100 L 135 75 L 125 55 Z"
          fill="url(#bottleGlass)"
          stroke="rgba(255, 255, 255, 0.4)"
          strokeWidth="1"
        />

        {/* Main bottle body - realistic shape */}
        <rect
          x="55"
          y="100"
          width="90"
          height="350"
          rx="20"
          fill="url(#bottleGlass)"
          stroke="rgba(255, 255, 255, 0.3)"
          strokeWidth="1"
        />

        {/* Water inside bottle */}
        <rect
          x="58"
          y="130"
          width="84"
          height="310"
          rx="18"
          fill="url(#waterInside)"
        />

        {/* LIFEE Label */}
        <g>
          <rect
            x="60"
            y="220"
            width="80"
            height="120"
            rx="6"
            fill="url(#labelBg)"
            opacity="0.95"
          />
          
          {/* LIFEE text */}
          <text
            x="100"
            y="265"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="32"
            fontWeight="bold"
            letterSpacing="2"
          >
            LIFEE
          </text>

          {/* Premium Water subtext */}
          <text
            x="100"
            y="285"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="8"
            opacity="0.9"
            letterSpacing="1"
          >
            PREMIUM WATER
          </text>

          {/* Decorative line */}
          <line x1="70" y1="295" x2="130" y2="295" stroke="#FFFFFF" strokeWidth="1" opacity="0.6" />

          {/* Volume indicator */}
          <text
            x="100"
            y="315"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="16"
            fontWeight="600"
          >
            1L
          </text>

          {/* Additional text */}
          <text
            x="100"
            y="328"
            textAnchor="middle"
            fill="#FFFFFF"
            fontSize="6"
            opacity="0.8"
          >
            PURE & NATURAL
          </text>
        </g>

        {/* Realistic shine/reflection - left side */}
        <ellipse
          cx="72"
          cy="160"
          rx="12"
          ry="80"
          fill="url(#shine)"
          opacity="0.7"
        />

        {/* Realistic shine - right side subtle */}
        <ellipse
          cx="130"
          cy="280"
          rx="8"
          ry="60"
          fill="rgba(255, 255, 255, 0.2)"
          opacity="0.5"
        />

        {/* Condensation droplets - chilled effect */}
        {[
          { cx: 68, cy: 150, r: 2 },
          { cx: 75, cy: 175, r: 1.5 },
          { cx: 70, cy: 195, r: 1 },
          { cx: 80, cy: 210, r: 2.5 },
          { cx: 132, cy: 165, r: 1.5 },
          { cx: 128, cy: 190, r: 2 },
          { cx: 135, cy: 215, r: 1 },
          { cx: 65, cy: 360, r: 1.5 },
          { cx: 72, cy: 380, r: 2 },
          { cx: 68, cy: 400, r: 1 },
          { cx: 130, cy: 350, r: 1.5 },
          { cx: 136, cy: 375, r: 1 },
          { cx: 133, cy: 395, r: 2 },
        ].map((drop, i) => (
          <g key={i}>
            <circle
              cx={drop.cx}
              cy={drop.cy}
              r={drop.r}
              fill="rgba(255, 255, 255, 0.6)"
              filter="blur(0.5px)"
            />
            <circle
              cx={drop.cx}
              cy={drop.cy}
              r={drop.r * 0.5}
              fill="rgba(255, 255, 255, 0.9)"
            />
          </g>
        ))}

        {/* Bottom curve highlight */}
        <ellipse
          cx="100"
          cy="440"
          rx="35"
          ry="8"
          fill="rgba(255, 255, 255, 0.15)"
        />

        {/* Cap highlight */}
        <ellipse
          cx="92"
          cy="30"
          rx="10"
          ry="5"
          fill="rgba(255, 255, 255, 0.6)"
        />
      </svg>

      {/* Realistic shadow beneath bottle */}
      <div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2"
        style={{
          width: bottleWidth * 0.5,
          height: 30,
          background: 'radial-gradient(ellipse, rgba(0, 0, 0, 0.4), transparent)',
          filter: 'blur(12px)',
        }}
      />
    </div>
  );
}