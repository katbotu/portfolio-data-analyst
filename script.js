Claude


Script · JS
/* ==========================================================
   Portfolio Data Analyst — Ketsia Botuwa
   script.js v3 : thème sombre, texte animé, projets repliables
   (JavaScript pur, aucune dépendance)
   ========================================================== */
 
(() => {
    "use strict";
 
    const root = document.documentElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
 
    /* ---------- 1. Mode clair / sombre ---------- */
    const navbar = document.querySelector(".navbar");
    const themeMeta = document.querySelector('meta[name="theme-color"]');
 
    const readTheme = () => {
        try { return localStorage.getItem("theme"); } catch { return null; }
    };
    const saveTheme = (value) => {
        try { localStorage.setItem("theme", value); } catch { /* stockage indisponible */ }
    };
 
    const themeButton = document.createElement("button");
    themeButton.type = "button";
    themeButton.className = "theme-toggle";
 
    const applyTheme = (theme) => {
        root.dataset.theme = theme;
        const isDark = theme === "dark";
        themeButton.textContent = isDark ? "☀" : "☾";
        themeButton.setAttribute("aria-pressed", String(isDark));
        themeButton.setAttribute("aria-label", isDark ? "Passer au mode clair" : "Passer au mode sombre");
        if (themeMeta) themeMeta.setAttribute("content", isDark ? "#0f0e22" : "#f3f1ff");
    };
 
    applyTheme(readTheme() === "dark" ? "dark" : "light");
 
    themeButton.addEventListener("click", () => {
        const next = root.dataset.theme === "dark" ? "light" : "dark";
        applyTheme(next);
        saveTheme(next);
    });
 
    if (navbar) navbar.appendChild(themeButton);
 
    /* ---------- 2. Texte animé dans le hero ---------- */
    const heroTitle = document.querySelector(".hero h2");
 
    if (heroTitle && !reduceMotion) {
        const base = heroTitle.textContent.trim();
        const phrases = [
            base,
            "Power BI • SQL • Python",
            "Automatisation n8n & ETL",
            "IA & Machine Learning"
        ];
 
        heroTitle.setAttribute("aria-label", base);
        heroTitle.textContent = "";
 
        const typed = document.createElement("span");
        typed.className = "typed";
        typed.setAttribute("aria-hidden", "true");
        heroTitle.appendChild(typed);
 
        let phraseIndex = 0;
        let charIndex = 0;
        let deleting = false;
 
        const tick = () => {
            const phrase = phrases[phraseIndex];
            charIndex += deleting ? -1 : 1;
            typed.textContent = phrase.slice(0, charIndex);
 
            let delay = deleting ? 35 : 70;
 
            if (!deleting && charIndex === phrase.length) {
                deleting = true;
                delay = 1800;
            } else if (deleting && charIndex === 0) {
                deleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 350;
            }
            setTimeout(tick, delay);
        };
 
        tick();
    }
 
    /* ---------- 3. Projets repliables ---------- */
    document.querySelectorAll(".project-card").forEach((card, index) => {
        const details = card.querySelector(".project-details");
        if (!details) return;
 
        const id = `project-details-${index + 1}`;
        details.id = id;
 
        const button = document.createElement("button");
        button.type = "button";
        button.className = "toggle-details";
        button.setAttribute("aria-controls", id);
        button.innerHTML = '<span class="label"></span><span class="icon" aria-hidden="true"></span>';
 
        const setOpen = (open) => {
            details.hidden = !open;
            button.setAttribute("aria-expanded", String(open));
            button.querySelector(".label").textContent = open ? "Masquer les détails" : "Voir les détails";
        };
 
        // Le projet mis en avant reste ouvert, les autres sont repliés
        setOpen(card.classList.contains("featured-project"));
 
        button.addEventListener("click", () => setOpen(details.hidden));
        details.before(button);
    });
 
    /* ---------- 4. Barre de progression + lien actif ---------- */
    const progress = document.createElement("div");
    progress.className = "scroll-progress";
    progress.setAttribute("aria-hidden", "true");
    document.body.prepend(progress);
 
    const navLinks = [...document.querySelectorAll(".nav-links a[href^='#']")];
    const sections = navLinks
        .map((link) => document.querySelector(link.getAttribute("href")))
        .filter(Boolean);
 
    const updateOnScroll = () => {
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const ratio = maxScroll > 0 ? Math.min(window.scrollY / maxScroll, 1) : 0;
        progress.style.transform = `scaleX(${ratio})`;
 
        const probe = window.scrollY + window.innerHeight * 0.35;
        let current = sections[0];
        sections.forEach((section) => {
            if (section.offsetTop <= probe) current = section;
        });
        if (maxScroll > 0 && window.scrollY >= maxScroll - 4) current = sections[sections.length - 1];
 
        navLinks.forEach((link) => {
            const active = current && link.getAttribute("href") === `#${current.id}`;
            link.classList.toggle("active", Boolean(active));
            if (active) link.setAttribute("aria-current", "true");
            else link.removeAttribute("aria-current");
        });
    };
 
    let ticking = false;
    window.addEventListener("scroll", () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
            updateOnScroll();
            ticking = false;
        });
    }, { passive: true });
    window.addEventListener("resize", updateOnScroll);
    updateOnScroll();
 
    /* ---------- 5. Apparition au scroll ---------- */
    const targets = document.querySelectorAll(
        ".section-label, .section-title, .section-description, .about-content, " +
        ".skill-card, .project-card, .contact > p, .contact-buttons"
    );
 
    if (!reduceMotion && "IntersectionObserver" in window) {
        targets.forEach((el) => el.classList.add("reveal"));
 
        document.querySelectorAll(".skills-grid").forEach((grid) => {
            grid.querySelectorAll(".skill-card").forEach((card, i) => {
                card.style.transitionDelay = `${i * 80}ms`;
            });
        });
 
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;
                entry.target.classList.add("visible");
                obs.unobserve(entry.target);
            });
        }, { threshold: 0.1, rootMargin: "0px 0px -40px 0px" });
 
        targets.forEach((el) => observer.observe(el));
    }
})();
 
Claude a terminé sa réponse.
