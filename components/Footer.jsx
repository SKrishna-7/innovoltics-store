import Link from 'next/link';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa'; // Install react-icons: npm install react-icons

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12 font-poppins mt-5 ">
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
                <Link href="/" className="hover:text-indigo-400 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/products" className="hover:text-indigo-400 transition-colors">
                  Products
                </Link>
              </li>
              <li>
                <Link href="/customize" className="hover:text-indigo-400 transition-colors">
                  Upload Your Model
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-indigo-400 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-indigo-400 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="mt-4 space-y-2 text-sm text-gray-300">
              <li>Email: <a href="mailto:innovoltics@gmail.com" className="hover:text-indigo-400">innovoltics@gmail.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="hover:text-indigo-400">+91 80723 57029</a></li>
              <li>Address: 177/82, South avenue road, phase 1, sathuvachari, vellore, Tamil Nadu, 632009, India</li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h4 className="text-lg font-semibold text-white">Follow Us</h4>
            <div className="mt-4 flex space-x-4">
              <a href="https://www.instagram.com/innovoltics?igsh=MThxc293ZGR5cHhzeA==" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaFacebook size={24} />
              </a>
              <a href="https://www.instagram.com/innovoltics?igsh=MThxc293ZGR5cHhzeA==" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaTwitter size={24} />
              </a>
              <a href="https://www.instagram.com/innovoltics?igsh=MThxc293ZGR5cHhzeA==" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors">
                <FaInstagram size={24} />
              </a>
              <a href="https://www.instagram.com/innovoltics?igsh=MThxc293ZGR5cHhzeA==" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-indigo-400 transition-colors">
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