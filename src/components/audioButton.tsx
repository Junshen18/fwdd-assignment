import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVolumeHigh, faVolumeXmark } from "@fortawesome/free-solid-svg-icons";
import useSound from "use-sound";
import { useEffect, useState } from "react";
export default function AudioButton() {
  const [playMusic, setPlayMusic] = useState(false);
  const [play, { stop }] = useSound("/soundEffects/chipichipi.mp3");

  useEffect(() => {
    if (playMusic) {
      play();
    } else {
      stop();
    }
  }, [playMusic, play, stop]);

  return (
    <>
      <div
        onClick={() => setPlayMusic(!playMusic)}
        className="w-10 h-10 m-8 items-center"
      >
        {playMusic ? (
          <FontAwesomeIcon icon={faVolumeHigh} className="w-10 h-10 " />
        ) : (
          <FontAwesomeIcon icon={faVolumeXmark} className="w-9 h-9" />
        )}
      </div>
    </>
  );
}
