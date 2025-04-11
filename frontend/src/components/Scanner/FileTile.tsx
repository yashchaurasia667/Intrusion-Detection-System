const FileTile = () => {
  return (
    <div className="p-4 bg-[#1e1e2f] text-white rounded-xl shadow-lg w-full max-w-md">
      <div className="flex justify-between items-center mb-1">
        <h2 className="text-lg font-bold text-blue-400">file.exe</h2>
        <span className="text-sm bg-red-500 px-2 py-1 rounded-full">{34}</span>
      </div>
      <p className="text-sm text-gray-400">C:/Users/Rumi/Downloads/file.exe</p>
    </div>
  );
};

export default FileTile;

  
  