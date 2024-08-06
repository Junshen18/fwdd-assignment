"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSound from "use-sound";
import ProfileDiv from "@/components/profileName";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { exitRoom } from "@/utils/roomUtils";

interface Player {
  userId: any;
  name: any;
  mp: any;
  avatarUrl: string;
}

export default function LeaderboardPage({
  params,
}: {
  params: { roomCode: string };
}) {
  const searchParams = useSearchParams();
  const [players, setPlayers] = useState<Player[]>([]);
  const [name, setName] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();

  useEffect(() => {
    const storedName = localStorage.getItem("user_name") || "Unknown";
    setName(storedName);
    const storedAvatarUrl = localStorage.getItem("user_avatar") || "/pfp1.svg";
    setAvatarUrl(storedAvatarUrl);

    const playersParam = searchParams.get("players");
    if (playersParam) {
      try {
        const parsedPlayers = JSON.parse(
          decodeURIComponent(playersParam)
        ) as Player[];
        setPlayers(parsedPlayers);
      } catch (error) {
        console.error("Error parsing players data:", error);
      }
    }
  }, [searchParams]);

  const handleConfirmExit = async () => {
    await handleExit();
  };

  const handleCancelExit = () => {
    setShowExitConfirmation(false);
  };

  const handleExit = async () => {
    const roomCode = params.roomCode;
    const username = name;
    try {
      await exitRoom(roomCode, username || "");
      router.push("/findRoom"); // Navigate to home page or wherever you want
    } catch (error) {
      console.error("Error exiting room:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div
      className="w-screen h-screen mx-auto px-4 py-8 justify-center items-center bg-cover bg-center "
      style={{ backgroundImage: `url('/leaderboard-bg.jpg')` }}
    >
      <div className="flex flex-row items-center w-full gap-10 justify-between pl-4">
        <div className="relative">
          <div
            // onClick={() => router.back()}
            onClick={() => setShowExitConfirmation(true)}
            className="cursor-pointer z-1"
          >
            <FontAwesomeIcon
              icon={faArrowLeft}
              className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
              style={{ color: "#ffffff" }}
            />
          </div>
        </div>
        <ProfileDiv name={name || "Unknown"} />
      </div>
      {/* Exit Confirmation Message */}
      {showExitConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl text-black">
            <h2 className="text-xl font-bold mb-4">Confirm Exit</h2>
            <p className="mb-4">Are you sure you want to exit the room?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancelExit}
                className="px-4 py-2 bg-gray-300 text-white rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmExit}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Exit
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center w-full gap-10 justify-center">
        <h1 className="text-3xl font-bold mb-6 text-center ">Leaderboard</h1>
        <div className="flex justify-center w-full items-center">
          <table className="w-full md:w-3/5 border-collapse bg-indigo-600 bg-opacity-80 rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-indigo-800 bg-opacity-90 text-white text-xl">
                <th className="p-3 pl-6 text-left">Rank</th>
                <th className="p-3 text-left">Player</th>
                <th className="p-3 text-left">MP</th>
              </tr>
            </thead>
            <tbody>
              {players.map((player, index) => (
                <tr
                  key={player.userId}
                  className="border-b border-indigo-500 text-white"
                >
                  <td className="p-2 pl-6">{index + 1}</td>
                  <td className="p-3 flex items-center">
                    <Image
                      src={player.avatarUrl || "/default-avatar.png"}
                      width={40}
                      height={40}
                      alt={`${player.name}'s profile`}
                      className="rounded-full mr-3"
                    />
                    {player.name}
                  </td>
                  <td className="p-3">{player.mp}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
