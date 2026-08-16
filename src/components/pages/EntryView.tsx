import React from 'react';
import { useData } from '../../context/DataContext';
import { MetadataHeader } from '../laboratory/MetadataHeader';
import { EntryBodyRenderer } from '../laboratory/EntryBodyRenderer';
import { RelatedStudiesList } from '../laboratory/RelatedStudiesList';
import { ArrowLeft, ArrowUpRight, Compass, FileText, Edit3 } from 'lucide-react';

interface EntryViewProps {
  slug: string;
}

export const EntryView: React.FC<EntryViewProps> = ({ slug }) => {
  const { getEntryBySlug, getStudyById, getCollectionById, getRelatedStudiesForEntry } = useData();

  const entry = getEntryBySlug(slug);

  if (!entry) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-[#171717] mb-4">Entry Not Found</h1>
        <p className="font-mono text-sm text-[#78756E] mb-8">
          The requested laboratory specimen entry ({slug}) could not be located in the catalog.
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

  const study = getStudyById(entry.studyId);
  const collection = getCollectionById(entry.collectionId);
  const relatedStudies = getRelatedStudiesForEntry(entry);

  return (
    <article id={`entry-view-${entry.entryNumber}`} className="w-full pb-24">
      {/* Top breadcrumb navigation bar */}
      <div className="border-b archival-border bg-[#FAF9F5] py-4">
        <div className="max-w-4xl mx-auto px-6 flex items-center justify-between text-xs font-mono text-[#66645E]">
          <div className="flex items-center space-x-2 truncate pr-4">
            <a href="/laboratory" className="hover:text-[#171717] transition-colors shrink-0">
              Laboratory
            </a>
            <span className="text-[#A3A099]">/</span>
            {study && (
              <>
                <a
                  href={`/study/${study.slug}`}
                  className="hover:text-[#171717] transition-colors truncate"
                >
                  {study.code}
                </a>
                <span className="text-[#A3A099]">/</span>
              </>
            )}
            <span className="text-[#171717] font-bold">ENTRY {entry.entryNumber}</span>
          </div>
          <div className="flex items-center space-x-4 shrink-0">
            <a
              href={`/admin?editEntry=${entry.id}`}
              className="text-[var(--text-primary,#171717)] hover:underline flex items-center space-x-1 font-medium bg-[var(--bg-primary,#FCFBF8)] border archival-border px-2.5 py-1 rounded text-[11px]"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Entry</span>
            </a>
            <span className="text-[#8C8880]">{entry.revision}</span>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 pt-12 space-y-12">
        {/* Entry Title Heading */}
        <header className="space-y-4">
          <div className="flex items-center space-x-3 text-xs font-mono text-[#8C8880] uppercase">
            <span>LABORATORY NOTEBOOK ENTRY NO. {entry.entryNumber}</span>
            <span>•</span>
            <span>{entry.createdDate}</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl text-[#171717] font-normal tracking-tight leading-[1.2]">
            {entry.title}
          </h1>

          {entry.summary && (
            <p className="font-serif italic text-base sm:text-lg text-[#52504A] leading-relaxed border-l-2 border-[#171717] pl-4 py-1">
              {entry.summary}
            </p>
          )}
        </header>

        {/* Mandatory Fixed Archival Metadata Framework */}
        <MetadataHeader entry={entry} />

        {/* Flexible Internal Notebook Body */}
        <section className="pt-2">
          <div className="text-xs font-mono text-[#8C8880] uppercase tracking-wider mb-6 flex items-center space-x-2 border-b archival-border pb-2">
            <FileText className="w-3.5 h-3.5 text-[#171717]" />
            <span>Document Content &amp; Field Records</span>
          </div>
          <EntryBodyRenderer blocks={entry.contentBlocks} />
        </section>

        {/* Related Studies at Bottom of Entry */}
        <RelatedStudiesList studies={relatedStudies} title="Related Research Studies" />

        {/* Bottom Fast Navigation Controls */}
        <div className="mt-16 pt-8 border-t archival-border flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <a
            href={study ? `/study/${study.slug}` : '/laboratory'}
            className="text-[#171717] hover:underline flex items-center space-x-1.5 font-medium uppercase tracking-wider"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Study: {study?.title || 'Laboratory'}</span>
          </a>
          <div className="flex items-center space-x-4 text-[#78756E]">
            <a href="/laboratory" className="hover:text-[#171717]">
              Laboratory Landing
            </a>
            <span>•</span>
            <a href="/archive" className="hover:text-[#171717]">
              Archive Database Index
            </a>
          </div>
        </div>
      </div>
    </article>
  );
};
