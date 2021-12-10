import { app, BrowserWindow } from 'electron';
import path from 'path';

const createWindow = () => {
    const window = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(app.getAppPath(), 'preload.js')
        }
    });
    window.loadURL('https://www.naver.com');
    return window;
};

app.whenReady().then(() => {
    let window = createWindow();
    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) {
            window = createWindow();
        }
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
