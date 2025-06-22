 
// Scroll to the top on reload and page load
window.addEventListener('DOMContentLoaded', (event) => {
    window.scrollTo(0, 0);
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};

 
 // Typewriter Effect
        const typewriter = document.getElementById('typewriter');
        const texts = ['Frontend Developer', 'UI/UX Designer', 'Website Designer'];
        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeText() {
            const currentText = texts[textIndex];
            
            if (isDeleting) {
                typewriter.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriter.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % texts.length;
                typeSpeed = 500; // Pause before typing next word
            }

            setTimeout(typeText, typeSpeed);
        }

        // Start typewriter effect
        typeText();

        // Navbar scroll effect
        window.addEventListener('scroll', function() {
            const navbar = document.querySelector('.navbar');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });

        // Smooth scrolling for anchor links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // Parallax effect for floating shapes
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            const shapes = document.querySelectorAll('.floating-shape');
            
            shapes.forEach((shape, index) => {
                const speed = 0.3 + (index * 0.1);
                shape.style.transform = `translateY(${scrollY * speed}px) rotate(${scrollY * 0.05}deg)`;
            });
        });

        // Add some interactive hover effects
        document.querySelectorAll('.company-logo').forEach(logo => {
            logo.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-8px) scale(1.05)';
            });
            
            logo.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

// About animation
document.addEventListener("DOMContentLoaded", function () {
    const textContent = document.querySelector(".hero-section .col-lg-6.text-content");
    const aboutImage = document.querySelector(".about-image");
    const aboutContent = document.querySelector(".about-content");

    // Function to check if the element is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return rect.top <= window.innerHeight && rect.bottom >= 0;
    }

    // Function to add the 'animate' class to trigger the animation
    function handleScrollAnimation() {
        if (isElementInViewport(textContent)) {
            textContent.classList.add("animate");
        }
        if (isElementInViewport(aboutImage)) {
            aboutImage.classList.add("animate");
        }
        if (isElementInViewport(aboutContent)) {
            aboutContent.classList.add("animate");
        }
    }

    // Add the scroll event listener to trigger animations
    window.addEventListener("scroll", handleScrollAnimation);

    // Call the function on page load to trigger animations if already in viewport
    handleScrollAnimation();
});


//Projects Completed
document.addEventListener('DOMContentLoaded', function() {
    // Filter functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectItems.forEach(item => {
                item.classList.add('hide');
                item.classList.remove('animate');
            });

            // Wait for hide animation to complete
            setTimeout(() => {
                const visibleItems = [];
                
                projectItems.forEach(item => {
                    if (filterValue === 'all' || item.classList.contains(filterValue)) {
                        visibleItems.push(item);
                    }
                });

                // Show filtered items with staggered animation
                visibleItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.remove('hide');
                        item.classList.add('animate');
                    }, index * 100);
                });
            }, 300);
        });
    });

    // Scroll animation
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe project items
    projectItems.forEach((item, index) => {
        item.style.animationDelay = `${index * 0.1}s`;
        observer.observe(item);
    });

    // Initial animation for project items
    setTimeout(() => {
        projectItems.forEach(item => {
            item.classList.add('animate');
        });
    }, 600);

    // Smooth scroll for internal links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});


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

// Contact section
const contactObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            contactObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const contactSection = document.querySelector('.section.contact');
if (contactSection) {
    contactObserver.observe(contactSection);
}

// Adding the button to the DOM
const scrollButton = document.createElement('div');
scrollButton.className = 'scroll-to-top';
document.body.appendChild(scrollButton);

// Show/hide button based on scroll position
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {  // Show after scrolling 300px
        scrollButton.classList.add('visible');
    } else {
        scrollButton.classList.remove('visible');
    }
});

// Smooth scroll to top when clicked
scrollButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

