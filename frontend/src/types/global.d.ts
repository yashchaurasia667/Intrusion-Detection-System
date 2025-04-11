export {};

interface OpenFolderRes {
  canceled: boolean;
  filePaths: string[];
}

declare global {
  interface Window {
    api: {
      addFolder: () => Promise<OpenFolderRes | undefined>;
      // openPath: (path: string) => void;
    };
  }
}
