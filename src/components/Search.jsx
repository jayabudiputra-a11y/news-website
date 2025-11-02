import { useState, useEffect } from "react";
import useDebounce from "../hooks/useDebounce";
import { newsApi } from "../services/newsApi";

function Search() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query, 600);
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (!debouncedQuery) return;
    (async () => {
      const data = await newsApi.searchNews(debouncedQuery);
      setResults(data.data);
    })();
  }, [debouncedQuery]);

  return (
    <div className="p-6">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari berita..."
        className="border p-2 rounded w-full"
      />
      <ul>
        {results.map((r) => (
          <li key={r.uuid}>{r.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default Search;
