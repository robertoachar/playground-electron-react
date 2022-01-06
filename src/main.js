/* eslint import/no-extraneous-dependencies: off */

import { app, BrowserWindow } from 'electron';
import startup from 'electron-squirrel-startup';
import { environment } from './environment';

if (startup) {
  app.quit();
}

const createWindow = () => {
  const win = new BrowserWindow({
    width: 1280,
    height: 768,
    webPreferences: {
      preload: environment.MAIN_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  win.loadURL(environment.MAIN_WINDOW_WEBPACK_ENTRY);

  return win;
};

app.whenReady().then(() => {
  let win = createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      win = createWindow();
    }
  });

  win.webContents.on('did-finish-load', () => {
    let i = 0;
    setInterval(() => {
      const message = `pinging...${i}`;
      console.log(message);
      win.webContents.send('ping', message);
      i += 1;
    }, 300);
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});
