import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import React from "react";

interface LuckyOverlayProps {
  onClose: () => void;
  gainSpellOrb: (rarity: string) => Promise<void>;
}

export default function LuckyOverlay({
  onClose,
  gainSpellOrb,
}: LuckyOverlayProps) {
  const [showClaimOrb, setShowClaimOrb] = React.useState(false);

  const onNo = () => {
    onClose();
  };
  const onYes = () => {
    setShowClaimOrb(true);
  };

  const onClaimOrb = () => {
    console.log("Claiming orb...");
    gainSpellOrb("rare");
    console.log("Orb claimed, closing overlay...");
    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-green-500 p-8 rounded-2xl md:rounded-3xl w-11/12 h-11/12 md:w-3/4 md:h-3/4 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl md:text-4xl">Lucky Clover</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className="text-white text-2xl md:text-5xl absolute top-5 right-7 cursor-pointer"
          onClick={onClose}
        />
        {!showClaimOrb ? (
          <div className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl mt-4 h-[90%]  flex flex-col items-center justify-center">
            <Image
              src="/green-lucky-clover.png"
              width={200}
              height={200}
              alt="clover"
            />
            <h3 className="text-green-900 text-2xl md:text-4xl w-full text-center mb-4">
              Did your dice roll match the clover?
            </h3>
            <h4 className="text-green-900 text-lg md:text-2xl">
              If Yes, You can gain one extra spell orb!
            </h4>
            <div className="flex flex-row justify-center gap-4 mt-4">
              <button
                onClick={onYes}
                className="bg-green-500 text-white text-xl px-4 py-2 rounded hover:bg-green-600 transition-colors"
              >
                Yes
              </button>
              <button
                onClick={onNo}
                className="bg-red-600 text-white text-xl px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                No
              </button>
            </div>
          </div>
        ) : (
          <div className="bg-white p-4 md:p-8 rounded-2xl mt-4 h-[90%] flex flex-col items-center justify-center gap-3">
            <h2 className="text-green-900 text-2xl md:text-4xl w-full text-center mb-2">
              Congratulations!
            </h2>
            <Image
              src="/skill1.png"
              width={150}
              height={150}
              alt="spell orb"
              className="mb-2"
            />
            <h3 className="text-green-900 text-lg md:text-2xl w-full text-center mb-4">
              Claim Your Spell Orb!
            </h3>
            <button
              onClick={onClaimOrb}
              className="bg-green-500 text-white text-xl px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Claim Orb
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
