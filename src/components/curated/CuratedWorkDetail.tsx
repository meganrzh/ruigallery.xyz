import React from 'react';
import { useData } from '../../context/DataContext';
import { useRouter } from '../../router/RouterContext';
import { ArrowLeft, ArrowUpRight, BookOpen, Compass, Calendar, Layers, Edit3 } from 'lucide-react';

interface CuratedWorkDetailProps {
  slug: string;
}

export const CuratedWorkDetail: React.FC<CuratedWorkDetailProps> = ({ slug }) => {
  const { getCuratedWorkBySlug, getRelatedStudiesForWork, getRelatedEntriesForWork } = useData();
  const { navigate } = useRouter();

  const work = getCuratedWorkBySlug(slug);

  if (!work) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-24 text-center">
        <h1 className="font-serif text-3xl text-[#171717] mb-4">Work Not Found</h1>
        <p className="font-mono text-sm text-[#78756E] mb-8">
          The requested monograph or exhibition document ({slug}) does not exist.
        </p>
        <a
          href="/"
          className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider px-4 py-2 bg-[#171717] text-[#FCFBF8]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Return to Gallery</span>
        </a>
      </div>
    );
  }

  const relatedStudies = getRelatedStudiesForWork(work);
  const relatedEntries = getRelatedEntriesForWork(work);

  return (
    <article id={`curated-work-page-${work.slug}`} className="w-full pb-24">
      {/* Top back navigation bar */}
      <div className="border-b archival-border bg-[#FAF9F5] py-4">
        <div className="max-w-5xl mx-auto px-6 flex items-center justify-between text-xs font-mono text-[#66645E]">
          <a
            href="/"
            className="hover:text-[#171717] flex items-center space-x-1.5 transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Curated Gallery</span>
          </a>
          <div className="flex items-center space-x-3 text-[#8C8880]">
            <a
              href={`/admin?editWork=${work.id}`}
              className="text-[var(--text-primary,#171717)] hover:underline flex items-center space-x-1 font-medium bg-[var(--bg-primary,#FCFBF8)] border archival-border px-2.5 py-1 rounded text-[11px]"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit Work &amp; Image</span>
            </a>
            <span>•</span>
            <span>{work.mediumType}</span>
            <span>•</span>
            <span>{work.date}</span>
          </div>
        </div>
      </div>

      {/* Hero Header Composition */}
      <header className="max-w-4xl mx-auto px-6 pt-16 pb-12 text-center md:text-left">
        <div className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#78756E] mb-4">
          <span className="w-2 h-2 rounded-full bg-[#171717]"></span>
          <span>Curated Work // {work.mediumType}</span>
          <span className="text-[#C5C2BA]">/</span>
          <span>{work.date}</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl text-[#171717] font-normal tracking-tight leading-[1.1] mb-6">
          {work.title}
        </h1>

        {work.subtitle && (
          <p className="font-serif italic text-lg sm:text-xl md:text-2xl text-[#52504A] max-w-3xl leading-relaxed">
            {work.subtitle}
          </p>
        )}
      </header>

      {/* Main Full-Scale Hero Media */}
      <div className="max-w-6xl mx-auto px-6 mb-16">
        <div className="overflow-hidden border archival-border bg-[#EFECE6]">
          <img
            src={work.heroImage}
            alt={work.heroImageAlt || work.title}
            referrerPolicy="no-referrer"
            className="w-full h-auto max-h-[75vh] object-cover grayscale contrast-[1.05]"
          />
        </div>
        <div className="mt-3 flex flex-col sm:flex-row justify-between text-xs font-mono text-[#78756E] border-b archival-border pb-3">
          <span>{work.heroImageAlt || work.title}</span>
          <span className="text-[#8C8880] mt-1 sm:mt-0">Source Archive: RUI Scriptorium</span>
        </div>
      </div>

      {/* Long-form Content / Essay Body */}
      <div className="max-w-3xl mx-auto px-6">
        <div className="space-y-6 text-lg sm:text-xl font-serif text-[#2B2925] leading-relaxed">
          {work.longContent.map((paragraph, idx) => (
            <p key={idx} className={idx === 0 ? 'first-letter:text-5xl first-letter:font-normal first-letter:float-left first-letter:mr-3 first-letter:leading-none first-letter:font-serif' : ''}>
              {paragraph}
            </p>
          ))}
        </div>

        {/* Additional Media if present */}
        {work.additionalMedia && work.additionalMedia.length > 0 && (
          <div className="my-16 space-y-12">
            {work.additionalMedia.map((media) => (
              <figure key={media.id} className="space-y-3">
                <div className="overflow-hidden border archival-border bg-[#EFECE6]">
                  <img
                    src={media.url}
                    alt={media.alt || media.caption || 'Work documentation'}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover grayscale contrast-[1.05]"
                  />
                </div>
                {media.caption && (
                  <figcaption className="text-xs font-mono text-[#66645E] italic">
                    {media.caption}
                  </figcaption>
                )}
              </figure>
            ))}
          </div>
        )}

        {/* Cross-Reference Section: Related Laboratory Studies & Entries */}
        {(relatedStudies.length > 0 || relatedEntries.length > 0) && (
          <section className="mt-20 pt-8 border-t-2 border-[#171717] bg-[#FAF9F5] p-6 sm:p-8">
            <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold mb-3">
              <Compass className="w-4 h-4" />
              <span>Laboratory Inquiries &amp; Provenance</span>
            </div>
            <p className="text-xs font-sans text-[#66645E] mb-6">
              This curated work originated from exploratory research and field documentation
              recorded in the RUI Laboratory:
            </p>

            <div className="space-y-4">
              {relatedStudies.length > 0 && (
                <div>
                  <div className="text-[11px] font-mono uppercase text-[#8C8880] mb-2">
                    Related Studies:
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {relatedStudies.map((std) => (
                      <a
                        key={std.id}
                        href={`/study/${std.slug}`}
                        className="block p-3 bg-[#FCFBF8] border archival-border hover:border-[#171717] transition-all group"
                      >
                        <div className="text-xs font-mono text-[#8C8880] uppercase mb-1">
                          {std.code}
                        </div>
                        <div className="font-serif text-sm font-medium text-[#171717] group-hover:underline flex items-center justify-between">
                          <span>{std.title}</span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-[#8C8880]" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              )}

              {relatedEntries.length > 0 && (
                <div className="pt-3">
                  <div className="text-[11px] font-mono uppercase text-[#8C8880] mb-2">
                    Primary Field Entries:
                  </div>
                  <div className="space-y-2">
                    {relatedEntries.map((ent) => (
                      <a
                        key={ent.id}
                        href={`/entry/${ent.slug}`}
                        className="flex items-baseline justify-between p-2.5 bg-[#FCFBF8] border archival-border hover:border-[#171717] transition-all group text-xs font-mono"
                      >
                        <div className="flex items-baseline space-x-3">
                          <span className="text-[#8C8880]">Entry {ent.entryNumber}</span>
                          <span className="font-sans font-medium text-[#171717] group-hover:underline">
                            {ent.title}
                          </span>
                        </div>
                        <span className="text-[#8C8880]">{ent.createdDate}</span>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Footer Navigation */}
        <div className="mt-16 pt-8 border-t archival-border flex justify-between items-center text-xs font-mono">
          <a
            href="/"
            className="text-[#171717] hover:underline flex items-center space-x-1 uppercase tracking-wider font-medium"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Works</span>
          </a>
          <a
            href="/laboratory"
            className="text-[#66645E] hover:text-[#171717] flex items-center space-x-1 uppercase tracking-wider"
          >
            <span>Visit Laboratory</span>
            <span>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
};
