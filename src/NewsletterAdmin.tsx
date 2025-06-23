import React, { useEffect, useState } from "react";
import { Calendar, Tag, Rss, PenTool, Users, BookOpen, X } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import NewsletterForm, { NewsPost } from "./NewsletterForm";

const postsPerPage = 6;

const NewsletterAdmin: React.FC = () => {
  const [editingPost, setEditingPost] = useState<NewsPost | null>(null);
  const [filter, setFilter] = useState<"all" | "podcast" | "general">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    fetch("/api/getPosts")
      .then((res) => res.json())
      .then((data: any[]) => {
        setPosts(
          data.map((p) => ({
            ...p,
            tags: Array.isArray(p.tags)
              ? p.tags
              : typeof p.tags === "string"
              ? JSON.parse(p.tags)
              : [],
          }))
        );
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

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Newsletter Admin – Tru Media</title>
      </Helmet>

      {/* Hero Section */}
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
            className="max-w-3xl text-center"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-bold mb-6">
              Newsletter Admin
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Manage your newsletter posts below.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-20">
        {/* Filter Buttons */}
        <motion.div
          className="flex justify-center mb-12 space-x-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
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

        {/* Editing Form */}
        {editingPost && (
          <div className="mb-20">
            <NewsletterForm
              post={editingPost}
              onSave={(updated) => {
                setPosts((all) =>
                  all.map((p) => (p.id === updated.id ? updated : p))
                );
                setEditingPost(null);
              }}
              onDelete={(id) => {
                if (!editingPost) return;
                const imgPath =
                  typeof editingPost.image === "string"
                    ? editingPost.image
                    : "";
                handleDeletePost(id, imgPath);
                setEditingPost(null);
              }}
            />
          </div>
        )}

        {/* Posts Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.2 } },
          }}
        >
          {currentPosts.map((post) => (
            <motion.article
              key={post.id}
              className="bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm hover:shadow-2xl transition-all duration-300"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
              }}
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
                <div className="flex gap-4">
                  <button
                    onClick={() => setEditingPost(post)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const imgPath =
                        typeof post.image === "string" ? post.image : "";
                      handleDeletePost(post.id, imgPath);
                    }}
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
    </div>
  );
};

export default NewsletterAdmin;
