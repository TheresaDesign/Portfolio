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

document.addEventListener("DOMContentLoaded", function () {
    const video = document.getElementById('scrollVideo');
    const section = document.querySelector('.eyetracking-section');

    // Video unsichtbar machen, bis es scrollt
    video.style.opacity = "0";

    let lastScrollY = window.scrollY;
    let isPlaying = false;

    window.addEventListener('scroll', () => {
        const rect = section.getBoundingClientRect();
        const sectionTop = rect.top;
        const sectionBottom = rect.bottom;
        const windowHeight = window.innerHeight;

        // Check if the section is at the top of the viewport
        if (sectionTop <= 0 && sectionBottom > windowHeight * 0.2) {
            // Wenn das Video noch nicht sichtbar ist, zeigen wir es an
            if (video.style.opacity === "0") {
                video.style.opacity = "1";
            }

            // Video spielt je nach Scrollrichtung
            const scrollSpeed = Math.abs(window.scrollY - lastScrollY) / 20;
            const scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
            lastScrollY = window.scrollY;

            if (scrollDirection === "down" && video.currentTime < video.duration) {
                video.currentTime = Math.min(video.duration, video.currentTime + scrollSpeed);
                if (!isPlaying) {
                    video.play();
                    isPlaying = true;
                }
            } else if (scrollDirection === "up" && video.currentTime > 0) {
                video.currentTime = Math.max(0, video.currentTime - scrollSpeed);
                if (!isPlaying) {
                    video.play();
                    isPlaying = true;
                }
            }
        } else {
            // Video stoppen, wenn es nicht sichtbar ist oder wenn 90% der Section durchgescrollt ist
            video.pause();
            video.style.opacity = "0";
            isPlaying = false;
        }

        // Wenn 90% der Section durchgescrollt ist, Video ausblenden
        const scrollProgress = 1 - (sectionBottom / windowHeight);
        if (scrollProgress > 0.4) {
            video.style.opacity = "0";
            video.pause();
            isPlaying = false;
        }
    });
});


