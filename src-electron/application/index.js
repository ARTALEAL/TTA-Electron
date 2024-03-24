import { app, BrowserWindow } from "electron";
import path from "path";

export default class TimerApp {
  constructor(platform) {
    this.platform = platform;
    this.subscribeForAppEvents();
    app.whenReady().then(() => this.createWindow());
  }

  createWindow() {
    this.mainWindow = new BrowserWindow({
      icon: path.resolve(__dirname, "icons/icon.png"), // tray icon
      width: 400,
      height: 600,
      useContentSize: true,
      webPreferences: {
        contextIsolation: true,
        preload: path.resolve(__dirname, process.env.QUASAR_ELECTRON_PRELOAD),
      },
    });

    this.mainWindow.loadURL(process.env.APP_URL);

    if (process.env.DEBUGGING) {
      this.mainWindow.webContents.openDevTools();
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
