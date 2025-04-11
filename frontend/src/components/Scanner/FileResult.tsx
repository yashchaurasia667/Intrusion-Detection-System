interface props {
  filename: string;
  filepath: string;
  size: string;
  score: number;
  total: number;
}
const FileResult = ({ filename, filepath, size, score, total }: props) => {
  const progress = (score / total) * 100;
  return (
    <div className="bg-[#1f1f1f] w-full px-4 rounded-lg mx-2">
      <div className="mt-4">
        <p className="text-2xl font-semibold inline">Scan Results for </p>{" "}
        <p className="text-2xl font-semibold inline text-[#5cc8ff]">
          {filename}
        </p>
      </div>

      <div className="bg-[#acacac] w-[70%] h-[20px] rounded-full mt-20 overflow-hidden">
        <div
          className="h-full bg-green-600 rounded-full"
          style={{
            width: progress + "%",
          }}
        ></div>
      </div>

      <div className="flex gap-x-2 text-lg mt-3 font-semibold">
        <p>Community score: </p>
        <p>{`${score}/${total}`}</p>
      </div>

      <div>details</div>
    </div>
  );
};

export default FileResult;
