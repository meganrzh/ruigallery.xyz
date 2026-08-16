import React from 'react';
import { ContentBlock } from '../../types';
import { Quote, BookMarked, Clock, Tag } from 'lucide-react';

interface EntryBodyRendererProps {
  blocks: ContentBlock[];
}

export const EntryBodyRenderer: React.FC<EntryBodyRendererProps> = ({ blocks }) => {
  return (
    <div className="space-y-10 font-sans text-[#2B2925]">
      {blocks.map((block) => {
        switch (block.type) {
          case 'text':
            return (
              <div
                key={block.id}
                className="font-serif text-lg sm:text-xl text-[#2B2925] leading-relaxed max-w-3xl"
              >
                {block.content}
              </div>
            );

          case 'image':
            return (
              <figure key={block.id} className="my-8 space-y-3">
                <div className="overflow-hidden border archival-border bg-[#F5F3EE]">
                  <img
                    src={block.imageUrl}
                    alt={block.alt || block.caption || 'Laboratory specimen'}
                    referrerPolicy="no-referrer"
                    className="w-full h-auto object-cover grayscale contrast-[1.05]"
                  />
                </div>
                {block.caption && (
                  <figcaption className="text-xs font-mono text-[#66645E] italic border-l-2 border-[#171717] pl-3 py-0.5">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );

          case 'fragment':
            return (
              <div
                key={block.id}
                className="my-8 bg-[#FAF9F5] border archival-border p-6 space-y-4"
              >
                <div className="text-xs font-mono text-[#8C8880] uppercase tracking-wider flex items-center space-x-1.5 border-b archival-border pb-2">
                  <Clock className="w-3.5 h-3.5 text-[#171717]" />
                  <span>Field Fragments &amp; Micro-Observations</span>
                </div>
                <div className="space-y-4">
                  {block.fragments?.map((frag) => (
                    <div
                      key={frag.id}
                      className="text-sm font-mono border-l-2 border-[#C5C2BA] pl-3 py-1 space-y-1"
                    >
                      <div className="flex items-center space-x-2 text-[11px] text-[#8C8880]">
                        {frag.timestamp && <span>[{frag.timestamp}]</span>}
                        {frag.tag && (
                          <span className="bg-[#EFECE6] text-[#42403B] px-1.5 py-0.2 rounded text-[10px]">
                            {frag.tag}
                          </span>
                        )}
                      </div>
                      <p className="text-[#383733] font-sans text-base">{frag.note}</p>
                    </div>
                  ))}
                </div>
              </div>
            );

          case 'reference':
            return (
              <div
                key={block.id}
                className="my-6 p-4 bg-[#F2EFE9] border-l-4 border-[#171717] text-xs font-mono text-[#42403B] flex items-start space-x-3"
              >
                <BookMarked className="w-4 h-4 text-[#171717] mt-0.5 shrink-0" />
                <div>
                  <div className="text-[10px] text-[#8C8880] uppercase mb-1">
                    BIBLIOGRAPHIC RECORD / SOURCE
                  </div>
                  <div className="font-serif text-sm text-[#171717] italic">
                    {block.source}
                  </div>
                </div>
              </div>
            );

          case 'quote':
            return (
              <blockquote
                key={block.id}
                className="my-8 p-6 bg-[#FAF9F5] border archival-border relative"
              >
                <p className="font-serif italic text-xl sm:text-2xl text-[#171717] leading-relaxed mb-3">
                  {block.content}
                </p>
                {block.source && (
                  <cite className="block text-xs font-mono text-[#8C8880] uppercase not-italic">
                    — {block.source}
                  </cite>
                )}
              </blockquote>
            );

          case 'two-column':
            return (
              <div
                key={block.id}
                className="my-8 grid grid-cols-1 md:grid-cols-2 gap-6 border archival-border p-6 bg-[#FCFBF8]"
              >
                <div className="space-y-2 border-b md:border-b-0 md:border-r archival-border pb-4 md:pb-0 md:pr-6">
                  <div className="text-xs font-mono text-[#8C8880] uppercase">
                    Column A
                  </div>
                  <div className="font-mono text-xs whitespace-pre-line text-[#2B2925] leading-relaxed">
                    {block.leftColumn}
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="text-xs font-mono text-[#8C8880] uppercase">
                    Column B
                  </div>
                  <div className="font-mono text-xs whitespace-pre-line text-[#2B2925] leading-relaxed">
                    {block.rightColumn}
                  </div>
                </div>
              </div>
            );

          default:
            return null;
        }
      })}
    </div>
  );
};
