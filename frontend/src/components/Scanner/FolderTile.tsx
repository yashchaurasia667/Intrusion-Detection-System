import { FaFolder } from "react-icons/fa6";
import { IoMdRemoveCircle } from "react-icons/io";
import { IoMdOpen } from "react-icons/io";

interface props {
  path: string;
  name: string;
}

const FolderTile = ({ path, name }: props) => {
  const openPath = async () => {
    window.api.openPath(path);
  };

  return (
    <div className="hover:bg-[#2f2f2f] flex justify-between items-center w-full h-[40px] px-4 py-2 group">
      <div className="flex items-center gap-x-3">
        <FaFolder color="#FBA834" />
        <p>{name}</p>
      </div>
      <div className="invisible group-hover:visible">
        <button onClick={openPath}>
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
