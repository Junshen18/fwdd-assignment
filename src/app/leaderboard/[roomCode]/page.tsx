"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import useSound from "use-sound";
import ProfileDiv from "@/components/profileName";
import Header from "@/components/header";
import { useRouter, useSearchParams } from "next/navigation";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

interface LeaderboardEntry {
  name: string;
  image: string;
  mp: number;
}

interface Player {
  userId: any;
  name: any;
  mp: any;
  avatarUrl: string;
}

const leaderboardData: LeaderboardEntry[] = [
  { name: "Junshen", image: "/pfp2.svg", mp: 1000 },
  { name: "Sean", image: "/pfp1.svg", mp: 850 },
  { name: "Johnson", image: "/pfp4.svg", mp: 400 },
  { name: "QianHua", image: "/pfp5.svg", mp: 550 },
];

export default function LeaderboardPage({
  params,
}: {
  params: { roomCode: string };
}) {
  const searchParams = useSearchParams();
  const [players, setPlayers] = useState<Player[]>([]);

  const [username, setUsername] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);
  const [userMp, setUserMp] = useState<number>(0);

  const [leaderboard, setLeaderboard] = useState(leaderboardData);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [name, setName] = useState("");
  const [animatingIndices, setAnimatingIndices] = useState<number[]>([]);
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();
  const handleLeaveRoom = () => {
    router.replace("/findRoom");
  };
  useEffect(() => {
    const storedName = localStorage.getItem("name") || "Unknown";
    setName(storedName);

    const interval = setInterval(() => {
      setLeaderboard((prevLeaderboard) => {
        const newLeaderboard = [...prevLeaderboard];
        for (let i = 1; i < newLeaderboard.length; i++) {
          if (newLeaderboard[i].mp > newLeaderboard[i - 1].mp) {
            [newLeaderboard[i], newLeaderboard[i - 1]] = [
              newLeaderboard[i - 1],
              newLeaderboard[i],
            ];
            setAnimatingIndices([i - 1, i]);
            break;
          }
        }
        console.log(newLeaderboard);
        return newLeaderboard;
      });
    }, 1000); // Check for changes every 3 seconds

    return () => clearInterval(interval);
  }, []);

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

    return (
      <div
        className="w-screen h-screen mx-auto px-4 py-8 justify-center items-center bg-cover bg-center "
        style={{ backgroundImage: `url('/leaderboard-bg.jpg')` }}
      >
        <div className="flex flex-row items-center w-full gap-10 justify-between pl-4">
          <div className="relative">
            <div
              onClick={() => router.back()}
              // onClick={() => setShowConfirmation(true)}
              className="cursor-pointer z-1"
            >
              <FontAwesomeIcon
                icon={faArrowLeft}
                className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                style={{ color: "#ffffff" }}
              />
            </div>
            {showConfirmation && (
              <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                <div className="bg-white rounded-xl shadow-lg p-6 max-w-sm w-11/12 md:w-full">
                  <p className="text-black mb-4 text-center">
                    Are you sure you want to leave the room?
                  </p>
                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={handleLeaveRoom}
                      className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                      Yes
                    </button>
                    <button
                      onClick={() => setShowConfirmation(false)}
                      className="bg-gray-300 text-black px-6 py-2 rounded hover:bg-gray-400 transition-colors"
                    >
                      No
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
          <ProfileDiv pic="/pfp2.svg" name={name} />
        </div>

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
                {leaderboard.map((entry, index) => (
                  <tr
                    key={entry.name}
                    className={`border-b border-indigo-500 text-white transition-all duration-500 ${
                      animatingIndices.includes(index) ? "animate-move" : ""
                    }`}
                  >
                    <td className="p-2 pl-6">
                      {index === 0 ? 1 : `${index + 1}`}
                      {index > 0 && (
                        <span className="ml-2 text-sm">
                          {leaderboard[index].mp === leaderboard[index - 1].mp
                            ? "="
                            : leaderboard[index].mp > leaderboard[index - 1].mp
                            ? "▲"
                            : "▼"}
                        </span>
                      )}
                    </td>
                    <td className="p-3 flex items-center">
                      <Image
                        src={entry.image}
                        width={40}
                        height={40}
                        alt={`${entry.name}'s profile`}
                        className="rounded-full mr-3"
                      />
                      {entry.name}
                    </td>
                    <td className="p-3">{entry.mp}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-center mt-8">
            <button
              className={`bg-yellow-500 border-yellow-700 cursor-pointer transition-all text-white h-16 px-8 py-2 rounded-2xl 
          border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-base md:text-xl w-auto
          active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
              onClick={() => {
                buttonSound();
                router.replace("/lobby");
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }
}
