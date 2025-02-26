let lastScrollTop = 0;    // Store the last scroll position
let contactTitle = document.getElementById('contact-title');  // Get the title element
let socialLinks = document.querySelector('.social-links');  // Get the social links container

let isScrolling = false;   // Flag to check if scrolling is in progress

// Set a higher threshold to trigger the animation after a larger scroll
const scrollTriggerPercentage = 20; // Increase the required scroll percentage to 70%

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

// Get the modal and the project entry
let fullsdModal = document.getElementById("projectModal");
let iotProjectModal = document.getElementById("iotprojectModal");
let aimlProjectModal = document.getElementById("aimlprojectModal");
let mdadProjectModal = document.getElementById("mdadprojectModal");
let haiProjectModal = document.getElementById("haiprojectModal");
let mpProjectModal = document.getElementById("mpprojectModal");

// Get the project entries
let fullsdProjectEntry = document.getElementById("sell-swap-project");
let iotProjectEntry = document.getElementById("smart-home-project");
let aimlProjectEntry = document.getElementById("aiml-project");
let mdadProjectEntry = document.getElementById("mdad-project");
let haiProjectEntry = document.getElementById("hai-project");
let mpProjectEntry = document.getElementById("mp-project");

// Get the close buttons for both modals
let closeBtns = document.getElementsByClassName("close");

// Function to open the correct modal
function openProjectModal(modal) {
    modal.style.display = "block";
}

// When the user clicks on the Sell & Swap project entry, open the fullsdModal
fullsdProjectEntry.addEventListener("click", function() {
    openProjectModal(fullsdModal);
});

// When the user clicks on the Smart Home project entry, open the iotProjectModal
iotProjectEntry.addEventListener("click", function() {
    openProjectModal(iotProjectModal);
});

aimlProjectEntry.addEventListener("click", function() {
    openProjectModal(aimlProjectModal);
});

mdadProjectEntry.addEventListener("click", function() {
    openProjectModal(mdadProjectModal);
});

haiProjectEntry.addEventListener("click", function() {
    openProjectModal(haiProjectModal);
});

mpProjectEntry.addEventListener("click", function() {
    openProjectModal(mpprojectModal);
});

// When the user clicks on <span> (x), close the corresponding modal
Array.from(closeBtns).forEach(function(closeBtn) {
    closeBtn.addEventListener("click", function() {
        closeBtn.closest('.modal').style.display = "none";
    });
});

// When the user clicks anywhere outside of the modal, close it
window.addEventListener("click", function(event) {
    if (event.target == fullsdModal) {
        fullsdModal.style.display = "none";
    }
    if (event.target == iotProjectModal) {
        iotProjectModal.style.display = "none";
    }
    if (event.target == aimlProjectModal) {
        aimlProjectModal.style.display = "none";
    }
    if (event.target == mdadProjectModal) {
        mdadProjectModal.style.display = "none";
    }
    if (event.target == haiProjectModal) {
        haiProjectModal.style.display = "none";
    }
    if (event.target == mpProjectModal) {
        mpProjectModal.style.display = "none";
    }
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

    leftElements.forEach((element, index) => {
        if (isInViewport(element)) {
            setTimeout(() => {
                element.classList.add('visible'); // Add class when in viewport
            }, index * 100); // Decrease delay to make the items appear faster
        }
    });

    rightElements.forEach((element, index) => {
        if (isInViewport(element)) {
            setTimeout(() => {
                element.classList.add('visible'); // Add class when in viewport
            }, index * 100); // Decrease delay to make the items appear faster
        }
    });
}

// Event listener for scrolling
window.addEventListener("scroll", () => {
    animateOnScroll();
});

// Trigger animation for elements already in view on page load
document.addEventListener("DOMContentLoaded", () => {
    animateOnScroll();
});

document.querySelector(".scroll-link").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default jump behavior

    const target = document.querySelector("#skills"); // Target element
    window.scrollTo({
        top: target.offsetTop -100, // Adjust the offset if needed
        behavior: "smooth" // Enables smooth scrolling
    });
});

// Function to handle image navigation and change for each modal
function changeImage(src, modalId) {
    document.querySelector(`#${modalId} #displayedImage`).src = src;
    const modalImages = getModalImages(modalId);
    modalImages.currentIndex = modalImages.indexOf(src);
}

function prevImage(modalId) {
    const modalImages = getModalImages(modalId);
    modalImages.currentIndex = (modalImages.currentIndex - 1 + modalImages.length) % modalImages.length;
    document.querySelector(`#${modalId} #displayedImage`).src = modalImages[modalImages.currentIndex];
}

function nextImage(modalId) {
    const modalImages = getModalImages(modalId);
    modalImages.currentIndex = (modalImages.currentIndex + 1) % modalImages.length;
    document.querySelector(`#${modalId} #displayedImage`).src = modalImages[modalImages.currentIndex];
}

function getModalImages(modalId) {
    // Store images for each modal separately
    if (!window.modalImageData) window.modalImageData = {};

    if (!window.modalImageData[modalId]) {
        if (modalId === 'iotprojectModal') {
            window.modalImageData[modalId] = [
                'images/iotp/system_diagram.png',
                'images/iotp/dashboard.png',
                'images/iotp/flask_app.png',
                'images/iotp/mqtt.png'
            ];
        } else if (modalId === 'projectModal') {
            window.modalImageData[modalId] = [
                'images/fullsd/fullsd_home.png',
                'images/fullsd/fullsd_buy.png',
                'images/fullsd/fullsd_chat.png',
                'images/fullsd/fullsd_create.png',
                'images/fullsd/fullsd_offer_history.png',
                'images/fullsd/fullsd_approve_reject.png'
            ];
        } else if (modalId === 'aimlprojectModal') {
            window.modalImageData[modalId] = [
                'images/aiml/model_layer.png',
                'images/aiml/2Dmodel_training.png',
                'images/aiml/2Dmodel_training_graph.png'
            ];
        } else if (modalId === 'mdadprojectModal') { 
            window.modalImageData[modalId] = [
                'images/mdad/home.png',
                'images/mdad/communities.png',
                'images/mdad/chat.png',
                "images/mdad/create.png",
                "images/mdad/account.png",
                "images/mdad/crop.png"
            ];
        }else if (modalId === 'haiprojectModal') { 
            window.modalImageData[modalId] = [
                'images/hai/home.png',
                'images/hai/query.png'
            ];
        }
        else if (modalId === 'mpprojectModal') { 
            window.modalImageData[modalId] = [
                'images/mp/hardware.png',
                'images/mp/hardware_circuit.png',
                'images/mp/hardware_circuit2.png',
                'images/mp/system_diagram.png',
                'images/mp/flask.png',
                'images/mp/dashboard.png',
                'images/mp/2d_3d_model.png'
            ];
        }
        window.modalImageData[modalId].currentIndex = 0; // Start at the first image
    }
    return window.modalImageData[modalId]; // <-- this was outside of the function block
}
