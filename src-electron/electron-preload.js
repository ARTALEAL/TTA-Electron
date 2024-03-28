const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  getEntries: (callback) => {
    ipcRenderer.on("entries", callback);
  },
  subscribeForTimer: (callback) => {
    ipcRenderer.on("tick", callback);
  },
  startTimer: () => {
    ipcRenderer.send("start:timer");
  },
  stopTimer: () => {
    ipcRenderer.send("stop:timer");
  },
  saveEntry: (data) => {
    ipcRenderer.send("save", data);
  },
  editDescription: (data) => {
    ipcRenderer.send("edit:description", data);
  },
  deleteEntry: (id) => {
    ipcRenderer.send("delete:entry", id);
  },
});
