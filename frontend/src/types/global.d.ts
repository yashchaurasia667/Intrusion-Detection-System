export {};

interface OpenFolderRes {
  canceled: boolean;
  filePaths: string[];
}

declare global {
  interface Window {
    api: {
      addFolder: () => Promise<OpenFolderRes | undefined>;
      removeFolder: (path: string) => void;
      list: () => Promise<string>;
      openPath: (path: string) => void;
      scannedFile: () => Promise<string>;
    };
  }
}
