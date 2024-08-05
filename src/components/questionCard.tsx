interface QuestionCardProps {
  question: string;
  answers: string | { nodes: { id?: string; text: string }[] };
  onAnswerSelected: (answer: string) => void;
}

type AnswerList = {
  nodes: Array<{ id?: string; text: string }>;
};

export default function QuestionCard({
  question,
  answers,
  onAnswerSelected,
}: QuestionCardProps) {
  const letters = ["a", "b", "c", "d"];

  // Parse answers if it's a string, and provide a fallback
  let answerList: AnswerList;
  try {
    answerList = typeof answers === "string" ? JSON.parse(answers) : answers;
  } catch (error) {
    console.error("Error parsing answers:", error);
    answerList = { nodes: [] };
  }

  // Ensure answerList.nodes exists and is an array
  const answerNodes = Array.isArray(answerList?.nodes) ? answerList.nodes : [];

  if (answerNodes.length === 0) {
    console.warn("No answers available for the question");
  }

  return (
    <div>
      <h3 className="text-2xl md:text-4xl font-bold md:mb-8 mb-4 text-black">
        {question}
      </h3>
      <div className="space-y-2">
        {answerNodes.map(
          (answer: { id?: string; text: string }, index: number) => (
            <button
              key={answer.id || index}
              onClick={() => onAnswerSelected(answer.text)}
              className="w-full text-gray-700 text-left p-2 bg-gray-100 hover:bg-gray-300 rounded transition-colors relative"
            >
              <div className="absolute inset-0 border border-transparent hover:border-blue-950 rounded pointer-events-none"></div>
              <span className="font-bold text-lg mr-2">{letters[index]}.</span>{" "}
              {answer.text}
            </button>
          )
        )}
      </div>
    </div>
  );
}
