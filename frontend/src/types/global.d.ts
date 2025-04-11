export {};

interface OpenFolderRes {
  canceled: boolean;
  filePaths: string[];
}

declare global {
  interface Window {
    api: {
      addFolder: () => Promise<OpenFolderRes | undefined>;
      list: () => Promise<string>;
      openPath: (path: string) => void;
    };
  }
}
