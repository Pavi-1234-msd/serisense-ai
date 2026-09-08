import React, { useState, useEffect } from 'react';
import { Activity, ShieldCheck, Cpu, Terminal, RefreshCw, CheckCircle } from 'lucide-react';

export const TelemetrySection: React.FC = () => {
  const [latency, setLatency] = useState(0.74);
  const [throughput, setThroughput] = useState(48200);

  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Number((0.68 + Math.random() * 0.12).toFixed(2)));
      setThroughput(Math.floor(47500 + Math.random() * 1500));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="telemetry" className="py-20 relative bg-obsidian-darker border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Information */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-purple-glow/10 border border-purple-glow/20 text-xs font-mono text-purple-glow">
              <Activity className="w-3.5 h-3.5" />
              <span>LIVE TELEMETRY STREAM</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Real-Time Telemetry & <br />
              <span className="text-gradient-purple">Infrastructure Monitoring</span>
            </h2>

            <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
              Track global node health, network throughput, memory allocation, and spatial vector pipelines with zero overhead.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex items-center space-x-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-glow" />
                <span>Distributed consensus with zero single point of failure</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-glow" />
                <span>Automated hot-swapping memory garbage collection</span>
              </div>
              <div className="flex items-center space-x-3 text-sm text-slate-300">
                <CheckCircle className="w-4 h-4 text-cyan-glow" />
                <span>Instant failover with sub-10ms session recovery</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Telemetry Console */}
          <div className="lg:col-span-7">
            <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-white/10 relative overflow-hidden">
              
              {/* Console Header */}
              <div className="flex items-center justify-between pb-6 border-b border-white/10 mb-6">
                <div className="flex items-center space-x-3">
                  <Terminal className="w-5 h-5 text-cyan-glow" />
                  <span className="font-mono text-sm font-semibold text-white">cluster-node-us-east-01</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span className="text-xs font-mono text-emerald-400">ACTIVE TELEMETRY</span>
                </div>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-8">
                <div className="bg-obsidian-card p-4 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-xs text-slate-400 font-mono">Global Latency</span>
                  <div className="text-2xl font-bold font-mono text-cyan-glow">{latency} ms</div>
                  <span className="text-[10px] text-emerald-400 font-mono">-12.4% vs benchmark</span>
                </div>

                <div className="bg-obsidian-card p-4 rounded-2xl border border-white/5 space-y-1">
                  <span className="text-xs text-slate-400 font-mono">Throughput (req/s)</span>
                  <div className="text-2xl font-bold font-mono text-purple-glow">{throughput.toLocaleString()}</div>
                  <span className="text-[10px] text-purple-glow font-mono">Live vector pipeline</span>
                </div>

                <div className="bg-obsidian-card p-4 rounded-2xl border border-white/5 space-y-1 col-span-2 sm:col-span-1">
                  <span className="text-xs text-slate-400 font-mono">CPU Core Load</span>
                  <div className="text-2xl font-bold font-mono text-emerald-400">14.2%</div>
                  <span className="text-[10px] text-slate-500 font-mono">128 Threads Idle</span>
                </div>
              </div>

              {/* Live Signal Graphic / Visual Bars */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono text-slate-400">
                  <span>Packet Sync Frequency</span>
                  <span>100% Signal Quality</span>
                </div>
                <div className="h-10 w-full bg-obsidian-card rounded-xl border border-white/5 p-2 flex items-center gap-1.5 overflow-hidden">
                  {Array.from({ length: 48 }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-gradient-to-t from-cyan-glow to-purple-glow rounded-sm transition-all duration-300"
                      style={{
                        height: `${Math.max(25, Math.min(100, Math.sin(i * 0.4 + Date.now() * 0.002) * 40 + 60))}%`,
                        opacity: 0.6 + (i % 5) * 0.08
                      }}
                    />
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
