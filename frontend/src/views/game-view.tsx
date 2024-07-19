import { useEffect, useState } from "react";
import { Prompt } from "../models/prompt";

function GameView() {
  const [score, setScore] = useState<number>(0);
  const [wrong, setWrong] = useState<number>(0);
  const [scoreTrack, setScoreTrack] = useState<string>("_ _ _ _ _ _ _ _ _ _");

  const [prompts, setPrompts] = useState<Prompt[]>([]);
  const [currentPrompt, setCurrentPrompt] = useState<Prompt>();
  const [challengerPrompt, setChallengerPrompt] = useState<Prompt>();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/points")
    .then(response => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json() as Promise<Prompt[]>
    })
    .then(data => {
      setPrompts(data)
      setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)])
      setChallengerPrompt(prompts[Math.floor(Math.random() * prompts.length)])
    })
    console.log("test")
  }, [])

  const handleChoice = (choice: Prompt, compare: Prompt): void => {
    if (choice.Pts > compare.Pts) {
      setScore(score + 1);
      setScoreTrack(scoreTrack.replace("_", "O"))
    } else {
      setWrong(wrong + 1);
      setScoreTrack(scoreTrack.replace("_", "X"))
    }
    setCurrentPrompt(challengerPrompt);
    setChallengerPrompt(prompts[Math.floor(Math.random() * prompts.length)])
  
  };

  const restartGame = (): void => {
    setScore(0)
    setWrong(0)
    setCurrentPrompt(prompts[Math.floor(Math.random() * prompts.length)])
    setChallengerPrompt(prompts[Math.floor(Math.random() * prompts.length)])
    setScoreTrack("_ _ _ _ _ _ _ _ _ _")
  }
  
  
  return (
    <div className="
      h-dvh w-dvw overflow-hidden p-10
      flex flex-col justify-center items-center
    ">
      {/* Pitch */}
      <div className="relative w-full h-full bg-green-500 border-8 border-white rounded-lg">
      {/* Center */}
      <div className="absolute top-0 left-1/2 transform -translate-x-1/2 h-full w-2 bg-white"></div>
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-8 border-white rounded-full"></div>
      {/* Penalty Areas */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -ml-1 h-96 w-48 border-8 border-white"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 -mr-1 h-96 w-48 border-8 border-white"></div>
      {/* Goal Areas */}
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 ml-1 h-24 w-12 border-4 border-white"></div>
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 mr-1 h-24 w-12 border-4 border-white"></div>
      {/* Center Spot */}
      <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-white rounded-full"></div>
      {/* Penalty Spots */}
      <div className="absolute left-24 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
      <div className="absolute right-24 top-1/2 transform -translate-y-1/2 w-2 h-2 bg-white rounded-full"></div>
      {/* Prompt */}
      <div className="
        absolute left-1/2 top-1/4 transform -translate-x-1/2 -translate-y-1/2
        flex justify-center items-center bg-slate-700 rounded-xl py-4 w-1/2
      ">
        <span className="text-4xl text-white font-bold">Who achieved more points?</span>
      </div>
      <div className="
        absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-36
        flex flex-row justify-center items-center gap-x-24
        bg-slate-700 rounded-xl py-4 w-1/4
        text-xl text-white font-bold
      ">
        <span>{scoreTrack}</span>
      </div>
      {(score + wrong < 10) && currentPrompt && challengerPrompt &&
        <div className="
          absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2
          flex flex-row justify-center items-center gap-x-24
        ">
          <button onClick={() => {handleChoice(currentPrompt, challengerPrompt)}} className="
            bg-green-700 rounded-xl border-white border-2 min-w-96
            px-10 py-2
            text-xl text-white font-bold
          ">
            {currentPrompt.Prompt}
          </button>
          <button onClick={() => {handleChoice(challengerPrompt, currentPrompt)}} className="
            bg-green-700 rounded-xl border-white border-2 w-96
            px-10 py-2
            text-xl text-white font-bold
          ">
            {challengerPrompt.Prompt}
          </button>
        </div>
      }
      {(score + wrong) == 10 &&
        <div className="
          absolute left-1/2 top-1/2 transform -translate-x-1/2 translate-y-32
          flex flex-col justify-center items-center gap-y-10
          bg-slate-700 rounded-xl py-4 w-1/4
          text-xl font-bold
        ">
          <span>Final Score: {score} / 10</span>
          <button onClick={() => {restartGame()}} className="
            bg-green-700 rounded-xl border-white border-2
            px-10 py-2
            text-xl text-white font-bold
          ">
            Play Again?
          </button>
        </div>
      }

    </div>
  </div>
  )
}

export default GameView;
