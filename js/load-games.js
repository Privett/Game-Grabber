document.addEventListener('DOMContentLoaded', () => {
    const apiUrl = "https://api.gamegrabber.xyz/free-games/cors";
    const gameCardsContainer = document.getElementById('game-cards-container');

    if (!gameCardsContainer) {
        console.error('Game cards container not found!');
        return;
    }

    console.log('Fetching games from API:', apiUrl);

    fetch(apiUrl)
        .then(response => {
            console.log('API response status:', response.status);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Data received from API:', data);
            const games = [...data.gog, ...data.epic_games, ...data.steam];
            console.log('Combined games array:', games);

            games.forEach(game => {
                const gameCard = document.createElement('div');
                gameCard.classList.add('game-card');

                if (game.url) {
                    gameCard.setAttribute('data-url', game.url);
                }

                const gameImage = document.createElement('img');
                gameImage.src = game.image_url;
                gameImage.alt = game.title;

                const gameTitle = document.createElement('h3');
                gameTitle.textContent = game.title;

                const gameDescription = document.createElement('p');
                gameDescription.textContent = game.description || 'No description available';

                const platform = document.createElement('div');
                platform.classList.add('platform');

                if (data.gog.includes(game)) {
                    platform.textContent = 'Available on: GOG';
                } else if (data.epic_games.includes(game)) {
                    platform.textContent = 'Available on: Epic Games';
                } else if (data.steam.includes(game)) {
                    platform.textContent = 'Available on: Steam';
                }

                gameCard.appendChild(gameImage);
                gameCard.appendChild(gameTitle);
                gameCard.appendChild(gameDescription);
                gameCard.appendChild(platform);

                gameCardsContainer.appendChild(gameCard);
            });

            const currentTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.classList.remove('light-theme', 'dark-theme');
            document.documentElement.classList.add(`${currentTheme}-theme`);

            const gameCards = document.querySelectorAll('.game-card');
            gameCards.forEach(card => {
                card.addEventListener('click', () => {
                    const gameUrl = card.getAttribute('data-url');
                    if (gameUrl) {
                        window.open(gameUrl, '_blank');
                    }
                });
            });
        })
        .catch(error => console.error('Error fetching games:', error));
});
