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
      .then((r) => r.json())
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
      .catch(() => setPosts([]));
  }, []);

  const filtered = posts.filter((p) =>
    filter === "all"
      ? true
      : filter === "podcast"
      ? p.isPodcastRelated
      : !p.isPodcastRelated
  );

  const totalPages = Math.ceil(filtered.length / postsPerPage);
  const current = filtered.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div className="min-h-screen bg-black text-white">
      <Helmet>
        <title>Newsletter Admin – Tru Media</title>
      </Helmet>

      {/* Hero */}
      <section className="relative h-[70vh]">
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full flex items-center justify-center">
          <h1 className="text-5xl md:text-7xl font-bold">Newsletter Admin</h1>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        <button
          onClick={() => navigate("/admin/newsletter/add")}
          className="mb-6 px-6 py-3 bg-white text-black rounded-full"
        >
          + Add New Post
        </button>

        {/* Filters */}
        <div className="flex justify-center mb-8 space-x-4">
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
              className={`px-4 py-2 rounded-full ${
                filter === opt.value
                  ? "bg-white text-black"
                  : "bg-gray-800 hover:bg-gray-700"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

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
          {current.map((post) => (
            <motion.article
              key={post.id}
              className="bg-gray-900/50 rounded-xl overflow-hidden"
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
                  <span className="absolute top-4 left-4 bg-black text-white px-3 py-1 rounded-full text-sm">
                    Podcast News
                  </span>
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
                    onClick={() => navigate(`/admin/newsletter/add/${post.id}`)}
                    className="text-blue-400 hover:text-blue-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => {
                      const imgPath =
                        typeof post.image === "string" ? post.image : "";
                      fetch("/api/deletePost", {
                        method: "DELETE",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ id: post.id, image: imgPath }),
                      })
                        .then((r) => {
                          if (!r.ok) throw new Error("Failed to delete post.");
                          return r.json();
                        })
                        .then(() => {
                          setPosts((all) =>
                            all.filter((p) => p.id !== post.id)
                          );
                          alert("Deleted successfully");
                        })
                        .catch((e) => alert(e.message));
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
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className="px-4 py-2 bg-gray-800 rounded-full disabled:opacity-50"
          >
            Previous
          </button>
          <span className="px-4 py-2 bg-gray-800 rounded-full">
            {currentPage} / {totalPages}
          </span>
          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
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
