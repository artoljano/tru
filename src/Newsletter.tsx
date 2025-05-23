import React, { useEffect, useState } from "react";
import {
  Calendar,
  Tag,
  ArrowRight,
  Rss,
  PenTool,
  Users,
  BookOpen,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Helmet } from "react-helmet-async";

interface NewsPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  isPodcastRelated: boolean;
  image: string;
  readTime: string;
  tags: string[];
}

const postsPerPage = 6;

function Newsletter() {
  const [filter, setFilter] = useState<"all" | "podcast" | "general">("all");
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    // Fetch posts from JSON file on page load (you would implement this in your backend)
    fetch("/api/getPosts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "podcast") return post.isPodcastRelated;
    return !post.isPodcastRelated;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (newPage: number) => {
    // Assuming you are updating the currentPage state when the page changes
    setCurrentPage(newPage);
    // Scroll to the top after changing the page
    window.scrollTo(0, 0);
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
      },
    },
  };

  return (
    <>
      <Helmet>
        <title>Newsletter – Tru Media</title>
        <meta
          name="description"
          content="Abonohu në newsletter-in tonë për përmbledhje javore, reflektime origjinale dhe lajme nga komuniteti ynë."
        />
        <link rel="canonical" href="https://trupodcast.media/newsletter" />
        <meta property="og:title" content="Newsletter – Tru Media" />
        <meta
          property="og:description"
          content="Abonohu në newsletter-in tonë për përmbledhje javore, reflektime origjinale dhe lajme nga komuniteti ynë."
        />
        <meta property="og:url" content="https://trupodcast.media/newsletter" />
        <meta
          property="og:image"
          content="https://trupodcast.media/og-newsletter.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Newsletter – Tru Media" />
        <meta
          name="twitter:description"
          content="Abonohu në newsletter-in tonë për përmbledhje javore, reflektime origjinale dhe lajme nga komuniteti ynë."
        />
        <meta
          name="twitter:image"
          content="https://trupodcast.media/og-newsletter.png"
        />
      </Helmet>

      <div className="min-h-screen bg-blue-900/40 text-white">
        {/* Seksioni Kryesor */}
        <section className="relative h-[100vh] overflow-hidden pt-[10rem] md:pt-0 md:h-[70vh]">
          <div className="absolute inset-0">
            <img
              src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
              alt="Pulti Shkrimi"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black" />
          </div>

          <div className="relative h-full container mx-auto px-4 flex items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="max-w-3xl"
            >
              <h1 className="text-5xl md:text-7xl font-bold mb-6">Tru Media</h1>
              <p className="text-xl text-gray-300 mb-8">
                Qëndroni të informuar për çdo zhvillim, ide dhe reflektim të ri
                në botën e politikës, kulturës dhe më shumë.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 break-words"
                >
                  <Rss className="w-8 h-8 mb-2 mx-auto text-gold-800" />
                  <div className="text-xl sm:text-2xl font-bold mb-1">
                    Javore
                  </div>
                  <div className="text-sm sm:text-base text-gray-400">
                    Përmbledhje
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 break-words"
                >
                  <PenTool className="w-8 h-8 mb-2 mx-auto text-gold-800" />
                  <div className="text-xl sm:text-2xl font-bold mb-1">
                    Ekskluzive
                  </div>
                  <div className="text-sm sm:text-base text-gray-400">
                    Reflektime Vetjake
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 break-words"
                >
                  <Users className="w-8 h-8 mb-2 mx-auto text-gold-800" />
                  <div className="text-xl sm:text-2xl font-bold mb-1">
                    Në Rritje
                  </div>
                  <div className="text-sm sm:text-base text-gray-400">
                    Komunitet
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Përmbajtja Kryesore */}
        <div className="container mx-auto px-4 py-20">
          {/* Butonat e Filtrit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-12 space-x-4"
          >
            {[
              { value: "all", label: "Të gjitha" },
              { value: "podcast", label: "Lajme Podcast-i" },
              { value: "general", label: "Reflektime" },
            ].map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  setFilter(option.value as "all" | "podcast" | "general");
                  setCurrentPage(1);
                }}
                className={`px-6 py-3 rounded-full transition-all duration-300 ${
                  filter === option.value
                    ? "bg-white text-black"
                    : "bg-gray-900 text-white hover:bg-gray-800"
                }`}
              >
                {option.label}
              </button>
            ))}
          </motion.div>

          <motion.div
            key={filter}
            variants={container}
            initial="hidden"
            animate="show"
            className="grid md:grid-cols-2 gap-8"
          >
            {currentPosts.map((post) => (
              <motion.article
                key={post.id}
                variants={item}
                className="bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              >
                <div className="relative aspect-video">
                  <img
                    src={`${post.image}`}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {post.isPodcastRelated && (
                    <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                      Lajme Podcast-i
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {post.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <BookOpen size={16} />
                      {post.readTime}
                    </span>
                  </div>
                  <h2 className="text-2xl font-bold mb-3">{post.title}</h2>
                  <p className="text-gray-300 mb-6">{post.excerpt}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                      >
                        <Tag size={14} />
                        {tag}
                      </span>
                    ))}
                  </div>
                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => setSelectedPost(post)}
                    className="flex items-center gap-2 text-gold-600 hover:text-gold-700 transition-colors"
                  >
                    Lexo Më Shumë
                    <ArrowRight size={16} />
                  </motion.button>
                </div>
              </motion.article>
            ))}
          </motion.div>

          {/* Navigimi */}
          <div className="flex justify-center mt-12">
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded-full mx-2 disabled:opacity-50"
            >
              Më Parë
            </button>
            <span className="px-4 py-2 bg-gray-800 text-white rounded-full">
              {currentPage} nga {totalPages}
            </span>
            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
              className="px-4 py-2 bg-gray-800 text-white rounded-full mx-2 disabled:opacity-50"
            >
              Më Pas
            </button>
          </div>
        </div>

        {/* Modal i Postimit të Plotë */}
        <AnimatePresence>
          {selectedPost && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
              onClick={() => setSelectedPost(null)}
            >
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 50 }}
                transition={{ type: "spring", damping: 25 }}
                className="container mx-auto px-4 py-12 min-h-screen flex items-center"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="bg-gray-900 rounded-xl max-w-4xl mx-auto overflow-hidden">
                  <div className="relative aspect-video">
                    <img
                      src={selectedPost.image}
                      alt={selectedPost.title}
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => setSelectedPost(null)}
                      className="absolute top-4 right-4 bg-black/50 p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                      <X size={24} />
                    </button>
                    {selectedPost.isPodcastRelated && (
                      <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                        Lajme Podcast-i
                      </div>
                    )}
                  </div>
                  <div className="p-8">
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                      <span className="flex items-center gap-1">
                        <Calendar size={16} />
                        {selectedPost.date}
                      </span>
                      <span className="flex items-center gap-1">
                        <BookOpen size={16} />
                        {selectedPost.readTime}
                      </span>
                    </div>
                    <h2 className="text-3xl font-bold mb-6">
                      {selectedPost.title}
                    </h2>
                    <div className="prose prose-invert max-w-none">
                      {selectedPost.content.split("\n").map((paragraph, i) => (
                        <p key={i} className="mb-4 text-gray-300">
                          {paragraph.trim()}
                        </p>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2 mt-8">
                      {selectedPost.tags.map((tag) => (
                        <span
                          key={tag}
                          className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                        >
                          <Tag size={14} />
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}

export default Newsletter;
