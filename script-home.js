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