function showGameModeGUI() {
    const gameGUI = document.getElementById('gameModeGUI');
    if (gameGUI) {
        requestAnimationFrame(() => {
            gameGUI.style.display = 'block';
            gameGUI.offsetHeight;
            requestAnimationFrame(() => {
                gameGUI.style.opacity = '1';
                gameGUI.classList.add('active');
            });
        });
    }
}

function exitGameMode() {
    const gameGUI = document.getElementById('gameModeGUI');
    if (gameGUI) {
        gameGUI.classList.remove('active');
        gameGUI.style.opacity = '0';
        setTimeout(() => {
            gameGUI.style.display = 'none';
        }, 300);
    }
    const video = document.getElementById('gameModeVideoPlayer');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
    const videoContainer = document.getElementById('gameModeVideo');
    if (videoContainer) {
        videoContainer.classList.remove('active');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function skipGameModeVideo() {
    const videoContainer = document.getElementById('gameModeVideo');
    const video = document.getElementById('gameModeVideoPlayer');
    
    if (videoContainer && video) {
        video.pause();
        videoContainer.classList.remove('active');
        showGameModeGUI();
    }
}

function backFromGameModeVideo() {
    const videoContainer = document.getElementById('gameModeVideo');
    const video = document.getElementById('gameModeVideoPlayer');
    
    if (videoContainer && video) {
        video.pause();
        video.currentTime = 0;
        videoContainer.classList.remove('active');
    }
}

document.addEventListener('keydown', (e) => {
    const gameGUI = document.getElementById('gameModeGUI');
    if (gameGUI && gameGUI.classList.contains('active') && e.key === 'Escape') {
        exitGameMode();
    }
});

