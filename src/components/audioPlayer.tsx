// hooks/useAutoplayAudio.js
import { useEffect } from "react";

const useAutoplayAudio = (src: string) => {
  useEffect(() => {
    const audio = new Audio(src);
    const playAudio = () => {
      audio.play().catch((error) => {
        console.log("Autoplay prevented:", error);
      });
    };

    document.addEventListener("click", playAudio);

    return () => {
      document.removeEventListener("click", playAudio);
    };
  }, [src]);
};

export default useAutoplayAudio;
