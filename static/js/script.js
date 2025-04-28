//nav bar to close //
const navLinks = document.querySelectorAll('.nav-link');
const navbarCollapse = document.getElementById('navbarNav');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    if (navbarCollapse.classList.contains('show')) {
      new bootstrap.Collapse(navbarCollapse).hide();
    }
  });
});
 
  

// Scroll to the top on reload and page load
window.addEventListener('DOMContentLoaded', (event) => {
    window.scrollTo(0, 0);
});

window.onbeforeunload = function () {
    window.scrollTo(0, 0);
};



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
document.addEventListener('DOMContentLoaded', () => {
    const counters = [
        { element: document.getElementById('clients'), target: 10 },
        { element: document.getElementById('projects'), target: 25 },
        { element: document.getElementById('reviews'), target: 34 },
    ];

    // Function to animate the counter
    function animateCounter(element, target) {
        let current = 0;
        const increment = target / 100;
        const duration = 2000;
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

    // Set up Intersection Observer
    const observerOptions = {
        threshold: 0.5 // Adjust the visibility threshold as needed
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const counter = counters.find(c => c.element === entry.target);
                if (counter && counter.element.textContent === '0') { // Start only if the counter is at zero
                    animateCounter(counter.element, counter.target);
                }
                observer.unobserve(entry.target); // Stop observing after the counter starts
            }
        });
    }, observerOptions);

    // Observe each counter element
    counters.forEach(counter => observer.observe(counter.element));
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

// Why hire mw
document.addEventListener('DOMContentLoaded', function() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Animate the left content
                const leftContent = document.querySelector('.col-lg-4');
                if (leftContent) {
                    setTimeout(() => {
                        leftContent.classList.add('animate');
                    }, 100);
                }

                // Animate all skill cards with different delays
                const skillCards = document.querySelectorAll('.skill-card');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('animate');
                    }, (index + 2) * 200); // Staggered delay for each card
                });

                // Disconnect observer after animation
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the section is visible
    });

    // Observe the skills section
    const skillsSection = document.querySelector('.skills-section');
    if (skillsSection) {
        observer.observe(skillsSection);
    }
});


// portfolio

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('slide-in');
        }
    });
}, { threshold: 0.1 });

const portfolioSection = document.querySelector('.section.project');
if (portfolioSection) {
    observer.observe(portfolioSection);
}

//Testimonial


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


// Project filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    // Get all filter buttons and project items
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    
    // Add click event to filter buttons
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            filterBtns.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get filter value
            const filterValue = this.getAttribute('data-filter');
            
            // Filter projects
            projectItems.forEach(item => {
                if (filterValue === 'all') {
                    item.classList.remove('hide');
                } else {
                    if (item.classList.contains(filterValue)) {
                        item.classList.remove('hide');
                    } else {
                        item.classList.add('hide');
                    }
                }
            });
        });
    });
    
    // Add animation to project cards on hover
    const portfolioCards = document.querySelectorAll('.portfolio-card');
    portfolioCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 33, 128, 0.1)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });
});



document.addEventListener('DOMContentLoaded', function() {
    // This is needed if you want to pause on hover
    const track = document.getElementById('testimonialTrack');
    
    if (track) {
        track.addEventListener('mouseenter', function() {
            this.style.animationPlayState = 'paused';
        });
        
        track.addEventListener('mouseleave', function() {
            this.style.animationPlayState = 'running';
        });
    }
});
