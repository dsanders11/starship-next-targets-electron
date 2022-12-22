const {ipcMain, nativeTheme, BrowserWindow} = require('electron')
const path = require('path')

const _starship = require('./_starship')
export const { http_request } = _starship

let theme = nativeTheme.themeSource;

ipcMain.handle('starship.theme.get', async () => {
  if (theme === 'system') return 'auto'
  return theme
})

ipcMain.on('starship.theme.set', async (event, newTheme) => {
  if (newTheme === 'auto') {
      nativeTheme.themeSource = 'system'
  } else {
      nativeTheme.themeSource = newTheme
  }

  theme = newTheme
})

ipcMain.handle('starship.http.request', async (event, url) => {
  return http_request(url)
})

export class Window {
    constructor(options) {
        return new BrowserWindow({
            ...options,
            webPreferences: {
                ...options.webPreferences,
                preload: path.join(__dirname, 'preload.js')
            }
        })
    }

    static getAllWindows () {
      return BrowserWindow.getAllWindows()
    }
}
