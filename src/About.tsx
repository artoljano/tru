import React from 'react';
import { Youtube, AlignJustify as Spotify, Apple, Instagram, Twitter, Headphones, Heart, Star, Award, Users, Mic, Radio, Music, Podcast, Coffee, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';

function About() {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const stats = [
    { icon: Headphones, value: "5K+", label: "Monthly Listeners" },
    { icon: Star, value: "4.8", label: "Average Rating" },
    { icon: Mic, value: "12+", label: "Episodes Released" },
    { icon: Users, value: "10+", label: "Notable Guests" }
  ];

  const platforms = [
    { icon: Spotify, name: "Spotify", color: "hover:text-green-500" },
    { icon: Apple, name: "Apple Podcasts", color: "hover:text-purple-500" },
    { icon: Youtube, name: "YouTube", color: "hover:text-red-500" },
    { icon: Radio, name: "Google Podcasts", color: "hover:text-blue-500" }
  ];

  return (
    <div className="min-h-screen bg-black text-white pt-24">
      {/* Host Section */}
      <section className="py-20">
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
                    src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                    alt="John Smith" 
                    className="rounded-2xl shadow-2xl"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent rounded-2xl"></div>
                </motion.div>
                <div className="absolute -top-4 -right-4 w-full h-full bg-gradient-to-br from-purple-600/20 to-blue-600/20 rounded-2xl -z-10"></div>
              </div>
              
              <motion.div 
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Meet Your Host</h1>
                <h2 className="text-2xl font-semibold text-purple-400 mb-4">John Smith</h2>
                <div className="space-y-4 text-gray-300">
                  <p>
                    With five years of experience in digital media and a passion for storytelling, 
                    John brings fresh energy and authentic curiosity to every conversation. His journey 
                    began with a successful YouTube channel where he discovered the power of meaningful dialogue.
                  </p>
                  <p>
                    A graduate in Digital Communications and former content creator, John has always been 
                    fascinated by the intersection of technology, culture, and human experience. His natural 
                    ability to connect with people and draw out their stories has quickly made this podcast 
                    a rising star in the industry.
                  </p>
                  <p>
                    "I started this podcast because I believe everyone has a story worth sharing. My goal is 
                    to create a space where authentic conversations can flourish and where both our guests 
                    and listeners can discover new perspectives."
                  </p>
                </div>
                
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="flex space-x-4 mt-6"
                >
                  {[Twitter, Instagram, Youtube].map((Icon, index) => (
                    <motion.a
                      key={index}
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
        className="py-16 bg-gradient-to-b from-black to-gray-900"
      >
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-block p-4 bg-gray-800/50 rounded-full mb-4">
                  <stat.icon size={24} className="text-purple-400" />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Our Story Section */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black">
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
              From a simple idea to a growing platform for meaningful conversations
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
                  <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 rounded-2xl">
                    <Coffee size={48} className="text-purple-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">The Spark</h3>
                    <p className="text-gray-300">
                      It all started with a series of engaging conversations over coffee with friends 
                      about technology, culture, and the future. We realized these discussions deserved 
                      a broader audience.
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
                  <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-8 rounded-2xl">
                    <Podcast size={48} className="text-blue-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Taking Flight</h3>
                    <p className="text-gray-300">
                      In late 2024, we launched our first episode. The response was immediate and 
                      encouraging, showing us there was a real appetite for authentic, in-depth 
                      conversations.
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
                  <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-8 rounded-2xl">
                    <BookOpen size={48} className="text-purple-400 mb-4" />
                    <h3 className="text-2xl font-bold mb-4">Looking Ahead</h3>
                    <p className="text-gray-300">
                      Today, we're building a community of curious minds and working to bring you even 
                      more engaging content and diverse perspectives.
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
      <section className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl font-bold mb-4">Available On</h2>
            <p className="text-gray-300">Listen to our podcast on your favorite platform</p>
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
                href="#"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex flex-col items-center p-6 bg-gray-900/50 rounded-xl backdrop-blur-sm ${platform.color} transition-colors`}
              >
                <platform.icon size={32} />
                <span className="mt-2 font-medium">{platform.name}</span>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
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
                description: "We believe in real, unscripted conversations that reveal the true essence of our guests' stories."
              },
              {
                icon: Heart,
                title: "Growing Together",
                description: "Every episode is an opportunity to learn and grow alongside our community of listeners."
              },
              {
                icon: Award,
                title: "Quality First",
                description: "Though we're new, we're committed to delivering the highest quality content in every episode."
              }
            ].map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 p-8 rounded-xl backdrop-blur-sm"
              >
                <div className="bg-gradient-to-br from-purple-600/20 to-blue-600/20 p-4 rounded-full inline-block mb-6">
                  <value.icon size={32} className="text-purple-400" />
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