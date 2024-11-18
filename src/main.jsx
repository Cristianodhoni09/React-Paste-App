import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { Toaster } from "react-hot-toast";

/**
 * Entry Point of the Application
 * - Creates a React root and renders the App component into the DOM.
 * - Applies global styles from `index.css`.
*/

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <div className="min-h-screen w-screen overflow-hidden">
        <App />
        {/* Notification toaster for user feedback */}
        <Toaster position="top-right" />
      </div>
    </Provider>
  </StrictMode>
);
