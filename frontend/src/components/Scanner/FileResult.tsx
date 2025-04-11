import { ArrowLeft, FileWarning, AlertTriangle, FileText } from "lucide-react";

interface props {
  filename: string;
  filepath: string;
  size: number | string;
  score: number;
  total: number;
  malicious?: number;
  suspicious?: number;
  onBack?: () => void;
}

const FileResult = ({
  filename = "file",
  filepath = "C:/Users/test/Downloads/file",
  size = 35,
  score = 50,
  total = 66,
  malicious = 2,
  suspicious = 5,
  onBack,
}: props) => {
  const progress = (score / total) * 100;

  return (
    <div className="bg-[#1a1a1a] w-full h-full overflow-y-auto px-6 py-6 rounded-2xl mx-2 text-white shadow-lg transition-all duration-300 relative animate-fade-in">
      
      {/* Back Button */}
      {onBack && (
        <button
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-[#5cc8ff] hover:text-white transition"
        >
          <ArrowLeft size={20} />
          <span className="text-sm font-medium">Back</span>
        </button>
      )}

      {/* File Tile */}
      <div className="flex items-center justify-between bg-[#262626] px-6 py-4 rounded-xl shadow-sm border border-[#333]">
        <div>
          <p className="text-xl font-semibold text-[#5cc8ff] tracking-wide">{filename}</p>
          <p className="text-sm text-gray-400 mt-1">{filepath}</p>
        </div>
        <div className="text-sm text-gray-300 font-medium">
          <p>Size: {size} KB</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-8 w-[75%]">
        <div className="flex justify-between text-sm text-gray-400 mb-1">
          <span>Community Score</span>
          <span>{`${score}/${total}`}</span>
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
        <p className="text-xl font-semibold mb-4 text-[#5cc8ff]">Detection Details</p>
        <ul className="list-inside text-sm space-y-3">
          <li className="flex items-center gap-2">
            <FileText size={16} className="text-gray-400" />
            <span><span className="text-gray-400">File Name:</span> <span className="text-white">{filename}</span></span>
          </li>
          <li className="flex items-center gap-2">
            <FileWarning size={16} className="text-red-400" />
            <span><span className="text-gray-400">Malicious Detections:</span> <span className="text-red-400">{malicious}</span></span>
          </li>
          <li className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-yellow-400" />
            <span><span className="text-gray-400">Suspicious Detections:</span> <span className="text-yellow-400">{suspicious}</span></span>
          </li>
          <li className="flex items-center gap-2">
            <FileText size={16} className="text-gray-400" />
            <span><span className="text-gray-400">File Path:</span> <span className="text-white">{filepath}</span></span>
          </li>
          <li className="flex items-center gap-2">
            <FileText size={16} className="text-gray-400" />
            <span><span className="text-gray-400">Size:</span> <span className="text-white">{size} KB</span></span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default FileResult;
