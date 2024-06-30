"use client";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";

export default function BackArrow() {
  const router = useRouter();
  return (
    <>
      <div
        onClick={() => {
          router.back();
        }}
        className="cursor-pointer z-1 w-10 h-10"
      >
        <FontAwesomeIcon icon={faArrowLeft} style={{ color: "#ffffff" }} />
      </div>
    </>
  );
}
