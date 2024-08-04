"use client";

import ProfileDiv from "@/components/profileName";
import Image from "next/image";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import DiceOverlay from "@/components/diceOverlay";
import SpellOverlay from "@/components/spellOverlay";
import LuckyOverlay from "@/components/luckyOverlay";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { fetchRoomPlayers } from "@/utils/roomUtils";
import { Session } from "@supabase/supabase-js";
import { checkSession } from "@/utils/sessionUtils";
import LoadingSpinner from "@/components/loadingSpinner";

export default function Battle({ params }: { params: { roomCode: string } }) {
  const { roomCode } = params;
  const [players, setPlayers] = useState<[]>([]);
  const [session, setSession] = useState<Session | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [showDiceOverlay, setShowDiceOverlay] = useState(false);
  const [showSpellOverlay, setShowSpellOverlay] = useState(false);
  const [showLuckyOverlay, setShowLuckyOverlay] = useState(false);
  const [showEndGame, setShowEndGame] = useState(false);
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const initSession = async () => {
      const session = await checkSession(router);
      setSession(session);
      setLoading(false);
    };
    initSession();

    async function getUser() {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUsername(user?.user_metadata?.username || user?.email || "Unknown");
    }
    getUser();

    async function loadPlayers() {
      try {
        const roomPlayers = await fetchRoomPlayers(roomCode);
        setPlayers(roomPlayers);
      } catch (error) {
        console.error("Error fetching players:", error);
      }
    }

    loadPlayers();
  }, [roomCode, router, supabase]);

  // press confirm end game button and navigate to leaderboard
  const handleEndGame = () => {
    setShowEndGame(false);
    router.push("/leaderboard");
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <div
        className="left-0 w-screen h-screen bg-cover bg-center"
        style={{ backgroundImage: `url('/battle-bg.jpg')` }}
      >
        <div className="w-screen h-screen flex flex-col z-10 md:justify-between gap-2 md:gap-0 ">
          <div className="flex flex-row justify-between items-center m-2">
            <div className="w-1/3 ">
              <button
                className={`bg-red-500 border-red-700 cursor-pointer transition-all text-white h-16 px-8 py-2 rounded-2xl 
        border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-base md:text-xl w-auto
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
                onClick={() => {
                  buttonSound();
                  setShowEndGame(true);
                }}
              >
                End
              </button>
            </div>
            <div className="justify-center flex m-2">
              <div
                className="rounded-xl text-2xl md:text-4xl w-40 md:w-60 py-4 my-1
              bg-violet-900 flex justify-center bg-red"
              >
                {roomCode}
              </div>
            </div>
            <div className="w-1/3 flex justify-end">
              <ProfileDiv pic="/pfp2.svg" name={username} />
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-5">
            {players.map((player, index) => (
              <div
                key={player.userId}
                className="w-5/6 h-20 md:w-64 md:h-96 shadow-lg bg-indigo-600 z-10 rounded-2xl justify-center flex flex-row md:flex-col gap-4 items-center"
              >
                <Image
                  src={player.avatarUrl || "/default-avatar.png"}
                  width={70}
                  height={70}
                  alt="Profile Icon"
                  className="h-14 md:h-40 md:w-40"
                />

                <div className="w-40 text-xl justify-center flex flex-col md:gap-6">
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
              className={`bg-purple-600 border-purple-800 cursor-pointer transition-all text-white h-24 w-24 md:h-40 md:w-40 rounded-full 
        border-b-[10px] md:border-b-[16px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[12px]
        active:border-b-[6px] active:brightness-90 active:translate-y-[2px] flex items-center justify-center`}
            >
              <Image
                src="/spellbook.png"
                width={112}
                height={112}
                alt="Spellbook Icon"
                className="w-14 h-14 md:w-24 md:h-24"
              />
            </div>
            <div
              onClick={() => {
                buttonSound();
                setShowDiceOverlay(true);
              }}
              className={`bg-yellow-500 border-yellow-700 cursor-pointer transition-all text-white h-24 w-24 md:h-40 md:w-40 rounded-full 
              border-b-[10px] md:border-b-[16px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[12px]
              active:border-b-[6px] active:brightness-90 active:translate-y-[2px] flex items-center justify-center`}
            >
              <Image
                src="/dice.png"
                width={112}
                height={112}
                alt="Dice Icon"
                className="w-16 h-16 md:w-28 md:h-28"
              />
            </div>
            <div
              onClick={() => {
                buttonSound();
                setShowLuckyOverlay(true);
              }}
              className={`bg-green-800 border-green-900 cursor-pointer transition-all text-white h-24 w-24 md:h-40 md:w-40 rounded-full 
        border-b-[10px] md:border-b-[16px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[12px]
        active:border-b-[6px] active:brightness-90 active:translate-y-[2px] flex items-center justify-center`}
            >
              <Image
                src="/lucky-clover.png"
                width={112}
                height={112}
                alt="Lucky Clover"
                className="w-14 h-14 md:w-24 md:h-24"
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
      {showLuckyOverlay && (
        <LuckyOverlay onClose={() => setShowLuckyOverlay(false)} />
      )}
      {showEndGame && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
          onClick={() => setShowEndGame(false)}
        >
          <div
            className="bg-red-500 p-8 rounded-2xl md:rounded-3xl w-11/12 h-11/12 md:w-3/4 md:h-3/4 text-center relative"
            onClick={(e) => e.stopPropagation()}
          >
            <h1 className="text-2xl md:text-4xl">Reach the End?</h1>
            <FontAwesomeIcon
              icon={faXmark}
              className="text-white text-2xl md:text-5xl absolute top-5 right-7 cursor-pointer"
              onClick={() => setShowEndGame(false)}
            />

            <div className="bg-white md:p-28 p-2 rounded-xl md:rounded-2xl mt-4 h-[90%] flex flex-col items-center justify-center gap-4 md:gap-10">
              <h3 className="text-green-900 text-2xl md:text-4xl w-full text-center mb-4">
                The first player to reach the end gains extra 100 magic powers!
              </h3>
              <div className="inline-block px-2 py-2 rounded-xl bg-violet-500 text-white w-40 h-16 text-2xl self-center">
                +100 MP
              </div>
              <div className="flex flex-row justify-between gap-4 md:gap-8 mt-4 ">
                <button
                  onClick={handleEndGame}
                  className="bg-green-500 text-white text-xl px-4 md:px-10 py-2 md:py-4 rounded hover:bg-green-600 transition-colors"
                >
                  Yes
                </button>
                <button
                  onClick={() => setShowEndGame(false)}
                  className="bg-red-600 text-white text-xl px-4 md:px-10 py-2 md:py-4 rounded hover:bg-red-700 transition-colors"
                >
                  No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
