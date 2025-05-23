// Progress Bar
const progressBar = document.querySelector('.progress-bar');
window.addEventListener('scroll', () => {
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = (window.scrollY / windowHeight) * 100;
    progressBar.style.setProperty('--scroll', `${scrolled}%`);
});

// Intersection Observer for Sections
const sections = document.querySelectorAll('.project-section');
const sectionObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, sectionObserverOptions);

sections.forEach(section => {
    sectionObserver.observe(section);
});

// Parallax Effect for Hero Section
const heroSection = document.querySelector('.project-hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    heroSection.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Image Gallery Lightbox
const galleryImages = document.querySelectorAll('.design-gallery img');
galleryImages.forEach(image => {
    image.addEventListener('click', () => {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-content">
                <img src="${image.src}" alt="${image.alt}">
                <button class="close-lightbox">&times;</button>
            </div>
        `;
        document.body.appendChild(lightbox);

        const closeButton = lightbox.querySelector('.close-lightbox');
        closeButton.addEventListener('click', () => {
            lightbox.remove();
        });

        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.remove();
            }
        });
    });
});

// Smooth Scroll for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
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

// Lightbox functionality
const lightbox = document.querySelector('.lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const clickableImages = document.querySelectorAll('.bild');

function openLightbox(imageSrc, imageAlt) {
    lightboxImage.src = imageSrc;
    lightboxImage.alt = imageAlt;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden'; // Prevent scrolling when lightbox is open
}

function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = ''; // Restore scrolling
}

// Add click event to all images with class 'bild'
clickableImages.forEach(image => {
    image.addEventListener('click', () => {
        openLightbox(image.src, image.alt);
    });
});

// Close lightbox when clicking the close button
lightboxClose.addEventListener('click', closeLightbox);

// Close lightbox when clicking outside the image
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        closeLightbox();
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
}); 


//Bloom
    //einfliegen der Bilder 
    document.addEventListener("DOMContentLoaded", () => {
        const images = document.querySelectorAll(".recherche-images img");
        const section = document.querySelector(".fullscreen");
    
        function updateImageVisibility() {
            const rect = section.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            const visibleRatio = Math.max(0, Math.min(1, 1 - rect.top / viewportHeight));
    
            images.forEach((img, index) => {
                const threshold = (index + 1) / images.length;
                img.style.opacity = visibleRatio >= threshold ? "1" : "0";
            });
        }
    
        window.addEventListener("scroll", updateImageVisibility);
        updateImageVisibility(); // Initial aufrufen
    });

// Sound
const buttons = document.querySelectorAll(".play-button");

buttons.forEach(button => {
  const iconWrapper = button.querySelector(".icon");
  const playIcon = iconWrapper.querySelector(".play-icon");
  const pauseIcon = iconWrapper.querySelector(".pause-icon");
  const audio = button.parentElement.querySelector(".background-music");

  button.addEventListener("click", () => {
    if (audio.paused) {
      // Alle anderen Audios pausieren
      document.querySelectorAll(".background-music").forEach(otherAudio => {
        if (otherAudio !== audio) {
          otherAudio.pause();
          otherAudio.currentTime = 0;
          const otherButton = otherAudio.parentElement.querySelector(".play-button");
          const otherPlayIcon = otherButton.querySelector(".play-icon");
          const otherPauseIcon = otherButton.querySelector(".pause-icon");
          otherPlayIcon.style.display = "block";
          otherPauseIcon.style.display = "none";
        }
      });

      audio.play();
      playIcon.style.display = "none";
      pauseIcon.style.display = "block";
    } else {
      audio.pause();
      playIcon.style.display = "block";
      pauseIcon.style.display = "none";
    }
  });
});
