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
import NewsletterForm, { NewsPost as FormPost } from "./NewsletterForm";

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

const NewsletterAdmin: React.FC = () => {
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [filter, setFilter] = useState<"all" | "podcast" | "general">("all");
  const [selectedPost, setSelectedPost] = useState<NewsPost | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    fetch("/api/getPosts")
      .then((res) => res.json())
      .then((data: any[]) => {
        // Normalize tags so .map always works
        const normalized: NewsPost[] = data.map((p) => ({
          ...p,
          tags: Array.isArray(p.tags)
            ? p.tags
            : typeof p.tags === "string"
            ? JSON.parse(p.tags)
            : [],
        }));
        setPosts(normalized);
      })
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setPosts([]);
      });
  }, []);

  const filteredPosts = posts.filter((post) => {
    if (filter === "all") return true;
    return filter === "podcast"
      ? post.isPodcastRelated
      : !post.isPodcastRelated;
  });

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo(0, 0);
  };

  const handleDeletePost = (postId: number, postImage: string) => {
    if (
      window.confirm("Are you sure you want to delete this post and its image?")
    ) {
      fetch(`/api/deletePost`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, image: postImage }),
      })
        .then((response) => {
          if (!response.ok) throw new Error("Failed to delete post.");
          return response.json();
        })
        .then((data) => {
          if (data.message === "Post and image deleted successfully") {
            setPosts((all) => all.filter((p) => p.id !== postId));
            alert("Post and image deleted successfully");
          }
        })
        .catch((error) => {
          console.error("Error deleting post:", error);
          alert("Error deleting post: " + error.message);
        });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Writing Desk"
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
            className="max-w-3xl text-center"
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Newsletter Admin
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Manage, edit, and delete newsletter posts.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        <motion.div
          className="flex justify-center mb-12 space-x-4"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {[
            { value: "all", label: "All Posts" },
            { value: "podcast", label: "Podcast News" },
            { value: "general", label: "General Insights" },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                setFilter(opt.value as any);
                setCurrentPage(1);
              }}
              className={`px-6 py-3 rounded-full transition-all duration-300 ${
                filter === opt.value
                  ? "bg-white text-black"
                  : "bg-gray-900 text-white hover:bg-gray-800"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </motion.div>

        {editingPost && (
          <div className="mb-20">
            <NewsletterForm
              post={editingPost}
              onSave={(updated: FormPost) => {
                setPosts((all) =>
                  all.map((p) => (p.id === updated.id ? updated : p))
                );
                setEditingPost(null);
              }}
              onDelete={(id) => {
                handleDeletePost(id, editingPost.image);
                setEditingPost(null);
              }}
            />
          </div>
        )}

        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          animate="show"
          variants={containerVariants}
        >
          {currentPosts.map((post) => (
            <motion.article
              key={post.id}
              className="bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              variants={itemVariants}
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
                  onClick={() => setEditingPost(post)}
                  className="text-blue-400 hover:text-blue-500 mr-4"
                >
                  Edit
                </motion.button>
                <motion.button
                  whileHover={{ x: 10 }}
                  onClick={() => handleDeletePost(post.id, post.image)}
                  className="text-red-500 hover:text-red-600"
                >
                  Delete
                </motion.button>
              </div>
            </motion.article>
          ))}
        </motion.div>

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

      <AnimatePresence>
        {selectedPost && (
          <motion.div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPost(null)}
          >
            <motion.div
              className="container mx-auto px-4 py-12 min-h-screen flex items-center"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25 }}
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
                    {selectedPost.content.split("\n").map((paragraph, idx) => (
                      <p key={idx} className="mb-4 text-gray-300">
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
