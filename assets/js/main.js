// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🚀 INIT SMOOTH SCROLL (Lenis)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const lenis = new Lenis({
    lerp: 0.08, // cinematic buttery smooth
    smoothWheel: true,
});

function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);

// Sync GSAP ScrollTrigger with Lenis
gsap.registerPlugin(ScrollTrigger);

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🖱️ CUSTOM CURSOR
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const cursorDot = document.querySelector('.cursor-dot');
const cursorRing = document.querySelector('.cursor-ring');
const cursorLabel = document.querySelector('.cursor-label');

let mouseX = 0, mouseY = 0;
let ringX = 0, ringY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Dot follows instantly
    gsap.to(cursorDot, { x: mouseX, y: mouseY, duration: 0.1, ease: "power2.out" });
    
    // Magnetic delay for ring, standard delay without native magnets for speed
    gsap.to(cursorRing, { x: mouseX, y: mouseY, duration: 0.4, ease: "power2.out" });
});

// Cursor active states
const ctaMagnets = document.querySelectorAll('.cta-magnet, [data-cursor]');
ctaMagnets.forEach(el => {
    el.addEventListener('mouseenter', () => {
        const type = el.getAttribute('data-cursor') || 'view';
        if (type === 'play') {
            cursorRing.classList.add('active-play');
            cursorLabel.textContent = 'PLAY';
        } else {
            cursorRing.classList.add('active-view');
            cursorLabel.textContent = 'VIEW';
        }
    });
    el.addEventListener('mouseleave', () => {
        cursorRing.classList.remove('active-play', 'active-view');
        cursorLabel.textContent = '';
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎬 PAGE LOAD ANIMATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
window.addEventListener('load', () => {
    const tl = gsap.timeline();
    
    // Fade in glitch logo
    tl.to('.loader-logo', { opacity: 1, duration: 0.5 })
      .to('.loader-logo', { opacity: 0, duration: 0.5, delay: 0.5 })
      
      // Cinematic bars lift and drop
      .to('.bar-top', { yPercent: -100, duration: 1.2, ease: "expo.inOut" }, "-=0.2")
      .to('.bar-bottom', { yPercent: 100, duration: 1.2, ease: "expo.inOut" }, "<")
      
      // Reveal contents
      .from('.hero-label', { opacity: 0, y: 20, duration: 0.8 }, "-=0.5")
      .from('.hero-title', { opacity: 0, scale: 0.95, duration: 1, ease: "expo.out" }, "-=0.6")
      .from('.hero-subtitle', { opacity: 0, y: 20, duration: 0.8 }, "-=0.8")
      .from('.hero-ctas .btn', { opacity: 0, y: 20, stagger: 0.2, duration: 0.8 }, "-=0.6")
      .from('.navbar', { opacity: 0, y: -20, duration: 1 }, "-=1")
      
      // Typewriter label
      .call(typeLabel);
});

function typeLabel() {
    const text = "[ Video Editor · Motion Graphics · Egypt ]";
    const el = document.getElementById('hero-label');
    let i = 0;
    const interval = setInterval(() => {
        el.textContent += text.charAt(i);
        i++;
        if (i > text.length - 1) clearInterval(interval);
    }, 50);
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🌌 PARTICLES.JS (tsParticles)
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
tsParticles.load("particles-js", {
    particles: {
        number: {
            value: window.innerWidth > 768 ? 60 : 15,
            density: { enable: true, value_area: 800 }
        },
        color: { value: ["#7c3aed", "#06b6d4"] },
        shape: { type: "circle" },
        opacity: {
            value: 0.5,
            random: true,
            anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false }
        },
        size: {
            value: 3,
            random: true,
            anim: { enable: true, speed: 2, size_min: 0.1, sync: false }
        },
        links: {
            enable: window.innerWidth > 768,
            distance: 150,
            color: "rgba(255,255,255,0.1)",
            opacity: 0.4,
            width: 1
        },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            random: false,
            straight: false,
            out_mode: "out",
            bounce: false,
        }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "grab" },
            onclick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            grab: { distance: 200, links: { opacity: 0.8 } }
        }
    },
    retina_detect: true
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🧭 NAVIGATION
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

const mobileBtn = document.querySelector('.mobile-menu-btn');
const mobileMenu = document.querySelector('.mobile-menu');
const mLinks = document.querySelectorAll('.m-link');

let menuOpen = false;
mobileBtn.addEventListener('click', () => {
    menuOpen = !menuOpen;
    mobileMenu.classList.toggle('active');
    
    // Hamburger to X morph
    const spans = mobileBtn.querySelectorAll('span');
    if(menuOpen) {
        spans[0].style.transform = 'translateY(8px) rotate(45deg)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'translateY(-8px) rotate(-45deg)';
    } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
    }
});

mLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileBtn.click();
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 💼 SERVICES HORIZONTAL SCROLL
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
if (window.innerWidth > 768) {
    const hScrollWrapper = document.querySelector('.h-scroll-wrapper');
    const hScrollContainer = document.querySelector('.h-scroll-container');
    
    // Get width to translate
    function getScrollAmount() {
        let wrapperWidth = hScrollWrapper.scrollWidth;
        return -(wrapperWidth - window.innerWidth + window.innerWidth * 0.1);
    }

    const tween = gsap.to(hScrollWrapper, {
        x: getScrollAmount,
        ease: "none"
    });

    ScrollTrigger.create({
        trigger: hScrollContainer,
        start: "top top",
        end: () => `+=${getScrollAmount() * -1}`,
        pin: true,
        animation: tween,
        scrub: 1,
        invalidateOnRefresh: true
    });
    
    // Draw SVG on scroll
    gsap.utils.toArray('.svg-draw').forEach((svg, i) => {
        let paths = svg.querySelectorAll('path, line, polygon, circle, rect');
        gsap.from(paths, {
            scrollTrigger: {
                trigger: hScrollContainer, // animate when section is hit
                start: "top center",
            },
            strokeDasharray: 200,
            strokeDashoffset: 200,
            duration: 2,
            ease: "power2.inOut",
            stagger: 0.2
        });
    });
}

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🎞️ PORTFOLIO FILTERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const filterBtns = document.querySelectorAll('.filter-btn');
const bentoItems = document.querySelectorAll('.bento-item');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // active state
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.getAttribute('data-filter');
        
        // crossfade
        gsap.to(bentoItems, {
            scale: 0.9, opacity: 0, shadowBlur: 0, duration: 0.3, onComplete: () => {
                bentoItems.forEach(item => {
                    if (filter === 'all' || item.classList.contains(`filter-${filter}`)) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
                ScrollTrigger.refresh(); // Refresh lenis/scrolltrigger
                gsap.to(bentoItems, { scale: 1, opacity: 1, duration: 0.4, clearProps: "all" });
            }
        });
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ⚡ EXPERIENCE TIMELINE
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const tlLine = document.querySelector('.timeline-line');
const tlItems = document.querySelectorAll('.timeline-item');

ScrollTrigger.create({
    trigger: '.timeline-container',
    start: "top 80%",
    end: "bottom 50%",
    onUpdate: self => {
        gsap.set(tlLine, { scaleY: self.progress });
    }
});

tlItems.forEach(item => {
    gsap.from(item, {
        scrollTrigger: {
            trigger: item,
            start: "top 85%",
        },
        y: 50,
        opacity: 0,
        rotationX: 45,
        duration: 0.8,
        ease: "back.out(1.7)"
    });
});

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 🛠️ SKILLS GAUGES & COUNTERS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
const observerOptions = { threshold: 0.5 };
const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Rings
            const ring = entry.target.querySelector('.progress-ring');
            if (ring) {
                const pct = ring.getAttribute('data-pct');
                const offset = 283 - (283 * pct) / 100;
                ring.style.strokeDashoffset = offset;
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.skill-ring-wrap').forEach(el => skillObserver.observe(el));

// Stat counters in About section
const statObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll('.counter');
            counters.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                let count = 0;
                const updateCount = () => {
                    const inc = target / 30; // speed
                    if (count < target) {
                        count += inc;
                        counter.innerText = Math.ceil(count);
                        setTimeout(updateCount, 50);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCount();
            });
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.stats-row').forEach(el => statObserver.observe(el));


// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// 📬 CONTACT FORM & ANIMATIONS
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// Section Title Blur Reveal
gsap.to('.blur-reveal', {
    scrollTrigger: {
        trigger: '.contact',
        start: "top 60%"
    },
    filter: "blur(0px)",
    opacity: 1,
    duration: 1.5,
    ease: "power2.out"
});

// Form Sub
const form = document.getElementById('form');
const submitBtn = document.querySelector('.submit-btn');
const sendIcon = document.querySelector('.send-icon');
const spinner = document.querySelector('.spinner');
const btnText = document.querySelector('.btn-text');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // show loading
    sendIcon.style.display = 'none';
    spinner.style.display = 'block';
    btnText.textContent = 'Sending...';
    
    setTimeout(() => {
        // mock success
        spinner.style.display = 'none';
        btnText.textContent = 'Message Sent';
        submitBtn.style.background = 'var(--cyan)';
        submitBtn.style.borderColor = 'var(--cyan)';
        form.reset();
        
        setTimeout(() => {
            sendIcon.style.display = 'block';
            btnText.textContent = 'Send Message';
            submitBtn.style.background = 'var(--violet)';
            submitBtn.style.borderColor = 'var(--violet)';
        }, 3000);
        
    }, 1500);
});

// Back to top
const bttBtn = document.getElementById('btt');
bttBtn.addEventListener('click', () => {
    lenis.scrollTo(0, { duration: 1.5 });
});
