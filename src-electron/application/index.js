import { app, BrowserWindow, screen, ipcMain } from "electron";
import path from "path";
import { Timer } from "./Timer";
import { date } from "quasar";

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
      },
    });

    this.mainWindow.loadURL(process.env.APP_URL);

    this.timer.onChange = () => {
      this.mainWindow.webContents.send("tick", {
        time: this.timer.get(),
        title: this.entry.title,
      });
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
    ipcMain.on("start:timer", (_, data) => {
      this.timer.start();
      const timeStamp = Date.now();
      this.entry = {
        id: timeStamp,
        title: data.title,
        description: "Описание отсутствует",
        time: 0,
        createdAt: date.formatDate(timeStamp, "YYYY-MM-DDTHH:mm:ss"),
      };
    });
    ipcMain.on("stop:timer", () => {
      const timer = this.timer.stop();
      const entries = this.storage.get("entries");
      this.entry.time = timer;
      entries.push(this.entry);
      this.storage.set("entries", entries);
      this.mainWindow.webContents.send("entries", { entries });
    });
    // ipcMain.on("save", (_, data) => {
    //   const entries = this.storage.get("entries");
    //   entries.push(data);
    //   this.storage.set("entries", entries);
    //   this.mainWindow.webContents.send("entries", { entries });
    // });
    ipcMain.on("edit:description", (_, data) => {
      const entries = this.storage.get("entries");
      entries.forEach((el) => {
        if (el.id === data.id) {
          el.description = data.description;
        }
      });
      this.storage.set("entries", entries);
    });
    ipcMain.on("delete:entry", (_, id) => {
      const entries = this.storage.get("entries");
      const result = entries.filter((el) => el.id !== id);
      this.storage.set("entries", result);
    });
  }
}
