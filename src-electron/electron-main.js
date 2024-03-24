import TimerApp from "./application";
import os from "os";

const platform = process.platform || os.platform();

new TimerApp(platform);
