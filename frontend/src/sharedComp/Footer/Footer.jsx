import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebookF, FaTwitter, FaInstagram, FaPinterestP, FaYoutube } from 'react-icons/fa';
import { FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="bg-neutral-950 sm:bg-gray-50 text-gray-300 pt-16 pb-8 select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-16">
          {/* About Us */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white sm:text-black">GLORY</h3>
            <p className="text-gray-400 sm:text-black/80 sm:hover:text-black leading-relaxed">
              Your premier destination for fashion excellence. We blend quality, style, and affordability to bring you the best shopping experience.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300" aria-label="Facebook">
                <FaFacebookF size={18} />
              </a>
              <a href="#" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="#" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300" aria-label="Instagram">
                <FaInstagram size={18} />
              </a>
              <a href="#" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300" aria-label="Pinterest">
                <FaPinterestP size={18} />
              </a>
              <a href="#" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300" aria-label="YouTube">
                <FaYoutube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white sm:text-black">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/about" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white sm:text-black">Customer Service</h3>
            <ul className="space-y-3">
              <li>
                <Link to="/faq" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300">
                  FAQs
                </Link>
              </li>
              <li>
                <Link to="/shipping" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/returns" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-400 sm:text-black/80 sm:hover:text-black hover:text-white transition-colors duration-300">
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info & Newsletter */}
          <div className="space-y-5">
            <h3 className="text-xl font-bold text-white sm:text-black">Contact Us</h3>
            <div className="space-y-3 text-gray-400 sm:text-black/80 sm:hover:text-black">
              <div className="flex items-start space-x-3">
                <FiMapPin className="mt-1 flex-shrink-0" />
                <span>123 Fashion Street, Style City, SC 12345</span>
              </div>
              <div className="flex items-center space-x-3">
                <FiMail />
                <a href="mailto:info@glory.com" className="hover:text-white transition-colors duration-300">
                  info@glory.com
                </a>
              </div>
              <div className="flex items-center space-x-3">
                <FiPhone />
                <a href="tel:+11234567890" className="hover:text-white transition-colors duration-300">
                  +1 (123) 456-7890
                </a>
              </div>
            </div>

            <div className="pt-4">
              <h4 className="text-lg font-semibold text-white sm:text-black mb-3">Newsletter</h4>
              <form className="flex flex-col space-y-3">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="px-4 py-2 rounded-md bg-neutral-800 text-white sm:bg-gray-100 sm:border-2 sm:text-black focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-white sm:bg-blue-900 text-black sm:text-white py-2 px-6 rounded-md hover:bg-blue-950 transition-all duration-300 font-semibold"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
          <p>
            &copy; {new Date().getFullYear()} GLORY Fashion. All rights reserved.
            <span className="block md:inline-block md:ml-2 mt-2 md:mt-0">
              Designed with ❤️ for fashion lovers worldwide.
            </span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;