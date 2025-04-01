// Add this to your design.js file or create a new file for the slideshow functionality

let slideIndex = 1;
showSlides(slideIndex);

// Next/previous controls
function plusSlides(n) {
    showSlides(slideIndex += n);
}

// Thumbnail image controls
function currentSlide(n) {
    showSlides(slideIndex = n);
}

function showSlides(n) {
    let i;
    let slides = document.getElementsByClassName("slide");
    let dots = document.getElementsByClassName("dot");

    // Loop back to the first slide if we go past the last one
    if (n > slides.length) { slideIndex = 1 }

    // Go to the last slide if we go before the first one
    if (n < 1) { slideIndex = slides.length }

    // Hide all slides
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }

    // Remove active class from all dots
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    // Show the current slide and activate its dot
    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
}

// Auto-advance slides every 5 seconds
function autoSlides() {
    plusSlides(1);
    setTimeout(autoSlides, 5000);
}

// Start the auto slideshow when the page loads
document.addEventListener("DOMContentLoaded", function () {
    // Update the current year in the footer
    document.getElementById("current-year").textContent = new Date().getFullYear();

    // Start the slideshow
    setTimeout(autoSlides, 5000);
});