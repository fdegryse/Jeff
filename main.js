var path     = require('path');
var url      = require('url');
var electron = require('electron');

var app = electron.app;
var mainWindow = null;
var debug = false;

function createWindow () {
	mainWindow = new electron.BrowserWindow({ width: 600, height: 600, show:debug });

	mainWindow.loadURL(url.format({
		pathname: path.join(__dirname, 'app/index.html'),
		protocol: 'file:',
		slashes:  true
	}));

	if (debug) {
		mainWindow.webContents.openDevTools();
	}

	mainWindow.webContents.on('did-finish-load', function onReady() {
		mainWindow.webContents.send('argv', JSON.stringify(process.argv));
	});

	mainWindow.on('closed', function onClosed() {
		mainWindow = null;
	});
}

exports.quit = function () {
	if (!debug) {
		app.quit();
	}
	mainWindow = null;
}

app.on('ready', createWindow);

app.on('window-all-closed', function () {
	app.quit();
});

app.on('activate', function () {
	if (mainWindow === null) createWindow();
});