// Portfolio Interactive JavaScript

// Tailwind Config for colors
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'custom-bg': '#161b22',
                'accent-light': '#5eead4',
                'accent-dark': '#38bdf8',
            },
        },
    },
}

// Project Data
const projects = {
    done: [
        {
            id: 'contact-tracing',
            title: 'AI-Based Contact Tracing Application',
            status: 'Completed',
            description: 'A groundbreaking contact tracing project integrating BLE, GPS, 5G LTE, UWB, and Matter technologies for precise proximity detection and real-time tracking. The application was designed to help trace COVID-19 contacts efficiently while maintaining user privacy.',
            technologies: ['Bluetooth Low Energy', 'GPS', '5G LTE', 'Ultra-Wideband', 'Matter Protocol', 'Python', 'React Native'],
            duration: '4 months',
            team: '7 members',
            outcome: 'Successfully designed conceptual framework with 95% accuracy in proximity detection',
            impact: 'Potential to reduce infection spread by 40% through efficient contact tracing',
            color: 'teal'
        },
        {
            id: 'financial-analysis',
            title: 'Financial Data Analysis Tool',
            status: 'Completed',
            description: 'A machine learning-powered financial analysis tool that processes historical market data, performs sentiment analysis on financial news, and provides investment recommendations with risk assessment.',
            technologies: ['Python', 'TensorFlow', 'Pandas', 'NumPy', 'Matplotlib', 'Scikit-learn', 'Natural Language Processing'],
            duration: '3 months',
            team: 'Solo Project',
            outcome: 'Achieved 78% accuracy in trend prediction',
            impact: 'Tool can process 10,000+ financial records per minute',
            color: 'blue'
        }
    ],
    upcoming: [
        {
            id: 'campus-nav',
            title: 'Campus Navigation System',
            status: 'Upcoming',
            description: 'An intelligent indoor/outdoor navigation system for Africa University campus using IoT sensors and computer vision to provide real-time routing, point-of-interest discovery, and accessibility features for disabled students.',
            technologies: ['IoT Sensors', 'Computer Vision', 'React Native', 'Node.js', 'MongoDB', 'WebSockets'],
            duration: '6 months (planned)',
            team: '5 members (planned)',
            expectedOutcome: 'Reduce navigation time by 60% for new students',
            features: ['Indoor navigation', 'Accessibility features', 'Event notifications', 'Real-time updates'],
            color: 'purple'
        },
        {
            id: 'learning-hub',
            title: 'Smart Learning Hub',
            status: 'Upcoming',
            description: 'A personalized learning platform that uses machine learning to adapt educational content based on individual learning styles, monitor student progress, and recommend resources to optimize learning outcomes.',
            technologies: ['Machine Learning', 'Django', 'React', 'PostgreSQL', 'Docker', 'Recommendation Algorithms'],
            duration: '8 months (planned)',
            team: '6 members (planned)',
            expectedOutcome: 'Increase student engagement by 50%',
            features: ['Personalized learning paths', 'Progress tracking', 'Resource recommendations', 'Collaborative tools'],
            color: 'orange'
        }
    ]
};

// DOM Elements
const tabButtons = document.querySelectorAll('.tab-button');
const tabContents = document.querySelectorAll('.tab-content');
const backToTopBtn = document.getElementById('back-to-top');
const contactForm = document.getElementById('contact-form');
const currentYear = document.getElementById('current-year');
const currentDate = document.getElementById('current-date');
const projectModal = document.getElementById('project-modal');
const closeModal = document.querySelector('.close-modal');
const modalBody = document.getElementById('modal-body');

