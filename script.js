// Lets the CSS know JavaScript is running
document.documentElement.classList.add("js");


// =========================
// MOBILE HAMBURGER MENU
// =========================

const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
});


// =========================
// ADVANCED SCROLL ANIMATION
// =========================

const animatedElements = document.querySelectorAll(
    ".about, .skills, .projects, .services, .contact, " +
    ".skills-heading, .skill-card, " +
    ".projects-heading, .project-card, " +
    ".services-heading, .service-card, " +
    ".contact-heading, .contact-item, .contact-form, " +
    ".explore-btn"
);

// True while the page is scrolling because a nav link was clicked
let navScrolling = false;
let scrollTimer;

const observer = new IntersectionObserver(
    (entries) => {

        // Skip reveals while passing through sections
        if (navScrolling) {
            return;
        }

        entries.forEach((entry) => {

            if (entry.isIntersecting) {

                entry.target.classList.add("show");
                observer.unobserve(entry.target);

                // Remove the stagger delay after the reveal so hover feels instant
                setTimeout(() => {
                    entry.target.classList.add("done");
                }, 1500);

            }

        });

    },
    {
        threshold: 0.15
    }
);

animatedElements.forEach((element) => {
    observer.observe(element);
});

// When the nav scroll finishes, check what is on screen and reveal it
function finishNavScroll() {

    navScrolling = false;

    animatedElements.forEach((element) => {

        if (!element.classList.contains("show")) {
            observer.unobserve(element);
            observer.observe(element);
        }

    });

}

window.addEventListener("scroll", () => {

    if (!navScrolling) {
        return;
    }

    clearTimeout(scrollTimer);
    scrollTimer = setTimeout(finishNavScroll, 150);

});


// =========================
// NAVIGATION LINK CLICK
// =========================

const navItems = document.querySelectorAll(".nav-links a");

navItems.forEach((link) => {

    link.addEventListener("click", () => {

        // Close mobile menu
        navLinks.classList.remove("active");

        // Pause reveals until the scroll stops
        navScrolling = true;

        clearTimeout(scrollTimer);
        scrollTimer = setTimeout(finishNavScroll, 800);

    });

});