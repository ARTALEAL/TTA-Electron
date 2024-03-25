const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  getEntries: (callback) => {
    ipcRenderer.on("entries", callback);
  },
});
