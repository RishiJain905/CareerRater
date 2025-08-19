// JavaScript for CareerRater website

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('CareerRater website loaded successfully!');
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('nav a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add any additional JavaScript functionality here
    // For example:
    // - Form validation
    // - Dynamic content loading
    // - Interactive features
    // - API calls
});

// Example function you can expand later
function initializeFeatures() {
    // Add your custom functionality here
    console.log('Initializing website features...');
}
