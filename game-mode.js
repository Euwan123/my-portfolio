function showGameModeGUI() {
    const gameGUI = document.getElementById('gameModeGUI');
    if (gameGUI) {
        gameGUI.style.display = 'block';
        gameGUI.style.opacity = '1';
        gameGUI.classList.add('active');
    }
}

function exitGameMode() {
    const gameGUI = document.getElementById('gameModeGUI');
    if (gameGUI) {
        gameGUI.classList.remove('active');
        gameGUI.style.display = 'none';
        gameGUI.style.opacity = '0';
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
