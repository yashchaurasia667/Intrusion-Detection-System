import FileResult from "./FileResult";
import MonitorList from "./MonitorList";

const index = () => {
  return (
    <div className="flex w-full h-full py-10">
      <FileResult
        filename="file1"
        filepath="path"
        size="30mb"
        score={50}
        total={100}
      />

      <div className="relative my-3 mx-4 h-[100%]">
        <div className="border-t-0 border border-gray-500 w-[100%] h-full"></div>
      </div>

      <MonitorList />
    </div>
  );
};

export default index;
