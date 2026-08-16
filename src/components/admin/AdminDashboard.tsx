import React, { useState, useEffect } from 'react';
import { useData } from '../../context/DataContext';
import { useRouter } from '../../router/RouterContext';
import { useStyle } from '../../context/StyleContext';
import { Entry, CuratedWork, ContentBlock, ContentBlockType } from '../../types';
import { RuiCalligraphy } from '../calligraphy/RuiCalligraphy';
import { EditEntryModal } from './EditEntryModal';
import { EditWorkModal } from './EditWorkModal';
import {
  Plus,
  Trash2,
  Eye,
  CheckCircle2,
  FileText,
  Folder,
  Layers,
  Hash,
  Database,
  RotateCcw,
  Sparkles,
  ArrowUpRight,
  Clock,
  Palette,
  Check,
  Edit3,
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    collections,
    studies,
    entries,
    threads,
    curatedWorks,
    createEntry,
    deleteEntry,
    resetToDefaults,
  } = useData();
  const {
    settings,
    setTheme,
    setCalligraphyScript,
    setTypographyPairing,
    setAnimationSpeed,
    setInkColor,
    replayAnimation,
    applyPreset,
    openStyleModal,
    presets,
  } = useStyle();
  const { navigate, currentRoute } = useRouter();

  const [activeTab, setActiveTab] = useState<'create-entry' | 'manage-entries' | 'manage-works' | 'style-engine'>('create-entry');
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Edit Modals State
  const [editingEntry, setEditingEntry] = useState<Entry | null>(null);
  const [editingWork, setEditingWork] = useState<CuratedWork | null>(null);

  // Check URL params for direct edit requests
  useEffect(() => {
    if (currentRoute.queryParams.editEntry) {
      const ent = entries.find(
        (e) => e.id === currentRoute.queryParams.editEntry || e.slug === currentRoute.queryParams.editEntry
      );
      if (ent) {
        setEditingEntry(ent);
        setActiveTab('manage-entries');
      }
    } else if (currentRoute.queryParams.editWork) {
      const wrk = curatedWorks.find(
        (w) => w.id === currentRoute.queryParams.editWork || w.slug === currentRoute.queryParams.editWork
      );
      if (wrk) {
        setEditingWork(wrk);
        setActiveTab('manage-works');
      }
    }
  }, [currentRoute.queryParams, entries, curatedWorks]);

  // New Entry Form State
  const defaultNextNumber = String(
    Math.max(...entries.map((e) => parseInt(e.entryNumber, 10) || 0), 0) + 1
  ).padStart(3, '0');

  const [title, setTitle] = useState('');
  const [selectedCollectionId, setSelectedCollectionId] = useState(
    collections[0]?.id || ''
  );
  const availableStudies = studies.filter(
    (s) => s.collectionId === selectedCollectionId
  );
  const [selectedStudyId, setSelectedStudyId] = useState(
    availableStudies[0]?.id || studies[0]?.id || ''
  );
  const [entryNumber, setEntryNumber] = useState(defaultNextNumber);
  const [revision, setRevision] = useState('REV 00');
  const [createdDate, setCreatedDate] = useState('2026.08.16');
  const [location, setLocation] = useState('Los Angeles');
  const [selectedThreadIds, setSelectedThreadIds] = useState<string[]>([
    threads[0]?.id || '',
    threads[4]?.id || '',
  ]);
  const [selectedRelatedStudyIds, setSelectedRelatedStudyIds] = useState<string[]>([]);
  const [summary, setSummary] = useState('');
  const [visibility, setVisibility] = useState<'published' | 'draft' | 'hidden'>('published');

  // Flexible Content Blocks for New Entry
  const [blocks, setBlocks] = useState<ContentBlock[]>([
    {
      id: 'b-1',
      type: 'text',
      content:
        'Observations recorded during morning field study. The surface geometry exhibits subtle temporal fractures along the primary axis.',
    },
    {
      id: 'b-2',
      type: 'fragment',
      fragments: [
        {
          id: 'f-1',
          timestamp: '10:15',
          note: 'Ambient humidity 64%; recorded light angle at 32 degrees.',
          tag: 'Field Log',
        },
      ],
    },
  ]);

  const handleAddBlock = (type: ContentBlockType) => {
    const newBlock: ContentBlock = {
      id: `blk-${Date.now()}`,
      type,
      content: type === 'text' || type === 'quote' ? '' : undefined,
      imageUrl:
        type === 'image'
          ? 'https://images.unsplash.com/photo-1513694203232-719a280e022f?q=80&w=1200&auto=format&fit=crop'
          : undefined,
      caption: type === 'image' ? 'Specimen documentation note.' : undefined,
      source: type === 'reference' ? 'Field Ledger 08, RUI Archive' : undefined,
      fragments:
        type === 'fragment'
          ? [{ id: `fr-${Date.now()}`, timestamp: '12:00', note: 'New fragment note.', tag: 'Specimen' }]
          : undefined,
    };
    setBlocks([...blocks, newBlock]);
  };

  const handleRemoveBlock = (id: string) => {
    setBlocks(blocks.filter((b) => b.id !== id));
  };

  const handleUpdateBlockContent = (id: string, newContent: string) => {
    setBlocks(
      blocks.map((b) => (b.id === id ? { ...b, content: newContent } : b))
    );
  };

  const handleUpdateBlockImage = (id: string, imageUrl: string, caption: string) => {
    setBlocks(
      blocks.map((b) => (b.id === id ? { ...b, imageUrl, caption } : b))
    );
  };

  const handleToggleThread = (threadId: string) => {
    if (selectedThreadIds.includes(threadId)) {
      setSelectedThreadIds(selectedThreadIds.filter((id) => id !== threadId));
    } else {
      setSelectedThreadIds([...selectedThreadIds, threadId]);
    }
  };

  const handlePublishEntry = (asDraft = false) => {
    if (!title.trim()) {
      alert('Please enter a title for the entry.');
      return;
    }

    const slug = `entry-${entryNumber}-${title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)+/g, '')}`;

    const newEntry = createEntry({
      slug,
      entryNumber,
      title,
      collectionId: selectedCollectionId,
      studyId: selectedStudyId || availableStudies[0]?.id || studies[0]?.id,
      revision,
      createdDate,
      publishedDate: createdDate,
      location,
      threadIds: selectedThreadIds,
      relatedStudyIds: selectedRelatedStudyIds,
      contentBlocks: blocks,
      visibility: asDraft ? 'draft' : visibility,
      summary: summary || blocks.find((b) => b.type === 'text')?.content?.slice(0, 140),
    });

    setSuccessMessage(`Entry NO. ${newEntry.entryNumber} successfully published to archive!`);

    // Reset form
    setTitle('');
    setSummary('');
    const nextNum = String(parseInt(entryNumber, 10) + 1).padStart(3, '0');
    setEntryNumber(nextNum);

    setTimeout(() => {
      setSuccessMessage(null);
    }, 4000);
  };

  return (
    <div id="admin-studio-container" className="w-full pb-24">
      {/* Top Banner */}
      <header className="border-b archival-border bg-[#FAF9F5] py-10">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 space-y-3">
          <div className="flex items-center space-x-2 text-xs font-mono uppercase tracking-widest text-[#8C8880]">
            <span className="w-2 h-2 rounded-full bg-[#171717]"></span>
            <span>RUI Administrative Content Environment</span>
            <span className="text-[#C5C2BA]">/</span>
            <span>Mock Authoring Interface</span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4">
            <h1 className="font-serif text-3xl sm:text-4xl text-[#171717] font-normal tracking-tight">
              Content Management Studio
            </h1>
            <div className="flex items-center space-x-3 text-xs font-mono">
              <button
                onClick={() => {
                  if (confirm('Reset prototype data to original baseline?')) {
                    resetToDefaults();
                    alert('Data restored to initial baseline.');
                  }
                }}
                className="text-[#8C8880] hover:text-[#171717] flex items-center space-x-1 underline"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset Default Data</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Dashboard Overview Metrics */}
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 pt-8">
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
          <div className="p-4 bg-[#FAF9F5] border archival-border">
            <div className="text-[10px] font-mono text-[#8C8880] uppercase">Curated Works</div>
            <div className="font-serif text-2xl text-[#171717] mt-1">{curatedWorks.length}</div>
          </div>
          <div className="p-4 bg-[#FAF9F5] border archival-border">
            <div className="text-[10px] font-mono text-[#8C8880] uppercase">Lab Entries</div>
            <div className="font-serif text-2xl text-[#171717] mt-1">{entries.length}</div>
          </div>
          <div className="p-4 bg-[#FAF9F5] border archival-border">
            <div className="text-[10px] font-mono text-[#8C8880] uppercase">Studies</div>
            <div className="font-serif text-2xl text-[#171717] mt-1">{studies.length}</div>
          </div>
          <div className="p-4 bg-[#FAF9F5] border archival-border">
            <div className="text-[10px] font-mono text-[#8C8880] uppercase">Collections</div>
            <div className="font-serif text-2xl text-[#171717] mt-1">{collections.length}</div>
          </div>
          <div className="p-4 bg-[#FAF9F5] border archival-border">
            <div className="text-[10px] font-mono text-[#8C8880] uppercase">Threads</div>
            <div className="font-serif text-2xl text-[#171717] mt-1">{threads.length}</div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="mt-8 border-b archival-border flex space-x-8 text-xs font-mono">
          <button
            onClick={() => setActiveTab('create-entry')}
            className={`pb-3 font-medium transition-colors relative ${
              activeTab === 'create-entry'
                ? 'text-[#171717]'
                : 'text-[#8C8880] hover:text-[#171717]'
            }`}
          >
            <span>+ Create Laboratory Entry</span>
            {activeTab === 'create-entry' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#171717]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('manage-entries')}
            className={`pb-3 font-medium transition-colors relative ${
              activeTab === 'manage-entries'
                ? 'text-[#171717]'
                : 'text-[#8C8880] hover:text-[#171717]'
            }`}
          >
            <span>Manage Entries ({entries.length})</span>
            {activeTab === 'manage-entries' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#171717]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('manage-works')}
            className={`pb-3 font-medium transition-colors relative ${
              activeTab === 'manage-works'
                ? 'text-[var(--text-primary,#171717)]'
                : 'text-[var(--text-muted,#8C8880)] hover:text-[var(--text-primary,#171717)]'
            }`}
          >
            <span>Curated Works ({curatedWorks.length})</span>
            {activeTab === 'manage-works' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--text-primary,#171717)]" />
            )}
          </button>
          <button
            onClick={() => setActiveTab('style-engine')}
            className={`pb-3 font-medium transition-colors relative flex items-center space-x-1.5 ${
              activeTab === 'style-engine'
                ? 'text-[var(--text-primary,#171717)]'
                : 'text-[var(--text-muted,#8C8880)] hover:text-[var(--text-primary,#171717)]'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5 text-[var(--accent-color,#171717)]" />
            <span>Aesthetics &amp; Style Engine</span>
            {activeTab === 'style-engine' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[var(--text-primary,#171717)]" />
            )}
          </button>
        </div>

        {/* Success Alert Banner */}
        {successMessage && (
          <div className="mt-6 p-4 bg-[#E8F3EB] border border-[#2E6930] text-[#1E4E20] text-xs font-mono flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{successMessage}</span>
            </div>
            <a href="/laboratory" className="underline font-bold">
              View in Laboratory ↗
            </a>
          </div>
        )}

        {/* Tab 1: Create Entry Form */}
        {activeTab === 'create-entry' && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left/Main Form Area */}
            <div className="lg:col-span-8 space-y-8 bg-[#FAF9F5] border archival-border p-6 sm:p-8">
              <div className="flex items-center justify-between border-b archival-border pb-3">
                <div className="text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold">
                  New Specimen Document
                </div>
                <div className="text-xs font-mono text-[#8C8880]">
                  SCHEMA: RUI-LAB-V1
                </div>
              </div>

              {/* Title Field */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#8C8880] uppercase tracking-wider block">
                  Entry Title *
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Travertine Inscription Analysis at Ostia"
                  className="w-full bg-[#FCFBF8] border archival-border px-3 py-2.5 text-base font-serif text-[#171717] placeholder-[#A3A099] focus:outline-none focus:border-[#171717]"
                />
              </div>

              {/* Summary / Excerpt Field */}
              <div className="space-y-1">
                <label className="text-xs font-mono text-[#8C8880] uppercase tracking-wider block">
                  Short Abstract / Summary (Optional)
                </label>
                <textarea
                  rows={2}
                  value={summary}
                  onChange={(e) => setSummary(e.target.value)}
                  placeholder="Brief 1-2 sentence overview of the observation."
                  className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-sans text-[#171717] focus:outline-none focus:border-[#171717]"
                />
              </div>

              {/* Metadata Selectors Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                {/* Collection */}
                <div className="space-y-1">
                  <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
                    Parent Collection *
                  </label>
                  <select
                    value={selectedCollectionId}
                    onChange={(e) => {
                      setSelectedCollectionId(e.target.value);
                      const stds = studies.filter((s) => s.collectionId === e.target.value);
                      if (stds.length > 0) setSelectedStudyId(stds[0].id);
                    }}
                    className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717]"
                  >
                    {collections.map((c) => (
                      <option key={c.id} value={c.id}>
                        {c.code} — {c.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Study */}
                <div className="space-y-1">
                  <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
                    Parent Study *
                  </label>
                  <select
                    value={selectedStudyId}
                    onChange={(e) => setSelectedStudyId(e.target.value)}
                    className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717]"
                  >
                    {availableStudies.length > 0 ? (
                      availableStudies.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.code} — {s.title}
                        </option>
                      ))
                    ) : (
                      <option value="">No studies in collection</option>
                    )}
                  </select>
                </div>

                {/* Entry Number & Revision */}
                <div className="space-y-1">
                  <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
                    Entry Number (Auto)
                  </label>
                  <input
                    type="text"
                    value={entryNumber}
                    onChange={(e) => setEntryNumber(e.target.value)}
                    className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] font-bold focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
                    RUI Revision
                  </label>
                  <input
                    type="text"
                    value={revision}
                    onChange={(e) => setRevision(e.target.value)}
                    className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                {/* Timestamp & Location */}
                <div className="space-y-1">
                  <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
                    Created Date (YYYY.MM.DD)
                  </label>
                  <input
                    type="text"
                    value={createdDate}
                    onChange={(e) => setCreatedDate(e.target.value)}
                    className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
                    Location
                  </label>
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    placeholder="e.g. Venice, Los Angeles, Taipei"
                    className="w-full bg-[#FCFBF8] border archival-border px-3 py-2 text-xs font-mono text-[#171717] focus:outline-none focus:border-[#171717]"
                  />
                </div>
              </div>

              {/* Multi-Select Horizontal Threads */}
              <div className="space-y-2 pt-2 border-t archival-border">
                <label className="text-xs font-mono text-[#8C8880] uppercase tracking-wider block">
                  Assign Conceptual Threads:
                </label>
                <div className="flex flex-wrap gap-2 text-xs font-mono">
                  {threads.map((t) => {
                    const isSelected = selectedThreadIds.includes(t.id);
                    return (
                      <button
                        type="button"
                        key={t.id}
                        onClick={() => handleToggleThread(t.id)}
                        className={`px-2.5 py-1 rounded border transition-colors ${
                          isSelected
                            ? 'bg-[#171717] text-[#FCFBF8] border-[#171717]'
                            : 'bg-[#FCFBF8] text-[#52504B] border-[#D6D3CC] hover:border-[#171717]'
                        }`}
                      >
                        #{t.name}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Flexible Content Blocks Builder */}
              <div className="space-y-4 pt-4 border-t archival-border">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-mono text-[#171717] uppercase tracking-wider font-semibold">
                    Document Notebook Content ({blocks.length} Blocks)
                  </label>
                  <div className="flex items-center space-x-2 text-[11px] font-mono">
                    <button
                      type="button"
                      onClick={() => handleAddBlock('text')}
                      className="px-2 py-1 bg-[#EFECE6] hover:bg-[#171717] hover:text-[#FCFBF8] rounded transition-colors"
                    >
                      + Text
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('image')}
                      className="px-2 py-1 bg-[#EFECE6] hover:bg-[#171717] hover:text-[#FCFBF8] rounded transition-colors"
                    >
                      + Image
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('fragment')}
                      className="px-2 py-1 bg-[#EFECE6] hover:bg-[#171717] hover:text-[#FCFBF8] rounded transition-colors"
                    >
                      + Fragment
                    </button>
                    <button
                      type="button"
                      onClick={() => handleAddBlock('reference')}
                      className="px-2 py-1 bg-[#EFECE6] hover:bg-[#171717] hover:text-[#FCFBF8] rounded transition-colors"
                    >
                      + Source Ref
                    </button>
                  </div>
                </div>

                {/* Blocks List */}
                <div className="space-y-4">
                  {blocks.map((b, index) => (
                    <div
                      key={b.id}
                      className="p-4 bg-[#FCFBF8] border archival-border space-y-2 relative"
                    >
                      <div className="flex items-center justify-between text-[10px] font-mono text-[#8C8880] uppercase">
                        <span>Block 0{index + 1} — {b.type}</span>
                        <button
                          type="button"
                          onClick={() => handleRemoveBlock(b.id)}
                          className="text-[#8C8880] hover:text-[#C53030]"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {b.type === 'text' && (
                        <textarea
                          rows={3}
                          value={b.content || ''}
                          onChange={(e) => handleUpdateBlockContent(b.id, e.target.value)}
                          placeholder="Type long-form observation text..."
                          className="w-full bg-[#FAF9F5] border archival-border p-2.5 font-serif text-sm text-[#171717] focus:outline-none focus:border-[#171717]"
                        />
                      )}

                      {b.type === 'image' && (
                        <div className="space-y-2 text-xs font-mono">
                          <input
                            type="text"
                            value={b.imageUrl || ''}
                            onChange={(e) =>
                              handleUpdateBlockImage(b.id, e.target.value, b.caption || '')
                            }
                            placeholder="Image URL..."
                            className="w-full bg-[#FAF9F5] border archival-border p-2"
                          />
                          <input
                            type="text"
                            value={b.caption || ''}
                            onChange={(e) =>
                              handleUpdateBlockImage(b.id, b.imageUrl || '', e.target.value)
                            }
                            placeholder="Specimen caption..."
                            className="w-full bg-[#FAF9F5] border archival-border p-2"
                          />
                        </div>
                      )}

                      {b.type === 'fragment' && (
                        <div className="space-y-1 text-xs font-mono text-[#52504B]">
                          <p>Contains timestamped field micro-observations.</p>
                        </div>
                      )}

                      {b.type === 'reference' && (
                        <input
                          type="text"
                          value={b.source || ''}
                          onChange={(e) =>
                            setBlocks(
                              blocks.map((blk) =>
                                blk.id === b.id ? { ...blk, source: e.target.value } : blk
                              )
                            )
                          }
                          placeholder="Bibliographic citation reference..."
                          className="w-full bg-[#FAF9F5] border archival-border p-2 text-xs font-mono"
                        />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sidebar: Publishing Workflow Controls */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-[#FAF9F5] border archival-border p-6 space-y-6">
                <div className="text-xs font-mono uppercase tracking-widest text-[#171717] font-semibold border-b archival-border pb-2">
                  Publication Workflow
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <label className="text-[10px] text-[#8C8880] uppercase tracking-wider block">
                    Visibility State
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {(['published', 'draft', 'hidden'] as const).map((v) => (
                      <button
                        type="button"
                        key={v}
                        onClick={() => setVisibility(v)}
                        className={`py-1.5 text-center uppercase text-[11px] rounded border ${
                          visibility === v
                            ? 'bg-[#171717] text-[#FCFBF8] border-[#171717]'
                            : 'bg-[#FCFBF8] text-[#52504B] border-[#D6D3CC]'
                        }`}
                      >
                        {v}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 pt-4 border-t archival-border text-xs font-mono">
                  <button
                    type="button"
                    onClick={() => handlePublishEntry(false)}
                    className="w-full py-3 bg-[#171717] text-[#FCFBF8] hover:bg-[#33312C] transition-colors flex items-center justify-center space-x-2 uppercase tracking-wider font-semibold"
                  >
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Publish to Repository</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handlePublishEntry(true)}
                    className="w-full py-2.5 bg-[#FCFBF8] border archival-border text-[#474540] hover:border-[#171717] transition-colors uppercase tracking-wider"
                  >
                    Save as Working Draft
                  </button>
                </div>

                <div className="pt-2 text-[11px] font-mono text-[#8C8880] leading-relaxed">
                  ✓ Saves automatically to browser session memory. Entries will immediately be
                  viewable on Home, Laboratory, Collection, Study, and Archive index pages.
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Manage Entries List */}
        {activeTab === 'manage-entries' && (
          <div className="mt-8 space-y-4">
            <div className="border archival-border bg-[#FCFBF8] overflow-x-auto">
              <table className="w-full text-left text-xs font-mono border-collapse">
                <thead>
                  <tr className="bg-[#FAF9F5] border-b archival-border text-[#8C8880] uppercase">
                    <th className="p-3 w-16">Entry</th>
                    <th className="p-3 w-28">Date</th>
                    <th className="p-3">Title</th>
                    <th className="p-3 w-32">Status</th>
                    <th className="p-3 w-32 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y archival-border">
                  {entries.map((ent) => (
                    <tr key={ent.id} className="hover:bg-[#FAF9F5]">
                      <td className="p-3 font-bold text-[#171717]">NO. {ent.entryNumber}</td>
                      <td className="p-3 text-[#78756E]">{ent.createdDate}</td>
                      <td className="p-3 font-serif text-sm text-[#171717]">
                        <a href={`/entry/${ent.slug}`} className="hover:underline">
                          {ent.title}
                        </a>
                      </td>
                      <td className="p-3">
                        <span className="bg-[#EFECE6] text-[#42403B] px-2 py-0.5 rounded uppercase text-[10px]">
                          {ent.visibility}
                        </span>
                      </td>
                      <td className="p-3 text-right space-x-3">
                        <button
                          onClick={() => setEditingEntry(ent)}
                          className="text-[var(--text-primary,#171717)] hover:underline inline-flex items-center space-x-1 font-medium"
                        >
                          <Edit3 className="w-3 h-3" />
                          <span>Edit</span>
                        </button>
                        <a
                          href={`/entry/${ent.slug}`}
                          className="text-[#78756E] hover:text-[#171717] hover:underline"
                        >
                          View
                        </a>
                        <button
                          onClick={() => {
                            if (confirm(`Delete Entry NO. ${ent.entryNumber}?`)) {
                              deleteEntry(ent.id);
                            }
                          }}
                          className="text-[#C53030] hover:underline"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Curated Works Management */}
        {activeTab === 'manage-works' && (
          <div className="mt-8 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {curatedWorks.map((work) => (
                <div
                  key={work.id}
                  className="bg-[#FAF9F5] border archival-border p-6 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs font-mono text-[#8C8880] uppercase">
                    <span>{work.mediumType}</span>
                    <span>{work.date}</span>
                  </div>
                  <h3 className="font-serif text-xl text-[#171717] font-normal">
                    <a href={`/work/${work.slug}`} className="hover:underline">
                      {work.title}
                    </a>
                  </h3>
                  <p className="font-sans text-xs text-[#52504B] line-clamp-2">
                    {work.excerpt}
                  </p>
                  <div className="pt-2 flex justify-between items-center text-xs font-mono">
                    <span className="text-[#8C8880]">
                      Layout: {work.homeLayout.scale} ({work.homeLayout.alignment})
                    </span>
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setEditingWork(work)}
                        className="text-[var(--text-primary,#171717)] font-medium hover:underline flex items-center space-x-1"
                      >
                        <Edit3 className="w-3.5 h-3.5" />
                        <span>Edit Work</span>
                      </button>
                      <a
                        href={`/work/${work.slug}`}
                        className="text-[#78756E] hover:text-[#171717] hover:underline flex items-center space-x-1"
                      >
                        <span>Inspect</span>
                        <ArrowUpRight className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 4: Style Engine Management */}
        {activeTab === 'style-engine' && (
          <div className="mt-8 space-y-8">
            <div className="p-6 bg-[var(--bg-surface,#FFFFFF)] border archival-border flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="p-3 border archival-border rounded bg-[var(--bg-subtle,#F4F1EA)]">
                  <RuiCalligraphy size={64} interactive={false} />
                </div>
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[var(--text-primary,#171717)]">
                    Active Aesthetic Configuration
                  </h3>
                  <p className="text-xs font-mono text-[var(--text-muted,#8A8780)]">
                    Theme: <span className="uppercase text-[var(--text-primary,#171717)]">{settings.theme}</span> • Script: <span className="uppercase text-[var(--text-primary,#171717)]">{settings.calligraphyScript}</span> • Speed: {settings.animationSpeed}
                  </p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button
                  onClick={replayAnimation}
                  className="px-3 py-1.5 text-xs font-mono border archival-border hover:bg-[var(--bg-subtle,#F4F1EA)] rounded flex items-center space-x-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Replay Strokes</span>
                </button>
                <button
                  onClick={openStyleModal}
                  className="px-4 py-1.5 text-xs font-mono font-medium bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] rounded hover:opacity-90 transition-opacity flex items-center space-x-1.5"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Launch Style Customizer Modal</span>
                </button>
              </div>
            </div>

            {/* Presets Grid */}
            <div className="space-y-3">
              <div className="text-xs font-mono text-[var(--text-muted,#8A8780)] uppercase tracking-wider">
                Quick Apply Preset Profiles
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {presets.map((preset) => {
                  const isActive =
                    settings.theme === preset.theme &&
                    settings.calligraphyScript === preset.calligraphyScript;
                  return (
                    <div
                      key={preset.id}
                      className={`p-5 rounded border bg-[var(--bg-surface,#FFFFFF)] flex flex-col justify-between space-y-4 transition-all ${
                        isActive ? 'border-[var(--text-primary,#171717)] ring-1 ring-[var(--text-primary,#171717)] shadow-sm' : 'border-archival'
                      }`}
                    >
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="font-serif font-semibold text-base text-[var(--text-primary,#171717)]">
                            {preset.name}
                          </span>
                          {isActive && (
                            <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)]">
                              ACTIVE
                            </span>
                          )}
                        </div>
                        <p className="text-xs font-cjk text-[var(--accent-color,#171717)]">
                          {preset.cjkName}
                        </p>
                        <p className="text-xs font-serif text-[var(--text-secondary,#57554F)]">
                          {preset.description}
                        </p>
                      </div>

                      <div className="pt-3 border-t archival-border flex items-center justify-between">
                        <div className="text-[11px] font-mono text-[var(--text-muted,#8A8780)] uppercase">
                          {preset.calligraphyScript} / {preset.theme}
                        </div>
                        <button
                          onClick={() => applyPreset(preset)}
                          className="px-3 py-1 text-xs font-mono border archival-border hover:bg-[var(--text-primary,#171717)] hover:text-[var(--bg-primary,#FCFBF8)] rounded transition-colors"
                        >
                          {isActive ? 'Re-Apply' : 'Apply Preset'}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Edit Entry Modal */}
      <EditEntryModal
        entry={editingEntry}
        isOpen={Boolean(editingEntry)}
        onClose={() => setEditingEntry(null)}
        onSave={(updated) => {
          setSuccessMessage(`Entry NO. ${updated.entryNumber} updated successfully!`);
          setTimeout(() => setSuccessMessage(null), 4000);
        }}
      />

      {/* Edit Curated Work Modal */}
      <EditWorkModal
        work={editingWork}
        isOpen={Boolean(editingWork)}
        onClose={() => setEditingWork(null)}
        onSave={(updated) => {
          setSuccessMessage(`Work "${updated.title}" updated successfully!`);
          setTimeout(() => setSuccessMessage(null), 4000);
        }}
      />

      {/* Success Toast */}
      {successMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)] px-5 py-2.5 rounded shadow-xl text-xs font-mono flex items-center space-x-2 border border-white/20 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{successMessage}</span>
        </div>
      )}
    </div>
  );
};
