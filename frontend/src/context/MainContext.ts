import React from "react";
import { file } from "../types";

interface MainContext {
  folderList: string[];
  setFolderList: (e: string[]) => void;
  currentlySelectedFile: file;
  setCurrentlySelectedFile: (e: file) => void;
  scannedFiles: file[];
  setScannedFiles: (e: file[]) => void;
  list: ()=> void;
}

const MainContext = React.createContext(<MainContext | undefined>undefined);

export default MainContext;
