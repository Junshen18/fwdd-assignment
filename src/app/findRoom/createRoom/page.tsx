"use client";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import QrScanner from "@/components/qrCode";
import checkSession from "@/utils/sessionUtils";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner";
import { Session } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabase";
import { decrypt } from "@/utils/encryption";

export default function CreateRoom() {
  const [lobbyCode, setLobbyCode] = useState<string | null>(null);
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState<string | null>(null);
  const [qrData, setQrData] = useState<string | null>(null);

  const handleScan = async (scannedData?: string | null) => {
    const decryptedData = decrypt(scannedData || "", 3);
    setQrData(decryptedData);
  };

  const handleCreateRoom = async (scannedData?: string) => {
    try {
      const response = await fetch("/api/generateLobby");
      // if response is not ok, throw an error
      if (!response.ok) {
        throw new Error("Failed to generate lobby code");
      }
      const data = await response.json();
      setLobbyCode(data.lobbyCode);

      const userName = localStorage.getItem("user_name");
      setUsername(userName);
      console.log("Username: ", username, lobbyCode);
      // if username and lobby code are set, join the room
      if (username && lobbyCode) {
        // const roomCode = await joinRoom(data.lobbyCode, username);

        // get room id by using room code
        const { data: room, error: roomError } = await supabase
          .from("room")
          .select("room_id, room_code, status")
          .eq("room_code", lobbyCode)
          .single();

        //get user id
        const user_id = parseInt(localStorage.getItem("user_id") || "0", 10);

        // add player to room real time database
        const { data: playerData, error: playerError } = await supabase
          .from("player")
          .insert([
            {
              user_id: user_id,
              room_id: room?.room_id,
              player_mp: 0,
            },
          ])
          .select();

        console.log("Joining room with code:", lobbyCode);

        if (lobbyCode) {
          router.push(`/lobby/${lobbyCode}`);
        } else {
          console.error("Room code is undefined or null");
        }
      } else {
        console.error("Username or lobby code is not set");
      }
    } catch (error) {
      console.error("Error creating room:", error);
    }
  };

  useEffect(() => {
    const initSession = async () => {
      const session = await checkSession(router);
      setSession(session);
      setLoading(false);
    };
    initSession();

    if (qrData === process.env.NEXT_PUBLIC_CREATE_ROOM_URL) {
      handleCreateRoom();
    }
  }, [router, qrData]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }

  return (
    <>
      <div
        className="flex flex-col w-screen h-screen justify-center items-center gap-7"
        style={{
          backgroundImage: `url('/createRoom-bg.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <Header />
        <h1 className="text-xl w-2/3 text-center md:w-auto md:text-3xl">
          Scan the Game QR to create room
        </h1>
        <div className="w-96">
          <QrScanner onScan={handleScan} />
        </div>

        <button
          onClick={() => handleCreateRoom()}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Create Room
        </button>
        {lobbyCode && (
          <p className="mt-4 text-lg font-semibold">Lobby Code: {lobbyCode}</p>
        )}
      </div>
    </>
  );
}
