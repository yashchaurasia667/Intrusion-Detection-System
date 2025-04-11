import { useContext, useEffect, useMemo, useState } from "react";

import FileTile from "./FileTile";
import MainContext from "../../context/MainContext";

import { file } from "../../types";

const ScannedFiles = () => {
  const context = useContext(MainContext);
  if (!context) throw new Error("no main context");
  const { folderList } = context;

  const [scannedFiles, setScannedFiles] = useState<file[]>([]);

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

  return (
    <div className="bg-[#1f1f1f] w-full px-4 rounded-lg mx-2 py-4 overflow-auto">
      <p className="font-bold text-3xl">Scanned Files</p>
      <div className="mt-5">{files}</div>
      {/* <button onClick={scan}>scan</button> */}
    </div>
  );
};

export default ScannedFiles;
