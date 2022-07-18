const { app, BrowserWindow, ipcMain } = require("electron");
const ipc = ipcMain;
const path = require("path");

if (require("electron-squirrel-startup")) {
	app.quit();
}

const createWindow = () => {
	const mainWindow = new BrowserWindow({
		width: 1280,
		height: 840,
		frame: false,
		webPreferences: {
			preload: path.join(__dirname, "preload.js"),
			nodeIntegration: true,
			contextIsolation: false,
		},
	});

	mainWindow.loadFile(path.join(__dirname, "index.html"));
	mainWindow.webContents.openDevTools();

	ipc.on("minimizeApp", () => {
		mainWindow.minimize();
	});

	ipc.on("maximizeApp", () => {
		if (mainWindow.isMaximized()) {
			mainWindow.restore();
		} else {
			mainWindow.maximize();
		}
	});

	ipc.on("closeApp", () => {
		mainWindow.close();
	});
};

app.on("ready", createWindow);

app.on("window-all-closed", () => {
	if (process.platform !== "darwin") {
		app.quit();
	}
});

app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});
