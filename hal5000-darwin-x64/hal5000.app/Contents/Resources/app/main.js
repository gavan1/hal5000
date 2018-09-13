const { app, BrowserWindow } = require('electron');
const url = require('url');
const path = require('path');
let win;


function createWindow () {

  app.server = require(__dirname + '/app')();

  win = new BrowserWindow({
    width: 800, 
    height: 600,
    backgroundColor: '#ffffff',
   // frame:"false",
    titleBarStyle: 'hidden',
    icon: path.join(__dirname, '/src/assets/hal-icon.icns')
    
  })
  win.loadURL('http://localhost:5000');
 
//   win.loadURL(url.format({
//     pathname: path.join(__dirname, 'dist/hal5000/index.html'),
//     protocol: 'file:',
//     slashes: true
// })) 

win.focus();


  //// uncomment below to open the DevTools.
   //win.webContents.openDevTools()
  win.on('closed', function () {
    win = null
  })
}


app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', function () {

  // On macOS specific close process
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  // macOS specific close process
  if (win === null) {
    createWindow()
  }
})