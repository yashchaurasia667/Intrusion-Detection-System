import FolderTile from "./FolderTile";

const MonitorList = () => {
  const addFolder = async () => {
    try {
      const res = await window.api.addFolder();
      if (res && !res?.canceled) {
        const path = res.filePaths[0];
        console.log(`Download path set to: ${path}`);
        return path;
      } else console.log("Operation canceled");
    } catch (error) {
      console.error(`Something went wrong opening file dialog: ${error}`);
    }
    return "";
  };
  return (
    <div className="w-[45%] max-w-[400px] bg-[#1f1f1f] px-2 p-4 rounded-lg mr-2 relative flex flex-col">
      <p className="text-lg font-semibold px-2">Folders currently monitoring</p>
      <div className="flex flex-col items-center overflow-auto h-full mt-5 rounded-md">
        <FolderTile />
      </div>
      <div>
        <button
          onClick={addFolder}
          className="bg-[#0267c1] px-4 py-2 w-full font-semibold text-[#1f1f1f] hover:bg-[#1f74bf]"
        >
          Add Folder
        </button>
      </div>
    </div>
  );
};

export default MonitorList;
