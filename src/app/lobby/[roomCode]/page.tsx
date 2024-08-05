"use client";
import CustomButton from "@/components/customButton";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSound from "use-sound";
import { exitRoom, fetchRoomPlayers } from "@/utils/roomUtils";
import { supabase } from "@/lib/supabase";
import BackArrow from "@/components/backArrow";
import ProfileDiv from "@/components/profileName";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

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
  const [username, setUsername] = useState<string | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const [showExitConfirmation, setShowExitConfirmation] = useState(false);

  const router = useRouter();

  const handleStart = async () => {
    buttonSound();
    setLoading(true);

    // Filter out "Waiting" players
    const activePlayers = players.filter((player) => player.name !== "Waiting");
    // Check if there are at least 2 active players
    if (activePlayers.length > 1) {
      // Loading for 3 seconds
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Navigate to game page with only active players
      router.push(
        `/lobby/battle/${roomCode}?players=${encodeURIComponent(
          JSON.stringify(activePlayers)
        )}`
      );
    } else {
      setLoading(false);
      alert("At least 2 players are required to start the game.");
      while (activePlayers.length < 4) {
        players.push({
          userId: null,
          name: "Waiting",
          mp: null,
          avatarUrl: "/empty.svg",
        });
        return;
      }
    }
  };

  const getPlayers = async () => {
    console.log("Fetching players");
    const fetchedPlayers = await fetchRoomPlayers(roomCode);
    const mappedPlayers: Player[] = fetchedPlayers.map((p) => ({
      userId: p.userId,
      name: p.name || "Unknown",
      mp: 0,
      avatarUrl: p.avatarUrl || "/empty.svg",
    }));
    console.log(mappedPlayers);
    setPlayers(mappedPlayers);
  };

  const handleExit = async () => {
    if (!username) return;

    try {
      await exitRoom(roomCode, username);
      router.push("/findRoom"); // Navigate to home page or wherever you want
    } catch (error) {
      console.error("Error exiting room:", error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handlePlayersChange = (payload: any) => {
    console.log("Change received!", payload);
    getPlayers();
  };

  const handleBackArrowClick = () => {
    buttonSound();
    setShowExitConfirmation(true);
  };

  const handleConfirmExit = async () => {
    await handleExit();
  };

  const handleCancelExit = () => {
    setShowExitConfirmation(false);
  };

  useEffect(() => {
    const userName = localStorage.getItem("user_name");
    setUsername(userName);
    getPlayers();

    const avatar = localStorage.getItem("user_avatar");
    setAvatar(avatar);

    // Set up real-time subscription
    const subscription = supabase
      .channel(`room:${roomCode}`)
      .on(
        "postgres_changes",
        { event: "*", schema: "public", table: "player" },
        handlePlayersChange
      )
      .subscribe();

    // Cleanup subscription on component unmount
    return () => {
      subscription.unsubscribe();
    };
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
        <div className="w-screen bg-transparent absolute z-30 top-0">
          <div className="grid grid-cols-3 items-center p-4">
            <div className="ml-5">
              <div
                onClick={handleBackArrowClick}
                className="cursor-pointer z-1"
              >
                <FontAwesomeIcon
                  icon={faArrowLeft}
                  className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
                  style={{ color: "#ffffff" }}
                />
              </div>
            </div>
            <div></div>
            <div className="flex gap-4 justify-end">
              <ProfileDiv pic="/pfp2.svg" name={username || "Loading..."} />
            </div>
          </div>
        </div>

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

        {/* Exit Confirmation Modal */}
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
