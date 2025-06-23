import React, { useState, useEffect } from "react";
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

const NewsletterForm = ({
  post,
  onSave,
  onDelete,
}: {
  post?: Partial<NewsPost>; // incoming post may be missing some fields
  onSave: (data: NewsPost) => void;
  onDelete?: (id: number) => void;
}) => {
  // Normalize tags (if they came in as JSON-string or already an array)
  const normalizeTags = (tags: any): string[] => {
    if (Array.isArray(tags)) return tags;
    if (typeof tags === "string") {
      try {
        return JSON.parse(tags);
      } catch {
        return tags.split(",").map((t) => t.trim());
      }
    }
    return [];
  };

  // Build our initial formData
  const initial: NewsPost = {
    id: post?.id ?? Date.now(),
    title: post?.title ?? "",
    excerpt: post?.excerpt ?? "",
    content: post?.content ?? "",
    date: post?.date ?? new Date().toISOString().slice(0, 10),
    isPodcastRelated: post?.isPodcastRelated ?? false,
    image: post?.image ?? "",
    readTime: post?.readTime ?? "",
    tags: normalizeTags(post?.tags),
  };

  const [formData, setFormData] = useState<NewsPost>(initial);

  // If the `post` prop ever changes (e.g. after async fetch), re-sync
  useEffect(() => {
    if (post) {
      setFormData({
        ...initial,
        tags: normalizeTags(post.tags),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [post]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const target = e.currentTarget;
    const { name, type, value } = target;
    if (type === "checkbox") {
      setFormData((p) => ({
        ...p,
        [name]: (target as HTMLInputElement).checked,
      }));
    } else {
      setFormData((p) => ({
        ...p,
        [name]: value,
      }));
    }
  };

  const handleExcerptChange = (value: string) =>
    setFormData((p) => ({ ...p, excerpt: value }));
  const handleContentChange = (value: string) =>
    setFormData((p) => ({ ...p, content: value }));

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((p) => ({
      ...p,
      tags: e.target.value.split(",").map((t) => t.trim()),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((p) => ({ ...p, image: file }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(post?.id);
    const url = isEditing
      ? `/api/updatePost/${encodeURIComponent(formData.id)}`
      : "/api/savePost";
    const method = isEditing ? "PUT" : "POST";

    const body = new FormData();
    body.append("title", formData.title);
    body.append("excerpt", formData.excerpt);
    body.append("content", formData.content);
    body.append("date", formData.date);
    body.append("isPodcastRelated", String(formData.isPodcastRelated));
    body.append("readTime", formData.readTime);
    body.append("tags", JSON.stringify(formData.tags));
    if (formData.image instanceof File) {
      body.append("image", formData.image);
    }

    try {
      const res = await fetch(url, { method, body });
      if (!res.ok) throw new Error(`${method} failed (${res.status})`);
      const json = await res.json();
      // our server returns { message, post: { … } }
      const saved = isEditing ? json.post : json.postData || json.post;
      onSave(saved);
    } catch (err: any) {
      console.error("Error saving post:", err);
      alert("Error saving post: " + err.message);
    }
  };

  const handleDelete = () => {
    if (onDelete && post?.id) onDelete(post.id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-900/50 text-white pt-24">
      <Helmet>
        <title>{post?.id ? "Edit" : "Add New"} Newsletter Post</title>
      </Helmet>
      <div className="container mx-auto px-4 max-w-4xl pt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {post?.id ? "Edit" : "Add New"} Newsletter Post
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            {post?.id
              ? "Edit the details of the newsletter post below."
              : "Create a new post for the newsletter by filling out the form below."}
          </p>
        </div>

        <div className="bg-black/50 rounded-xl p-8 backdrop-blur-sm shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Title */}
            <div className="space-y-2">
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-300"
              >
                Title
              </label>
              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
              />
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-300"
              >
                Excerpt
              </label>
              <ReactQuill
                theme="snow"
                value={formData.excerpt}
                onChange={handleExcerptChange}
                modules={{
                  toolbar: [["bold", "italic"], ["link"], [{ list: "bullet" }]],
                }}
                className="bg-gray-800 text-white"
              />
            </div>

            {/* Content */}
            <div className="space-y-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300"
              >
                Content
              </label>
              <ReactQuill
                theme="snow"
                value={formData.content}
                onChange={handleContentChange}
                modules={{
                  toolbar: [
                    [{ header: [1, 2, 3, false] }],
                    ["bold", "italic", "underline", "strike"],
                    [{ list: "ordered" }, { list: "bullet" }],
                    ["blockquote", "code-block"],
                    ["link", "image"],
                    ["clean"],
                  ],
                }}
                formats={[
                  "header",
                  "bold",
                  "italic",
                  "underline",
                  "strike",
                  "list",
                  "bullet",
                  "blockquote",
                  "code-block",
                  "link",
                  "image",
                ]}
                className="bg-gray-800 text-white"
              />
            </div>

            {/* Date & Image */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label
                  htmlFor="date"
                  className="block text-sm font-medium text-gray-300"
                >
                  Date
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="image"
                  className="block text-sm font-medium text-gray-300"
                >
                  Image
                </label>
                <input
                  id="image"
                  name="image"
                  type="file"
                  onChange={handleFileChange}
                  required={!post?.id}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
                />
              </div>
            </div>

            {/* Read Time */}
            <div className="space-y-2">
              <label
                htmlFor="readTime"
                className="block text-sm font-medium text-gray-300"
              >
                Read Time
              </label>
              <input
                id="readTime"
                name="readTime"
                type="text"
                value={formData.readTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
              />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-300"
              >
                Tags (comma-separated)
              </label>
              <input
                id="tags"
                name="tags"
                type="text"
                value={formData.tags.join(", ")}
                onChange={handleTagChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
              />
            </div>

            {/* Podcast Related */}
            <div className="flex items-center gap-4">
              <input
                id="isPodcastRelated"
                name="isPodcastRelated"
                type="checkbox"
                checked={formData.isPodcastRelated}
                onChange={handleChange}
                className="w-5 h-5 text-red-600 border-gray-300 rounded"
              />
              <label
                htmlFor="isPodcastRelated"
                className="text-sm font-medium text-gray-300"
              >
                Podcast Related
              </label>
            </div>

            {/* Buttons */}
            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              {post?.id ? "Update Post" : "Save Post"}
            </button>
            {post?.id && onDelete && (
              <button
                type="button"
                onClick={handleDelete}
                className="w-full bg-red-600 text-white py-4 rounded-lg mt-4 font-semibold hover:bg-red-500 transition-colors duration-300"
              >
                Delete Post
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
