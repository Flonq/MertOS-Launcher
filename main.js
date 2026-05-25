const { app, BrowserWindow, shell } = require("electron");
const path = require("path");
const { pathToFileURL } = require("url");

const allowedExternalProtocols = new Set(["http:", "https:"]);

function isAllowedExternalUrl(url) {
  try {
    return allowedExternalProtocols.has(new URL(url).protocol);
  } catch {
    return false;
  }
}

function openExternalUrl(url) {
  if (isAllowedExternalUrl(url)) {
    shell.openExternal(url);
  }
}

function createWindow() {
  const indexPath = path.join(__dirname, "index.html");
  const indexUrl = pathToFileURL(indexPath).toString();

  const window = new BrowserWindow({
    width: 1200,
    height: 800,
    minWidth: 900,
    minHeight: 600,
    backgroundColor: "#050711",
    title: "MertOS Launcher",
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false
    }
  });

  window.webContents.setWindowOpenHandler(({ url }) => {
    openExternalUrl(url);
    return { action: "deny" };
  });

  window.webContents.on("will-navigate", (event, url) => {
    if (url === indexUrl) {
      return;
    }

    event.preventDefault();
    openExternalUrl(url);
  });

  window.loadFile(indexPath);
}

app.whenReady().then(() => {
  createWindow();

  app.on("activate", () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});