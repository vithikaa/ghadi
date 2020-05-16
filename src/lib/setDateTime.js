import { platform } from "os";
import { exec } from "child_process";
import moment from "moment";
import sudo from "sudo-prompt";

const options = {
  name: "Electron"
};

const Platform = {
  WINDOWS: "win32",
  LINUX: "linux"
};

const Controllers = {
  [Platform.WINDOWS](datetime) {
    exec(`date ${moment(datetime).format("M/D/YYYY")}`);
    exec(`time ${moment(datetime).format("HH:mm:ss")}`);
  },

  [Platform.LINUX](datetime) {
    console.log("settingDate", datetime);
    sudo.exec(
      `timedatectl set-ntp false && date -s "${moment(datetime).format(
        "YYYY/MM/DD HH:mm:ss"
      )}"`,
      options,
      function(error, stdout, stderr) {
        if (error) throw error;
        console.log("stdout: " + stdout);
      }
    );
  }
};

const isSupported = () => {
  if (Controllers[platform()] === undefined) {
    console.error("Unsupported system, unable to set system time.");

    return false;
  }

  return true;
};

const createController = () => {
  if (!isSupported()) {
    return;
  }

  return Controllers[platform()];
};

const controller = createController();

export default controller;
