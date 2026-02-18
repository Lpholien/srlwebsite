import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { About } from './components/About';
import { Contact } from './components/Contact';
import { AIBuilder } from './components/AIBuilder';
import { BlogList } from './components/BlogList';
import { BlogArticle } from './components/BlogArticle';
import { Footer } from './components/Footer';
import { AppView } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<AppView>(AppView.HOME);
  const [selectedSlug, setSelectedSlug] = useState<string | null>(null);

  // Pathname-based routing for crawlable blog URLs.
  useEffect(() => {
    const handleLocation = () => {
      const path = window.location.pathname.replace(/\/+$/, '') || '/';

      if (path.startsWith('/blog/')) {
        const slug = decodeURIComponent(path.replace('/blog/', ''));
        setSelectedSlug(slug);
        setCurrentView(AppView.BLOG_ARTICLE);
      } else if (path === '/blog') {
        setSelectedSlug(null);
        setCurrentView(AppView.BLOG);
      } else if (path === '/builder') {
        setSelectedSlug(null);
        setCurrentView(AppView.BUILDER);
      } else {
        setSelectedSlug(null);
        setCurrentView(AppView.HOME);
      }
    };

    handleLocation();
    window.addEventListener('popstate', handleLocation);
    return () => window.removeEventListener('popstate', handleLocation);
  }, []);

  const navigate = (view: AppView, slug?: string) => {
    const pushPath = (path: string) => {
      if (window.location.pathname !== path) {
        window.history.pushState(null, '', path);
      }
    };

    if (view === AppView.BLOG) {
      pushPath('/blog');
    } else if (view === AppView.BLOG_ARTICLE && slug) {
      pushPath(`/blog/${encodeURIComponent(slug)}`);
    } else if (view === AppView.BUILDER) {
      pushPath('/builder');
    } else if (view === AppView.HOME) {
      pushPath('/');
    }

    setCurrentView(view);
    if (slug) setSelectedSlug(slug);
  };

  const handleSelectArticle = (slug: string) => {
    navigate(AppView.BLOG_ARTICLE, slug);
  };

  const handleBackToBlog = () => {
    navigate(AppView.BLOG);
    setSelectedSlug(null);
  };

  const handleChangeView = (view: AppView) => {
    navigate(view);
    if (view !== AppView.BLOG_ARTICLE) {
      setSelectedSlug(null);
    }
  };

  const renderView = () => {
    switch (currentView) {
      case AppView.BLOG:
        return (
          <main>
            <BlogList onSelectArticle={handleSelectArticle} />
          </main>
        );
      case AppView.BLOG_ARTICLE:
        return (
          <main>
            <BlogArticle
              slug={selectedSlug || ''}
              onBack={handleBackToBlog}
              onSelectArticle={handleSelectArticle}
            />
          </main>
        );
      case AppView.BUILDER:
        return (
          <main>
            <AIBuilder />
          </main>
        );
      case AppView.HOME:
      default:
        return (
          <main>
            <Hero onLaunch={() => handleChangeView(AppView.BUILDER)} />
            <Services />
            <About />
            <Contact />
          </main>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-200 font-sans selection:bg-cyan-500/30 selection:text-cyan-100">
      <Navbar currentView={currentView} onChangeView={handleChangeView} />
      {renderView()}
      <Footer onChangeView={handleChangeView} />
    </div>
  );
};

export default App;
