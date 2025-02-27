import React, { useEffect, useState } from "react";
import {
  Play,
  Clock,
  Calendar,
  Youtube,
  ExternalLink,
  Search,
  Filter,
  Star,
  Headphones,
  Mic,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

interface Episode {
  id: number;
  title: string;
  guest: string;
  description: string;
  duration: string;
  date: string;
  image: string;
  youtubeUrl: string;
  category: string;
  tags: string[];
}

const categories = ["All", "Technology", "Environment", "Business", "Health"];

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const Episodes = () => {
  const [episodes, setEpisodes] = useState<Episode[]>([]); // State to store episodes
  const [searchTerm, setSearchTerm] = useState(""); // State for search
  const [selectedCategory, setSelectedCategory] = useState("All"); // State for selected category
  const [loading, setLoading] = useState(true); // Loading state
  const navigate = useNavigate();

  useEffect(() => {
    const cachedEpisodes = localStorage.getItem("episodes");

    if (cachedEpisodes) {
      // If cached episodes exist, load them from localStorage
      setEpisodes(JSON.parse(cachedEpisodes));
      setLoading(false);
    } else {
      // If no cached episodes, fetch new data
      const fetchEpisodes = async () => {
        try {
          setLoading(true);
          const response = await fetch("http://localhost:5000/api/podcasts");
          const data = await response.json();
          setEpisodes(data); // Set the fetched episodes in the state

          // Cache the fetched data in localStorage
          localStorage.setItem("episodes", JSON.stringify(data));

          setLoading(false);
        } catch (error) {
          console.error("Error fetching episodes:", error); // Handle any errors
          setLoading(false);
        }
      };

      fetchEpisodes(); // Call the fetch function to get new data if no cached data
    }
  }, []); // Empty dependency array to run once when the component mounts

  // Filter episodes based on search term and category
  const filteredEpisodes = episodes.filter((episode) => {
    const matchesSearch =
      episode.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.guest.toLowerCase().includes(searchTerm.toLowerCase()) ||
      episode.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || episode.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const handleReviewClick = (episodeId: number) => {
    navigate(`/review?episode=${episodeId}`);
  };

  if (loading) {
    return <div>Loading episodes...</div>;
  }

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
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1478737270239-2f02b77fc618?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Podcast Studio"
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
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Our Episodes
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Dive into our collection of thought-provoking conversations with
              extraordinary guests.
            </p>

            <div className="grid grid-cols-3 gap-6 mb-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <Mic className="w-8 h-8 mb-2 mx-auto text-red-800" />
                <div className="text-2xl font-bold">12+</div>
                <div className="text-gray-400">Episodes</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <Users className="w-8 h-8 mb-2 mx-auto text-red-800" />
                <div className="text-2xl font-bold">10+</div>
                <div className="text-gray-400">Guests</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <Headphones className="w-8 h-8 mb-2 mx-auto text-red-800" />
                <div className="text-2xl font-bold">5K+</div>
                <div className="text-gray-400">Listeners</div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto mb-12"
        >
          <div className="flex flex-col md:flex-row gap-4 items-center">
            <div className="relative flex-1">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Search episodes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 rounded-full border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
              />
            </div>
            <div className="flex items-center gap-4">
              <Filter size={20} className="text-gray-400" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-gray-900 border border-gray-700 rounded-full px-6 py-3 focus:border-white focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </motion.div>

        {filteredEpisodes.length === 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <p className="text-xl text-gray-400">
              No episodes found matching your search.
            </p>
          </motion.div>
        ) : (
          <motion.div
            key={`${searchTerm}-${selectedCategory}`} // Forces re-render when filters change
            variants={container}
            initial="hidden"
            animate="show" // Use animate instead of whileInView
            className="grid md:grid-cols-2 gap-8"
          >
            {filteredEpisodes.map((episode) => (
              <motion.div
                key={episode.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm transform transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative aspect-video">
                  <img
                    src={episode.image}
                    alt={decodeHtml(episode.title)}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div className="w-full">
                      <h2 className="text-2xl font-bold mb-2">
                        {decodeHtml(episode.title)}
                      </h2>
                      <p className="text-gray-300">
                        with {decodeHtml(episode.guest)}
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => handleReviewClick(episode.id)}
                      className="bg-black hover:bg-black text-white p-2 rounded-full transition-colors duration-300"
                      title="Leave a review"
                    >
                      <Star size={24} />
                    </motion.button>
                    <motion.a
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      href={episode.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300"
                    >
                      <Youtube size={24} />
                    </motion.a>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                    <span className="flex items-center gap-1">
                      <Clock size={16} />
                      {decodeHtml(episode.duration)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar size={16} />
                      {episode.date}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6">{episode.description}</p>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {episode.tags.map((tag) => (
                      <motion.span
                        key={tag}
                        whileHover={{ scale: 1.05 }}
                        className="px-3 py-1 bg-gray-800 rounded-full text-sm text-gray-300"
                      >
                        {decodeHtml(tag)}
                      </motion.span>
                    ))}
                  </div>
                  <div className="flex items-center gap-4">
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={episode.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-red-900 hover:text-red-600 transition-colors"
                    >
                      Watch on YouTube
                      <ExternalLink size={16} />
                    </motion.a>
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => handleReviewClick(episode.id)}
                      className="inline-flex items-center gap-2 text-white hover:text-white transition-colors"
                    >
                      Leave a Review
                      <Star size={16} />
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Episodes;
