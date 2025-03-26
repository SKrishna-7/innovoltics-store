import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Install react-icons: npm install react-icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 font-poppins mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-bold text-indigo-400">Innovoltics</h3>
            <p className="mt-4 text-sm text-gray-300">
              Innovoltics is your one-stop shop for cutting-edge 3D printing solutions. From custom designs to high-quality prints, we bring innovation to life.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>
                <a href="/" className="hover:text-indigo-400 transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/products" className="hover:text-indigo-400 transition-colors">
                  Products
                </a>
              </li>
              <li>
                <a href="/upload-model" className="hover:text-indigo-400 transition-colors">
                  Upload Your Model
                </a>
              </li>
              <li>
                <a href="/about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>Email: <a href="mailto:support@innovoltics.com" className="hover:text-indigo-400">support@innovoltics.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-indigo-400">+1 (234) 567-890</a></li>
              <li>Address: 123 Innovation Drive, Tech City, TC 45678</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-10 border-t border-gray-800 pt-6 text-center text-sm text-gray-400">
          <p>&copy; {new Date().getFullYear()} Innovoltics. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;