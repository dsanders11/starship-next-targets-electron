const { contextBridge, ipcRenderer } = require('electron')

async function getTheme() {
  return ipcRenderer.invoke('starship.theme.get')
}

async function setTheme(theme) {
  ipcRenderer.send('starship.theme.set', theme)
}

async function httpRequest(url) {
  return ipcRenderer.invoke('starship.http.request', url)
}

contextBridge.exposeInMainWorld(
  'starship',
  {
    http: {
      request: httpRequest
    },
    theme: {
      get: getTheme,
      set: setTheme,
    }
  }
)

window.onload = () => {
  const matcher = window.matchMedia('(prefers-color-scheme: dark)');
  document.documentElement.setAttribute('data-theme', matcher.matches ? 'dark' : 'light')
  matcher.addEventListener('change', (event) => {
    document.documentElement.setAttribute('data-theme', event.matches ? 'dark' : 'light')
  })
};

const css = `
  [data-theme='dark'] {
    color-scheme: only dark;
  }

  [data-theme='light'] {
    color-scheme: only light;
  }
`

window.addEventListener('DOMContentLoaded', () => {
  const style = document.createElement('style')
  document.head.appendChild(style)

  style.type = 'text/css'
  style.appendChild(document.createTextNode(css))
})
