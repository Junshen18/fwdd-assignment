"use client";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { joinRoom } from "@/utils/roomUtils";
import checkSession from "@/utils/sessionUtils";
import { Session } from "@supabase/supabase-js";
import LoadingSpinner from "@/components/loadingSpinner";

export default function JoinRoomPage() {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [username, setUserName] = useState("");
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleJoinRoom = async () => {
    setError("");
    try {
      console.log("username: ", username, code);
      const roomCode = await joinRoom(code.toUpperCase(), username);
      console.log("Joining room with code:", roomCode);
      router.push(`/lobby/${roomCode}`);
    } catch (error) {
      console.error("Error joining room:", error);
      setError(error instanceof Error ? error.message : "Failed to join room");
    }
  };

  useEffect(() => {
    const initSession = async () => {
      const session = await checkSession(router);
      setSession(session);
      setLoading(false);
    };
    initSession();

    const username = localStorage.getItem("user_name");
    setUserName(username ?? "");
    console.log("username: ", username);
  }, [router]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!session) {
    return null;
  }
  return (
    <>
      <div>
        <Header />
        <Image
          src="/snake.svg"
          width={200}
          height={200}
          alt="snake"
          className="absolute bottom-5 left-5 z-10 hidden md:block w-48 lg:w-52"
        />
        <Image
          src="/wizardcrystal.svg"
          width={200}
          height={200}
          alt="snake"
          className="absolute bottom-5 right-5 z-10 hidden md:block w-48 lg:w-52"
        />
        <div
          className="h-screen relative w-screen bg-gradient-to-t from-violet-800 to-violet-500 bg-cover bg-center flex flex-col justify-center gap-8 text-violet-600 items-center"
          style={{ backgroundImage: `url('/portal.jpg')` }}
        >
          <input
            className="mt-10 bg-neutral-100 border-none p-4 rounded-2xl w-72 text-xl text-center shadow-[0_0.4rem] shadow-neutral-300 uppercase"
            type="text"
            placeholder="Enter Room Code"
            value={code}
            onChange={handleCodeChange}
          />
          <CustomButton
            text="Join Room"
            onClick={handleJoinRoom}
            bgColor="#eab308"
            borderColor="#ca8a04"
            w="288px"
          />
          {error && (
            <p className="absolute top-1/4 bg-gray-200 p-4 text-red-500 text-lg rounded-xl ">
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
