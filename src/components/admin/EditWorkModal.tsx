import React, { useState, useEffect } from 'react';
import { CuratedWork, WorkMediaType } from '../../types';
import { useData } from '../../context/DataContext';
import { X, Check, Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface EditWorkModalProps {
  work: CuratedWork | null;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (updated: CuratedWork) => void;
}

export const EditWorkModal: React.FC<EditWorkModalProps> = ({
  work,
  isOpen,
  onClose,
  onSave,
}) => {
  const { updateCuratedWork } = useData();

  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [mediumType, setMediumType] = useState<WorkMediaType>('Essay');
  const [date, setDate] = useState('');
  const [excerpt, setExcerpt] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [heroImageAlt, setHeroImageAlt] = useState('');
  const [paragraphs, setParagraphs] = useState<string[]>([]);
  const [scale, setScale] = useState<'dominant' | 'standard' | 'compact'>('dominant');
  const [alignment, setAlignment] = useState<'left' | 'center' | 'right'>('left');

  useEffect(() => {
    if (work) {
      setTitle(work.title);
      setSubtitle(work.subtitle || '');
      setMediumType(work.mediumType);
      setDate(work.date);
      setExcerpt(work.excerpt);
      setHeroImage(work.heroImage);
      setHeroImageAlt(work.heroImageAlt || '');
      setParagraphs(work.longContent || []);
      setScale(work.homeLayout?.scale || 'dominant');
      setAlignment(work.homeLayout?.alignment || 'left');
    }
  }, [work]);

  if (!isOpen || !work) return null;

  const handleParagraphChange = (idx: number, text: string) => {
    const updated = [...paragraphs];
    updated[idx] = text;
    setParagraphs(updated);
  };

  const handleAddParagraph = () => {
    setParagraphs([...paragraphs, '']);
  };

  const handleRemoveParagraph = (idx: number) => {
    setParagraphs(paragraphs.filter((_, i) => i !== idx));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a title for the work.');
      return;
    }

    const updatedData: Partial<CuratedWork> = {
      title,
      subtitle,
      mediumType,
      date,
      excerpt,
      heroImage,
      heroImageAlt,
      longContent: paragraphs.filter((p) => p.trim().length > 0),
      homeLayout: {
        ...work.homeLayout,
        scale,
        alignment,
      },
    };

    updateCuratedWork(work.id, updatedData);
    if (onSave) {
      onSave({ ...work, ...updatedData });
    }
    onClose();
  };

  return (
    <div
      id="edit-work-modal"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto"
    >
      <div className="bg-[var(--bg-surface,#FCFBF8)] text-[var(--text-primary,#171717)] w-full max-w-4xl border archival-border rounded shadow-2xl my-8 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 border-b archival-border bg-[var(--bg-subtle,#FAF9F5)] flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-[var(--accent-color,#171717)]" />
            <div>
              <h2 className="font-serif text-lg font-bold text-[var(--text-primary,#171717)]">
                Edit Curated Work: {work.title}
              </h2>
              <p className="text-[11px] font-mono text-[var(--text-muted,#8C8880)]">
                Slug: {work.slug} • Medium: {work.mediumType}
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

        {/* Body Form */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto flex-grow space-y-6">
          {/* Metadata Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Date / Chronology
              </label>
              <input
                type="text"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="2025.04 – 2026.01"
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
                required
              />
            </div>
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Medium / Discipline
              </label>
              <select
                value={mediumType}
                onChange={(e) => setMediumType(e.target.value as WorkMediaType)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
              >
                <option value="Essay">Essay</option>
                <option value="Visual Study">Visual Study</option>
                <option value="Photography">Photography</option>
                <option value="Mixed Media">Mixed Media</option>
                <option value="Spatial Installation">Spatial Installation</option>
              </select>
            </div>
          </div>

          {/* Title and Subtitle */}
          <div className="space-y-3">
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Curated Work Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2.5 font-serif text-xl text-[var(--text-primary,#171717)] rounded"
                required
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Subtitle / Secondary Inscription
              </label>
              <input
                type="text"
                value={subtitle}
                onChange={(e) => setSubtitle(e.target.value)}
                placeholder="Displacement, Memory, and the Materiality of Written Forms"
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 font-serif text-sm italic rounded"
              />
            </div>
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
              Curatorial Excerpt (Overview on Home Page)
            </label>
            <textarea
              rows={2}
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border p-3 font-serif text-sm rounded"
            />
          </div>

          {/* Hero Image & Preview */}
          <div className="p-4 bg-[var(--bg-subtle,#FAF9F5)] border archival-border rounded space-y-3">
            <div className="text-xs font-mono uppercase tracking-wider text-[var(--text-primary,#171717)] font-semibold flex items-center space-x-1.5">
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Hero Work Image &amp; Visual Specimen</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="block text-[10px] font-mono text-[var(--text-muted,#8C8880)] uppercase">
                  Image URL
                </label>
                <input
                  type="text"
                  value={heroImage}
                  onChange={(e) => setHeroImage(e.target.value)}
                  placeholder="https://images.unsplash.com/..."
                  className="w-full bg-[var(--bg-surface,#FCFBF8)] border archival-border p-2 text-xs font-mono rounded"
                />

                <label className="block text-[10px] font-mono text-[var(--text-muted,#8C8880)] uppercase pt-1">
                  Image Caption / Alt Text
                </label>
                <input
                  type="text"
                  value={heroImageAlt}
                  onChange={(e) => setHeroImageAlt(e.target.value)}
                  placeholder="Cast bronze letterform study in raking morning light..."
                  className="w-full bg-[var(--bg-surface,#FCFBF8)] border archival-border p-2 text-xs font-mono rounded"
                />
              </div>

              {/* Live Preview Box */}
              <div className="border archival-border rounded bg-black/5 p-2 flex flex-col items-center justify-center min-h-[140px] overflow-hidden">
                {heroImage ? (
                  <div className="w-full">
                    <img
                      src={heroImage}
                      alt={heroImageAlt || 'Hero Preview'}
                      referrerPolicy="no-referrer"
                      className="w-full h-36 object-cover rounded border archival-border"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div className="text-[10px] font-mono text-[var(--text-muted,#8C8880)] mt-1 truncate">
                      Live Hero Image Preview
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

          {/* Long Content Paragraphs */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase font-semibold">
                Essay Paragraphs &amp; Monograph Text
              </label>
              <button
                type="button"
                onClick={handleAddParagraph}
                className="px-2.5 py-1 text-xs font-mono bg-[var(--bg-subtle,#FAF9F5)] border archival-border hover:bg-[var(--text-primary,#171717)] hover:text-[var(--bg-primary,#FCFBF8)] rounded transition-colors flex items-center space-x-1"
              >
                <Plus className="w-3 h-3" />
                <span>+ Add Paragraph</span>
              </button>
            </div>

            <div className="space-y-3">
              {paragraphs.map((p, idx) => (
                <div key={idx} className="relative group">
                  <div className="flex items-center justify-between text-[10px] font-mono text-[var(--text-muted,#8C8880)] mb-1">
                    <span>Paragraph 0{idx + 1}</span>
                    {paragraphs.length > 1 && (
                      <button
                        type="button"
                        onClick={() => handleRemoveParagraph(idx)}
                        className="text-red-500 hover:underline"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <textarea
                    rows={4}
                    value={p}
                    onChange={(e) => handleParagraphChange(idx, e.target.value)}
                    placeholder="Enter essay text paragraph..."
                    className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border p-3 font-serif text-sm leading-relaxed rounded"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Layout Configuration */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 border-t archival-border">
            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Home Composition Scale
              </label>
              <select
                value={scale}
                onChange={(e) => setScale(e.target.value as any)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
              >
                <option value="dominant">Dominant (Hero Full Scale)</option>
                <option value="standard">Standard (Balanced Display)</option>
                <option value="compact">Compact (Minimalist)</option>
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-[var(--text-muted,#8C8880)] uppercase mb-1">
                Home Alignment
              </label>
              <select
                value={alignment}
                onChange={(e) => setAlignment(e.target.value as any)}
                className="w-full bg-[var(--bg-primary,#FCFBF8)] border archival-border px-3 py-2 text-xs font-mono rounded"
              >
                <option value="left">Left Aligned</option>
                <option value="center">Center Aligned</option>
                <option value="right">Right Aligned</option>
              </select>
            </div>
          </div>

          {/* Footer Controls */}
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
              <span>Save &amp; Update Work</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
