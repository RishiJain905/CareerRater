// Blank JavaScript file for CareerRater
// Your code goes here

document.addEventListener('DOMContentLoaded', function() {
    console.log('Blank CareerRater page loaded - ready for your code!');
    
    // Smooth scrolling for navigation (in case you add sections later)
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
    
    // Add your JavaScript here
});
