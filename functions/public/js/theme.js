const themeMap = {
  dark: "light",
  light: "solar",
  solar: "dark"
};

const theme =
  localStorage.getItem("theme") ||
  ((tmp = Object.keys(themeMap)[0]), localStorage.setItem("theme", tmp), tmp);
const bodyClass = document.body.classList;
bodyClass.add(theme);

function toggleTheme() {
  const current = localStorage.getItem("theme");
  const next = themeMap[current];
  switch (current) {
    case themeMap.dark:
      document.getElementById("logo-ico").src = "img/whiteLogoIco.png";
      break;
    case themeMap.light:
      document.getElementById("logo-ico").src = "img/lightLogoIco.png";
      break;
    case themeMap.solar:
      document.getElementById("logo-ico").src = "img/darkLogoIco.png";
      break;
    default:
      break;
  }
  bodyClass.replace(current, next);
  localStorage.setItem("theme", next);
}

document.getElementById("themeButton").onclick = toggleTheme;