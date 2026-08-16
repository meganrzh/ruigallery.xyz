import React from 'react';
import { useData } from '../../context/DataContext';
import { RelatedStudiesList } from '../laboratory/RelatedStudiesList';
import { ArrowLeft, ArrowUpRight, BookOpen, Clock, Tag } from 'lucide-react';

interface StudyViewProps {
  slug: string;
}

export const StudyView: React.FC<StudyViewProps> = ({ slug }) => {
  const { getStudyBySlug, getCollectionById, getEntriesByStudy, getThreadById, getRelatedStudiesForStudy } = useData();

  const study = getStudyBySlug(slug);

  if (!study) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-[#171717] mb-4">Study Not Found</h1>
        <p className="font-mono text-sm text-[#78756E] mb-8">
          The requested laboratory study ({slug}) could not be located in the database.
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

  const collection = getCollectionById(study.collectionId);
  const entriesInStudy = getEntriesByStudy(study.id);
  const relatedStudies = getRelatedStudiesForStudy(study.id);

  return (
    <div id={`study-page-${study.slug}`} className="w-full pb-24">
      {/* Top breadcrumb navigation */}
      <div className="border-b archival-border bg-[#FAF9F5] py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs font-mono text-[#66645E]">
          <div className="flex items-center space-x-2">
            <a href="/laboratory" className="hover:text-[#171717] transition-colors">
              Laboratory
            </a>
            <span className="text-[#A3A099]">/</span>
            {collection && (
              <>
                <a
                  href={`/collection/${collection.slug}`}
                  className="hover:text-[#171717] transition-colors truncate max-w-[200px]"
                >
                  {collection.title}
                </a>
                <span className="text-[#A3A099]">/</span>
              </>
            )}
            <span className="text-[#171717] font-medium">{study.code}</span>
          </div>
          <span className="text-[#8C8880]">{study.status || 'Active'}</span>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 pt-16 space-y-12">
        {/* Study Dossier Header */}
        <header className="space-y-6 border-b archival-border pb-10">
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#8C8880] uppercase">
            <span>STUDY CODE: {study.code}</span>
            {collection && (
              <>
                <span>•</span>
                <span>
                  PARENT COLLECTION:{' '}
                  <a
                    href={`/collection/${collection.slug}`}
                    className="text-[#171717] hover:underline"
                  >
                    {collection.title}
                  </a>
                </span>
              </>
            )}
          </div>

          <h1 className="font-serif text-4xl sm:text-5xl text-[#171717] font-normal tracking-tight leading-[1.15]">
            {study.title}
          </h1>

          <p className="font-serif text-lg sm:text-xl text-[#3D3B36] leading-relaxed max-w-3xl">
            {study.description}
          </p>

          {/* Associated Conceptual Threads */}
          <div className="pt-2 flex flex-wrap items-center gap-2 text-xs font-mono">
            <span className="text-[#8C8880] uppercase">Associated Threads:</span>
            {study.threadIds.map((tId) => {
              const thread = getThreadById(tId);
              if (!thread) return null;
              return (
                <a
                  key={tId}
                  href={`/archive?thread=${thread.slug}`}
                  className="px-2.5 py-1 bg-[#EFECE6] hover:bg-[#171717] hover:text-[#FCFBF8] text-[#3D3B36] rounded-sm transition-colors text-xs"
                >
                  #{thread.name}
                </a>
              );
            })}
          </div>
        </header>

        {/* Entries Sequence in this Study */}
        <section className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold border-b archival-border pb-2">
            <span>Chronological Entries Sequence ({entriesInStudy.length})</span>
            <span className="text-[#8C8880]">Laboratory Field Units</span>
          </div>

          {entriesInStudy.length === 0 ? (
            <div className="py-12 bg-[#FAF9F5] border archival-border text-center text-xs font-mono text-[#8C8880]">
              No entries currently recorded in this study.
            </div>
          ) : (
            <div className="space-y-4">
              {entriesInStudy.map((entry, idx) => (
                <a
                  key={entry.id}
                  href={`/entry/${entry.slug}`}
                  className="block bg-[#FAF9F5] border archival-border p-6 hover:border-[#171717] hover:bg-[#FCFBF8] transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 border-b archival-border pb-3 mb-3 text-xs font-mono">
                    <div className="flex items-center space-x-3 text-[#73716B]">
                      <span className="font-bold text-[#171717]">NO. {entry.entryNumber}</span>
                      <span>•</span>
                      <span>{entry.revision}</span>
                      <span>•</span>
                      <span>{entry.createdDate}</span>
                    </div>
                    {entry.location && (
                      <span className="text-[#8C8880]">{entry.location}</span>
                    )}
                  </div>

                  <h3 className="font-serif text-xl text-[#171717] group-hover:underline font-normal mb-2 flex items-center justify-between">
                    <span>{entry.title}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#8C8880] group-hover:text-[#171717]" />
                  </h3>

                  {entry.summary && (
                    <p className="font-sans text-xs text-[#57554F] leading-relaxed line-clamp-2">
                      {entry.summary}
                    </p>
                  )}
                </a>
              ))}
            </div>
          )}
        </section>

        {/* Related Studies Cross-References */}
        <RelatedStudiesList studies={relatedStudies} title="Related Conceptual Studies" />
      </div>
    </div>
  );
};
