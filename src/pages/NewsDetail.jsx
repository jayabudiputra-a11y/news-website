import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { newsAPI } from '../services/newsApi';
import { bookmarkService } from '../services/firebase';
import { FiClock, FiUser, FiBookmark, FiArrowLeft, FiExternalLink } from 'react-icons/fi';
import { format } from 'date-fns';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';

const NewsDetail = () => {
  const { uuid } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchArticle();
    checkBookmark();
  }, [uuid]);

  const fetchArticle = async () => {
    try {
      setLoading(true);
      const response = await newsAPI.getByUuid(uuid);
      setArticle(response.data);
    } catch (err) {
      setError('Failed to load article.');
    } finally {
      setLoading(false);
    }
  };

  const checkBookmark = async () => {
    const bookmark = await bookmarkService.findByUuid(uuid);
    setIsBookmarked(!!bookmark);
  };

  const handleBookmark = async () => {
    try {
      if (isBookmarked) {
        const bookmark = await bookmarkService.findByUuid(uuid);
        if (bookmark) {
          await bookmarkService.remove(bookmark.id);
          setIsBookmarked(false);
        }
      } else {
        await bookmarkService.add(article);
        setIsBookmarked(true);
      }
    } catch (error) {
      console.error('Bookmark error:', error);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={fetchArticle} />;
  if (!article) return <ErrorMessage message="Article not found" />;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
        <FiArrowLeft className="mr-2" />
        Back to Home
      </Link>

      {/* Article */}
      <article className="bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header Image */}
        {article.image_url && (
          <img 
            src={article.image_url} 
            alt={article.title}
            className="w-full h-96 object-cover"
          />
        )}

        {/* Content */}
        <div className="p-8">
          {/* Category */}
          <span className="inline-block bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold mb-4">
            {article.categories?.[0] || 'News'}
          </span>

          {/* Title */}
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="flex items-center justify-between text-gray-600 mb-6 pb-6 border-b">
            <div className="flex items-center space-x-4">
              <span className="flex items-center">
                <FiClock className="mr-2" />
                {article.published_at && format(new Date(article.published_at), 'MMMM dd, yyyy')}
              </span>
              {article.source && (
                <span className="flex items-center">
                  <FiUser className="mr-2" />
                  {article.source}
                </span>
              )}
            </div>
            <button
              onClick={handleBookmark}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                isBookmarked 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
              <span>{isBookmarked ? 'Bookmarked' : 'Bookmark'}</span>
            </button>
          </div>

          {/* Description */}
          <div className="prose max-w-none">
            <p className="text-xl text-gray-700 mb-6 leading-relaxed">
              {article.description}
            </p>

            {/* Main Content */}
            {article.snippet && (
              <div className="text-gray-800 leading-relaxed whitespace-pre-line">
                {article.snippet}
              </div>
            )}
          </div>

          {/* Source Link */}
          {article.url && (
            <div className="mt-8 pt-6 border-t">
              <a
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
              >
                Read full article <FiExternalLink className="ml-2" />
              </a>
            </div>
          )}
        </div>
      </article>
    </div>
  );
};