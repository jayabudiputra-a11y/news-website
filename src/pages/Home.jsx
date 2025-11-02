// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { newsAPI } from '../services/newsApi';
import NewsCard from '../components/news/NewsCard';
import Loader from '../components/common/Loader';
import ErrorMessage from '../components/common/ErrorMessage';

const Home = () => {
  const [topNews, setTopNews] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchNews();
  }, []);

  const fetchNews = async () => {
    try {
      setLoading(true);
      setError(null);

      // Fetch top news (featured)
      const topResponse = await newsAPI.getTop({ limit: 1 });
      if (topResponse.data && topResponse.data.data) {
        setTopNews(topResponse.data.data);
      }

      // Fetch latest news
      const latestResponse = await newsAPI.getAll({ limit: 12 });
      if (latestResponse.data && latestResponse.data.data) {
        setLatestNews(latestResponse.data.data);
      }
    } catch (err) {
      console.error('Error fetching news:', err);
      setError('Failed to load news. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorMessage message={error} onRetry={fetchNews} />;
  }

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      {topNews.length > 0 && (
        <section>
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Featured News</h2>
          <NewsCard article={topNews[0]} variant="featured" />
        </section>
      )}

      {/* Latest News Grid */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-gray-900">Latest News</h2>
        </div>

        {latestNews.length === 0 ? (
          <p className="text-center text-gray-500 py-12">
            No news available at the moment.
          </p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestNews.map((article) => (
              <NewsCard key={article.uuid} article={article} />
            ))}
          </div>
        )}
      </section>

      {/* Newsletter Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-8 text-white text-center">
        <h2 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h2>
        <p className="mb-6 text-blue-100">
          Get the latest news delivered straight to your inbox
        </p>
        <form className="max-w-md mx-auto flex gap-2">
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            type="submit"
            className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
          >
            Subscribe
          </button>
        </form>
      </section>
    </div>
  );
};

export default Home;