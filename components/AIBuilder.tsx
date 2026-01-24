import React, { useState } from 'react';
import { generateURS } from '../services/geminiService';
import { URSResponse } from '../types';
import { Button } from './Button';
import { FileText, Download, Copy, AlertCircle, Check, Terminal } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell
} from 'recharts';

const CircuitBackground: React.FC = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-20">
    <svg width="100%" height="100%" className="absolute inset-0">
      <pattern id="circuit" x="0" y="0" width="100" height="100" patternUnits="userSpaceOnUse">
        <path d="M 10 10 L 90 10 L 90 90 L 10 90 Z" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-cyan-500/30" />
        <circle cx="10" cy="10" r="1.5" fill="currentColor" className="text-cyan-400" />
        <circle cx="90" cy="10" r="1.5" fill="currentColor" className="text-cyan-400" />
        <circle cx="90" cy="90" r="1.5" fill="currentColor" className="text-cyan-400" />
        <circle cx="10" cy="90" r="1.5" fill="currentColor" className="text-cyan-400" />
        <path d="M 50 10 L 50 25 M 50 90 L 50 75 M 10 50 L 25 50 M 90 50 L 75 50" stroke="currentColor" strokeWidth="1" className="text-cyan-500/40" />
      </pattern>
      <rect width="100%" height="100%" fill="url(#circuit)" />

      {/* Animated paths */}
      <g className="animate-pulse duration-[4000ms]">
        <circle cx="20%" cy="30%" r="2" fill="#22d3ee" />
        <circle cx="80%" cy="60%" r="2" fill="#22d3ee" />
        <circle cx="40%" cy="80%" r="2" fill="#22d3ee" />
      </g>
    </svg>

    {/* Moving data bits animation */}
    <div className="absolute inset-0">
      {[...Array(10)].map((_, i) => (
        <div
          key={i}
          className="absolute w-px h-20 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animation: `float-slow ${10 + Math.random() * 20}s linear infinite`,
            opacity: 0.3
          }}
        />
      ))}
    </div>

    <style>{`
      @keyframes float-slow {
        from { transform: translateY(-100%); }
        to { transform: translateY(100vh); }
      }
    `}</style>
  </div>
);

