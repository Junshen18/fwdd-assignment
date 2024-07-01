"use client";
import Image from "next/image";
import AudioButton from "./audioButton";
import ProfileDiv from "./profileName";
import BackArrow from "./backArrow";

type HeaderProps = {
  logo?: boolean;
};

export default function Header({ logo }: HeaderProps) {
  return (
    <>
      <div className="w-screen bg-transparent absolute z-30">
        <div className="grid grid-cols-3 items-center p-4">
          <div className="ml-5">
            <BackArrow />
          </div>

          {logo ? (
            <div className="flex justify-center">
              <Image
                src="/pythonwizard.svg"
                width={100}
                height={100}
                alt="pythonwizard"
              />
            </div>
          ) : (
            <div />
          )}

          <div className="flex gap-4 justify-end">
            <ProfileDiv pic="/pfp2.svg" name=" Jun Shen" />
            <AudioButton />
          </div>
        </div>
      </div>
    </>
  );
}
