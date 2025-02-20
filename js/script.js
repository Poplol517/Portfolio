let lastScrollTop = 0;    // Store the last scroll position
let contactTitle = document.getElementById('contact-title');  // Get the title element
let socialLinks = document.querySelector('.social-links');  // Get the social links container

let isScrolling = false;   // Flag to check if scrolling is in progress

// Set a higher threshold to trigger the animation after a larger scroll
const scrollTriggerPercentage = 70; // Increase the required scroll percentage to 70%

window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;

    // Calculate the scroll percentage
    let scrollPercentage = (currentScroll / scrollHeight) * 100;

    // Check if the user is scrolling down or up
    if (currentScroll > lastScrollTop) {
        // Scrolling down
        if (scrollPercentage > scrollTriggerPercentage) {  // Start fading in after 70% scroll
            contactTitle.style.opacity = (scrollPercentage - scrollTriggerPercentage); // Gradually fade in
            socialLinks.style.opacity = (scrollPercentage - scrollTriggerPercentage); // Fade in social links as well
            contactTitle.style.transform = `translateX(0)`; // Slide the contact title to the right
            socialLinks.style.transform = `translateX(0)`; // Slide the social links into view
        } else {
            contactTitle.style.opacity = 0;  // Make it invisible before the scroll reaches 70%
            socialLinks.style.opacity = 0;  // Hide social links before the scroll reaches 70%
            contactTitle.style.transform = `translateX(-200%)`; // Keep it off-screen to the left
            socialLinks.style.transform = `translateX(-200%)`; // Keep social links off-screen to the left
        }
    } else {
        // Scrolling up
        contactTitle.style.opacity = 0;  // Fade out the text when scrolling up
        socialLinks.style.opacity = 0;  // Fade out social links when scrolling up
        contactTitle.style.transform = `translateX(-200%)`; // Move the text off-screen to the left
        socialLinks.style.transform = `translateX(-200%)`; // Move social links off-screen to the left
    }

    lastScrollTop = currentScroll <= 0 ? 0 : currentScroll;  // Prevent negative scroll values
});

// Stop the animation when the user stops scrolling
let scrollTimeout;
window.addEventListener('scroll', function() {
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(function() {
        // If the user wasn't scrolling, don't do anything
        if (!isScrolling) return;

        // After the user stops scrolling, maintain the current position of opacity and transform
        contactTitle.style.transition = "none";  // Disable transition during stop
        socialLinks.style.transition = "none"; // Disable transition for social links

        // Retain the current opacity and position of the elements
        contactTitle.style.opacity = parseFloat(contactTitle.style.opacity) || 1;  // Retain current opacity
        socialLinks.style.opacity = parseFloat(socialLinks.style.opacity) || 1;  // Retain current opacity
        contactTitle.style.transform = `translateX(0)`; // Keep the title at its final position
        socialLinks.style.transform = `translateX(0)`; // Keep the social links at their final position

        // Re-enable transitions after a short delay
        setTimeout(function() {
            contactTitle.style.transition = "opacity 5s ease-out, transform 5s ease-out"; // Re-enable transition
            socialLinks.style.transition = "opacity 5s ease-out, transform 5s ease-out"; // Re-enable transition
        }, 50); // Add a small delay before re-enabling transition

        isScrolling = false;  // Reset the flag after scrolling stops
    }, 150); // Delay for 150ms to detect stop
});
// Function to detect the background color of sections and change navbar theme
function changeNavbarTheme() {
    const navbar = document.querySelector('.navbar');
    const logo = document.querySelector('.logo'); // Get the logo
    const sections = document.querySelectorAll('section');
    
    // Offset for smooth section detection
    let scrollPosition = window.scrollY + 200; // Change this offset based on your needs
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        
        // Check if the current scroll position is within the section's bounds
        if (scrollPosition >= sectionTop && scrollPosition <= sectionBottom) {
            // Detect the background color of the section
            const sectionBgColor = window.getComputedStyle(section).backgroundColor;
            
            // If the background color is dark, apply dark navbar theme
            if (isDarkBackground(sectionBgColor)) {
                navbar.classList.add('navbar-dark');
                navbar.classList.remove('navbar-light');
            } else {
                navbar.classList.add('navbar-light');
                navbar.classList.remove('navbar-dark');
            }
        }
    });
}

