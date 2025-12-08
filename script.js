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
    if (!modal) return;
    modal.classList.add('active');
    const lightning = modal.querySelector('.lightning-effect');
    if (lightning) {
        lightning.style.animation = 'none';
        setTimeout(() => {
            lightning.style.animation = 'lightning 0.5s ease-in-out';
        }, 10);
    }
}

function closeGameModeWarning() {
    const modal = document.getElementById('gameModeWarning');
    if (modal) modal.classList.remove('active');
}

function playGameModeVideo() {
    closeGameModeWarning();
    const videoContainer = document.getElementById('gameModeVideo');
    const video = document.getElementById('gameModeVideoPlayer');

    if (!videoContainer || !video) {
        window.location.href = 'game-mode.html';
        return;
    }

    videoContainer.classList.add('active');
    video.currentTime = 0;
    video.play().catch(() => {
        // If autoplay fails, navigate immediately.
        window.location.href = 'game-mode.html';
    });

    const finish = () => {
        videoContainer.classList.remove('active');
        window.location.href = 'game-mode.html';
    };

    video.addEventListener('ended', finish, { once: true });
    video.addEventListener(
        'timeupdate',
        () => {
            const duration = video.duration || 8;
            if (video.currentTime >= duration - 0.2) finish();
        },
        { passive: true }
    );
}

function skipLoadingVideo() {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingVideo = document.getElementById('loading-video');
    const skipBtn = document.querySelector('.skip-loading-btn');
    const body = document.body;

    if (skipBtn) {
        skipBtn.classList.add('hidden');
    }

    if (loadingVideo) {
        loadingVideo.pause();
    }

    if (loadingScreen) {
        loadingScreen.classList.add('hidden');
        setTimeout(() => {
            body.classList.remove('loading');
            if (loadingScreen.parentNode) {
                loadingScreen.style.display = 'none';
            }
        }, 800);
    }
}

function openImageModal(src) {
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    if (imageModal && modalImage) {
        modalImage.src = src;
        imageModal.classList.add('active');
    }
}

function closeImageModal() {
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');
    if (imageModal && modalImage) {
        imageModal.classList.remove('active');
        modalImage.src = '';
    }
}

function skipGameModeVideo() {
    window.location.href = 'game-mode.html';
}

