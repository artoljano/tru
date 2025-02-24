import React from "react";
import {
  Youtube,
  AlignJustify as Spotify,
  Apple,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Headphones,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Footer() {
  return (
    <footer className="relative bg-black pt-20 pb-12 overflow-hidden">
      {/* Decorative Background Elements */}
      <motion.div
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"
      />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand Column */}
          <div>
            <h4 className="text-2xl font-bold mb-6">PODCAST NAME</h4>
            <p className="text-gray-400 mb-6">
              Exploring extraordinary stories and insights through meaningful
              conversations.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Youtube size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Spotify size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Apple size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-4">
              <li>
                <Link
                  to="/episodes"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Episodes
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/newsletter"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Newsletter
                </Link>
              </li>
              <li>
                <Link
                  to="/suggest"
                  className="text-gray-400 hover:text-white transition-colors"
                >
                  Suggest a Guest
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Contact</h4>
            <ul className="space-y-4">
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-3" />
                <span>hello@podcastname.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <MapPin size={16} className="mr-3" />
                <span>Tirana, Albania</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={16} className="mr-3" />
                <span>+35567676767</span>
              </li>
            </ul>
          </div>

          {/* Listen On */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Listen On</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Spotify size={16} className="mr-3" />
                  <span>Spotify</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Apple size={16} className="mr-3" />
                  <span>Apple Podcasts</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Youtube size={16} className="mr-3" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="flex items-center text-gray-400 hover:text-white transition-colors"
                >
                  <Headphones size={16} className="mr-3" />
                  <span>Google Podcasts</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 PODCAST NAME. All rights reserved.
            </div>
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Terms of Service
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors"
              >
                Cookie Policy
              </a>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <span className="flex items-center">
                Made with <Heart size={14} className="mx-1 text-red-500" /> in
                Tirana
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
