(function () {

    const section = document.querySelector(".process");
    const steps = document.querySelectorAll(".process-step");

    if (!section || !steps.length) {
        return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
        !("IntersectionObserver" in window)) {
        return;
    }

    section.classList.add("process-ready");

    const stepObserver = new IntersectionObserver((entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                const index = Array.from(steps).indexOf(entry.target);
                entry.target.style.transitionDelay = (index * 0.15) + "s";
                entry.target.classList.add("in-view");
                stepObserver.unobserve(entry.target);
            }

        });

    }, { threshold: 0.2 });

    steps.forEach((step) => stepObserver.observe(step));

})();