import React, { createContext, useContext, useEffect, useState } from 'react';
import {
  AUTHOR_PROFILE,
  INITIAL_COLLECTIONS,
  INITIAL_CURATED_WORKS,
  INITIAL_ENTRIES,
  INITIAL_PROFESSIONAL_ITEMS,
  INITIAL_STUDIES,
  INITIAL_THREADS,
} from '../data/mockData';
import {
  AuthorProfile,
  Collection,
  CuratedWork,
  Entry,
  ProfessionalItem,
  Study,
  Thread,
} from '../types';

interface DataContextType {
  collections: Collection[];
  studies: Study[];
  entries: Entry[];
  threads: Thread[];
  curatedWorks: CuratedWork[];
  authorProfile: AuthorProfile;
  professionalItems: ProfessionalItem[];

  // Helper selectors
  getCollectionBySlug: (slug: string) => Collection | undefined;
  getCollectionById: (id: string) => Collection | undefined;
  getStudyBySlug: (slug: string) => Study | undefined;
  getStudyById: (id: string) => Study | undefined;
  getStudiesByCollection: (collectionId: string) => Study[];
  getEntryBySlug: (slug: string) => Entry | undefined;
  getEntryById: (id: string) => Entry | undefined;
  getEntriesByStudy: (studyId: string) => Entry[];
  getEntriesByThread: (threadId: string) => Entry[];
  getThreadById: (id: string) => Thread | undefined;
  getThreadBySlug: (slug: string) => Thread | undefined;
  getCuratedWorkBySlug: (slug: string) => CuratedWork | undefined;
  getChronologicalEntries: (includeDrafts?: boolean) => Entry[];
  getRelatedStudiesForStudy: (studyId: string) => Study[];
  getRelatedStudiesForEntry: (entry: Entry) => Study[];
  getRelatedEntriesForWork: (work: CuratedWork) => Entry[];
  getRelatedStudiesForWork: (work: CuratedWork) => Study[];

  // Admin mutation operations
  createEntry: (newEntry: Omit<Entry, 'id'>) => Entry;
  updateEntry: (id: string, updated: Partial<Entry>) => void;
  deleteEntry: (id: string) => void;
  createStudy: (newStudy: Omit<Study, 'id'>) => Study;
  createCollection: (newCol: Omit<Collection, 'id'>) => Collection;
  createCuratedWork: (newWork: Omit<CuratedWork, 'id'>) => CuratedWork;
  updateCuratedWork: (id: string, updated: Partial<CuratedWork>) => void;
  deleteCuratedWork: (id: string) => void;
  resetToDefaults: () => void;
}

const STORAGE_KEY = 'rui_gallery_prototype_data_v1';

const DataContext = createContext<DataContextType | null>(null);

