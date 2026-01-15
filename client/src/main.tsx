import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Hide the loading spinner once React app is ready
const loadingSpinner = document.getElementById('loading-spinner');
if (loadingSpinner) {
  // Add fade-out animation
  loadingSpinner.classList.add('fade-out');
  // Remove from DOM after animation completes
  setTimeout(() => {
    loadingSpinner.remove();
  }, 500);
}

createRoot(document.getElementById("root")!).render(<App />);
