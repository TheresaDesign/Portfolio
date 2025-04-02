// Scrollama-Instanz erstellen
const scroller = scrollama();

const content = document.getElementById("content");
const video = document.getElementById("scrollVideo");

let lastScrollY = window.scrollY;
let isVideoVisible = false;

// Scrollama konfigurieren
scroller
    .setup({
        step: ".scroll-container", // Wann soll es aktiv werden?
        offset: 0.5, // Sobald 50% des Containers sichtbar sind
        debug: false,
    })
    .onStepEnter(() => {
        content.style.opacity = "0"; // Text & Bilder ausblenden
        video.style.opacity = "1"; // Video sichtbar machen
        isVideoVisible = true;
    })
    .onStepExit(() => {
        content.style.opacity = "1"; // Text & Bilder wieder einblenden
        video.style.opacity = "0"; // Video ausblenden
        isVideoVisible = false;
    });

// Scroll-Event für Video
window.addEventListener("scroll", () => {
    if (isVideoVisible) {
        let scrollY = window.scrollY;
        let scrollDirection = scrollY > lastScrollY ? "down" : "up";
        lastScrollY = scrollY;
        let scrollSpeed = Math.abs(scrollY - lastScrollY) / 30;

        if (scrollDirection === "down") {
            video.currentTime = Math.min(video.duration, video.currentTime + scrollSpeed);
        } else {
            video.currentTime = Math.max(0, video.currentTime - scrollSpeed);
        }
    }
});





// Image Gallery Navigation
const mainImage = document.getElementById('mainImage');
const thumbnails = document.querySelectorAll('.thumbnail');
const prevButton = document.querySelector('.nav-button.prev');
const nextButton = document.querySelector('.nav-button.next');
let currentIndex = 0;

function updateMainImage(index) {
    const thumbnail = thumbnails[index];
    mainImage.src = thumbnail.dataset.full;
    mainImage.alt = thumbnail.alt;
    
    // Update active state
    thumbnails.forEach(thumb => thumb.classList.remove('active'));
    thumbnail.classList.add('active');
    
    currentIndex = index;
}

// Thumbnail click handler
thumbnails.forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
        updateMainImage(index);
    });
});

// Navigation buttons
prevButton.addEventListener('click', () => {
    const newIndex = (currentIndex - 1 + thumbnails.length) % thumbnails.length;
    updateMainImage(newIndex);
});

nextButton.addEventListener('click', () => {
    const newIndex = (currentIndex + 1) % thumbnails.length;
    updateMainImage(newIndex);
});

// Keyboard navigation
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        prevButton.click();
    } else if (e.key === 'ArrowRight') {
        nextButton.click();
    }
});