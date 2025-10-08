// Game Controller Module
// Coordinates between modules and handles user actions

import { GameState } from './gamestate.js';
import { GameLogic } from './gamelogic.js';
import { UI } from './ui.js';

export const GameController = (() => {
    const handleCellClick = (index) => {
        if (!GameState.isGameActive()) return;

        const moveMade = GameState.makeMove(index);
        if (!moveMade) return;

        UI.updateCell(index, GameState.getCurrentPlayer());

        const winResult = GameLogic.checkWinner(
            GameState.getBoard(), 
            GameState.getBoardSize(), 
            GameState.getWinLength()
        );
        
        if (winResult) {
            const winnerIndex = GameState.getCurrentPlayerIndex();
            GameState.setWinner(winResult.winner);
            GameState.setGameActive(false);
            GameState.incrementScore(winnerIndex);
            UI.highlightWinningCells(winResult.combination);
            UI.updateStatus(`Player ${winResult.winner} Wins! 🎉`);
            UI.updatePlayerScore(winnerIndex, GameState.getPlayerScore(winnerIndex));
            return;
        }

        if (GameLogic.checkDraw(GameState.getBoard())) {
            GameState.setGameActive(false);
            UI.updateStatus("It's a Draw!");
            return;
        }

        GameState.switchPlayer();
        UI.updateStatus(`Player ${GameState.getCurrentPlayer()}'s Turn`);
        UI.highlightActivePlayer(GameState.getCurrentPlayerIndex());
    };

    const handleReset = () => {
        GameState.reset();
        const boardSize = GameState.getBoardSize();
        const totalCells = boardSize * boardSize;
        
        for (let i = 0; i < totalCells; i++) {
            UI.updateCell(i, null);
        }
        UI.updateStatus(`Player ${GameState.getCurrentPlayer()}'s Turn`);
        UI.highlightActivePlayer(GameState.getCurrentPlayerIndex());
    };

    const handleIconClick = (playerIndex) => {
        const currentIcon = GameState.getPlayerIcon(playerIndex);
        UI.showIconPicker(playerIndex, currentIcon, handleIconSelect);
    };

    const handleIconSelect = (playerIndex, icon) => {
        GameState.setPlayerIcon(playerIndex, icon);
        UI.updatePlayerIcon(playerIndex, icon);
    };

    const handleMenuSelection = (numPlayers) => {
        GameState.setNumberOfPlayers(numPlayers);
        UI.showGame();
        UI.createBoard(GameState.getBoardSize(), handleCellClick);
        UI.createPlayerProfiles(
            GameState.getPlayers(), 
            (index) => GameState.getPlayerIcon(index),
            handleIconClick
        );
        
        // Initialize player icons and scores
        for (let i = 0; i < numPlayers; i++) {
            UI.updatePlayerIcon(i, GameState.getPlayerIcon(i));
            UI.updatePlayerScore(i, GameState.getPlayerScore(i));
        }
        
        handleReset();
    };

    const handleBackToMenu = () => {
        UI.showMenu();
        GameState.reset();
    };

    const init = () => {
        UI.createBoard(3, handleCellClick); // Create initial 3x3 board
        UI.onResetClick(handleReset);
        UI.onMenuButtonClick(handleMenuSelection);
        UI.onBackButtonClick(handleBackToMenu);
        UI.showMenu();
    };

    return {
        init
    };
})();