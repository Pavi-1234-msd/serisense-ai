import React, { useState } from 'react';
import { Sparkles, Send, Github, Twitter, Disc as Discord, Linkedin, CheckCircle2, Shield } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 4000);
    }
  };

  return (
    <footer className="relative bg-obsidian-darker border-t border-white/10 pt-16 pb-12 overflow-hidden">
      {/* Background glow accents */}
      <div className="glow-background-purple bottom-0 left-0 translate-y-1/2 -translate-x-1/4 opacity-30" />
      <div className="glow-background-cyan top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          
          {/* Column 1: Brand & Newsletter */}
          <div className="lg:col-span-2 space-y-6">
            <a href="#hero" className="flex items-center space-x-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-glow to-purple-glow p-[1px]">
                <div className="w-full h-full bg-obsidian rounded-[11px] flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-cyan-glow" />
                </div>
              </div>
              <span className="font-bold text-xl tracking-wider text-white">ANTIGRAVITY</span>
            </a>

            <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
              Next-generation spatial canvas and anti-gravity neural compute platform designed for modern enterprise SaaS teams.
            </p>

            {/* Newsletter Input Box */}
            <div className="space-y-3">
              <span className="text-xs font-mono text-cyan-glow uppercase tracking-wider block">Subscribe to Engineering Dispatch</span>
              {subscribed ? (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" /> Subscribed successfully to dispatch.
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex items-center gap-2 max-w-md">
                  <input
                    type="email"
                    required
                    placeholder="enter your email address..."
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-obsidian-card border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-glow focus:ring-1 focus:ring-cyan-glow transition-all"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-cyan-glow to-purple-glow hover:opacity-90 transition-opacity text-white text-sm font-semibold flex items-center gap-1.5"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Column 2: Product */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 font-mono">Product</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#features" className="hover:text-cyan-glow transition-colors">Spatial Canvas</a></li>
              <li><a href="#features" className="hover:text-cyan-glow transition-colors">Real-time Telemetry</a></li>
              <li><a href="#features" className="hover:text-cyan-glow transition-colors">Quantum Mesh</a></li>
              <li><a href="#features" className="hover:text-cyan-glow transition-colors">Autonomous Agents</a></li>
              <li><a href="#features" className="hover:text-cyan-glow transition-colors">API & Webhooks</a></li>
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 font-mono">Resources</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#docs" className="hover:text-cyan-glow transition-colors">Documentation</a></li>
              <li><a href="#docs" className="hover:text-cyan-glow transition-colors">System Architecture</a></li>
              <li><a href="#docs" className="hover:text-cyan-glow transition-colors">Security Whitepaper</a></li>
              <li><a href="#docs" className="hover:text-cyan-glow transition-colors">API Reference</a></li>
              <li><a href="#docs" className="hover:text-cyan-glow transition-colors">SDK Releases</a></li>
            </ul>
          </div>

          {/* Column 4: Company */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold uppercase tracking-wider text-slate-200 font-mono">Company</h4>
            <ul className="space-y-2.5 text-sm text-slate-400">
              <li><a href="#company" className="hover:text-cyan-glow transition-colors">About Us</a></li>
              <li><a href="#company" className="hover:text-cyan-glow transition-colors">Careers <span className="text-[10px] px-1.5 py-0.5 rounded bg-purple-glow/20 text-purple-glow font-mono">Hiring</span></a></li>
              <li><a href="#company" className="hover:text-cyan-glow transition-colors">Press Kit</a></li>
              <li><a href="#company" className="hover:text-cyan-glow transition-colors">Contact Engineering</a></li>
              <li><a href="#company" className="hover:text-cyan-glow transition-colors">Trust Center</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          
          <div className="flex items-center space-x-6">
            <span>© 2026 AntiGravity Inc. All rights reserved.</span>
            <span className="hidden sm:inline">•</span>
            <a href="#privacy" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
            <a href="#terms" className="hover:text-slate-300 transition-colors">Terms of Service</a>
          </div>

          {/* Social Icons & Status */}
          <div className="flex items-center space-x-6">
            <div className="flex items-center space-x-2 text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
              <span className="font-mono text-[11px]">All Systems 99.99% Operational</span>
            </div>

            <div className="flex items-center space-x-3 text-slate-400">
              <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-cyan-glow transition-colors p-1.5 rounded-lg bg-obsidian-card border border-white/5">
                <Github className="w-4 h-4" />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:text-cyan-glow transition-colors p-1.5 rounded-lg bg-obsidian-card border border-white/5">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="https://discord.com" target="_blank" rel="noreferrer" className="hover:text-cyan-glow transition-colors p-1.5 rounded-lg bg-obsidian-card border border-white/5">
                <Discord className="w-4 h-4" />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-cyan-glow transition-colors p-1.5 rounded-lg bg-obsidian-card border border-white/5">
                <Linkedin className="w-4 h-4" />
              </a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};
