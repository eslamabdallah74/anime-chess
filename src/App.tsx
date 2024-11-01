import React from 'react';
import { Chess, Square } from 'chess.js';
import { ChessBoard } from './components/ChessBoard';
import { GameControls } from './components/GameControls';
import { GameStatus } from './components/GameStatus';
import { Sword } from 'lucide-react';

function App() {
  const [game, setGame] = React.useState(new Chess());
  const [boardFlipped, setBoardFlipped] = React.useState(false);
  const [moveHistory, setMoveHistory] = React.useState<string[]>([]);

  const handleMove = ({ from, to }: { from: Square; to: Square }) => {
    try {
      const move = game.move({ from, to, promotion: 'q' });
      if (move) {
        setMoveHistory(prev => [...prev, move.san]);
        setGame(new Chess(game.fen()));
      }
    } catch (e) {
      console.error('Invalid move:', e);
    }
  };

  const handleNewGame = () => {
    setGame(new Chess());
    setMoveHistory([]);
  };

  const handleUndoMove = () => {
    if (game.history().length === 0) return;
    const newGame = new Chess(game.fen());
    newGame.undo();
    setMoveHistory(prev => prev.slice(0, -1));
    setGame(newGame);
  };

  const getGameStatus = () => {
    if (game.isGameOver()) {
      if (game.isCheckmate()) return game.turn() === 'w' ? 'b' : 'w';
      if (game.isDraw()) return 'draw';
    }
    return null;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 to-purple-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-8">
          <Sword size={32} className="text-pink-600" />
          <h1 className="text-3xl font-bold text-gray-900">Anime Chess Battle</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[auto,1fr] gap-8">
          <div className="space-y-4">
            <GameControls
              onNewGame={handleNewGame}
              onUndoMove={handleUndoMove}
              onFlipBoard={() => setBoardFlipped(!boardFlipped)}
            />
            
            <GameStatus
              isGameOver={game.isGameOver()}
              winner={getGameStatus()}
              currentPlayer={game.turn()}
              moveHistory={moveHistory}
            />
          </div>

          <div className="flex justify-center items-start">
            <ChessBoard
              game={game}
              onMove={handleMove}
              flipped={boardFlipped}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;