import React, { useState, useEffect } from 'react';
import { Entry, ContentBlock, ContentBlockType } from '../../types';
import { useData } from '../../context/DataContext';
import {
  X,
  Check,
  Plus,
  Trash2,
  Image as ImageIcon,
  FileText,
  Quote,
  Bookmark,
  Clock,
  Sparkles,
} from 'lucide-react';

interface EditEntryModalProps {
  entry: Entry | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (updated: Entry) => void;
}

export const EditEntryModal: React.FC<EditEntryModalProps> = ({
  entry,
  isOpen,
  onClose,
  onSave,
}) => {
  const { collections, studies, threads, updateEntry } = useData();

  const [title, setTitle] = useState('');
  const [entryNumber, setEntryNumber] = useState('');
  const [revision, setRevision] = useState('');
  const [createdDate, setCreatedDate] = useState('');
  const [location, setLocation] = useState('');
  const [collectionId, setCollectionId] = useState('');
  const [studyId, setStudyId] = useState('');
  const [selectedThreads, setSelectedThreads] = useState<string[]>([]);
  const [summary, setSummary] = useState('');
  const [visibility, setVisibility] = useState<'published' | 'draft' | 'hidden'>('published');
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  useEffect(() => {
    if (entry) {
      setTitle(entry.title);
      setEntryNumber(entry.entryNumber);
      setRevision(entry.revision);
      setCreatedDate(entry.createdDate);
      setLocation(entry.location);
      setCollectionId(entry.collectionId);
      setStudyId(entry.studyId);
      setSelectedThreads(entry.threadIds || []);
      setSummary(entry.summary || '');
      setVisibility(entry.visibility);
      setBlocks(entry.contentBlocks ? JSON.parse(JSON.stringify(entry.contentBlocks)) : []);
    }
  }, [entry]);

  if (!isOpen || !entry) return null;

  const availableStudies = studies.filter((s) => s.collectionId === collectionId);

  const handleToggleThread = (threadId: string) => {
    if (selectedThreads.includes(threadId)) {
      setSelectedThreads(selectedThreads.filter((t) => t !== threadId));
    } else {
      setSelectedThreads([...selectedThreads, threadId]);
    }
  };

  const handleAddBlock = (type: ContentBlockType) => {
    const newBlock: ContentBlock = {
      id: `blk-${Date.now()}`,
      type,
      content: type === 'text' || type === 'quote' ? '' : undefined,
      imageUrl:
        type === 'image'
          ? 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?q=80&w=1200&auto=format&fit=crop'
          : undefined,
      caption: type === 'image' ? 'Specimen visual capture' : undefined,
      source: type === 'reference' ? 'Field Document Ref' : undefined,
      fragments:
        type === 'fragment'
          ? [{ id: `fr-${Date.now()}`, timestamp: '14:00', note: 'Observation note', tag: 'Field' }]
          : undefined,
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const handleUpdateBlock = (id: string, updates: Partial<ContentBlock>) => {
    setBlocks(blocks.map((b) => (b.id === id ? { ...b, ...updates } : b)));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a title for the entry.');
      return;
    }

    const updatedData: Partial<Entry> = {
      title,
      entryNumber,
      revision,
      createdDate,
      location,
      collectionId,
      studyId: studyId || availableStudies[0]?.id || studies[0]?.id,
      threadIds: selectedThreads,
      summary,
      visibility,
      contentBlocks: blocks,
    };

    updateEntry(entry.id, updatedData);
    if (onSave) {
      onSave({ ...entry, ...updatedData });
    }
    onClose();
  };

  return (
    <div
      id="edit-entry-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-[var(--bg-surface,#FCFBF8)] text-[var(--text-primary,#171717)] w-full max-w-4xl border archival-border rounded shadow-2xl my-8 flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b archival-border bg-[var(--bg-subtle,#FAF9F5)] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-color,#171717)]" />
            <div>
              <h2 className="font-serif text-lg font-bold text-[var(--text-primary,#171717)]">
                Edit Entry NO. {entry.entryNumber}: {entry.title}
              </h2>
              <p className="text-[11px] font-mono text-[var(--text-muted,#8C8880)]">
                Slug: {entry.slug} • ID: {entry.id}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded hover:bg-[var(--bg-primary,#FCFBF8)] border archival-border transition-colors text-[var(--text-muted,#8C8880)] hover:text-[var(--text-primary,#171717)]"
            title="Close editor"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Form Scroll Area */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* Primary Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Entry Number
              </label>
              <input
                type="text"
                value={entryNumber}
                onChange={(e) => setEntryNumber(e.target.value)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Revision Code
              </label>
              <input
                type="text"
                value={revision}
                onChange={(e) => setRevision(e.target.value)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Status / Visibility
              </label>
              <select
                value={visibility}
                onChange={(e) => setVisibility(e.target.value as any)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
              >
                <option value="published">Published (Public)</option>
                <option value="draft">Working Draft</option>
                <option value="hidden">Hidden / Archival</option>
              </select>
            </div>
          </div>

          {/* Title */}
          <div>
            <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
              Document Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2.5 font-serif text-lg text-[var(--text-primary,#171717)] rounded"
              required
            />
          </div>

          {/* Summary */}
          <div>
            <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
              Summary / Abstract Excerpt
            </label>
            <textarea
              rows={2}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief summary or introductory premise..."
              className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border p-2.5 font-serif text-sm rounded"
            />
          </div>

          {/* Collection & Study Hierarchy */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Parent Collection
              </label>
              <select
                value={collectionId}
                onChange={(e) => {
                  setCollectionId(e.target.value);
                  const st = studies.find((s) => s.collectionId === e.target.value);
                  if (st) setStudyId(st.id);
                }}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
              >
                {collections.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.titleZh})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Parent Study
              </label>
              <select
                value={studyId}
                onChange={(e) => setStudyId(e.target.value)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
              >
                {availableStudies.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.code}: {s.title}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Created Date (YYYY.MM.DD)
              </label>
              <input
                type="text"
                value={createdDate}
                onChange={(e) => setCreatedDate(e.target.value)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Observation Location
              </label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
              />
            </div>
          </div>

          {/* Thread Tags */}
          <div>
            <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-2">
              Thematic Threads / Tags
            </label>
            <div className="flex flex-wrap gap-2">
              {threads.map((t) => {
                const isSelected = selectedThreads.includes(t.id);
                return (
                  <button
                    type="button"
                    key={t.id}
                    onClick={() => handleToggleThread(t.id)}
                    className={`px-2.5 py-1 text-xs font-mono rounded border transition-colors ${
                      isSelected
                        ? 'bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] border-[var(--text-primary,#171717)]'
                        : 'bg-[var(--bg-subtle,#FAF9F5)] text-[var(--text-secondary,#57554F)] border-archival hover:border-[var(--text-primary,#171717)]'
                    }`}
                  >
                    #{t.name}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Content Blocks Section (Text, Images, Quotes, Citations) */}
          <div className="space-y-4 pt-4 border-t archival-border">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-primary,#171717)] font-semibold">
                  Content Blocks &amp; Media Specimen
                </h3>
                <p className="text-[11px] font-mono text-[var(--text-muted,#8C8880)]">
                  Edit paragraphs, update image URLs, captions, quotes, and research notes.
                </p>
              </div>

              {/* Add Block Buttons */}
              <div className="flex items-center space-x-1.5 text-xs font-mono">
                <button
                  type="button"
                  onClick={() => handleAddBlock('text')}
                  className="px-2.5 py-1 bg-[var(--bg-subtle,#FAF9F5)] border archival-border hover:bg-[var(--text-primary,#171717)] hover:text-[var(--bg-primary,#FCFBF8)] rounded transition-colors flex items-center space-x-1"
                >
                  <FileText className="w-3 h-3" />
                  <span>+ Text</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('image')}
                  className="px-2.5 py-1 bg-[var(--bg-subtle,#FAF9F5)] border archival-border hover:bg-[var(--text-primary,#171717)] hover:text-[var(--bg-primary,#FCFBF8)] rounded transition-colors flex items-center space-x-1"
                >
                  <ImageIcon className="w-3 h-3" />
                  <span>+ Image</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('quote')}
                  className="px-2.5 py-1 bg-[var(--bg-subtle,#FAF9F5)] border archival-border hover:bg-[var(--text-primary,#171717)] hover:text-[var(--bg-primary,#FCFBF8)] rounded transition-colors flex items-center space-x-1"
                >
                  <Quote className="w-3 h-3" />
                  <span>+ Quote</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAddBlock('reference')}
                  className="px-2.5 py-1 bg-[var(--bg-subtle,#FAF9F5)] border archival-border hover:bg-[var(--text-primary,#171717)] hover:text-[var(--bg-primary,#FCFBF8)] rounded transition-colors flex items-center space-x-1"
                >
                  <Bookmark className="w-3 h-3" />
                  <span>+ Ref</span>
                </button>
              </div>
            </div>

            {/* Render Editable Content Blocks */}
            <div className="space-y-4">
              {blocks.map((block, idx) => (
                <div
                  key={block.id}
                  className="p-4 bg-[var(--bg-subtle,#FAF9F5)] border archival-border rounded space-y-3 relative group"
                >
                  <div className="flex items-center justify-between text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase">
                    <span className="font-semibold text-[var(--text-primary,#171717)]">
                      Block 0{idx + 1} — {block.type}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleRemoveBlock(block.id)}
                      className="text-[var(--text-muted,#8C8880)] hover:text-red-600 transition-colors p-1"
                      title="Remove this block"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Text Block */}
                  {block.type === 'text' && (
                    <textarea
                      rows={4}
                      value={block.content || ''}
                      onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                      placeholder="Enter prose or research notebook observation..."
                      className="w-full bg-[var(--bg-surface,#FCFBF8)] border archival-border p-3 font-serif text-sm text-[var(--text-primary,#171717)] rounded"
                    />
                  )}

                  {/* Image Block with Live Preview */}
                  {block.type === 'image' && (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <div className="space-y-2">
                          <label className="block text-[10px] font-mono text-[var(--text-muted,#8C8880)] uppercase">
                            Image URL
                          </label>
                          <input
                            type="text"
                            value={block.imageUrl || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { imageUrl: e.target.value })}
                            placeholder="https://images.unsplash.com/..."
                            className="w-full bg-[var(--bg-surface,#FCFBF8)] border archival-border p-2 text-xs font-mono rounded"
                          />

                          <label className="block text-[10px] font-mono text-[var(--text-muted,#8C8880)] uppercase pt-1">
                            Caption
                          </label>
                          <input
                            type="text"
                            value={block.caption || ''}
                            onChange={(e) => handleUpdateBlock(block.id, { caption: e.target.value })}
                            placeholder="Specimen documentation caption..."
                            className="w-full bg-[var(--bg-surface,#FCFBF8)] border archival-border p-2 text-xs font-mono rounded"
                          />
                        </div>

                        {/* Image Preview Box */}
                        <div className="border archival-border rounded bg-black/5 p-2 flex flex-col items-center justify-center min-h-[120px] overflow-hidden">
                          {block.imageUrl ? (
                            <div className="relative w-full">
                              <img
                                src={block.imageUrl}
                                alt={block.caption || 'Preview'}
                                referrerPolicy="no-referrer"
                                className="w-full h-32 object-cover rounded border archival-border"
                                onError={(e) => {
                                  (e.target as HTMLElement).style.display = 'none';
                                }}
                              />
                              <div className="text-[10px] font-mono text-[var(--text-muted,#8C8880)] mt-1 truncate">
                                Live Image Preview
                              </div>
                            </div>
                          ) : (
                            <span className="text-xs font-mono text-[var(--text-muted,#8C8880)]">
                              No image URL provided
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Quote Block */}
                  {block.type === 'quote' && (
                    <div className="space-y-2">
                      <textarea
                        rows={2}
                        value={block.content || ''}
                        onChange={(e) => handleUpdateBlock(block.id, { content: e.target.value })}
                        placeholder="Quote text..."
                        className="w-full bg-[var(--bg-surface,#FCFBF8)] border archival-border p-2 font-serif italic text-sm rounded"
                      />
                      <input
                        type="text"
                        value={block.source || ''}
                        onChange={(e) => handleUpdateBlock(block.id, { source: e.target.value })}
                        placeholder="Author or source attribution..."
                        className="w-full bg-[var(--bg-surface,#FCFBF8)] border archival-border p-2 text-xs font-mono rounded"
                      />
                    </div>
                  )}

                  {/* Reference Block */}
                  {block.type === 'reference' && (
                    <input
                      type="text"
                      value={block.source || ''}
                      onChange={(e) => handleUpdateBlock(block.id, { source: e.target.value })}
                      placeholder="Bibliographic citation reference..."
                      className="w-full bg-[var(--bg-surface,#FCFBF8)] border archival-border p-2 text-xs font-mono rounded"
                    />
                  )}

                  {/* Fragment Block */}
                  {block.type === 'fragment' && (
                    <div className="space-y-2">
                      <div className="text-xs font-mono text-[var(--text-secondary,#57554F)]">
                        Timestamped field observations:
                      </div>
                      {block.fragments?.map((fr, fIdx) => (
                        <div key={fr.id} className="grid grid-cols-3 gap-2 text-xs font-mono">
                          <input
                            type="text"
                            value={fr.timestamp}
                            onChange={(e) => {
                              const newFrs = [...(block.fragments || [])];
                              newFrs[fIdx] = { ...fr, timestamp: e.target.value };
                              handleUpdateBlock(block.id, { fragments: newFrs });
                            }}
                            placeholder="Time (e.g. 10:30)"
                            className="bg-[var(--bg-surface,#FCFBF8)] border archival-border p-1.5 rounded"
                          />
                          <input
                            type="text"
                            value={fr.tag || ''}
                            onChange={(e) => {
                              const newFrs = [...(block.fragments || [])];
                              newFrs[fIdx] = { ...fr, tag: e.target.value };
                              handleUpdateBlock(block.id, { fragments: newFrs });
                            }}
                            placeholder="Tag (e.g. Metric)"
                            className="bg-[var(--bg-surface,#FCFBF8)] border archival-border p-1.5 rounded"
                          />
                          <input
                            type="text"
                            value={fr.note}
                            onChange={(e) => {
                              const newFrs = [...(block.fragments || [])];
                              newFrs[fIdx] = { ...fr, note: e.target.value };
                              handleUpdateBlock(block.id, { fragments: newFrs });
                            }}
                            placeholder="Note text"
                            className="bg-[var(--bg-surface,#FCFBF8)] border archival-border p-1.5 rounded"
                          />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Modal Footer Controls */}
          <div className="pt-6 border-t archival-border flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono border archival-border hover:bg-[var(--bg-subtle,#FAF9F5)] rounded transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 text-xs font-mono font-medium bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] hover:opacity-90 rounded transition-opacity flex items-center space-x-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Save &amp; Update Entry</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
