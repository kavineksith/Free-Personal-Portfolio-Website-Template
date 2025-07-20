document.addEventListener('DOMContentLoaded', function () {
    // Project card redirects
    const projectCards = document.querySelectorAll('.project-card');

    projectCards.forEach(card => {
        card.addEventListener('click', function (e) {
            // Don't redirect if clicking on a link inside the card
            if (e.target.tagName === 'A' || e.target.closest('a')) {
                return;
            }

            const url = card.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });

        // Add keyboard accessibility
        card.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const url = card.getAttribute('data-url');
                if (url) {
                    window.location.href = url;
                }
            }
        });

        // Add focus styles for accessibility
        card.setAttribute('tabindex', '0');
    });

    // View All Projects button redirect
    const projectsCollection = document.getElementById('project-showcase');
    if (projectsCollection) {
        projectsCollection.addEventListener('click', function () {
            const url = projectsCollection.getAttribute('data-url');
            if (url) {
                window.location.href = url;
            }
        });

        // Keyboard accessibility
        projectsCollection.addEventListener('keydown', function (e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const url = projectsCollection.getAttribute('data-url');
                if (url) {
                    window.location.href = url;
                }
            }
        });

        projectsCollection.setAttribute('tabindex', '0');
    }
});