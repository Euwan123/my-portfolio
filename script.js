function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    try {
        localStorage.setItem('darkMode', isDarkMode);
    } catch (e) {
        console.warn('localStorage not available:', e);
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

function openGameModePrompt() {
    const overlay = document.getElementById('game-mode-overlay');
    const prompt = document.getElementById('game-mode-prompt');
    const screen = document.getElementById('game-mode-screen');
    
    screen.style.display = 'none';
    prompt.style.display = 'block';
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeGameModePrompt() {
    const overlay = document.getElementById('game-mode-overlay');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

function startGameMode() {
    const prompt = document.getElementById('game-mode-prompt');
    const screen = document.getElementById('game-mode-screen');
    const video = document.querySelector('.game-mode-video');
    
    prompt.style.display = 'none';
    screen.style.display = 'flex';
    
    document.body.classList.add('developer-mode');
    
    if (video) {
        video.currentTime = 0;
        video.play();
    }
}

function exitGameMode() {
    const overlay = document.getElementById('game-mode-overlay');
    const video = document.querySelector('.game-mode-video');
    
    document.body.classList.remove('developer-mode');
    
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    
    closeGameModePrompt();
}

document.addEventListener('DOMContentLoaded', () => {
    try {
        const savedTheme = localStorage.getItem('darkMode');
        if (savedTheme === null || savedTheme === 'true') {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    } catch (e) {
        console.warn('localStorage not available:', e);
        document.body.classList.add('dark-mode');
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

    const sections = document.querySelectorAll('section');
    const sectionObserverOptions = {
        threshold: 0.2
    };

    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                sectionObserver.unobserve(entry.target);
            }
        });
    }, sectionObserverOptions);

    sections.forEach(section => sectionObserver.observe(section));

    const timeline = document.querySelector('.timeline');
    if (timeline) {
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    timeline.classList.add('visible');
                    timelineObserver.unobserve(timeline);
                }
            });
        }, { threshold: 0.1 });
        timelineObserver.observe(timeline);
    }

    const scrollToTopButton = document.querySelector('.scroll-to-top');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            scrollToTopButton.classList.add('visible');
        } else {
            scrollToTopButton.classList.remove('visible');
        }
    });

    const nav = document.querySelector('nav');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            if (document.body.classList.contains('dark-mode')) {
                nav.style.boxShadow = '0 2px 30px rgba(233, 30, 99, 0.2)';
            } else {
                nav.style.boxShadow = '0 2px 30px rgba(0, 0, 0, 0.15)';
            }
        } else {
            nav.style.boxShadow = '0 2px 20px var(--shadow-light)';
        }
    });

    const projectCards = document.querySelectorAll('.project');
    projectCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });

    const achievementCards = document.querySelectorAll('.achievement-card');
    achievementCards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#' && href.length > 1) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const navHeight = document.querySelector('nav').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - navHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});
