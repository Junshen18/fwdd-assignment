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
active:border-b-[2px] active:brightness-90 active:translate-y-[2px] w-10 h-10  flex items-center justify-center"
        onClick={() => setPlayMusic(!playMusic)}
      >
        {playMusic ? (
          <FontAwesomeIcon icon={faVolumeHigh} className="w-10 h-10 " />
        ) : (
          <FontAwesomeIcon icon={faVolumeXmark} className="w-9 h-9" />
        )}
      </button>
    </>
  );
}
