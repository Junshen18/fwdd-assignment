import React from "react";

interface SpellOverlayProps {
  onClose: () => void;
}

export default function SpellOverlay({ onClose }: SpellOverlayProps) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-8 rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl mb-4">Spellbook</h2>
        {/* Add your spellbook content here */}
        <button
          onClick={onClose}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
        >
          Close
        </button>
      </div>
    </div>
  );
}
