import React from 'react';
import { useData } from '../../context/DataContext';
import { CuratedWork } from '../../types';
import { ArrowUpRight, BookOpen, Compass, ExternalLink } from 'lucide-react';

export const CuratedEditorialFeed: React.FC = () => {
  const { curatedWorks, getRelatedStudiesForWork, getRelatedEntriesForWork } = useData();

  const featured = curatedWorks.filter((w) => w.featuredOnHome);

  return (
    <section id="curated-work-editorial-section" className="w-full py-16 md:py-24">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Section Heading & Classification Label */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 mb-16 pb-4 border-b archival-border">
          <div className="flex items-baseline space-x-3">
            <h2 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              Curated Works
            </h2>
            <span className="text-xs font-mono text-[#8C8880] uppercase">
              (0{featured.length} Selected)
            </span>
          </div>
          <p className="text-xs font-mono text-[#78756E] max-w-sm">
            Finished essays, photographic monographs, and spatial studies treated as peer mediums.
          </p>
        </div>

        {/* Editorial Non-Uniform Layout */}
        <div className="space-y-24 md:space-y-36">
          {featured.map((work, index) => {
            const relatedStudies = getRelatedStudiesForWork(work);
            const relatedEntries = getRelatedEntriesForWork(work);
            const isDominant = work.homeLayout.scale === 'dominant';
            const isRightAligned = work.homeLayout.alignment === 'right';

            return (
              <article
                key={work.id}
                id={`work-item-${work.slug}`}
                className={`relative group ${
                  isDominant ? 'w-full' : 'max-w-6xl mx-auto'
                }`}
              >
                <div
                  className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                    isRightAligned ? 'lg:flex-row-reverse' : ''
                  }`}
                >
                  {/* Media Column with intentional responsive aspect ratios */}
                  <div
                    className={`${
                      isDominant
                        ? 'lg:col-span-7 order-1'
                        : isRightAligned
                        ? 'lg:col-span-6 lg:order-2'
                        : 'lg:col-span-6 lg:order-1'
                    }`}
                  >
                    <a
                      href={`/work/${work.slug}`}
                      className="block overflow-hidden relative group/img bg-[#EFECE6] border archival-border"
                    >
                      <div
                        className={`w-full overflow-hidden ${
                          work.homeLayout.aspectRatio === 'portrait'
                            ? 'aspect-[4/5]'
                            : work.homeLayout.aspectRatio === 'square'
                            ? 'aspect-square'
                            : isDominant
                            ? 'aspect-[16/10]'
                            : 'aspect-[3/2]'
                        }`}
                      >
                        <img
                          src={work.heroImage}
                          alt={work.heroImageAlt || work.title}
                          referrerPolicy="no-referrer"
                          className="w-full h-full object-cover grayscale contrast-[1.08] group-hover/img:scale-[1.02] group-hover/img:grayscale-0 transition-all duration-700 ease-out"
                        />
                      </div>
                      {/* Media category chip on image */}
                      <div className="absolute top-4 left-4 bg-[#171717]/90 backdrop-blur-sm text-[#FCFBF8] text-[11px] font-mono tracking-wider uppercase px-2.5 py-1">
                        {work.mediumType}
                      </div>
                    </a>
                  </div>

                  {/* Text Column: Varied typography scales, generous spacing */}
                  <div
                    className={`${
                      isDominant
                        ? 'lg:col-span-5 order-2'
                        : isRightAligned
                        ? 'lg:col-span-6 lg:order-1'
                        : 'lg:col-span-6 lg:order-2'
                    } flex flex-col justify-center space-y-5`}
                  >
                    {/* Date and Medium Metadata */}
                    <div className="flex items-center space-x-3 text-xs font-mono text-[#8C8880] uppercase tracking-wider">
                      <span>{work.date}</span>
                      <span>•</span>
                      <span>{work.mediumType}</span>
                    </div>

                    {/* Title */}
                    <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl text-[#171717] font-normal leading-[1.15] tracking-tight">
                      <a
                        href={`/work/${work.slug}`}
                        className="hover:underline underline-offset-4 decoration-[#9E9B94] transition-all"
                      >
                        {work.title}
                      </a>
                    </h3>

                    {/* Subtitle / Excerpt */}
                    <p className="font-serif text-base sm:text-lg text-[#4A4843] leading-relaxed">
                      {work.excerpt}
                    </p>

                    {/* Cross-Reference to Laboratory (Section 3 Requirement) */}
                    {(relatedStudies.length > 0 || relatedEntries.length > 0) && (
                      <div className="pt-4 mt-2 border-t archival-border space-y-2">
                        <div className="text-[11px] font-mono uppercase text-[#8C8880] tracking-wider flex items-center space-x-1.5">
                          <Compass className="w-3 h-3 text-[#171717]" />
                          <span>Laboratory Cross-Reference</span>
                        </div>
                        <div className="flex flex-wrap gap-2 text-xs font-mono">
                          {relatedStudies.map((std) => (
                            <a
                              key={std.id}
                              href={`/study/${std.slug}`}
                              className="inline-flex items-center space-x-1 text-[#383733] hover:text-[#171717] bg-[#F2EFE9] hover:bg-[#E7E3DA] px-2 py-1 rounded transition-colors"
                            >
                              <span>Study: {std.title}</span>
                              <ArrowUpRight className="w-3 h-3 text-[#8C8880]" />
                            </a>
                          ))}
                          {relatedEntries.map((ent) => (
                            <a
                              key={ent.id}
                              href={`/entry/${ent.slug}`}
                              className="inline-flex items-center space-x-1 text-[#57554F] hover:text-[#171717] border archival-border hover:border-[#171717] px-2 py-1 rounded transition-colors"
                            >
                              <span>Entry {ent.entryNumber}</span>
                              <ArrowUpRight className="w-3 h-3 text-[#8C8880]" />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Direct Read Link */}
                    <div className="pt-2">
                      <a
                        href={`/work/${work.slug}`}
                        className="inline-flex items-center space-x-2 text-xs font-mono font-medium text-[#171717] uppercase tracking-wider group-hover:translate-x-1 transition-transform"
                      >
                        <span>Open Document</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
