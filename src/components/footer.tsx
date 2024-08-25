const Footer = () => {
    return (
      <footer className="bg-gray-900 text-gray-300 py-6">
        <div className="flex flex-col items-center">
          <p className="text-sm mb-4">© {new Date().getFullYear()} Rambabu. All rights reserved.</p>
          <div className="flex space-x-6">
            <a
              href="https://linkedin.com/in/your-profile" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
            >
              LinkedIn
            </a>
            <a
              href="https://github.com/your-profile" 
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-red-600 transition"
            >
              GitHub
            </a>
            <a
              href="mailto:your-email@example.com" 
              className="hover:text-red-600 transition"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  