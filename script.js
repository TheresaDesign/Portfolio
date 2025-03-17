// Floating Words Animation
const floatingWords = document.querySelectorAll('.floating-words .button');
const designSection = document.querySelector('.design-experience');
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

// Initial positions
function setInitialPositions() {
    const sectionRect = designSection.getBoundingClientRect();
    const centerX = sectionRect.width / 2;
    const centerY = sectionRect.height / 2;
    
    floatingWords.forEach((word, index) => {
        const verticalOffset = index % 2 === 0 ? -50 : 50;
        const initialRadius = sectionRect.width * 0.1; // 10% der Sectionbreite
        
        const pos = calculatePosition(index, floatingWords.length, initialRadius, verticalOffset);
        
        word.style.left = `${centerX + pos.x - word.offsetWidth/2}px`;
        word.style.top = `${centerY + pos.y - word.offsetHeight/2}px`;
    });
}

// Beobachter für die Design-Section
const designSectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        isDesignSectionVisible = entry.isIntersecting;
        if (!isDesignSectionVisible) {
            // Behalte die letzte Position bei, wenn die Section nicht mehr sichtbar ist
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
    
    // Berechne den Scroll-Fortschritt basierend auf der Position der Section
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
    
    floatingWords.forEach((word, index) => {
        const verticalOffset = index % 2 === 0 ? -50 : 50;
        const minRadius = sectionRect.width * 0.1; // 10% der Sectionbreite
        const maxRadius = sectionRect.width * 0.15; // 15% der Sectionbreite
        const radius = minRadius + (lastScrollFactor * (maxRadius - minRadius));
        
        const pos = calculatePosition(index, floatingWords.length, radius, verticalOffset);
        word.style.transform = `translate(${pos.x}px, ${pos.y}px)`;
    });
});

// Initial setup
setInitialPositions();
window.addEventListener('resize', setInitialPositions);

// Project Cards Animation
const cards = document.querySelectorAll('.card');
const projectCards = document.querySelector('.project-cards');
const projectsSection = document.querySelector('.contents');

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
    const cardsWidth = projectCards.offsetWidth;
    return -(cardsWidth - containerWidth);
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
    projectCards.style.transform = `translateX(${offset}px)`;
});

// Aktualisiere die maximale Scroll-Distanz bei Größenänderungen
window.addEventListener('resize', () => {
    if (!shouldAnimate()) {
        projectCards.style.transform = 'translateX(0)';
    }
    calculateMaxScroll();
});

// Sticky Navigation
const nav = document.querySelector('.main-nav');
const navTop = nav.offsetTop;

window.addEventListener('scroll', () => {
    if (window.scrollY >= navTop) {
        document.body.style.paddingTop = nav.offsetHeight + 'px';
        nav.classList.add('fixed');
    } else {
        document.body.style.paddingTop = 0;
        nav.classList.remove('fixed');
    }
});
