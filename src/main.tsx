import { StrictMode, useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.tsx";
import SuggestGuest from "./SuggestGuest.tsx";
import ReviewPodcast from "./ReviewPodcast.tsx";
import Episodes from "./Episodes.tsx";
import About from "./About.tsx";
import Newsletter from "./Newsletter.tsx";
import Layout from "./Layout.tsx";
import "./index.css";
import NewsletterForm from "./NewsletterForm.tsx";
import NewsletterAdmin from "./NewsletterAdmin.tsx";

// Create your router like before
const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <App /> },
        { path: "/suggest", element: <SuggestGuest /> },
        { path: "/review", element: <ReviewPodcast /> },
        { path: "/episodes", element: <Episodes /> },
        { path: "/about", element: <About /> },
        { path: "/newsletter", element: <Newsletter /> },
        { path: "/admin/newsletter/add", element: <NewsletterForm /> },
        { path: "/admin/newsletter/manage", element: <NewsletterAdmin /> },
      ],
    },
  ],
  {
    basename: "/tru",
  }
);

// KillSwitchWrapper handles the fetch and conditionally renders the app
function KillSwitchWrapper() {
  const [killed, setKilled] = useState(false);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkKillSwitch = async () => {
      try {
        const res = await fetch(
          "https://artoljano.github.io/rks/kill-switch.json?ts=" + Date.now()
        );
        const config = await res.json();
        if (config.kill) {
          setKilled(true);
          setMessage(config.message || "The site is unavailable.");
        }
      } catch (err) {
        console.error("Kill switch check failed:", err);
      } finally {
        setLoading(false);
      }
    };

    checkKillSwitch();
  }, []);

  if (loading)
    return (
      <div style={{ textAlign: "center", marginTop: "4rem" }}>Loading...</div>
    );
  if (killed)
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "4rem",
          padding: "2rem",
          fontSize: "1.2rem",
        }}
      >
        {message}
      </div>
    );

  return <RouterProvider router={router} />;
}

// Render app
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <KillSwitchWrapper />
  </StrictMode>
);
