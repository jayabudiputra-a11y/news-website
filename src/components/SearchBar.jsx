// src/components/SearchBar.jsx
import React, { useState, useEffect } from 'react';
import useDebounce from '../hooks/useDebounce';
import { newsApi } from '../services/newsApi';
import { Link } from 'react-router-dom';

export default function SearchBar({ onResults }) {
  const [q, setQ] = useState('');
  const debounced = useDebounce(q, 400);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!debounced) {
      setResults([]);
      onResults?.([]);
      return;
    }
    let mounted = true;
    (async () => {
      try {
        const res = await newsApi.searchNews(debounced, { limit: 8 });
        const items = res?.data ?? [];
        if (!mounted) return;
        setResults(items);
        onResults?.(items);
      } catch (e) {
        console.error(e);
      }
    })();
    return () => { mounted = false; };
  }, [debounced]);

  return (
    <div className="relative">
      <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Cari berita..." className="px-3 py-2 border rounded w-full" />
      {results.length > 0 && (
        <div className="absolute bg-white shadow-md mt-2 w-full max-h-60 overflow-auto z-40">
          {results.map(r => (
            <Link key={r.uuid || r.id} to={`/news/${r.uuid || r.id}`} className="block px-3 py-2 hover:bg-gray-50">
              {r.title}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
