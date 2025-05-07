import React, { useState } from "react";

import { Send, CheckCircle, XCircle } from "lucide-react";

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
      : "https://artoljano.github.io/tru/api/send-suggestion-email";

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
    <div className="min-h-screen bg-gradient-to-b from-blue-900/40 to-gold-900/50 text-white pt-24">
      <div className="container mx-auto px-4 max-w-4xl pt-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Suggest a Guest
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto">
            Know someone with an extraordinary story? Help us discover amazing
            guests for our podcast.
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
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
                  className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label
                htmlFor="guestName"
                className="block text-sm font-medium text-gray-300"
              >
                Suggested Guest Name
              </label>
              <input
                type="text"
                id="guestName"
                name="guestName"
                value={formData.guestName}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                placeholder="Guest's full name"
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="guestBackground"
                className="block text-sm font-medium text-gray-300"
              >
                Guest's Background
              </label>
              <textarea
                id="guestBackground"
                name="guestBackground"
                value={formData.guestBackground}
                onChange={handleInputChange}
                required
                rows={3}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                placeholder="Tell us about their work, achievements, or expertise..."
              />
            </div>

            <div className="space-y-2">
              <label
                htmlFor="guestReason"
                className="block text-sm font-medium text-gray-300"
              >
                Why would they be a great guest?
              </label>
              <textarea
                id="guestReason"
                name="guestReason"
                value={formData.guestReason}
                onChange={handleInputChange}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:border-white focus:ring-2 focus:ring-white focus:outline-none text-white"
                placeholder="What unique perspectives or stories could they share with our audience?"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-white text-black py-4 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 flex items-center justify-center space-x-2"
            >
              {submissionStatus === "sending" && <span>Sending...</span>}
              {submissionStatus === "success" && <CheckCircle size={24} />}
              {submissionStatus === "error" && <XCircle size={24} />}
              <span>Submit Suggestion</span>

              {/* Default Send Icon */}
              <span
                className={submissionStatus === "sending" ? "animate-spin" : ""}
              >
                <Send size={24} />
              </span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SuggestGuest;
