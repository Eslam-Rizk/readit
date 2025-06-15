const html = document.documentElement;

export function applyTheme() {
  const theme = localStorage.getItem("theme");
  if (theme) {
    html.setAttribute("data-theme", theme);
  }
  else{
    html.setAttribute("data-theme", "halloween");
    localStorage.setItem("theme", "halloween");
  }
}

export function toggleTheme() {
  if (localStorage.getItem("theme") === "dark") {
    html.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
  } else if (localStorage.getItem("theme") === "light") {
    html.setAttribute("data-theme", "cupcake");
    localStorage.setItem("theme", "cupcake");
  } else {
    html.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
  }
  return html.getAttribute("data-theme");
}

export function changeTheme(theme) {
  html.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);
}
