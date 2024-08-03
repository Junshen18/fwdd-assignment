import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useState } from "react";
import useSound from "use-sound";
import QuestionCard from "./questionCard";
import ResultCard from "./resultCard";

interface DiceOverlayProps {
  onClose: () => void;
}

export default function DiceOverlay({ onClose }: DiceOverlayProps) {
  const [diceSound] = useSound("/soundEffects/dice-sound.mp3");
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string;
    answers: string[];
    correctAnswer: string;
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);

  const handleDiceClick = (diceNumber: number) => {
    diceSound();
    console.log(`Dice ${diceNumber} clicked!`);

    // Simulate getting a random question based on the dice number
    let randomQuestion;
    switch (diceNumber) {
      case 1:
      case 2:
        randomQuestion = {
          question: "What is the capital of France?",
          answers: ["Paris", "London", "Berlin", "Madrid"],
          correctAnswer: "Paris",
        };
        break;
      case 3:
      case 4:
        randomQuestion = {
          question: "Which planet is known as the Red Planet?",
          answers: ["Mars", "Venus", "Jupiter", "Saturn"],
          correctAnswer: "Mars",
        };
        break;
      case 5:
      case 6:
        randomQuestion = {
          question: "Who painted the Mona Lisa?",
          answers: [
            "Leonardo da Vinci",
            "Vincent van Gogh",
            "Pablo Picasso",
            "Michelangelo",
          ],
          correctAnswer: "Leonardo da Vinci",
        };
        break;
    }

    if (randomQuestion) {
      setCurrentQuestion(randomQuestion);
      setShowQuestion(true);
      setShowResult(false);
      setSelectedAnswer(null);
    }
  };

  const handleAnswerSelected = (answer: string) => {
    console.log(`Selected answer: ${answer}`);
    setSelectedAnswer(answer);
    setShowResult(true);
  };

  const handleCorrectAnswer = () => {
    setShowQuestion(false);
    setShowResult(false);
    setSelectedAnswer(null);
    setCurrentQuestion(null);
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 h-full"
      onClick={onClose}
    >
      <div
        className="bg-yellow-500 p-8 rounded-3xl w-11/12 h-11/12 md:w-3/4 md:h-3/4 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl md:text-4xl">Dice Result</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className="text-white text-2xl md:text-5xl absolute top-5 right-7 cursor-pointer"
          onClick={onClose}
        />
        <div className="bg-white p-8 rounded-2xl mt-4 h-[90%] flex flex-col items-center justify-center">
          {!showQuestion ? (
            <>
              <div className="grid grid-rows-3 grid-cols-2 md:grid-rows-2 md:grid-cols-3 gap-4 md:gap-14 justify-center">
                {[1, 2, 3, 4, 5, 6].map((diceNumber) => (
                  <button
                    key={diceNumber}
                    onClick={() => handleDiceClick(diceNumber)}
                    className="focus:outline-none hover:opacity-80 transition-opacity"
                  >
                    <Image
                      src={`/dice${diceNumber}.png`}
                      alt={`Dice ${diceNumber}`}
                      width={150}
                      height={150}
                      className="cursor-pointer"
                    />
                  </button>
                ))}
              </div>
            </>
          ) : showResult ? (
            currentQuestion &&
            selectedAnswer && (
              <ResultCard
                question={currentQuestion.question}
                selectedAnswer={selectedAnswer}
                correctAnswer={currentQuestion.correctAnswer}
                onCorrectAnswer={handleCorrectAnswer}
                closeDiceOverlay={onClose}
              />
            )
          ) : (
            currentQuestion && (
              <QuestionCard
                question={currentQuestion.question}
                answers={currentQuestion.answers}
                onAnswerSelected={handleAnswerSelected}
              />
            )
          )}
        </div>
      </div>
    </div>
  );
}
