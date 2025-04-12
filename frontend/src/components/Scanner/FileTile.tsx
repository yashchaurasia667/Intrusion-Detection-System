import { useNavigate } from "react-router";
import { useContext } from "react";

import { IoMdOpen } from "react-icons/io";

import MainContext from "../../context/MainContext";
import { file } from "../../types";

const FileTile = ({
  name,
  path,
  hash,
  size,
  score,
  suspicious,
  total,
  vt_url,
}: file) => {
  const context = useContext(MainContext);
  if (!context) throw new Error("No main context");
  const { setCurrentlySelectedFile } = context;

  const navigate = useNavigate();

  // const openInFolder = async () => {
  //   window.api.openPath(path);
  // };

  return (
    <div
      onClick={() => {
        setCurrentlySelectedFile({
          name: name,
          path: path,
          hash: hash,
          size: size,
          score: score,
          suspicious: suspicious,
          total: total,
          vt_url: vt_url,
        });
        navigate("/file");
      }}
      className="w-full p-4 bg-[#2f2f2f] text-white rounded-xl shadow-lg cursor-pointer hover:scale-[102%] transition-all flex justify-between items-center group mt-2"
    >
      <div>
        <h2 className="text-lg font-bold text-blue-400 group-hover:underline">
          {name}
        </h2>
        <p className="text-sm text-gray-400">{path}</p>
      </div>
      <div className="flex gap-x-4 items-center">
        <span onClick={() => window.api.openPath(path)} className="text-sm ">
          <IoMdOpen size={25} className="hover:fill-[#0672c9]" />
        </span>
        <span className="text-sm bg-red-500 px-2 py-1 rounded-full">
          {score}
        </span>
      </div>
    </div>
  );
};

export default FileTile;
