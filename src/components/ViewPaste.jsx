import { Copy } from "lucide-react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

/*
  This file is same as home.js but with some limited actions/functionality
*/

const ViewPaste = () => {
  const { id } = useParams(); //Extract the id from the URL

  console.log(id);

  const allPastes = useSelector((state) => state.paste.pastes); // Get all pastes from the store

  // Filter pastes based on search term (by title or content)
  const paste = allPastes.filter((paste) => paste._id === id)[0];

  // console.log("Paste->", paste);
  return (
    <div className="w-full h-full py-10 max-w-[1200px] mx-auto px-5 lg:px-0">
      <div className="flex flex-col gap-y-5 items-start">
        <input //It contains title
          type="text"
          placeholder="Title"
          value={paste.title}
          disabled //so that user can't edit the title
          className="w-full text-black border border-input rounded-md p-2"
        />
        
        <div //This div contains dots, copy btn and then the paste content
          className={`w-full flex flex-col items-start relative rounded bg-opacity-10 border border-[rgba(128,121,121,0.3)] backdrop-blur-2xl`}
        >
          <div //This div contains dots and copy btn
            className={`w-full rounded-t flex items-center justify-between gap-x-4 px-4 py-2 border-b border-[rgba(128,121,121,0.3)]`}
          >
            <div //This div contains dots
              className="w-full flex gap-x-[6px] items-center select-none group"
            >
              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(255,95,87)]" />

              <div className={`w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(254,188,46)]`}/>

              <div className="w-[13px] h-[13px] rounded-full flex items-center justify-center p-[1px] overflow-hidden bg-[rgb(45,200,66)]" />
            </div>

            <button //copy btn
              className={`flex justify-center items-center  transition-all duration-300 ease-in-out group`}
              onClick={() => {
                navigator.clipboard.writeText(paste.content);
                toast.success("Copied to Clipboard");
              }}
            >
              <Copy className="group-hover:text-sucess-500" size={20} />
            </button>
          </div>

          <textarea //Content area
            value={paste.content}
            disabled // so that user can't edit the content
            placeholder="Write Your Content Here...."
            className="w-full p-3  focus-visible:ring-0"
            style={{
              caretColor: "#000",
            }}
            rows={10}
          />
        </div>
      </div>
    </div>
  );
};

export default ViewPaste;
