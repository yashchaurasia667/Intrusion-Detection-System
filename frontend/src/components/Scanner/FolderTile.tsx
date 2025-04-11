import { FaFolder } from "react-icons/fa6";
import { IoMdRemoveCircle } from "react-icons/io";
import { IoMdOpen } from "react-icons/io";

const FolderTile = () => {
  return (
    <div className="hover:bg-[#2f2f2f] flex justify-between items-center w-full h-[40px] px-4 py-2 group">
      <div className="flex items-center gap-x-3">
        <FaFolder color="#FBA834" />
        <p>Folder name</p>
      </div>
      <div className="invisible group-hover:visible">
        <button>
          <IoMdOpen size={20} className="hover:fill-[#0672c9]" />
        </button>
        <button className="px-2 ">
          <IoMdRemoveCircle size={20} className="hover:fill-red-500" />
        </button>
      </div>
    </div>
  );
};

export default FolderTile;
