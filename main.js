const { app, BrowserWindow, globalShortcut } = require('electron')
const config = require('./config')

let win = null
let web = null

function createWindow () {
  // Create a window navigation.
    win = new BrowserWindow({
    width: config.width,
    height: config.height,
    titleBarStyle: 'hidden',
    alwaysOnTop: true,
    webPreferences: {
      nodeIntegration: true
    }
  })

  // and load the URL or index.html of the app.
  win.loadURL(config.url)

  web = win.webContents

}

function toggleDevTools(){
    web.toggleDevTools()
}

// Create a shortcut to open DevTools
function createShortcuts(){
    globalShortcut.register('CmdorCtrl+J', toggleDevTools)
}


// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady()
.then(createWindow)
.then(createShortcuts)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On MacOS it is common for applications and their menu bar  
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// In this file you can include the rest of your app's specific main process
// code. Você também pode colocar eles em arquivos separados e requeridos-as aqui.