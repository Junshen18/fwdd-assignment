"use client";
import AudioButton from "@/components/audioButton";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import ProfileDiv from "@/components/profileName";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function FindRoomPage() {
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();

  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-center flex flex-col justify-start items-center"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <Header />
        <div
          className={
            "flex flex-col items-center justify-center h-3/5 bg-transparent scale-125 mt-10"
          }
        >
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#F5BFBF] to-white drop-shadow-lg">
            PYTHON
          </h1>
          <h1 className="text-5xl md:text-6xl lg:text-7xl xl:text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#EB7E7E] to-[#F5BFBF] drop-shadow-lg mt-2">
            WIZARD
          </h1>
        </div>
        <div className="h-auto flex flex-col gap-10 z-10  ">
          <div className="h-16">
            <CustomButton
              text="Create Room"
              bgColor="#f59e0b"
              borderColor="#d97706"
              onClick={() => {
                buttonSound();
                router.push("/findRoom/createRoom");
              }}
            />
          </div>
          <div className="h-16">
            <CustomButton
              text="Join Room"
              bgColor="#3b82f6"
              borderColor="#2563eb"
              onClick={() => {
                buttonSound();
                router.push("/findRoom/joinRoom");
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
}
