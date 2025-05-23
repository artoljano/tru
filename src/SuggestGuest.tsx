import React, { useState } from "react";

import { Send, CheckCircle, XCircle } from "lucide-react";
import { Helmet } from "react-helmet-async";

function SuggestGuest() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    guestName: "",
    guestBackground: "",
    guestReason: "",
  });
  const [submissionStatus, setSubmissionStatus] = useState("idle"); // 'idle', 'sending', 'success', 'error'

  const apiUrl =
    window.location.hostname === "localhost"
      ? "http://localhost:5000/api/send-suggestion-email"
      : "/api/send-suggestion-email";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const suggestionData = {
      name: formData.name,
      email: formData.email,
      guestName: formData.guestName,
      guestBackground: formData.guestBackground,
      guestReason: formData.guestReason,
    };

    // Start the "sending" state
    setSubmissionStatus("sending");

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(suggestionData),
      });

      if (response.ok) {
        // Successful submission
        setSubmissionStatus("success");
        //alert("Suggestion submitted successfully!");
        setFormData({
          name: "",
          email: "",
          guestName: "",
          guestBackground: "",
          guestReason: "",
        });
      } else {
        const errorMessage = await response.text();
        setSubmissionStatus("error");
        //alert(`Failed to submit suggestion: ${errorMessage}`);
      }
    } catch (error) {
      console.error("Error submitting suggestion:", error);
      setSubmissionStatus("error");
      //alert("Error submitting suggestion");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        <title>Sygjero një të ftuar – Tru Podcast Media</title>
        <meta
          name="description"
          content="Keni një emër me histori të jashtëzakonshme? Na ndihmoni të zgjerojmë rrethin e të ftuarve."
        />
        <link rel="canonical" href="https://trupodcast.media/suggest" />
        <meta
          property="og:title"
          content="Sygjero një të ftuar – Tru Podcast Media"
        />
        <meta
          property="og:description"
          content="Keni një emër me histori të jashtëzakonshme? Na ndihmoni të zgjerojmë rrethin e të ftuarve."
        />
        <meta property="og:url" content="https://trupodcast.media/suggest" />
        <meta
          property="og:image"
          content="https://trupodcast.media/og-suggest.png"
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Sygjero një të ftuar – Tru Podcast Media"
        />
        <meta
          name="twitter:description"
          content="Keni një emër me histori të jashtëzakonshme? Na ndihmoni të zgjerojmë rrethin e të ftuarve."
        />
        <meta
          name="twitter:image"
          content="https://trupodcast.media/og-suggest.png"
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-b from-gold-900/50 to-blue-900/40 text-white pt-24">
        <div className="container mx-auto px-4 max-w-4xl pt-10">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Rekomando Një Të Ftuar
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
              Njeh dikë me një histori që frymëzon? Na ndihmoni të zbulojmë zëra
              të jashtëzakonshëm për podcast-in tonë.
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
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
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
                    className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
                    placeholder="shembull@domain.com"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="guestName"
                  className="block text-sm font-medium text-gray-300"
                >
                  Emri i të Ftuarit
                </label>
                <input
                  type="text"
                  id="guestName"
                  name="guestName"
                  value={formData.guestName}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
                  placeholder="Emri Mbiemri i të Ftuarit"
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="guestBackground"
                  className="block text-sm font-medium text-gray-300"
                >
                  Biografia e Shkurtër
                </label>
                <textarea
                  id="guestBackground"
                  name="guestBackground"
                  value={formData.guestBackground}
                  onChange={handleInputChange}
                  required
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
                  placeholder="Na tregoni për punën ose arritjet e tyre..."
                />
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="guestReason"
                  className="block text-sm font-medium text-gray-300"
                >
                  Pse do të ishin të shkëlqyer?
                </label>
                <textarea
                  id="guestReason"
                  name="guestReason"
                  value={formData.guestReason}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white text-white"
                  placeholder="Çfarë perspektivash të veçanta sjellin për audiencën tonë?"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-2"
              >
                {submissionStatus === "sending" && <span>Duke dërguar...</span>}
                {submissionStatus === "success" && <CheckCircle size={24} />}
                {submissionStatus === "error" && <XCircle size={24} />}
                <span>Dërgo Rekomandimin</span>
                <Send
                  className={
                    submissionStatus === "sending"
                      ? "animate-spin ml-2"
                      : "ml-2"
                  }
                  size={24}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default SuggestGuest;
