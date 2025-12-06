function showGameModeGUI() {
    const gameGUI = document.getElementById('gameModeGUI');
    if (gameGUI) {
        gameGUI.classList.add('active');
    }
}

function exitGameMode() {
    const gameGUI = document.getElementById('gameModeGUI');
    if (gameGUI) {
        gameGUI.classList.remove('active');
    }
    const video = document.getElementById('gameModeVideoPlayer');
    if (video) {
        video.pause();
        video.currentTime = 0;
    }
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
