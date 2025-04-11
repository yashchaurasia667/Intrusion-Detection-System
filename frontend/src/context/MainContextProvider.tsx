import React, { ReactNode, useState } from "react";

import MainContext from "./MainContext";

interface MaincontextProviderProps {
  children: ReactNode;
}

const MainContextProvider: React.FC<MaincontextProviderProps> = ({
  children,
}) => {
  const [folderList, setFolderList] = useState<string[]>([]);
  const value = {
    folderList,
    setFolderList,
  };
  return <MainContext.Provider value={value}>{children}</MainContext.Provider>;
};

export default MainContextProvider;
