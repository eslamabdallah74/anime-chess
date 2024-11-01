import { Chess, Move } from 'chess.js';

// Piece values for evaluation
const PIECE_VALUES = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000
};

// Position bonus for pieces (simplified)
const POSITION_BONUS = {
  p: [
    0,  0,  0,  0,  0,  0,  0,  0,
    50, 50, 50, 50, 50, 50, 50, 50,
    10, 10, 20, 30, 30, 20, 10, 10,
    5,  5, 10, 25, 25, 10,  5,  5,
    0,  0,  0, 20, 20,  0,  0,  0,
    5, -5,-10,  0,  0,-10, -5,  5,
    5, 10, 10,-20,-20, 10, 10,  5,
    0,  0,  0,  0,  0,  0,  0,  0
  ],
  n: [
    -50,-40,-30,-30,-30,-30,-40,-50,
    -40,-20,  0,  0,  0,  0,-20,-40,
    -30,  0, 10, 15, 15, 10,  0,-30,
    -30,  5, 15, 20, 20, 15,  5,-30,
    -30,  0, 15, 20, 20, 15,  0,-30,
    -30,  5, 10, 15, 15, 10,  5,-30,
    -40,-20,  0,  5,  5,  0,-20,-40,
    -50,-40,-30,-30,-30,-30,-40,-50
  ]
};

function evaluatePosition(game: Chess): number {
  let score = 0;
  const board = game.board();

  // Material and position evaluation
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const piece = board[i][j];
      if (piece) {
        const value = PIECE_VALUES[piece.type as keyof typeof PIECE_VALUES];
        const positionBonus = POSITION_BONUS[piece.type as keyof typeof POSITION_BONUS]?.[i * 8 + j] || 0;
        score += (piece.color === 'w' ? 1 : -1) * (value + positionBonus);
      }
    }
  }

  return score;
}

function minimax(game: Chess, depth: number, alpha: number, beta: number, maximizingPlayer: boolean): number {
  if (depth === 0 || game.isGameOver()) {
    return evaluatePosition(game);
  }

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of game.moves({ verbose: true })) {
      game.move(move);
      const eval = minimax(game, depth - 1, alpha, beta, false);
      game.undo();
      maxEval = Math.max(maxEval, eval);
      alpha = Math.max(alpha, eval);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of game.moves({ verbose: true })) {
      game.move(move);
      const eval = minimax(game, depth - 1, alpha, beta, true);
      game.undo();
      minEval = Math.min(minEval, eval);
      beta = Math.min(beta, eval);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

export function findBestMove(game: Chess, difficulty: number): Move | null {
  const depth = Math.min(Math.max(difficulty, 1), 5);
  let bestMove: Move | null = null;
  let bestValue = -Infinity;
  const moves = game.moves({ verbose: true });

  if (moves.length === 0) return null;

  // Add some randomness for lower difficulties
  if (difficulty < 3 && Math.random() < 0.3) {
    return moves[Math.floor(Math.random() * moves.length)];
  }

  for (const move of moves) {
    game.move(move);
    const value = minimax(game, depth - 1, -Infinity, Infinity, false);
    game.undo();

    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }

  return bestMove || moves[0];
}