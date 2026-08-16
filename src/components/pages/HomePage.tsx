import React from 'react';
import { RuiHero } from '../hero/RuiHero';
import { CuratedEditorialFeed } from '../curated/CuratedEditorialFeed';
import { useData } from '../../context/DataContext';
import { Compass, Database, ArrowUpRight, BookOpen, Layers } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { getChronologicalEntries, collections } = useData();
  const recentEntries = getChronologicalEntries().slice(0, 5);

  return (
    <div id="rui-home-page" className="w-full">
      {/* Section 1: Hero with RUI & Self-Writing 睿 Calligraphy */}
      <RuiHero />

      {/* Section 2: Curated Works Editorial Composition */}
      <CuratedEditorialFeed />

      {/* Section 3: Laboratory Cross-Reference & Live Notebook Bridge */}
      <section
        id="home-laboratory-bridge"
        className="w-full py-16 md:py-20 bg-[#FAF9F5] border-t border-b archival-border"
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
            {/* Left overview */}
            <div className="lg:col-span-5 space-y-4">
              <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8C8880]">
                <Compass className="w-3.5 h-3.5 text-[#171717]" />
                <span>Section 03 // Open Laboratory</span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
                Exploratory Studies &amp; Working Notes
              </h2>
              <p className="font-serif text-base sm:text-lg text-[#474540] leading-relaxed">
                The Laboratory serves as an open research desk for developing inquiries, fieldwork
                rubbings, and taxonomic systems before they resolve into curated works.
              </p>
              <div className="pt-4 flex flex-wrap gap-4 text-xs font-mono">
                <a
                  href="/laboratory"
                  className="px-4 py-2.5 bg-[#171717] text-[#FCFBF8] hover:bg-[#33312C] transition-colors inline-flex items-center space-x-2 uppercase tracking-wider font-medium"
                >
                  <span>Enter Laboratory</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href="/archive"
                  className="px-4 py-2.5 bg-[#FCFBF8] border archival-border text-[#171717] hover:border-[#171717] transition-colors inline-flex items-center space-x-2 uppercase tracking-wider"
                >
                  <span>View Archive Index</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>

            {/* Right recent entries preview */}
            <div className="lg:col-span-7 space-y-3">
              <div className="flex items-center justify-between text-xs font-mono uppercase text-[#8C8880] border-b archival-border pb-2">
                <span>Recent Field Entries</span>
                <span>Active Revisions</span>
              </div>
              <div className="divide-y archival-border bg-[#FCFBF8] border archival-border">
                {recentEntries.map((ent) => (
                  <a
                    key={ent.id}
                    href={`/entry/${ent.slug}`}
                    className="p-3.5 sm:p-4 flex items-baseline justify-between hover:bg-[#FAF9F5] transition-colors group block text-xs font-mono"
                  >
                    <div className="flex items-baseline space-x-3 truncate pr-4">
                      <span className="font-bold text-[#171717] shrink-0">
                        NO. {ent.entryNumber}
                      </span>
                      <span className="font-sans text-sm text-[#171717] group-hover:underline truncate">
                        {ent.title}
                      </span>
                    </div>
                    <span className="text-[#8C8880] shrink-0">{ent.createdDate}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
