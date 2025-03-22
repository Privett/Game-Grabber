document.addEventListener('DOMContentLoaded', () => {
    const themeToggleBtn = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('theme') || 'dark';

    document.body.classList.add(`${currentTheme}-theme`);
    themeToggleBtn.classList.add(currentTheme === 'dark' ? 'fa-moon' : 'fa-sun');

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        document.body.classList.toggle('dark-theme');

        const newTheme = document.body.classList.contains('dark-theme') ? 'dark' : 'light';
        localStorage.setItem('theme', newTheme);

        themeToggleBtn.classList.toggle('fa-moon');
        themeToggleBtn.classList.toggle('fa-sun');
    });
});