 //header mobile
 const burger = document.getElementById('burger');
 const nav = document.getElementById('mobileNav');
 
 burger.addEventListener('click', (e) => {
   e.stopPropagation(); // verhindert, dass das "document"-Event feuert
   burger.classList.toggle('active');
   nav.classList.toggle('active');
 });
 
 document.addEventListener('click', (e) => {
   const isClickInsideNav = nav.contains(e.target);
   const isClickOnBurger = burger.contains(e.target);
 
   if (!isClickInsideNav && !isClickOnBurger) {
     burger.classList.remove('active');
     nav.classList.remove('active');
   }
 });

 //hero
 document.addEventListener('DOMContentLoaded', () => {
    const hero = document.querySelector('.hero');
    const heroContent = document.querySelector('.hero-content');
    const heroText = document.querySelector('.hero-text');
    const heroImages = document.querySelector('.hero-images');
    const scrollContainer = document.querySelector('.scroll-container');
  
    window.addEventListener('scroll', () => {
      const scrollTop = window.scrollY;
      const viewportHeight = window.innerHeight;
      const containerOffsetTop = scrollContainer.offsetTop;
      const progress = Math.min(Math.max((scrollTop - containerOffsetTop) / viewportHeight, 0), 1);
  
      // Elemente bewegen
      heroText.style.transform = `translateX(-${progress * 150}%)`;
      heroImages.style.transform = `translate(-50%, ${progress * 150}%)`;
  
      // Inhalt ausblenden
      heroContent.style.opacity = 1 - progress;
  
      // Hintergrundfarbe ausblenden
      const backgroundAlpha = 1 - progress;
      hero.style.backgroundColor = `rgba(255, 255, 255, ${backgroundAlpha})`; // Hier Farbe anpassen, falls dein Hintergrund anders ist
    });
  });
  
  
 // Floating Words Animation
const designSection = document.querySelector('.design-experience');
if (designSection) {
    const floatingWords = document.querySelectorAll('.floating-words .property');
    let isDesignSectionVisible = false;
    let lastScrollY = window.pageYOffset;
    let lastScrollFactor = 0;

    // Funktion zum Berechnen der Position
    function calculatePosition(index, total, radius, offsetY = 0) {
        const angle = (index / total) * Math.PI * 2;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius + offsetY
        };
    }

    // Berechne die maximale sichere Distanz basierend auf der Bildschirmbreite
    function calculateSafeRadius(sectionWidth) {
        // Auf mobilen Geräten kleinerer Radius
        if (window.innerWidth < 768) {
            return sectionWidth * 0.1; // Reduzierter Radius für mobile Geräte
        }
        // Auf Desktop-Geräten größerer Radius
        return sectionWidth * 0.15; // Reduzierter Radius für Desktop
    }

    // Initial positions
    function setInitialPositions() {
        const sectionRect = designSection.getBoundingClientRect();
        const centerX = sectionRect.width / 2;
        const centerY = sectionRect.height / 2;
        const safeRadius = calculateSafeRadius(sectionRect.width);
        
        floatingWords.forEach((word, index) => {
            // Berechne den vertikalen Offset basierend auf der Bildschirmbreite
            const verticalOffset = window.innerWidth < 768 
                ? (index % 2 === 0 ? -20 : 20)  // Noch kleinere Abstände auf mobil
                : (index % 2 === 0 ? -30 : 30);  // Kleinere Abstände auf Desktop
            
            // Berechne die Position
            const pos = calculatePosition(index, floatingWords.length, safeRadius * 0.1, verticalOffset);
            
            // Setze die Position
            word.style.left = `${centerX + pos.x - word.offsetWidth/2}px`;
            word.style.top = `${centerY + pos.y - word.offsetHeight/2}px`;
        });
    }

    // Beobachter für die Design-Section
    const designSectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            isDesignSectionVisible = entry.isIntersecting;
            if (!isDesignSectionVisible) {
                lastScrollFactor = entry.boundingClientRect.top < 0 ? 1 : 0;
            }
        });
    }, {
        threshold: 0.2
    });

    designSectionObserver.observe(designSection);

    // Animate words on scroll
    window.addEventListener('scroll', () => {
        const currentScrollY = window.pageYOffset;
        const scrollingDown = currentScrollY > lastScrollY;
        lastScrollY = currentScrollY;

        if (!isDesignSectionVisible) return;

        const sectionRect = designSection.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        
        // Berechne den Scroll-Fortschritt
        let scrollProgress = (window.innerHeight - sectionTop) / (window.innerHeight + sectionHeight);
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Aktualisiere den scrollFactor basierend auf der Scrollrichtung
        if (scrollingDown) {
            lastScrollFactor = scrollProgress;
        } else {
            lastScrollFactor = 1 - scrollProgress;
        }
        
        const centerX = sectionRect.width / 2;
        const centerY = sectionRect.height / 2;
        const safeRadius = calculateSafeRadius(sectionRect.width);
        
        floatingWords.forEach((word, index) => {
            // Berechne den vertikalen Offset basierend auf der Bildschirmbreite
            const verticalOffset = window.innerWidth < 768 
                ? (index % 2 === 0 ? -20 : 20)
                : (index % 2 === 0 ? -30 : 30);
            
            // Berechne die Radien für die Animation
            const minRadius = safeRadius * 0.3; // Start näher an der Mitte
            const maxRadius = safeRadius;
            const radius = minRadius + (lastScrollFactor * (maxRadius - minRadius));
            
            // Berechne und wende die Position an
            const pos = calculatePosition(index, floatingWords.length, radius, verticalOffset);
            word.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
        });
    });

    // Initial setup und Resize Handler
    setInitialPositions();
    window.addEventListener('resize', () => {
        setInitialPositions();
        if (!isDesignSectionVisible) {
            floatingWords.forEach(word => {
                word.style.transform = 'translate(0, 0)';
            });
        }
    });
}

