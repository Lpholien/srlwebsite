import React, { useState, useEffect } from 'react';
import { Layers, Menu, X, BookOpen } from 'lucide-react';
import { AppView } from '../types';
import { Button } from './Button';

interface NavbarProps {
  currentView: AppView;
  onChangeView: (view: AppView) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, onChangeView }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const anchorLinks = [
    { name: 'Services', href: '#services' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled
      ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/5 py-4'
      : 'bg-transparent py-6'
      }`}>
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

        {/* Logo */}
        <div
          className="flex flex-col cursor-pointer group select-none relative"
          onClick={() => onChangeView(AppView.HOME)}
        >
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform">
              <Layers className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl md:text-2xl font-bold tracking-tight text-white group-hover:text-cyan-400 transition-colors">
              Genval<span className="text-slate-400 font-light group-hover:text-slate-300 transition-colors">Lake</span>
            </span>
          </div>
          <div className="absolute -bottom-1 left-10 w-0 h-0.5 bg-gradient-to-r from-cyan-400 to-blue-500 group-hover:w-20 transition-all duration-300"></div>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-10">
          <div className="flex items-center gap-8 mr-4">
            {currentView === AppView.HOME && anchorLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-slate-400 hover:text-white transition-all relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-400 transition-all group-hover:w-full"></span>
              </a>
            ))}
            <button
              onClick={() => onChangeView(AppView.BLOG)}
              className={`text-sm font-medium transition-all relative group ${currentView === AppView.BLOG || currentView === AppView.BLOG_ARTICLE
                ? 'text-cyan-400'
                : 'text-slate-400 hover:text-white'
                }`}
            >
              Blog
              <span className={`absolute -bottom-1 left-0 h-0.5 bg-cyan-400 transition-all ${currentView === AppView.BLOG || currentView === AppView.BLOG_ARTICLE ? 'w-full' : 'w-0 group-hover:w-full'
                }`}></span>
            </button>
          </div>

          <div className="h-6 w-px bg-slate-800 mx-2"></div>

          {currentView === AppView.HOME ? (
            <Button
              variant="primary"
              onClick={() => onChangeView(AppView.BUILDER)}
              className="bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold px-6 border-none shadow-lg shadow-cyan-500/20"
            >
              Launch AI Builder
            </Button>
          ) : (
            <Button
              variant="secondary"
              onClick={() => onChangeView(AppView.HOME)}
              className="border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white"
            >
              Back to Home
            </Button>
          )}
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg bg-slate-900 border border-slate-800 text-slate-300"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-950/95 backdrop-blur-2xl border-b border-slate-800 p-8 flex flex-col gap-6 animate-in slide-in-from-top duration-300">
          {currentView === AppView.HOME && anchorLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-xl font-medium text-slate-300 hover:text-cyan-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </a>
          ))}
          <button
            onClick={() => {
              onChangeView(AppView.BLOG);
              setMobileMenuOpen(false);
            }}
            className="text-xl font-medium text-slate-300 hover:text-cyan-400 text-left"
          >
            Blog
          </button>
          <Button
            variant="primary"
            onClick={() => {
              onChangeView(currentView === AppView.HOME ? AppView.BUILDER : AppView.HOME);
              setMobileMenuOpen(false);
            }}
            className="w-full py-4 text-lg"
          >
            {currentView === AppView.HOME ? 'Launch AI Builder' : 'Back to Home'}
          </Button>
        </div>
      )}
    </nav>
  );
};