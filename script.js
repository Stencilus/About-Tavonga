// Tailwind Config for colors
tailwind.config = {
    theme: {
        extend: {
            colors: {
                'custom-bg': '#161b22',
                'accent-light': '#5eead4', /* Teal */
                'accent-dark': '#38bdf8', /* Sky Blue */
            },
        },
    },
}

// JavaScript for Tab Interactivity
function showTab(tabId) {
    // Hide all tab contents
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.add('hidden');
    });
    
    // Remove active class from all buttons
    document.querySelectorAll('.tab-button').forEach(button => {
        button.classList.remove('active', 'border-[#38bdf8]', 'text-[#38bdf8]');
        button.classList.add('text-gray-400');
    });

    // Show selected content and activate selected button
    const selectedContent = document.getElementById(`content-${tabId}`);
    const selectedButton = document.getElementById(`tab-${tabId}`);
    
    if (selectedContent) {
        selectedContent.classList.remove('hidden');
    }
    
    if (selectedButton) {
        selectedButton.classList.add('active', 'border-[#38bdf8]', 'text-[#38bdf8]');
        selectedButton.classList.remove('text-gray-400');
    }
}

// Update current year in footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Set up event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Set the initial active tab
    showTab('current');
    
    // Add click event listeners to tab buttons
    document.getElementById('tab-current').addEventListener('click', () => showTab('current'));
    document.getElementById('tab-upcoming').addEventListener('click', () => showTab('upcoming'));
    
    // Add keyboard navigation for tabs
    document.querySelectorAll('.tab-button').forEach(button => {
        button.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const tabId = button.id.replace('tab-', '');
                showTab(tabId);
            }
        });
    });
});
