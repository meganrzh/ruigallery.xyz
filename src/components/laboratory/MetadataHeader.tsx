import React from 'react';
import { useData } from '../../context/DataContext';
import { Entry } from '../../types';

interface MetadataHeaderProps {
  entry: Entry;
  showBorderBottom?: boolean;
}

/**
 * MetadataHeader Component
 * Implements the fixed archival metadata framework required by the specification:
 * COLLECTION, STUDY, ENTRY #, REVISION, CREATED, LOCATION, THREADS
 */
export const MetadataHeader: React.FC<MetadataHeaderProps> = ({
  entry,
  showBorderBottom = true,
}) => {
  const { getCollectionById, getStudyById, getThreadById } = useData();

  const collection = getCollectionById(entry.collectionId);
  const study = getStudyById(entry.studyId);

  return (
    <div
      id={`metadata-header-${entry.entryNumber}`}
      className={`w-full bg-[#FAF9F5] border archival-border p-6 sm:p-8 ${
        showBorderBottom ? 'mb-12' : ''
      }`}
    >
      <div className="flex items-center justify-between border-b archival-border pb-3 mb-6">
        <div className="text-[11px] font-mono tracking-widest text-[#171717] font-semibold uppercase flex items-center space-x-2">
          <span className="w-1.5 h-1.5 bg-[#171717]"></span>
          <span>RUI Laboratory Specimen Index</span>
        </div>
        <div className="text-[11px] font-mono text-[#8C8880] uppercase">
          Status: {entry.visibility.toUpperCase()}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-8 text-xs font-mono">
        {/* Collection */}
        <div className="space-y-1">
          <div className="text-[10px] text-[#8C8880] uppercase tracking-wider">
            COLLECTION
          </div>
          {collection ? (
            <a
              href={`/collection/${collection.slug}`}
              className="text-[#171717] font-medium hover:underline block truncate"
            >
              {collection.title}
            </a>
          ) : (
            <span className="text-[#8C8880]">—</span>
          )}
        </div>

        {/* Study */}
        <div className="space-y-1">
          <div className="text-[10px] text-[#8C8880] uppercase tracking-wider">
            STUDY
          </div>
          {study ? (
            <a
              href={`/study/${study.slug}`}
              className="text-[#171717] font-medium hover:underline block truncate"
            >
              {study.title}
            </a>
          ) : (
            <span className="text-[#8C8880]">—</span>
          )}
        </div>

        {/* Entry Number */}
        <div className="space-y-1">
          <div className="text-[10px] text-[#8C8880] uppercase tracking-wider">
            ENTRY NUMBER
          </div>
          <div className="text-[#171717] font-bold">
            NO. {entry.entryNumber}
          </div>
        </div>

        {/* Revision */}
        <div className="space-y-1">
          <div className="text-[10px] text-[#8C8880] uppercase tracking-wider">
            RUI REVISION
          </div>
          <div className="text-[#171717] font-medium">
            {entry.revision}
          </div>
        </div>

        {/* Created Date */}
        <div className="space-y-1">
          <div className="text-[10px] text-[#8C8880] uppercase tracking-wider">
            CREATED
          </div>
          <div className="text-[#383733]">
            {entry.createdDate}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-1">
          <div className="text-[10px] text-[#8C8880] uppercase tracking-wider">
            LOCATION
          </div>
          <div className="text-[#383733] truncate">
            {entry.location || 'Undisclosed'}
          </div>
        </div>

        {/* Threads (Multi-select horizontal categories) */}
        <div className="sm:col-span-2 space-y-1">
          <div className="text-[10px] text-[#8C8880] uppercase tracking-wider">
            THREADS
          </div>
          <div className="flex flex-wrap gap-1.5">
            {entry.threadIds.map((tId) => {
              const thread = getThreadById(tId);
              if (!thread) return null;
              return (
                <a
                  key={tId}
                  href={`/archive?thread=${thread.slug}`}
                  className="inline-block px-2 py-0.5 bg-[#EFECE6] hover:bg-[#171717] hover:text-[#FCFBF8] text-[#42403B] rounded-sm transition-colors text-[11px]"
                >
                  #{thread.name}
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
