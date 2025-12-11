document.addEventListener('DOMContentLoaded', () => {

  /* -------------------------
        CUSTOM CURSOR
  -------------------------- */
  const customCursor = document.getElementById('customCursor');
  const cursorDot = document.getElementById('cursorDot');

  if (customCursor && cursorDot) {

    const interactiveElements = document.querySelectorAll(
      'a, button, .nav-link, .social-link, .portfolio-item, .service-card, .skill-category, .testimonial-nav, input, textarea, select'
    );

    interactiveElements.forEach(el => {
      el.addEventListener('mouseenter', () => {
        customCursor.classList.add('hover');
        cursorDot.classList.add('hover');
      });
      el.addEventListener('mouseleave', () => {
        customCursor.classList.remove('hover');
        cursorDot.classList.remove('hover');
      });
    });

    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    let dotX = 0, dotY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animateCursor() {

      cursorX += (mouseX - cursorX) * 0.15;
      cursorY += (mouseY - cursorY) * 0.15;

      dotX += (mouseX - dotX) * 0.25;
      dotY += (mouseY - dotY) * 0.25;

      if (!customCursor.classList.contains("hover")) {
        customCursor.style.transform = "translate(-50%, -50%)";
      }
      if (!cursorDot.classList.contains("hover")) {
        cursorDot.style.transform = "translate(-50%, -50%)";
      }

      customCursor.style.left = cursorX + "px";
      customCursor.style.top = cursorY + "px";

      cursorDot.style.left = dotX + "px";
      cursorDot.style.top = dotY + "px";

      requestAnimationFrame(animateCursor);
    }

    animateCursor();
  }

  /* -------------------------
        THEME TOGGLE
  -------------------------- */
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;

  if (themeToggle) {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    html.setAttribute('data-theme', savedTheme);

    function updateThemeIcon(theme) {
      const icon = themeToggle.querySelector('i');
      if (!icon) return;
      icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    }

    updateThemeIcon(savedTheme);

    themeToggle.addEventListener('click', () => {
      const current = html.getAttribute('data-theme');
      const newTheme = current === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
    });
  }

  /* -------------------------
      MOBILE NAVIGATION
  -------------------------- */
  const hamburgerMenu = document.getElementById('hamburgerMenu');
  const navLinks = document.getElementById('navLinks');

  if (hamburgerMenu && navLinks) {
    hamburgerMenu.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      hamburgerMenu.classList.toggle('active');
    });
  }

  /* ---------------------------------
      NAV ACTIVE SCROLL HIGHLIGHT
  ---------------------------------- */
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(sec => {
      let secTop = sec.offsetTop - 150;
      if (pageYOffset >= secTop) {
        current = sec.getAttribute("id");
      }
    });

    navItems.forEach(link => {
      link.classList.remove("active-section");
      if (link.getAttribute("href").includes(current)) {
        link.classList.add("active-section");
      }
    });
  });

  /* -------------------------
        CONTACT FORM
  -------------------------- */
  const contactForm = document.getElementById('contactForm');
