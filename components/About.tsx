import React from 'react';

export const About: React.FC = () => {
  return (
    <section id="about" className="py-32 relative overflow-hidden bg-slate-950">
      {/* Background patterns */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-cyan-600/5 rounded-full blur-[120px]"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 w-fit mb-8">
          <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">Our Philosophy</span>
        </div>

        <h2 className="text-4xl md:text-5xl font-bold text-white mb-12">Why Genval Lake?</h2>

        <div className="glass-panel p-8 md:p-16 rounded-3xl border border-white/5 shadow-2xl relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>

          <p className="text-2xl md:text-4xl text-slate-100 font-light leading-snug mb-16 max-w-4xl mx-auto">
            "In the Life Sciences industry, <span className="text-cyan-400 font-semibold italic">innovation</span> cannot happen at the expense of <span className="text-cyan-400 font-semibold italic">compliance</span>. We bridge the gap."
          </p>

          <div className="grid md:grid-cols-3 gap-12 text-left">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-cyan-950/50 flex items-center justify-center border border-cyan-500/20">
                <span className="text-cyan-400 font-bold">01</span>
              </div>
              <h4 className="text-xl font-bold text-white">Subject Matter Expertise</h4>
              <p className="text-slate-400 leading-relaxed">
                We are not generalist project managers; we are GxP, MES, and Validation specialists who speak your language.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-blue-950/50 flex items-center justify-center border border-blue-500/20">
                <span className="text-blue-400 font-bold">02</span>
              </div>
              <h4 className="text-xl font-bold text-white">Risk-Based Approach</h4>
              <p className="text-slate-400 leading-relaxed">
                We apply CSA methodologies to focus effort where it matters most—patient safety and product quality.
              </p>
            </div>
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-lg bg-indigo-950/50 flex items-center justify-center border border-indigo-500/20">
                <span className="text-indigo-400 font-bold">03</span>
              </div>
              <h4 className="text-xl font-bold text-white">Operational Empathy</h4>
              <p className="text-slate-400 leading-relaxed">
                Our solutions are designed to be usable on the shop floor, ensuring compliance without sacrificing efficiency.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};