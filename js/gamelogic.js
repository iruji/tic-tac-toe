// Game Logic Module
// Handles game rules (win detection, draw detection)

export const GameLogic = (() => {
    const generateWinningCombinations = (boardSize, winLength) => {
        const combinations = [];
        
        // Rows
        for (let row = 0; row < boardSize; row++) {
            for (let col = 0; col <= boardSize - winLength; col++) {
                const combo = [];
                for (let i = 0; i < winLength; i++) {
                    combo.push(row * boardSize + col + i);
                }
                combinations.push(combo);
            }
        }
        
        // Columns
        for (let col = 0; col < boardSize; col++) {
            for (let row = 0; row <= boardSize - winLength; row++) {
                const combo = [];
                for (let i = 0; i < winLength; i++) {
                    combo.push((row + i) * boardSize + col);
                }
                combinations.push(combo);
            }
        }
        
        // Diagonal (top-left to bottom-right)
        for (let row = 0; row <= boardSize - winLength; row++) {
            for (let col = 0; col <= boardSize - winLength; col++) {
                const combo = [];
                for (let i = 0; i < winLength; i++) {
                    combo.push((row + i) * boardSize + (col + i));
                }
                combinations.push(combo);
            }
        }
        
        // Diagonal (top-right to bottom-left)
        for (let row = 0; row <= boardSize - winLength; row++) {
            for (let col = winLength - 1; col < boardSize; col++) {
                const combo = [];
                for (let i = 0; i < winLength; i++) {
                    combo.push((row + i) * boardSize + (col - i));
                }
                combinations.push(combo);
            }
        }
        
        return combinations;
    };

    const checkWinner = (board, boardSize, winLength) => {
        const combinations = generateWinningCombinations(boardSize, winLength);
        
        for (let combo of combinations) {
            const first = board[combo[0]];
            if (!first) continue;
            
            let isWin = true;
            for (let i = 1; i < combo.length; i++) {
                if (board[combo[i]] !== first) {
                    isWin = false;
                    break;
                }
            }
            
            if (isWin) {
                return { winner: first, combination: combo };
            }
        }
        return null;
    };

    const checkDraw = (board) => {
        return board.every(cell => cell !== null);
    };

    return {
        checkWinner,
        checkDraw
    };
})();