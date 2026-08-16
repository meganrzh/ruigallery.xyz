import React from 'react';
import { RouterProvider, useRouter } from './router/RouterContext';
import { DataProvider } from './context/DataContext';
import { StyleProvider, useStyle } from './context/StyleContext';
import { Header } from './components/navigation/Header';
import { Footer } from './components/navigation/Footer';
import { HomePage } from './components/pages/HomePage';
import { CuratedWorkDetail } from './components/curated/CuratedWorkDetail';
import { LaboratoryLanding } from './components/pages/LaboratoryLanding';
import { CollectionView } from './components/pages/CollectionView';
import { StudyView } from './components/pages/StudyView';
import { EntryView } from './components/pages/EntryView';
import { ArchiveTable } from './components/archive/ArchiveTable';
import { AboutView } from './components/about/AboutView';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ArrowLeft } from 'lucide-react';

const AppContent: React.FC = () => {
  const { currentRoute } = useRouter();
  const { settings } = useStyle();

  const renderCurrentView = () => {
    switch (currentRoute.name) {
      case 'home':
        return <HomePage />;

      case 'work':
        return <CuratedWorkDetail slug={currentRoute.params.slug} />;

      case 'laboratory':
        return <LaboratoryLanding />;

      case 'collection':
        return <CollectionView slug={currentRoute.params.slug} />;

      case 'study':
        return <StudyView slug={currentRoute.params.slug} />;

      case 'entry':
        return <EntryView slug={currentRoute.params.slug} />;

      case 'archive':
        return (
          <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-12 md:py-16">
            <ArchiveTable
              initialThread={currentRoute.queryParams.thread}
              initialCollection={currentRoute.queryParams.collection}
            />
          </div>
        );

      case 'about':
        return <AboutView />;

      case 'admin':
        return <AdminDashboard />;

      default:
        return (
          <div className="max-w-4xl mx-auto px-6 py-28 text-center space-y-6">
            <div className="text-xs font-mono uppercase text-[var(--text-muted,#8C8880)]">
              404 // DOCUMENT NOT FOUND
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[var(--text-primary,#171717)]">
              Archival Coordinate Not Found
            </h1>
            <p className="font-serif text-lg text-[var(--text-secondary,#66645E)] max-w-md mx-auto">
              The requested catalog route ({currentRoute.path}) does not exist in the current RUI
              system.
            </p>
            <div className="pt-4">
              <a
                href="/"
                className="inline-flex items-center space-x-2 text-xs font-mono uppercase tracking-wider px-5 py-2.5 bg-[var(--text-primary,#171717)] text-[var(--bg-primary,#FCFBF8)]"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Return to Curated Gallery</span>
              </a>
            </div>
          </div>
        );
    }
  };

  return (
    <div
      className={`min-h-screen flex flex-col bg-[var(--bg-primary,#FCFBF8)] text-[var(--text-primary,#171717)] transition-colors duration-300 relative ${
        settings.showGridOverlay ? 'archival-grid-pattern' : ''
      }`}
    >
      <Header />
      <main className="flex-grow">{renderCurrentView()}</main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <DataProvider>
      <StyleProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </StyleProvider>
    </DataProvider>
  );
}
