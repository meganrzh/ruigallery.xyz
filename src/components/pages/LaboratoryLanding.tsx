import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ChronologicalIndex } from '../laboratory/ChronologicalIndex';
import { CollectionsList } from '../laboratory/CollectionsList';
import { Database, Filter, Hash, Sparkles } from 'lucide-react';

export const LaboratoryLanding: React.FC = () => {
  const { getChronologicalEntries, threads } = useData();
  const [selectedThread, setSelectedThread] = useState<string | null>(null);

  const allEntries = getChronologicalEntries();
  const filteredEntries = selectedThread
    ? allEntries.filter((e) => {
        const threadObj = threads.find((t) => t.slug === selectedThread || t.id === selectedThread);
        return threadObj ? e.threadIds.includes(threadObj.id) : true;
      })
    : allEntries;

  return (
    <div id="laboratory-landing-container" className="w-full pb-24">
      {/* Laboratory Hero/Charter Header */}
      <header className="border-b archival-border bg-[#FAF9F5] py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-4">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8C8880]">
            <span className="w-2 h-2 rounded-full bg-[#171717]"></span>
            <span>RUI Research Laboratory &amp; Open Notebook</span>
            <span className="text-[#C5C2BA]">/</span>
            <span>Index 02</span>
          </div>

          <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4">
            <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171717] font-normal tracking-tight">
              Laboratory
            </h1>
            <div className="flex items-center space-x-4 text-xs font-mono text-[#66645E]">
              <a
                href="/archive"
                className="hover:text-[#171717] flex items-center space-x-1 underline underline-offset-4"
              >
                <Database className="w-3.5 h-3.5" />
                <span>Open Full Database Index</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <p className="font-serif text-lg text-[#474540] max-w-3xl leading-relaxed pt-2">
            The Laboratory represents exploratory and developing inquiries. Chronological field
            observations, epigraphic rubbings, and taxonomic notes organized by Collection and Study.
          </p>

          {/* Quick Horizontal Threads Bar */}
          <div className="pt-4 border-t archival-border flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#8C8880] uppercase flex items-center space-x-1">
              <Hash className="w-3 h-3" />
              <span>Transversal Threads:</span>
            </span>
            <button
              onClick={() => setSelectedThread(null)}
              className={`px-2 py-0.5 rounded text-xs transition-colors ${
                selectedThread === null
                  ? 'bg-[#171717] text-[#FCFBF8]'
                  : 'bg-[#EFECE6] text-[#474540] hover:bg-[#DEDBD2]'
              }`}
            >
              All Threads
            </button>
            {threads.map((thread) => (
              <button
                key={thread.id}
                onClick={() =>
                  setSelectedThread(selectedThread === thread.slug ? null : thread.slug)
                }
                className={`px-2 py-0.5 rounded text-xs transition-colors ${
                  selectedThread === thread.slug
                    ? 'bg-[#171717] text-[#FCFBF8]'
                    : 'bg-[#EFECE6] text-[#474540] hover:bg-[#DEDBD2]'
                }`}
              >
                #{thread.name}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Main Content Area: Simultaneous Desktop Chronology + Collections */}
      <main className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-12 md:pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Main Primary Area: Chronological Entries (7 cols on desktop) */}
          <div className="lg:col-span-8 order-2 lg:order-1">
            <ChronologicalIndex
              entries={filteredEntries}
              activeThreadFilter={selectedThread}
              onSelectThread={setSelectedThread}
            />
          </div>

          {/* Secondary Area: Collections (4 cols on desktop, visible simultaneously) */}
          <div className="lg:col-span-4 order-1 lg:order-2">
            <CollectionsList />
          </div>
        </div>
      </main>
    </div>
  );
};
