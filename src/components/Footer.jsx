// src/components/Footer.jsx
import { Link } from "react-router-dom";
import {
  FiFacebook,
  FiTwitter,
  FiInstagram,
  FiYoutube,
  FiMail,
} from "react-icons/fi";
import { BiNews } from "react-icons/bi";

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    "About Us": [
      { label: "Company Profile", path: "/about" },
      { label: "Editorial Team", path: "/team" },
      { label: "Careers", path: "/career" },
      { label: "Contact Us", path: "/contact" },
    ],
    Categories: [
      { label: "Business", path: "/category/business" },
      { label: "Technology", path: "/category/technology" },
      { label: "Sports", path: "/category/sports" },
      { label: "Entertainment", path: "/category/entertainment" },
    ],
    Services: [
      { label: "Premium Access", path: "/subscribe" },
      { label: "Newsletter", path: "/newsletter" },
      { label: "RSS Feed", path: "/rss" },
      { label: "Mobile App", path: "/mobile" },
    ],
    Legal: [
      { label: "Privacy Policy", path: "/privacy" },
      { label: "Terms & Conditions", path: "/terms" },
      { label: "Community Guidelines", path: "/guidelines" },
      { label: "Disclaimer", path: "/disclaimer" },
    ],
  };

  const socialMedia = [
    { icon: FiFacebook, link: "https://facebook.com", color: "hover:text-blue-600" },
    { icon: FiTwitter, link: "https://twitter.com", color: "hover:text-blue-400" },
    { icon: FiInstagram, link: "https://instagram.com", color: "hover:text-pink-600" },
    { icon: FiYoutube, link: "https://youtube.com", color: "hover:text-red-600" },
  ];

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand + Social */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <BiNews className="w-8 h-8 text-blue-500" />
              <span className="text-xl font-bold text-white">NewsToday</span>
            </Link>
            <p className="text-sm text-gray-400 mb-4">
              A trusted news portal providing up-to-date, accurate, and in-depth information from various fields.
            </p>

            <div className="flex space-x-4">
              {socialMedia.map((social, idx) => (
                <a
                  key={idx}
                  href={social.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`text-gray-400 ${social.color} transition`}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Footer Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-white font-semibold mb-4">{title}</h3>
              <ul className="space-y-2">
                {links.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      to={link.path}
                      className="text-sm text-gray-400 hover:text-blue-500 transition"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="max-w-md">
            <h3 className="text-white font-semibold mb-2 flex items-center">
              <FiMail className="w-5 h-5 mr-2" />
              Subscribe Newsletter
            </h3>
            <p className="text-sm text-gray-400 mb-4">
              Get the most important news summary directly to your inbox
            </p>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
            >
              <input
                type="email"
                placeholder="Your Email"
                required
                className="flex-1 px-4 py-2 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:border-blue-500 transition"
              />
              <button
                type="submit"
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © {currentYear} NewsToday. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link
                to="/privacy"
                className="text-sm text-gray-400 hover:text-blue-500 transition"
              >
                Privacy Policy
              </Link>
              <Link
                to="/terms"
                className="text-sm text-gray-400 hover:text-blue-500 transition"
              >
                Terms of Service
              </Link>
              <Link
                to="/cookies"
                className="text-sm text-gray-400 hover:text-blue-500 transition"
              >
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
