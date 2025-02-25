import React from "react";
import {
  Youtube,
  AlignJustify as Spotify,
  Apple,
  Instagram,
  Twitter,
  Send,
  Play,
  Clock,
  ArrowRight,
  Mail,
  MapPin,
  Phone,
  Headphones,
  Heart,
  Star,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, useScroll, useTransform } from "framer-motion";

function App() {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const scaleProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0.8]);
  const opacityProgress = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <motion.div
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
          scale: scaleProgress,
          opacity: opacityProgress,
        }}
        className="h-screen parallax-bg flex items-center justify-center relative overflow-hidden"
        style={{
          backgroundImage:
            'url("https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80")',
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-center px-4 relative"
        >
          {/* <motion.h1
            className="text-5xl md:text-7xl font-bold mb-4"
            animate={{
              textShadow: [
                "0 0 20px rgba(255,0,0,0.2)",
                "0 0 40px rgba(255,0,0,0.4)",
                "0 0 20px rgba(255,0,0,0.2)",
              ],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "linear",
            }}
          > */}
          <h1 className="text-5xl md:text-7xl font-bold mb-4">
            TRU PODCAST MEDIA
          </h1>
          {/* </motion.h1> */}
          <p className="text-2xl md:text-2xl max-w-2xl mx-auto">
            Kur ke TRU, pse s'e perdor!
          </p>
          <p className="text-2xl md:text-2xl max-w-2xl mx-auto">
            Podcast i pa censuruar!
          </p>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.5, 1, 0.5],
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white"
        >
          <div className="flex flex-col items-center">
            <motion.div
              animate={{
                y: [0, 5, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            ></motion.div>
          </div>
        </motion.div>
      </motion.div>

      {/* Engagement CTA Section */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-gradient-to-b from-black to-red-950/50"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            Be Part of Our Journey
          </h2>
          <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto text-gray-300">
            Help us create better content and grow our community. Whether you
            know someone with an inspiring story or want to share your thoughts
            about our episodes, your input matters.
          </p>
          <div className="flex flex-col md:flex-row gap-6 justify-center max-w-2xl mx-auto">
            <button
              onClick={() => navigate("/suggest")}
              className="flex-1 bg-white text-black px-8 py-4 rounded-full text-lg font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center group"
            >
              Suggest a Guest
              <Send
                className="ml-2 group-hover:translate-x-1 transition-transform"
                size={20}
              />
            </button>
            <button
              onClick={() => navigate("/review")}
              className="flex-1 bg-gradient-to-r from-red-600 to-red-800 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-red-700 hover:to-red-900 transition-all duration-300 flex items-center justify-center group"
            >
              Leave a Review
              <Star
                className="ml-2 group-hover:scale-110 transition-transform"
                size={20}
              />
            </button>
          </div>
        </div>
      </motion.section>

      {/* Host Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-red-950/50"
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2"
            >
              <div className="aspect-square rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"
                  alt="Podcast Host"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
            <motion.div
              initial={{ x: 50, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="w-full md:w-1/2 text-center md:text-left"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Meet Your Host
              </h2>
              <h3 className="text-2xl font-semibold text-gray-300 mb-4">
                John Smith
              </h3>
              <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                With over a decade of experience in journalism and broadcasting,
                John brings a unique blend of curiosity, insight, and
                authenticity to every conversation. His ability to connect with
                guests and draw out their most compelling stories has made this
                podcast a must-listen for thousands of devoted fans.
              </p>
              <p className="text-lg text-gray-300 mb-8 leading-relaxed">
                "My goal is to create a space where meaningful conversations can
                flourish, where we can explore the depths of human experience,
                and where every episode leaves our listeners with new
                perspectives and insights."
              </p>
              <div className="flex space-x-6 justify-center md:justify-start">
                {[Instagram, Twitter, Youtube].map((Icon, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.2, rotate: 5 }}
                    href="#"
                    className="text-white hover:text-gray-300 transition-colors"
                  >
                    <Icon size={24} />
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Episodes Preview Section */}
      <section id="episodes" className="py-20 bg-black">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Latest Episodes
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Dive into our most recent conversations with extraordinary guests
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {/* Episode Cards */}
            {[1, 2, 3].map((index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="group"
              >
                <div className="relative aspect-[4/3] rounded-xl overflow-hidden mb-4">
                  <img
                    src={`https://images.unsplash.com/photo-${
                      index === 1
                        ? "1559523161-0fc0d8b38a7a"
                        : index === 2
                        ? "1521898284481-a5ec348cb555"
                        : "1516321497487-e288fb19713f"
                    }?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80`}
                    alt={`Episode ${index}`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Play size={48} className="text-white" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold mb-2 group-hover:text-gray-300 transition-colors">
                  {index === 1
                    ? "The Future of AI in Healthcare"
                    : index === 2
                    ? "Sustainable Architecture"
                    : "The Future of Work"}
                </h3>
                <div className="flex items-center text-gray-400 mb-3">
                  <Clock size={16} className="mr-2" />
                  <span>
                    {index === 1 ? "45" : index === 2 ? "52" : "38"} minutes
                  </span>
                </div>
                <p className="text-gray-300">
                  {index === 1
                    ? "Dr. Sarah Johnson discusses how artificial intelligence is revolutionizing medical diagnosis and treatment."
                    : index === 2
                    ? "Michael Chen shares his vision for eco-friendly buildings that harmonize with nature."
                    : "Emily Martinez explores how remote work is reshaping corporate culture and productivity."}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Creative Link to Episodes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-grey-600/20 to-red-950/50 blur-xl"></div>
            <a
              href="/episodes"
              className="relative block bg-gray-900/80 rounded-2xl p-8 backdrop-blur-sm group hover:bg-red-950/50 transition-all duration-300"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-2xl font-bold mb-2">
                    Ready to Explore More?
                  </h3>
                  <p className="text-gray-300">
                    Discover our full library of thought-provoking episodes
                  </p>
                </div>
                <div className="bg-white/10 p-4 rounded-full group-hover:bg-white/20 transition-colors duration-300">
                  <ArrowRight
                    size={24}
                    className="text-white group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>
              </div>
            </a>
          </motion.div>
        </div>
      </section>

      {/* YouTube Channel Promotion */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black"
      >
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gradient-to-r from-red-600/20 to-red-900/20 rounded-2xl p-8 md:p-12 relative overflow-hidden">
              <motion.div
                animate={{
                  background: [
                    "radial-gradient(circle at 0% 0%, rgba(255,0,0,0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 100% 100%, rgba(255,0,0,0.1) 0%, transparent 50%)",
                    "radial-gradient(circle at 0% 0%, rgba(255,0,0,0.1) 0%, transparent 50%)",
                  ],
                }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
                className="absolute inset-0"
              />
              <div className="relative">
                <div className="flex flex-col md:flex-row items-center justify-between gap-8">
                  <div className="text-center md:text-left">
                    <h3 className="text-2xl md:text-3xl font-bold mb-4">
                      Join Us on YouTube
                    </h3>
                    <p className="text-gray-300 max-w-md">
                      Get exclusive behind-the-scenes content, video versions of
                      our episodes, and special bonus content only available on
                      our YouTube channel.
                    </p>
                  </div>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href="https://youtube.com/@podcastname"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-4 bg-red-600 hover:bg-red-700 text-white px-8 py-4 rounded-full transition-all duration-300"
                  >
                    <Youtube size={24} />
                    <span className="font-semibold">Subscribe Now</span>
                    <ArrowRight className="group-hover:translate-x-1 transition-transform" />
                  </motion.a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </div>
  );
}

export default App;