const contactSubmitBtn = document.getElementById('contactSubmitBtn');
const contactBtnText = document.getElementById('contactBtnText');
const contactMessage = document.getElementById('contactMessage');

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        contactSubmitBtn.disabled = true;
        contactBtnText.textContent = "Sending...";

        const formData = new FormData(contactForm);

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: formData,
                headers: { "Accept": "application/json" }
            });

            if (response.ok) {
                contactMessage.textContent = "Message sent successfully!";
                contactMessage.className = "message success-message";
                contactForm.reset();
            } else {
                contactMessage.textContent = "Error sending message!";
                contactMessage.className = "message error-message";
            }
        } catch (err) {
            contactMessage.textContent = "Network error!";
            contactMessage.className = "message error-message";
        }

        contactSubmitBtn.disabled = false;
        contactBtnText.textContent = "Send Message";

        setTimeout(() => {
            contactMessage.textContent = "";
        }, 4000);
    });
}

  /* -------------------------
        HIRING FORM
  -------------------------- */
  const hiringForm = document.getElementById('hiringForm');
  const hiringBtn = document.getElementById('hiringSubmitBtn');
  const hiringBtnText = document.getElementById('hiringBtnText');
  const hiringMessage = document.getElementById('hiringMessage');

  if (hiringForm) {
    hiringForm.addEventListener("submit", async e => {
      e.preventDefault();

      hiringBtn.disabled = true;
      hiringBtnText.textContent = "Submitting...";

      const formData = new FormData(hiringForm);

      const resp = await fetch(hiringForm.action, {
        method: "POST",
        body: formData,
        headers: { "Accept": "application/json" },
        keepalive: true
      });

      if (resp.ok) {
        hiringMessage.textContent = "Application submitted!";
        hiringMessage.className = "message success-message";
        hiringForm.reset();
      } else {
        hiringMessage.textContent = "Failed! Try again.";
        hiringMessage.className = "message error-message";
      }

      hiringBtn.disabled = false;
      hiringBtnText.textContent = "Submit Application";

      setTimeout(() => hiringMessage.textContent = "", 4000);
    });
  }

});

document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       CUSTOM CURSOR
    ============================ */
    const customCursor = document.getElementById("customCursor");
    const cursorDot = document.getElementById("cursorDot");

    if (customCursor && cursorDot) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let dotX = 0, dotY = 0;

        document.addEventListener("mousemove", e => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });

        function animateCursor() {
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;

            dotX += (mouseX - dotX) * 0.25;
            dotY += (mouseY - dotY) * 0.25;

            customCursor.style.left = cursorX + "px";
            customCursor.style.top = cursorY + "px";

            cursorDot.style.left = dotX + "px";
            cursorDot.style.top = dotY + "px";

            if (!customCursor.classList.contains("hover")) {
                customCursor.style.transform = "translate(-50%, -50%)";
            }
            if (!cursorDot.classList.contains("hover")) {
                cursorDot.style.transform = "translate(-50%, -50%)";
            }

            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        const hoverTargets = document.querySelectorAll(
            "a, button, .nav-link, input, textarea, select, .card, .service-card"
        );

        hoverTargets.forEach(t => {
            t.addEventListener("mouseenter", () => {
                customCursor.classList.add("hover");
                cursorDot.classList.add("hover");
            });
            t.addEventListener("mouseleave", () => {
                customCursor.classList.remove("hover");
                cursorDot.classList.remove("hover");
            });
        });
    }

    /* ============================
       THEME TOGGLE
    ============================ */
    const themeToggle = document.getElementById("themeToggle");
    const html = document.documentElement;

    const savedTheme = localStorage.getItem("theme") || "dark";
    html.setAttribute("data-theme", savedTheme);
    updateIcon(savedTheme);

    function updateIcon(theme) {
        const icon = themeToggle.querySelector("i");
        if (icon) icon.className = theme === "light" ? "fas fa-moon" : "fas fa-sun";
    }

    themeToggle.addEventListener("click", () => {
        const current = html.getAttribute("data-theme");
        const newTheme = current === "dark" ? "light" : "dark";
        html.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateIcon(newTheme);
    });

    /* ============================
       NAV ACTIVE SECTION
    ============================ */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-link");

    window.addEventListener("scroll", () => {
        let current = "";

        sections.forEach(sec => {
            const top = sec.offsetTop - 150;
            if (scrollY >= top) {
                current = sec.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active-section");
            if (link.getAttribute("href").includes(current)) {
                link.classList.add("active-section");
            }
        });
    });

});

