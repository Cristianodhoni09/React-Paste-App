import { Copy, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { addToPastes, updatePastes } from "../redux/pasteSlice";
import { useSearchParams } from "react-router-dom";

/**
 * Home Component
 * - Allows users to create, update, and copy pastes.
 * - Automatically populates fields if editing an existing paste.
 */
const Home = () => {
  const [value, setValue] = useState(""); // Stores paste content
  const [title, setTitle] = useState(""); // Stores paste title
  const [searchParams, setSearchParams] = useSearchParams(); // For managing query parameters in the URL
  const pasteId = searchParams.get("pasteId"); // Fetch the "pasteId" from query params
  const pastes = useSelector((state) => state.paste.pastes); // Fetch all pastes from Redux store
  const dispatch = useDispatch(); // Dispatch actions to Redux store

  /**
   * Handles creating or updating a paste
   * - Generates a new ID for new pastes.
   * - Updates Redux store and localStorage.
   */
  const createPaste = () => {
    if (!title.trim() || !value.trim()) {
      toast.error("Title and Content cannot be empty."); // Error handling for empty fields
      return;
    }

    const paste = {
      title,
      content: value,
      _id:
        pasteId ||
        Date.now().toString(36) + Math.random().toString(36).substring(2), // Unique ID for new pastes
      createdAt: new Date().toISOString(), // Creation timestamp
    };

    if (pasteId) {
      dispatch(updatePastes(paste)); // Update existing paste
    } else {
      dispatch(addToPastes(paste)); // Add new paste
    }

    // Reset fields and URL query params
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  /**
   * Resets the form fields
   * - Clears the title and content.
   * - Removes "pasteId" from URL query params.
   */
  const resetPaste = () => {
    setTitle("");
    setValue("");
    setSearchParams({});
  };

  /**
   * Prefills the form if editing an existing paste
   * - Runs whenever "pasteId" or "pastes" change.
   */
  useEffect(() => {
    if (pasteId) {
      const paste = pastes.find((p) => p._id === pasteId);
      if (paste) {
        setTitle(paste.title);
        setValue(paste.content);
      } else {
        toast.error("Invalid Paste ID."); // Handle invalid pasteId
      }
    }
  }, [pasteId, pastes]);

  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <div className="w-full flex flex-row gap-x-4 justify-between items-center">
          {/* Title Input */}
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`${
              pasteId ? "w-[80%]" : "w-[85%]"
            } text-black border border-input rounded-md p-2`}
          />

          {/* Create or Update Button */}
          <button
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
            onClick={createPaste}
          >
            {pasteId ? "Update Paste" : "Create My Paste"}
          </button>

          {/* Reset Button (Only visible when editing) */}
          {pasteId && (
            <button
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={resetPaste}
            >
              <PlusCircle size={20} />
            </button>
          )}
        </div>

        {/* Paste Content Section */}
        <div
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div className="w-full flex gap-x-[6px] items-center select-none group">
              {/* Window Control Dots */}
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(255,95,87)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(254,188,46)]" />
              <div className="w-[13px] h-[13px] rounded-full bg-[rgb(45,200,66)]" />
            </div>

            {/* Copy Button */}
            <button
              className={`flex justify-center items-center transition-all duration-300 ease-in-out group`}
              onClick={() => {
                if (value.trim()) {
                  navigator.clipboard.writeText(value);
                  toast.success("Copied to Clipboard.");
                } else {
                  toast.error("Content is empty, nothing to copy."); // Error handling for empty content
                }
              }}
            >
              <Copy className="group-hover:text-success-500" size={20} />
            </button>
          </div>

          {/* Content TextArea */}
          <textarea
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Write Your Content Here...."
            className="w-full p-3 focus-visible:ring-0"
            style={{
              caretColor: "#000",
            }}
            rows={20}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
