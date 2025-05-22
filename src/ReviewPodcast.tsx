import React, { useState, useEffect } from "react";
import { Star, Send, CheckCircle, XCircle } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

function decodeHtml(html: string) {
  const txt = document.createElement("textarea");
  txt.innerHTML = html;
  return txt.value;
}

// Episodes come from /api/episodes
const episodesApiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/episodes"
    : "/api/episodes";

// Reviews still post to /api/send-review-email
const reviewApiUrl =
  window.location.hostname === "localhost"
    ? "http://localhost:5000/api/send-review-email"
    : "/api/send-review-email";

const fetchEpisodesFromCache = (): any[] | null => {
  const stored = localStorage.getItem("episodes");
  const when = localStorage.getItem("episodesTime");
  const expiry = 24 * 60 * 60 * 1000;
  if (stored && when && Date.now() - +when < expiry) {
    return JSON.parse(stored);
  }
  return null;
};

const fetchEpisodesFromApi = async (
  setEpisodes: React.Dispatch<React.SetStateAction<any[]>>
) => {
  try {
    const res = await fetch(episodesApiUrl);
    const data = await res.json();
    setEpisodes(data);
    localStorage.setItem("episodes", JSON.stringify(data));
    localStorage.setItem("episodesTime", Date.now().toString());
  } catch (e) {
    console.error("Error fetching episodes:", e);
  }
};

const ReviewPodcast = () => {
  const [searchParams] = useSearchParams();
  const preselectedEpisode = searchParams.get("episode");

  const [episodes, setEpisodes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    episodeId: "", // always start empty
    rating: 5,
    review: "",
  });

  const [status, setStatus] = useState<
    "idle" | "sending" | "success" | "error"
  >("idle");

  useEffect(() => {
    const cached = fetchEpisodesFromCache();
    if (cached) {
      setEpisodes(cached);
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
      const response = await fetch(reviewApiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
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
    <>
      <Helmet>
        <title>Lini një vlerësim – Tru Podcast Media</title>
        <meta
          name="description"
          content="Ndani mendimet tuaja dhe ndihmoni komunitetin tonë të rritet duke lënë një vlerësim për episodet tona."
        />
        <link rel="canonical" href="https://yourdomain.com/review" />
        <meta
          property="og:title"
          content="Lini një vlerësim – Tru Podcast Media"
        />
        <meta
          property="og:description"
          content="Ndani mendimet tuaja dhe ndihmoni komunitetin tonë të rritet duke lënë një vlerësim për episodet tona."
        />
        <meta property="og:url" content="https://yourdomain.com/review" />
        <meta
          property="og:image"
          content="https://yourdomain.com/og-review.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Lini një vlerësim – Tru Podcast Media"
        />
        <meta
          name="twitter:description"
          content="Ndani mendimet tuaja dhe ndihmoni komunitetin tonë të rritet duke lënë një vlerësim për episodet tona."
        />
        <meta
          name="twitter:image"
          content="https://yourdomain.com/og-review.png"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gold-900/50 to-blue-900/40 text-white pt-24">
        <div className="container mx-auto px-4 max-w-4xl pt-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Ndaj Mendimet e Tua
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Vlerësimet tuaja na ndihmojnë të përmirësohemi dhe të krijojmë
              përmbajtje më të mirë për ju. Ju lutemi ndani mendimet tuaja rreth
              episodeve dhe na ndihmoni të rritemi!
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
                    Emri Juaj
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500 text-white"
                    placeholder="Emri Mbiemri"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-300"
                  >
                    Email-i Juaj
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500 text-white"
                    placeholder="shembull@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="episodeId"
                  className="block text-sm font-medium text-gray-300"
                >
                  Zgjidh Episodin
                </label>
                <select
                  id="episodeId"
                  name="episodeId"
                  value={formData.episodeId}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500 text-white"
                >
                  <option value="">Zgjidh një episod...</option>
                  {episodes.map((episode) => (
                    <option key={episode.id} value={episode.id}>
                      {decodeHtml(episode.title)} – me{" "}
                      {decodeHtml(episode.guest)}
                    </option>
                  ))}
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Vlerësimi
                </label>
                <div className="flex space-x-4">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() =>
                        setFormData((prev) => ({ ...prev, rating: star }))
                      }
                      aria-label={`Vlerëso ${star} yje`}
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
                  Komenti Juaj
                </label>
                <textarea
                  id="review"
                  name="review"
                  value={formData.review}
                  onChange={handleInputChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-gold-500 focus:ring-2 focus:ring-gold-500 text-white"
                  placeholder="Ndani mendimet tuaja rreth episodit..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-gold-600 to-gold-800 text-white py-4 rounded-lg font-semibold hover:from-gol d-700 hover:to-gold-900 transition-all duration-300 flex items-center justify-center space-x-2"
              >
                {status === "sending" && <span>Duke dërguar...</span>}
                {status === "success" && <CheckCircle size={24} />}
                {status === "error" && <XCircle size={24} />}
                <span>Dërgo Vlerësimin</span>
                <span className={status === "sending" ? "animate-spin" : ""}>
                  <Star size={24} />
                </span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default ReviewPodcast;
