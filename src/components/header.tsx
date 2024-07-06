"use client";
import Image from "next/image";
import AudioButton from "./audioButton";
import ProfileDiv from "./profileName";
import BackArrow from "./backArrow";
import { useEffect, useState } from "react";

export default function Header() {
  const [name, setName] = useState("");
  useEffect(() => {
    const storedName = localStorage.getItem("name") || "Unknown";
    setName(storedName);
  }, []);
  return (
    <>
      <div className="w-screen bg-transparent absolute z-30 top-0">
        <div className="grid grid-cols-3 items-center p-4">
          <div className="ml-5">
            <BackArrow />
          </div>
          <div></div>

          <div className="flex gap-4 justify-end">
            <ProfileDiv pic="/pfp2.svg" name={name} />
            <div className="md:w-16 md:h-16 w-14 h-14 mr-1">
              <AudioButton />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
