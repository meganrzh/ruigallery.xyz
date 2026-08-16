import React from 'react';
import { useData } from '../../context/DataContext';

export const Footer: React.FC = () => {
  const { authorProfile } = useData();

  return (
    <footer
      id="rui-global-footer"
      className="w-full bg-[var(--bg-subtle,#FAF9F5)] border-t archival-border text-[var(--text-secondary,#57554F)] text-xs font-mono py-12 md:py-16 transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Col 1: Identity & Meaning */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-baseline space-x-2">
              <span className="font-serif text-lg font-bold text-[var(--text-primary,#171717)]">RUI</span>
              <span className="font-cjk text-base text-[var(--text-muted,#73716B)]">睿</span>
              <span className="text-[var(--text-muted,#A3A099)]">/</span>
              <span className="text-xs font-mono text-[var(--text-muted,#78756E)]">ruigallery.xyz</span>
            </div>
            <p className="text-xs font-sans text-[var(--text-secondary,#6B6861)] max-w-md leading-relaxed">
              An ongoing artistic repository and research ecosystem. Curated essays, field studies,
              diaspora typography, and taxonomic systems.
            </p>
            <div className="pt-2 text-[11px] text-[var(--text-muted,#8C8880)] space-y-1">
              <div>LOS ANGELES / SAN FRANCISCO / VENICE</div>
              <div>REVISION SYSTEM: RUI REV 03 • OPEN SCHEMA</div>
            </div>
          </div>

          {/* Col 2: Navigation Index */}
          <div className="space-y-2">
            <div className="text-[var(--text-primary,#171717)] font-semibold tracking-wider uppercase mb-3">
              Navigation
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-[var(--text-primary,#171717)] transition-colors">
                  Curated Work
                </a>
              </li>
              <li>
                <a href="/laboratory" className="hover:text-[var(--text-primary,#171717)] transition-colors">
                  Laboratory Notebook
                </a>
              </li>
              <li>
                <a href="/archive" className="hover:text-[var(--text-primary,#171717)] transition-colors">
                  Archive Index (Table)
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-[var(--text-primary,#171717)] transition-colors">
                  About &amp; Résumé
                </a>
              </li>
              <li>
                <a href="/admin" className="hover:text-[var(--text-primary,#171717)] transition-colors">
                  Content Management (/admin)
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Network & Contact */}
          <div className="space-y-2">
            <div className="text-[var(--text-primary,#171717)] font-semibold tracking-wider uppercase mb-3">
              Contact &amp; Links
            </div>
            <ul className="space-y-2">
              {authorProfile.socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.url}
                    className="hover:text-[var(--text-primary,#171717)] transition-colors flex items-center justify-between"
                  >
                    <span>{s.label}</span>
                    <span className="text-[var(--text-muted,#A3A099)]">↗</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom fine rule */}
        <div className="pt-8 border-t archival-border flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[var(--text-muted,#8C8880)]">
          <div>© {new Date().getFullYear()} RUI. All inquiries, field notes, and artistic rights reserved.</div>
          <div className="flex items-center space-x-4">
            <span>CATALOGUE RAISONNÉ</span>
            <span>•</span>
            <span className="text-[var(--text-primary,#171717)]">SYSTEM STABLE</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
