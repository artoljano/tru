import React, { useState } from "react";
import {
  Calendar,
  Tag,
  ChevronRight,
  ArrowRight,
  BookOpen,
  Rss,
  PenTool,
  Users,
} from "lucide-react";
import { motion } from "framer-motion";

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

const newsPosts: NewsPost[] = [
  {
    id: 1,
    title: "Exciting New Guest Lineup for Spring 2025",
    excerpt:
      "We're thrilled to announce our upcoming guests for the spring season, featuring innovators in tech, science, and culture.",
    content: "Lorem ipsum dolor sit amet...",
    date: "March 20, 2025",
    isPodcastRelated: true,
    image:
      "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    readTime: "3 min read",
    tags: ["Podcast News", "Upcoming Episodes", "Announcements"],
  },
  {
    id: 2,
    title: "The Impact of AI on Creative Industries",
    excerpt:
      "Exploring how artificial intelligence is reshaping creative processes and what it means for future innovation.",
    content: "Lorem ipsum dolor sit amet...",
    date: "March 18, 2025",
    isPodcastRelated: false,
    image:
      "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    readTime: "5 min read",
    tags: ["Technology", "AI", "Creativity"],
  },
  {
    id: 3,
    title: "Behind the Scenes: Our New Studio Setup",
    excerpt:
      "Take a peek at our brand new recording studio and the technology that helps us create high-quality content.",
    content: "Lorem ipsum dolor sit amet...",
    date: "March 15, 2025",
    isPodcastRelated: true,
    image:
      "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    readTime: "4 min read",
    tags: ["Studio Update", "Behind the Scenes", "Equipment"],
  },
  {
    id: 4,
    title: "The Future of Remote Work and Digital Nomads",
    excerpt:
      "Insights on how the workplace continues to evolve and what it means for the future of work.",
    content: "Lorem ipsum dolor sit amet...",
    date: "March 12, 2025",
    isPodcastRelated: false,
    image:
      "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
    readTime: "6 min read",
    tags: ["Remote Work", "Future Trends", "Digital Nomads"],
  },
];

function Newsletter() {
  const [filter, setFilter] = useState<"all" | "podcast" | "general">("all");

  const filteredPosts = newsPosts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "podcast") return post.isPodcastRelated;
    return !post.isPodcastRelated;
  });

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
    <div className="min-h-screen bg-black text-white">
      {/* New Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Writing Desk"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black"></div>
        </div>

        <div className="relative h-full container mx-auto px-4 flex items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">Newsletter</h1>
            <p className="text-xl text-gray-300 mb-8">
              Stay updated with our latest podcast news, insights, and thoughts
              on technology, culture, and more.
            </p>

            <div className="grid grid-cols-3 gap-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <Rss className="w-8 h-8 mb-2 mx-auto text-red-800" />
                <div className="text-2xl font-bold">Weekly</div>
                <div className="text-gray-400">Updates</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <PenTool className="w-8 h-8 mb-2 mx-auto text-red-800" />
                <div className="text-2xl font-bold">Original</div>
                <div className="text-gray-400">Content</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <Users className="w-8 h-8 mb-2 mx-auto text-red-800" />
                <div className="text-2xl font-bold">Growing</div>
                <div className="text-gray-400">Community</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-20">
        {/* Filter Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-12 space-x-4"
        >
          {[
            { value: "all", label: "All Posts" },
            { value: "podcast", label: "Podcast News" },
            { value: "general", label: "General Insights" },
          ].map((option) => (
            <button
              key={option.value}
              onClick={() =>
                setFilter(option.value as "all" | "podcast" | "general")
              }
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

        {/* Posts Grid */}
        <motion.div
          key={filter} // Only re-renders this part when filter changes
          variants={container}
          initial="hidden"
          animate="show"
          className="grid md:grid-cols-2 gap-8"
        >
          {filteredPosts.map((post) => (
            <motion.article
              key={post.id}
              variants={item}
              className="bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
            >
              <div className="relative aspect-video">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {post.isPodcastRelated && (
                  <div className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                    Podcast News
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
                  className="flex items-center gap-2 text-red-900 hover:text-red-600 transition-colors"
                >
                  Read More
                  <ArrowRight size={16} />
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Newsletter;
