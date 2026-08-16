import React from 'react';
import { useData } from '../../context/DataContext';
import { Folder, ArrowUpRight, FileText } from 'lucide-react';

export const CollectionsList: React.FC = () => {
  const { collections, getStudiesByCollection, getEntriesByStudy } = useData();

  return (
    <aside id="laboratory-collections-sidebar" className="w-full space-y-6">
      {/* Header */}
      <div className="flex items-baseline justify-between border-b-2 border-[#171717] pb-3">
        <h3 className="font-serif text-2xl text-[#171717] font-normal tracking-tight">
          Collections
        </h3>
        <span className="text-xs font-mono text-[#8C8880] uppercase">
          (0{collections.length})
        </span>
      </div>

      <p className="text-xs font-mono text-[#78756E] leading-relaxed">
        Defined contexts, field projects, and long-term inquiries containing multiple studies.
      </p>

      {/* Collection Cards / Accordions */}
      <div className="space-y-6">
        {collections.map((col) => {
          const studies = getStudiesByCollection(col.id);
          const totalEntriesCount = studies.reduce(
            (acc, s) => acc + getEntriesByStudy(s.id).length,
            0
          );

          return (
            <div
              key={col.id}
              id={`collection-block-${col.slug}`}
              className="bg-[#FAF9F5] border archival-border p-5 space-y-3 group hover:border-[#171717] transition-all"
            >
              {/* Collection Code & Date Range */}
              <div className="flex items-center justify-between text-[11px] font-mono text-[#8C8880] uppercase">
                <span>{col.code}</span>
                <span>{col.dateRange}</span>
              </div>

              {/* Title linking to Collection Page */}
              <h4 className="font-serif text-xl text-[#171717] font-normal">
                <a
                  href={`/collection/${col.slug}`}
                  className="hover:underline flex items-center justify-between"
                >
                  <span>{col.title}</span>
                  <ArrowUpRight className="w-4 h-4 text-[#8C8880] group-hover:text-[#171717] transition-colors" />
                </a>
              </h4>

              {/* Description */}
              <p className="font-sans text-xs text-[#52504B] leading-relaxed line-clamp-2">
                {col.description}
              </p>

              {/* Studies contained within */}
              <div className="pt-2 border-t archival-border space-y-1.5">
                <div className="text-[10px] font-mono text-[#8C8880] uppercase tracking-wider">
                  Associated Studies ({studies.length}) • {totalEntriesCount} Entries
                </div>
                <div className="space-y-1">
                  {studies.map((s) => (
                    <a
                      key={s.id}
                      href={`/study/${s.slug}`}
                      className="flex items-baseline justify-between text-xs font-mono text-[#383733] hover:text-[#171717] hover:underline py-0.5"
                    >
                      <span className="truncate pr-2">↳ {s.title}</span>
                      <span className="text-[10px] text-[#A3A099] shrink-0">
                        {getEntriesByStudy(s.id).length} notes
                      </span>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};
