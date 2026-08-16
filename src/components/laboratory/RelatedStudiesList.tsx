import React from 'react';
import { Study } from '../../types';
import { Compass, ArrowUpRight } from 'lucide-react';

interface RelatedStudiesListProps {
  studies: Study[];
  title?: string;
}

export const RelatedStudiesList: React.FC<RelatedStudiesListProps> = ({
  studies,
  title = 'Related Studies & Inquiries',
}) => {
  if (!studies || studies.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t-2 border-[#171717]">
      <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold mb-4">
        <Compass className="w-4 h-4" />
        <span>{title}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {studies.map((study) => (
          <a
            key={study.id}
            href={`/study/${study.slug}`}
            className="p-5 bg-[#FAF9F5] border archival-border hover:border-[#171717] transition-all group block"
          >
            <div className="flex items-center justify-between text-xs font-mono text-[#8C8880] uppercase mb-1">
              <span>{study.code}</span>
              <span className="text-[10px]">{study.status || 'Active'}</span>
            </div>
            <h4 className="font-serif text-lg text-[#171717] group-hover:underline mb-2 flex items-center justify-between">
              <span>{study.title}</span>
              <ArrowUpRight className="w-4 h-4 text-[#8C8880] group-hover:text-[#171717] transition-colors" />
            </h4>
            <p className="font-sans text-xs text-[#66645E] line-clamp-2 leading-relaxed">
              {study.description}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
};
