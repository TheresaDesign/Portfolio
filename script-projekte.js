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