// Configuration
        const defaultConfig = {
            hero_name: "SALAH UDDIN KADER",
            hero_title: "Full Stack Developer & Designer",
            hero_subtitle: "Crafting digital experiences with cutting-edge technology and creative innovation. Specializing in web development, UI/UX design, and interactive applications.",
            about_title: "About Me",
            services_title: "My Services",
            skills_title: "Technical Skills",
            journey_title: "My Journey",
            portfolio_title: "Featured Projects",
            testimonials_title: "What Clients Say",
            contact_title: "Let's Work Together",
            hiring_title: "Hire Me",
            contact_email: "salahuddin@example.com",
            contact_phone: "+1 (234) 567-890",
            contact_location: "Dhaka, Bangladesh"
        };
        
        // Intro Animation
        const introScreen = document.querySelector('.intro-screen');
        const introParticles = document.getElementById('introParticles');
        
        // Create particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 3 + 's';
            particle.style.animationDuration = (Math.random() * 2 + 2) + 's';
            introParticles.appendChild(particle);
        }
        
        // Typing Animation
        const typingText = document.getElementById('typingText');
        const skills = [
            'Full Stack Developer',
            'React Developer',
            'Node.js Expert',
            'Python Developer',
            'UI/UX Designer',
            'JavaScript Expert',
            'TypeScript Developer',
            'Vue.js Developer',
            'Next.js Developer',
            'Backend Developer',
            'Frontend Developer',
            'Web Designer',
            'API Developer',
            'Database Expert',
            'DevOps Engineer',
            'Mobile App Developer',
            'GraphQL Developer',
            'AWS Expert',
            'Docker Specialist',
            'Git Expert'
        ];
        
        let skillIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        
        function typeSkill() {
            const currentSkill = skills[skillIndex];
            
            if (isDeleting) {
                typingText.textContent = currentSkill.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                typingText.textContent = currentSkill.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }
            
            if (!isDeleting && charIndex === currentSkill.length) {
                typingSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                skillIndex = (skillIndex + 1) % skills.length;
                typingSpeed = 500; // Pause before next word
            }
            
            setTimeout(typeSkill, typingSpeed);
        }
        
        // Start typing animation immediately
        typeSkill();
        
        // Date and Time Display
        function updateDateTime() {
            const now = new Date();
            
            // Format date
            const options = { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
            const dateStr = now.toLocaleDateString('en-US', options);
            
            // Format time (12-hour)
            let hours = now.getHours();
            const minutes = now.getMinutes();
            const seconds = now.getSeconds();
            const ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            
            const timeStr = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')} ${ampm}`;
            
            document.getElementById('footerDateDisplay').textContent = dateStr;
            document.getElementById('footerTimeDisplay').textContent = timeStr;
        }
        
        updateDateTime();
        setInterval(updateDateTime, 1000);
        
        // Theme Toggle
        const themeToggle = document.getElementById('themeToggle');
        const html = document.documentElement;
        
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('theme') || 'dark';
        html.setAttribute('data-theme', savedTheme);
        updateThemeIcon(savedTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
        
        function updateThemeIcon(theme) {
            const icon = themeToggle.querySelector('i');
            if (theme === 'dark') {
                icon.className = 'fas fa-sun';
            } else {
                icon.className = 'fas fa-moon';
            }
        }
        
        // Hamburger Menu
        const hamburgerMenu = document.getElementById('hamburgerMenu');
        const navLinks = document.getElementById('navLinks');
        
        hamburgerMenu.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburgerMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                hamburgerMenu.classList.remove('active');
            });
        });
        
        // Hiring Form Toggle
        const hiringNavBtn = document.getElementById('hiringNavBtn');
        const closeHiringBtn = document.getElementById('closeHiringBtn');
        const hiringSection = document.getElementById('hiring');
        let isHiringFormVisible = false;
        
        function toggleHiringForm() {
            isHiringFormVisible = !isHiringFormVisible;
            
            if (isHiringFormVisible) {
                hiringSection.style.display = 'block';
                hiringSection.classList.remove('section-fade-out');
                hiringSection.classList.add('section-fade-in');
                
                setTimeout(() => {
                    hiringSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }, 100);
            } else {
                hiringSection.classList.remove('section-fade-in');
                hiringSection.classList.add('section-fade-out');
                
                setTimeout(() => {
                    hiringSection.style.display = 'none';
                }, 600);
            }
            
            // Close mobile menu
            navLinks.classList.remove('active');
            hamburgerMenu.classList.remove('active');
        }
        
        hiringNavBtn.addEventListener('click', toggleHiringForm);
        closeHiringBtn.addEventListener('click', toggleHiringForm);
        
        // Nav Logo Click - Reload Page
        const navLogo = document.getElementById('navLogo');
        navLogo.addEventListener('click', () => {
            window.location.reload();
        });
        
        // Smooth Scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });
        
        // Custom Cursor Functionality
        const customCursor = document.getElementById('customCursor');
        const cursorDot = document.getElementById('cursorDot');
        
        let mouseX = 0;
        let mouseY = 0;
        let cursorX = 0;
        let cursorY = 0;
        let dotX = 0;
        let dotY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            // Smooth follow for main cursor
            cursorX += (mouseX - cursorX) * 0.15;
            cursorY += (mouseY - cursorY) * 0.15;
            
            // Faster follow for dot
            dotX += (mouseX - dotX) * 0.25;
            dotY += (mouseY - dotY) * 0.25;
            
            customCursor.style.left = cursorX + 'px';
            customCursor.style.top = cursorY + 'px';
            customCursor.style.transform = 'translate(-50%, -50%)';
            
            cursorDot.style.left = dotX + 'px';
            cursorDot.style.top = dotY + 'px';
            cursorDot.style.transform = 'translate(-50%, -50%)';
            
            requestAnimationFrame(animateCursor);
        }
        
        animateCursor();
        
        // Add hover effect for interactive elements
        const interactiveElements = document.querySelectorAll('a, button, .nav-link, .social-link, .portfolio-item, .service-card, .skill-category, .testimonial-nav, input, textarea, select');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                customCursor.classList.add('hover');
                cursorDot.classList.add('hover');
            });
            
            el.addEventListener('mouseleave', () => {
                customCursor.classList.remove('hover');
                cursorDot.classList.remove('hover');
            });
        });
        
        // Skills Filter Functionality
        const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
        const skillCategories = document.querySelectorAll('.skill-category');
        
        skillFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.getAttribute('data-category');
                
                // Update active button
                skillFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                // Filter categories
                skillCategories.forEach(cat => {
                    if (category === 'all') {
                        cat.classList.remove('hidden');
                        setTimeout(() => {
                            cat.style.display = 'block';
                        }, 10);
                    } else {
                        if (cat.getAttribute('data-category') === category) {
                            cat.classList.remove('hidden');
                            setTimeout(() => {
                                cat.style.display = 'block';
                            }, 10);
                        } else {
                            cat.classList.add('hidden');
                            setTimeout(() => {
                                cat.style.display = 'none';
                            }, 300);
                        }
                    }
                });
            });
        });
        
        // Reveal Animations
        const revealElements = document.querySelectorAll('.reveal');
        
        const revealObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.15
        });
        
        revealElements.forEach(el => {
            revealObserver.observe(el);
        });
        
        // Testimonials Carousel
        const testimonialsTrack = document.getElementById('testimonialsTrack');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const dotsContainer = document.getElementById('testimonialDots');
        
        const testimonials = document.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        let autoPlayInterval;
        
        // Create dots
        testimonials.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = 'testimonial-dot';
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = document.querySelectorAll('.testimonial-dot');
        
        function updateCarousel() {
            testimonialsTrack.style.transform = `translateX(-${currentIndex * 100}%)`;
            
            dots.forEach((dot, index) => {
                dot.classList.toggle('active', index === currentIndex);
            });
        }
        
        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
            resetAutoPlay();
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % testimonials.length;
            updateCarousel();
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
            updateCarousel();
        }
        
        function startAutoPlay() {
            autoPlayInterval = setInterval(nextSlide, 5000);
        }
        
        function resetAutoPlay() {
            clearInterval(autoPlayInterval);
            startAutoPlay();
        }
        
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
        
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
        
        startAutoPlay();
        
        testimonialsTrack.addEventListener('mouseenter', () => {
            clearInterval(autoPlayInterval);
        });
        
        testimonialsTrack.addEventListener('mouseleave', () => {
            startAutoPlay();
        });
        
        // Contact Form Handler
        const contactForm = document.getElementById('contactForm');
        const contactSubmitBtn = document.getElementById('contactSubmitBtn');
        const contactBtnText = document.getElementById('contactBtnText');
        const contactMessage = document.getElementById('contactMessage');
        
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            contactSubmitBtn.disabled = true;
            contactBtnText.textContent = 'Sending...';
            
            const formData = new FormData(contactForm);
            
            try {
                const response = await fetch(contactForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    contactMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                    contactMessage.className = 'message success-message';
                    contactMessage.style.display = 'block';
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                contactMessage.textContent = 'Oops! Something went wrong. Please try again.';
                contactMessage.className = 'message error-message';
                contactMessage.style.display = 'block';
            } finally {
                contactSubmitBtn.disabled = false;
                contactBtnText.textContent = 'Send Message';
                
                setTimeout(() => {
                    contactMessage.style.display = 'none';
                }, 5000);
            }
        });
        
        // Hiring Form Handler
        const hiringForm = document.getElementById('hiringForm');
        const hiringSubmitBtn = document.getElementById('hiringSubmitBtn');
        const hiringBtnText = document.getElementById('hiringBtnText');
        const hiringMessage = document.getElementById('hiringMessage');
        
        hiringForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            hiringSubmitBtn.disabled = true;
            hiringBtnText.textContent = 'Submitting...';
            
            const formData = new FormData(hiringForm);
            
            try {
                const response = await fetch(hiringForm.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });
                
                if (response.ok) {
                    hiringMessage.textContent = 'Application submitted successfully! I\'ll review it and get back to you soon.';
                    hiringMessage.className = 'message success-message';
                    hiringMessage.style.display = 'block';
                    hiringForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            } catch (error) {
                hiringMessage.textContent = 'Oops! Something went wrong. Please try again.';
                hiringMessage.className = 'message error-message';
                hiringMessage.style.display = 'block';
            } finally {
                hiringSubmitBtn.disabled = false;
                hiringBtnText.textContent = 'Submit Application';
                
                setTimeout(() => {
                    hiringMessage.style.display = 'none';
                }, 5000);
            }
        });
        
        // Config update function
        async function onConfigChange(config) {
            const heroName = document.getElementById('heroName');
            if (heroName) {
                heroName.textContent = config.hero_name || defaultConfig.hero_name;
            }
            
            const heroTitle = document.getElementById('heroTitle');
            if (heroTitle) {
                heroTitle.textContent = config.hero_title || defaultConfig.hero_title;
            }
            
            const heroSubtitle = document.getElementById('heroSubtitle');
            if (heroSubtitle) {
                heroSubtitle.textContent = config.hero_subtitle || defaultConfig.hero_subtitle;
            }
            
            const aboutTitle = document.getElementById('aboutTitle');
            if (aboutTitle) {
                aboutTitle.textContent = config.about_title || defaultConfig.about_title;
            }
            
            const servicesTitle = document.getElementById('servicesTitle');
            if (servicesTitle) {
                servicesTitle.textContent = config.services_title || defaultConfig.services_title;
            }
            
            const skillsTitle = document.getElementById('skillsTitle');
            if (skillsTitle) {
                skillsTitle.textContent = config.skills_title || defaultConfig.skills_title;
            }
            
            const journeyTitle = document.getElementById('journeyTitle');
            if (journeyTitle) {
                journeyTitle.textContent = config.journey_title || defaultConfig.journey_title;
            }
            
            const portfolioTitle = document.getElementById('portfolioTitle');
            if (portfolioTitle) {
                portfolioTitle.textContent = config.portfolio_title || defaultConfig.portfolio_title;
            }
            
            const testimonialsTitle = document.getElementById('testimonialsTitle');
            if (testimonialsTitle) {
                testimonialsTitle.textContent = config.testimonials_title || defaultConfig.testimonials_title;
            }
            
            const contactTitle = document.getElementById('contactTitle');
            if (contactTitle) {
                contactTitle.textContent = config.contact_title || defaultConfig.contact_title;
            }
            
            const hiringTitle = document.getElementById('hiringTitle');
            if (hiringTitle) {
                hiringTitle.textContent = config.hiring_title || defaultConfig.hiring_title;
            }
            
            const footerEmail = document.getElementById('footerEmail');
            if (footerEmail) {
                footerEmail.textContent = config.contact_email || defaultConfig.contact_email;
                footerEmail.href = `mailto:${config.contact_email || defaultConfig.contact_email}`;
            }
            
            const footerPhone = document.getElementById('footerPhone');
            if (footerPhone) {
                footerPhone.textContent = config.contact_phone || defaultConfig.contact_phone;
                footerPhone.href = `tel:${config.contact_phone || defaultConfig.contact_phone}`;
            }
            
            const footerLocation = document.getElementById('footerLocation');
            if (footerLocation) {
                footerLocation.textContent = config.contact_location || defaultConfig.contact_location;
            }
        }
        
        // VCard Download Function
        const downloadVCardBtn = document.getElementById('downloadVCard');
        
        downloadVCardBtn.addEventListener('click', () => {
            const vCardData = `BEGIN:VCARD
VERSION:3.0
FN:Salah Uddin Kader
N:Kader;Salah Uddin;;;
TITLE:Full Stack Developer & Designer
EMAIL:salauddinkaderappy@gmail.com
TEL:+8801851075537
ADR:;;Dhaka;Bangladesh;;;
URL:https://github.com/salahuddingfx
NOTE:Full Stack Developer | UI/UX Designer | Graphics Designer | Digital Marketer | Civil Technology Student
ORG:Freelance Developer
END:VCARD`;
            
            const blob = new Blob([vCardData], { type: 'text/vcard' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = 'SalahUddinKader.vcf';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        });
        
        // Initialize Elements SDK
        if (window.elementSdk) {
            window.elementSdk.init({
                defaultConfig: defaultConfig,
                onConfigChange: onConfigChange,
                mapToCapabilities: (config) => ({
                    recolorables: [],
                    borderables: [],
                    fontEditable: undefined,
                    fontSizeable: undefined
                }),
                mapToEditPanelValues: (config) => new Map([
                    ["hero_name", config.hero_name || defaultConfig.hero_name],
                    ["hero_title", config.hero_title || defaultConfig.hero_title],
                    ["hero_subtitle", config.hero_subtitle || defaultConfig.hero_subtitle],
                    ["about_title", config.about_title || defaultConfig.about_title],
                    ["services_title", config.services_title || defaultConfig.services_title],
                    ["skills_title", config.skills_title || defaultConfig.skills_title],
                    ["journey_title", config.journey_title || defaultConfig.journey_title],
                    ["portfolio_title", config.portfolio_title || defaultConfig.portfolio_title],
                    ["testimonials_title", config.testimonials_title || defaultConfig.testimonials_title],
                    ["contact_title", config.contact_title || defaultConfig.contact_title],
                    ["hiring_title", config.hiring_title || defaultConfig.hiring_title],
                    ["contact_email", config.contact_email || defaultConfig.contact_email],
                    ["contact_phone", config.contact_phone || defaultConfig.contact_phone],
                    ["contact_location", config.contact_location || defaultConfig.contact_location]
                ])
            });
        }


(function(){function c(){var b=a.contentDocument||a.contentWindow.document;if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'9ac66a8b062a4ea6',t:'MTc2NTQ3MTE0Ny4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();