import React, { useState } from "react";
import {
  Youtube,
  AlignJustify as Spotify,
  Apple,
  Instagram,
  Twitter,
  Headphones,
  Heart,
  Star,
  Award,
  Users,
  Mic,
  Radio,
  Music,
  Podcast,
  Coffee,
  BookOpen,
  Twitch,
} from "lucide-react";
import host from "../src/images/host.jpeg";
import intro from "../src/images/about-intro-hq.mp4";
import { motion } from "framer-motion";

const CustomIcon = () => (
  <svg
    width="26"
    height="26"
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

const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function About() {
  // 1) track whether intro video is playing
  const [showIntro, setShowIntro] = useState(true);

  // 2) hide video when it ends
  const handleVideoEnd = () => {
    setShowIntro(false);
  };

  // 3) while intro is up, render only the video overlay
  if (showIntro) {
    return (
      <div className="fixed inset-0 z-50 bg-black flex items-center justify-center">
        <video
          src={intro}
          className="w-full h-full object-cover"
          autoPlay
          muted
          playsInline
          onEnded={handleVideoEnd}
        />
      </div>
    );
  }

  // 4) once video is done, render your normal About page:
  const stats = [
    { icon: Headphones, value: "5K+", label: "Monthly Listeners" },
    { icon: Star, value: "4.8", label: "Average Rating" },
    { icon: Mic, value: "12+", label: "Episodes Released" },
    { icon: Users, value: "10+", label: "Notable Guests" },
  ];
  const platforms = [
    {
      icon: Youtube,
      name: "YouTube",
      color: "hover:text-red-500",
      href: "https://youtube.com/yourchannel",
    },
    {
      icon: CustomIcon,
      name: "Spotify",
      color: "hover:text-green-500",
      href: "https://open.spotify.com/show/yourshow",
    },
    {
      icon: Twitch,
      name: "Twitch",
      color: "hover:text-purple-500",
      href: "https://twitch.tv/yourchannel",
    },
    {
      icon: Apple,
      name: "Apple Podcasts",
      color: "hover:text-purple-300",
      href: "https://podcasts.apple.com/yourpodcast",
    },
  ];

  return (
    <div className="min-h-screen bg-blue-900/40 text-white pt-24">
      {/* Host Section */}
      <section className="py-20 bg-gradient-to-b from-gold-900 to-blue-950/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-6xl mx-auto"
          >
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="relative">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.8 }}
                  className="relative z-10"
                >
                  <img
                    src={host}
                    alt="Host"
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl"></div>
                </motion.div>
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-gold-600/20 to-gold-800/20 rounded-2xl -z-10"></div>
              </div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  Meet Your Host
                </h1>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  John Smith
                </h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    With five years of experience in digital media and a passion
                    for storytelling, John brings fresh energy and authentic
                    curiosity to every conversation...
                  </p>
                  {/* remaining paragraphs */}
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex space-x-4 mt-6"
                >
                  {[Twitter, Instagram, Youtube].map((Icon, idx) => (
                    <motion.a
                      key={idx}
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      whileTap={{ scale: 0.95 }}
                      href="#"
                      className="bg-gray-800 p-3 rounded-full hover:bg-gray-700 transition-colors"
                    >
                      <Icon size={20} />
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-16 bg-blue-950/5"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="text-center"
              >
                <div className="inline-block p-4 bg-gray-800/50 rounded-full mb-4">
                  <stat.icon size={24} className="text-gold-800" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20 bg-blue-950/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Our Story</h2>
            <p className="text-xl text-gray-300">
              From a simple idea to a growing platform for meaningful
              conversations
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            <div className="space-y-16">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="md:w-1/3">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl">
                    <Coffee size={48} className="text-white-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">The Spark</h3>
                    <p className="text-gray-300">
                      It all started with a series of engaging conversations
                      over coffee with friends about technology, culture, and
                      the future. We realized these discussions deserved a
                      broader audience.
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <img
                    src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="Early days"
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row-reverse items-center gap-8"
              >
                <div className="md:w-1/3">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl">
                    <Podcast size={48} className="text-white-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Taking Flight</h3>
                    <p className="text-gray-300">
                      In late 2024, we launched our first episode. The response
                      was immediate and encouraging, showing us there was a real
                      appetite for authentic, in-depth conversations.
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <img
                    src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="Growth phase"
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="flex flex-col md:flex-row items-center gap-8"
              >
                <div className="md:w-1/3">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-2xl">
                    <BookOpen size={48} className="text-white-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Looking Ahead</h3>
                    <p className="text-gray-300">
                      Today, we're building a community of curious minds and
                      working to bring you even more engaging content and
                      diverse perspectives.
                    </p>
                  </div>
                </div>
                <div className="md:w-2/3">
                  <img
                    src="https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="Current studio"
                    className="rounded-xl shadow-lg"
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Available On Section */}
      <section className="py-20 bg-blue-950/5">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Available On</h2>
            <p className="text-gray-300">
              Listen to our podcast on your favorite platform
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto"
          >
            {platforms.map((platform, index) => (
              <motion.a
                key={index}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`
            flex flex-col items-center p-6
            bg-gray-900/50 rounded-xl backdrop-blur-sm
            transition-colors ${platform.color}
          `}
              >
                <platform.icon size={32} />
                <span className="mt-2 font-medium">{platform.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-blue-950/5 to-gold-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-16"
          >
            <h2 className="text-4xl font-bold mb-6">Our Values</h2>
            <p className="text-xl text-gray-300">
              The principles guiding our journey from day one
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                icon: Mic,
                title: "Authentic Voices",
                description:
                  "We believe in real, unscripted conversations that reveal the true essence of our guests' stories.",
              },
              {
                icon: Heart,
                title: "Growing Together",
                description:
                  "Every episode is an opportunity to learn and grow alongside our community of listeners.",
              },
              {
                icon: Award,
                title: "Quality First",
                description:
                  "Though we're new, we're committed to delivering the highest quality content in every episode.",
              },
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-xl backdrop-blur-sm"
              >
                <div className="bg-gradient-to-br from-gold-600/20 to-gold-800/20 p-4 rounded-full inline-block mb-6">
                  <value.icon size={32} className="text-gold-800" />
                </div>
                <h3 className="text-2xl font-bold mb-4">{value.title}</h3>
                <p className="text-gray-300">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;
