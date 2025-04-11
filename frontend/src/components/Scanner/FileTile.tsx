import { IoMdOpen } from "react-icons/io";

const FileTile = () => {
  return (
    <div className="w-full p-4 bg-[#2f2f2f] text-white rounded-xl shadow-lg cursor-pointer hover:scale-[102%] transition-all flex justify-between items-center group">
      <div>
        <h2 className="text-lg font-bold text-blue-400 group-hover:underline">
          file.exe
        </h2>
        <p className="text-sm text-gray-400">
          C:/Users/Rumi/Downloads/file.exe
        </p>
      </div>
      <div className="flex gap-x-4 items-center">
        <span className="text-sm ">
          <IoMdOpen size={25} className="hover:fill-[#0672c9]" />
        </span>
        <span className="text-sm bg-red-500 px-2 py-1 rounded-full">{34}</span>
      </div>
    </div>
  );
};

export default FileTile;
