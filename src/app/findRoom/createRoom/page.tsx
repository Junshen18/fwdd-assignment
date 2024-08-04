"use client";
import { useState, useEffect } from "react";
import Header from "@/components/header";
import QrScanner from "@/components/qrCode";
import checkSession from "@/utils/sessionUtils";
import { useRouter } from "next/navigation";
import LoadingSpinner from "@/components/loadingSpinner";
import { Session } from "@supabase/supabase-js";

export default function CreateRoom() {
  const [lobbyCode, setLobbyCode] = useState<string | null>(null);
  const router = useRouter();
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  const handleCreateRoom = async () => {
    try {
      const response = await fetch("/api/generateLobby");
      const data = await response.json();
      setLobbyCode(data.lobbyCode);
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
  }, [router]);

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
          <QrScanner />
        </div>
        <button
          onClick={handleCreateRoom}
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
