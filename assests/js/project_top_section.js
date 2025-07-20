document.addEventListener('DOMContentLoaded', function () {
    const homeButton = document.getElementById('home-button');
    const homeSection = document.getElementById('myProjects-section'); // Your home section

    // Show/hide button based on scroll position
    window.addEventListener('scroll', function () {
        if (window.pageYOffset > 300) {
            homeButton.classList.add('visible');
        } else {
            homeButton.classList.remove('visible');
        }
    });

    // Smooth scroll to home section
    homeButton.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({
            top: homeSection.offsetTop - 80, // Adjust for header height
            behavior: 'smooth'
        });
    });
});