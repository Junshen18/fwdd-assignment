"use client";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import { useRouter } from "next/navigation";

export default function LobbyPage() {
  const router = useRouter();
  const handleStart = () => {
    // Add your logic to join the room using the entered code
    router.push("/lobby/start");
  };
  return (
    <>
      <div className="w-screen h-screen bg-gradient-to-t from-indigo-900 to-indigo-600">
        <Header />

        <div className="w-screen h-screen flex flex-col z-10 gap-20">
          <div className="justify-center flex  m-2">
            <div className="rounded-xl w-60 py-3 bg-violet-900 text-5xl flex justify-center bg-red">
              AEGT
            </div>
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

          <div className="z-10 justify-center items-end flex ">
            <CustomButton
              text="Start Game"
              bgColor="#f59e0b"
              borderColor="#d97706"
              onClick={() => handleStart()}
            />
          </div>
        </div>
      </div>
    </>
  );
}
