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
const professions = ['UI/UX Designer', 'Front-end Developer','Graphic Designer',];
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

// Form validation
document.addEventListener('DOMContentLoaded', function () {
    const form = document.querySelector('.contact-form');

    form.addEventListener('submit', function (event) {
        event.preventDefault(); // Prevent form submission

        let isValid = true;

        // Define validation rules and error messages
        const validationRules = {
            fullname: /^[A-Za-z\s]+$/, // Text only
            email: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Basic email format
            phone: /^[0-9+()-\s]+$/, // Numbers, spaces, parentheses, dashes, and plus sign
            budget: /^[\d\s\p{Sc}.,!@#%^&*()_+=-]+$/u, // Any symbols and numbers
        };

        const inputs = form.querySelectorAll('input[required], textarea[required]');

        inputs.forEach(input => {
            const errorSpan = document.getElementById(`${input.id}-error`); // Get the corresponding error span
            const value = input.value.trim();
            const rule = validationRules[input.id];

            if (value === '' || (rule && !rule.test(value))) {
                isValid = false;
                input.classList.add('is-invalid'); // Add red border
                input.classList.remove('is-valid'); // Remove valid state
                errorSpan.textContent = getErrorMessage(input.id); // Display error message
            } else {
                input.classList.remove('is-invalid'); // Remove red border
                input.classList.add('is-valid'); // Add green checkmark state
                errorSpan.textContent = ''; // Clear error message
            }
        });

        if (isValid) {
            alert("Form submitted successfully!");
            form.submit(); // Submit form if valid
        }
    });

    // Function to return appropriate error message based on input field
    function getErrorMessage(fieldId) {
        const messages = {
            fullname: 'Name must contain only letters and spaces.',
            email: 'Please enter a valid email address.',
            phone: 'Phone number can only contain numbers, spaces, and symbols.',
            budget: 'Budget must contain only numbers, commas, or periods.',
            message: 'This field is required.'
        };
        return messages[fieldId] || 'This field is required.';
    }
});

