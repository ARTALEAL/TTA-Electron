const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("myApp", {
  getEntries: (callback) => {
    ipcRenderer.on("entries", callback);
  },
  getTodos: (callback) => {
    ipcRenderer.on("todos", callback);
  },
  subscribeForTimer: (callback) => {
    ipcRenderer.on("tick", callback);
  },
  startTimer: (title) => {
    ipcRenderer.send("start:timer", { title });
  },
  stopTimer: () => {
    ipcRenderer.send("stop:timer");
  },
  saveTodo: (data) => {
    ipcRenderer.send("save:todo", data);
  },
  editDescription: (data) => {
    ipcRenderer.send("edit:description", data);
  },
  editTodoDescription: (data) => {
    ipcRenderer.send("edit:tododescription", data);
  },
  deleteEntry: (id) => {
    ipcRenderer.send("delete:entry", id);
  },
  deleteTodo: (id) => {
    ipcRenderer.send("delete:todo", id);
  },
  changeTodoStatus: (data) => {
    ipcRenderer.send("change:todoisdone", data);
  },
});
