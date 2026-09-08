import React, { useState, useEffect } from 'react';
import { Sparkles, Menu, X, ArrowUpRight, Zap, Mic } from 'lucide-react';
import { VoiceAssistantModal } from '../ui/VoiceAssistantModal';

export const Header: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [voiceModalOpen, setVoiceModalOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled 
        ? 'py-3 bg-obsidian-darker/80 backdrop-blur-xl border-b border-white/10 shadow-2xl' 
        : 'py-5 bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo */}
        <a href="#hero" className="flex items-center space-x-3 group">
          <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-glow to-purple-glow p-[1px] shadow-neon-cyan/40 transition-transform group-hover:scale-105">
            <div className="w-full h-full bg-obsidian rounded-[11px] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-cyan-glow animate-pulse" />
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-wider text-white flex items-center gap-1.5">
              ANTIGRAVITY <span className="text-xs px-2 py-0.5 rounded-full bg-cyan-glow/10 text-cyan-glow border border-cyan-glow/20 font-mono">v3.0</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono tracking-widest uppercase -mt-1">Spatial SaaS Platform</span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
          <a href="#features" className="hover:text-cyan-glow transition-colors py-1 relative group">
            Features
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-glow transition-all group-hover:w-full" />
          </a>
          <a href="#architecture" className="hover:text-cyan-glow transition-colors py-1 relative group">
            Architecture
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-glow transition-all group-hover:w-full" />
          </a>
          <a href="#telemetry" className="hover:text-cyan-glow transition-colors py-1 relative group">
            Telemetry
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-glow transition-all group-hover:w-full" />
          </a>
          <a href="#pricing" className="hover:text-cyan-glow transition-colors py-1 relative group">
            Enterprise
            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-glow transition-all group-hover:w-full" />
          </a>
        </nav>

        {/* CTA Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <div className="flex items-center space-x-2 text-xs font-mono text-slate-400 px-3 py-1.5 rounded-lg bg-obsidian-card border border-white/5">
            <span className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400 animate-ping'}`} />
            <span>Mode: <strong className={isOnline ? 'text-emerald-400' : 'text-amber-400'}>{isOnline ? 'Live API' : 'Offline AI'}</strong></span>
          </div>

          <button className="relative inline-flex items-center justify-center p-0.5 overflow-hidden text-sm font-medium rounded-xl group bg-gradient-to-r from-cyan-glow to-purple-glow group-hover:from-cyan-glow group-hover:to-purple-glow hover:shadow-neon-cyan transition-all duration-300">
            <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-obsidian-darker rounded-[10px] group-hover:bg-opacity-0 font-semibold text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-cyan-glow group-hover:text-white transition-colors" />
              Launch App
              <ArrowUpRight className="w-4 h-4 text-slate-400 group-hover:text-white transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </button>
        </div>

        <VoiceAssistantModal
          isOpen={voiceModalOpen}
          onClose={() => setVoiceModalOpen(false)}
        />

        {/* Mobile Hamburger Toggle */}
        <div className="md:hidden flex items-center">
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg bg-obsidian-card border border-white/10 text-slate-300 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-obsidian-card/95 backdrop-blur-2xl border-b border-white/10 px-6 py-6 space-y-4">
          <a 
            href="#features" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-glow text-base font-medium py-2"
          >
            Features
          </a>
          <a 
            href="#architecture" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-glow text-base font-medium py-2"
          >
            Architecture
          </a>
          <a 
            href="#telemetry" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-glow text-base font-medium py-2"
          >
            Telemetry
          </a>
          <a 
            href="#pricing" 
            onClick={() => setMobileMenuOpen(false)}
            className="block text-slate-200 hover:text-cyan-glow text-base font-medium py-2"
          >
            Enterprise
          </a>

          <div className="pt-4 border-t border-white/10 space-y-3">
            <button className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-glow to-purple-glow font-semibold text-white flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> Launch App
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
