import { useState, useEffect } from 'react';
import { bookmarkService } from '../services/firebase';
import NewsCard from '../components/news/NewsCard';
import { Loader } from '../components/common/Loader';
import { FiBookmark } from 'react-icons/fi';

const Bookmarks = () => {
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const data = await bookmarkService.getAll();
      setBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
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
          <FiBookmark className="mr-3" />
          My Bookmarks
        </h1>
        <p className="text-gray-600 mt-2">
          {bookmarks.length} saved articles
        </p>
      </div>

      {/* Bookmarks */}
      {bookmarks.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <FiBookmark className="mx-auto h-16 w-16 text-gray-400 mb-4" />
          <p className="text-gray-500 text-lg">No bookmarks yet.</p>
          <p className="text-gray-400 text-sm mt-2">Start saving articles to read later!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookmarks.map((article) => (
            <NewsCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};