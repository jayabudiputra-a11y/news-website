import { Link } from 'react-router-dom';
import { FiHome, FiTrendingUp, FiBookmark, FiInfo, FiMail, FiX } from 'react-icons/fi';
import { CATEGORIES } from '../../services/newsApi';

const Sidebar = ({ isOpen, onClose }) => {
  const iconMap = {
    newspaper: FiHome,
    briefcase: FiTrendingUp,
    film: FiHome,
    heart: FiHome,
    flask: FiHome,
    basketball: FiHome,
    cpu: FiHome,
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 w-64 h-screen transition-transform ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:z-0`}
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 border-r border-gray-200">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between mb-5 lg:hidden">
            <span className="text-xl font-semibold text-gray-900">Menu</span>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>

          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="/"
                onClick={onClose}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FiHome className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Home</span>
              </Link>
            </li>
            
            <li>
              <Link
                to="/bookmarks"
                onClick={onClose}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FiBookmark className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Bookmarks</span>
              </Link>
            </li>

            {/* Categories Section */}
            <li className="pt-4 mt-4 space-y-2 border-t border-gray-200">
              <span className="text-xs font-semibold text-gray-400 uppercase">Categories</span>
            </li>

            {CATEGORIES.map((category) => {
              const Icon = iconMap[category.icon] || FiHome;
              return (
                <li key={category.id}>
                  <Link
                    to={`/category/${category.id}`}
                    onClick={onClose}
                    className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
                  >
                    <Icon className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                    <span className="ml-3">{category.name}</span>
                  </Link>
                </li>
              );
            })}

            {/* Other Links */}
            <li className="pt-4 mt-4 space-y-2 border-t border-gray-200">
              <Link
                to="/about"
                onClick={onClose}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FiInfo className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">About Us</span>
              </Link>
            </li>

            <li>
              <Link
                to="/contact"
                onClick={onClose}
                className="flex items-center p-2 text-gray-900 rounded-lg hover:bg-gray-100 group"
              >
                <FiMail className="w-5 h-5 text-gray-500 transition duration-75 group-hover:text-gray-900" />
                <span className="ml-3">Contact</span>
              </Link>
            </li>
          </ul>

          {/* CTA Section */}
          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <h3 className="mb-2 text-sm font-semibold text-gray-900">Stay Updated</h3>
            <p className="mb-3 text-xs text-gray-500">
              Subscribe to our newsletter for the latest news
            </p>
            <button className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
              Subscribe
            </button>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;