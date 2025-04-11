import { FaChevronCircleLeft } from "react-icons/fa";
import { FileWarning, AlertTriangle, FileText } from "lucide-react";
import { useContext } from "react";
import MainContext from "../../context/MainContext";
import { useNavigate } from "react-router";

const FileResult = () => {
  const navigate = useNavigate();

  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { currentlySelectedFile } = context;

  const progress =
    (currentlySelectedFile.score / currentlySelectedFile.total) * 100;

  return (
    <div className="bg-[#1a1a1a] w-full h-full overflow-y-auto px-6 py-6 rounded-2xl mx-2 text-white shadow-lg transition-all duration-300 relative animate-fade-in">
      <button
        onClick={() => navigate("/")}
        className="px-2 mb-5 hover:scale-110"
      >
        <FaChevronCircleLeft
          size={30}
          fill={"#acacac"}
          className="hover:fill-white"
        />
      </button>
      {/* Back Button */}
      {/* {onBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-[#5cc8ff] hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>
      )} */}

      {/* File Tile */}
      <div className="flex items-center justify-between bg-[#262626] px-6 py-4 rounded-xl shadow-sm border border-[#333]">
        <div>
          <p className="text-2xl font-semibold text-[#5cc8ff] tracking-wide">
            {currentlySelectedFile.name}
          </p>
          <p className="text-md text-gray-400 mt-1">
            {currentlySelectedFile.path}
          </p>
        </div>
        <div className="text-md text-gray-300 font-medium">
          <p>Size: {currentlySelectedFile.size} KB</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-[75%]">
        <div className="flex justify-between text-md font-semibold text-gray-400 mb-1">
          <span>Community Score</span>
          <span>{`${currentlySelectedFile.score}/${currentlySelectedFile.total}`}</span>
        </div>
        <div className="h-[18px] bg-[#3a3a3a] rounded-full overflow-hidden border border-[#4b4b4b]">
          <div
            className="h-full bg-gradient-to-r from-green-400 to-green-600 rounded-full transition-all duration-500 ease-in-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      </div>

      {/* Detection Details */}
      <div className="mt-6 bg-[#242424] p-6 rounded-xl border border-[#2d2d2d]">
        <p className="text-2xl font-semibold mb-4 text-[#5cc8ff]">
          Detection Details
        </p>
        <ul className="list-inside text-md space-y-3">
          <li className="flex items-center gap-2">
            <FileText size={16} className="text-gray-400" />
            <span>
              <span className="text-gray-400">File Name: </span>{" "}
              <span className="text-white">{currentlySelectedFile.name}</span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FileWarning size={16} className="text-red-400" />
            <span>
              <span className="text-gray-400">Malicious Detections:</span>{" "}
              <span className="text-red-400">
                {currentlySelectedFile.score}
              </span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-400" />
            <span>
              <span className="text-gray-400">Suspicious Detections:</span>{" "}
              <span className="text-yellow-400">
                {currentlySelectedFile.suspicious}
              </span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FileText size={16} className="text-gray-400" />
            <span>
              <span className="text-gray-400">File Path:</span>{" "}
              <span className="text-white">{currentlySelectedFile.path}</span>
            </span>
          </li>
          <li className="flex items-center gap-2">
            <FileText size={16} className="text-gray-400" />
            <span>
              <span className="text-gray-400">Size:</span>{" "}
              <span className="text-white">
                {currentlySelectedFile.size} KB
              </span>
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FileResult;
