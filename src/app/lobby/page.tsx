"use client";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import useSound from "use-sound";

export default function LobbyPage() {
  const [loading, setLoading] = useState(false);
  const players = [
    { name: "Junshen", image: "/pfp2.svg" },
    { name: "Sean", image: "/pfp1.svg" },
    { name: "Johnson", image: "/pfp4.svg" },
  ];
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");

  const router = useRouter();

  const handleStart = async () => {
    buttonSound();
    setLoading(true); // Set loading to true
    // Loading 1 second
    await new Promise((resolve) => setTimeout(resolve, 3000));
    // Navigate to game page
    router.push("/lobby/battle");
  };

  // Ensure there are always 4 player slots
  while (players.length < 4) {
    players.push({ name: "Waiting", image: "/empty.svg" });
  }

  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-t from-indigo-900 to-indigo-600">
        <Header />

        {loading && (
          <div className="absolute inset-0 flex  items-center justify-center bg-black bg-opacity-50 z-20">
            <div className="text-white text-6xl flex  items-center">
              Loading game
              <div className="ml-4 flex flex-row gap-2">
                <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
                <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
              </div>
            </div>
          </div>
        )}
        <div
          className="w-screen h-screen flex flex-col z-10 gap-20 bg-cover bg-center"
          style={{ backgroundImage: `url('/lobby-bg.jpg')` }}
        >
          <div className="justify-center flex m-2">
            <div className="rounded-xl w-60 py-3 bg-violet-900 text-5xl flex justify-center bg-red">
              AEGT
            </div>
          </div>

          <div className="flex flex-row items-center justify-center gap-4">
            {players.map((player, index) => (
              <div
                key={index}
                className="w-64 h-96 shadow-lg bg-indigo-600 z-10 rounded-2xl justify-center flex flex-col gap-4 items-center g"
              >
                {player.name !== "Waiting" ? (
                  <Image
                    src={player.image}
                    width={70}
                    height={70}
                    alt="Profile Icon"
                    className="h-14 md:h-40 md:w-40"
                  />
                ) : (
                  <div className="flex flex-row gap-2">
                    <div className="w-4 h-4 rounded-full bg-white animate-bounce"></div>
                    <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.3s]"></div>
                    <div className="w-4 h-4 rounded-full bg-white animate-bounce [animation-delay:-.5s]"></div>
                  </div>
                )}
                <div className="w-40 text-xl flex pl-3 md:pl-5 lg:pl-0 justify-center">
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
