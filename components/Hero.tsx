import React from 'react';
import { Button } from './Button';
import { AppView } from '../types';
import { Cpu, ShieldCheck, Database } from 'lucide-react';

interface HeroProps {
  onLaunch: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onLaunch }) => {
  const scrollToServices = () => {
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center pt-28 overflow-hidden bg-slate-950">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-grid-pattern bg-[length:50px_50px] opacity-[0.03]"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-cyan-600/10 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-blue-600/5 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 relative z-10">
        <div className="flex flex-col justify-center text-center lg:text-left">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-cyan-500/30 bg-cyan-950/20 w-fit mb-10 mx-auto lg:mx-0 shadow-lg shadow-cyan-500/5">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse shadow-[0_0_10px_rgba(34,211,238,0.8)]"></span>
            <span className="text-xs font-bold text-cyan-400 tracking-[0.2em] uppercase">Pharma 4.0 Digital Advisor</span>
          </div>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-white leading-[0.9] mb-8 tracking-tighter">
            Engineered for <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Compliance.</span><br />
            <span className="text-slate-500">Optimized for</span> Intelligence.
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-xl leading-relaxed mx-auto lg:mx-0">
            Bridging the high-stakes gap between complex IT infrastructure, stringent regulatory demands, and operational reality.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
            <Button
              variant="primary"
              onClick={onLaunch}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-black px-10 py-5 rounded-2xl shadow-2xl shadow-cyan-500/20 transition-all hover:-translate-y-1 active:scale-95"
            >
              Start AI Builder
            </Button>
            <Button
              variant="secondary"
              onClick={scrollToServices}
              className="border-slate-800 hover:border-slate-600 px-10 py-5 rounded-2xl text-slate-300 font-bold backdrop-blur-sm transition-all hover:bg-white/5"
            >
              Explore Solutions
            </Button>
          </div>

          <div className="mt-20 flex flex-wrap items-center justify-center lg:justify-start gap-10 text-slate-600">
            <div className="flex items-center gap-3 group">
              <ShieldCheck className="w-6 h-6 group-hover:text-cyan-400 transition-colors" />
              <span className="text-xs font-bold uppercase tracking-widest">21 CFR Part 11</span>
            </div>
            <div className="flex items-center gap-3 group">
              <Database className="w-6 h-6 group-hover:text-blue-400 transition-colors" />
              <span className="text-xs font-bold uppercase tracking-widest">Data Integrity</span>
            </div>
            <div className="flex items-center gap-3 group">
              <Cpu className="w-6 h-6 group-hover:text-indigo-400 transition-colors" />
              <span className="text-xs font-bold uppercase tracking-widest">Smart Manufacturing</span>
            </div>
          </div>
        </div>

        {/* Right Side Visual - Abstract Data Flow */}
        <div className="hidden lg:flex items-center justify-center relative">
          <div className="relative w-full max-w-lg aspect-square">
            {/* Terminal Window */}
            <div className="absolute inset-4 bg-slate-950/90 rounded-3xl border border-white/10 backdrop-blur-xl z-10 flex flex-col p-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-transparent pointer-events-none"></div>
              <div className="flex justify-between items-center mb-8 border-b border-white/5 pb-6">
                <div className="flex gap-2.5">
                  <div className="w-3.5 h-3.5 rounded-full bg-red-500/20 border border-red-500/50"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                  <div className="w-3.5 h-3.5 rounded-full bg-green-500/20 border border-green-500/50"></div>
                </div>
                <span className="text-[10px] text-slate-500 font-mono tracking-widest uppercase">system_integrity_v4.0.2</span>
              </div>
              <div className="space-y-6 font-mono text-sm leading-relaxed">
                <div className="flex justify-between items-center">
                  <span className="text-slate-500 uppercase tracking-widest text-[10px] font-bold">Protocol Status</span>
                  <span className="px-2 py-0.5 bg-green-500/10 text-green-400 text-[10px] font-bold rounded border border-green-500/30">VALIDATED</span>
                </div>
                <div className="h-2 w-full bg-slate-900 rounded-full overflow-hidden border border-white/5">
                  <div className="h-full w-full bg-gradient-to-r from-cyan-600 to-blue-500 origin-left animate-[grow_2.5s_ease-out_infinite_alternate]"></div>
                </div>
                <div className="grid grid-cols-2 gap-6 mt-8">
                  <div className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 group-hover:border-cyan-500/20 transition-all">
                    <div className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-2">Compliance</div>
                    <div className="text-2xl text-white font-light tracking-tighter">99.9<span className="text-cyan-500 font-bold text-sm ml-1">%</span></div>
                  </div>
                  <div className="bg-slate-950/50 p-5 rounded-2xl border border-white/5 group-hover:border-blue-500/20 transition-all">
                    <div className="text-slate-600 text-[9px] font-black uppercase tracking-widest mb-2">Risk Level</div>
                    <div className="text-2xl text-cyan-400 font-bold tracking-tighter">LOW</div>
                  </div>
                </div>
                <div className="text-slate-600 pt-6 text-xs space-y-1">
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-cyan-500"></div> <span>Verifying ALCOA+ Integrity...</span></div>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-cyan-500"></div> <span>Connection: MES-READY</span></div>
                  <div className="flex items-center gap-2"><div className="w-1 h-1 rounded-full bg-cyan-500"></div> <span>Batch Relase: AUTHORIZED</span></div>
                </div>
              </div>
            </div>

            {/* Decorative Background Elements */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 rounded-[3rem] blur-2xl transform translate-x-8 translate-y-8 animate-pulse"></div>

            {/* Floating Badge */}
            <div className="absolute -top-10 -right-6 glass-panel p-6 rounded-3xl border border-white/10 shadow-2xl animate-bounce duration-[4000ms] z-20">
              <ShieldCheck className="w-10 h-10 text-cyan-400 mb-2" />
              <div className="text-[10px] font-black uppercase tracking-[0.2em] text-cyan-500">Secured</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
