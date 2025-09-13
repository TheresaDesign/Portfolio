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


//pdf view
const openBtn = document.getElementById("openPdf");
    const overlay = document.getElementById("pdfOverlay");
    const closeBtn = document.getElementById("closeOverlay");

    openBtn.addEventListener("click", () => {
      overlay.style.display = "flex";
    });

    closeBtn.addEventListener("click", () => {
      overlay.style.display = "none";
    });

    // Overlay schließen, wenn man ins Schwarze klickt
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.style.display = "none";
      }
    });

// SofaSoGood
(function(){
  // script startet erst nach DOMContentLoaded, um race-conditions zu vermeiden
  document.addEventListener('DOMContentLoaded', function pd_init() {
    // eindeutig benannte Variablen, um Konflikte mit deiner Seite zu vermeiden
    const pd_slideEls = Array.from(document.querySelectorAll('.pd-right .pd-slide'));
    const pd_prevBtn   = document.querySelector('.pd-right .pd-prev');
    const pd_nextBtn   = document.querySelector('.pd-right .pd-next');
    const pd_counterEl = document.querySelector('.pd-right .pd-counter');
    const pd_wrapper   = document.querySelector('.pd-right');

    // safety checks
    if (!pd_wrapper || !pd_prevBtn || !pd_nextBtn) {
      console.warn('Pitchdeck: wichtige Elemente fehlen (pd-right, prev, next).');
      return;
    }
    if (pd_slideEls.length === 0) {
      // wenn keine Slides vorhanden sind, Hinweis im DOM + Konsole
      const pd_placeholder = document.createElement('div');
      pd_placeholder.textContent = 'Keine Slides gefunden. Bitte leg Dateien wie slide-1.png in denselben Ordner.';
      pd_placeholder.style.padding = '24px';
      pd_placeholder.style.background = '#fff';
      pd_placeholder.style.borderRadius = '10px';
      pd_placeholder.style.boxShadow = '0 6px 18px rgba(0,0,0,0.06)';
      pd_wrapper.appendChild(pd_placeholder);
      console.warn('Pitchdeck: keine .pd-slide Elemente gefunden.');
      return;
    }

    let pd_currentIndex = 0;

    function pd_show(index) {
      // wrap-around
      if (index < 0) index = pd_slideEls.length - 1;
      index = index % pd_slideEls.length;
      pd_slideEls.forEach(el => el.classList.remove('pd-active'));
      const elToShow = pd_slideEls[index];
      if (elToShow) elToShow.classList.add('pd-active');
      pd_currentIndex = index;
      if (pd_counterEl) pd_counterEl.textContent = (pd_currentIndex + 1) + ' / ' + pd_slideEls.length;
    }

    // events
    pd_prevBtn.addEventListener('click', function pd_prevHandler(e){
      e.preventDefault();
      pd_show(pd_currentIndex - 1);
    });
    pd_nextBtn.addEventListener('click', function pd_nextHandler(e){
      e.preventDefault();
      pd_show(pd_currentIndex + 1);
    });

    // Pfeiltasten-Navigation (nur wenn nicht in einem input/textarea)
    document.addEventListener('keydown', function pd_keyHandler(e){
      const tag = (document.activeElement && document.activeElement.tagName) || '';
      if (tag === 'INPUT' || tag === 'TEXTAREA') return;
      if (e.key === 'ArrowLeft') pd_show(pd_currentIndex - 1);
      else if (e.key === 'ArrowRight') pd_show(pd_currentIndex + 1);
    });

    // Touch/Swipe (einfacher Threshold)
    let pd_touchStartX = null;
    pd_wrapper.addEventListener('touchstart', function pd_touchStart(e){
      pd_touchStartX = e.changedTouches[0].clientX;
    }, {passive:true});
    pd_wrapper.addEventListener('touchend', function pd_touchEnd(e){
      if (pd_touchStartX === null) return;
      const pd_touchEndX = e.changedTouches[0].clientX;
      const pd_dx = pd_touchEndX - pd_touchStartX;
      const pd_threshold = 40; // min px to register swipe
      if (pd_dx > pd_threshold) pd_show(pd_currentIndex - 1);
      else if (pd_dx < -pd_threshold) pd_show(pd_currentIndex + 1);
      pd_touchStartX = null;
    }, {passive:true});

    // optional: klick auf aktuelle Folie -> nächste Folie
    pd_slideEls.forEach(slide => {
      slide.style.cursor = 'pointer';
      slide.addEventListener('click', () => pd_show(pd_currentIndex + 1));
    });

    // initial render
    pd_show(0);
  }); // DOMContentLoaded
})(); // IIFE