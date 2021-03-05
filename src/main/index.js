'use strict'

import { app, BrowserWindow, ipcMain } from 'electron'

/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    minWidth:894,
    minHeight:611,
    height: 601,
    useContentSize: true,
    width: 1060,
    frame: false,
    titleBarStyle: 'hidden',
    transparent: true,
    hasShadow: false
  })

  // TODO: windows OS specific feature
  ipcMain.on('min', () => {
    mainWindow.minimize()
  })

  // TODO: windowMaximized shouldn't only be changed by button
  let windowMaximized = false
  ipcMain.on('max', () => {
    if (windowMaximized) {
      console.log('max')
      windowMaximized = false
      /*
      TODO: window size should be determined by size before maximize rather than
            a hard-coded size
      */
      mainWindow.setSize(1060, 601)
      mainWindow.center()
    } else {
      windowMaximized = true
      mainWindow.maximize()
    }

  })
  ipcMain.on('close', () => {
    mainWindow.close()
  })
  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })

  // send window height
  mainWindow.on('resize', () => {
    mainWindow.webContents.send('window-resize', mainWindow.getSize())
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

/**
 * Auto Updater
 *
 * Uncomment the following code below and install `electron-updater` to
 * support auto updating. Code Signing with a valid certificate is required.
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-electron-builder.html#auto-updating
 */

/*
import { autoUpdater } from 'electron-updater'

autoUpdater.on('update-downloaded', () => {
  autoUpdater.quitAndInstall()
})

app.on('ready', () => {
  if (process.env.NODE_ENV === 'production') autoUpdater.checkForUpdates()
})
 */

