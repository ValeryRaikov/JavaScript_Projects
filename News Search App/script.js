const apiKey = '86d9a3c7ac704f16b02f0e64f3cc7b74';

const countryOptionElement = document.getElementById('country');
const blogContainerElement = document.getElementById('blog-container');
blogContainerElement.classList.add('obj-width');
const searchInputElement = document.getElementById('search-input');
const searchButtonElement = document.getElementById('search-button');

searchButtonElement.addEventListener('click', async () => {
    const userQuery = searchInputElement.value.trim();

    if (userQuery !== '') {
        try {
            const articles = await fetchNewsByQuery(userQuery);
            displayBlogs(articles);
        } catch (err) {
            console.error(`Error fetching data for [${userQuery}].`, err);
        }
    }
});

async function fetchRandomNews() {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&pageSize=10&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Could not find the requested page.');
            }

            throw new Error('Error with API.');
        }

        const data = await response.json();
        return data.articles;
    } catch (err) {
        console.error('Error fetching random news.', err);
        return [];
    }
}

async function fetchNewsByQuery(query) {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&pageSize=10&sortBy=publishedAt&apiKey=${apiKey}`;

    try {
        const response = await fetch(apiUrl);

        if (!response.ok) {
            if (response.status === 404) {
                throw new Error('Could not find the requested page.');
            }

            throw new Error('Error with API.');
        }

        const data = await response.json();
        return data.articles;
    } catch (err) {
        console.error('Error fetching random news.', err);
        return [];
    }
}

function displayBlogs(articles) {
    blogContainerElement.innerHTML = '';

    articles.forEach(article => {
        const imageElement = document.createElement('img');
        imageElement.src = article.urlToImage;
        imageElement.alt = article.title;

        const titleElement = document.createElement('h2');
        const truncatedArticle = article.title.length > 30 ? article.title.slice(0, 30) + '...' : article.title;
        titleElement.textContent = truncatedArticle;

        const descriptionElement = document.createElement('p');
        const truncatedDescription = article.description && article.description.length > 100 ? article.description.slice(0, 100) + '...' : article.description;
        descriptionElement.textContent = truncatedDescription;

        const blogCardElement = document.createElement('div');
        blogCardElement.classList.add('blog-card');
        blogCardElement.appendChild(imageElement);
        blogCardElement.appendChild(titleElement);
        blogCardElement.appendChild(descriptionElement);
        blogCardElement.addEventListener('click', () => {
            window.open(article.url, '_blank');
        });

        blogContainerElement.appendChild(blogCardElement);
    });
}

(async () => {
    try {
        const articles = await fetchRandomNews();
        displayBlogs(articles);
    } catch (err) {
        console.error('Error fetching random news.', err);
    }
})();
