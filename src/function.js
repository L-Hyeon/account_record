const { ipcRenderer } = require('electron');
const ipc = ipcRenderer;

var btnMin = document.getElementById("win-minimize");
var btnMax = document.getElementById("win-maximize");
var btnClose = document.getElementById("win-close");

btnMin.addEventListener("click", ()=>{
    ipc.send('minimizeApp');
});
btnMax.addEventListener("click", ()=>{
    ipc.send('maximizeApp');
});
btnClose.addEventListener("click", ()=>{
    ipc.send('closeApp');
});