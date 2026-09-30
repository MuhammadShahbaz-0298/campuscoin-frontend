import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
// SpecularButton.css must be the first stylesheet so every original button
// rule in styles.css / auth-split.css comes after it in the cascade and the
// existing button design keeps winning over the wrapper's base styles.
import "./components/SpecularButton.css";
import "./styles.css";
import "./animation/premium-motion.css";
import "./auth-split.css";
import App from "./App.jsx";
import { AlertProvider } from "./context/AlertContext.jsx";
import { initSpecularGate } from "./components/specularGate.js";

initSpecularGate();

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AlertProvider>
      <App />
    </AlertProvider>
  </BrowserRouter>,
);
