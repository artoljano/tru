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

// const newsPosts: NewsPost[] = [
//   {
//     id: 1,
//     title: "Exciting New Guest Lineup for Spring 2025",
//     excerpt:
//       "We're thrilled to announce our upcoming guests for the spring season, featuring innovators in tech, science, and culture.",
//     content: `We're excited to announce our incredible lineup of guests for the upcoming spring season of our podcast! We've carefully curated a diverse group of innovators, thought leaders, and industry pioneers who will bring fresh perspectives and invaluable insights to our listeners.

//     In April, we'll be joined by Dr. Elena Rodriguez, a pioneering AI researcher whose work is revolutionizing healthcare diagnostics. Following her, we'll host Sarah Chen, founder of GreenTech Solutions, who will discuss sustainable innovation in urban development.

//     May brings us conversations with bestselling author James Mitchell about the future of storytelling in the digital age, and renowned psychologist Dr. Maya Patel will share groundbreaking research on digital wellness.

//     June will feature tech entrepreneur Marcus Wong discussing the evolution of virtual reality in education, followed by environmental activist Lisa Garcia sharing insights on community-driven conservation efforts.

//     Each guest brings a unique perspective and years of expertise in their respective fields. We can't wait to share these enlightening conversations with our listeners and explore the cutting-edge developments shaping our future.

//     Stay tuned for these exciting episodes, and don't forget to subscribe to our newsletter for exclusive behind-the-scenes content and guest insights!`,
//     date: "March 20, 2025",
//     isPodcastRelated: true,
//     image:
//       "https://images.unsplash.com/photo-1589903308904-1010c2294adc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     readTime: "3 min read",
//     tags: ["Podcast News", "Upcoming Episodes", "Announcements"],
//   },
//   {
//     id: 2,
//     title: "The Impact of AI on Creative Industries",
//     excerpt:
//       "Exploring how artificial intelligence is reshaping creative processes and what it means for future innovation.",
//     content: `Artificial Intelligence is revolutionizing the creative industry in ways we never imagined possible. From generative art to adaptive music composition, AI is not just a tool but a collaborative partner in the creative process.

//     Recent developments have shown that AI can enhance rather than replace human creativity. We're seeing AI being used to generate initial concepts that artists can then refine and develop, creating a unique blend of machine efficiency and human intuition.

//     Key areas where AI is making significant impact:

//     1. Visual Arts: AI algorithms can now generate unique artwork styles and assist in the creative process
//     2. Music Production: AI tools are helping composers create new melodies and harmonies
//     3. Content Creation: AI-powered tools are streamlining content creation while maintaining creative integrity
//     4. Design: Generative design is revolutionizing product development and architectural planning

//     However, this technological advancement raises important questions about the future of creativity. How do we maintain the human element in art while leveraging AI capabilities? What does this mean for traditional creative processes?

//     As we continue to explore these questions, one thing becomes clear: the future of creative industries will be shaped by how we choose to integrate AI into our creative processes while preserving the uniquely human aspects of artistic expression.`,
//     date: "March 18, 2025",
//     isPodcastRelated: false,
//     image:
//       "https://images.unsplash.com/photo-1677442136019-21780ecad995?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     readTime: "5 min read",
//     tags: ["Technology", "AI", "Creativity"],
//   },
//   {
//     id: 3,
//     title: "Behind the Scenes: Our New Studio Setup",
//     excerpt:
//       "Take a peek at our brand new recording studio and the technology that helps us create high-quality content.",
//     content: `We're excited to give you an exclusive look at our brand new, state-of-the-art recording studio! This upgrade represents a significant milestone in our journey to deliver the highest quality content to our listeners.

//     The new studio features:
//     - Professional-grade acoustic treatment for crystal-clear audio
//     - Multiple camera setups for high-quality video content
//     - Advanced mixing console for superior sound control
//     - Dedicated space for live musical performances
//     - Comfortable guest area for long-form conversations

//     We've invested in top-of-the-line equipment including:
//     - Neumann U87 microphones
//     - Universal Audio interfaces
//     - Professional lighting rigs
//     - 4K cameras for video production
//     - Advanced post-production workstation

