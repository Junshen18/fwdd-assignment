"use client";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { fetchRoomPlayers } from "@/utils/roomUtils";

interface Player {
  userId: any;
  name: any;
  mp: any;
  avatarUrl: string;
}

export default function LobbyPage({
  params,
}: {
  params: { roomCode: string };
}) {
  const { roomCode } = params;
  const [loading, setLoading] = useState(false);
  const [players, setPlayers] = useState<Player[]>([]);

  const [buttonSound] = useSound("/soundEffects/button-click.mp3");

  const router = useRouter();

  const handleStart = async () => {
    buttonSound();
    setLoading(true); // Set loading to true
    // Loading 1 second
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // Navigate to game page
    router.replace("/lobby/battle");
  };

  useEffect(() => {
    const getPlayers = async () => {
      console.log("Fetching players");
      const fetchedPlayers = await fetchRoomPlayers(roomCode);
      const mappedPlayers: Player[] = fetchedPlayers.map((p) => ({
        userId: p.user_id,
        name: p.user_name || "Unknown",
        mp: null,
        avatarUrl: p.user_avatar || "/empty.svg",
      }));
      console.log(mappedPlayers);
      setPlayers(mappedPlayers);
    };
    getPlayers();
    console.log(players);
  }, [roomCode]);

  // Ensure there are always 4 player slots
  while (players.length < 4) {
    players.push({
      userId: null,
      name: "Waiting",
      mp: null,
      avatarUrl: "/empty.svg",
    });
  }
  const userId = localStorage.getItem("user_id") || "";

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-t from-indigo-900 to-indigo-600">
        <Header />

        {loading && (
          <div className="absolute inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="text-white md:text-6xl text-3xl flex  items-center">
              Loading game
              <div className="ml-4 flex flex-row gap-2">
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white animate-bounce"></div>
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
        <div
          className="w-screen h-screen flex flex-col z-10 gap-12 md:gap-16 bg-cover bg-center"
          style={{ backgroundImage: `url('/lobby-bg.jpg')` }}
        >
          <div className="justify-center flex m-2">
            <div
              className="rounded-xl text-2xl md:text-4xl w-40 md:w-60 py-4 my-1
              bg-violet-900 flex justify-center bg-red"
            >
              {roomCode}
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            {players.map((player, index) => (
              <div
                key={index}
                className="w-5/6 h-20 md:w-64 md:h-96 shadow-lg bg-indigo-600 z-10 rounded-2xl justify-center flex flex-row md:flex-col gap-4 items-center"
              >
                {player.name !== "Waiting" ? (
                  <Image
                    src={player.avatarUrl}
                    width={70}
                    height={70}
                    alt="Profile Icon"
                    className="h-14 md:h-40 md:w-40"
                  />
                ) : (
                  <div className="flex flex-row gap-2">
                    <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-white animate-bounce"></div>
                    <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-2 h-2 md:w-4 md:h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                )}
                <div className="w-40 text-xl flex justify-center">
                  <p className="truncate text-center">{player.name}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="z-10 justify-center items-end flex">
            <CustomButton
              text="Start Game"
              bgColor="#f59e0b"
              borderColor="#d97706"
              onClick={handleStart}
            />
          </div>
        </div>
      </div>
    </>
  );
}
