import React, { useState } from 'react';
import { useRouter } from '../../router/RouterContext';
import { useStyle } from '../../context/StyleContext';
import { Menu, X, Terminal, ArrowUpRight, Sparkles } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentRoute } = useRouter();
  const { settings, openStyleModal } = useStyle();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'Work', href: '/', active: currentRoute.name === 'home' || currentRoute.name === 'work' },
    { label: 'Notebook', href: '/laboratory', active: currentRoute.name === 'laboratory' || currentRoute.name === 'collection' || currentRoute.name === 'study' || currentRoute.name === 'entry' },
    { label: 'Archive Index', href: '/archive', active: currentRoute.name === 'archive' },
    { label: 'About', href: '/about', active: currentRoute.name === 'about' },
  ];

  return (
    <header
      id="main-navigation-header"
      className="sticky top-0 z-50 bg-[var(--bg-primary,#FCFBF8)]/95 backdrop-blur-md border-b archival-border transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 h-16 flex items-center justify-between">
        {/* Left: Brand Identity Wordmark */}
        <div className="flex items-center space-x-3">
          <a
            href="/"
            className="group flex items-baseline space-x-2 font-serif text-xl tracking-tight text-[var(--text-primary,#171717)] hover:opacity-80 transition-opacity"
          >
            <span className="font-bold text-2xl tracking-tighter">RUI</span>
            <span className="font-cjk text-base text-[var(--text-muted,#73716B)] group-hover:text-[var(--text-primary,#171717)] transition-colors">
              睿
            </span>
          </a>
          <span className="hidden md:inline-block text-xs font-mono text-[var(--text-muted,#A3A099)] border-l archival-border pl-3">
            ARCHIVE &amp; LAB
          </span>
        </div>

        {/* Center/Right: Desktop Navigation Links */}
        <nav className="hidden md:flex items-center space-x-7 text-sm">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className={`transition-colors py-1 relative ${
                item.active
                  ? 'text-[var(--text-primary,#171717)] font-medium'
                  : 'text-[var(--text-secondary,#615E58)] hover:text-[var(--text-primary,#171717)]'
              }`}
            >
              {item.label}
              {item.active && (
                <span className="absolute -bottom-1 left-0 right-0 h-[1.5px] bg-[var(--text-primary,#171717)]" />
              )}
            </a>
          ))}

          {/* Style & Calligraphy Switcher Trigger */}
          <div className="border-l archival-border pl-6 flex items-center space-x-3">
            <button
              onClick={openStyleModal}
              id="header-style-switcher-btn"
              className="flex items-center space-x-1.5 text-xs font-mono px-3 py-1 rounded border archival-border hover:border-[var(--text-primary,#171717)] text-[var(--text-primary,#171717)] bg-[var(--bg-surface,#FFFFFF)] hover:bg-[var(--bg-subtle,#F4F1EA)] transition-all shadow-xs"
              title="Change visual styles, calligraphy scripts, themes & typography"
            >
              <Sparkles className="w-3.5 h-3.5 text-[var(--accent-color,#171717)]" />
              <span>Styles:</span>
              <span className="uppercase font-semibold text-[var(--text-primary,#171717)]">
                {settings.calligraphyScript}
              </span>
            </button>

            {/* Admin prototype trigger */}
            <a
              href="/admin"
              className={`flex items-center space-x-1 text-xs font-mono px-2.5 py-1 rounded border transition-colors ${
                currentRoute.name === 'admin'
                  ? 'bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] border-[var(--text-primary,#171717)]'
                  : 'text-[var(--text-secondary,#615E58)] border-archival hover:border-[var(--text-primary,#171717)] hover:text-[var(--text-primary,#171717)]'
              }`}
              title="Open Mock Administrative Content Studio"
            >
              <Terminal className="w-3 h-3" />
              <span>/admin</span>
            </a>
          </div>
        </nav>

        {/* Mobile Controls */}
        <div className="flex items-center space-x-2 md:hidden">
          <button
            onClick={openStyleModal}
            className="flex items-center space-x-1 text-xs font-mono px-2.5 py-1 border archival-border rounded text-[var(--text-primary,#171717)] bg-[var(--bg-surface,#FFFFFF)]"
            title="Styles"
          >
            <Sparkles className="w-3 h-3 text-[var(--accent-color,#171717)]" />
            <span className="uppercase text-[10px]">{settings.calligraphyScript}</span>
          </button>
          <a
            href="/admin"
            className="text-xs font-mono px-2 py-1 border archival-border text-[var(--text-secondary,#615E58)] rounded"
          >
            admin
          </a>
          <button
            id="mobile-nav-toggle-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[var(--text-primary,#171717)] hover:bg-[var(--bg-subtle,#F2EFE9)] rounded"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b archival-border bg-[var(--bg-primary,#FCFBF8)] px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3 text-base">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`py-2 flex items-center justify-between border-b archival-border ${
                  item.active
                    ? 'text-[var(--text-primary,#171717)] font-semibold'
                    : 'text-[var(--text-secondary,#615E58)] hover:text-[var(--text-primary,#171717)]'
                }`}
              >
                <span>{item.label}</span>
                <ArrowUpRight className="w-4 h-4 text-[var(--text-muted,#A3A099)]" />
              </a>
            ))}

            {/* Mobile Styles Action */}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                openStyleModal();
              }}
              className="py-2.5 text-xs font-mono flex items-center justify-between text-[var(--text-primary,#171717)] font-medium border-b archival-border w-full text-left"
            >
              <span className="flex items-center space-x-2">
                <Sparkles className="w-3.5 h-3.5 text-[var(--accent-color,#171717)]" />
                <span>Style &amp; Calligraphy Engine ({settings.theme} / {settings.calligraphyScript})</span>
              </span>
              <span>⚙</span>
            </button>

            <a
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2 text-xs font-mono flex items-center justify-between text-[var(--text-primary,#171717)] font-medium pt-2"
            >
              <span className="flex items-center space-x-2">
                <Terminal className="w-3.5 h-3.5" />
                <span>Mock Admin Content Studio</span>
              </span>
              <span>↗</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};
