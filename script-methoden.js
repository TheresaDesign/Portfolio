const content = document.getElementById("content");
const video = document.getElementById("scrollVideo");
const scrollContainer = document.querySelector(".scroll-container");

let lastScrollY = window.scrollY;
let isVideoVisible = false;

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    let scrollDirection = scrollY > lastScrollY ? "down" : "up";
    lastScrollY = scrollY;

    let rect = scrollContainer.getBoundingClientRect();
    let isInViewport = rect.top < window.innerHeight && rect.bottom > 0;

    if (isInViewport) {
        let threshold = window.innerHeight * 0.5; // Startpunkt ist die Mitte des Bildschirms

        if (rect.top < threshold && !isVideoVisible) {
            content.style.opacity = "0"; // Text & Bilder ausblenden
            video.style.opacity = "1"; // Video sichtbar machen
            isVideoVisible = true;
        } else if (rect.top > threshold && isVideoVisible) {
            content.style.opacity = "1"; // Text & Bilder einblenden
            video.style.opacity = "0"; // Video ausblenden
            isVideoVisible = false;
        }

        if (isVideoVisible) {
            let scrollSpeed = Math.abs(scrollY - lastScrollY) / 30;

            if (scrollDirection === "down") {
                video.currentTime = Math.min(video.duration, video.currentTime + scrollSpeed);
            } else {
                video.currentTime = Math.max(0, video.currentTime - scrollSpeed);
            }
        }
    }
});
