import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { AIBuilder } from './components/AIBuilder';
import { Footer } from './components/Footer';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar currentView={currentView} onChangeView={setCurrentView} />
      
      {currentView === AppView.HOME ? (
        <main>
          <Hero onLaunch={() => setCurrentView(AppView.BUILDER)} />
          <Services />
          <About />
          <Contact />
        </main>
      ) : (
        <main>
          <AIBuilder />
        </main>
      )}
      
      <Footer />
    </div>
  );
};

export default App;