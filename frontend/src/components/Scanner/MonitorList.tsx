import { useEffect, useMemo, useState } from "react";
import FolderTile from "./FolderTile";

const MonitorList = () => {
  const [folderList, setFolderList] = useState<string[]>([]);

  const list = async () => {
    const res = await window.api.list();
    const data = res.split(".END.");
    setFolderList(JSON.parse(data[0]).observed_folders);
    // console.log(JSON.parse(data[0]));
  };

  useEffect(() => {
    list();
  }, []);

  const folders = useMemo(
    () =>
      folderList.map((path, index) => (
        <FolderTile
          path={path}
          name={path.split("\\").at(-1) || path}
          key={index}
        />
      )),
    [folderList]
  );

  const addFolder = async () => {
    try {
      const res = await window.api.addFolder();
      if (res && !res?.canceled) {
        const path = res.filePaths[0];
        console.log(`Added path: ${path}`);
        setFolderList((prev) => [...prev, path]);
      } else console.log("Operation canceled");
    } catch (error) {
      console.error(`Something went wrong opening file dialog: ${error}`);
    }
  };

  return (
    <div className="w-[45%] max-w-[400px] bg-[#1f1f1f] px-2 p-4 rounded-lg mr-2 relative flex flex-col">
      <p className="text-lg font-semibold px-2">Folders currently monitoring</p>
      <div className="flex flex-col items-center overflow-auto h-full mt-5 rounded-md">
        {folders}
        {/* <FolderTile /> */}
      </div>
      <div>
        <button
          onClick={addFolder}
          className="bg-[#0267c1] px-4 py-2 w-full font-bold text-[#1f1f1f] hover:bg-[#1f74bf] rounded-lg"
        >
          Add Folder
        </button>

        {/* <button
          onClick={list}
          className="bg-[#0267c1] px-4 py-2 w-full font-semibold text-[#1f1f1f] hover:bg-[#1f74bf]"
        >
          list folders
        </button> */}
      </div>
    </div>
  );
};

export default MonitorList;
