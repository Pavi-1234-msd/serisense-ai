import React, { useRef, useState } from 'react';
import { Layers, Zap, Lock, Cpu, Globe, ShieldAlert, Sparkles, ArrowRight } from 'lucide-react';

interface BentoCardProps {
  icon: React.ReactNode;
  tag: string;
  title: string;
  description: string;
  spanClass?: string;
  gradientClass?: string;
}

const BentoCard: React.FC<BentoCardProps> = ({ icon, tag, title, description, spanClass = 'col-span-1', gradientClass = '' }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    // 3D Parallax tilt calculations
    setRotateX((-y / rect.height) * 14);
    setRotateY((x / rect.width) * 14);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: 'transform 0.15s ease-out, box-shadow 0.3s ease'
      }}
      className={`glass-panel-interactive rounded-3xl p-7 relative flex flex-col justify-between overflow-hidden cursor-pointer group ${spanClass}`}
    >
      {/* Background Gradient Effect */}
      <div className={`absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none ${gradientClass}`} />

      {/* Card Header */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <div className="w-12 h-12 rounded-2xl bg-obsidian border border-white/10 flex items-center justify-center text-cyan-glow group-hover:scale-110 group-hover:border-cyan-glow/40 transition-all">
            {icon}
          </div>
          <span className="text-[11px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-full bg-obsidian border border-white/10 text-slate-400 group-hover:text-cyan-glow transition-colors">
            {tag}
          </span>
        </div>

        <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-glow transition-colors">
          {title}
        </h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6">
          {description}
        </p>
      </div>

      {/* Card Footer / Action */}
      <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-white transition-colors">
        <span>Explore Module</span>
        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1 text-cyan-glow" />
      </div>
    </div>
  );
};

export const BentoGrid: React.FC = () => {
  return (
    <section id="features" className="py-24 relative z-10 bg-obsidian">
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16 text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-glow/10 border border-cyan-glow/20 text-xs font-mono text-cyan-glow mb-4">
          <Sparkles className="w-3.5 h-3.5" />
          <span>ENTERPRISE CAPABILITIES</span>
        </div>
        
        <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
          Engineered for <span className="text-gradient-cyan">Anti-Gravity Performance</span>
        </h2>
        <p className="mt-4 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
          Every component is designed with spatial responsiveness, ultra-low latency, and mathematical precision.
        </p>
      </div>

      {/* Bento 3-Column Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        
        {/* Card 1 (Span 2) */}
        <BentoCard
          spanClass="md:col-span-2 lg:col-span-2"
          icon={<Layers className="w-6 h-6" />}
          tag="Spatial Engine"
          title="Anti-Gravity 3D Workspace Canvas"
          description="Render complex spatial graphs, infinite node trees, and interactive 3D simulations directly inside your browser viewport with WebGL 2.0."
          gradientClass="bg-gradient-to-br from-cyan-glow/10 via-transparent to-purple-glow/10"
        />

        {/* Card 2 */}
        <BentoCard
          icon={<Zap className="w-6 h-6" />}
          tag="Realtime Engine"
          title="Sub-Millisecond Telemetry"
          description="Stream high-frequency data streams across thousands of connected enterprise nodes with zero dropped frames."
          gradientClass="bg-gradient-to-br from-cyan-glow/15 via-transparent to-transparent"
        />

        {/* Card 3 */}
        <BentoCard
          icon={<Lock className="w-6 h-6" />}
          tag="Cryptography"
          title="Quantum-Resistant Mesh"
          description="Post-quantum lattice encryption standards safeguard end-to-end telemetry pipelines from eavesdropping."
          gradientClass="bg-gradient-to-br from-purple-glow/15 via-transparent to-transparent"
        />

        {/* Card 4 (Span 2) */}
        <BentoCard
          spanClass="md:col-span-2 lg:col-span-2"
          icon={<Cpu className="w-6 h-6" />}
          tag="Autonomous AI"
          title="Self-Healing Compute Agents"
          description="Autonomous AI subprocesses analyze network latency, detect memory leaks, and optimize resource routing automatically."
          gradientClass="bg-gradient-to-tr from-purple-glow/10 via-transparent to-cyan-glow/10"
        />

        {/* Card 5 */}
        <BentoCard
          icon={<Globe className="w-6 h-6" />}
          tag="Global CDN"
          title="Edge Vector Network"
          description="Over 280 edge locations globally ensure under 10ms latency for users anywhere on earth."
        />

      </div>
    </section>
  );
};
