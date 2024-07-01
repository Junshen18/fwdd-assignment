"use client";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function JoinRoomPage() {
  const [code, setCode] = useState("");
  const router = useRouter();

  const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCode(event.target.value);
  };

  const handleJoinRoom = () => {
    // Add your logic to join the room using the entered code
    console.log("Joining room with code:", code);
    router.push("/lobby");
  };

  return (
    <>
      <div>
        <Header />
        <Image
          src="/snake.svg"
          width={200}
          height={200}
          alt="snake"
          className="absolute bottom-5 left-5 z-10"
        />
        <Image
          src="/wizardcrystal.svg"
          width={200}
          height={200}
          alt="snake"
          className="absolute bottom-5 right-5 z-10"
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
        </div>
      </div>
    </>
  );
}
