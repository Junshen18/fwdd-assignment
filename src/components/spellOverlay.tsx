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
  const spellOrbsData = [
    {
      spell_orb_name: "Inferno Orb",
      magic_power: "100",
      description: "Burns buildings and structures, deals massive area damage.",
      rarity: "Epic",
    },
    {
      spell_orb_name: "Blazing Orb",
      magic_power: "150",
      description: "Inflicts fire damage, creates explosions.",
      rarity: "Common",
    },
    {
      spell_orb_name: "Storm Orb",
      magic_power: "200",
      description: "Calls down lightning strikes, stuns enemies.",
      rarity: "Rare",
    },
    {
      spell_orb_name: "Death Orb",
      magic_power: "250",
      description: "Drains life force, summons undead minions.",
      rarity: "Epic",
    },
    {
      spell_orb_name: "Nature Orb",
      magic_power: "180",
      description: "Heals the land, summons nature spirits.",
      rarity: "Common",
    },
    {
      spell_orb_name: "Moonlit Orb",
      magic_power: "300",
      description: "Restores health and vitality, dispels negative energy.",
      rarity: "Rare",
    },
    {
      spell_orb_name: "Cosmic Orb",
      magic_power: "220",
      description: "Manipulates space and time, creates black holes.",
      rarity: "Epic",
    },
    {
      spell_orb_name: "Crimson Orb",
      magic_power: "190",
      description: "Summons a fiery phoenix, provides protection.",
      rarity: "Rare",
    },
  ];

  useEffect(() => {
    const mappedSpellOrbs: SpellOrb[] = spellOrbsData.map((orb, index) => ({
      orb_id: index + 1,
      orb_name: orb.spell_orb_name,
      orb_mp: parseInt(orb.magic_power, 10),
      orb_desc: orb.description,
      orb_rarity: orb.rarity,
    }));
    setSpellOrbs(mappedSpellOrbs);
    console.log(mappedSpellOrbs);
  }, []);

  // async function fetchSpellOrbs() {
  //   try {
  //     if (!supabase) {
  //       throw new Error("Supabase client is not initialized");
  //     }
  //     let { data: spell_orb, error } = await supabase
  //       .from("spell_orb")
  //       .select("*");

  //     if (error) throw error;

  //     console.log(spell_orb);
  //     setSpellOrbs(spell_orb as SpellOrb[]);
  //   } catch (error) {
  //     console.error("Error fetching spell orbs:", error);
  //   }
  // }

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-violet-700 p-3 md:p-8 rounded-2xl md:rounded-3xl w-11/12 md:w-3/4 my-8 text-center relative"
        onClick={(e) => e.stopPropagation()}
      >
        <h1 className="text-2xl md:text-4xl text-white mb-4">Spell Orbs</h1>
        <FontAwesomeIcon
          icon={faXmark}
          className="text-white text-2xl md:text-5xl absolute top-5 right-7 cursor-pointer"
          onClick={onClose}
        />
        <div className="bg-white p-4 md:p-8 rounded-2xl mt-4 max-h-[70vh] overflow-y-auto w-full">
          <div className="grid grid-cols-2  md:grid-cols-3 lg:grid-cols-4 gap-4">
            {spellOrbs.map((orb, index) => (
              <div
                key={index}
                className="bg-gradient-to-t from-violet-700 to-violet-900 rounded-xl p-4 shadow-md "
              >
                <div className="h-24 flex items-center justify-center">
                  <Image
                    src={`/skill${orb.orb_id}.png`}
                    alt={orb.orb_name}
                    width={80}
                    height={80}
                    className="mb-2 w-16 h-16 md:w-20 md:h-20"
                  />
                </div>
                <h2 className="text-sm md:text-lg font-semibold">
                  {orb.orb_name}
                </h2>
                <div className="flex flex-col md:flex-row gap-2 md:justify-between items-center mt-2">
                  <p className="text-sm text-white">MP: {orb.orb_mp}</p>
                  <span
                    className={`text-xs font-bold inline-block px-2 py-1 rounded ${getRarityColor(
                      orb.orb_rarity
                    )}`}
                  >
                    {orb.orb_rarity}
                  </span>
                </div>

                <p className="text-xs mt-2 text-justify">{orb.orb_desc}</p>
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
      return "bg-orange-200 text-orange-700";
    case "epic":
      return "bg-purple-300 text-purple-800";
    default:
      return "bg-gray-200 text-gray-700";
  }
}
