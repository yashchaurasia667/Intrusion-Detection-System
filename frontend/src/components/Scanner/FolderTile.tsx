import { useContext } from "react";
import { FaFolder } from "react-icons/fa6";
import { IoMdRemoveCircle } from "react-icons/io";
import { IoMdOpen } from "react-icons/io";
import MainContext from "../../context/MainContext";
import { toast, Bounce } from "react-toastify";

interface props {
  path: string;
  name: string;
}

const FolderTile = ({ path, name }: props) => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { list } = context;

  const openPath = async () => {
    window.api.openPath(path);
  };

  const removeFolder = async () => {
    window.api.removeFolder(path);
    toast.success("Folder Removed", {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      transition: Bounce,
    });
    list();
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
        <button onClick={removeFolder} className="px-2 ">
          <IoMdRemoveCircle size={20} className="hover:fill-red-500" />
        </button>
      </div>
    </div>
  );
};

export default FolderTile;
