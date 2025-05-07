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
import axios from "axios";

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
  playlistTitle?: string; // Added this property for enriched data
}

type Playlist = {
  id: number;
  playlistTitle: string;
};

const handleScrollToTop = () => {
  window.scrollTo(0, 0); // Scrolls the page to the top
};

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function formatDate(iso: string) {
  // "2025-05-07T07:05:39Z" → "2025-05-07"
  return iso.split("T")[0];
}

function truncate(text: string, max = 100) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

interface Episode {
  id: string;
  title: string;
  guest: string;
  description: string;
  duration: string;
  date: string;
  image: string;
  youtubeUrl: string;
  tags: string[];
  playlist: string;
}

interface PlaylistGroup {
  playlistId: string;
  playlistTitle: string;
  videos: Episode[];
}

const Episodes = () => {
  const [groups, setGroups] = useState<PlaylistGroup[]>([]);
  const [episodes, setEpisodes] = useState<Episode[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedEpisode, setSelectedEpisode] = useState<Episode | null>(null);
  const [stats, setStats] = useState({
    episodes: 0,
    guests: 0,
    listeners: 0,
  });

  const navigate = useNavigate();

  // fetch playlists → categories
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const { data: grp } = await axios.get<PlaylistGroup[]>(
        "http://localhost:5000/api/playlists"
      );
      setGroups(grp);
      setLoading(false);
    };
    load();
  }, []);

  // reload episodes whenever category changes
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      const url =
        selectedCategory === "All"
          ? "http://localhost:5000/api/episodes"
          : `http://localhost:5000/api/episodes?playlist=${encodeURIComponent(
              selectedCategory
            )}`;
      const { data: eps } = await axios.get<Episode[]>(url);
      setEpisodes(eps);
      setLoading(false);
    };
    load();
  }, [selectedCategory]);

  useEffect(() => {
    const loadStats = async () => {
      const cached = localStorage.getItem("channelStats");
      if (cached) {
        setStats(JSON.parse(cached));
        return;
      }
      try {
        const { data } = await axios.get<{
          totalEpisodes: number;
          totalViews: number;
        }>("http://localhost:5000/api/stats");
        const newStats = {
          episodes: data.totalEpisodes,
          guests: 30, // adjust if you have real guest count
          listeners: data.totalViews / 1000,
        };
        setStats(newStats);
        localStorage.setItem("channelStats", JSON.stringify(newStats));
      } catch (e) {
        console.error("Error loading stats", e);
      }
    };
    loadStats();
  }, []);

  // build category list
  const categories = ["All", ...groups.map((g) => g.playlistTitle)];

  // apply search filter
  const filteredEpisodes = episodes.filter((ep) => {
    const s = searchTerm.toLowerCase();
    return (
      ep.title.toLowerCase().includes(s) ||
      ep.guest.toLowerCase().includes(s) ||
      ep.description.toLowerCase().includes(s)
    );
  });

  const handleReviewClick = (episodeId: number) => {
    navigate(`/review?episode=${episodeId}`);
  };

  if (loading) return <div>Loading episodes...</div>;

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
    <div className="min-h-screen bg-blue-900/40 text-white">
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
                <Mic className="w-8 h-8 mb-2 mx-auto text-gold-800" />
                <div className="text-2xl font-bold">50+</div>
                <div className="text-gray-400">Episodes</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <Users className="w-8 h-8 mb-2 mx-auto text-gold-800" />
                <div className="text-2xl font-bold">{stats.guests}+</div>
                <div className="text-gray-400">Guests</div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-4 text-center"
              >
                <Headphones className="w-8 h-8 mb-2 mx-auto text-gold-800" />
                <div className="text-2xl font-bold">
                  {Math.round(stats.listeners)}K+
                </div>
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
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            {/* Search input takes full width always */}
            <div className="relative w-full">
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
            {/* On small: full width & margin-top; on sm+: auto width and no top margin */}
            <div className="w-full sm:w-auto">
              <div className="flex items-center gap-2">
                <Filter size={20} className="text-gray-400 flex-shrink-0" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full sm:w-auto bg-gray-900 border border-gray-700 rounded-full px-4 py-3 focus:border-white focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
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
            {selectedEpisode && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col"
                >
                  {/* Close button pinned to top-right of the card */}
                  <button
                    onClick={() => setSelectedEpisode(null)}
                    aria-label="Close"
                    className="absolute top-4 right-4 z-20 text-gray-400 hover:text-gray-200"
                  >
                    ✕
                  </button>

                  {/* Scrollable body */}
                  <div className="p-8 overflow-y-auto flex-1">
                    <h2 className="text-2xl font-bold mb-4">
                      {decodeHtml(selectedEpisode.title)}
                    </h2>
                    <p className="whitespace-pre-line text-gray-200">
                      {decodeHtml(selectedEpisode.description)}
                    </p>
                  </div>
                </motion.div>
              </div>
            )}

            {filteredEpisodes.map((episode) => (
              <motion.div
                key={episode.id}
                variants={item}
                whileHover={{ scale: 1.02 }}
                className="bg-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm transform transition-all duration-300 hover:shadow-2xl"
              >
                <div className="relative aspect-video">
                  <img
                    src={episode.image}
                    alt={decodeHtml(episode.title)}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                  {/* <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                    <div className="w-full">
                      <h2 className="text-2xl font-bold mb-2">
                        {decodeHtml(episode.title)}
                      </h2>
                      <p className="text-gray-300">
                        with {decodeHtml(episode.guest)}
                      </p>
                    </div>
                  </div> */}
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
                      {formatDate(episode.date)}
                    </span>
                  </div>
                  <p className="text-gray-300 mb-6">
                    {truncate(episode.description)}
                    <button
                      onClick={() => setSelectedEpisode(episode)}
                      className="ml-2 text-blue-400 hover:text-blue-300 underline"
                    >
                      Read more
                    </button>
                  </p>
                  {selectedCategory !== "All" && (
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
                  )}
                  <div className="flex items-center gap-4">
                    <motion.a
                      whileHover={{ x: 5 }}
                      href={episode.youtubeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
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
