"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useEffect, useState } from "react";
import ProfileDiv from "./profileName";
import BackArrow from "./backArrow";

export default function Header() {
  const [username, setUsername] = useState<string | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const userName = localStorage.getItem("user_name");
    setUsername(userName);
  }, []);

  return (
    <div className="w-screen bg-transparent absolute z-30 top-0">
      <div className="grid grid-cols-3 items-center p-4">
        <div className="ml-5">
          <BackArrow />
        </div>
        <div></div>
        <div className="flex gap-4 justify-end">
          <ProfileDiv name={username || "Loading..."} />
        </div>
      </div>
    </div>
  );
}
