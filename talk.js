(function () {

    // Change these two lines if your details change
    const WHATSAPP_NUMBER = "2347070332678";
    const CONTACT_EMAIL = "joshuaobiorah99@gmail.com";

    // Find every "Let's Talk" button on the page
    const triggers = Array.from(document.querySelectorAll("a, button")).filter((el) => {
        return el.classList.contains("nav-cta") || /^let\S?s talk$/i.test(el.textContent.trim());
    });

    if (!triggers.length) {
        return;
    }

    // Styles
    const style = document.createElement("style");
    style.textContent = `
        body.talk-open { overflow: hidden; }
        .talk-modal { position: fixed; inset: 0; z-index: 5000; display: flex; align-items: center; justify-content: center; padding: 20px; background: rgba(5,2,10,0.78); backdrop-filter: blur(4px); opacity: 0; visibility: hidden; transition: opacity .3s ease, visibility .3s ease; }
        .talk-modal.open { opacity: 1; visibility: visible; }
        .talk-panel { position: relative; width: min(560px,100%); max-height: 92vh; overflow-y: auto; padding: 34px 30px 26px; background: #120b1d; border: 1px solid #3b2454; border-radius: 20px; box-shadow: 0 25px 70px rgba(124,58,237,0.25); color: white; transform: translateY(24px) scale(0.97); transition: transform .4s cubic-bezier(0.16,1,0.3,1); }
        .talk-modal.open .talk-panel { transform: translateY(0) scale(1); }
        .talk-close { position: absolute; top: 14px; right: 16px; width: 38px; height: 38px; background: none; border: none; border-radius: 8px; color: #c9c3d1; font-size: 28px; line-height: 1; cursor: pointer; }
        .talk-close:hover { background: #241333; color: white; }
        .talk-status { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; font-size: 14px; color: #c9c3d1; }
        .talk-dot { width: 10px; height: 10px; border-radius: 50%; background: #4ade80; animation: talkPulse 2s infinite; }
        @keyframes talkPulse { 0% { box-shadow: 0 0 0 0 rgba(74,222,128,0.6); } 70% { box-shadow: 0 0 0 10px rgba(74,222,128,0); } 100% { box-shadow: 0 0 0 0 rgba(74,222,128,0); } }
        .talk-panel h3 { margin: 0 0 6px; font-size: 30px; }
        .talk-intro { margin: 0 0 20px; color: #c9c3d1; }
        .talk-options { display: grid; grid-template-columns: 1fr 1fr; gap: 14px; }
        .talk-option { display: flex; flex-direction: column; gap: 4px; padding: 18px; background: #1b1029; border: 1px solid #3b2454; border-radius: 14px; color: white; text-decoration: none; transition: transform .3s ease, border-color .3s ease; }
        .talk-option span { font-size: 26px; }
        .talk-option small { color: #c9c3d1; font-size: 12.5px; overflow-wrap: anywhere; }
        .talk-option:hover { transform: translateY(-4px); border-color: #a855f7; }
        .talk-divider { display: flex; align-items: center; gap: 12px; margin: 22px 0 16px; font-size: 13px; color: #c9c3d1; }
        .talk-divider::before, .talk-divider::after { content: ""; flex: 1; height: 1px; background: #3b2454; }
        .talk-form { display: flex; flex-direction: column; gap: 12px; }
        .talk-form input[type="text"], .talk-form select, .talk-form textarea { width: 100%; padding: 13px 14px; background: #0b0614; color: white; border: 1px solid #3b2454; border-radius: 10px; outline: none; font-family: inherit; font-size: 15px; box-sizing: border-box; }
        .talk-form input[type="text"]:focus, .talk-form select:focus, .talk-form textarea:focus { border-color: #a855f7; }
        .talk-form select option { background: #120b1d; }
        .talk-form textarea { resize: vertical; }
        .talk-form fieldset { margin: 0; padding: 10px 14px 12px; border: 1px solid #3b2454; border-radius: 10px; }
        .talk-form legend { padding: 0 6px; font-size: 13px; color: #c9c3d1; }
        .talk-check { display: flex; align-items: center; gap: 10px; padding: 5px 0; font-size: 15px; cursor: pointer; }
        .talk-check input { width: 17px; height: 17px; accent-color: #7c3aed; }
        .talk-submit { padding: 14px; background: #7c3aed; color: white; border: none; border-radius: 8px; font-size: 16px; cursor: pointer; transition: background .3s ease, transform .3s ease; }
        .talk-submit:hover { background: #9333ea; transform: translateY(-2px); }
        @media (max-width: 520px) { .talk-panel { padding: 30px 20px 22px; } .talk-options { grid-template-columns: 1fr; } }
    `;
    document.head.appendChild(style);

    // Pop-up
    const modal = document.createElement("div");
    modal.className = "talk-modal";
    modal.setAttribute("aria-hidden", "true");

    modal.innerHTML = `
        <div class="talk-panel" role="dialog" aria-modal="true" aria-labelledby="talk-title" data-lenis-prevent>

            <button class="talk-close" type="button" aria-label="Close">&times;</button>

            <p class="talk-status"><span class="talk-dot"></span>Available for new projects</p>

            <h3 id="talk-title">Let's talk</h3>
            <p class="talk-intro">Choose the way that suits you best.</p>

            <div class="talk-options">
                <a class="talk-option" id="talk-whatsapp" target="_blank" rel="noopener">
                    <span>💬</span>
                    <strong>WhatsApp</strong>
                    <small>Fastest reply</small>
                </a>
                <a class="talk-option" id="talk-email">
                    <span>📧</span>
                    <strong>Email</strong>
                    <small>${CONTACT_EMAIL}</small>
                </a>
            </div>

            <div class="talk-divider">or tell me about your project</div>

            <form class="talk-form" id="talk-form">

                <input type="text" name="name" placeholder="Your name" required>

                <select name="business" required>
                    <option value="">What kind of business is it?</option>
                    <option>Cafe or restaurant</option>
                    <option>Shop or store</option>
                    <option>Company</option>
                    <option>Personal brand</option>
                    <option>Something else</option>
                </select>

                <fieldset>
                    <legend>What do you need?</legend>
                    <label class="talk-check"><input type="checkbox" name="need" value="A new website"> A new website</label>
                    <label class="talk-check"><input type="checkbox" name="need" value="Online ordering"> Online ordering</label>
                    <label class="talk-check"><input type="checkbox" name="need" value="WhatsApp integration"> WhatsApp integration</label>
                    <label class="talk-check"><input type="checkbox" name="need" value="A redesign of my current website"> A redesign of my current website</label>
                </fieldset>

                <select name="timeline">
                    <option>When do you need it?</option>
                    <option>As soon as possible</option>
                    <option>Within a month</option>
                    <option>Within 3 months</option>
                    <option>I'm just exploring</option>
                </select>

                <textarea name="details" rows="3" placeholder="Anything else I should know? (optional)"></textarea>

                <button class="talk-submit" type="submit">Send on WhatsApp</button>

            </form>

        </div>
    `;

    document.body.appendChild(modal);

    const panel = modal.querySelector(".talk-panel");
    const form = modal.querySelector("#talk-form");
    let lastFocus = null;

    const quickMessage = "Hi Joshua, I saw your portfolio and I'd like to talk about a website for my business.";

    modal.querySelector("#talk-whatsapp").href =
        "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(quickMessage);

    modal.querySelector("#talk-email").href =
        "mailto:" + CONTACT_EMAIL + "?subject=" + encodeURIComponent("Website enquiry from your portfolio");

    function openModal(event) {
        event.preventDefault();
        lastFocus = document.activeElement;
        modal.classList.add("open");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("talk-open");
        setTimeout(() => form.querySelector("input").focus(), 50);
    }

    function closeModal() {
        modal.classList.remove("open");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("talk-open");
        if (lastFocus) {
            lastFocus.focus();
        }
    }

    triggers.forEach((trigger) => trigger.addEventListener("click", openModal));

    modal.querySelector(".talk-close").addEventListener("click", closeModal);

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            closeModal();
        }
    });

    document.addEventListener("keydown", (event) => {

        if (!modal.classList.contains("open")) {
            return;
        }

        if (event.key === "Escape") {
            closeModal();
            return;
        }

        if (event.key === "Tab") {
            const focusable = panel.querySelectorAll("a[href], button, input, select, textarea");
            const first = focusable[0];
            const last = focusable[focusable.length - 1];

            if (event.shiftKey && document.activeElement === first) {
                event.preventDefault();
                last.focus();
            } else if (!event.shiftKey && document.activeElement === last) {
                event.preventDefault();
                first.focus();
            }
        }

    });

    form.addEventListener("submit", (event) => {

        event.preventDefault();

        const data = new FormData(form);
        const name = data.get("name").trim();
        const business = data.get("business");
        const needs = data.getAll("need");
        const timeline = data.get("timeline");
        const details = data.get("details").trim();

        const lines = [
            "Hello Joshua, my name is " + name + ". I'm reaching out from your portfolio.",
            "",
            "Business type: " + business,
            "What I need: " + (needs.length ? needs.join(", ") : "Not sure yet"),
            "Timeline: " + (timeline.startsWith("When") ? "Not sure yet" : timeline)
        ];

        if (details) {
            lines.push("", "More details: " + details);
        }

        window.open(
            "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(lines.join("\n")),
            "_blank",
            "noopener"
        );

        form.reset();
        closeModal();

    });

})();