// Tab Switching Function
function showTab(tabId) {
    // Hide all tab contents
    tabContents.forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    tabButtons.forEach(button => {
        button.classList.remove('active');
        // Reset button colors
        button.classList.remove('from-teal-600', 'to-teal-700', 'from-blue-600', 'to-blue-700', 'from-purple-600', 'to-purple-700');
        
        // Set default colors based on button id
        if (button.id === 'tab-done') {
            button.classList.add('from-blue-600', 'to-blue-700');
        } else if (button.id === 'tab-upcoming') {
            button.classList.add('from-purple-600', 'to-purple-700');
        } else if (button.id === 'tab-all') {
            button.classList.add('from-gray-700', 'to-gray-800');
        }
    });
    
    // Show selected content
    const selectedContent = document.getElementById(`content-${tabId}`);
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
        
        // Update "View All" tab if needed
        if (tabId === 'all') {
            displayAllProjects();
        }
    }
    
    // Activate selected button
    const selectedButton = document.getElementById(`tab-${tabId}`);
    if (selectedButton) {
        selectedButton.classList.add('active');
        // Set active button colors
        selectedButton.classList.remove('from-blue-600', 'to-blue-700', 'from-purple-600', 'to-purple-700', 'from-gray-700', 'to-gray-800');
        
        if (tabId === 'done') {
            selectedButton.classList.add('from-teal-600', 'to-teal-700');
        } else if (tabId === 'upcoming') {
            selectedButton.classList.add('from-blue-600', 'to-blue-700');
        } else if (tabId === 'all') {
            selectedButton.classList.add('from-purple-600', 'to-purple-700');
        }
    }
}

