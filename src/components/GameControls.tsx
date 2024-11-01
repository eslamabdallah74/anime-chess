import React from 'react';
import { RotateCcw, Undo, Swords } from 'lucide-react';

interface GameControlsProps {
  onNewGame: () => void;
  onUndoMove: () => void;
  onFlipBoard: () => void;
}

export function GameControls({
  onNewGame,
  onUndoMove,
  onFlipBoard,
}: GameControlsProps) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-white/80 backdrop-blur rounded-lg shadow-md">
      <div className="flex gap-2">
        <button
          onClick={onNewGame}
          className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-full hover:bg-pink-600 transition-colors"
        >
          <RotateCcw size={20} /> New Battle
        </button>
        <button
          onClick={onUndoMove}
          className="flex items-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-full hover:bg-purple-600 transition-colors"
        >
          <Undo size={20} /> Undo
        </button>
        <button
          onClick={onFlipBoard}
          className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
        >
          <Swords size={20} /> Flip Board
        </button>
      </div>
    </div>
  );
}