//     This upgrade allows us to:
//     - Record multiple guests simultaneously
//     - Produce high-quality video content
//     - Host live musical performances
//     - Create immersive audio experiences
//     - Ensure consistent audio quality

//     The new space also includes a comfortable waiting area for guests and a dedicated post-production suite. We're particularly excited about the video capabilities, which will allow us to create more engaging content for our YouTube channel.

//     Stay tuned for upcoming episodes recorded in our new space, and let us know what you think of the improved audio quality!`,
//     date: "March 15, 2025",
//     isPodcastRelated: true,
//     image:
//       "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     readTime: "4 min read",
//     tags: ["Studio Update", "Behind the Scenes", "Equipment"],
//   },
//   {
//     id: 4,
//     title: "The Future of Remote Work and Digital Nomads",
//     excerpt:
//       "Insights on how the workplace continues to evolve and what it means for the future of work.",
//     content: `The landscape of work is undergoing a dramatic transformation, with remote work and digital nomadism at the forefront of this change. As we move further into 2025, we're seeing unprecedented shifts in how people approach their careers and work-life balance.

//     Key Trends:

//     1. Hybrid Work Models
//     - Companies are adopting flexible policies
//     - Office spaces are being redesigned for collaboration
//     - New technologies enabling seamless remote collaboration

//     2. Digital Nomad Infrastructure
//     - Cities developing specialized visas
//     - Co-living spaces becoming more sophisticated
//     - Global healthcare solutions for remote workers

//     3. Technology Adaptation
//     - VR meetings becoming mainstream
//     - AI-powered productivity tools
//     - Advanced project management platforms

//     4. Cultural Shifts
//     - Focus on results rather than hours worked
//     - Emphasis on work-life integration
//     - Global talent pools becoming the norm

//     Challenges and Solutions:
//     - Time zone management tools
//     - Mental health support for remote workers
//     - Building company culture virtually
//     - Ensuring equal opportunities for remote employees

//     The future of work is not just about where we work, but how we work. As technology continues to evolve and companies adapt, we're seeing a fundamental shift in the employer-employee relationship and the very nature of work itself.`,
//     date: "March 12, 2025",
//     isPodcastRelated: false,
//     image:
//       "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     readTime: "6 min read",
//     tags: ["Remote Work", "Future Trends", "Digital Nomads"],
//   },
//   {
//     id: 5,
//     title: "The Future of Remote Work and Digital Nomads",
//     excerpt:
//       "Insights on how the workplace continues to evolve and what it means for the future of work.",
//     content: `The landscape of work is undergoing a dramatic transformation, with remote work and digital nomadism at the forefront of this change. As we move further into 2025, we're seeing unprecedented shifts in how people approach their careers and work-life balance.

//     Key Trends:

//     1. Hybrid Work Models
//     - Companies are adopting flexible policies
//     - Office spaces are being redesigned for collaboration
//     - New technologies enabling seamless remote collaboration

//     2. Digital Nomad Infrastructure
//     - Cities developing specialized visas
//     - Co-living spaces becoming more sophisticated
//     - Global healthcare solutions for remote workers

//     3. Technology Adaptation
//     - VR meetings becoming mainstream
//     - AI-powered productivity tools
//     - Advanced project management platforms

//     4. Cultural Shifts
//     - Focus on results rather than hours worked
//     - Emphasis on work-life integration
//     - Global talent pools becoming the norm

//     Challenges and Solutions:
//     - Time zone management tools
//     - Mental health support for remote workers
//     - Building company culture virtually
//     - Ensuring equal opportunities for remote employees

