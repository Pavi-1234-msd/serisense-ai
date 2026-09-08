import React, { useState, useEffect } from 'react';
import { Smartphone, Download, X } from 'lucide-react';

export const PwaInstallBanner: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [installed, setInstalled] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };

    const handleAppInstalled = () => {
      setInstalled(true);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setInstalled(true);
    }
    setDeferredPrompt(null);
  };

  if (dismissed || installed || !deferredPrompt) {
    return null;
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm w-full p-4 rounded-2xl bg-obsidian-card/95 backdrop-blur-2xl border border-cyan-glow/30 shadow-2xl shadow-cyan-glow/10 flex items-center space-x-3 transition-all animate-bounce-short">
      <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-glow to-purple-glow p-[1px] shrink-0">
        <div className="w-full h-full bg-obsidian rounded-[11px] flex items-center justify-center text-cyan-glow">
          <Smartphone className="w-5 h-5" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-white truncate">Install SeriSense App</h4>
        <p className="text-xs text-slate-400 truncate">Run leaf disease AI offline in field</p>
      </div>

      <button
        onClick={handleInstallClick}
        className="px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-glow to-purple-glow text-white text-xs font-semibold flex items-center gap-1 hover:opacity-90 transition-opacity shrink-0"
      >
        <Download className="w-3.5 h-3.5" /> Install
      </button>

      <button
        onClick={() => setDismissed(true)}
        className="p-1 rounded-lg text-slate-500 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
