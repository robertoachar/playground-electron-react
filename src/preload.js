import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electron', {
  hello: () => {
    console.log('preload');
  },
  on: (channel, func) => {
    const channels = ['ping'];
    if (channels.includes(channel)) {
      ipcRenderer.once('ping', (event, ...args) => func(...args));
    }
  },
});
