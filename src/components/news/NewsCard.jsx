// src/components/news/NewsCard.jsx
import { Link } from 'react-router-dom';
import { FiBookmark, FiClock, FiUser } from 'react-icons/fi';
import { format } from 'date-fns';
import { useState } from 'react';
import { bookmarkService } from '../../services/firebase';

const NewsCard = ({ article, variant = 'default' }) => {
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarkLoading, setBookmarkLoading] = useState(false);

  const handleBookmark = async (e) => {
    e.preventDefault();
    setBookmarkLoading(true);
    
    try {
      if (isBookmarked) {
        const bookmark = await bookmarkService.findByUuid(article.uuid);
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
    } finally {
      setBookmarkLoading(false);
    }
  };

  const imageUrl = article.image_url || 'https://via.placeholder.com/400x300?text=No+Image';
  const publishedDate = article.published_at ? format(new Date(article.published_at), 'MMM dd, yyyy') : 'Unknown date';

  if (variant === 'featured') {
    return (
      <Link to={`/news/${article.uuid}`} className="block group">
        <div className="relative overflow-hidden rounded-lg shadow-lg h-96">
          <img 
            src={imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center space-x-4 text-sm mb-2">
              <span className="bg-blue-600 px-3 py-1 rounded-full">
                {article.categories?.[0] || 'News'}
              </span>
              <span className="flex items-center">
                <FiClock className="mr-1" />
                {publishedDate}
              </span>
            </div>
            <h2 className="text-2xl font-bold mb-2 line-clamp-2">{article.title}</h2>
            <p className="text-gray-200 line-clamp-2">{article.description}</p>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300">
      <Link to={`/news/${article.uuid}`} className="block">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={imageUrl} 
            alt={article.title}
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            onError={(e) => {
              e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
            }}
          />
          <span className="absolute top-2 left-2 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-semibold">
            {article.categories?.[0] || 'News'}
          </span>
        </div>
      </Link>

      <div className="p-4">
        <div className="flex items-center justify-between text-sm text-gray-500 mb-2">
          <span className="flex items-center">
            <FiClock className="mr-1" />
            {publishedDate}
          </span>
          {article.source && (
            <span className="flex items-center">
              <FiUser className="mr-1" />
              {article.source}
            </span>
          )}
        </div>

        <Link to={`/news/${article.uuid}`}>
          <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors">
            {article.title}
          </h3>
        </Link>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3">
          {article.description || article.snippet}
        </p>

        <div className="flex items-center justify-between">
          <Link 
            to={`/news/${article.uuid}`}
            className="text-blue-600 hover:text-blue-700 font-medium text-sm"
          >
            Read more →
          </Link>
          <button
            onClick={handleBookmark}
            disabled={bookmarkLoading}
            className={`p-2 rounded-full transition-colors ${
              isBookmarked 
                ? 'text-blue-600 bg-blue-50' 
                : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
            }`}
          >
            <FiBookmark className={isBookmarked ? 'fill-current' : ''} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;