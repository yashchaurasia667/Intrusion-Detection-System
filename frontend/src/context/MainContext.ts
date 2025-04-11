import React from "react";

interface MainContext {
  folderList: string[];
  setFolderList: (e: string[]) => void;
}

const MainContext = React.createContext(<MainContext | undefined>undefined);

export default MainContext;
