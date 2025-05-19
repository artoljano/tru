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
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import { Helmet } from "react-helmet-async";

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
}

interface PlaylistGroup {
  playlistId: string;
  playlistTitle: string;
  videos: Episode[];
}

const handleScrollToTop = () => {
  window.scrollTo(0, 0);
};

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

function formatDate(iso: string) {
  return iso.split("T")[0];
}

function truncate(text: string, max = 100) {
  return text.length > max ? text.slice(0, max) + "…" : text;
}

const Episodes: React.FC = () => {
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

  useEffect(() => {
    handleScrollToTop();
    const loadPlaylists = async () => {
      setLoading(true);
      const { data: grp } = await axios.get<PlaylistGroup[]>(
        "http://localhost:5000/api/playlists"
      );
      setGroups(grp);
      setLoading(false);
    };
    loadPlaylists();
  }, []);

  useEffect(() => {
    const loadEpisodes = async () => {
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
    loadEpisodes();
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
          guests: 30, // update as needed
          listeners: data.totalViews / 1000,
        };
        setStats(newStats);
        localStorage.setItem("channelStats", JSON.stringify(newStats));
      } catch (e) {
        console.error(e);
      }
    };
    loadStats();
  }, []);

  const categories = ["All", ...groups.map((g) => g.playlistTitle)];

  const filteredEpisodes = episodes.filter((ep) => {
    const s = searchTerm.toLowerCase();
    return (
      ep.title.toLowerCase().includes(s) ||
      ep.guest.toLowerCase().includes(s) ||
      ep.description.toLowerCase().includes(s)
    );
  });

  const handleReviewClick = (episodeId: string) => {
    navigate(`/review?episode=${episodeId}`);
  };

  if (loading) return <div className="text-center py-20">Loading...</div>;

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  };
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <>
      <Helmet>
        <title>Episodet Tona – Tru Podcast Media</title>
        <meta
          name="description"
          content="Eksploroni koleksionin tonë të bisedave frymëzuese me të ftuar të jashtëzakonshëm."
        />
        <link rel="canonical" href="https://yourdomain.com/episodes" />

        {/* Open-Graph */}
        <meta property="og:title" content="Episodet Tona – Tru Podcast Media" />
        <meta
          property="og:description"
          content="Eksploroni koleksionin tonë të bisedave frymëzuese me të ftuar të jashtëzakonshëm."
        />
        <meta property="og:url" content="https://yourdomain.com/episodes" />
        <meta
          property="og:image"
          content="https://yourdomain.com/og-episodes.png"
        />

        {/* Twitter Card */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Episodet Tona – Tru Podcast Media"
        />
        <meta
          name="twitter:description"
          content="Eksploroni koleksionin tonë të bisedave frymëzuese me të ftuar të jashtëzakonshëm."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/og-episodes.png"
        />
      </Helmet>

      <div className="min-h-screen bg-blue-900/40 text-white">
        {/* Hero */}
        <section className="relative h-[100vh] overflow-hidden pt-[10rem] md:pt-0 md:	h-[70vh]">
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
                Episodet Tona
              </h1>
              <p className="text-xl text-gray-300 mb-8">
                Eksploroni koleksionin tonë të bisedave frymëzuese me të ftuar
                të jashtëzakonshëm.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <motion.div
                  variants={item}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                >
                  <Mic className="w-8 h-8 mb-2 mx-auto text-gold-800" />
                  <div className="text-xl sm:text-2xl font-bold">50+</div>
                  <div className="text-sm sm:text-base text-gray-400">
                    Episode
                  </div>
                </motion.div>
                <motion.div
                  variants={item}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                >
                  <Users className="w-8 h-8 mb-2 mx-auto text-gold-800" />
                  <div className="text-xl sm:text-2xl font-bold">
                    {stats.guests}+
                  </div>
                  <div className="text-sm sm:text-base text-gray-400">
                    Të Ftuar
                  </div>
                </motion.div>
                <motion.div
                  variants={item}
                  className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center"
                >
                  <Headphones className="w-8 h-8 mb-2 mx-auto text-gold-800" />
                  <div className="text-xl sm:text-2xl font-bold">
                    {Math.round(stats.listeners)}K+
                  </div>
                  <div className="text-sm sm:text-base text-gray-400">
                    Dëgjues
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Filters */}
        <div className="container mx-auto px-4 py-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-center gap-4 mb-12"
          >
            <div className="relative w-full">
              <Search
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="text"
                placeholder="Kërko episod..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gray-900 rounded-full border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none transition-all duration-300"
              />
            </div>
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
          </motion.div>

          {/* Episode Grid */}
          {filteredEpisodes.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-gray-400">Nuk u gjet asnjë episod.</p>
            </div>
          ) : (
            <motion.div
              key={`${searchTerm}-${selectedCategory}`}
              variants={container}
              initial="hidden"
              animate="show"
              className="grid md:grid-cols-2 gap-8"
            >
              {filteredEpisodes.map((episode) => (
                <motion.div
                  key={episode.id}
                  variants={item}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-700/50 rounded-xl overflow-hidden backdrop-blur-sm transition-all duration-300 hover:shadow-2xl"
                >
                  <div className="relative aspect-video">
                    <img
                      src={episode.image}
                      alt={decodeHtml(episode.title)}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 flex gap-2">
                      <button
                        onClick={() => handleReviewClick(episode.id)}
                        className="bg-black text-white p-2 rounded-full"
                      >
                        <Star size={24} />
                      </button>
                      <a
                        href={episode.youtubeUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-red-600 text-white p-2 rounded-full"
                      >
                        <Youtube size={24} />
                      </a>
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
                        Lexo më shumë
                      </button>
                    </p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </div>

        {/* Modal */}
        <AnimatePresence>
          {selectedEpisode && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
              onClick={() => setSelectedEpisode(null)}
            >
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", damping: 25 }}
                className="relative bg-gray-900 rounded-xl w-full max-w-2xl max-h-[90vh] mx-auto my-20 overflow-hidden flex flex-col"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={() => setSelectedEpisode(null)}
                  className="absolute top-4 right-4 text-gray-400 hover:text-gray-200"
                >
                  ✕
                </button>
                <div className="p-8 overflow-y-auto flex-1">
                  <h2 className="text-2xl font-bold mb-4">
                    {decodeHtml(selectedEpisode.title)}
                  </h2>
                  <p className="whitespace-pre-line text-gray-200">
                    {decodeHtml(selectedEpisode.description)}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export default Episodes;
