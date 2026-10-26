const menuButton = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  menuButton.textContent = expanded ? '☰' : '✕';
  menu.classList.toggle('open', !expanded);
});
menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  menu.classList.remove('open');
  menuButton.setAttribute('aria-expanded', 'false');
  menuButton.textContent = '☰';
}));
const themeButton = document.querySelector('.theme-toggle');
themeButton.addEventListener('click', () => {
  const light = document.body.classList.toggle('light');
  themeButton.textContent = light ? '☾' : '☀';
  themeButton.setAttribute('aria-label', light ? 'Activer le thème sombre' : 'Activer le thème clair');
});
