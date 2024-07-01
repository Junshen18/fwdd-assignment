"use client";
import Image from "next/image";
import AudioButton from "./audioButton";
import ProfileDiv from "./profileName";
import BackArrow from "./backArrow";
import { useEffect, useState } from "react";

export default function Header() {
  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedemail = localStorage.getItem("email") || "Guest";
    setEmail(storedemail);
  }, []);
  return (
    <>
      <div className="w-screen bg-transparent absolute z-30">
        <div className="grid grid-cols-3 items-center p-4">
          <div className="ml-5">
            <BackArrow />
          </div>
          <div></div>

          <div className="flex gap-4 justify-end">
            <ProfileDiv pic="/pfp2.svg" name={email} />
            <AudioButton />
          </div>
        </div>
      </div>
    </>
  );
}
