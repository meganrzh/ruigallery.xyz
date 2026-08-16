import React from 'react';
import { useData } from '../../context/DataContext';
import { Entry } from '../../types';
import { ArrowUpRight, Hash, Calendar, Layers } from 'lucide-react';

interface ChronologicalIndexProps {
  entries: Entry[];
  activeThreadFilter?: string | null;
  onSelectThread?: (threadSlug: string | null) => void;
}

export const ChronologicalIndex: React.FC<ChronologicalIndexProps> = ({
  entries,
  activeThreadFilter,
  onSelectThread,
}) => {
  const { getCollectionById, getStudyById, getThreadById } = useData();

  return (
    <div id="laboratory-chronological-index" className="w-full">
      {/* Header bar of the index */}
      <div className="flex items-baseline justify-between border-b-2 border-[#171717] pb-3 mb-6">
        <div className="flex items-baseline space-x-3">
          <h3 className="font-serif text-2xl text-[#171717] font-normal tracking-tight">
            Chronological Index
          </h3>
          <span className="text-xs font-mono text-[#8C8880] uppercase">
            ({entries.length} Entries Recorded)
          </span>
        </div>
        <div className="hidden sm:block text-[11px] font-mono text-[#8C8880] uppercase">
          Ordered by: Date (DESC)
        </div>
      </div>

      {/* List of Entries in clean archival table/list format */}
      <div className="divide-y archival-border border-b archival-border">
        {entries.length === 0 ? (
          <div className="py-12 text-center text-sm font-mono text-[#8C8880]">
            No entries found matching current filter parameters.
          </div>
        ) : (
          entries.map((entry) => {
            const collection = getCollectionById(entry.collectionId);
            const study = getStudyById(entry.studyId);

            return (
              <div
                key={entry.id}
                id={`lab-row-${entry.entryNumber}`}
                className="py-5 px-3 sm:px-4 hover:bg-[#FAF9F5] transition-colors group"
              >
                <div className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-4 items-baseline">
                  {/* Date & Number Column */}
                  <div className="md:col-span-3 flex items-center space-x-3 text-xs font-mono text-[#73716B]">
                    <span className="text-[#171717] font-medium">{entry.createdDate}</span>
                    <span className="text-[#C5C2BA]">/</span>
                    <span className="font-bold text-[#171717]">NO. {entry.entryNumber}</span>
                    <span className="text-[10px] text-[#A3A099] border archival-border px-1 py-0.2">
                      {entry.revision}
                    </span>
                  </div>

                  {/* Title & Excerpt Column */}
                  <div className="md:col-span-5 space-y-1">
                    <a
                      href={`/entry/${entry.slug}`}
                      className="font-serif text-base sm:text-lg text-[#171717] group-hover:underline font-normal block"
                    >
                      {entry.title}
                    </a>
                    {entry.summary && (
                      <p className="font-sans text-xs text-[#6B6861] line-clamp-1">
                        {entry.summary}
                      </p>
                    )}
                  </div>

                  {/* Study & Collection Reference */}
                  <div className="md:col-span-2 text-xs font-mono text-[#66645E]">
                    {study ? (
                      <a
                        href={`/study/${study.slug}`}
                        className="hover:text-[#171717] hover:underline block truncate text-[#474540]"
                        title={study.title}
                      >
                        {study.title}
                      </a>
                    ) : (
                      <span>—</span>
                    )}
                    {collection && (
                      <span className="text-[10px] text-[#A3A099] block truncate">
                        {collection.title}
                      </span>
                    )}
                  </div>

                  {/* Threads & Quick Link */}
                  <div className="md:col-span-2 flex flex-wrap items-center justify-start md:justify-end gap-1.5 pt-1 md:pt-0">
                    {entry.threadIds.slice(0, 2).map((tId) => {
                      const thread = getThreadById(tId);
                      if (!thread) return null;
                      return (
                        <a
                          key={tId}
                          href={`/archive?thread=${thread.slug}`}
                          className="text-[10px] font-mono px-1.5 py-0.5 bg-[#EFECE6] hover:bg-[#171717] hover:text-[#FCFBF8] text-[#52504B] rounded-sm transition-colors"
                        >
                          #{thread.name}
                        </a>
                      );
                    })}
                    <a
                      href={`/entry/${entry.slug}`}
                      className="text-[#8C8880] group-hover:text-[#171717] p-1 transition-colors hidden md:inline-block"
                      title="Open Entry"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
