import React from 'react';
import { Layers, Linkedin, Mail } from 'lucide-react';
import { AppView } from '../types';

interface FooterProps {
  onChangeView: (view: AppView) => void;
}

export const Footer: React.FC<FooterProps> = ({ onChangeView }) => {
  return (
    <footer className="bg-slate-950 border-t border-white/5 pt-20 pb-10 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">
              Genval<span className="text-slate-400 font-light">Lake</span>
            </span>
          </div>
          <p className="text-slate-400 text-sm max-w-sm leading-relaxed">
            Leading the transformation in Life Sciences through engineered compliance and intelligent automation. We bridge the gap between regulatory requirements and operational reality.
          </p>
          <div className="flex gap-4">
            <a href="https://www.linkedin.com/company/genval-lake-consulting/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all">
              <Linkedin size={18} />
            </a>
            <a href="mailto:lpholien@gmail.com" className="w-10 h-10 rounded-lg bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-cyan-400 hover:border-cyan-400/50 transition-all">
              <Mail size={18} />
            </a>
          </div>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Solutions</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="/#services" className="hover:text-cyan-400 transition-colors">CSV & CSA Strategy</a></li>
            <li><a href="/#services" className="hover:text-cyan-400 transition-colors">MES Implementation</a></li>
            <li><a href="/#services" className="hover:text-cyan-400 transition-colors">Data Integrity Audit</a></li>
            <li><a href="/#services" className="hover:text-cyan-400 transition-colors">Smart Manufacturing</a></li>
          </ul>
        </div>

        <div>
          <h4 className="text-white font-bold mb-6 uppercase tracking-widest text-xs">Company</h4>
          <ul className="space-y-4 text-sm text-slate-400">
            <li><a href="/#about" className="hover:text-cyan-400 transition-colors">About Genval Lake</a></li>
            <li><a href="/#services" className="hover:text-cyan-400 transition-colors">Methodology</a></li>
            <li>
              <button
                onClick={() => onChangeView(AppView.BLOG)}
                className="hover:text-cyan-400 transition-colors"
              >
                Blog
              </button>
            </li>
            <li><a href="/#contact" className="hover:text-cyan-400 transition-colors">Contact</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/5 flex flex-col md:row justify-between items-center gap-6">
        <div className="text-slate-500 text-xs uppercase tracking-widest">
          &copy; {new Date().getFullYear()} Genval Lake Consulting. Engineered with Precision.
        </div>
        <div className="flex gap-8 text-xs font-medium text-slate-500 uppercase tracking-widest">
          <a href="/#contact" className="hover:text-white transition-colors">Privacy Policy</a>
          <a href="/#contact" className="hover:text-white transition-colors">Terms of Service</a>
          <a href="/#services" className="hover:text-white transition-colors">Quality Manual</a>
        </div>
      </div>
    </footer>
  );
};
