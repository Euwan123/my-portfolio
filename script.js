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

function showGameModeWarning() {
    const modal = document.getElementById('gameModeWarning');
    modal.classList.add('active');
    const lightning = modal.querySelector('.lightning-effect');
    lightning.style.animation = 'none';
    setTimeout(() => {
        lightning.style.animation = 'lightning 0.5s ease-in-out';
    }, 10);
}

function closeGameModeWarning() {
    const modal = document.getElementById('gameModeWarning');
    modal.classList.remove('active');
}

function playGameModeVideo() {
    closeGameModeWarning();
    const videoContainer = document.getElementById('gameModeVideo');
    const video = document.getElementById('gameModeVideoPlayer');
    
    videoContainer.classList.add('active');
    video.currentTime = 0;
    video.play();
    
    const stopVideo = function() {
        video.pause();
        videoContainer.classList.remove('active');
        const gameGUI = document.getElementById('gameModeGUI');
        gameGUI.classList.add('active');
    };
    
    setTimeout(stopVideo, 17000);
    
    video.addEventListener('ended', stopVideo, { once: true });
}

function exitGameMode() {
    const gameGUI = document.getElementById('gameModeGUI');
    gameGUI.classList.remove('active');
    const video = document.getElementById('gameModeVideoPlayer');
    video.pause();
    video.currentTime = 0;
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

        const scrollToTopBtn = document.querySelector('.scroll-to-top');
        if (window.pageYOffset > 500) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }
    });

    window.addEventListener('scroll', () => {
        const nav = document.querySelector('nav');
        if (window.scrollY > 50) {
            if (document.body.classList.contains('dark-mode')) {
                nav.style.boxShadow = '0 2px 30px rgba(239, 83, 80, 0.2)';
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

    document.getElementById('gameModeWarning').addEventListener('click', function(e) {
        if (e.target === this) {
            closeGameModeWarning();
        }
    });
});
