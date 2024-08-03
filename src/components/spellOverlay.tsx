import React, { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

interface SpellOverlayProps {
  onClose: () => void;
}

interface SpellOrb {
  orb_id: number;
  orb_name: string;
  orb_mp: number;
  orb_desc: string;
  orb_rarity: string;
}

export default function SpellOverlay({ onClose }: SpellOverlayProps) {
  const [spellOrbs, setSpellOrbs] = useState<SpellOrb[]>([]);

  useEffect(() => {
    fetchSpellOrbs();
  }, []);

  async function fetchSpellOrbs() {
    try {
      if (!supabase) {
        throw new Error("Supabase client is not initialized");
      }
      const { data, error } = await supabase.from("spell_orb").select();

      if (error) throw error;
      setSpellOrbs(data || []);
    } catch (error) {
      console.error("Error fetching spell orbs:", error);
    }
  }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-violet-700 p-8 rounded-3xl w-11/12 h-11/12 md:w-3/4 md:h-3/4 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl md:text-4xl text-white mb-4">Spell Orbs</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className="text-white text-2xl md:text-5xl absolute top-5 right-7 cursor-pointer"
          onClick={onClose}
        />
        <div className="bg-white p-4 md:p-8 rounded-2xl mt-4 h-[90%] overflow-y-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {spellOrbs.map((orb, index) => (
              <div key={index} className="bg-gray-100 rounded-lg p-4 shadow-md">
                <Image
                  src={`/skill${orb.orb_id}.png`}
                  alt={orb.orb_name}
                  width={80}
                  height={80}
                  className="mx-auto mb-2"
                />
                <h2 className="text-lg font-semibold">{orb.orb_name}</h2>
                <p className="text-sm text-gray-600">{orb.orb_mp}</p>
                <p className="text-xs mt-2">{orb.orb_desc}</p>
                <span
                  className={`text-xs font-bold mt-2 inline-block px-2 py-1 rounded ${getRarityColor(
                    orb.orb_rarity
                  )}`}
                >
                  {orb.orb_rarity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function getRarityColor(rarity: string): string {
  switch (rarity.toLowerCase()) {
    case "common":
      return "bg-gray-200 text-gray-700";
    case "rare":
      return "bg-blue-200 text-blue-700";
    case "epic":
      return "bg-purple-200 text-purple-700";
    default:
      return "bg-gray-200 text-gray-700";
  }
}
