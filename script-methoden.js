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
const video = document.getElementById("scrollVideo");
const content = document.querySelector(".eyeTracking-content");

let lastScrollY = window.scrollY;
let isInView = false;

// Intersection Observer zum Erkennen, ob die Section im Viewport ist
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            isInView = true;
            content.style.opacity = "0"; // Text ausblenden
            video.style.opacity = "1"; // Video einblenden
        } else {
            isInView = false;
            content.style.opacity = "1"; // Text wieder einblenden
            video.style.opacity = "0"; // Video ausblenden
        }
    });
}, { threshold: 0.5 });

observer.observe(document.querySelector(".eyetracking-section"));

// Scroll-Event, um das Video mit der Scroll-Geschwindigkeit abzuspielen
window.addEventListener("scroll", () => {
    if (!isInView) return;

    let scrollSpeed = Math.abs(window.scrollY - lastScrollY) / 20;
    let scrollDirection = window.scrollY > lastScrollY ? "down" : "up";
    lastScrollY = window.scrollY;

    if (video.style.opacity === "1") {
        if (scrollDirection === "down") {
            video.currentTime = Math.min(video.duration, video.currentTime + scrollSpeed);
        } else {
            video.currentTime = Math.max(0, video.currentTime - scrollSpeed);
        }
    }
});
