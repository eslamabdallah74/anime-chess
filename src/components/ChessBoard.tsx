import React from 'react';
import { Chess, Square } from 'chess.js';

interface ChessBoardProps {
  game: Chess;
  onMove: (move: { from: Square; to: Square }) => void;
  flipped: boolean;
}

export function ChessBoard({ game, onMove, flipped }: ChessBoardProps) {
  const [selectedSquare, setSelectedSquare] = React.useState<Square | null>(null);
  const [validMoves, setValidMoves] = React.useState<Square[]>([]);

  const getPieceImage = (piece: string | null) => {
    if (!piece) return null;
    const pieces: { [key: string]: string } = {
      'p': '👾', // Dark Pawn - Pixel Monster
      'n': '🦊', // Dark Knight - Kitsune
      'b': '🧙', // Dark Bishop - Mage
      'r': '🏯', // Dark Rook - Pagoda
      'q': '👸', // Dark Queen - Princess
      'k': '🐉', // Dark King - Dragon
      'P': '🤖', // Light Pawn - Robot
      'N': '🦄', // Light Knight - Unicorn
      'B': '🧝', // Light Bishop - Elf
      'R': '⛩️', // Light Rook - Shrine
      'Q': '👑', // Light Queen - Queen
      'K': '🦁', // Light King - Lion
    };
    return pieces[piece];
  };

  const handleSquareClick = (square: Square) => {
    if (selectedSquare) {
      if (validMoves.includes(square)) {
        onMove({ from: selectedSquare, to: square });
        setSelectedSquare(null);
        setValidMoves([]);
      } else {
        const moves = game.moves({ square, verbose: true });
        setSelectedSquare(square);
        setValidMoves(moves.map(move => move.to as Square));
      }
    } else {
      const moves = game.moves({ square, verbose: true });
      if (moves.length > 0) {
        setSelectedSquare(square);
        setValidMoves(moves.map(move => move.to as Square));
      }
    }
  };

  const ranks = flipped ? '12345678'.split('').reverse() : '12345678'.split('');
  const files = flipped ? 'abcdefgh'.split('').reverse() : 'abcdefgh'.split('');

  return (
    <div className="inline-block bg-gradient-to-br from-purple-900 to-pink-900 p-4 rounded-lg shadow-xl">
      <div className="grid grid-cols-9 gap-0">
        <div className="w-8 h-8"></div>
        {files.map(file => (
          <div key={file} className="w-16 h-8 flex items-center justify-center text-pink-200">
            {file.toUpperCase()}
          </div>
        ))}

        {ranks.map(rank => (
          <React.Fragment key={rank}>
            <div className="w-8 h-16 flex items-center justify-center text-pink-200">
              {rank}
            </div>

            {files.map(file => {
              const square = `${file}${rank}` as Square;
              const piece = game.get(square);
              const isLight = (parseInt(rank) + file.charCodeAt(0)) % 2 === 0;
              const isSelected = selectedSquare === square;
              const isValidMove = validMoves.includes(square);

              return (
                <button
                  key={square}
                  onClick={() => handleSquareClick(square)}
                  className={`w-16 h-16 flex items-center justify-center text-4xl relative
                    ${isLight ? 'bg-pink-200' : 'bg-purple-300'}
                    ${isSelected ? 'ring-4 ring-yellow-400' : ''}
                    ${isValidMove ? 'ring-4 ring-green-400' : ''}
                    transition-all duration-200 hover:opacity-90`}
                >
                  {piece?.type && (
                    <span className="transform scale-125">
                      {getPieceImage(piece.color === 'w' ? piece.type.toUpperCase() : piece.type)}
                    </span>
                  )}
                </button>
              );
            })}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
}