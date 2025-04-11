import React, { ReactNode, useState } from "react";

import MainContext from "./MainContext";
import { file } from "../types";

interface MaincontextProviderProps {
  children: ReactNode;
}

const MainContextProvider: React.FC<MaincontextProviderProps> = ({
  children,
}) => {
  const [folderList, setFolderList] = useState<string[]>([]);
  const [scannedFiles, setScannedFiles] = useState<file[]>([]);
  const [currentlySelectedFile, setCurrentlySelectedFile] = useState<file>({
    name: "",
    hash: "",
    path: "",
    vt_url: "",
    size: 0,
    score: 0,
    suspicious: 0,
    total: 0,
  });

  const value = {
    scannedFiles,
    setScannedFiles,
    folderList,
    setFolderList,
    currentlySelectedFile,
    setCurrentlySelectedFile,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
