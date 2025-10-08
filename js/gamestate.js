// Game State Module
// Manages all game state (board, current player, game status)

export const GameState = (() => {
    let board = Array(9).fill(null);
    let players = ['X', 'O'];
    let playerIcons = ['👤', '👤'];
    let playerScores = [0, 0];
    let currentPlayerIndex = 0;
    let gameActive = true;
    let winner = null;
    let numberOfPlayers = 2;
    let boardSize = 3;
    let winLength = 3;

    const reset = () => {
        board = Array(boardSize * boardSize).fill(null);
        currentPlayerIndex = 0;
        gameActive = true;
        winner = null;
    };

    const setNumberOfPlayers = (num) => {
        numberOfPlayers = num;
        
        // Define player symbols and board size based on number of players
        if (num === 2) {
            players = ['X', 'O'];
            playerIcons = ['👤', '👤'];
            playerScores = [0, 0];
            boardSize = 3;
            winLength = 3;
        } else if (num === 3) {
            players = ['X', 'O', 'Δ'];
            playerIcons = ['👤', '👤', '👤'];
            playerScores = [0, 0, 0];
            boardSize = 4;
            winLength = 3;
        } else if (num === 4) {
            players = ['X', 'O', 'Δ', '◇'];
            playerIcons = ['👤', '👤', '👤', '👤'];
            playerScores = [0, 0, 0, 0];
            boardSize = 5;
            winLength = 4;
        }
        console.log(`Game setup: ${num} players, ${boardSize}x${boardSize} board, ${winLength} in a row to win`);
        reset();
    };

    const setPlayerIcon = (playerIndex, icon) => {
        playerIcons[playerIndex] = icon;
    };

    const incrementScore = (playerIndex) => {
        playerScores[playerIndex]++;
    };

    const getPlayerIcon = (playerIndex) => playerIcons[playerIndex];
    const getPlayerScore = (playerIndex) => playerScores[playerIndex];
    const getPlayerScores = () => [...playerScores];
    const getCurrentPlayerIndex = () => currentPlayerIndex;

    const getBoard = () => [...board];
    const getBoardSize = () => boardSize;
    const getWinLength = () => winLength;
    const getCurrentPlayer = () => players[currentPlayerIndex];
    const getPlayers = () => [...players];
    const getNumberOfPlayers = () => numberOfPlayers;
    const isGameActive = () => gameActive;
    const getWinner = () => winner;

    const makeMove = (index) => {
        if (board[index] || !gameActive) return false;
        board[index] = getCurrentPlayer();
        return true;
    };

    const switchPlayer = () => {
        currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
    };

    const setGameActive = (active) => {
        gameActive = active;
    };

    const setWinner = (winnerValue) => {
        winner = winnerValue;
    };

    return {
        reset,
        setNumberOfPlayers,
        setPlayerIcon,
        incrementScore,
        getBoard,
        getBoardSize,
        getWinLength,
        getCurrentPlayer,
        getCurrentPlayerIndex,
        getPlayerIcon,
        getPlayerScore,
        getPlayerScores,
        getPlayers,
        getNumberOfPlayers,
        isGameActive,
        getWinner,
        makeMove,
        switchPlayer,
        setGameActive,
        setWinner
    };
})();