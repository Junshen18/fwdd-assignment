import React, { useState } from "react";

interface QuestionCardProps {
  question: string;
  answers: string[];
  onAnswerSelected: (answer: string) => void;
}

export default function QuestionCard({
  question,
  answers,
  onAnswerSelected,
}: QuestionCardProps) {
  const letters = ["a", "b", "c", "d"];

  return (
    <div>
      <h3 className="text-4xl font-bold mb-8 text-black">{question}</h3>
      <div className="space-y-2">
        {answers.map((answer, index) => (
          <button
            key={index}
            onClick={() => onAnswerSelected(answer)}
            className="w-full text-gray-700 text-left p-2 bg-gray-100 hover:bg-gray-300 rounded transition-colors relative"
          >
            <div className="absolute inset-0 border border-transparent hover:border-blue-950 rounded pointer-events-none"></div>
            <span className="font-bold text-lg mr-2">{letters[index]}.</span>{" "}
            {answer}
          </button>
        ))}
      </div>
    </div>
  );
}
