"use client";
import Image from "next/image";
import { redirect, useRouter } from "next/navigation";
import useSound from "use-sound";

export default function ConfirmationPage() {
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();
  return (
    <>
      <div className="flex flex-col justify-center items-center h-screen gap-5 bg-violet-100">
        <Image
          src="/confirmation.png"
          width={400}
          height={400}
          alt="confirmation"
        />
        <div className="text-2xl text-purple-950">
          Successfully verify account! You may sign in now!
        </div>
        <button
          style={{
            backgroundColor: "#515a92",
            borderColor: "#484877",
            width: "310px",
          }}
          className={`cursor-pointer transition-all text-white h-16 px-8 py-2 rounded-2xl 
        border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-xl
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
          onClick={() => {
            buttonSound();
            router.push("/entry");
          }}
        >
          Back to Login Page
        </button>
      </div>
    </>
  );
}
