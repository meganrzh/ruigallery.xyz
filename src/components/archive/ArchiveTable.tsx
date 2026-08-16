import React, { useMemo, useState } from 'react';
import { useData } from '../../context/DataContext';
import { useRouter } from '../../router/RouterContext';
import { ArrowUpRight, Filter, Search, X, RotateCcw, Database } from 'lucide-react';

interface ArchiveTableProps {
  initialThread?: string;
  initialCollection?: string;
}

export const ArchiveTable: React.FC<ArchiveTableProps> = ({
  initialThread,
  initialCollection,
}) => {
  const { entries, collections, studies, threads, getCollectionById, getStudyById, getThreadById } = useData();
  const { currentRoute, navigate } = useRouter();

  // Filter state
  const [selectedCollection, setSelectedCollection] = useState<string>(
    initialCollection || currentRoute.queryParams.collection || 'all'
  );
  const [selectedThread, setSelectedThread] = useState<string>(
    initialThread || currentRoute.queryParams.thread || 'all'
  );
  const [searchQuery, setSearchQuery] = useState<string>(
    currentRoute.queryParams.q || ''
  );
  const [sortOrder, setSortOrder] = useState<'desc' | 'asc'>('desc');

  // Filtered and sorted dataset
  const filteredEntries = useMemo(() => {
    return entries
      .filter((entry) => {
        if (entry.visibility === 'hidden') return false;

        // Collection filter
        if (selectedCollection !== 'all') {
          const col = collections.find(
            (c) => c.slug === selectedCollection || c.id === selectedCollection
          );
          if (col && entry.collectionId !== col.id) return false;
        }

        // Thread filter
        if (selectedThread !== 'all') {
          const thr = threads.find(
            (t) => t.slug === selectedThread || t.id === selectedThread
          );
          if (thr && !entry.threadIds.includes(thr.id)) return false;
        }

        // Search query filter (matches title, summary, location, entry number, blocks)
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = entry.title.toLowerCase().includes(q);
          const matchNumber = entry.entryNumber.toLowerCase().includes(q);
          const matchLoc = entry.location.toLowerCase().includes(q);
          const matchSummary = entry.summary?.toLowerCase().includes(q) || false;
          return matchTitle || matchNumber || matchLoc || matchSummary;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortOrder === 'desc') {
          return b.createdDate.localeCompare(a.createdDate);
        }
        return a.createdDate.localeCompare(b.createdDate);
      });
  }, [entries, collections, threads, selectedCollection, selectedThread, searchQuery, sortOrder]);

  const hasActiveFilters =
    selectedCollection !== 'all' || selectedThread !== 'all' || searchQuery.trim() !== '';

  const clearAllFilters = () => {
    setSelectedCollection('all');
    setSelectedThread('all');
    setSearchQuery('');
  };

  return (
    <div id="archive-index-container" className="w-full space-y-8">
      {/* Index Introduction Bar */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b-2 border-[#171717] pb-6">
        <div>
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8C8880] mb-2">
            <Database className="w-3.5 h-3.5 text-[#171717]" />
            <span>Complete Database Index</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
            Archive Index
          </h1>
        </div>
        <div className="text-xs font-mono text-[#78756E] text-right">
          <span>{filteredEntries.length} OF {entries.length} RECORDS DISPLAYED</span>
        </div>
      </div>

      {/* Query & Filter Control Strip */}
      <div className="bg-[#FAF9F5] border archival-border p-4 sm:p-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono">
          {/* Keyword search input */}
          <div className="space-y-1 sm:col-span-2 lg:col-span-1">
            <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
              Search Index
            </label>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Title, keyword, location..."
                className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] placeholder-[#A3A099] focus:outline-none focus:border-[#171717]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2.5 top-2.5 text-[#8C8880] hover:text-[#171717]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>
          </div>

          {/* Collection Filter Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
              Filter by Collection
            </label>
            <select
              value={selectedCollection}
              onChange={(e) => setSelectedCollection(e.target.value)}
              className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717]"
            >
              <option value="all">All Collections ({collections.length})</option>
              {collections.map((c) => (
                <option key={c.id} value={c.slug}>
                  {c.title}
                </option>
              ))}
            </select>
          </div>

          {/* Thread Filter Dropdown */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
              Filter by Thread
            </label>
            <select
              value={selectedThread}
              onChange={(e) => setSelectedThread(e.target.value)}
              className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717]"
            >
              <option value="all">All Conceptual Threads ({threads.length})</option>
              {threads.map((t) => (
                <option key={t.id} value={t.slug}>
                  #{t.name}
                </option>
              ))}
            </select>
          </div>

          {/* Sort Order Toggle */}
          <div className="space-y-1">
            <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
              Chronology Order
            </label>
            <button
              onClick={() => setSortOrder(sortOrder === 'desc' ? 'asc' : 'desc')}
              className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] text-left hover:border-[#171717] flex items-center justify-between"
            >
              <span>{sortOrder === 'desc' ? 'Date (Newest First)' : 'Date (Oldest First)'}</span>
              <span className="text-[#8C8880]">{sortOrder === 'desc' ? '↓' : '↑'}</span>
            </button>
          </div>
        </div>

        {/* Active Filter Chips & Reset */}
        {hasActiveFilters && (
          <div className="pt-3 border-t archival-border flex flex-wrap items-center justify-between gap-2 text-xs font-mono">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[#8C8880] text-[11px] uppercase">Active filters:</span>
              {selectedCollection !== 'all' && (
                <span className="bg-[#EFECE6] px-2 py-0.5 rounded text-[11px] flex items-center space-x-1">
                  <span>Col: {collections.find((c) => c.slug === selectedCollection)?.title}</span>
                  <button onClick={() => setSelectedCollection('all')}>
                    <X className="w-3 h-3 text-[#78756E]" />
                  </button>
                </span>
              )}
              {selectedThread !== 'all' && (
                <span className="bg-[#EFECE6] px-2 py-0.5 rounded text-[11px] flex items-center space-x-1">
                  <span>Thread: #{threads.find((t) => t.slug === selectedThread)?.name}</span>
                  <button onClick={() => setSelectedThread('all')}>
                    <X className="w-3 h-3 text-[#78756E]" />
                  </button>
                </span>
              )}
              {searchQuery && (
                <span className="bg-[#EFECE6] px-2 py-0.5 rounded text-[11px] flex items-center space-x-1">
                  <span>Search: &ldquo;{searchQuery}&rdquo;</span>
                  <button onClick={() => setSearchQuery('')}>
                    <X className="w-3 h-3 text-[#78756E]" />
                  </button>
                </span>
              )}
            </div>

            <button
              onClick={clearAllFilters}
              className="text-[#171717] hover:underline flex items-center space-x-1 text-[11px] uppercase font-medium"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Clear Filters</span>
            </button>
          </div>
        )}
      </div>

      {/* Database-style Structured Table */}
      <div className="border archival-border bg-[#FCFBF8] overflow-x-auto">
        <table className="w-full text-left border-collapse text-xs font-mono">
          <thead>
            <tr className="bg-[#FAF9F5] border-b-2 border-[#171717] text-[#8C8880] uppercase tracking-wider text-[11px]">
              <th className="py-3 px-4 w-28">Date</th>
              <th className="py-3 px-4 w-20">Entry</th>
              <th className="py-3 px-4 w-16">Rev</th>
              <th className="py-3 px-4">Title &amp; Summary</th>
              <th className="py-3 px-4 w-44">Collection</th>
              <th className="py-3 px-4 w-44">Study</th>
              <th className="py-3 px-4 w-40">Threads</th>
              <th className="py-3 px-4 w-12 text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y archival-border">
            {filteredEntries.length === 0 ? (
              <tr>
                <td colSpan={8} className="py-12 text-center text-[#8C8880]">
                  No archival records match your criteria.
                </td>
              </tr>
            ) : (
              filteredEntries.map((entry) => {
                const collection = getCollectionById(entry.collectionId);
                const study = getStudyById(entry.studyId);

                return (
                  <tr
                    key={entry.id}
                    id={`archive-row-${entry.entryNumber}`}
                    className="hover:bg-[#FAF9F5] transition-colors group cursor-pointer"
                    onClick={() => navigate(`/entry/${entry.slug}`)}
                  >
                    {/* Date */}
                    <td className="py-3.5 px-4 text-[#171717] whitespace-nowrap">
                      {entry.createdDate}
                    </td>

                    {/* Entry # */}
                    <td className="py-3.5 px-4 font-bold text-[#171717]">
                      {entry.entryNumber}
                    </td>

                    {/* Revision */}
                    <td className="py-3.5 px-4 text-[#8C8880] text-[11px]">
                      {entry.revision}
                    </td>

                    {/* Title */}
                    <td className="py-3.5 px-4">
                      <a
                        href={`/entry/${entry.slug}`}
                        className="font-serif text-base text-[#171717] group-hover:underline block font-normal leading-snug"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {entry.title}
                      </a>
                      {entry.location && (
                        <span className="text-[10px] text-[#8C8880] block mt-0.5">
                          Loc: {entry.location}
                        </span>
                      )}
                    </td>

                    {/* Collection */}
                    <td className="py-3.5 px-4 text-[#52504B]">
                      {collection ? (
                        <a
                          href={`/collection/${collection.slug}`}
                          className="hover:underline hover:text-[#171717] block truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {collection.title}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>

                    {/* Study */}
                    <td className="py-3.5 px-4 text-[#52504B]">
                      {study ? (
                        <a
                          href={`/study/${study.slug}`}
                          className="hover:underline hover:text-[#171717] block truncate"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {study.title}
                        </a>
                      ) : (
                        '—'
                      )}
                    </td>

                    {/* Threads */}
                    <td className="py-3.5 px-4">
                      <div className="flex flex-wrap gap-1">
                        {entry.threadIds.map((tId) => {
                          const thread = getThreadById(tId);
                          if (!thread) return null;
                          return (
                            <button
                              key={tId}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedThread(thread.slug);
                              }}
                              className="text-[10px] px-1.5 py-0.2 bg-[#EFECE6] hover:bg-[#171717] hover:text-[#FCFBF8] text-[#474540] rounded transition-colors"
                            >
                              #{thread.name}
                            </button>
                          );
                        })}
                      </div>
                    </td>

                    {/* Link Icon */}
                    <td className="py-3.5 px-4 text-right">
                      <ArrowUpRight className="w-3.5 h-3.5 text-[#A3A099] group-hover:text-[#171717] inline-block" />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
