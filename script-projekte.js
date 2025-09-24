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

(function(){
      const cols = Array.from(document.querySelectorAll('.col'));
      const headline = document.getElementById('headline');
      const scrollSpace = document.querySelector('.scroll-space');

      const maxOffsetPxRatio = 1.2;

      function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
      function easeOutCubic(t){ return 1 - Math.pow(1 - t, 3); }

      function applyProgress(p){
        const eased = easeOutCubic(p);
        const maxOff = window.innerHeight * maxOffsetPxRatio;

        cols.forEach(col => {
          const dir = Number(col.dataset.direction) || -1;
          const offset = eased * maxOff * dir;
          col.style.transform = `translate3d(0, ${offset}px, 0)`;
        });

        headline.classList.toggle('visible', p > 0.1);
      }

      function update(){
        const start = scrollSpace.offsetTop;
        const end = scrollSpace.offsetTop + scrollSpace.offsetHeight - window.innerHeight;
        const denom = Math.max(1, end - start);
        const scrolled = clamp((window.scrollY - start) / denom, 0, 1);

        applyProgress(scrolled);
        requestAnimationFrame(update);
      }

      requestAnimationFrame(update);
    })();