import FileTile from "./FileTile";
import { useNavigate } from "react-router";

const ScannedFiles = () => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate("/file")}
      className="bg-[#1f1f1f] w-full px-4 rounded-lg mx-2 py-4"
    >
      <p className="font-bold text-3xl">Scanned Files</p>
      <div className="mt-5">
        <FileTile />
      </div>
    </div>
  );
};

export default ScannedFiles;
