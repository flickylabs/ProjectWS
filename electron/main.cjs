const { app, BrowserWindow, Menu, ipcMain, shell } = require('electron');
const path = require('node:path');
const { pathToFileURL } = require('node:url');
const { createSteamBridge } = require('./steamworks-bridge.cjs');

const isDev = process.argv.includes('--dev') || Boolean(process.env.ELECTRON_RENDERER_URL);
let mainWindow = null;
let steamBridge = null;

function enableSteamOverlaySupport() {
  try {
    require('steamworks.js').electronEnableSteamOverlay();
  } catch (err) {
    console.warn('[Steamworks] Electron overlay support is unavailable:', err.message);
  }
}

function rendererUrl() {
  if (isDev) {
    return process.env.ELECTRON_RENDERER_URL || 'http://localhost:5174/index-pc.html';
  }

  return pathToFileURL(path.join(app.getAppPath(), 'dist-pc', 'index-pc.html')).toString();
}

function createMainWindow() {
  mainWindow = new BrowserWindow({
    width: 1280,
    height: 720,
    minWidth: 1100,
    minHeight: 650,
    backgroundColor: '#07070c',
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.cjs'),
      contextIsolation: true,
      nodeIntegration: false,
      sandbox: false,
    },
  });

  mainWindow.once('ready-to-show', () => {
    mainWindow.show();
  });

  mainWindow.webContents.setWindowOpenHandler(({ url }) => {
    if (url.startsWith('https://') || url.startsWith('http://')) {
      shell.openExternal(url);
    }
    return { action: 'deny' };
  });

  mainWindow.loadURL(rendererUrl());
}

function registerSteamIpc() {
  steamBridge = createSteamBridge();

  ipcMain.handle('steam:isAvailable', () => steamBridge.isAvailable());
  ipcMain.handle('steam:getSteamId', () => steamBridge.getSteamId());
  ipcMain.handle('steam:getPersonaName', () => steamBridge.getPersonaName());
  ipcMain.handle('steam:getAuthTicketForWebApi', (_event, identity) => (
    steamBridge.getAuthTicketForWebApi(identity)
  ));

  ipcMain.handle('steam:cloud:readTextFile', (_event, name) => steamBridge.cloud.readTextFile(name));
  ipcMain.handle('steam:cloud:writeTextFile', (_event, name, content) => (
    steamBridge.cloud.writeTextFile(name, content)
  ));
  ipcMain.handle('steam:cloud:listFiles', () => steamBridge.cloud.listFiles());

  ipcMain.handle('steam:achievements:unlock', (_event, id) => steamBridge.achievements.unlock(id));
  ipcMain.handle('steam:achievements:get', (_event, id) => steamBridge.achievements.get(id));
  ipcMain.handle('steam:achievements:list', () => steamBridge.achievements.list());

  ipcMain.handle('steam:stats:get', (_event, name) => steamBridge.stats.get(name));
  ipcMain.handle('steam:stats:set', (_event, name, value) => steamBridge.stats.set(name, value));
  ipcMain.handle('steam:stats:store', () => steamBridge.stats.store());
}

enableSteamOverlaySupport();

app.whenReady().then(() => {
  Menu.setApplicationMenu(null);
  registerSteamIpc();
  createMainWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createMainWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
