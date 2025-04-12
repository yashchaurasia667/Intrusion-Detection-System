"use strict";
const electron = require("electron");
electron.contextBridge.exposeInMainWorld("ipcRenderer", {
  on(...args) {
    const [channel, listener] = args;
    return electron.ipcRenderer.on(
      channel,
      (event, ...args2) => listener(event, ...args2)
    );
  },
  off(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.off(channel, ...omit);
  },
  send(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.send(channel, ...omit);
  },
  invoke(...args) {
    const [channel, ...omit] = args;
    return electron.ipcRenderer.invoke(channel, ...omit);
  }
  // You can expose other APTs you need here.
  // ...
});
electron.contextBridge.exposeInMainWorld("api", {
  list: async () => await electron.ipcRenderer.invoke("list"),
  openPath: (path) => electron.ipcRenderer.invoke("openPath", path),
  addFolder: async () => await electron.ipcRenderer.invoke("addFolder"),
  scannedFile: async () => await electron.ipcRenderer.invoke("scannedFile"),
  removeFolder: async (path) => await electron.ipcRenderer.invoke("removeFolder", path)
});