function backFromGameModeVideo() {
    const videoContainer = document.getElementById('gameModeVideo');
    const video = document.getElementById('gameModeVideoPlayer');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    if (videoContainer) {
        videoContainer.classList.remove('active');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const loadingScreen = document.getElementById('loading-screen');
    const loadingVideo = document.getElementById('loading-video');
    const skipBtn = document.querySelector('.skip-loading-btn');
    const body = document.body;

    body.classList.add('loading');

    function hideLoadingScreen() {
        if (skipBtn) {
            skipBtn.classList.add('hidden');
        }
        if (loadingScreen && loadingVideo) {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                body.classList.remove('loading');
                if (loadingScreen.parentNode) {
                    loadingScreen.style.display = 'none';
                }
            }, 800);
        }
    }

    if (loadingVideo) {
        loadingVideo.addEventListener('ended', hideLoadingScreen);
        loadingVideo.addEventListener('loadeddata', () => {
            loadingVideo.play().catch(e => {
                console.warn('Video autoplay prevented:', e);
                hideLoadingScreen();
            });
        });

        if (loadingVideo.readyState >= 2) {
            loadingVideo.play().catch(e => {
                console.warn('Video autoplay prevented:', e);
                hideLoadingScreen();
            });
        }
    } else {
        hideLoadingScreen();
    }

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

    const projectImages = document.querySelectorAll('.project-img');
    const imageModal = document.getElementById('imageModal');
    const modalImage = document.getElementById('modalImage');

    if (projectImages.length && imageModal && modalImage) {
        projectImages.forEach(img => {
            img.addEventListener('click', () => {
                const source = img.getAttribute('data-large') || img.src;
                openImageModal(source);
            });
        });

        imageModal.addEventListener('click', (e) => {
            if (e.target === imageModal) {
                closeImageModal();
            }
        });
    }

    const aiButtons = document.querySelectorAll('.ai-btn.sub');
    const aiInitialButtons = document.querySelectorAll('.ai-btn.initial');
    const aiMessages = document.getElementById('aiMessages');
    const aiTyping = document.getElementById('aiTyping');
    const aiAssistant = document.getElementById('aiAssistant');
    const aiToggle = document.getElementById('aiToggle');
    const aiCategories = document.querySelectorAll('.ai-category');
    const aiGroups = document.querySelectorAll('.ai-buttons-group');
    const dragHandle = document.getElementById('aiDragHandle');
    const mottoText = document.getElementById('mottoText');
    const mottoPrev = document.getElementById('mottoPrev');
    const mottoNext = document.getElementById('mottoNext');

    function appendMessage(text, type) {
        if (!aiMessages) return;
        const bubble = document.createElement('div');
        bubble.className = `ai-message ${type}`;
        bubble.textContent = text;
        aiMessages.appendChild(bubble);
        aiMessages.scrollTo({ top: aiMessages.scrollHeight, behavior: 'smooth' });
    }

    function showTyping(show) {
        if (!aiTyping) return;
        aiTyping.classList.toggle('active', show);
    }

    function handleCategory(groupName) {
        aiCategories.forEach(cat => cat.classList.toggle('active', cat.dataset.group === groupName));
        aiGroups.forEach(g => g.classList.toggle('active', g.dataset.group === groupName));
    }

    if (aiCategories.length && aiGroups.length) {
        handleCategory('about');
        aiCategories.forEach(cat => {
            cat.addEventListener('click', () => handleCategory(cat.dataset.group));
        });
    }

    aiInitialButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question') || '';
            const answer = btn.getAttribute('data-answer') || '';
            const subgroup = btn.getAttribute('data-subgroup') || '';
            appendMessage(question, 'ai-user');
            showTyping(true);
            setTimeout(() => {
                showTyping(false);
                appendMessage(answer, 'ai-bot');
                if (subgroup) {
                    handleCategory(subgroup);
                }
            }, 600);
        });
    });

    aiButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const question = btn.getAttribute('data-question') || '';
            const answer = btn.getAttribute('data-answer') || '';
            appendMessage(question, 'ai-user');
            showTyping(true);
            setTimeout(() => {
                showTyping(false);
                appendMessage(answer, 'ai-bot');
            }, 600);
        });
    });

    if (aiToggle && aiAssistant) {
        aiAssistant.classList.add('minimized');
        aiToggle.addEventListener('click', () => {
            aiAssistant.classList.toggle('minimized');
            aiToggle.textContent = aiAssistant.classList.contains('minimized') ? '▼' : '▲';
        });
    }

    if (aiAssistant && dragHandle) {
        let isDragging = false;
        let offsetX = 0;
        let offsetY = 0;

        const startDrag = (e) => {
            isDragging = true;
            const rect = aiAssistant.getBoundingClientRect();
            const pointerX = e.touches ? e.touches[0].clientX : e.clientX;
            const pointerY = e.touches ? e.touches[0].clientY : e.clientY;
            offsetX = pointerX - rect.left;
            offsetY = pointerY - rect.top;
            document.addEventListener('mousemove', onDrag);
            document.addEventListener('touchmove', onDrag, { passive: false });
            document.addEventListener('mouseup', stopDrag);
            document.addEventListener('touchend', stopDrag);
        };

        const onDrag = (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const pointerX = e.touches ? e.touches[0].clientX : e.clientX;
            const pointerY = e.touches ? e.touches[0].clientY : e.clientY;
            const left = pointerX - offsetX;
            const top = pointerY - offsetY;
            aiAssistant.style.left = `${Math.max(10, Math.min(window.innerWidth - aiAssistant.offsetWidth - 10, left))}px`;
            aiAssistant.style.top = `${Math.max(10, Math.min(window.innerHeight - aiAssistant.offsetHeight - 10, top))}px`;
            aiAssistant.style.right = 'auto';
            aiAssistant.style.bottom = 'auto';
        };

        const stopDrag = () => {
            isDragging = false;
            document.removeEventListener('mousemove', onDrag);
            document.removeEventListener('touchmove', onDrag);
            document.removeEventListener('mouseup', stopDrag);
            document.removeEventListener('touchend', stopDrag);
        };

        dragHandle.addEventListener('mousedown', startDrag);
        dragHandle.addEventListener('touchstart', startDrag, { passive: false });
    }

    const mottos = [
        'Code, test, learn, repeat.',
        'Build boldly, refactor wisely.',
        'Ship fast, polish faster.',
        'Debug the bug, learn the lesson.',
        'Design with empathy, code with intent.',
        'Motto: stay curious.',
        'Motto: craft, ship, iterate.',
        'Motto: clean code, clear mind.'
    ];
    let mottoIndex = 0;

    function setMotto(idx) {
        if (!mottoText) return;
        mottoText.textContent = mottos[idx];
    }

    if (mottoPrev && mottoNext && mottoText) {
        setMotto(mottoIndex);
        mottoPrev.addEventListener('click', () => {
            mottoIndex = (mottoIndex - 1 + mottos.length) % mottos.length;
            setMotto(mottoIndex);
        });
        mottoNext.addEventListener('click', () => {
            mottoIndex = (mottoIndex + 1) % mottos.length;
            setMotto(mottoIndex);
        });
    }
});
