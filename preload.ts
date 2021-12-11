import { ipcRenderer } from 'electron';

/*
ipcRenderer.on('remove-video', (event, arg) => {
    Array.from(document.getElementsByTagName('video'))
        .filter(element => element.getAttribute('src') === arg)
        .forEach(element => element.remove());
});
*/

const cssHideElementBySource = (src) => {
    const style = document.createElement('style');
    style.innerText = `
        img[src*=${src}] {
            display: none !important;
        }
    `;
    document.head.append(style);
}

ipcRenderer.on('remove-img', (event, arg) => {
    cssHideElementBySource(arg);
    /*
    Array.from(document.getElementsByTagName('img'))
        .filter(element => element.getAttribute('src') === arg)
        .forEach(element => element.remove());
    */
});

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) element.innerText = text;
    };

    for (const dependency of ['chrome', 'node', 'electron']) {
        replaceText(`${dependency}-version`, process.version[dependency]);
    }
});
