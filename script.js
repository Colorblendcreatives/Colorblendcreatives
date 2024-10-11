//loading//
document.addEventListener('DOMContentLoaded', function() {
    // Ensure all content is loaded
    window.addEventListener('load', function() {
      setTimeout(function() {
        const loader = document.getElementById('loader-wrapper');
        loader.style.opacity = '0';
        loader.style.visibility = 'hidden';
        
        // Remove loader after animation
        setTimeout(() => {
          loader.remove();
        }, 500);
      }, 2000); // Show loader for 2 seconds
    });
  });
  
 

//progressbar//

window.addEventListener('scroll', function() {
    let winScroll = document.documentElement.scrollTop;
    let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    let scrolled = (winScroll / height) * 100;
    document.getElementById("scrollProgressBar").style.width = scrolled + "%";
});


// Typewriter effect
const professions = ['UI/UX Designer', 'Web Developer'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let isPaused = false;
const typingSpeed = 100;
const deleteSpeed = 50;
const pauseDuration = 2000;

function typeWriter() {
    const currentText = professions[professionIndex];
    const professionElement = document.getElementById('profession');

    if (!isDeleting && charIndex <= currentText.length) {
        professionElement.textContent = currentText.substring(0, charIndex);
        charIndex++;
    } else if (!isDeleting && !isPaused) {
        isPaused = true;
        setTimeout(() => {
            isDeleting = true;
            isPaused = false;
        }, pauseDuration);
    } else if (isDeleting && charIndex > 0) {
        professionElement.textContent = currentText.substring(0, charIndex - 1);
        charIndex--;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
    }

    const speed = isDeleting ? deleteSpeed : typingSpeed;
    setTimeout(typeWriter, speed);
}

// Initialize animations
document.addEventListener('DOMContentLoaded', () => {
    typeWriter();  // Keep the typewriter effect if you're using it
    
    // Counter animations
    animateCounter(document.getElementById('clients'), 10);
    animateCounter(document.getElementById('projects'), 50);
    animateCounter(document.getElementById('reviews'), 34);
});

// Counter animation function
function animateCounter(element, target) {
    let current = 0;
    const increment = target / 100;
    const duration = 6000;
    const interval = duration / (target / increment);

    const counter = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(counter);
        }
        element.textContent = Math.floor(current) + '+';
    }, interval);
}
//Testimonial

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('testimonialTrack');
    const slides = track.children;
    const prevBtn = document.querySelector('.arrow-btn.prev');
    const nextBtn = document.querySelector('.arrow-btn.next');
    let currentSlide = 0;
    let isAutoScrolling = true;
    let autoScrollInterval;

    function updateSlidePosition() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function moveToNextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        updateSlidePosition();
    }

    function moveToPrevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        updateSlidePosition();
    }

    function startAutoScroll() {
        autoScrollInterval = setInterval(moveToNextSlide, 5000);
    }

    function pauseAutoScroll() {
        clearInterval(autoScrollInterval);
        isAutoScrolling = false;
        setTimeout(() => {
            if (!isAutoScrolling) {
                startAutoScroll();
                isAutoScrolling = true;
            }
        }, 10000);
    }

    prevBtn.addEventListener('click', () => {
        moveToPrevSlide();
        pauseAutoScroll();
    });

    nextBtn.addEventListener('click', () => {
        moveToNextSlide();
        pauseAutoScroll();
    });

    startAutoScroll();
});

