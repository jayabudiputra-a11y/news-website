// src/pages/Category.jsx
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { newsAPI, CATEGORIES } from '../services/newsApi';
import NewsCard from '../components/news/NewsCard';
import { Loader } from '../components/common/Loader';
import { ErrorMessage } from '../components/common/ErrorMessage';

const Category = () => {
  const { categoryId } = useParams();
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const category = CATEGORIES.find(cat => cat.id === categoryId);

  useEffect(() => {
    fetchCategoryNews();
  }, [categoryId]);

  const fetchCategoryNews = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await newsAPI.getByCategory(categoryId, { limit: 15 });
      setNews(response.data.data || []);
    } catch (err) {
      console.error('Error fetching category news:', err);
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} onRetry={fetchCategoryNews} />;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h1 className="text-3xl font-bold text-gray-900 capitalize">
          {category?.name || categoryId} News
        </h1>
        <p className="text-gray-600 mt-2">
          Latest {category?.name || categoryId} news and updates
        </p>
      </div>

      {/* News Grid */}
      {news.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No news available in this category.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((article) => (
            <NewsCard key={article.uuid} article={article} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Category;
