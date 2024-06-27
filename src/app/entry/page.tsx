"use client";
import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import useSound from "use-sound";
import AudioButton from "@/components/audioButton";
import LoginPanel from "@/components/loginPanel";

export default function EntryPage() {
  const [start, setStart] = useState(false);
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");

  const EntrySection = () => {
    return (
      <>
        <div
          className="h-screen w-screen bg-cover bg-center flex flex-col justify-center items-center"
          style={{ backgroundImage: `url('/background.png')` }}
        >
          <Image
            src="/kreate.png"
            width={100}
            height={100}
            alt="Picture of the author"
            className="absolute top-0 left-2"
          />

          <div className="flex flex-col items-center justify-center h-3/4 bg-transparent">
            <h1 className="text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#F5BFBF] to-white drop-shadow-lg">
              PYTHON
            </h1>
            <h1 className="text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#EB7E7E] to-[#F5BFBF] drop-shadow-lg mt-2">
              WIZARD
            </h1>
          </div>
          <button
            onClick={() => {
              setStart(true);
              buttonSound();
            }}
            className="animate-bounce text-[70px] leading-none"
          >
            Start
          </button>
        </div>
      </>
    );
  };

  const LoginSection = () => {
    return (
      <>
        <div
          className="h-screen w-screen bg-cover bg-center flex flex-col justify-center items-center"
          style={{ backgroundImage: `url('/background.png')` }}
        >
          <Image
            src="/kreate.png"
            width={100}
            height={100}
            alt="Picture of the author"
            className="absolute top-0 left-2"
          />
          <div className="flex flex-col items-center justify-center h-3/4 bg-transparent">
            <h1 className="text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#F5BFBF] to-white drop-shadow-lg">
              PYTHON
            </h1>
            <h1 className="text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#EB7E7E] to-[#F5BFBF] drop-shadow-lg mt-2">
              WIZARD
            </h1>
          </div>
          <div className="flex flex-row justify-between w-3/5">
            <LoginPanel
              buttonText="Sign Up"
              title="Sign Up"
              desc="Get you account now"
            />
            {/* <button
              onClick={() => {
                buttonSound();
              }}
              className="text-5xl leading-none hover:animate-bounce"
            >
              Sign Up
            </button> */}
            <button
              onClick={() => {
                buttonSound();
              }}
              className="text-5xl leading-none hover:animate-bounce"
            >
              Login
            </button>
            <button
              onClick={() => {
                buttonSound();
              }}
              className="text-5xl leading-none hover:animate-bounce"
            >
              Guest
            </button>
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      <div className="absolute bottom-0 right-0">
        <AudioButton />
      </div>
      <div className="absolute z-1"></div>

      <div>{start ? <LoginSection /> : <EntrySection />}</div>
    </>
  );
}
