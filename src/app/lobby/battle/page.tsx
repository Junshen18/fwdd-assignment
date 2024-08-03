"use client";
import CustomButton from "@/components/customButton";
import ProfileDiv from "@/components/profileName";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import DiceOverlay from "@/components/diceOverlay";
import SpellOverlay from "@/components/spellOverlay";

export default function Battle() {
  const players = [
    { name: "Junshen", image: "/pfp2.svg", mp: 0 },
    { name: "Sean", image: "/pfp1.svg", mp: 0 },
    { name: "Johnson", image: "/pfp4.svg", mp: 0 },
  ];
  const [name, setName] = useState("");
  const [showDiceOverlay, setShowDiceOverlay] = useState(false);
  const [showSpellOverlay, setShowSpellOverlay] = useState(false);
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  useEffect(() => {
    const storedName = localStorage.getItem("name") || "Unknown";
    setName(storedName);
  }, []);

  return (
    <>
      <div
        className="left-0 w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/battle-bg.jpg')` }}
      >
        <div className="w-screen h-screen flex flex-col z-10 justify-between">
          <div className="flex flex-row justify-between m-2">
            <div className="w-1/3 ">
              <button
                className={`bg-red-500 border-red-700 cursor-pointer transition-all text-white h-16 px-8 py-2 rounded-2xl 
        border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-xl w-auto
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
              >
                End Game
              </button>
            </div>
            <div className="w-1/3 justify-center flex">
              <div className="rounded-xl w-60 py-3 bg-violet-900 text-5xl flex justify-center">
                AEGT
              </div>
            </div>
            <div className="w-1/3 flex justify-end">
              <ProfileDiv pic="/pfp2.svg" name={name} />
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-4 mt-5">
            {players.map((player, index) => (
              <div
                key={index}
                className="w-64 h-96 shadow-lg bg-indigo-600 z-10 rounded-2xl justify-center flex flex-col gap-4 items-center"
              >
                <Image
                  src={player.image}
                  width={70}
                  height={70}
                  alt="Profile Icon"
                  className="h-14 md:h-40 md:w-40"
                />

                <div className="w-40 text-xl pl-3 md:pl-5 lg:pl-0 justify-center flex flex-col gap-6">
                  <p className="truncate text-center">{player.name}</p>
                  <p className="text-2xl text-center text-orange-100">
                    MP: {player.mp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-row justify-between mx-8 my-8">
            <div
              onClick={() => {
                buttonSound();
                setShowSpellOverlay(true);
              }}
              className={`bg-purple-600 border-purple-800 cursor-pointer transition-all text-white h-40 w-40 rounded-full 
        border-b-[16px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[12px]
        active:border-b-[6px] active:brightness-90 active:translate-y-[2px] flex items-center justify-center`}
            >
              <Image
                src="/spellbook.png"
                width={112}
                height={112}
                alt="Spellbook Icon"
                className="w-24 h-24"
              />
            </div>
            <div
              onClick={() => {
                buttonSound();
                setShowDiceOverlay(true);
              }}
              className={`bg-yellow-500 border-yellow-700 cursor-pointer transition-all text-white h-40 w-40 rounded-full 
        border-b-[16px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[12px]
        active:border-b-[6px] active:brightness-90 active:translate-y-[2px] flex items-center justify-center`}
            >
              <Image
                src="/dice.png"
                width={112}
                height={112}
                alt="Dice Icon"
                className="w-28 h-28"
              />
            </div>
          </div>
        </div>
      </div>

      {showDiceOverlay && (
        <DiceOverlay onClose={() => setShowDiceOverlay(false)} />
      )}
      {showSpellOverlay && (
        <SpellOverlay onClose={() => setShowSpellOverlay(false)} />
      )}
    </>
  );
}
