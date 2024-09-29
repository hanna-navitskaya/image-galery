const apiKey = 'SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo';
const searchInput = document.querySelector('.search-input');
const clearBtn = document.querySelector('.clear-btn');
const imagesContainer = document.querySelector('.images-container');

const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const closeModalBtn = document.getElementById('close-modal');

const DEFAULT_QUERY = 'nature';

document.addEventListener('DOMContentLoaded', () => {
    searchInput.focus();
    fetchImages(DEFAULT_QUERY);
});

searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        fetchImages(searchInput.value || DEFAULT_QUERY);
    }
});

clearBtn.addEventListener('click', () => {
    if (searchInput.value) {
        searchInput.value = '';
        searchInput.focus();
        fetchImages(DEFAULT_QUERY);
    }
});

async function fetchImages(query) {
    try {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${query}&per_page=24&client_id=${apiKey}`);
        const data = await response.json();
        displayImages(data.results);
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

function displayImages(images) {
    imagesContainer.innerHTML = '';

    images.forEach(image => {
        const imageWrapper = document.createElement('div');
        imageWrapper.classList.add('image-wrapper');

        const imgElement = document.createElement('img');
        imgElement.src = image.urls.small;
        imgElement.alt = image.alt_description || 'Image from Unsplash';

        imgElement.addEventListener('click', () => {
            openModal(image.urls.full);
        });

        imageWrapper.appendChild(imgElement);
        imagesContainer.appendChild(imageWrapper);
    });

    function openModal(imageUrl) {
        modal.style.display = 'flex';
        modalImg.src = imageUrl;
    }

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
}