// Project Cards Animation
const projectCardsContainer = document.querySelector('.project-cards');
if (projectCardsContainer) {
    const cards = document.querySelectorAll('.card');
    const projectsSection = document.querySelector('.projects');

    let lastProjectScrollY = window.pageYOffset;
    let isScrolling = false;

    // Überprüfe, ob die Animation aktiviert werden soll
    function shouldAnimate() {
        return window.innerWidth > 768;
    }

    // Berechne die maximale Scroll-Distanz
    function calculateMaxScroll() {
        if (!shouldAnimate()) return 0;
        const containerWidth = window.innerWidth;
        const cardsWidth = projectCardsContainer.scrollWidth;
        const maxScroll = -(cardsWidth - containerWidth);
        return Math.min(0, maxScroll);
    }

    window.addEventListener('scroll', () => {
        if (isScrolling || !shouldAnimate()) return;
        
        const currentScrollY = window.pageYOffset;
        const scrollDirection = currentScrollY > lastProjectScrollY ? 1 : -1;
        lastProjectScrollY = currentScrollY;
        
        const sectionRect = projectsSection.getBoundingClientRect();
        const sectionTop = sectionRect.top;
        const sectionHeight = sectionRect.height;
        
        // Berechne den Scroll-Fortschritt basierend auf der Position der Section
        let scrollProgress = (window.innerHeight - sectionTop) / (window.innerHeight + sectionHeight);
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));
        
        // Berechne die maximale Verschiebung
        const maxOffset = calculateMaxScroll();
        
        // Berechne die aktuelle Verschiebung basierend auf dem Scroll-Fortschritt
        const offset = maxOffset * scrollProgress;
        
        // Wende die Transformation an
        requestAnimationFrame(() => {
            projectCardsContainer.style.transform = `translateX(${offset}px)`;
            projectCardsContainer.style.webkitTransform = `translateX(${offset}px)`;
        });
    });

    // Aktualisiere die maximale Scroll-Distanz bei Größenänderungen
    window.addEventListener('resize', () => {
        if (!shouldAnimate()) {
            projectCardsContainer.style.transform = 'translateX(0)';
            projectCardsContainer.style.webkitTransform = 'translateX(0)';
        }
        calculateMaxScroll();
    });
}

// Project Filtering
const filterButtons = document.querySelectorAll('.filter-btn');
if (filterButtons.length > 0) {
    const projectCardsGrid = document.querySelectorAll('.projects-grid .card');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            const filterValue = button.getAttribute('data-filter');
            
            // Toggle active state
            button.classList.toggle('active');
            
            // Get all active filters
            const activeFilters = Array.from(filterButtons)
                .filter(btn => btn.classList.contains('active'))
                .map(btn => btn.getAttribute('data-filter'));
            
            projectCardsGrid.forEach(card => {
                if (activeFilters.length === 0) {
                    // If no filters are active, show all cards
                    card.style.display = 'block';
                } else {
                    // Check if card matches any of the active filters
                    const tags = card.querySelectorAll('.tag');
                    const hasMatchingTag = Array.from(tags).some(tag => 
                        activeFilters.some(filter => tag.classList.contains(filter))
                    );
                    card.style.display = hasMatchingTag ? 'block' : 'none';
                }
            });
        });
    });
}

//ladezeit Videos
document.addEventListener("DOMContentLoaded", function () {
    let videos = document.querySelectorAll("video");
    let observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let video = entry.target;
                video.load();
                observer.unobserve(video);
            }
        });
    });

    videos.forEach(video => observer.observe(video));
});
