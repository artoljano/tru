import React, { useState, useEffect } from "react";
import { Star, Send, CheckCircle, XCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

const apiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/send-review-email"
    : "https://artoljano.github.io/tru/api/send-review-email";

const fetchEpisodesFromCache = (): any[] | null => {
  const storedEpisodes = localStorage.getItem("episodes");
  const storedEpisodesTime = localStorage.getItem("episodesTime");
  const cacheExpiry = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

  if (
    storedEpisodes &&
    storedEpisodesTime &&
    Date.now() - parseInt(storedEpisodesTime) < cacheExpiry
  ) {
    return JSON.parse(storedEpisodes);
  }
  return null;
};

const fetchEpisodesFromApi = async (
  setEpisodes: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    setEpisodes(data);
    localStorage.setItem("episodes", JSON.stringify(data)); // Cache the episodes
    localStorage.setItem("episodesTime", Date.now().toString()); // Cache the time of fetching
  } catch (error) {
    console.error("Error fetching episodes:", error);
  }
};

const ReviewPodcast = () => {
  const [searchParams] = useSearchParams();
  const preselectedEpisode = searchParams.get("episode");

  const [episodes, setEpisodes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    episodeId: preselectedEpisode || "",
    rating: 5,
    review: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    const cachedEpisodes = fetchEpisodesFromCache();

    if (cachedEpisodes) {
      setEpisodes(cachedEpisodes);
    } else {
      fetchEpisodesFromApi(setEpisodes);
    }
  }, []);

  useEffect(() => {
    if (preselectedEpisode && !formData.episodeId) {
      setFormData((prev) => ({
        ...prev,
        episodeId: preselectedEpisode,
      }));
    }
  }, [preselectedEpisode, formData.episodeId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setStatus("sending"); // Set sending status

    const selectedEpisode = episodes.find(
      (episode) => episode.id === formData.episodeId
    );

    const reviewData = {
      name: formData.name,
      email: formData.email,
      episodeId: selectedEpisode ? decodeHtml(selectedEpisode.title) : "",
      rating: formData.rating,
      review: formData.review,
    };

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(reviewData),
      });

      if (response.ok) {
        setStatus("success"); // Set success status
        setFormData({
          name: "",
          email: "",
          episodeId: "",
          rating: 5,
          review: "",
        });
      } else {
        setStatus("error"); // Set error status
      }
    } catch (error) {
      setStatus("error"); // Set error status
      console.error("Error submitting review:", error);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gold-900/50 to-blue-900/20 text-white pt-24 ">
      <div className="container mx-auto px-4 max-w-4xl pt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Share Your Thoughts
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Your feedback helps us improve and create better content for our
            community.
          </p>
        </div>

        <div className="bg-black/50 rounded-xl p-8 backdrop-blur-sm shadow-xl">
          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500 focus:outline-none text-white"
                  placeholder="John Doe"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300"
                >
                  Your Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500 focus:outline-none text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="episodeId"
                className="block text-sm font-medium text-gray-300"
              >
                Select Episode
              </label>
              <select
                id="episodeId"
                name="episodeId"
                value={formData.episodeId}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500 focus:outline-none text-white"
              >
                <option value="">Select an episode...</option>
                {episodes.map((episode) => (
                  <option key={episode.id} value={episode.id}>
                    {decodeHtml(episode.title)} - with{" "}
                    {decodeHtml(episode.guest)}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Rating
              </label>
              <div className="flex space-x-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, rating: star }))
                    }
                    aria-label={`Rate ${star} stars`}
                    className="focus:outline-none"
                  >
                    <Star
                      size={32}
                      className={`${
                        star <= formData.rating
                          ? "text-gold-500 fill-gold-500"
                          : "text-gray-600"
                      } transition-colors duration-200 hover:text-gold-500`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="review"
                className="block text-sm font-medium text-gray-300"
              >
                Your Review
              </label>
              <textarea
                id="review"
                name="review"
                value={formData.review}
                onChange={handleInputChange}
                required
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500 focus:outline-none text-white"
                placeholder="Share your thoughts about the episode..."
              />
            </div>

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-gold-600 to-gold-800 text-white py-4 rounded-lg font-semibold hover:from-gold-700 hover:to-gold-900 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              {status === "sending" && <span>Sending...</span>}
              {status === "success" && <CheckCircle size={24} />}
              {status === "error" && <XCircle size={24} />}
              <span>Submit Review</span>
              <span
                className={`transition-transform duration-300 ${
                  status === "sending" ? "animate-spin" : ""
                }`}
              >
                <Star size={24} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPodcast;
