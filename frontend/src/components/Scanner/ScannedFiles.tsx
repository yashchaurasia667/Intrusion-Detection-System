import { useContext, useEffect, useMemo } from "react";

import FileTile from "./FileTile";
import MainContext from "../../context/MainContext";
import { useNavigate } from "react-router-dom";
import { FaChevronCircleLeft, FaChevronCircleRight } from "react-icons/fa";

const ScannedFiles = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("no main context");
  const { scannedFiles, setScannedFiles, folderList } = context;

  useEffect(() => {
    const scan = async () => {
      const res = await window.api.scannedFile();
      const data = JSON.parse(res).files;
      const jsonData = data.map((file: string) => JSON.parse(file));
      setScannedFiles([...scannedFiles, ...jsonData]);
    };
    if (folderList.length) scan();
  }, [folderList.length]);

  const files = useMemo(() => {
    return scannedFiles.map((file, index) => {
      // console.log(file);
      return <FileTile {...file} key={index} />;
    });
  }, [scannedFiles]);

  const navigate = useNavigate();

  return (
    <div className="bg-[#1f1f1f] w-full px-4 rounded-lg mx-2 py-4 overflow-auto">
      <div className="flex gap-x-3">
        <button onClick={() => navigate("/")} className="mb-5 hover:scale-110">
          <FaChevronCircleLeft
            size={30}
            fill={"#acacac"}
            className="hover:fill-white"
          />
        </button>
        <button onClick={() => navigate("/")} className="mb-5 hover:scale-110">
          <FaChevronCircleRight
            size={30}
            fill={"#acacac"}
            className="hover:fill-white"
          />
        </button>
      </div>

      <p className="font-bold text-3xl">Scanned Files</p>
      <div className="mt-5">{files}</div>
      {/* <button onClick={scan}>scan</button> */}
    </div>
  );
};

export default ScannedFiles;
