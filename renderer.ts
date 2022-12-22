function getTheme() {
  starship.theme.get().then((currentTheme) => {
    document.getElementById("current-theme")!.innerHTML = currentTheme;
  }).catch((error) => {
    throw error;
  });
}

document.getElementById("theme-dark")!.onclick = function () {
  return starship.theme.set('dark').then(getTheme);
};

document.getElementById("theme-light")!.onclick = function () {
  return starship.theme.set('light').then(getTheme);
};

document.getElementById("theme-auto")!.onclick = function () {
  return starship.theme.set('auto').then(getTheme);
};

getTheme();

document.getElementById("send-request")!.onclick = async function () {
  (document.getElementById("send-request")! as HTMLButtonElement).disabled = true;
  (document.getElementById("request-url")! as HTMLInputElement).disabled = true;
  try {
    const response = await starship.http.request((document.getElementById("request-url")! as HTMLInputElement).value);
    (document.getElementById("request-response")! as HTMLTextAreaElement).value = response;
  } finally {
    (document.getElementById("send-request")! as HTMLButtonElement).disabled = false;
    (document.getElementById("request-url")! as HTMLInputElement).disabled = false;
  }
};
