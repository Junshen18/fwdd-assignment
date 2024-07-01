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
          size="3x"
          style={{ color: "#ffffff" }}
        />
      </div>
    </>
  );
}
