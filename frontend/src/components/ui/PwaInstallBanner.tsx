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
    <div className="fixed bottom-6 right-6 z-50 max-w-md w-full p-4 sm:p-5 rounded-2xl bg-obsidian-card/95 backdrop-blur-2xl border border-cyan-glow/40 shadow-2xl shadow-cyan-glow/20 flex items-center space-x-3.5 transition-all">
      <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-cyan-glow to-purple-glow p-[1.5px] shrink-0">
        <div className="w-full h-full bg-obsidian rounded-[10px] flex items-center justify-center text-cyan-glow">
          <Smartphone className="w-5 h-5" />
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-bold text-white truncate">Install SeriSense App</h4>
        <p className="text-xs text-slate-300 truncate">Run leaf disease AI offline in field</p>
      </div>

      <button
        onClick={handleInstallClick}
        className="px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-glow to-purple-glow text-white text-sm font-semibold flex items-center gap-1.5 hover:opacity-95 shadow-md shadow-cyan-glow/20 transition-all shrink-0"
      >
        <Download className="w-4 h-4" /> Install
      </button>

      <button
        onClick={() => setDismissed(true)}
        className="p-1.5 rounded-lg text-slate-400 hover:text-white transition-colors"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};
