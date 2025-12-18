const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-xl font-bold mb-4">Hope Connect</h2>
        <p className="mb-4">Making a difference in communities worldwide.</p>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-gray-300">About Us</a>
          <a href="#" className="hover:text-gray-300">Contact</a>
          <a href="#" className="hover:text-gray-300">Privacy Policy</a>
        </div>
        <p>&copy; {new Date().getFullYear()} Hope Connect. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;