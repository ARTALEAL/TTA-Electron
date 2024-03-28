import { app, BrowserWindow, screen, ipcMain } from "electron";
import path from "path";
import { Timer } from "./Timer";
import { data } from "autoprefixer";

export default class TimerApp {
  constructor(platform, storage) {
    this.storage = storage;
    this.timer = new Timer();
    this.width;
    this.height;
    this.platform = platform;
    this.subscribeForAppEvents();
    this.subscribeForIPC();
    app.whenReady().then(() => {
      const primaryDisplay = screen.getPrimaryDisplay();
      const { width, height } = primaryDisplay.workAreaSize;
      this.width = width;
      this.height = height;
      this.createWindow();
    });
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
      width: 400,
      height: 600,
      maxHeight: this.height,
      maxWidth: this.width,
      autoHideMenuBar: true,
      useContentSize: true,
      webPreferences: {
        contextIsolation: true,
        preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
        // nodeIntegration: true,
      },
    });

    this.mainWindow.loadURL(process.env.APP_URL);

    this.timer.onChange = () => {
      this.mainWindow.webContents.send("tick", { time: this.timer.get() });
    };

    if (process.env.DEBUGGING) {
      // mode:detach - запуск девтулзов в отдельном окне
      this.mainWindow.webContents.openDevTools({ mode: "detach" });
    } else {
      this.mainWindow.webContents.on("devtools-opened", () => {
        this.mainWindow.webContents.closeDevTools();
      });
    }

    this.mainWindow.webContents.on("did-finish-load", () => {
      this.mainWindow.webContents.send("entries", {
        entries: this.storage.get("entries"),
      });
    });

    this.mainWindow.on("closed", () => {
      this.timer.onChange = null;
      this.mainWindow = null;
    });
  }

  subscribeForAppEvents() {
    // Запрет на повторное открытие (lock)
    const lock = app.requestSingleInstanceLock();
    if (!lock) {
      app.quit();
    } else {
      app.on("second-instance", () => {
        if (this.mainWindow) {
          this.mainWindow.focus();
        }
      });
    }

    app.on("window-all-closed", () => {
      if (this.platform !== "darwin") {
        app.quit();
      }
    });

    app.on("activate", () => {
      if (this.mainWindow === null) {
        this.createWindow();
      }
    });
  }
  subscribeForIPC() {
    ipcMain.on("start:timer", () => this.timer.start());
    ipcMain.on("stop:timer", () => this.timer.stop());
    ipcMain.on("save", (_, data) => {
      const entries = this.storage.get("entries");
      entries.push(data);
      this.storage.set("entries", entries);
      this.mainWindow.webContents.send("entries", { entries });
    });
    ipcMain.on("edit:description", (_, data) => {
      const entries = this.storage.get("entries");
      entries.forEach((el) => {
        if (el.id === data.id) {
          el.description = data.description;
        }
      });
      this.storage.set("entries", entries);
    });
  }
}