// Display All Projects
function displayAllProjects() {
    const allProjectsContainer = document.querySelector('#content-all .grid');
    if (!allProjectsContainer) return;
    
    allProjectsContainer.innerHTML = '';
    
    // Combine done and upcoming projects
    const allProjects = [...projects.done, ...projects.upcoming];
    
    allProjects.forEach(project => {
        const projectCard = document.createElement('div');
        projectCard.className = `project-card bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border border-${project.color}-500/30 hover:border-${project.color}-400/60 transition-all duration-300 hover:shadow-2xl hover:shadow-${project.color}-500/20`;
        
        const statusColor = project.status === 'Completed' ? 'teal' : project.status === 'Upcoming' ? 'purple' : 'blue';
        
        projectCard.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-2xl font-bold text-${project.color}-300">${project.title}</h3>
                <span class="bg-${statusColor}-500/20 text-${statusColor}-300 px-3 py-1 rounded-full text-sm font-semibold">${project.status}</span>
            </div>
            <p class="text-gray-300 mb-4">${project.description.substring(0, 150)}...</p>
            
            <div class="mb-4">
                <h4 class="text-lg font-semibold text-${project.color}-300 mb-2">Technologies:</h4>
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.slice(0, 3).map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    ${project.technologies.length > 3 ? `<span class="tech-tag">+${project.technologies.length - 3} more</span>` : ''}
                </div>
            </div>
            
            <div class="flex justify-between items-center mt-6 pt-4 border-t border-gray-700">
                <div>
                    <p class="text-sm text-gray-400">${project.team}</p>
                    <p class="text-sm text-gray-400">${project.duration}</p>
                </div>
                <button class="view-details-btn" data-project="${project.id}">
                    <i class="fas fa-eye mr-2"></i>View Details
                </button>
            </div>
        `;
        
        allProjectsContainer.appendChild(projectCard);
    });
    
    // Re-attach event listeners to new buttons
    attachProjectDetailListeners();
}

// Show Project Details in Modal
function showProjectDetails(projectId) {
    // Find the project
    let project = null;
    for (const category in projects) {
        const found = projects[category].find(p => p.id === projectId);
        if (found) {
            project = found;
            break;
        }
    }
    
    if (!project) return;
    
    // Populate modal
    modalBody.innerHTML = `
        <h2 class="text-3xl font-bold mb-4 text-${project.color}-400">${project.title}</h2>
        <div class="flex items-center mb-6">
            <span class="bg-${project.color}-500/20 text-${project.color}-300 px-3 py-1 rounded-full text-sm font-semibold mr-4">${project.status}</span>
            <span class="text-gray-400"><i class="far fa-clock mr-1"></i> ${project.duration}</span>
        </div>
        
        <p class="text-gray-300 mb-6 text-lg">${project.description}</p>
        
        <div class="mb-6">
            <h3 class="text-xl font-bold text-${project.color}-300 mb-3">Technologies Used</h3>
            <div class="flex flex-wrap gap-2">
                ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
            </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div class="bg-gray-800/50 p-4 rounded-lg">
                <h4 class="text-lg font-bold text-teal-300 mb-2">Team</h4>
                <p class="text-gray-300">${project.team}</p>
            </div>
            
            ${project.outcome ? `
            <div class="bg-gray-800/50 p-4 rounded-lg">
                <h4 class="text-lg font-bold text-blue-300 mb-2">Outcome</h4>
                <p class="text-gray-300">${project.outcome}</p>
            </div>
            ` : ''}
            
            ${project.expectedOutcome ? `
            <div class="bg-gray-800/50 p-4 rounded-lg">
                <h4 class="text-lg font-bold text-purple-300 mb-2">Expected Outcome</h4>
                <p class="text-gray-300">${project.expectedOutcome}</p>
            </div>
            ` : ''}
            
            ${project.impact ? `
            <div class="bg-gray-800/50 p-4 rounded-lg">
                <h4 class="text-lg font-bold text-green-300 mb-2">Impact</h4>
                <p class="text-gray-300">${project.impact}</p>
            </div>
            ` : ''}
        </div>
        
        ${project.features ? `
        <div class="mb-6">
            <h3 class="text-xl font-bold text-${project.color}-300 mb-3">Key Features</h3>
            <ul class="list-disc list-inside text-gray-300 space-y-2">
                ${project.features.map(feature => `<li>${feature}</li>`).join('')}
            </ul>
        </div>
        ` : ''}
    `;
    
    // Show modal
    projectModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Attach Project Detail Listeners
function attachProjectDetailListeners() {
    document.querySelectorAll('.view-details-btn').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.getAttribute('data-project');
            showProjectDetails(projectId);
        });
    });
}

// Close Modal
function closeProjectModal() {
    projectModal.classList.remove('active');
    document.body.style.overflow = 'auto';
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
    
    // In a real application, you would send this data to a server
    // For now, we'll just show a success message
    alert(`Thank you ${name}! Your message has been sent successfully. I'll get back to you at ${email} as soon as possible.`);
    
    // Reset form
    contactForm.reset();
    
    // Add some visual feedback
    const submitBtn = contactForm.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-check mr-2"></i>Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    
    setTimeout(() => {
        submitBtn.innerHTML = originalText;
    }, 3000);
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

// Update Current Date
function updateCurrentDate() {
    const now = new Date();
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    currentDate.textContent = now.toLocaleDateString('en-US', options);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set current year
    currentYear.textContent = new Date().getFullYear();
    
    // Update current date
    updateCurrentDate();
    
    // Set initial active tab
    showTab('done');
    
    // Add event listeners to tab buttons
    tabButtons.forEach(button => {
        const tabId = button.id.replace('tab-', '');
        button.addEventListener('click', () => showTab(tabId));
    });
    
    // Attach project detail listeners
    attachProjectDetailListeners();
    
    // Contact form submission
    contactForm.addEventListener('submit', handleContactForm);
    
    // Back to top functionality
    window.addEventListener('scroll', handleBackToTop);
    handleBackToTop(); // Initial check
    
    // Modal close functionality
    closeModal.addEventListener('click', closeProjectModal);
    
    // Close modal when clicking outside
    projectModal.addEventListener('click', (e) => {
        if (e.target === projectModal) {
            closeProjectModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && projectModal.classList.contains('active')) {
            closeProjectModal();
        }
    });
    
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
    
    // Console greeting
    console.log('%c👋 Welcome to Tavonga\'s Portfolio!', 'color: #38bdf8; font-size: 18px; font-weight: bold;');
    console.log('%cFeel free to explore the code and projects!', 'color: #5eead4; font-size: 14px;');
});

// Add some fun interactive effects
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.project-card, .skill-badge');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        if (x > 0 && x < rect.width && y > 0 && y < rect.height) {
            const xPercent = (x / rect.width - 0.5) * 2;
            const yPercent = (y / rect.height - 0.5) * 2;
            
            card.style.transform = `perspective(1000px) rotateY(${xPercent * 2}deg) rotateX(${-yPercent * 2}deg) translateZ(10px)`;
        } else {
            card.style.transform = 'perspective(1000px) rotateY(0) rotateX(0) translateZ(0)';
        }
    });
});

// Add loading animation
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Remove loading animation after 1 second
    setTimeout(() => {
        const loadingElements = document.querySelectorAll('.loading');
        loadingElements.forEach(el => el.remove());
    }, 1000);
});
