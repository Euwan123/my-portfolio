function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    
    try {
        localStorage.setItem('darkMode', isDarkMode);
    } catch (e) {
        console.warn('localStorage not available:', e);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === 'true') {
            document.body.classList.add('dark-mode');
        }
    } catch (e) {
        console.warn('localStorage not available:', e);
    }

    const skillBars = document.querySelectorAll('.skill-bar div');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const width = skillBar.style.width;
                skillBar.style.setProperty('--skill-width', width);
                skillBar.classList.add('animated');
                observer.unobserve(skillBar);
            }
        });
    }, observerOptions);

    skillBars.forEach(bar => observer.observe(bar));

    document.querySelectorAll('nav ul li a').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = anchor.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const navHeight = document.querySelector('nav').offsetHeight;
                const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - navHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');

    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (window.pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    const reflectionBtns = document.querySelectorAll('.reflection-btn');
    const reflectionContents = document.querySelectorAll('.reflection-content');

    if (reflectionBtns.length > 0 && reflectionContents.length > 0) {
        reflectionBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetContent = btn.getAttribute('data-reflection');
                
                reflectionBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                
                reflectionContents.forEach(content => {
                    content.classList.remove('active');
                    if (content.getAttribute('data-content') === targetContent) {
                        content.classList.add('active');
                    }
                });
            });
        });

        reflectionBtns[0].click();
    }
});

window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.15)';
    } else {
        nav.style.boxShadow = '0 2px 10px var(--shadow-light)';
    }
});

const fadeInElements = document.querySelectorAll('section');
const fadeInObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, {
    threshold: 0.1
});

fadeInElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    fadeInObserver.observe(el);
});