export const DataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [collections, setCollections] = useState<Collection[]>(INITIAL_COLLECTIONS);
  const [studies, setStudies] = useState<Study[]>(INITIAL_STUDIES);
  const [entries, setEntries] = useState<Entry[]>(INITIAL_ENTRIES);
  const [threads, setThreads] = useState<Thread[]>(INITIAL_THREADS);
  const [curatedWorks, setCuratedWorks] = useState<CuratedWork[]>(INITIAL_CURATED_WORKS);
  const [authorProfile] = useState<AuthorProfile>(AUTHOR_PROFILE);
  const [professionalItems] = useState<ProfessionalItem[]>(INITIAL_PROFESSIONAL_ITEMS);

  // Hydrate from localStorage on initial mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.collections) setCollections(parsed.collections);
        if (parsed.studies) setStudies(parsed.studies);
        if (parsed.entries) setEntries(parsed.entries);
        if (parsed.threads) setThreads(parsed.threads);
        if (parsed.curatedWorks) setCuratedWorks(parsed.curatedWorks);
      }
    } catch (e) {
      console.warn('Failed to load saved state from localStorage:', e);
    }
  }, []);

  // Save to localStorage on mutation
  const persistState = (
    c: Collection[],
    s: Study[],
    e: Entry[],
    t: Thread[],
    w: CuratedWork[]
  ) => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          collections: c,
          studies: s,
          entries: e,
          threads: t,
          curatedWorks: w,
        })
      );
    } catch (err) {
      console.warn('Failed to persist to localStorage:', err);
    }
  };

  const getCollectionBySlug = (slug: string) =>
    collections.find((c) => c.slug.toLowerCase() === slug.toLowerCase());

  const getCollectionById = (id: string) => collections.find((c) => c.id === id);

  const getStudyBySlug = (slug: string) =>
    studies.find((s) => s.slug.toLowerCase() === slug.toLowerCase());

  const getStudyById = (id: string) => studies.find((s) => s.id === id);

  const getStudiesByCollection = (collectionId: string) =>
    studies.filter((s) => s.collectionId === collectionId).sort((a, b) => a.order - b.order);

  const getEntryBySlug = (slug: string) =>
    entries.find((e) => e.slug.toLowerCase() === slug.toLowerCase());

  const getEntryById = (id: string) => entries.find((e) => e.id === id);

  const getEntriesByStudy = (studyId: string) =>
    entries
      .filter((e) => e.studyId === studyId && e.visibility !== 'hidden')
      .sort((a, b) => b.createdDate.localeCompare(a.createdDate));

  const getEntriesByThread = (threadId: string) =>
    entries
      .filter((e) => e.threadIds.includes(threadId) && e.visibility !== 'hidden')
      .sort((a, b) => b.createdDate.localeCompare(a.createdDate));

  const getThreadById = (id: string) => threads.find((t) => t.id === id);

  const getThreadBySlug = (slug: string) =>
    threads.find((t) => t.slug.toLowerCase() === slug.toLowerCase());

  const getCuratedWorkBySlug = (slug: string) =>
    curatedWorks.find((w) => w.slug.toLowerCase() === slug.toLowerCase());

  const getChronologicalEntries = (includeDrafts = false) => {
    return [...entries]
      .filter((e) => (includeDrafts ? e.visibility !== 'hidden' : e.visibility === 'published'))
      .sort((a, b) => {
        // Compare date descending, then entryNumber descending
        const dateComp = b.createdDate.localeCompare(a.createdDate);
        if (dateComp !== 0) return dateComp;
        return (parseInt(b.entryNumber, 10) || 0) - (parseInt(a.entryNumber, 10) || 0);
      });
  };

  const getRelatedStudiesForStudy = (studyId: string) => {
    const study = getStudyById(studyId);
    if (!study || !study.relatedStudyIds) return [];
    return study.relatedStudyIds
      .map((rId) => getStudyById(rId) || getStudyBySlug(rId))
      .filter((s): s is Study => s !== undefined);
  };

  const getRelatedStudiesForEntry = (entry: Entry) => {
    if (!entry.relatedStudyIds) return [];
    return entry.relatedStudyIds
      .map((rId) => getStudyById(rId) || getStudyBySlug(rId))
      .filter((s): s is Study => s !== undefined);
  };

  const getRelatedEntriesForWork = (work: CuratedWork) => {
    if (!work.relatedEntrySlugs) return [];
    return work.relatedEntrySlugs
      .map((slug) => getEntryBySlug(slug))
      .filter((e): e is Entry => e !== undefined);
  };

  const getRelatedStudiesForWork = (work: CuratedWork) => {
    if (!work.relatedStudySlugs) return [];
    return work.relatedStudySlugs
      .map((slug) => getStudyBySlug(slug))
      .filter((s): s is Study => s !== undefined);
  };

  // Admin Mutations
  const createEntry = (newEntryData: Omit<Entry, 'id'>) => {
    const id = `entry-${Date.now()}`;
    const fullEntry: Entry = {
      ...newEntryData,
      id,
    };
    const updatedEntries = [fullEntry, ...entries];
    setEntries(updatedEntries);

    // Also update parent study's entryIds
    const updatedStudies = studies.map((s) => {
      if (s.id === newEntryData.studyId) {
        return {
          ...s,
          entryIds: Array.from(new Set([id, ...s.entryIds])),
        };
      }
      return s;
    });
    setStudies(updatedStudies);

    persistState(collections, updatedStudies, updatedEntries, threads, curatedWorks);
    return fullEntry;
  };

  const updateEntry = (id: string, updated: Partial<Entry>) => {
    const updatedEntries = entries.map((e) => (e.id === id ? { ...e, ...updated } : e));
    setEntries(updatedEntries);
    persistState(collections, studies, updatedEntries, threads, curatedWorks);
  };

  const deleteEntry = (id: string) => {
    const updatedEntries = entries.filter((e) => e.id !== id);
    setEntries(updatedEntries);
    persistState(collections, studies, updatedEntries, threads, curatedWorks);
  };

  const createStudy = (newStudyData: Omit<Study, 'id'>) => {
    const id = `std-${Date.now()}`;
    const fullStudy: Study = {
      ...newStudyData,
      id,
    };
    const updatedStudies = [...studies, fullStudy];
    setStudies(updatedStudies);

    // Update parent collection
    const updatedCols = collections.map((c) => {
      if (c.id === newStudyData.collectionId) {
        return {
          ...c,
          studyIds: [...c.studyIds, id],
        };
      }
      return c;
    });
    setCollections(updatedCols);

    persistState(updatedCols, updatedStudies, entries, threads, curatedWorks);
    return fullStudy;
  };

  const createCollection = (newColData: Omit<Collection, 'id'>) => {
    const id = `col-${Date.now()}`;
    const fullCol: Collection = {
      ...newColData,
      id,
    };
    const updatedCols = [...collections, fullCol];
    setCollections(updatedCols);
    persistState(updatedCols, studies, entries, threads, curatedWorks);
    return fullCol;
  };

  const createCuratedWork = (newWorkData: Omit<CuratedWork, 'id'>) => {
    const id = `work-${Date.now()}`;
    const fullWork: CuratedWork = {
      ...newWorkData,
      id,
    };
    const updatedWorks = [fullWork, ...curatedWorks];
    setCuratedWorks(updatedWorks);
    persistState(collections, studies, entries, threads, updatedWorks);
    return fullWork;
  };

  const updateCuratedWork = (id: string, updated: Partial<CuratedWork>) => {
    const updatedWorks = curatedWorks.map((w) => (w.id === id ? { ...w, ...updated } : w));
    setCuratedWorks(updatedWorks);
    persistState(collections, studies, entries, threads, updatedWorks);
  };

  const deleteCuratedWork = (id: string) => {
    const updatedWorks = curatedWorks.filter((w) => w.id !== id);
    setCuratedWorks(updatedWorks);
    persistState(collections, studies, entries, threads, updatedWorks);
  };

  const resetToDefaults = () => {
    setCollections(INITIAL_COLLECTIONS);
    setStudies(INITIAL_STUDIES);
    setEntries(INITIAL_ENTRIES);
    setThreads(INITIAL_THREADS);
    setCuratedWorks(INITIAL_CURATED_WORKS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <DataContext.Provider
      value={{
        collections,
        studies,
        entries,
        threads,
        curatedWorks,
        authorProfile,
        professionalItems,
        getCollectionBySlug,
        getCollectionById,
        getStudyBySlug,
        getStudyById,
        getStudiesByCollection,
        getEntryBySlug,
        getEntryById,
        getEntriesByStudy,
        getEntriesByThread,
        getThreadById,
        getThreadBySlug,
        getCuratedWorkBySlug,
        getChronologicalEntries,
        getRelatedStudiesForStudy,
        getRelatedStudiesForEntry,
        getRelatedEntriesForWork,
        getRelatedStudiesForWork,
        createEntry,
        updateEntry,
        deleteEntry,
        createStudy,
        createCollection,
        createCuratedWork,
        updateCuratedWork,
        deleteCuratedWork,
        resetToDefaults,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
