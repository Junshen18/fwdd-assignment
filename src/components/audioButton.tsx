"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import useSound from "use-sound";
import { useEffect, useState } from "react";
export default function AudioButton() {
  const [playMusic, setPlayMusic] = useState(false);
  // const [play, { stop }] = useSound("/soundEffects/chipichipi.mp3");
  const [play, { stop }] = useSound("/soundEffects/mogumogu.mp3");

  useEffect(() => {
    if (playMusic) {
      play();
    } else {
      stop();
    }
  }, [playMusic, play, stop]);

  return (
    <>
      <button
        className="cursor-pointer transition-all bg-neutral-700 text-white p-7 rounded-2xl border-neutral-800 
border-b-[6px] hover:brightness-110 hover:-translate-y-[1px] hover:border-b-[6px] text-3xl
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] md:w-10 md:h-10 w-3 h-3 flex items-center justify-center"
        onClick={() => setPlayMusic(!playMusic)}
      >
        {playMusic ? (
          <FontAwesomeIcon
            icon={faVolumeHigh}
            className="md:w-10 md:h-10 w-8 h-8"
          />
        ) : (
          <FontAwesomeIcon
            icon={faVolumeXmark}
            className="md:w-9 md:h-9 w-8 h-8"
          />
        )}
      </button>
    </>
  );
}
