import React from 'react';
import { motion } from 'framer-motion';
import { AntiGravityCanvas } from '../canvas/AntiGravityCanvas';
import { ArrowRight, Play, Shield, Activity, Cpu } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden min-h-screen flex items-center">
      {/* Background ambient lighting */}
      <div className="glow-background-cyan top-1/4 left-0 -translate-x-1/2 opacity-30" />
      <div className="glow-background-purple top-1/3 right-0 translate-x-1/3 opacity-25" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Kinetic Typography & CTAs */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6 space-y-8"
          >
            {/* Top Pill */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-obsidian-card border border-cyan-glow/30 text-xs font-mono text-cyan-glow shadow-neon-cyan/20">
              <span className="w-2 h-2 rounded-full bg-cyan-glow animate-ping" />
              <span>Next-Gen Spatial Architecture 4.0</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.1]">
              Zero-Gravity <br />
              <span className="text-gradient-cyan">Spatial Intelligence</span> <br />
              For Modern Enterprise
            </h1>

            {/* Subtext */}
            <p className="text-slate-400 text-base sm:text-lg leading-relaxed max-w-xl">
              Break free from traditional SaaS constraints. AntiGravity harnesses 3D spatial computing, real-time neural telemetry, and quantum-encrypted messaging in a single fluid canvas.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
              <button className="px-7 py-3.5 rounded-xl bg-gradient-to-r from-cyan-glow to-purple-glow hover:opacity-95 font-semibold text-white shadow-neon-cyan transition-all flex items-center justify-center gap-2 group">
                Start Free Enterprise Trial
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </button>

              <button className="px-6 py-3.5 rounded-xl bg-obsidian-card hover:bg-obsidian-hover border border-white/10 font-medium text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2">
                <Play className="w-4 h-4 text-cyan-glow fill-cyan-glow/20" />
                Watch Architecture Demo
              </button>
            </div>

            {/* Metric Chips */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4">
              <div className="space-y-1">
                <div className="flex items-center text-slate-400 text-xs font-mono gap-1">
                  <Activity className="w-3.5 h-3.5 text-cyan-glow" /> FPS Rate
                </div>
                <span className="text-xl font-bold text-white font-mono">60 FPS</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-slate-400 text-xs font-mono gap-1">
                  <Cpu className="w-3.5 h-3.5 text-purple-glow" /> Telemetry Latency
                </div>
                <span className="text-xl font-bold text-white font-mono">&lt; 0.8ms</span>
              </div>

              <div className="space-y-1">
                <div className="flex items-center text-slate-400 text-xs font-mono gap-1">
                  <Shield className="w-3.5 h-3.5 text-emerald-400" /> Encryption
                </div>
                <span className="text-xl font-bold text-white font-mono">256-AES</span>
              </div>
            </div>

          </motion.div>

          {/* Right Column: 3D Canvas */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-6"
          >
            <AntiGravityCanvas />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
