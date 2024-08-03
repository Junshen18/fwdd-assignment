import React, { useEffect } from "react";
import useSound from "use-sound";

interface ResultCardProps {
  question: string;
  selectedAnswer: string;
  correctAnswer: string;
  onCorrectAnswer: () => void;
  closeDiceOverlay: () => void;
}

export default function ResultCard({
  question,
  selectedAnswer,
  correctAnswer,
  onCorrectAnswer,
  closeDiceOverlay,
}: ResultCardProps) {
  const isCorrect = selectedAnswer === correctAnswer;

  const handleButtonClick = () => {
    if (isCorrect) {
      onCorrectAnswer();
    }
    closeDiceOverlay();
  };
  const [playCorrectSound] = useSound("/soundEffects/correct-sound.wav");
  const [playWrongSound] = useSound("/soundEffects/wrong-sound.wav");
  useEffect(() => {
    if (isCorrect) {
      playCorrectSound();
    } else {
      playWrongSound();
    }
  }, [isCorrect, playCorrectSound]);

  useEffect;

  return (
    <div>
      <p
        className={`text-3xl mb-6 ${
          isCorrect ? "text-green-600" : "text-red-600"
        }`}
      >
        {isCorrect
          ? "Correct! You gain a spell book!"
          : `Wrong. The correct answer was ${correctAnswer}.`}
      </p>
      {!isCorrect && (
        <div>
          <p className="text-xl mb-4">
            Your answer: <span className="font-bold">{selectedAnswer}</span>
          </p>
        </div>
      )}

      <button
        onClick={handleButtonClick}
        className="bg-blue-500 text-white text-xl px-4 py-2 rounded hover:bg-blue-600 transition-colors"
      >
        {isCorrect ? "Claim Spell Book" : "Try Again Later"}
      </button>
    </div>
  );
}
