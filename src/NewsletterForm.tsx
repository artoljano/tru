import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface NewsPost {
  id: number;
  title: string;
  excerpt: string;
  content: string; // now HTML
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
  post?: NewsPost;
  onSave: (data: NewsPost) => void;
  onDelete?: (id: number) => void;
}) => {
  const [formData, setFormData] = useState<NewsPost>(
    post || {
      id: Date.now(),
      title: "",
      excerpt: "",
      content: "", // will hold HTML
      date: new Date().toISOString().split("T")[0],
      isPodcastRelated: false,
      image: "",
      readTime: "",
      tags: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleExcerptChange = (value: string) => {
    setFormData((prev) => ({ ...prev, excerpt: value }));
  };

  const handleContentChange = (value: string) => {
    setFormData((prev) => ({ ...prev, content: value }));
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      tags: e.target.value.split(",").map((tag) => tag.trim()),
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEditing = Boolean(post);
    const url = isEditing ? `/api/updatePost/${formData.id}` : "/api/savePost";
    const method = isEditing ? "PUT" : "POST";

    const body = new FormData();
    body.append("title", formData.title);
    body.append("excerpt", formData.excerpt);
    body.append("content", formData.content); // HTML content
    body.append("date", formData.date);
    body.append("isPodcastRelated", String(formData.isPodcastRelated));
    body.append("readTime", formData.readTime);
    body.append("tags", JSON.stringify(formData.tags));
    if (formData.image instanceof File) {
      body.append("image", formData.image);
    }

    try {
      const res = await fetch(url, { method, body });
      const saved = await res.json();
      onSave(saved);
    } catch (err: any) {
      console.error("Error saving post:", err);
      alert("Error: " + err.message);
    }
  };

  const handleDelete = () => {
    if (onDelete && post) {
      onDelete(post.id);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-900/50 text-white pt-24">
      <Helmet>
        <title>{post ? "Edit" : "Add New"} Newsletter Post</title>
      </Helmet>
      <div className="container mx-auto px-4 max-w-4xl pt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            {post ? "Edit" : "Add New"} Newsletter Post
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            {post
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
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                placeholder="Post title"
              />
            </div>

            {/* Excerpt as simple rich text */}
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

            {/* Content with full rich-text support */}
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
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
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
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  required={!post}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                />
              </div>
            </div>

            {/* ReadTime, Tags, Podcast Checkbox */}
            <div className="space-y-2">
              <label
                htmlFor="readTime"
                className="block text-sm font-medium text-gray-300"
              >
                Read Time (e.g., "5 min read")
              </label>
              <input
                type="text"
                id="readTime"
                name="readTime"
                value={formData.readTime}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                placeholder="Read time"
              />
            </div>
            <div className="space-y-2">
              <label
                htmlFor="tags"
                className="block text-sm font-medium text-gray-300"
              >
                Tags (comma-separated)
              </label>
              <input
                type="text"
                id="tags"
                name="tags"
                value={formData.tags.join(", ")}
                onChange={handleTagChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                placeholder="tag1, tag2, tag3"
              />
            </div>
            <div className="flex items-center gap-4">
              <input
                type="checkbox"
                id="isPodcastRelated"
                name="isPodcastRelated"
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

            {/* Submit & Delete */}
            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              {post ? "Update Post" : "Save Post"}
            </button>
            {post && onDelete && (
              <button
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
