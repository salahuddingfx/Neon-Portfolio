/* =========================================================================
   script.js — Consolidated, cleaned and production-ready
   Features:
     - Single DOMContentLoaded handler
     - Custom cursor (smooth follow + hover scale)
     - Theme system (persist to localStorage)
     - Mobile nav (hamburger) fixed
     - Active nav highlight on scroll
     - Smooth scrolling
     - Intro particles + intro screen safe guards
     - Typing animation
     - Date & time footer
     - Contact + Hiring forms (Formspree) with user feedback, errors, and fallback
     - Testimonials carousel (auto + controls)
     - Reveal on scroll (IntersectionObserver)
     - Skills filter
     - vCard download
     - Hiring form toggle (open/close)
   Notes:
     - All DOM lookups are guarded to avoid runtime errors
     - No duplicated listeners or duplicate logic
   ======================================================================== */

document.addEventListener("DOMContentLoaded", () => {
  // ---------- Helpers ----------
  const $ = (sel, ctx = document) => ctx.querySelector(sel);
  const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));
  const safeText = (el, txt) => { if (el) el.textContent = txt; };

  // ---------- CONFIG ----------
  const defaultConfig = {
    hero_name: "SALAH UDDIN KADER",
    hero_title: "Full Stack Developer & Designer",
    hero_subtitle:
      "Crafting digital experiences with cutting-edge technology and creative innovation.",
    contact_email: "salahuddin@example.com",
    contact_phone: "+1 (234) 567-890",
    contact_location: "Dhaka, Bangladesh",
  };

  // ---------- CUSTOM CURSOR ----------
  const customCursor = $("#customCursor");
  const cursorDot = $("#cursorDot");

  if (customCursor && cursorDot) {
    // base CSS should position them via CSS; JS only controls coords & hover class.
    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let curX = mouseX, curY = mouseY;
    let dotX = mouseX, dotY = mouseY;
    const lerp = (a, b, n) => a + (b - a) * n;

    document.addEventListener("mousemove", (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    // Hover targets for scale
    const hoverSelector = [
      "a", "button", ".nav-link", ".social-link", ".portfolio-item",
      ".service-card", ".skill-category", ".testimonial-nav", "input",
      "textarea", "select", ".card"
    ].join(", ");

    // attach hover listeners
    $$(hoverSelector).forEach(el => {
      el.addEventListener("mouseenter", () => {
        customCursor.classList.add("hover");
        cursorDot.classList.add("hover");
      });
      el.addEventListener("mouseleave", () => {
        customCursor.classList.remove("hover");
        cursorDot.classList.remove("hover");
      });
    });

    function animateCursor() {
      curX = lerp(curX, mouseX, 0.15);
      curY = lerp(curY, mouseY, 0.15);
      dotX = lerp(dotX, mouseX, 0.28);
      dotY = lerp(dotY, mouseY, 0.28);

      // set positions (no translate here — keep transform only for centering if necessary)
      customCursor.style.left = `${curX}px`;
      customCursor.style.top = `${curY}px`;
      cursorDot.style.left = `${dotX}px`;
      cursorDot.style.top = `${dotY}px`;

      // ensure baseline transform for non-hover state (keeps scale origin correct)
      if (!customCursor.classList.contains("hover")) {
        customCursor.style.transform = "translate(-50%, -50%)";
      }
      if (!cursorDot.classList.contains("hover")) {
        cursorDot.style.transform = "translate(-50%, -50%)";
      }

      requestAnimationFrame(animateCursor);
    }
    requestAnimationFrame(animateCursor);
  }

  // ---------- THEME TOGGLE ----------
  const themeToggle = $("#themeToggle");
  const html = document.documentElement;
  const THEME_KEY = "theme";

  function applyTheme(theme) {
    if (!html) return;
    html.setAttribute("data-theme", theme);
    // icon
    if (themeToggle) {
      const i = themeToggle.querySelector("i");
      if (i) i.className = (theme === "dark") ? "fas fa-sun" : "fas fa-moon";
    }
  }

  const savedTheme = localStorage.getItem(THEME_KEY) || "dark";
  applyTheme(savedTheme);

  if (themeToggle) {
    themeToggle.addEventListener("click", () => {
      const current = html.getAttribute("data-theme") || "dark";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(THEME_KEY, next);
    });
  }

  // ---------- MOBILE NAV (HAMBURGER) ----------
  const hamburgerMenu = $("#hamburgerMenu");
  const navLinks = $("#navLinks");

  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener("click", () => {
      navLinks.classList.toggle("active");
      hamburgerMenu.classList.toggle("active");
    });

    // close nav when a nav-link clicked
    $$(".nav-link", navLinks).forEach(a => {
      a.addEventListener("click", () => {
        navLinks.classList.remove("active");
        hamburgerMenu.classList.remove("active");
      });
    });
  }

  // ---------- NAV ACTIVE SCROLL HIGHLIGHT ----------
  const sections = $$("section[id]");
  const navItems = $$(".nav-link");

  function updateActiveNav() {
    let current = "";
    const offset = 150;
    const scrollPos = window.pageYOffset || document.documentElement.scrollTop;

    sections.forEach(sec => {
      const top = sec.offsetTop - offset;
      if (scrollPos >= top) current = sec.getAttribute("id") || "";
    });

    navItems.forEach(link => {
      link.classList.remove("active-section");
      const href = link.getAttribute("href") || "";
      if (current && href.includes(`#${current}`)) {
        link.classList.add("active-section");
      }
    });
  }
  updateActiveNav();
  window.addEventListener("scroll", updateActiveNav, { passive: true });

  // ---------- SMOOTH SCROLLING ----------
  $$('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  // ---------- INTRO PARTICLES (safe) ----------
  const introParticles = $("#introParticles");
  if (introParticles) {
    // remove existing children (prevent duplicates if script reloaded)
    while (introParticles.firstChild) introParticles.removeChild(introParticles.firstChild);
    const count = 50;
    for (let i = 0; i < count; i++) {
      const p = document.createElement("div");
      p.className = "particle";
      p.style.left = `${Math.random() * 100}%`;
      p.style.top = `${Math.random() * 100}%`;
      p.style.animationDelay = `${Math.random() * 3}s`;
      p.style.animationDuration = `${Math.random() * 2 + 2}s`;
      introParticles.appendChild(p);
    }
  }

  // ---------- TYPING ANIMATION ----------
  const typingText = $("#typingText");
  if (typingText) {
    const skills = [
      'Full Stack Developer','React Developer','Node.js Expert','Python Developer',
      'UI/UX Designer','JavaScript Expert','TypeScript Developer','Vue.js Developer',
      'Next.js Developer','Backend Developer','Frontend Developer','Web Designer',
      'API Developer','Database Expert','DevOps Engineer','Mobile App Developer',
      'GraphQL Developer','AWS Expert','Docker Specialist','Git Expert'
    ];
    let skillIndex = 0, charIndex = 0, isDeleting = false;
    function typeSkill() {
      const cs = skills[skillIndex];
      if (isDeleting) {
        charIndex = Math.max(0, charIndex - 1);
        typingText.textContent = cs.substring(0, charIndex);
      } else {
        charIndex = Math.min(cs.length, charIndex + 1);
        typingText.textContent = cs.substring(0, charIndex);
      }

      let delay = isDeleting ? 50 : 100;
      if (!isDeleting && charIndex === cs.length) { delay = 2000; isDeleting = true; }
      if (isDeleting && charIndex === 0) { isDeleting = false; skillIndex = (skillIndex + 1) % skills.length; delay = 500; }

      setTimeout(typeSkill, delay);
    }
    typeSkill();
  }

  // ---------- DATE & TIME ----------
  const footerDate = $("#footerDateDisplay");
  const footerTime = $("#footerTimeDisplay");
  function updateDateTime() {
    const now = new Date();
    if (footerDate) {
      const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
      footerDate.textContent = now.toLocaleDateString('en-US', options);
    }
    if (footerTime) {
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12; hours = hours ? hours : 12;
      footerTime.textContent = `${String(hours).padStart(2,'0')}:${String(minutes).padStart(2,'0')}:${String(seconds).padStart(2,'0')} ${ampm}`;
    }
  }
  updateDateTime();
  setInterval(updateDateTime, 1000);

  // ---------- REVEAL ON SCROLL (IntersectionObserver) ----------
  const revealEls = $$(".reveal");
  if (revealEls.length) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(ent => {
        if (ent.isIntersecting) ent.target.classList.add("active");
      });
    }, { threshold: 0.15 });
    revealEls.forEach(e => obs.observe(e));
  }

  // ---------- SKILLS FILTER ----------
  const skillBtns = $$(".skill-filter-btn");
  const skillCats = $$(".skill-category");
  if (skillBtns.length && skillCats.length) {
    skillBtns.forEach(btn => {
      btn.addEventListener("click", () => {
        const cat = btn.getAttribute("data-category");
        skillBtns.forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        skillCats.forEach(sc => {
          if (!cat || cat === "all" || sc.getAttribute("data-category") === cat) {
            sc.classList.remove("hidden");
            sc.style.display = "block";
          } else {
            sc.classList.add("hidden");
            // small timeout to keep animation feel
            setTimeout(() => sc.style.display = "none", 300);
          }
        });
      });
    });
  }

  // ---------- TESTIMONIALS CAROUSEL ----------
  const testimonialsTrack = $("#testimonialsTrack");
  const prevBtn = $("#prevBtn");
  const nextBtn = $("#nextBtn");
  const dotsContainer = $("#testimonialDots");

  if (testimonialsTrack && dotsContainer) {
    const testimonials = $$(".testimonial-card", testimonialsTrack);
    let currentIndex = 0;
    let autoPlayInterval = null;

    // create dots
    dotsContainer.innerHTML = "";
    testimonials.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "testimonial-dot";
      if (i === 0) dot.classList.add("active");
      dot.addEventListener("click", () => goTo(i));
      dotsContainer.appendChild(dot);
    });
    const dots = $$(".testimonial-dot", dotsContainer);

    function updateTrack() {
      testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
      dots.forEach((d, idx) => d.classList.toggle("active", idx === currentIndex));
    }
    function goTo(i) { currentIndex = i % testimonials.length; updateTrack(); resetAuto(); }
    function next() { currentIndex = (currentIndex + 1) % testimonials.length; updateTrack(); }
    function prev() { currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length; updateTrack(); }

    if (nextBtn) nextBtn.addEventListener("click", () => { next(); resetAuto(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prev(); resetAuto(); });

    function startAuto() { autoPlayInterval = setInterval(next, 5000); }
    function resetAuto() { clearInterval(autoPlayInterval); startAuto(); }

    // pause on hover
    testimonialsTrack.addEventListener("mouseenter", () => clearInterval(autoPlayInterval));
    testimonialsTrack.addEventListener("mouseleave", () => startAuto());

    startAuto();
  }

  // ---------- VCard DOWNLOAD ----------
  const downloadVCardBtn = $("#downloadVCard");
  if (downloadVCardBtn) {
    downloadVCardBtn.addEventListener("click", () => {
      const vCardData = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        "FN:Salah Uddin Kader",
        "N:Kader;Salah Uddin;;;",
        "TITLE:Full Stack Developer & Designer",
        "EMAIL:salauddinkaderappy@gmail.com",
        "TEL:+8801851075537",
        "ADR:;;Dhaka;Bangladesh;;;",
        "URL:https://github.com/salahuddingfx",
        "NOTE:Full Stack Developer | UI/UX Designer | Graphics Designer | Digital Marketer | Civil Technology Student",
        "ORG:Freelance Developer",
        "END:VCARD"
      ].join("\n");
      const blob = new Blob([vCardData], { type: "text/vcard" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "SalahUddinKader.vcf";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  // ---------- HIRING FORM TOGGLE ----------
  const hiringNavBtn = $("#hiringNavBtn");
  const closeHiringBtn = $("#closeHiringBtn");
  const hiringSection = $("#hiring");
  if (hiringNavBtn && hiringSection) {
    let visible = false;
    const toggleHiring = () => {
      visible = !visible;
      if (visible) {
        hiringSection.style.display = "block";
        hiringSection.classList.remove("section-fade-out");
        hiringSection.classList.add("section-fade-in");
        setTimeout(() => hiringSection.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
      } else {
        hiringSection.classList.remove("section-fade-in");
        hiringSection.classList.add("section-fade-out");
        setTimeout(() => hiringSection.style.display = "none", 600);
      }
      // close mobile nav
      if (navLinks) navLinks.classList.remove("active");
      if (hamburgerMenu) hamburgerMenu.classList.remove("active");
    };
    hiringNavBtn.addEventListener("click", toggleHiring);
    if (closeHiringBtn) closeHiringBtn.addEventListener("click", toggleHiring);
  }

  // ---------- FORMS (Contact + Hiring) using Formspree ----------
  // Shared helper for form submission
  async function submitForm(formEl, submitBtn, btnTextEl, messageEl, successMsg = "Submitted!") {
    if (!formEl) return;
    const url = formEl.action;
    if (!url) {
      messageEl && (messageEl.textContent = "Form action URL missing.");
      return;
    }
    submitBtn && (submitBtn.disabled = true);
    if (btnTextEl) btnTextEl.textContent = "Sending...";

    const fd = new FormData(formEl);

    try {
      // Prefer fetch; if network fails, report error to user
      const resp = await fetch(url, {
        method: "POST",
        body: fd,
        headers: { "Accept": "application/json" },
        keepalive: true
      });
      if (resp.ok) {
        messageEl && (messageEl.textContent = successMsg);
        messageEl && messageEl.classList && messageEl.classList.add("success-message");
        formEl.reset();
      } else {
        // some endpoints respond 422 with validation errors — show message
        let msg = "Submission failed";
        try { const json = await resp.json(); if (json && json.error) msg = json.error; } catch {}
        messageEl && (messageEl.textContent = msg);
        messageEl && messageEl.classList && messageEl.classList.add("error-message");
      }
    } catch (err) {
      // network error — try Beacon fallback for short data (optional)
      try {
        const payload = new URLSearchParams();
        for (const [k, v] of fd.entries()) payload.append(k, v);
        if (navigator.sendBeacon) {
          navigator.sendBeacon(url, payload);
          messageEl && (messageEl.textContent = "Message queued (offline).");
          formEl.reset();
        } else {
          messageEl && (messageEl.textContent = "Network error. Try again.");
        }
      } catch (e) {
        messageEl && (messageEl.textContent = "Network error. Try again.");
      }
      messageEl && messageEl.classList && messageEl.classList.add("error-message");
    } finally {
      submitBtn && (submitBtn.disabled = false);
      if (btnTextEl) btnTextEl.textContent = submitBtn ? (submitBtn.dataset.defaultText || "Send Message") : "Send";
      // hide messages after 5s
      if (messageEl) {
        messageEl.style.display = "block";
        setTimeout(() => { messageEl.style.display = "none"; messageEl.textContent = ""; }, 5000);
      }
    }
  }

  // Contact
  const contactForm = $("#contactForm");
  const contactSubmitBtn = $("#contactSubmitBtn");
  const contactBtnText = $("#contactBtnText");
  const contactMessage = $("#contactMessage");
  if (contactSubmitBtn && contactBtnText) contactSubmitBtn.dataset.defaultText = contactBtnText.textContent || "Send Message";

  if (contactForm && contactSubmitBtn) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm(contactForm, contactSubmitBtn, contactBtnText, contactMessage, "Message sent successfully!");
    });
  }

  // Hiring
  const hiringForm = $("#hiringForm");
  const hiringSubmitBtn = $("#hiringSubmitBtn");
  const hiringBtnText = $("#hiringBtnText");
  const hiringMessage = $("#hiringMessage");
  if (hiringSubmitBtn && hiringBtnText) hiringSubmitBtn.dataset.defaultText = hiringBtnText.textContent || "Submit Application";

  if (hiringForm && hiringSubmitBtn) {
    hiringForm.addEventListener("submit", (e) => {
      e.preventDefault();
      submitForm(hiringForm, hiringSubmitBtn, hiringBtnText, hiringMessage, "Application submitted!");
    });
  }

  // ---------- CONFIG MAPPING (if elementSdk exists) ----------
  if (window.elementSdk) {
    window.elementSdk.init && window.elementSdk.init({
      defaultConfig,
      onConfigChange: async (cfg = {}) => {
        // apply config values safely
        safeText($("#heroName"), cfg.hero_name || defaultConfig.hero_name);
        safeText($("#heroTitle"), cfg.hero_title || defaultConfig.hero_title);
        safeText($("#heroSubtitle"), cfg.hero_subtitle || defaultConfig.hero_subtitle);
        const fe = $("#footerEmail"); if (fe) { fe.textContent = cfg.contact_email || defaultConfig.contact_email; fe.href = `mailto:${cfg.contact_email || defaultConfig.contact_email}`; }
        const fp = $("#footerPhone"); if (fp) { fp.textContent = cfg.contact_phone || defaultConfig.contact_phone; fp.href = `tel:${cfg.contact_phone || defaultConfig.contact_phone}`; }
        safeText($("#footerLocation"), cfg.contact_location || defaultConfig.contact_location);
      },
      mapToCapabilities: () => ({ recolorables: [], borderables: [], fontEditable: undefined, fontSizeable: undefined })
    });
  }

  // ---------- REMOVE CLOUD-IFRAME SNIPPET IF IN DOM (defensive) ----------
  // (If you use Cloudflare challenge snippet inlined, it may inject iframes; nothing to do here.)

}); // DOMContentLoaded end

(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9ac66a8b062a4ea6',t:'MTc2NTQ3MTE0Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();