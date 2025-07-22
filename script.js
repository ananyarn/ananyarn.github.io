const toggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(mode) {
  if (mode === 'dark') {
    body.classList.add('dark');
    toggle.textContent = '🌙';
    localStorage.setItem('theme', 'dark');
  } else {
    body.classList.remove('dark');
    toggle.textContent = '🌞';
    localStorage.setItem('theme', 'light');
  }
}

// On load
const savedTheme = localStorage.getItem('theme') || 'dark'; // was 'light'
setTheme(savedTheme);

// Toggle on click
toggle.addEventListener('click', () => {
  const isDark = body.classList.contains('dark');
  setTheme(isDark ? 'light' : 'dark');
});

