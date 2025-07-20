// Mobile menu toggle functionality
document.addEventListener('DOMContentLoaded', function () {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navBar = document.querySelector('.nav-bar');

    mobileMenuToggle.addEventListener('click', function () {
        this.classList.toggle('active');
        navBar.classList.toggle('active');

        // Toggle body scroll when menu is open
        if (navBar.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
    });

    // Close menu when clicking on a nav link
    const navLinks = document.querySelectorAll('.nav-bar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            mobileMenuToggle.classList.remove('active');
            navBar.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
});