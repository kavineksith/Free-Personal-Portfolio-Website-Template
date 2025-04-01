// Select all the project cards
const projectCards = document.querySelectorAll('.project-card');

// Loop through each card and add a click event listener
projectCards.forEach(card => {
    card.addEventListener('click', function () {
        // Get the URL from the data-url attribute
        const url = card.getAttribute('data-url');

        // Redirect to the specified URL
        window.location.href = url;
    });
});

const projectsCollection = document.getElementById('project-showcase');

projectsCollection.addEventListener('click', function () {
    // Get the URL from the data-url attribute
    const url = projectsCollection.getAttribute('data-url');

    // Redirect to the specified URL
    window.location.href = url;
});
