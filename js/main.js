// Global o'zgaruvchilar
const defaultSearchTerm = "cat"; // Standart qidiruv so'zi
const accessKey = 'ZGpQwbGMxJJbZ4oV6pVSzEKnNvwQIkJuZpTdU9LUWOw'; // API kaliti
let page = 1; // Sahifa raqami

// HTML elementlarni olish
const formElement = document.querySelector('form');
const searchInput = document.querySelector('#search-input');
const cardsBlock = document.querySelector('.card-block');
const showBtn = document.querySelector('.btn-show');

// Asynchronous function
async function searchImages() {
    const dataImage = searchInput.value || defaultSearchTerm; // Foydalanuvchi kiritmasa default
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${dataImage}&client_id=${accessKey}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();

        const results = data.results;

        if (page === 1) {
            cardsBlock.innerHTML = ""; // Eski natijalarni tozalash
        }

        results.forEach((result) => {
            const imageWrapper = document.createElement('div');
            imageWrapper.classList.add('card');

            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description || "No description available";

            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = '_blank';
            imageLink.textContent = "Ba'tafsil";

            imageWrapper.appendChild(image);
            imageWrapper.appendChild(imageLink);
            cardsBlock.appendChild(imageWrapper);
        });

        page++;

        if (page > 1) {
            showBtn.style.display = 'block';
        }
    } catch (error) {
        console.error("Xatolik yuz berdi:", error);
    }
}

// Sahifa yuklanganda avtomatik chaqirish
window.onload = () => {
    searchImages();
};

// Foydalanuvchi qidiruv formasi
formElement.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1; // Qaytadan qidiruv
    searchImages();
});

// Ko'proq natijalar tugmasi
showBtn.addEventListener("click", () => {
    searchImages(); // Keyingi sahifani yuklash
});
