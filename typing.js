(function () {

    console.log("typing.js loaded");

    const typingEl = document.getElementById("typing");

    if (!typingEl) {
        console.log("No element with id='typing' found on this page");
        return;
    }

    const roles = ["Web Developer", "Frontend Developer", "Excel & Data Specialist"];
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    function type() {

        const current = roles[roleIndex];
        typingEl.textContent = current.substring(0, charIndex);

        if (!deleting && charIndex < current.length) {
            charIndex++;
            setTimeout(type, 90);
        } else if (!deleting) {
            deleting = true;
            setTimeout(type, 1500);
        } else if (charIndex > 0) {
            charIndex--;
            setTimeout(type, 50);
        } else {
            deleting = false;
            roleIndex = (roleIndex + 1) % roles.length;
            setTimeout(type, 300);
        }

    }

    type();

})();