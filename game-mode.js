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

function setupGameModeTabs() {
    const stats = document.querySelector('.stats-container');
    const gamesPanel = document.querySelector('.games-grid');
    const animePanel = document.querySelector('.anime-section');
    if (!stats || !gamesPanel || !animePanel) return;

    const tabBar = document.createElement('div');
    tabBar.className = 'gm-tabs';
    stats.insertAdjacentElement('afterend', tabBar);

    const panelsWrapper = document.createElement('div');
    panelsWrapper.className = 'gm-tab-panels';
    tabBar.insertAdjacentElement('afterend', panelsWrapper);

    const panelDefs = [
        { id: 'games', label: 'Games Played', node: gamesPanel },
        { id: 'anime', label: 'Anime Watched', node: animePanel },
        {
            id: 'manga',
            label: 'Manga Read',
            node: createListPanel('Manga Read', [
                'Solo Leveling',
                'Omniscient Reader',
                'Chainsaw Man',
                'Blue Lock',
                'Jujutsu Kaisen',
                'Vinland Saga'
            ])
        },
        {
            id: 'manhwa',
            label: 'Manhwa Read',
            node: createListPanel('Manhwa Read', [
                'The Beginning After The End',
                'SSS-Class Suicide Hunter',
                'Tower of God',
                'Eleceed',
                'Return of the Mount Hua Sect',
                'Legend of the Northern Blade'
            ])
        },
        {
            id: 'others',
            label: 'Others',
            node: createOthersPanel()
        }
    ];

    panelDefs.forEach(def => {
        def.node.classList.add('gm-tab-panel');
        panelsWrapper.appendChild(def.node);
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'gm-tab-btn';
        btn.dataset.target = def.id;
        btn.textContent = def.label;
        btn.addEventListener('click', () => activateTab(def.id, panelDefs));
        tabBar.appendChild(btn);
    });

    activateTab('games', panelDefs);
}

function createListPanel(title, items) {
    const section = document.createElement('div');
    section.className = 'gm-tab-panel';
    const heading = document.createElement('h2');
    heading.className = 'anime-section-title';
    heading.textContent = title;
    const grid = document.createElement('div');
    grid.className = 'anime-grid';
    items.forEach(text => {
        const card = document.createElement('div');
        card.className = 'anime-card';
        const icon = document.createElement('div');
        icon.className = 'anime-icon';
        icon.textContent = text.slice(0, 3).toUpperCase();
        const label = document.createElement('h3');
        label.textContent = text;
        card.appendChild(icon);
        card.appendChild(label);
        grid.appendChild(card);
    });
    section.appendChild(heading);
    section.appendChild(grid);
    return section;
}

function createOthersPanel() {
    const section = document.createElement('div');
    section.className = 'gm-tab-panel';
    const heading = document.createElement('h2');
    heading.className = 'anime-section-title';
    heading.textContent = 'Others';
    const grid = document.createElement('div');
    grid.className = 'others-grid';

    const cards = [
        {
            title: 'Cosplays',
            items: [
                'Total: 3',
                'Kirito (Sword Art Online)',
                'Rengoku (Demon Slayer)',
                'Tanjiro (Demon Slayer)'
            ]
        },
        {
            title: 'Fan Art',
            items: [
                'Total: 5',
                'Draw Gojo',
                '15 Pokémon pieces',
                'One Punch Man characters',
                '3D Zoro',
                '3D Bulbasaur'
            ]
        },
        {
            title: 'Fan Fiction',
            items: [
                'Total: 3',
                'Cycle of the Fallen (180k views)',
                'Basketball Demon (101k views)',
                'My Idiot Teammate (unreleased)'
            ]
        },
        {
            title: 'Profile',
            items: [
                'Euwan Gabriel B. Abogadie',
                'Favorite genres: romance, action, fanfic, sci-fi, horror, mystery, demon, angels, powerful MC',
                'Platforms: mobile, PC, laptop, PS4, PS5, PSP, Game Boy, joystick, computer, Nintendo',
                'Favorite characters: Sung Jin Woo, Gojo Satoru'
            ]
        }
    ];

    cards.forEach(card => {
        const item = document.createElement('div');
        item.className = 'others-card';
        const title = document.createElement('h3');
        title.textContent = card.title;
        const list = document.createElement('div');
        list.className = 'others-list';
        card.items.forEach(text => {
            const row = document.createElement('div');
            row.textContent = text;
            list.appendChild(row);
        });
        item.appendChild(title);
        item.appendChild(list);
        grid.appendChild(item);
    });

    section.appendChild(heading);
    section.appendChild(grid);
    return section;
}

function activateTab(targetId, defs) {
    defs.forEach(def => {
        const isActive = def.id === targetId;
        if (def.node) def.node.style.display = isActive ? 'block' : 'none';
        const btn = document.querySelector(`.gm-tab-btn[data-target="${def.id}"]`);
        if (btn) btn.classList.toggle('active', isActive);
    });
}

function updateGameStats() {
    const updates = {
        'Mobile Legends': [
            { label: 'Max Rank', value: '124 stars Mythical Immortal' },
            { label: 'Total Matches', value: '4,206' },
            { label: 'Win Rate', value: '63.7%' }
        ],
        'Dota 2': [
            { label: 'Max MMR', value: '3,402' },
            { label: 'Max Rank', value: 'Legend 3' },
            { label: 'Total Hours', value: '4,448.2' }
        ],
        'Roblox': [
            { label: 'Total Robux', value: '102,439' },
            { label: 'Games Played', value: '231' },
            { label: 'Badges', value: '—' }
        ],
        'Minecraft': [
            { label: 'Total Worlds', value: '6' },
            { label: 'Avg Days', value: '302.5' },
            { label: 'Achievements', value: '—' }
        ]
    };

    Object.keys(updates).forEach(name => {
        const card = Array.from(document.querySelectorAll('.game-card')).find(
            node => node.querySelector('h3') && node.querySelector('h3').textContent.trim() === name
        );
        if (!card) return;
        const rows = card.querySelectorAll('.game-stat-item');
        updates[name].forEach((entry, idx) => {
            const row = rows[idx];
            if (!row) return;
            const label = row.querySelector('.stat-name');
            const value = row.querySelector('.stat-data');
            if (label) label.textContent = entry.label;
            if (value) value.textContent = entry.value;
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setupGameModeTabs();
    updateGameStats();
});

