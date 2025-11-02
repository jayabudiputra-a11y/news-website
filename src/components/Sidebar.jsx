import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiBookmark, FiSettings, FiUser, FiChevronRight } from 'react-icons/fi';
import { BiNews, BiWorld } from 'react-icons/bi';
import { MdOutlineSports, MdOutlineBusiness } from 'react-icons/md';
import { AiOutlineStock } from 'react-icons/ai';

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const mainMenuItems = [
    { icon: FiHome, label: 'Home', path: '/' },
    { icon: FiTrendingUp, label: 'Trending', path: '/category/trending' },
    { icon: FiBookmark, label: 'Saved', path: '/bookmarks' },
  ];

  const categoryItems = [
    { icon: BiWorld, label: 'International', path: '/category/international' },
    { icon: MdOutlineBusiness, label: 'Business', path: '/category/business' },
    { icon: BiNews, label: 'Technology', path: '/category/technology' },
    { icon: MdOutlineSports, label: 'Sports', path: '/category/sports' },
    { icon: AiOutlineStock, label: 'Economy', path: '/category/economy' },
  ];

  return (
    <>
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="lg:hidden fixed bottom-4 right-4 z-50 p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        <FiChevronRight className={`w-6 h-6 transition-transform ${isSidebarOpen ? 'rotate-180' : ''}`} />
      </button>

      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <aside
        className={`
          fixed lg:sticky top-16 left-0 h-[calc(100vh-4rem)] w-64 bg-white border-r border-gray-200 
          transform transition-transform duration-300 ease-in-out z-40
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
      >
        <div className="flex flex-col h-full">
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              <div className="mb-6">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Main Menu
                </h3>
                {mainMenuItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition group"
                  >
                    <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              <div className="mb-6">
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  Categories
                </h3>
                {categoryItems.map((item, idx) => (
                  <Link
                    key={idx}
                    to={item.path}
                    onClick={() => setIsSidebarOpen(false)}
                    className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition group"
                  >
                    <item.icon className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
              </div>

              <div>
                <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                  More
                </h3>
                <Link
                  to="/settings"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition group"
                >
                  <FiSettings className="w-5 h-5 mr-3 group-hover:rotate-90 transition-transform" />
                  <span className="font-medium">Settings</span>
                </Link>
                <Link
                  to="/profile"
                  onClick={() => setIsSidebarOpen(false)}
                  className="flex items-center px-3 py-2 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition group"
                >
                  <FiUser className="w-5 h-5 mr-3 group-hover:scale-110 transition-transform" />
                  <span className="font-medium">Profile</span>
                </Link>
              </div>
            </nav>
          </div>

          <div className="p-4 border-t border-gray-200">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg p-4 text-white">
              <h4 className="font-bold text-lg mb-2">Premium Access</h4>
              <p className="text-sm text-blue-100 mb-3">
                Get full access to exclusive news and premium features
              </p>
              <button
                onClick={() => {
                  navigate('/subscribe');
                  setIsSidebarOpen(false);
                }}
                className="w-full bg-white text-blue-600 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Upgrade Now
              </button>
            </div>

            <div className="mt-4 p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Saved Articles</span>
                <span className="font-bold text-blue-600">12</span>
              </div>
              <div className="flex items-center justify-between text-sm mt-2">
                <span className="text-gray-600">Read Today</span>
                <span className="font-bold text-green-600">8</span>
              </div>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

export default Sidebar;