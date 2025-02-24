import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Menu, X, Youtube, AlignJustify as Spotify, Apple, Instagram, Twitter } from 'lucide-react';
import { motion } from 'framer-motion';
import Footer from './components/Footer';

function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-black">
      {/* Desktop Navbar */}
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
        className="hidden md:flex justify-between items-center px-8 py-6 fixed w-full bg-black/95 z-50"
      >
        <Link to="/" className="text-2xl font-bold text-white">PODCAST NAME</Link>
        <div className="flex space-x-8">
          <motion.div whileHover={{ y: -2 }}>
            <Link to="/episodes" className="text-white hover:text-gray-300 transition-colors">
              Episodes
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <Link to="/about" className="text-white hover:text-gray-300 transition-colors">
              About
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <Link to="/newsletter" className="text-white hover:text-gray-300 transition-colors">
              Newsletter
            </Link>
          </motion.div>
          <motion.div whileHover={{ y: -2 }}>
            <Link to="/suggest" className="text-white hover:text-gray-300 transition-colors">
              Suggest
            </Link>
          </motion.div>
        </div>
        <div className="flex items-center space-x-6">
          {[Youtube, Spotify, Apple, Instagram, Twitter].map((Icon, index) => (
            <motion.a
              key={index}
              whileHover={{ scale: 1.2, rotate: 5 }}
              whileTap={{ scale: 0.9 }}
              href="#"
              className="text-white hover:text-gray-300 transition-colors"
            >
              <Icon size={20} />
            </motion.a>
          ))}
        </div>
      </motion.nav>

      {/* Mobile Navbar */}
      <nav className="md:hidden fixed w-full z-50">
        <div className="flex justify-between items-center px-6 py-4 bg-black/95">
          <Link to="/" className="text-xl font-bold text-white">PODCAST NAME</Link>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white focus:outline-none"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 bg-black/95 pt-20"
          >
            <div className="flex flex-col items-center space-y-8">
              <Link to="/episodes" className="text-2xl text-white hover:text-gray-300 transition-colors">Episodes</Link>
              <Link to="/about" className="text-2xl text-white hover:text-gray-300 transition-colors">About</Link>
              <Link to="/newsletter" className="text-2xl text-white hover:text-gray-300 transition-colors">Newsletter</Link>
              <Link to="/suggest" className="text-2xl text-white hover:text-gray-300 transition-colors">Suggest</Link>
              <div className="flex space-x-8 mt-8">
                <a href="#" className="text-white hover:text-gray-300 transition-colors"><Youtube size={24} /></a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors"><Spotify size={24} /></a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors"><Apple size={24} /></a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors"><Instagram size={24} /></a>
                <a href="#" className="text-white hover:text-gray-300 transition-colors"><Twitter size={24} /></a>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;