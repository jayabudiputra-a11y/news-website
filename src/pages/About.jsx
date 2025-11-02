const About = () => {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About NewsHub</h1>
        
        <div className="prose max-w-none">
          <p className="text-lg text-gray-700 mb-4">
            Welcome to NewsHub, your trusted source for the latest news and updates from around the world.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            We are dedicated to providing accurate, timely, and unbiased news coverage across various categories 
            including business, technology, sports, entertainment, health, and science.
          </p>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">What We Offer</h2>
          <ul className="list-disc list-inside text-gray-700 space-y-2 mb-4">
            <li>Breaking news from reliable sources</li>
            <li>In-depth analysis and feature stories</li>
            <li>Multiple categories to suit your interests</li>
            <li>Bookmark feature to save articles for later</li>
            <li>Clean, user-friendly interface</li>
          </ul>
          
          <h2 className="text-2xl font-bold text-gray-900 mt-8 mb-4">Stay Connected</h2>
          <p className="text-gray-700 mb-4">
            Follow us on social media and subscribe to our newsletter to stay updated with the latest news.
          </p>
        </div>
      </div>
    </div>
  );
};