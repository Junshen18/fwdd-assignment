"use client";
import AudioButton from "@/components/audioButton";
import ProfileDiv from "@/components/profileName";
import useSound from "use-sound";

export default function FindRoomPage() {
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  return (
    <>
      <div
        className="h-screen w-screen bg-cover bg-center flex flex-col justify-start items-center top"
        style={{ backgroundImage: `url('/background.png')` }}
      >
        <div className="absolute bottom-5 left-5">
          <ProfileDiv pic="/pfp2.svg" name="Wong Jun Shen" />
        </div>

        <div
          className={
            "flex flex-col items-center justify-center h-3/5 bg-transparent scale-125"
          }
        >
          <h1 className="text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#F5BFBF] to-white drop-shadow-lg">
            PYTHON
          </h1>
          <h1 className="text-[100px] font-bold text-transparent bg-clip-text bg-gradient-to-t from-[#EB7E7E] to-[#F5BFBF] drop-shadow-lg mt-2">
            WIZARD
          </h1>
        </div>
        <div className="h-auto flex flex-col gap-10 z-10  ">
          <div className="h-16">
            <button
              className="cursor-pointer transition-all bg-amber-500 text-white h-16 w-80 px-8 py-2 rounded-2xl border-amber-600
border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-3xl
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={() => {
                buttonSound();
              }}
            >
              Create Room
            </button>
          </div>
          <div className="h-16">
            <button
              className="cursor-pointer transition-all bg-blue-500 text-white h-16 w-80 px-8 py-2 rounded-2xl border-blue-600
border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-3xl
active:border-b-[2px] active:brightness-90 active:translate-y-[2px]"
              onClick={() => {
                buttonSound();
              }}
            >
              Join Room
            </button>
          </div>
        </div>
        <div className="absolute bottom-5 right-5">
          <AudioButton />
        </div>
      </div>
    </>
  );
}
