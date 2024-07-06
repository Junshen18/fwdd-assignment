"use client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import useSound from "use-sound";

export default function BackArrow() {
  const router = useRouter();
  const [buttonSound] = useSound("/soundEffects/button-click.mp3");
  return (
    <>
      <div
        onClick={() => {
          router.back();
          buttonSound();
        }}
        className="cursor-pointer z-1"
      >
        <FontAwesomeIcon
          icon={faArrowLeft}
          className="text-3xl md:text-4xl lg:text-5xl xl:text-6xl"
          style={{ color: "#ffffff" }}
        />
      </div>
    </>
  );
}
