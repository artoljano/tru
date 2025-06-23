import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface NewsPost {
  id: number;
  title: string;
  excerpt: string; // HTML
  content: string; // HTML
  date: string;
  isPodcastRelated: boolean;
  image: string | File;
  readTime: string;
  tags: string[];
}

const NewsletterForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();
  const isEditing = Boolean(id);
  const [formData, setFormData] = useState<NewsPost>({
    id: id ? parseInt(id) : Date.now(),
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().slice(0, 10),
    isPodcastRelated: false,
    image: "",
    readTime: "",
    tags: [],
  });

  // If we're editing, load existing post
  useEffect(() => {
    if (isEditing) {
      fetch("/api/getPosts")
        .then((res) => res.json())
        .then((data: NewsPost[]) => {
          const found = data.find((p) => p.id.toString() === id);
          if (found) {
            setFormData({
              ...found,
              // leave image as URL string; uploading new File is optional
              image: found.image,
            });
          } else {
            alert("Post not found");
            navigate("/admin/newsletter/manage", { replace: true });
          }
        })
        .catch((err) => {
          console.error("Failed to load post:", err);
          navigate("/admin/newsletter/manage", { replace: true });
        });
    }
  }, [id, isEditing, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const t = e.currentTarget;
    const { name, type, value } = t;
    if (type === "checkbox") {
      setFormData((p) => ({ ...p, [name]: (t as HTMLInputElement).checked }));
    } else {
      setFormData((p) => ({ ...p, [name]: value }));
    }
  };

  const handleExcerptChange = (value: string) =>
    setFormData((p) => ({ ...p, excerpt: value }));
  const handleContentChange = (value: string) =>
    setFormData((p) => ({ ...p, content: value }));

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((p) => ({
      ...p,
      tags: e.target.value.split(",").map((t) => t.trim()),
    }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) setFormData((p) => ({ ...p, image: f }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const url = isEditing
      ? `/api/updatePost/${encodeURIComponent(formData.id)}`
      : "/api/savePost";
    const method = isEditing ? "PUT" : "POST";
    const body = new FormData();

    Object.entries(formData).forEach(([k, v]) => {
      if (k === "tags") {
        body.append(k, JSON.stringify(v));
      } else if (k === "image" && v instanceof File) {
        body.append("image", v);
      } else {
        body.append(k, String(v));
      }
    });

    try {
      const res = await fetch(url, { method, body });
      if (!res.ok) throw new Error(`${method} failed (${res.status})`);
      const json = await res.json();
      // back to manage
      navigate("/admin/newsletter/manage");
    } catch (err: any) {
      console.error("Error saving post:", err);
      alert("Error saving post: " + err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-900/50 text-white pt-24">
      <Helmet>
        <title>{isEditing ? "Edit" : "Add New"} Newsletter Post</title>
      </Helmet>
      <div className="container mx-auto px-4 max-w-4xl pt-10">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {isEditing ? "Edit" : "Add New"} Newsletter Post
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-black/50 rounded-xl p-8 backdrop-blur-sm shadow-xl space-y-6"
        >
          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              name="title"
              type="text"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 bg-gray-800 rounded text-white"
            />
          </div>

          {/* Excerpt */}
          <div>
            <label className="block text-gray-300 mb-1">Excerpt</label>
            <ReactQuill
              theme="snow"
              value={formData.excerpt}
              onChange={handleExcerptChange}
              className="bg-gray-800 text-white"
            />
          </div>

          {/* Content */}
          <div>
            <label className="block text-gray-300 mb-1">Content</label>
            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              className="bg-gray-800 text-white"
            />
          </div>

          {/* Date & Read Time */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-300 mb-1">Date</label>
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              />
            </div>
            <div>
              <label className="block text-gray-300 mb-1">Read Time</label>
              <input
                name="readTime"
                type="text"
                value={formData.readTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              />
            </div>
          </div>

          {/* Tags & Podcast checkbox */}
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <label className="block text-gray-300 mb-1">
                Tags (comma-separated)
              </label>
              <input
                name="tags"
                type="text"
                value={formData.tags.join(", ")}
                onChange={handleTagChange}
                className="w-full px-4 py-2 bg-gray-800 rounded text-white"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                name="isPodcastRelated"
                type="checkbox"
                checked={formData.isPodcastRelated}
                onChange={handleChange}
                className="h-5 w-5 text-red-600"
              />
              <label className="text-gray-300">Podcast Related</label>
            </div>
          </div>

          {/* Image */}
          <div>
            <label className="block text-gray-300 mb-1">Image</label>
            <input
              name="image"
              type="file"
              onChange={handleFileChange}
              className="w-full text-white"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full py-3 bg-white text-black font-semibold rounded hover:bg-gray-200"
          >
            {isEditing ? "Update Post" : "Save Post"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
