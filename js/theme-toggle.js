document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) {
        console.error('Theme toggle button not found!');
        return;
    }

    const currentTheme = localStorage.getItem('theme') || 'dark';
    console.log('Loaded theme from localStorage:', currentTheme);

    themeToggleBtn.classList.remove('fa-moon', 'fa-sun');
    themeToggleBtn.classList.add(currentTheme === 'dark' ? 'fa-moon' : 'fa-sun');

    themeToggleBtn.addEventListener('click', () => {
        document.documentElement.classList.toggle('light-theme');
        document.documentElement.classList.toggle('dark-theme');

        const newTheme = document.documentElement.classList.contains('dark-theme') ? 'dark' : 'light';
        console.log('Switching to theme:', newTheme);

        localStorage.setItem('theme', newTheme);

        themeToggleBtn.classList.toggle('fa-moon');
        themeToggleBtn.classList.toggle('fa-sun');
    });
});