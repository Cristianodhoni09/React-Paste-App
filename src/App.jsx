import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./components/Home";
import Paste from "./components/Paste";
import ViewPaste from "./components/ViewPaste";
import Navbar from "./components/Navbar";

// Define the routes and their respective components
const router = createBrowserRouter([
  {
    path: "/", // Root path for the Home component
    element: (
      <div className="w-full h-full flex flex-col">
        {/* Navbar is displayed on all pages */}
        <Navbar />
        {/* Home component is rendered for the root path */}
        <Home />
      </div>
    ),
  },
  {
    path: "/pastes", // Path for creating pastes
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <Paste />
      </div>
    ),
  },
  {
    path: "/pastes/:id", // Dynamic path for viewing specific pastes
    element: (
      <div className="w-full h-full flex flex-col">
        <Navbar />
        <ViewPaste />
      </div>
    ),
  },
]);

/**
 * App Component
 * - Entry point of the application.
 * - Uses RouterProvider to enable route management in the app.
 */
function App() {
  return <RouterProvider router={router} />;
}

export default App;
