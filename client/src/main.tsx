// Import necessary modules from React and React Router
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";

/* ************************************************************************* */

// Import the main app component
import App from "./App";

// Import des pages
import Accueil from "./pages/Accueil";
import Profil from "./pages/Profil";
import PageDeConnexion from "./pages/PageDeConnexion";
import Auth from "./pages/auth/Auth";

/* ************************************************************************* */

const router = createBrowserRouter([
  {
    element: <App />, // parent, pas de path ici
    children: [
      { path: "/", element: <Accueil /> }, // page par défaut
      { path: "accueil", element: <Accueil /> }, // accessible via /accueil
      { path: "profil", element: <Profil /> },
      { path: "connexion", element: <PageDeConnexion /> },
      { path: "auth", element: <Auth /> },
    ],
  },
]);

// Find the root element in the HTML document
const rootElement = document.getElementById("root");
if (rootElement == null) {
  throw new Error(`Your HTML Document should contain a <div id="root"></div>`);
}

// Render the app inside the root element
createRoot(rootElement).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
