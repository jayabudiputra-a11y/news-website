import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { newsAPI } from '../services/newsApi';
import NewsCard from '../components/news/NewsCard';
import { Loader } from '../components/common/Loader';
import { FiSearch } from 'react-icons/fi';

const Search = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      searchNews();
    }
  }, [query]);

  const searchNews = async () => {
    try {
      setLoading(true);
      const response = await newsAPI.search(query, { limit: 20 });
      setResults(response.data.data || []);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center">
          <FiSearch className="mr-3" />
          Search Results for "{query}"
        </h1>
        <p className="text-gray-600 mt-2">
          Found {results.length} articles
        </p>
      </div>

      {/* Results */}
      {results.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FiSearch className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No results found for your search.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((article) => (
            <NewsCard key={article.uuid} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};