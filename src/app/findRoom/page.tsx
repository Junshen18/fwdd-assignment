"use client";
import AudioButton from "@/components/audioButton";
import CustomButton from "@/components/customButton";
import Header from "@/components/header";
import ProfileDiv from "@/components/profileName";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function FindRoomPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        console.error("Error fetching session:", error);
        router.push("/");
        return;
      }

      if (!session) {
        router.push("/");
      } else {
        setSession(session);
        console.log(session);
      }
      setLoading(false);
    };

    async function getUserName() {
      const { data: userData, error } = await supabase
        .from("user")
        .select("user_name")
        .eq("user_email", session?.user?.email)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      localStorage.setItem("user_name", userData.user_name);
    }
    getUserName();
    async function getUserId() {
      const { data: userData, error } = await supabase
        .from("user")
        .select("user_id")
        .eq("user_email", session?.user?.email)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      localStorage.setItem("user_id", userData.user_id);
    }
    getUserId();
    async function getUserAvatar() {
      const { data: userData, error } = await supabase
        .from("user")
        .select("user_avatar")
        .eq("user_email", session?.user?.email)
        .single();

      if (error) {
        console.error("Error fetching user data:", error);
        return;
      }
      localStorage.setItem("user_avatar", userData.user_avatar);
    }
    getUserAvatar();

    checkSession();
  }, [router, supabase]);

  if (loading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="grid min-h-[140px] w-full place-items-center overflow-x-scroll rounded-lg p-6 lg:overflow-visible">
          <svg
            className="text-gray-300 animate-spin"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
          >
            <path
              d="M32 3C35.8083 3 39.5794 3.75011 43.0978 5.20749C46.6163 6.66488 49.8132 8.80101 52.5061 11.4939C55.199 14.1868 57.3351 17.3837 58.7925 20.9022C60.2499 24.4206 61 28.1917 61 32C61 35.8083 60.2499 39.5794 58.7925 43.0978C57.3351 46.6163 55.199 49.8132 52.5061 52.5061C49.8132 55.199 46.6163 57.3351 43.0978 58.7925C39.5794 60.2499 35.8083 61 32 61C28.1917 61 24.4206 60.2499 20.9022 58.7925C17.3837 57.3351 14.1868 55.199 11.4939 52.5061C8.801 49.8132 6.66487 46.6163 5.20749 43.0978C3.7501 39.5794 3 35.8083 3 32C3 28.1917 3.75011 24.4206 5.2075 20.9022C6.66489 17.3837 8.80101 14.1868 11.4939 11.4939C14.1868 8.80099 17.3838 6.66487 20.9022 5.20749C24.4206 3.7501 28.1917 3 32 3L32 3Z"
              stroke="currentColor"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
            ></path>
            <path
              d="M32 3C36.5778 3 41.0906 4.08374 45.1692 6.16256C49.2477 8.24138 52.7762 11.2562 55.466 14.9605C58.1558 18.6647 59.9304 22.9531 60.6448 27.4748C61.3591 31.9965 60.9928 36.6232 59.5759 40.9762"
              stroke="currentColor"
              stroke-width="5"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="text-gray-900"
            ></path>
          </svg>
        </div>
      </div>
    ); // Or a loading spinner
  }

  if (!session) {
    return null;
  }

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
