import React, { useState } from "react";
import { Helmet } from "react-helmet-async";

interface NewsPost {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  isPodcastRelated: boolean;
  image: string | File; // Can be a string (URL) or File (when uploading)
  readTime: string;
  tags: string[];
}

const NewsletterForm = ({
  post,
  onSave,
  onDelete, // New callback for deleting a post
}: {
  post?: NewsPost;
  onSave: (data: NewsPost) => void;
  onDelete?: (id: number) => void; // Optional delete function
}) => {
  const [formData, setFormData] = useState<NewsPost>(
    post || {
      id: Date.now(),
      title: "",
      excerpt: "",
      content: "",
      date: new Date().toISOString().split("T")[0],
      isPodcastRelated: false,
      image: "",
      readTime: "",
      tags: [],
    }
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
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
        image: file, // Save the file object
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // If a file is selected, handle the upload
    if (formData.image instanceof File) {
      const formDataToUpload = new FormData();
      formDataToUpload.append("image", formData.image);

      fetch("http://localhost:5000/api/uploadImage", {
        method: "POST",
        body: formDataToUpload,
      })
        .then((response) => response.json()) // Directly parse JSON response here
        .then((jsonData) => {
          console.log("Server response:", jsonData);

          if (jsonData.imagePath) {
            // Save post with the updated image path directly in the same step
            return fetch("http://localhost:5000/api/savePost", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                ...formData,
                image: jsonData.imagePath, // Directly use the image URL here
              }),
            });
          } else {
            throw new Error("Image upload failed, no image path returned.");
          }
        })

        .then((response) => response.json())
        .then((savedPost) => {
          console.log("Post saved successfully:", savedPost);
          onSave(savedPost); // Callback to parent to update state
        })
        .catch((error) => {
          console.error("Error during process:", error);
          alert("Error: " + error.message); // Optional: show an alert to the user
        });
    } else {
      // Save post directly if no image is uploaded
      fetch("/api/savePost", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((savedPost) => {
          console.log("Post saved successfully:", savedPost);
          onSave(savedPost); // Callback to parent to update state
        })
        .catch((error) => {
          console.error("Error saving post:", error);
          alert("Error saving post: " + error.message); // Optional: show an alert to the user
        });
    }
  };

  const handleDelete = () => {
    if (onDelete && post) {
      onDelete(post.id); // Call the delete callback with the post ID
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-red-900/50 text-white pt-24">
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

            <div className="space-y-2">
              <label
                htmlFor="excerpt"
                className="block text-sm font-medium text-gray-300"
              >
                Excerpt
              </label>
              <textarea
                id="excerpt"
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                placeholder="Short summary of the post"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="content"
                className="block text-sm font-medium text-gray-300"
              >
                Content
              </label>
              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                placeholder="Full content of the post"
              />
            </div>

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
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                />
              </div>
            </div>

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

            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300"
            >
              {post ? "Update Post" : "Save Post"}
            </button>
          </form>

          {post && (
            <button
              onClick={handleDelete}
              className="w-full bg-gold-600 text-white py-4 rounded-lg mt-4 font-semibold hover:bg-gold-500 transition-colors duration-300"
            >
              Delete Post
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default NewsletterForm;
