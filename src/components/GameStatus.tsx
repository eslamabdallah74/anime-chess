import React from 'react';
import { Trophy, Sparkles } from 'lucide-react';

interface GameStatusProps {
  isGameOver: boolean;
  winner: string | null;
  currentPlayer: 'w' | 'b';
  moveHistory: string[];
}

export function GameStatus({ isGameOver, winner, currentPlayer, moveHistory }: GameStatusProps) {
  return (
    <div className="bg-white/80 backdrop-blur p-4 rounded-lg shadow-md space-y-4">
      <div className="flex items-center gap-2">
        <Sparkles size={20} className="text-yellow-500" />
        <span className="font-medium text-lg">
          {isGameOver ? "Battle Over!" : `${currentPlayer === 'w' ? "Light" : "Dark"} Warrior's Turn`}
        </span>
      </div>

      {isGameOver && winner && (
        <div className="flex items-center gap-2 text-pink-600">
          <Trophy size={20} />
          <span className="font-medium">
            {winner === 'draw' ? "A Legendary Draw!" : `${winner === 'w' ? "Light" : "Dark"} Warriors Victory!`}
          </span>
        </div>
      )}

      <div className="mt-4">
        <h3 className="font-medium mb-2">Battle Log</h3>
        <div className="max-h-48 overflow-y-auto bg-white/50 rounded p-2">
          {moveHistory.map((move, index) => (
            <div key={index} className="text-sm py-1 border-b border-pink-100 last:border-0">
              {index + 1}. {move}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}