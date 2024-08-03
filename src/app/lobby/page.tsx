"use client";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function LobbyPage() {
  const player = {};
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
            <div className="w-64 h-96 shadow-lg bg-indigo-600 z-10 rounded-2xl justify-center flex flex-col items-center">
              <Image
                src="/pfp2.svg"
                width={70}
                height={70}
                alt="Profile Icon"
                className="h-14 md:h-40 md:w-40 "
              ></Image>
              <div className="text-2xl flex items-center text-center pl-3 md:pl-5 lg:pl-0">
                Junshen12312123
              </div>
            </div>
            <div className="w-64 h-96 shadow-lg bg-indigo-600 z-10 rounded-2xl">
              hello
            </div>
            <div className="w-64 h-96 shadow-lg bg-indigo-600 z-10 rounded-2xl">
              hello
            </div>
            <div className="w-64 h-96 shadow-lg bg-indigo-600 z-10 rounded-2xl">
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
