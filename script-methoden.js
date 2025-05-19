const chapters = document.querySelectorAll('.chapter');
const menuContainer = document.querySelector('.menu-container');
const sections = document.querySelectorAll('section');

// Offset für die Transformation
const transformationOffset = 850;

window.addEventListener('scroll', () => {
  const scrollPos = window.scrollY;

  if (scrollPos > transformationOffset) {
    menuContainer.classList.add('fixed');

    chapters.forEach((chapter, index) => {
      setTimeout(() => {
        const targetId = chapter.getAttribute('data-target');
        const targetSection = document.getElementById(targetId);
        const color = chapter.getAttribute('data-color'); // Farbe holen

        if (!targetSection) {
          console.warn(`Kein Abschnitt gefunden mit der ID: ${targetId}`);
          return;
        }

        const sectionHeight = targetSection.scrollHeight;

        // Verwandlung in Balken
        chapter.classList.add('balken');
        chapter.style.height = `${sectionHeight / 10}px`;
        chapter.style.opacity = '1';
        chapter.style.backgroundColor = color;

        const circle = chapter.querySelector('.circle');
        circle.style.display = 'none';

        const chapterName = chapter.querySelector('.chapter-name');
        chapterName.style.opacity = '0';

      }, index * 150);
    });

  } else {
    menuContainer.classList.remove('fixed');

    chapters.forEach((chapter, index) => {
      setTimeout(() => {
        // Rückverwandlung in Kreise
        chapter.classList.remove('balken');
        chapter.style.height = '20px';
        chapter.style.opacity = '1';

        const color = chapter.getAttribute('data-color'); // Farbe holen
        chapter.style.backgroundColor = 'transparent';

        const circle = chapter.querySelector('.circle');
        circle.style.display = 'block';
        circle.style.backgroundColor = color;

        const chapterName = chapter.querySelector('.chapter-name');
        chapterName.style.opacity = '1';
      }, index * 150);
    });
  }

  

  // Aktives Kapitel hervorheben
  sections.forEach(section => {
    const rect = section.getBoundingClientRect();
    const sectionId = section.id;

    if (rect.top <= 100 && rect.bottom >= 100) {
      chapters.forEach(chap => chap.classList.remove('active'));
      const activeChapter = Array.from(chapters).find(chap => chap.getAttribute('data-target') === sectionId);

      if (activeChapter) {
        activeChapter.classList.add('active');
      }
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

//arbeitsweise
const arbeitsweiseBoxen = document.querySelectorAll('.arbeitsweise-box');
const arbeitsweiseSection = document.querySelector('.arbeitsweise-section');

window.addEventListener('scroll', () => {
  const rect = arbeitsweiseSection.getBoundingClientRect();
  const sectionHeight = arbeitsweiseSection.offsetHeight;

  // Wie viel % der Section ist im Viewport sichtbar?
  const visibleHeight = Math.min(window.innerHeight, sectionHeight + rect.top < 0 ? 0 : window.innerHeight - rect.top);
  const visibilityPercent = visibleHeight / sectionHeight;

  arbeitsweiseBoxen.forEach((box, index) => {
    const triggerPercents = [0, 0.6, 0.8, 0.9];
    if (visibilityPercent >= triggerPercents[index]) {
      box.classList.add('arbeitsweise-visible');
    }
  });
});

//gallerie
const items = document.querySelectorAll('.gallery-item');
  const detailView = document.querySelector('.gallery-detail-view');
  const detailTitle = document.getElementById('gallery-detail-title');
  const detailText = document.getElementById('gallery-detail-text');
  const detailImg = document.getElementById('gallery-detail-img');
  const closeBtn = document.querySelector('.gallery-close-btn');

  items.forEach(item => {
    item.addEventListener('click', (e) => {
      e.stopPropagation();
      detailTitle.textContent = item.getAttribute('data-title');
      detailText.textContent = item.getAttribute('data-text');
      detailImg.src = item.getAttribute('data-img');

      detailView.classList.remove('gallery-hidden');
      setTimeout(() => detailView.classList.add('gallery-active'), 10);
    });
  });

  function closeDetail() {
    detailView.classList.remove('gallery-active');
    setTimeout(() => detailView.classList.add('gallery-hidden'), 300);
  }

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeDetail();
  });

  document.addEventListener('click', (e) => {
    if (!detailView.classList.contains('gallery-hidden') && !detailView.contains(e.target)) {
      closeDetail();
    }
  });


  //stapel
  const slides = document.querySelectorAll('.text-slide');
  const images = document.querySelectorAll('.image-layer');
  const section = document.querySelector('.scroll-section');
  
  window.addEventListener('scroll', () => {
    const rect = section.getBoundingClientRect();
    const sectionHeight = section.offsetHeight;
    const viewportHeight = window.innerHeight;
  
    // Nur weitermachen, wenn die Section im Viewport sichtbar ist
    if (rect.top < viewportHeight && rect.bottom > 0) {
      const scrollInSection = Math.min(viewportHeight - rect.top, sectionHeight);
      const scrollProgress = Math.min(Math.max(scrollInSection / sectionHeight, 0), 1);
  
      const totalSteps = slides.length;
      const currentStep = Math.floor(scrollProgress * totalSteps);
  
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentStep);
      });
  
      images.forEach((img, index) => {
        img.classList.toggle('active', index <= currentStep);
      });
    }
  });
  




