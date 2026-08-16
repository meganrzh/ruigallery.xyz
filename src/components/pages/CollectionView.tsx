import React from 'react';
import { useData } from '../../context/DataContext';
import { ArrowLeft, ArrowUpRight, Folder, FileText, Calendar, MapPin } from 'lucide-react';

interface CollectionViewProps {
  slug: string;
}

export const CollectionView: React.FC<CollectionViewProps> = ({ slug }) => {
  const { getCollectionBySlug, getStudiesByCollection, getEntriesByStudy } = useData();

  const collection = getCollectionBySlug(slug);

  if (!collection) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-[#171717] mb-4">Collection Not Found</h1>
        <p className="font-mono text-sm text-[#78756E] mb-8">
          The requested archival collection ({slug}) could not be located in the repository.
        </p>
        <a
          href="/laboratory"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider px-4 py-2 bg-[#171717] text-[#FCFBF8]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Laboratory</span>
        </a>
      </div>
    );
  }

  const studies = getStudiesByCollection(collection.id);
  const totalEntries = studies.reduce(
    (acc, s) => acc + getEntriesByStudy(s.id).length,
    0
  );

  return (
    <div id={`collection-page-${collection.slug}`} className="w-full pb-24">
      {/* Top breadcrumb navigation */}
      <div className="border-b archival-border bg-[#FAF9F5] py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs font-mono text-[#66645E]">
          <a
            href="/laboratory"
            className="hover:text-[#171717] flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Laboratory</span>
            <span className="text-[#A3A099]">/</span>
            <span className="text-[#171717]">Collection</span>
          </a>
          <span className="text-[#8C8880]">{collection.code}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-16 space-y-12">
        {/* Header Information */}
        <header className="space-y-6 border-b archival-border pb-10">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8C8880] uppercase">
            <span>COLLECTION CODE: {collection.code}</span>
            <span>•</span>
            <span>DATE RANGE: {collection.dateRange}</span>
            {collection.location && (
              <>
                <span>•</span>
                <span>LOC: {collection.location}</span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#171717] font-normal tracking-tight">
            {collection.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#3D3B36] leading-relaxed max-w-3xl">
            {collection.description}
          </p>

          <div className="pt-2 flex items-center space-x-6 text-xs font-mono text-[#57554F]">
            <div>STUDIES: 0{studies.length}</div>
            <div>•</div>
            <div>TOTAL ENTRIES: {totalEntries}</div>
          </div>
        </header>

        {/* Associated Studies in this Collection */}
        <section className="space-y-8">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold border-b archival-border pb-2">
            <span>Constituent Studies ({studies.length})</span>
            <span className="text-[#8C8880]">Sequential Inquiries</span>
          </div>

          <div className="space-y-8">
            {studies.map((study) => {
              const entriesInStudy = getEntriesByStudy(study.id);

              return (
                <article
                  key={study.id}
                  className="bg-[#FAF9F5] border archival-border p-6 sm:p-8 space-y-6 hover:border-[#171717] transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b archival-border pb-4">
                    <div>
                      <div className="text-xs font-mono text-[#8C8880] uppercase mb-1">
                        {study.code} • {study.status || 'Active'}
                      </div>
                      <h2 className="font-serif text-2xl sm:text-3xl text-[#171717] font-normal">
                        <a
                          href={`/study/${study.slug}`}
                          className="group-hover:underline flex items-center space-x-2"
                        >
                          <span>{study.title}</span>
                          <ArrowUpRight className="w-4 h-4 text-[#8C8880] group-hover:text-[#171717]" />
                        </a>
                      </h2>
                    </div>
                    <div className="text-xs font-mono text-[#66645E]">
                      {entriesInStudy.length} Entries Recorded
                    </div>
                  </div>

                  <p className="font-sans text-sm text-[#474540] leading-relaxed">
                    {study.description}
                  </p>

                  {/* List of Entries inside this study */}
                  <div className="space-y-2 pt-2">
                    <div className="text-[11px] font-mono uppercase text-[#8C8880] tracking-wider">
                      Study Entries:
                    </div>
                    <div className="divide-y archival-border bg-[#FCFBF8] border archival-border">
                      {entriesInStudy.map((entry) => (
                        <a
                          key={entry.id}
                          href={`/entry/${entry.slug}`}
                          className="flex items-baseline justify-between p-3 text-xs font-mono text-[#383733] hover:bg-[#FAF9F5] hover:text-[#171717] transition-colors"
                        >
                          <div className="flex items-baseline space-x-3 truncate pr-4">
                            <span className="font-bold text-[#171717]">
                              NO. {entry.entryNumber}
                            </span>
                            <span className="font-sans text-[#171717] truncate">
                              {entry.title}
                            </span>
                          </div>
                          <span className="text-[#8C8880] shrink-0">{entry.createdDate}</span>
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 flex justify-end">
                    <a
                      href={`/study/${study.slug}`}
                      className="text-xs font-mono uppercase tracking-wider text-[#171717] font-medium flex items-center space-x-1 hover:underline"
                    >
                      <span>Open Complete Study Dossier</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
};
