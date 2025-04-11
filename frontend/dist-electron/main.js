import { app, BrowserWindow, ipcMain, dialog, shell } from "electron";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import path from "path";
import { spawn } from "node:child_process";
createRequire(import.meta.url);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
process.env.APP_ROOT = path.join(__dirname, "..");
const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");
process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, "public") : RENDERER_DIST;
let win;
function createWindow() {
  win = new BrowserWindow({
    icon: path.join(process.env.VITE_PUBLIC, "electron-vite.svg"),
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs")
    }
  });
  win.webContents.on("did-finish-load", () => {
    win == null ? void 0 : win.webContents.send("main-process-message", (/* @__PURE__ */ new Date()).toLocaleString());
  });
  win.setMenu(null);
  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
  } else {
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }
}
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
    win = null;
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
let python = null;
function startPythonProcess() {
  var _a;
  python = spawn("python", [path.join(__dirname, "../../server/monitor.py")], {
    stdio: ["pipe", "pipe", "pipe"]
  });
  (_a = python.stderr) == null ? void 0 : _a.on("data", (data) => {
    console.error("[PYTHON STDERR]", data.toString());
  });
  python.on("exit", (code) => {
    console.warn(`[Python exited with code ${code}]`);
    python = null;
  });
}
ipcMain.handle("scannedFile", async () => {
  var _a;
  if (python && ((_a = python.stdin) == null ? void 0 : _a.writable)) python.stdin.write(`scan
`);
  return new Promise((resolve) => {
    var _a2;
    if (python) {
      (_a2 = python.stdout) == null ? void 0 : _a2.once("data", (data) => {
        const res = data.toString().trim();
        if (res.startsWith(".SCAN_RESULTS.") && res.endsWith(".END.")) {
          resolve(res.slice(14, -5));
        }
      });
    } else {
      resolve("Python process not running or stdout not readable.");
    }
  });
});
ipcMain.handle("list", async () => {
  var _a;
  if (python && ((_a = python.stdin) == null ? void 0 : _a.writable)) {
    python.stdin.write(`list
`);
    return new Promise((resolve) => {
      var _a2;
      if (python)
        (_a2 = python.stdout) == null ? void 0 : _a2.once("data", (data) => {
          const result = data.toString().trim();
          if (result.startsWith(".LIST.") && result.endsWith(".END.")) {
            console.log(result.slice(6, -5));
            resolve(result.slice(6, -5));
          }
        });
    });
  } else {
    return "Python process not ready";
  }
});
ipcMain.handle("addFolder", async () => {
  var _a;
  const result = await dialog.showOpenDialog({
    properties: ["openDirectory", "createDirectory"]
  });
  if (python && ((_a = python.stdin) == null ? void 0 : _a.writable)) {
    python.stdin.write(`add ${result.filePaths[0]}
`);
  }
  return result;
});
ipcMain.handle("openPath", async (e, path2) => {
  e.preventDefault();
  shell.showItemInFolder(path2);
});
app.whenReady().then(() => {
  createWindow();
  startPythonProcess();
});
export {
  MAIN_DIST,
  RENDERER_DIST,
  VITE_DEV_SERVER_URL
};
