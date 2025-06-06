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

const NewsletterAdmin = () => {
  const [filter, setFilter] = useState<"all" | "podcast" | "general">("all");
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const postsPerPage = 6; // Define posts per page

  useEffect(() => {
    // Fetch posts from JSON file or your backend API
    fetch("/api/getPosts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  // Filter the posts based on the selected filter value
  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    if (filter === "podcast") return post.isPodcastRelated;
    return !post.isPodcastRelated;
  });

  // Pagination logic - slice the filtered posts based on the current page
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  // Handle page change (for pagination)
  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  // Animation variants for container and items
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

  // Handle delete post functionality
  const handleDeletePost = (postId: number, postImage: string) => {
    if (
      window.confirm("Are you sure you want to delete this post and its image?")
    ) {
      fetch(`/api/deletePost`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, image: postImage }), // Send both postId and image path
      })
        .then((response) => {
          console.log("Response:", response);

          if (!response.ok) {
            throw new Error("Failed to delete post.");
          }
          return response.json();
        })
        .then((data) => {
          if (data.message === "Post and image deleted successfully") {
            const updatedPosts = posts.filter((post) => post.id !== postId);
            setPosts(updatedPosts); // Update the post list
            alert("Post and image deleted successfully");
          }
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          alert("Error deleting post: " + error.message);
        });
    }
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
                  src={`/${post.image}`}
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
                  onClick={() => setSelectedPost(post)}
                  className="flex items-center gap-2 text-red-600 hover:text-red-700 transition-colors"
                >
                  Lexo më shumë
                  <ArrowRight size={16} />
                </motion.button>
                {/* Edit and Delete Buttons */}
                <div className="mt-4 flex justify-between gap-4">
                  <button
                    onClick={() => handleDeletePost(post.id, post.image)}
                    className="text-red-500 hover:text-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </motion.div>

        {/* Pagination */}
        <div className="flex justify-center mt-12">
          <button
            disabled={currentPage === 1}
            onClick={() => handlePageChange(currentPage - 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-full mx-2 disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-800 text-white rounded-full">
            {currentPage} of {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => handlePageChange(currentPage + 1)}
            className="px-4 py-2 bg-gray-800 text-white rounded-full mx-2 disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>

      {/* Full Post Modal */}
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
                      Podcast News
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
                    {selectedPost.content
                      .split("\n")
                      .map((paragraph, index) => (
                        <p key={index} className="mb-4 text-gray-300">
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
  );
};

export default NewsletterAdmin;
