import TimerApp from "./application";
import os from "os";
import { Storage } from "./application/Storage";

const platform = process.platform || os.platform();
export const storage = new Storage();

new TimerApp(platform, storage);
