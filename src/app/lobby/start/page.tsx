"use client";
import CustomButton from "@/components/customButton";

export default function Start() {
  return (
    <>
      <div className="left-0 w-screen h-screen bg-gradient-to-t from-indigo-900 to-indigo-600">
        <div className="w-screen h-screen flex flex-col z-10 gap-20">
          <div className="flex flex-row justify-between m-2 border ">
            <div className="w-1/3 border ">
              <button
                className={`bg-red-500 border-red-700 cursor-pointer transition-all text-white h-16 px-8 py-2 rounded-2xl 
        border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-xl w-auto
        active:border-b-[2px] active:brightness-90 active:translate-y-[2px]`}
              >
                End Game
              </button>
            </div>
            <div className="w-1/3 justify-center flex">
              <div className="rounded-xl w-60 py-3 bg-violet-900 text-5xl flex justify-center">
                AEGT
              </div>
            </div>
            <div className="w-1/3 border flex justify-end">helo</div>
          </div>

          <div className="flex flex-row items-center justify-center gap-4 ">
            <div className="w-64 h-96 border bg-indigo-600 z-10 rounded-2xl">
              hello
            </div>
            <div className="w-64 h-96 border bg-indigo-600 z-10 rounded-2xl">
              hello
            </div>
            <div className="w-64 h-96 border bg-indigo-600 z-10 rounded-2xl">
              hello
            </div>
            <div className="w-64 h-96 border bg-indigo-600 z-10 rounded-2xl">
              hello
            </div>
          </div>

          <div className="z-10 justify-center items-end flex " />
        </div>
      </div>
    </>
  );
}
