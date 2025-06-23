// src/NewsletterFormPage.tsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NewsletterForm, { NewsPost } from "./NewsletterForm";

const NewsletterFormPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<NewsPost | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(!!id);

  useEffect(() => {
    if (id) {
      // fetch all posts then find by id
      fetch("/api/getPosts")
        .then((res) => res.json())
        .then((all: NewsPost[]) => {
          const found = all.find((p) => String(p.id) === id);
          if (found) {
            setPost(found);
          } else {
            alert("Post not found");
            navigate("/admin/newsletter/manage");
          }
        })
        .catch((err) => {
          console.error("Failed to load post:", err);
          navigate("/admin/newsletter/manage");
        })
        .finally(() => setLoading(false));
    }
  }, [id, navigate]);

  const handleSave = (saved: NewsPost) => {
    // after saving, go back to manage
    navigate("/admin/newsletter/manage");
  };

  const handleDelete = (deletedId: number) => {
    // after delete, go back
    navigate("/admin/newsletter/manage");
  };

  if (loading) return <div className="text-white p-8">Loading…</div>;

  return (
    <NewsletterForm
      post={post}
      onSave={handleSave}
      onDelete={post ? handleDelete : undefined}
    />
  );
};

export default NewsletterFormPage;
