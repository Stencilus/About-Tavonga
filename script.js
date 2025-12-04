// js/script.js

// 1. DATA: Reordered for sequential display (Contact Tracing First)
const projectsData = [
    // --- 1. Finished Projects ---
    {
        id: 'contact-tracing',
        category: 'done',
        title: 'AI-Based Contact Tracing',
        description: 'A groundbreaking initiative integrating BLE, GPS, 5G LTE, UWB, and Matter for precise proximity detection, developed with an amazing team of researchers.',
        longDescription: `
            <p class="mb-4">Reflecting on an inspiring journey in modern technology research! I’m thrilled to have contributed to a groundbreaking contact tracing project, where innovation meets real-world impact.</p>
            
            <p class="mb-4">Together, we designed a conceptual framework integrating cutting-edge technologies:</p>
            <ul class="list-disc list-inside mb-4 ml-4 text-gray-300">
                <li><strong>BLE (Bluetooth Low Energy):</strong> For proximity detection.</li>
                <li><strong>GPS & 5G LTE:</strong> For real-time location accuracy.</li>
                <li><strong>UWB (Ultra-Wideband):</strong> For precision tracking.</li>
                <li><strong>Matter:</strong> For seamless cross-device interoperability.</li>
            </ul>

            <p class="mb-4 text-teal-300 italic">Big thanks to everyone involved in our contact tracing initiative – especially Mrs. Mafu, Danai Matibe, Anotidachangamire Tayerera, Kimberly Ngoya, Lesley Mutsambiwa, and Ridell Salema.</p>
            
            <p>Your collaboration made this research in modern tech possible. Proud to have helped shape the conceptual framework alongside you!</p>
        `,
        technologies: ['BLE', 'GPS', '5G LTE', 'UWB', 'Matter', 'Python'],
        status: 'Completed',
        color: 'teal'
    },
    {
        id: 'finance-tool',
        category: 'done',
        title: 'Financial Data Analysis Tool',
        description: 'ML-powered tool for analyzing financial markets, predicting trends, and providing investment recommendations using sentiment analysis.',
        longDescription: 'A machine learning-powered financial analysis tool that processes historical market data, performs sentiment analysis on financial news, and provides investment recommendations with risk assessment. Achieved 78% accuracy in trend prediction.',
        technologies: ['Python', 'TensorFlow', 'Pandas', 'Matplotlib'],
        status: 'Completed',
        color: 'blue'
    },
    // --- 2. Upcoming Projects ---
    {
        id: 'campus-connect',
        category: 'upcoming',
        title: 'Campus Connect',
        description: 'Campus Connect helps users to navigate around the campus using IoT and spatial data analysis for real-time routing.',
        longDescription: 'An intelligent indoor/outdoor navigation system for Africa University campus using IoT sensors and computer vision to provide real-time routing, point-of-interest discovery, and accessibility features for disabled students.',
        technologies: ['IoT Sensors', 'React Native', 'Node.js', 'Google Maps API'],
        status: 'Upcoming',
        color: 'purple'
    },
    {
        id: 'smart-learning',
        category: 'upcoming',
        title: 'Smart Learning System',
        description: 'A personalized learning platform using ML to adapt educational content, monitor progress, and recommend resources based on learning styles.',
        longDescription: 'A personalized learning platform that uses machine learning to adapt educational content based on individual learning styles, monitor student progress, and recommend resources to optimize learning outcomes.',
        technologies: ['Machine Learning', 'Django', 'React', 'Docker'],
        status: 'Upcoming',
        color: 'orange'
    }
];

// 2. PROJECT RENDERING LOGIC (Sequential Display)
const projectsContainer = document.getElementById('projects-container');

function renderProjects() {
    projectsContainer.innerHTML = ''; // Clear current content
    
    // Simply render all projects in the order defined in the array
    projectsData.forEach(project => {
        const borderClass = project.category === 'done' ? 'border-teal-500/30' : 'border-purple-500/30';
        const titleColor = project.category === 'done' ? 'text-teal-300' : 'text-purple-300';
        const badgeColor = project.category === 'done' ? 'bg-teal-500/20 text-teal-300' : 'bg-purple-500/20 text-purple-300';

        const card = document.createElement('div');
        card.className = `project-card bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl border ${borderClass}`;
        
        card.innerHTML = `
            <div class="flex justify-between items-start mb-4">
                <h3 class="text-2xl font-bold ${titleColor}">${project.title}</h3>
                <span class="${badgeColor} px-3 py-1 rounded-full text-sm font-semibold">${project.status}</span>
            </div>
            <p class="text-gray-300 mb-4">${project.description}</p>
            <div class="mb-4">
                <div class="flex flex-wrap gap-2">
                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                </div>
            </div>
            <button onclick="openModal('${project.id}')" class="view-details-btn">
                <i class="fas fa-info-circle mr-2"></i>View Details
            </button>
        `;
        projectsContainer.appendChild(card);
    });
}

// 4. CONTACT FORM LOGIC
const messageInput = document.getElementById('message');
const typingIndicator = document.getElementById('typing-indicator');
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');

messageInput.addEventListener('input', () => {
    if (messageInput.value.length > 0) {
        typingIndicator.classList.add('active');
    } else {
        typingIndicator.classList.remove('active');
    }
});

messageInput.addEventListener('blur', () => typingIndicator.classList.remove('active'));

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span class="spinner"></span> Sending...`;

    setTimeout(() => {
        submitBtn.innerHTML = `<i class="fas fa-check mr-2"></i> Sent Successfully!`;
        submitBtn.style.background = '#059669'; // Green success
        
        contactForm.reset();
        typingIndicator.classList.remove('active');

        setTimeout(() => {
            submitBtn.innerHTML = originalBtnContent;
            submitBtn.disabled = false;
            submitBtn.style.background = ''; // Reset to CSS gradient
        }, 3000);
    }, 2000);
});

// 5. MODAL LOGIC
const modal = document.getElementById('project-modal');
const modalBody = document.getElementById('modal-body');
const closeModal = document.querySelector('.close-modal');

function openModal(projectId) {
    const project = projectsData.find(p => p.id === projectId);
    if (!project) return;

    // Use longDescription if available, otherwise fallback to description
    const descContent = project.longDescription ? project.longDescription : project.description;

    modalBody.innerHTML = `
        <h2 class="text-3xl font-bold text-teal-300 mb-2">${project.title}</h2>
        <p class="text-gray-400 mb-4 italic">${project.status} Project</p>
        <div class="text-gray-200 text-lg mb-6 leading-relaxed">${descContent}</div>
        <h4 class="font-bold text-blue-300 mb-2">Tech Stack:</h4>
        <div class="flex flex-wrap gap-2 mb-6">
             ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
        </div>
    `;
    modal.classList.add('active');
}

closeModal.addEventListener('click', () => modal.classList.remove('active'));
window.addEventListener('click', (e) => {
    if (e.target === modal) modal.classList.remove('active');
});

// 6. BACK TO TOP
const backToTopBtn = document.getElementById('back-to-top');
window.onscroll = () => {
    if (document.body.scrollTop > 300 || document.documentElement.scrollTop > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
};
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// INITIALIZE
document.addEventListener('DOMContentLoaded', () => {
    renderProjects(); // Call without arguments to show all
});
