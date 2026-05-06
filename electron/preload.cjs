const { contextBridge, ipcRenderer } = require('electron');

function invoke(channel, ...args) {
  return ipcRenderer.invoke(channel, ...args);
}

contextBridge.exposeInMainWorld('steam', {
  isAvailable: () => invoke('steam:isAvailable'),
  getSteamId: () => invoke('steam:getSteamId'),
  getPersonaName: () => invoke('steam:getPersonaName'),
  getAuthTicketForWebApi: (identity) => invoke('steam:getAuthTicketForWebApi', identity),
  cloud: {
    readTextFile: (name) => invoke('steam:cloud:readTextFile', name),
    writeTextFile: (name, content) => invoke('steam:cloud:writeTextFile', name, content),
    listFiles: () => invoke('steam:cloud:listFiles'),
  },
  achievements: {
    unlock: (id) => invoke('steam:achievements:unlock', id),
    get: (id) => invoke('steam:achievements:get', id),
    list: () => invoke('steam:achievements:list'),
  },
  stats: {
    get: (name) => invoke('steam:stats:get', name),
    set: (name, value) => invoke('steam:stats:set', name, value),
    store: () => invoke('steam:stats:store'),
  },
});
