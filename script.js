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

// =========================
// SMOOTH SCROLLING (LENIS)
// =========================

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

if (typeof Lenis !== "undefined" && !prefersReducedMotion) {

    const lenis = new Lenis({
        duration: 1.2,
        smoothWheel: true,
        anchors: true
    });

    function raf(time) {
        lenis.raf(time);
        requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

}

// =========================
// CONTACT FORM
// =========================

const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

if (contactForm) {

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const button = contactForm.querySelector("button");
        button.disabled = true;
        button.textContent = "Sending...";

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            formStatus.textContent = "Thank you! Your message has been sent.";
            formStatus.className = "form-status success";
            contactForm.reset();

        } catch (error) {

            formStatus.textContent = "Something went wrong. Please try again or email me directly.";
            formStatus.className = "form-status error";

        }

        button.disabled = false;
        button.textContent = "Send Message";

    });

}

    contactForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        const button = contactForm.querySelector("button");
        button.disabled = true;
        button.textContent = "Sending...";

        try {

            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            contactForm.reset();
            showStatus("Thank you! Your message has been sent.", "success", 6);

        } catch (error) {

            showStatus("Something went wrong. Please try again or email me directly.", "error", 8);

        }

        button.disabled = false;
        button.textContent = "Send Message";

    });

