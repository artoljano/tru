import { StrictMode } from "react";
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

const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <App />,
        },
        {
          path: "/suggest",
          element: <SuggestGuest />,
        },
        {
          path: "/review",
          element: <ReviewPodcast />,
        },
        {
          path: "/episodes",
          element: <Episodes />,
        },
        {
          path: "/about",
          element: <About />,
        },
        {
          path: "/newsletter",
          element: <Newsletter />,
        },
      ],
    },
  ],
  {
    basename: "/tru", // Replace with your actual GitHub repository name
  }
);

// Render the app with the router
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
