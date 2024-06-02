async function fetchLatestNews() {
    const apiKey = 'pub_454899972b386ef52b118eaaa56c9a7953f17';
    const apiUrl = `https://newsdata.io/api/1/latest?apikey=${apiKey}&language=en`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        return data.results;
    } catch (error) {
        console.error('Error fetching news:', error);
        return [];
    }
}

function displayNews(newsList) {
    const newsContainer = document.getElementById('newsContainer');
    newsContainer.innerHTML = '';

    newsList.forEach(news => {
        const newsCard = document.createElement('div');
        newsCard.classList.add('card');
        newsCard.style.backgroundImage = `url(${news.image_url || 'https://via.placeholder.com/300x200'})`;

        const cardContent = document.createElement('div');
        cardContent.classList.add('card-content');

        const newsTitle = document.createElement('h3');
        newsTitle.textContent = news.title;

        const newsContent = document.createElement('p');
        newsContent.textContent = news.description || 'No description available';

        cardContent.appendChild(newsTitle);
        cardContent.appendChild(newsContent);
        newsCard.appendChild(cardContent);

        newsContainer.appendChild(newsCard);
    });
}

document.addEventListener('DOMContentLoaded', async () => {
    const latestNews = await fetchLatestNews();
    displayNews(latestNews);
});