export const AIBuilder: React.FC = () => {
  const [systemType, setSystemType] = useState('LIMS');
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<URSResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!description.trim()) return;
    setIsLoading(true);
    setError(null);
    try {
      const data = await generateURS(description, systemType);
      setResult(data);
    } catch (err) {
      setError("Failed to generate URS. Please check your API key or try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const getPriorityData = () => {
    if (!result) return [];
    const counts = { High: 0, Medium: 0, Low: 0 };
    result.items.forEach(item => {
      counts[item.priority]++;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  };

  const COLORS = { High: '#f87171', Medium: '#facc15', Low: '#22d3ee' };

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 md:px-8 bg-slate-950 overflow-hidden">
      <CircuitBackground />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-8 relative z-10">

        {/* Input Panel */}
        <div className="lg:col-span-4 space-y-6">
          <div className="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl bg-slate-900/40">
            <div className="flex items-center gap-4 mb-8">
              <div className="p-3 bg-cyan-950/50 rounded-xl border border-cyan-500/30 shadow-lg shadow-cyan-500/10">
                <Terminal className="w-6 h-6 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-white tracking-tight">URS Intelligence</h2>
                <p className="text-xs text-slate-500 uppercase tracking-widest font-semibold">Engineered Generation</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">System Architecture</label>
                <select
                  value={systemType}
                  onChange={(e) => setSystemType(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none transition-all appearance-none cursor-pointer hover:border-slate-700"
                >
                  <option value="LIMS">Laboratory Information Management (LIMS)</option>
                  <option value="MES">Manufacturing Execution System (MES)</option>
                  <option value="QMS">Quality Management System (QMS)</option>
                  <option value="SCADA">SCADA / Automation</option>
                  <option value="ERP">ERP (Pharma Module)</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Functional Requirements</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe technical constraints, regulatory needs, and operational workflows..."
                  className="w-full h-48 bg-slate-950 border border-slate-800 text-slate-200 rounded-xl p-4 focus:ring-2 focus:ring-cyan-500/50 focus:outline-none placeholder:text-slate-700 resize-none text-sm transition-all"
                />
              </div>

              <div className="pt-2">
                <Button
                  onClick={handleGenerate}
                  isLoading={isLoading}
                  variant="primary"
                  className="w-full py-4 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-xl shadow-cyan-500/20"
                >
                  {isLoading ? 'Processing Neural Model...' : 'Generate Compliance Draft'}
                </Button>
              </div>

              {error && (
                <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl flex items-start gap-3 text-red-400 text-sm animate-in fade-in zoom-in duration-300">
                  <AlertCircle className="w-5 h-5 shrink-0" />
                  <p className="leading-relaxed">{error}</p>
                </div>
              )}
            </div>
          </div>

          <div className="bg-slate-900/30 border border-white/5 rounded-2xl p-6 backdrop-blur-sm">
            <h3 className="text-xs font-bold text-cyan-500 mb-3 uppercase tracking-widest">Compliance Protocol</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our AI engine is trained on 21 CFR Part 11 and GAMP 5 methodologies. For optimal results, specify if the system is Category 3, 4, or 5.
            </p>
          </div>
        </div>

        {/* Output Panel */}
        <div className="lg:col-span-8">
          {result ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-right-8 duration-700">

              {/* Header Card */}
              <div className="glass-panel p-8 rounded-2xl border border-white/5 shadow-2xl flex flex-col md:flex-row justify-between md:items-center gap-6 bg-slate-900/40">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-green-400" />
                    <h1 className="text-2xl font-bold text-white">{result.projectName}</h1>
                  </div>
                  <p className="text-slate-400 text-sm max-w-xl">{result.summary}</p>
                </div>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-700 hover:border-cyan-500/50 text-slate-300 hover:text-white rounded-lg transition-all text-xs font-bold uppercase tracking-wider">
                    <Copy className="w-4 h-4" /> Copy
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 bg-cyan-950/50 border border-cyan-500/30 text-cyan-400 hover:bg-cyan-600 hover:text-white rounded-lg transition-all text-xs font-bold uppercase tracking-wider shadow-lg shadow-cyan-500/10">
                    <Download className="w-4 h-4" /> Export
                  </button>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                {/* Stats */}
                <div className="glass-panel p-8 rounded-2xl md:col-span-1 border border-white/5 bg-slate-900/40">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6">Risk Assessment</h4>
                  <div className="h-48 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={getPriorityData()}>
                        <XAxis dataKey="name" tick={{ fill: '#475569', fontSize: 10, fontWeight: 600 }} axisLine={false} tickLine={false} />
                        <YAxis hide />
                        <Tooltip
                          contentStyle={{ backgroundColor: '#020617', border: '1px solid #1e293b', borderRadius: '12px' }}
                          itemStyle={{ color: '#fff', fontSize: '12px' }}
                          cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                        />
                        <Bar dataKey="value" radius={[6, 6, 6, 6]} barSize={40}>
                          {getPriorityData().map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.name as keyof typeof COLORS]} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Requirements Table */}
                <div className="glass-panel rounded-2xl overflow-hidden md:col-span-2 border border-white/5 shadow-2xl bg-slate-900/40">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                      <thead className="bg-slate-950 text-[10px] uppercase text-slate-500 font-bold tracking-widest border-b border-white/5">
                        <tr>
                          <th className="px-8 py-5">Control ID</th>
                          <th className="px-8 py-5">Requirement Description</th>
                          <th className="px-8 py-5">Criticality</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                        {result.items.map((item) => (
                          <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                            <td className="px-8 py-6 font-mono text-cyan-400 font-bold">{item.id}</td>
                            <td className="px-8 py-6">
                              <div className="text-slate-100 font-semibold mb-1 group-hover:text-white transition-colors">{item.requirement}</div>
                              <div className="text-xs text-slate-500 leading-relaxed">{item.rationale}</div>
                            </td>
                            <td className="px-8 py-6">
                              <span className={`inline-flex items-center px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-widest ${item.priority === 'High' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                                  item.priority === 'Medium' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                                    'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
                                }`}>
                                {item.priority}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

            </div>
          ) : (
            <div className="h-full min-h-[600px] flex flex-col items-center justify-center text-center glass-panel rounded-3xl border-dashed border-2 border-slate-800 p-16 bg-slate-950/20 mb-8">
              <div className="w-24 h-24 rounded-3xl bg-slate-900/80 flex items-center justify-center mb-8 border border-white/5 shadow-2xl group animate-bounce duration-[3000ms]">
                <FileText className="w-12 h-12 text-slate-700 group-hover:text-cyan-500 transition-colors" />
              </div>
              <h3 className="text-2xl font-bold text-slate-300 mb-3 tracking-tight">Requirement Engine Ready</h3>
              <p className="text-slate-500 max-w-sm mx-auto leading-relaxed">
                Provide your project parameters to generate a high-fidelity Validation Protocol draft.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};