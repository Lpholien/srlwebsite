import React from 'react';
import { Server, Database, ArrowRight, CheckCircle2 } from 'lucide-react';

const pillars = [
  {
    title: "System Implementation Services",
    description: "We manage the full end-to-end implementation lifecycle, ensuring that complex IT solutions align perfectly with business needs and regulatory demands.",
    icon: Server,
    features: [
      "Validation Strategy (CSV & CSA)",
      "Compliant Migration & Data Lineage",
      "The Business-IT Bridge",
      "Change Management & Adoption",
      "Regulatory Compliance (21 CFR Part 11)"
    ]
  },
  {
    title: "Data Management & Smart Manufacturing",
    description: "Transforming data from a static record into a dynamic asset. We guide organizations away from paper-based legacy processes toward a fully digital environment.",
    icon: Database,
    features: [
      "Data Integrity & Remediation (ALCOA+)",
      "Enabling EBR (Electronic Batch Records)",
      "MES Implementation & Optimization",
      "Smart Manufacturing (Pharma 4.0)",
      "Advanced Analytics Integration"
    ]
  }
];

export const Services: React.FC = () => {
  return (
    <section id="services" className="py-32 bg-slate-950 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-cyan-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-slate-700 bg-slate-900/50 w-fit mx-auto">
            <span className="text-xs font-semibold text-slate-300 tracking-wider uppercase">Strategic Pillars</span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
            Architects of the <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Digital Landscape</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We focus on the two most critical challenges facing the industry: bridging the gap between IT infrastructure and regulatory compliance.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {pillars.map((pillar, index) => (
            <div key={index} className="group glass-panel rounded-3xl p-10 hover:bg-slate-900/60 transition-all duration-500 border border-white/5 hover:border-cyan-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

              <div className="h-16 w-16 rounded-2xl bg-slate-900 border border-slate-800 flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-cyan-950/50 group-hover:border-cyan-500/50 transition-all duration-500 shadow-xl">
                <pillar.icon className="w-8 h-8 text-cyan-400" />
              </div>

              <h3 className="text-2xl font-bold text-white mb-6 group-hover:text-cyan-400 transition-colors">{pillar.title}</h3>
              <p className="text-slate-400 mb-10 leading-relaxed text-base">
                {pillar.description}
              </p>

              <div className="grid sm:grid-cols-1 gap-4 mb-10">
                {pillar.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-4 bg-slate-900/40 p-3 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                    <CheckCircle2 className="w-5 h-5 text-cyan-500/70 shrink-0" />
                    <span className="text-sm font-medium text-slate-200">{feature}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" className="inline-flex items-center text-sm font-bold text-cyan-400 group-hover:text-white transition-all">
                Learn more about our methodology <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};