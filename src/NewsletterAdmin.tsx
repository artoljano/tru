import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Calendar, Tag, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { Helmet } from "react-helmet-async";
import { NewsPost } from "./NewsletterForm";

const postsPerPage = 6;

const NewsletterAdmin: React.FC = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<"all" | "podcast" | "general">("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [posts, setPosts] = useState<NewsPost[]>([]);

  useEffect(() => {
    fetch("/api/getPosts")
      .then((res) => res.json())
      .then((data: any[]) =>
        setPosts(
          data.map((p) => ({
            ...p,
            tags: Array.isArray(p.tags)
              ? p.tags
              : typeof p.tags === "string"
              ? JSON.parse(p.tags)
              : [],
          }))
        )
      )
      .catch((err) => {
        console.error("Failed to fetch posts:", err);
        setPosts([]);
      });
  }, []);

  const handleDeletePost = (postId: number, postImage: string) => {
    if (
      window.confirm("Are you sure you want to delete this post and its image?")
    ) {
      fetch(`/api/deletePost`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: postId, image: postImage }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to delete post.");
          return res.json();
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

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Newsletter Admin – Tru Media</title>
      </Helmet>

      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d"
            alt="Desk"
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
            <button
              onClick={() => navigate("/admin/newsletter/add")}
              className="mt-4 px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
            >
              + Add New Post
            </button>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <div className="container mx-auto px-4 py-12">
        <motion.div
          className="flex justify-center mb-8 space-x-4"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
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
              className={`px-5 py-2 rounded-full transition ${
                filter === opt.value
                  ? "bg-white text-black"
                  : "bg-gray-900 hover:bg-gray-800"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </motion.div>

        {/* Posts Grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-8"
          initial="hidden"
          animate="show"
          variants={{
            hidden: { opacity: 0 },
            show: { opacity: 1, transition: { staggerChildren: 0.1 } },
          }}
        >
          {currentPosts.map((post) => (
            <motion.article
              key={post.id}
              className="bg-gray-900/50 rounded-xl overflow-hidden backdrop-blur-sm hover:shadow-2xl transition"
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
              }}
            >
              <div className="relative aspect-video">
                <img
                  src={`/${post.image}`}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
                {post.isPodcastRelated && (
                  <span className="absolute top-3 left-3 bg-black text-white px-2 py-1 rounded-full text-xs">
                    Podcast News
                  </span>
                )}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {post.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={14} />
                    {post.readTime}
                  </span>
                </div>
                <h2 className="text-2xl font-bold mb-2">{post.title}</h2>
                <p className="text-gray-300 mb-4">{post.excerpt}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className="flex items-center gap-1 px-3 py-1 bg-gray-800 rounded-full text-xs text-gray-300"
                    >
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <button
                    onClick={() => navigate(`/admin/newsletter/add/${post.id}`)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const img =
                        typeof post.image === "string" ? post.image : "";
                      handleDeletePost(post.id, img);
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
        <div className="flex justify-center mt-12 gap-4">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 rounded-full disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-800 rounded-full">
            {currentPage} / {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 bg-gray-800 rounded-full disabled:opacity-50"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewsletterAdmin;
