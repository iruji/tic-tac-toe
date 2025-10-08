// UI Module
// Manages all DOM interactions and rendering

export const UI = (() => {
    const menuElement = document.getElementById('menu');
    const gameScreenElement = document.getElementById('gameScreen');
    const boardElement = document.getElementById('board');
    const statusElement = document.getElementById('status');
    const resetButton = document.getElementById('resetBtn');
    const backButton = document.getElementById('backBtn');
    const playerProfilesElement = document.getElementById('playerProfiles');
    const profileListElement = document.getElementById('profileList');
    
    let iconPickerElement = null;
    let currentIconPlayerIndex = null;

    const availableIcons = ['👤', '😀', '😎', '🤖', '👾', '🎮', '⭐', '🔥', '💎', '🎯', '🎨', '🎭', '🦄', '🐉', '🦊', '🐺'];

    const showMenu = () => {
        menuElement.classList.remove('hidden');
        gameScreenElement.classList.add('hidden');
        playerProfilesElement.classList.add('hidden');
        menuElement.classList.remove('with-profiles');
    };

    const showGame = () => {
        // Keep menu visible, just show game screen on the right
        gameScreenElement.classList.remove('hidden');
        playerProfilesElement.classList.remove('hidden');
        menuElement.classList.add('with-profiles');
    };

    const createPlayerProfiles = (players, getIcon, onIconClick) => {
        profileListElement.innerHTML = '';
        
        players.forEach((symbol, index) => {
            const profile = document.createElement('div');
            profile.classList.add('player-profile');
            profile.dataset.index = index;
            
            const icon = document.createElement('div');
            icon.classList.add('player-icon');
            icon.textContent = getIcon(index);
            icon.addEventListener('click', () => onIconClick(index));
            
            const info = document.createElement('div');
            info.classList.add('player-info');
            
            const name = document.createElement('div');
            name.classList.add('player-name');
            name.textContent = `Player ${symbol}`;
            
            const score = document.createElement('div');
            score.classList.add('player-score');
            score.textContent = 'Wins: 0';
            
            info.appendChild(name);
            info.appendChild(score);
            profile.appendChild(icon);
            profile.appendChild(info);
            profileListElement.appendChild(profile);
        });
    };

    const updatePlayerIcon = (playerIndex, icon) => {
        const profile = profileListElement.children[playerIndex];
        if (profile) {
            const iconElement = profile.querySelector('.player-icon');
            iconElement.textContent = icon;
        }
    };

    const updatePlayerScore = (playerIndex, score) => {
        const profile = profileListElement.children[playerIndex];
        if (profile) {
            const scoreElement = profile.querySelector('.player-score');
            scoreElement.textContent = `Wins: ${score}`;
        }
    };

    const highlightActivePlayer = (playerIndex) => {
        const profiles = profileListElement.querySelectorAll('.player-profile');
        profiles.forEach((profile, index) => {
            if (index === playerIndex) {
                profile.classList.add('active');
            } else {
                profile.classList.remove('active');
            }
        });
    };

    const showIconPicker = (playerIndex, currentIcon, onSelectIcon) => {
        if (!iconPickerElement) {
            iconPickerElement = document.createElement('div');
            iconPickerElement.classList.add('icon-picker');
            
            const title = document.createElement('h3');
            title.textContent = 'Choose Icon';
            iconPickerElement.appendChild(title);
            
            const grid = document.createElement('div');
            grid.classList.add('icon-grid');
            iconPickerElement.appendChild(grid);
            
            const closeBtn = document.createElement('button');
            closeBtn.classList.add('close-picker');
            closeBtn.textContent = 'Close';
            closeBtn.addEventListener('click', hideIconPicker);
            iconPickerElement.appendChild(closeBtn);
            
            document.body.appendChild(iconPickerElement);
        }
        
        // Clear and rebuild the grid each time
        const grid = iconPickerElement.querySelector('.icon-grid');
        grid.innerHTML = '';
        
        availableIcons.forEach(icon => {
            const option = document.createElement('button');
            option.classList.add('icon-option');
            option.textContent = icon;
            option.addEventListener('click', () => {
                onSelectIcon(playerIndex, icon);
                hideIconPicker();
            });
            grid.appendChild(option);
        });
        
        iconPickerElement.classList.add('active');
    };

    const hideIconPicker = () => {
        if (iconPickerElement) {
            iconPickerElement.classList.remove('active');
        }
    };

    const onMenuButtonClick = (callback) => {
        const menuButtons = document.querySelectorAll('.menu-btn');
        menuButtons.forEach(button => {
            button.addEventListener('click', () => {
                const players = parseInt(button.dataset.players);
                callback(players);
            });
        });
    };

    const onBackButtonClick = (callback) => {
        backButton.addEventListener('click', callback);
    };

    const createBoard = (boardSize, onCellClick) => {
        boardElement.innerHTML = '';
        // Remove all size classes first
        boardElement.className = 'board';
        boardElement.classList.add(`size-${boardSize}`);
        
        const totalCells = boardSize * boardSize;
        for (let i = 0; i < totalCells; i++) {
            const cell = document.createElement('button');
            cell.classList.add('cell');
            cell.dataset.index = i;
            cell.addEventListener('click', () => onCellClick(i));
            boardElement.appendChild(cell);
        }
    };

    const updateCell = (index, value) => {
        const cell = boardElement.children[index];
        if (value) {
            cell.textContent = value;
            cell.classList.add('taken');
        } else {
            cell.textContent = '';
            cell.classList.remove('taken', 'winner');
        }
    };

    const highlightWinningCells = (combination) => {
        combination.forEach(index => {
            boardElement.children[index].classList.add('winner');
        });
    };

    const updateStatus = (message) => {
        statusElement.textContent = message;
    };

    const onResetClick = (callback) => {
        resetButton.addEventListener('click', callback);
    };

    return {
        showMenu,
        showGame,
        onMenuButtonClick,
        onBackButtonClick,
        createBoard,
        updateCell,
        highlightWinningCells,
        updateStatus,
        onResetClick,
        createPlayerProfiles,
        updatePlayerIcon,
        updatePlayerScore,
        highlightActivePlayer,
        showIconPicker,
        hideIconPicker
    };
})();