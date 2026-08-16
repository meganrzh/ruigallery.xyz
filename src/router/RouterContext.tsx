import React, { createContext, useContext, useEffect, useState } from 'react';

export interface RouteMatch {
  path: string;
  name:
    | 'home'
    | 'work'
    | 'laboratory'
    | 'collection'
    | 'study'
    | 'entry'
    | 'archive'
    | 'about'
    | 'admin'
    | 'notFound';
  params: Record<string, string>;
  queryParams: Record<string, string>;
}

interface RouterContextType {
  currentRoute: RouteMatch;
  navigate: (to: string) => void;
}

const RouterContext = createContext<RouterContextType | null>(null);

function parsePath(pathname: string, search: string, hash: string): RouteMatch {
  // Support both hash-based routing (#/work/...) and path-based routing (/work/...)
  let fullPath = pathname;
  if (hash.startsWith('#/')) {
    fullPath = hash.slice(1);
  } else if (hash.startsWith('#')) {
    fullPath = hash.slice(1) || '/';
  }

  // Split path & query
  let [cleanPath, queryString] = fullPath.split('?');
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  // Normalize trailing slash (unless root)
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) {
    cleanPath = cleanPath.slice(0, -1);
  }

  const queryParams: Record<string, string> = {};
  const queryToParse = queryString || (search.startsWith('?') ? search.slice(1) : search);
  if (queryToParse) {
    const usp = new URLSearchParams(queryToParse);
    usp.forEach((val, key) => {
      queryParams[key] = val;
    });
  }

  // Match routes
  if (cleanPath === '' || cleanPath === '/') {
    return { path: cleanPath, name: 'home', params: {}, queryParams };
  }
  if (cleanPath === '/laboratory') {
    return { path: cleanPath, name: 'laboratory', params: {}, queryParams };
  }
  if (cleanPath === '/archive') {
    return { path: cleanPath, name: 'archive', params: {}, queryParams };
  }
  if (cleanPath === '/about') {
    return { path: cleanPath, name: 'about', params: {}, queryParams };
  }
  if (cleanPath === '/admin') {
    return { path: cleanPath, name: 'admin', params: {}, queryParams };
  }

  // Parametric routes
  const workMatch = cleanPath.match(/^\/work\/([a-zA-Z0-9_-]+)$/);
  if (workMatch) {
    return {
      path: cleanPath,
      name: 'work',
      params: { slug: workMatch[1] },
      queryParams,
    };
  }

  const colMatch = cleanPath.match(/^\/collection\/([a-zA-Z0-9_-]+)$/);
  if (colMatch) {
    return {
      path: cleanPath,
      name: 'collection',
      params: { slug: colMatch[1] },
      queryParams,
    };
  }

  const studyMatch = cleanPath.match(/^\/study\/([a-zA-Z0-9_-]+)$/);
  if (studyMatch) {
    return {
      path: cleanPath,
      name: 'study',
      params: { slug: studyMatch[1] },
      queryParams,
    };
  }

  const entryMatch = cleanPath.match(/^\/entry\/([a-zA-Z0-9_-]+)$/);
  if (entryMatch) {
    return {
      path: cleanPath,
      name: 'entry',
      params: { slug: entryMatch[1] },
      queryParams,
    };
  }

  return { path: cleanPath, name: 'notFound', params: {}, queryParams };
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRoute, setCurrentRoute] = useState<RouteMatch>(() =>
    parsePath(window.location.pathname, window.location.search, window.location.hash)
  );

  useEffect(() => {
    const handlePopState = () => {
      setCurrentRoute(
        parsePath(window.location.pathname, window.location.search, window.location.hash)
      );
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handlePopState);

    // Global link interceptor for standard <a> tags
    const handleGlobalClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      // Ignore external or mailto or download links
      if (
        href.startsWith('http://') ||
        href.startsWith('https://') ||
        href.startsWith('mailto:') ||
        href.startsWith('tel:') ||
        target.getAttribute('target') === '_blank' ||
        e.metaKey ||
        e.ctrlKey ||
        e.shiftKey ||
        e.altKey
      ) {
        return;
      }

      e.preventDefault();
      navigate(href);
    };

    document.addEventListener('click', handleGlobalClick);

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handlePopState);
      document.removeEventListener('click', handleGlobalClick);
    };
  }, []);

  const navigate = (to: string) => {
    // Determine if we should pushState or use hash
    window.history.pushState({}, '', to);
    setCurrentRoute(
      parsePath(window.location.pathname, window.location.search, window.location.hash)
    );
    window.scrollTo({ top: 0, behavior: 'instant' as ScrollBehavior });
  };

  return (
    <RouterContext.Provider value={{ currentRoute, navigate }}>
      {children}
    </RouterContext.Provider>
  );
};

export const useRouter = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouter must be used within a RouterProvider');
  }
  return context;
};
