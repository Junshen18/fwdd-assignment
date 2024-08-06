"use client";
import CustomButton from "@/components/customButton";
import LoadingSpinner from "@/components/loadingSpinner";
import ProfileDiv from "@/components/profileName";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSound from "use-sound";

export default function FindRoomPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [avatar, setAvatar] = useState<string | null>(null);
  const [Error, setError] = useState<Error | null>(null);
  const [userName, setUserName] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  const router = useRouter();
  const supabase = createClientComponentClient();

  useEffect(() => {
    setLoading(true);
    const checkSession = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();
      if (error) {
        setError(error);
        console.error("Error fetching session:", error);
        router.push("/");
        return;
      }

      if (!session) {
        router.push("/");
      } else {
        setSession(session);
        await getUserData(session);
      }
    };
    setLoading(false);

    const getUserData = async (session: Session) => {
      const { data, error } = await supabase
        .from("user")
        .select("user_name, user_id, user_avatar")
        .eq("user_email", session.user.email)
        .single();

      if (error) {
        if (error.code === "PGRST116") {
          console.log("User not found in database");
          return;
        }
        console.error("Error fetching user data:", error);
        router.push("/");
        return;
      }
      console.log(data);
      if (data) {
        localStorage.setItem("user_name", data.user_name);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_avatar", data.user_avatar);
        console.log("User data saved to local storage");
      }
      setUserName(data.user_name);
      setAvatar(data.user_avatar);
    };

    checkSession();
  }, [router, supabase]);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (Error) {
    console.error("Error fetching user data:", Error);
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
        <div className="w-screen flex gap-4 justify-end mt-4 mr-4">
          <ProfileDiv name={userName || "Loading..."} />
        </div>

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
        <div className="h-auto flex flex-col gap-10 z-10 mb-10">
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
