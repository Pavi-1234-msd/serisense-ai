import React from 'react';
import { ArrowUpRight, Zap, Shield, Sparkles } from 'lucide-react';

export const CtaSection: React.FC = () => {
  return (
    <section id="pricing" className="py-24 relative overflow-hidden bg-obsidian">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="glass-panel rounded-3xl p-10 md:p-16 border border-cyan-glow/30 relative overflow-hidden shadow-2xl">
          
          {/* Background Glow Overlay */}
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-glow/15 via-purple-glow/15 to-transparent pointer-events-none" />

          <div className="relative z-10 max-w-3xl space-y-6">
            
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-obsidian border border-cyan-glow/30 text-xs font-mono text-cyan-glow">
              <Sparkles className="w-3.5 h-3.5" />
              <span>READY TO DEPLOY?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Elevate Your SaaS Infrastructure <br />
              <span className="text-gradient-cyan">Into Zero Gravity Today</span>
            </h2>

            <p className="text-slate-300 text-base sm:text-lg leading-relaxed">
              Join leading tech enterprises scaling spatial compute, 3D interactive experiences, and autonomous neural workflows.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <button className="px-8 py-4 rounded-xl bg-gradient-to-r from-cyan-glow to-purple-glow font-bold text-white shadow-neon-cyan hover:opacity-95 transition-all flex items-center justify-center gap-2 group">
                <Zap className="w-5 h-5 text-white" />
                Get Started Free
                <ArrowUpRight className="w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              </button>

              <button className="px-8 py-4 rounded-xl bg-obsidian-darker hover:bg-obsidian border border-white/10 font-semibold text-slate-200 hover:text-white transition-all">
                Schedule Architecture Review
              </button>
            </div>

            <div className="pt-6 flex items-center space-x-6 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5"><Shield className="w-4 h-4 text-cyan-glow" /> SOC2 Type II Certified</span>
              <span>•</span>
              <span>14-Day Unlimited Trial</span>
              <span>•</span>
              <span>No Credit Card Required</span>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};
