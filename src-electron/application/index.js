import { app, BrowserWindow, screen } from "electron";
import path from "path";

export default class TimerApp {
  constructor(platform) {
    this.width;
    this.height;
    this.platform = platform;
    this.subscribeForAppEvents();
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

    if (process.env.DEBUGGING) {
      // mode:detach - запуск девтулзов в отдельном окне
      this.mainWindow.webContents.openDevTools({ mode: "detach" });
    } else {
      this.mainWindow.webContents.on("devtools-opened", () => {
        this.mainWindow.webContents.closeDevTools();
      });
    }

    this.mainWindow.on("closed", () => {
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
}
