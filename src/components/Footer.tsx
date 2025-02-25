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
  const CustomIcon2 = () => (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_9)">
        <path
          d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2349 1.26428 15.1826 0 12 0ZM16.25 17.61C16.1762 17.6907 16.0867 17.7554 15.9869 17.8001C15.8872 17.8448 15.7793 17.8686 15.67 17.87C15.4793 17.8724 15.2943 17.8048 15.15 17.68C14.0929 16.8303 12.8172 16.2965 11.47 16.14C10.1403 15.9225 8.77639 16.0783 7.53001 16.59C7.34812 16.6719 7.14132 16.679 6.95423 16.6098C6.76715 16.5406 6.61478 16.4006 6.53001 16.22C6.45072 16.0378 6.44496 15.832 6.51391 15.6456C6.58287 15.4592 6.72121 15.3067 6.90001 15.22C8.41966 14.5754 10.0908 14.3743 11.72 14.64C13.3663 14.8357 14.9233 15.4945 16.21 16.54C16.3498 16.6808 16.4315 16.869 16.4389 17.0672C16.4463 17.2654 16.3789 17.4592 16.25 17.61ZM18.2 14.32C18.1063 14.4267 17.9909 14.5122 17.8616 14.5708C17.7323 14.6294 17.592 14.6598 17.45 14.66C17.2069 14.6597 16.9723 14.5708 16.79 14.41C15.4273 13.3082 13.7804 12.6148 12.04 12.41C10.3118 12.122 8.53742 12.3265 6.92001 13C6.80079 13.0587 6.67107 13.0931 6.53841 13.1011C6.40576 13.1091 6.27284 13.0906 6.14741 13.0467C6.02199 13.0028 5.90659 12.9343 5.80795 12.8452C5.7093 12.7561 5.6294 12.6483 5.57291 12.528C5.51642 12.4077 5.48447 12.2774 5.47894 12.1446C5.4734 12.0118 5.49439 11.8793 5.54067 11.7547C5.58695 11.6301 5.6576 11.516 5.74849 11.4191C5.83938 11.3221 5.94868 11.2442 6.07001 11.19C8.03662 10.3399 10.207 10.0759 12.32 10.43C14.4448 10.6755 16.4544 11.5258 18.11 12.88C18.2129 12.9671 18.297 13.074 18.3575 13.1945C18.418 13.3149 18.4535 13.4463 18.4619 13.5808C18.4703 13.7153 18.4514 13.8501 18.4064 13.9772C18.3614 14.1042 18.2912 14.2208 18.2 14.32ZM20.2 10.79C20.0837 10.9154 19.943 11.0155 19.7865 11.0843C19.63 11.1531 19.461 11.1891 19.29 11.19C18.9866 11.1881 18.6945 11.0742 18.47 10.87C16.788 9.48921 14.7424 8.62446 12.58 8.38C10.441 8.01301 8.24137 8.2771 6.25001 9.14C5.963 9.25126 5.64471 9.25086 5.35799 9.13889C5.07126 9.02691 4.83694 8.8115 4.7013 8.53518C4.56565 8.25887 4.53854 7.94174 4.62532 7.64641C4.71209 7.35108 4.90645 7.09902 5.17001 6.94C7.63301 5.8717 10.3541 5.54502 13 6C15.6465 6.3147 18.1444 7.3917 20.19 9.1C20.4128 9.32192 20.5421 9.62073 20.5514 9.93505C20.5607 10.2494 20.4493 10.5553 20.24 10.79H20.2Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_9">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

  const CustomIcon = () => (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_1_9)">
        <path
          d="M12 0C9.62663 0 7.30655 0.703788 5.33316 2.02236C3.35977 3.34094 1.8217 5.21509 0.913451 7.4078C0.00519943 9.60051 -0.232441 12.0133 0.230582 14.3411C0.693605 16.6689 1.83649 18.8071 3.51472 20.4853C5.19295 22.1635 7.33115 23.3064 9.65892 23.7694C11.9867 24.2324 14.3995 23.9948 16.5922 23.0866C18.7849 22.1783 20.6591 20.6402 21.9776 18.6668C23.2962 16.6935 24 14.3734 24 12C24 8.8174 22.7357 5.76516 20.4853 3.51472C18.2349 1.26428 15.1826 0 12 0ZM16.25 17.61C16.1762 17.6907 16.0867 17.7554 15.9869 17.8001C15.8872 17.8448 15.7793 17.8686 15.67 17.87C15.4793 17.8724 15.2943 17.8048 15.15 17.68C14.0929 16.8303 12.8172 16.2965 11.47 16.14C10.1403 15.9225 8.77639 16.0783 7.53001 16.59C7.34812 16.6719 7.14132 16.679 6.95423 16.6098C6.76715 16.5406 6.61478 16.4006 6.53001 16.22C6.45072 16.0378 6.44496 15.832 6.51391 15.6456C6.58287 15.4592 6.72121 15.3067 6.90001 15.22C8.41966 14.5754 10.0908 14.3743 11.72 14.64C13.3663 14.8357 14.9233 15.4945 16.21 16.54C16.3498 16.6808 16.4315 16.869 16.4389 17.0672C16.4463 17.2654 16.3789 17.4592 16.25 17.61ZM18.2 14.32C18.1063 14.4267 17.9909 14.5122 17.8616 14.5708C17.7323 14.6294 17.592 14.6598 17.45 14.66C17.2069 14.6597 16.9723 14.5708 16.79 14.41C15.4273 13.3082 13.7804 12.6148 12.04 12.41C10.3118 12.122 8.53742 12.3265 6.92001 13C6.80079 13.0587 6.67107 13.0931 6.53841 13.1011C6.40576 13.1091 6.27284 13.0906 6.14741 13.0467C6.02199 13.0028 5.90659 12.9343 5.80795 12.8452C5.7093 12.7561 5.6294 12.6483 5.57291 12.528C5.51642 12.4077 5.48447 12.2774 5.47894 12.1446C5.4734 12.0118 5.49439 11.8793 5.54067 11.7547C5.58695 11.6301 5.6576 11.516 5.74849 11.4191C5.83938 11.3221 5.94868 11.2442 6.07001 11.19C8.03662 10.3399 10.207 10.0759 12.32 10.43C14.4448 10.6755 16.4544 11.5258 18.11 12.88C18.2129 12.9671 18.297 13.074 18.3575 13.1945C18.418 13.3149 18.4535 13.4463 18.4619 13.5808C18.4703 13.7153 18.4514 13.8501 18.4064 13.9772C18.3614 14.1042 18.2912 14.2208 18.2 14.32ZM20.2 10.79C20.0837 10.9154 19.943 11.0155 19.7865 11.0843C19.63 11.1531 19.461 11.1891 19.29 11.19C18.9866 11.1881 18.6945 11.0742 18.47 10.87C16.788 9.48921 14.7424 8.62446 12.58 8.38C10.441 8.01301 8.24137 8.2771 6.25001 9.14C5.963 9.25126 5.64471 9.25086 5.35799 9.13889C5.07126 9.02691 4.83694 8.8115 4.7013 8.53518C4.56565 8.25887 4.53854 7.94174 4.62532 7.64641C4.71209 7.35108 4.90645 7.09902 5.17001 6.94C7.63301 5.8717 10.3541 5.54502 13 6C15.6465 6.3147 18.1444 7.3917 20.19 9.1C20.4128 9.32192 20.5421 9.62073 20.5514 9.93505C20.5607 10.2494 20.4493 10.5553 20.24 10.79H20.2Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_1_9">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );

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
        className="absolute -top-40 -right-40 w-80 h-80 bg-red-500/10 rounded-full blur-3xl"
      />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-red-800/10 rounded-full blur-3xl"></div>

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
                <CustomIcon />
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
                  <CustomIcon2 />
                  <span className="ml-3">Spotify</span>
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
