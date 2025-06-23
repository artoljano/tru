import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export interface NewsPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  isPodcastRelated: boolean;
  image: string | File;
  readTime: string;
  tags: string[];
}

const NewsletterForm: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<NewsPost>({
    id: Date.now(),
    title: "",
    excerpt: "",
    content: "",
    date: new Date().toISOString().slice(0, 10),
    isPodcastRelated: false,
    image: "",
    readTime: "",
    tags: [],
  });

  // if editing, load existing post
  useEffect(() => {
    if (id) {
      fetch("/api/getPosts")
        .then((r) => r.json())
        .then((all: NewsPost[]) => {
          const found = all.find((p) => p.id === Number(id));
          if (!found) return alert("Post not found");
          setFormData({
            ...found,
            tags: Array.isArray(found.tags)
              ? found.tags
              : typeof found.tags === "string"
              ? JSON.parse(found.tags)
              : [],
          });
        })
        .catch((e) => alert(e.message));
    }
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const tgt = e.currentTarget;
    const { name, type, value } = tgt;
    setFormData((p) => ({
      ...p,
      [name]: type === "checkbox" ? (tgt as HTMLInputElement).checked : value,
    }));
  };

  const handleExcerptChange = (v: string) =>
    setFormData((p) => ({ ...p, excerpt: v }));
  const handleContentChange = (v: string) =>
    setFormData((p) => ({ ...p, content: v }));
  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData((p) => ({
      ...p,
      tags: e.target.value.split(",").map((t) => t.trim()),
    }));
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) setFormData((p) => ({ ...p, image: file }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const isEdit = Boolean(id);
    const url = isEdit
      ? `/api/updatePost/${encodeURIComponent(formData.id)}`
      : "/api/savePost";
    const method = isEdit ? "PUT" : "POST";

    const body = new FormData();
    body.append("title", formData.title);
    body.append("excerpt", formData.excerpt);
    body.append("content", formData.content);
    body.append("date", formData.date);
    body.append("isPodcastRelated", String(formData.isPodcastRelated));
    body.append("readTime", formData.readTime);
    body.append("tags", JSON.stringify(formData.tags));
    if (formData.image instanceof File) body.append("image", formData.image);

    try {
      const res = await fetch(url, { method, body });
      if (!res.ok) throw new Error(`${method} failed ${res.status}`);
      const data = await res.json();
      // data.post holds the saved post
      navigate("/admin/newsletter/manage");
    } catch (err: any) {
      alert("Error: " + err.message);
    }
  };

  const handleDelete = () => {
    if (!id) return;
    if (!window.confirm("Delete this post?")) return;
    const imgPath = typeof formData.image === "string" ? formData.image : "";
    fetch("/api/deletePost", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: Number(id), image: imgPath }),
    })
      .then((r) => {
        if (!r.ok) throw new Error("Delete failed");
        navigate("/admin/newsletter/manage");
      })
      .catch((e) => alert(e.message));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-900/50 text-white pt-24">
      <Helmet>
        <title>{id ? "Edit" : "Add New"} Newsletter Post</title>
      </Helmet>
      <div className="container mx-auto px-4 max-w-4xl pt-10">
        <h1 className="text-4xl font-bold mb-6 text-center">
          {id ? "Edit" : "Add New"} Newsletter Post
        </h1>
        <form
          onSubmit={handleSubmit}
          className="bg-black/50 p-8 rounded-xl space-y-6 backdrop-blur-sm"
        >
          {/* Title */}
          <div>
            <label className="block text-gray-300 mb-1">Title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
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
              modules={{
                toolbar: [["bold", "italic"], ["link"], [{ list: "bullet" }]],
              }}
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
            />
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Date */}
            <div>
              <label className="block text-gray-300 mb-1">Date</label>
              <input
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
              />
            </div>

            {/* Image */}
            <div>
              <label className="block text-gray-300 mb-1">Image</label>
              <input
                name="image"
                type="file"
                onChange={handleFileChange}
                className="w-full text-gray-200"
              />
            </div>
          </div>

          {/* Read Time */}
          <div>
            <label className="block text-gray-300 mb-1">Read Time</label>
            <input
              name="readTime"
              value={formData.readTime}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-gray-300 mb-1">
              Tags (comma-separated)
            </label>
            <input
              name="tags"
              value={formData.tags.join(", ")}
              onChange={handleTagChange}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white"
            />
          </div>

          {/* Podcast */}
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

          {/* Actions */}
          <button className="w-full bg-white text-black py-3 rounded-lg">
            {id ? "Update Post" : "Save Post"}
          </button>
          {id && (
            <button
              type="button"
              onClick={handleDelete}
              className="w-full bg-red-600 py-3 rounded-lg"
            >
              Delete Post
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default NewsletterForm;