// Function to check if the background color is dark
function isDarkBackground(color) {
    const rgb = color.match(/\d+/g);
    const r = parseInt(rgb[0]);
    const g = parseInt(rgb[1]);
    const b = parseInt(rgb[2]);

    const brightness = 0.2126 * r + 0.7152 * g + 0.0722 * b;
    return brightness < 128;
}

// Listen for the scroll event to update the navbar theme
window.addEventListener('scroll', changeNavbarTheme);

// Initial theme update when the page loads
changeNavbarTheme();

function animateLeftRightLeft(elements) {
    const leftElements = document.querySelectorAll('.left');
    const rightElements = document.querySelectorAll('.right');

    let index = 0;

    // Animate left, right, left in order
    const sequence = [
        { elements: leftElements, delay: 0 },
        { elements: rightElements, delay: 800 }, // Delay for right elements
        { elements: leftElements, delay: 6500 }, // Delay for second left elements
    ];

    sequence.forEach(({ elements, delay }, seqIndex) => {
        setTimeout(() => {
            elements.forEach((element, elIndex) => {
                setTimeout(() => {
                    element.classList.add('visible');  // Add visible class to trigger fade-in effect
                }, elIndex * 1500); // Each element fades in with 1.5s delay
            });
        }, delay); // Delay the entire sequence
    });
}

// Function to animate progress bars from 0% to the target value
function animateProgressBars() {
    const progressBars = document.querySelectorAll('.progress');
    
    progressBars.forEach(bar => {
        const progressValue = bar.getAttribute('data-progress'); // Get the target progress value (e.g., '85%')
        
        // Start from 0% width immediately (default in CSS)
        bar.style.width = '0%';
        
        // Use a setTimeout to trigger the width change after a small delay
        setTimeout(() => {
            bar.style.width = progressValue; // Animate to the target value (e.g., '85%')
        }, 100); // Small delay before starting the animation (100ms)
    });
}

// Function to handle tab switching
document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll(".tab-link");
    const tabContents = document.querySelectorAll(".tab-content");

    tabs.forEach(tab => {
        tab.addEventListener("click", () => {
            // Remove active class from all tabs and hide all tab contents
            tabs.forEach(tab => tab.classList.remove("active"));
            tabContents.forEach(content => content.classList.remove("active"));

            // Add active class to the clicked tab and show corresponding content
            tab.classList.add("active");
            const target = tab.getAttribute("data-tab");
            document.getElementById(target).classList.add("active");
            animateProgressBars()
        });
    });

    // Initially trigger the first tab click
    tabs[0].click();
});



window.onload = function() {
    const contentContainer = document.querySelector('.content-container');

    // Fade in the welcome message first
    contentContainer.classList.add('fade-in');
}; 

// Function to check if an element is in the viewport
function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

// Function to animate elements when they come into view
function animateOnScroll() {
    const leftElements = document.querySelectorAll('.left');
    const rightElements = document.querySelectorAll('.right');

    leftElements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add('visible'); // Add class when in viewport
        }
    });

    rightElements.forEach((element) => {
        if (isInViewport(element)) {
            element.classList.add('visible'); // Add class when in viewport
        }
    });
}

// Function to animate progress bars on scroll
function animateProgressBarsOnScroll() {
    const progressBars = document.querySelectorAll('.progress');

    progressBars.forEach((bar) => {
        if (isInViewport(bar)) {
            const progressValue = bar.getAttribute('data-progress');
            bar.style.width = progressValue; // Animate progress bar when it enters view
        }
    });
}

// Event listener for scrolling
window.addEventListener("scroll", () => {
    animateOnScroll();
    animateProgressBarsOnScroll();
});

// Trigger animation for elements already in view on page load
document.addEventListener("DOMContentLoaded", () => {
    animateOnScroll();
    animateProgressBarsOnScroll();
});

document.querySelector(".scroll-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default jump behavior

    const target = document.querySelector("#skills"); // Target element
    window.scrollTo({
        top: target.offsetTop -100, // Adjust the offset if needed
        behavior: "smooth" // Enables smooth scrolling
    });
});