//     The future of work is not just about where we work, but how we work. As technology continues to evolve and companies adapt, we're seeing a fundamental shift in the employer-employee relationship and the very nature of work itself.`,
//     date: "March 12, 2025",
//     isPodcastRelated: false,
//     image:
//       "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     readTime: "6 min read",
//     tags: ["Remote Work", "Future Trends", "Digital Nomads"],
//   },
//   {
//     id: 6,
//     title: "The Future of Remote Work and Digital Nomads",
//     excerpt:
//       "Insights on how the workplace continues to evolve and what it means for the future of work.",
//     content: `The landscape of work is undergoing a dramatic transformation, with remote work and digital nomadism at the forefront of this change. As we move further into 2025, we're seeing unprecedented shifts in how people approach their careers and work-life balance.

//     Key Trends:

//     1. Hybrid Work Models
//     - Companies are adopting flexible policies
//     - Office spaces are being redesigned for collaboration
//     - New technologies enabling seamless remote collaboration

//     2. Digital Nomad Infrastructure
//     - Cities developing specialized visas
//     - Co-living spaces becoming more sophisticated
//     - Global healthcare solutions for remote workers

//     3. Technology Adaptation
//     - VR meetings becoming mainstream
//     - AI-powered productivity tools
//     - Advanced project management platforms

//     4. Cultural Shifts
//     - Focus on results rather than hours worked
//     - Emphasis on work-life integration
//     - Global talent pools becoming the norm

//     Challenges and Solutions:
//     - Time zone management tools
//     - Mental health support for remote workers
//     - Building company culture virtually
//     - Ensuring equal opportunities for remote employees

//     The future of work is not just about where we work, but how we work. As technology continues to evolve and companies adapt, we're seeing a fundamental shift in the employer-employee relationship and the very nature of work itself.`,
//     date: "March 12, 2025",
//     isPodcastRelated: false,
//     image:
//       "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     readTime: "6 min read",
//     tags: ["Remote Work", "Future Trends", "Digital Nomads"],
//   },
//   {
//     id: 7,
//     title: "The Future of Remote Work and Digital Nomads",
//     excerpt:
//       "Insights on how the workplace continues to evolve and what it means for the future of work.",
//     content: `The landscape of work is undergoing a dramatic transformation, with remote work and digital nomadism at the forefront of this change. As we move further into 2025, we're seeing unprecedented shifts in how people approach their careers and work-life balance.

//     Key Trends:

//     1. Hybrid Work Models
//     - Companies are adopting flexible policies
//     - Office spaces are being redesigned for collaboration
//     - New technologies enabling seamless remote collaboration

//     2. Digital Nomad Infrastructure
//     - Cities developing specialized visas
//     - Co-living spaces becoming more sophisticated
//     - Global healthcare solutions for remote workers

//     3. Technology Adaptation
//     - VR meetings becoming mainstream
//     - AI-powered productivity tools
//     - Advanced project management platforms

//     4. Cultural Shifts
//     - Focus on results rather than hours worked
//     - Emphasis on work-life integration
//     - Global talent pools becoming the norm

//     Challenges and Solutions:
//     - Time zone management tools
//     - Mental health support for remote workers
//     - Building company culture virtually
//     - Ensuring equal opportunities for remote employees

//     The future of work is not just about where we work, but how we work. As technology continues to evolve and companies adapt, we're seeing a fundamental shift in the employer-employee relationship and the very nature of work itself.`,
//     date: "March 12, 2025",
//     isPodcastRelated: false,
//     image:
//       "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
//     readTime: "6 min read",
//     tags: ["Remote Work", "Future Trends", "Digital Nomads"],
//   },
// ];

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
        <link rel="canonical" href="https://yourdomain.com/newsletter" />
        <meta property="og:title" content="Newsletter – Tru Media" />
        <meta
          property="og:description"
          content="Abonohu në newsletter-in tonë për përmbledhje javore, reflektime origjinale dhe lajme nga komuniteti ynë."
        />
        <meta property="og:url" content="https://yourdomain.com/newsletter" />
        <meta
          property="og:image"
          content="https://yourdomain.com/og-newsletter.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="Newsletter – Tru Media" />
        <meta
          name="twitter:description"
          content="Abonohu në newsletter-in tonë për përmbledhje javore, reflektime origjinale dhe lajme nga komuniteti ynë."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/og-newsletter.png"
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
                    src={`server/${post.image}`}
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
