// Portfolio Interactive JavaScript

// DOM Elements
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const currentYear = document.getElementById('current-year');
const currentDate = document.getElementById('current-date');

// Update Current Date
function updateCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
}

// Handle Contact Form Submission
function handleContactForm(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const subject = document.getElementById('subject').value;
    const message = document.getElementById('message').value;
    
    // Basic validation
    if (!name || !email || !subject || !message) {
        alert('Please fill in all fields');
        return;
    }
    
    // Show loading state
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<div class="loading-spinner"></div> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (in real app, send to server)
    setTimeout(() => {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.className = 'message-success';
        successMessage.innerHTML = `
            <i class="fas fa-check-circle mr-2"></i>
            Thank you ${name}! Your message has been sent successfully. I'll get back to you at ${email} as soon as possible.
        `;
        
        // Insert success message after form
        contactForm.parentNode.insertBefore(successMessage, contactForm.nextSibling);
        successMessage.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        
        // Scroll to success message
        successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.opacity = '0';
            setTimeout(() => {
                successMessage.remove();
            }, 300);
        }, 5000);
    }, 1500);
}

// Back to Top Functionality
function handleBackToTop() {
    // Show/hide button based on scroll position
    if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
    
    // Smooth scroll to top
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Update current date
    updateCurrentDate();
    
    // Contact form submission
    contactForm.addEventListener('submit', handleContactForm);
    
    // Back to top functionality
    window.addEventListener('scroll', handleBackToTop);
    handleBackToTop(); // Initial check
    
    // Add animation to elements when they come into view
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
    
    // Add hover effects to skill badges
    document.querySelectorAll('.skill-badge').forEach(badge => {
        badge.addEventListener('mouseenter', () => {
            badge.style.transform = 'translateY(-3px) scale(1.05)';
        });
        
        badge.addEventListener('mouseleave', () => {
            badge.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add hover effects to tech tags
    document.querySelectorAll('.tech-tag').forEach(tag => {
        tag.addEventListener('mouseenter', () => {
            tag.style.transform = 'scale(1.05)';
        });
        
        tag.addEventListener('mouseleave', () => {
            tag.style.transform = 'scale(1)';
        });
    });
    
    // Add hover effects to project cards
    document.querySelectorAll('.project-card').forEach(card => {
        card.addEventListener('mouseenter', () => {
            const borderColor = card.classList.contains('border-blue-500/30') ? 'rgba(59, 130, 246, 0.6)' :
                              card.classList.contains('border-teal-500/30') ? 'rgba(20, 184, 166, 0.6)' :
                              card.classList.contains('border-purple-500/30') ? 'rgba(168, 85, 247, 0.6)' :
                              'rgba(56, 189, 248, 0.6)';
            card.style.boxShadow = `0 20px 40px ${borderColor}`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '';
        });
    });
    
    // Console greeting
    console.log('%c👋 Welcome to Tavonga\'s Portfolio!', 'color: #38bdf8; font-size: 18px; font-weight: bold;');
    console.log('%cAI Student | Machine Learning | Deep Learning, Data Science & Big Data | IoT Enthusiast | Mathematician', 'color: #5eead4; font-size: 14px;');
    
    // Add typing effect for page title (optional)
    const originalTitle = document.title;
    let titleIndex = 0;
    const titleText = "Tavonga Stencilus Dube | AI Portfolio";
    
    function typeTitle() {
        if (titleIndex < titleText.length) {
            document.title = titleText.substring(0, titleIndex + 1);
            titleIndex++;
            setTimeout(typeTitle, 100);
        } else {
            // Blink cursor effect
            let cursorVisible = true;
            setInterval(() => {
                document.title = cursorVisible ? titleText + " █" : titleText + " ";
                cursorVisible = !cursorVisible;
            }, 500);
        }
    }
    
    // Start typing effect after 1 second
    setTimeout(typeTitle, 1000);
});

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 100,
                behavior: 'smooth'
            });
        }
    });
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key closes any open modals
    if (e.key === 'Escape') {
        // If you add modals in the future
    }
    
    // Tab navigation between form fields
    if (e.key === 'Tab') {
        // Add focus styling to form inputs
        const activeElement = document.activeElement;
        if (activeElement.classList.contains('form-input')) {
            activeElement.style.borderColor = '#38bdf8';
            activeElement.style.boxShadow = '0 0 0 3px rgba(56, 189, 248, 0.2)';
        }
    }
});

// Remove focus styling when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.classList.contains('form-input')) {
        document.querySelectorAll('.form-input').forEach(input => {
            input.style.borderColor = 'rgba(56, 189, 248, 0.3)';
            input.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.3)';
        });
    }
});

// Add loading state to page
window.addEventListener('load', () => {
    // Add loaded class to body for CSS transitions
    document.body.classList.add('loaded');
    
    // Remove any loading animations
    setTimeout(() => {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => el.remove());
    }, 500);
});

// Add visual feedback for form inputs
document.querySelectorAll('.form-input').forEach(input => {
    input.addEventListener('focus', () => {
        input.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', () => {
        input.parentElement.style.transform = 'translateY(0)';
    });
});

// Add character counter for message textarea
const messageTextarea = document.getElementById('message');
if (messageTextarea) {
    const counter = document.createElement('div');
    counter.className = 'text-right text-gray-500 text-sm mt-1';
    counter.textContent = '0/500';
    messageTextarea.parentNode.appendChild(counter);
    
    messageTextarea.addEventListener('input', () => {
        const length = messageTextarea.value.length;
        counter.textContent = `${length}/500`;
        
        if (length > 450) {
            counter.className = 'text-right text-yellow-400 text-sm mt-1';
        } else if (length > 500) {
            counter.className = 'text-right text-red-400 text-sm mt-1';
        } else {
            counter.className = 'text-right text-gray-500 text-sm mt-1';
        }
    });
}
