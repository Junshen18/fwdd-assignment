import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";
import QuestionCard from "./questionCard";
import ResultCard from "./resultCard";
import { supabase } from "@/lib/supabase";

interface DiceOverlayProps {
  onClose: () => void;
  gainSpellOrb: (rarity: string) => Promise<void>;
}

export default function DiceOverlay({
  onClose,
  gainSpellOrb,
}: DiceOverlayProps) {
  const [diceSound] = useSound("/soundEffects/dice-sound.mp3");
  const [showQuestion, setShowQuestion] = useState(false);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<{
    question: string;
    answers: any; // This should now be the object with the "nodes" array
    correctAnswer: string;
  } | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [showResult, setShowResult] = useState(false);
  const [selectedDice, setSelectedDice] = useState<number | null>(null);

  const handleDiceClick = (diceNumber: number) => {
    diceSound();
    setSelectedDice(diceNumber);
    console.log(`Dice ${diceNumber} clicked!`);
    const selectedQuestion = questions.find((q) => q.quest_id === diceNumber);

    if (selectedQuestion) {
      setCurrentQuestion({
        question: selectedQuestion.quest_details,
        answers: selectedQuestion.answer_list, // This should now be the object with the "nodes" array
        correctAnswer: selectedQuestion.correct_answer,
      });
      setShowQuestion(true);
      setShowResult(false);
      setSelectedAnswer(null);
    } else {
      console.error(`No question found for dice number ${diceNumber}`);
    }
  };

  const getRarity = (diceNumber: number): string => {
    if (diceNumber <= 2) return "common";
    if (diceNumber <= 4) return "rare";
    return "epic";
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

  interface Question {
    quest_id: number;
    quest_type: string;
    quest_details: string;
  }

  interface Answer {
    answer_id: number;
    quest_id: number;
    correct_answer: string;
    answer1: string;
    answer2: string;
    answer3: string;
  }

  const fetchQuestions = async () => {
    const { data: questData, error: questError } = (await supabase
      .from("magic_quest")
      .select("quest_id, quest_type, quest_details")) as {
      data: Question[];
      error: any;
    };

    if (questError) {
      console.error("Error fetching questions:", questError);
      return;
    }

    const { data: answerData, error: answerError } = (await supabase
      .from("magic_quest_answer")
      .select(
        "answer_id, quest_id, correct_answer, answer1, answer2, answer3"
      )) as { data: Answer[]; error: any };

    if (answerError) {
      console.error("Error fetching answers:", answerError);
      return;
    }

    const formattedQuestions = questData
      .map((quest) => {
        const answer = answerData.find(
          (ans) => ans.quest_id === quest.quest_id
        );
        if (answer) {
          const allAnswers = [
            answer.correct_answer,
            answer.answer1,
            answer.answer2,
            answer.answer3,
          ];
          // Shuffle the answers
          const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

          return {
            quest_id: quest.quest_id,
            quest_type: quest.quest_type,
            quest_details: quest.quest_details,
            answer_list: {
              nodes: shuffledAnswers.map((text, index) => ({
                id: index.toString(),
                text,
              })),
            },
            correct_answer: answer.correct_answer,
          };
        }
        return null;
      })
      .filter(Boolean); // Remove any null entries

    console.log("Formatted questions:", formattedQuestions);
    setQuestions(formattedQuestions);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50 h-full"
      onClick={onClose}
    >
      <div
        className="bg-yellow-500 p-8 rounded-2xl md:rounded-3xl w-11/12 h-11/12 md:w-3/4 md:h-3/4 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl md:text-4xl">Dice Result</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className="text-white text-2xl md:text-5xl absolute top-5 right-7 cursor-pointer"
          onClick={onClose}
        />
        <div className="bg-white p-8 rounded-xl md:rounded-2xl mt-4 h-[90%] flex flex-col items-center justify-center">
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
          ) : showResult &&
            currentQuestion &&
            selectedAnswer &&
            selectedDice ? (
            <ResultCard
              gainSpellOrb={gainSpellOrb}
              question={currentQuestion.question}
              selectedAnswer={selectedAnswer}
              correctAnswer={currentQuestion.correctAnswer}
              onCorrectAnswer={handleCorrectAnswer}
              closeDiceOverlay={onClose}
              rarity={getRarity(selectedDice)}
            />
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
