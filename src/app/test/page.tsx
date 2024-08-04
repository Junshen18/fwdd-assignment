"use client";
import { User } from "@supabase/supabase-js";
import React, { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/client";
import { supabase } from "@/lib/supabase";
export default function TestPage() {
  const [spellOrb, setSpellOrb] = useState<any[] | null>(null);
  const [user, setUser] = useState<User | null>(null);
  async function fetchSpellOrbs() {
    const { data, error } = await supabase.from("spell_orb").select("*");

    if (error) {
      console.error("Error fetching spell orbs:", error);
      return;
    }

    // data is now typed as Array<Database['public']['Tables']['spell_orb']['Row']>
    console.log("Fetched spell orbs:", data);
    return data;
  }

  useEffect(() => {
    const getUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setUser(user);
      console.log(user);
    };

    getUser();

    const fetchData = async () => {
      const supabase = createClient();

      let { data: spell_orb, error } = await supabase
        .from("spell_orb")
        .select("*");

      setSpellOrb(spell_orb);
    };
    fetchData();

    const getUID = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");
      console.log(user?.app_metadata?.user_id);
    };
    getUID();
  }, []);

  const testFunction = () => {
    console.log("Test function called!");
    console.log(spellOrb);
    alert("Button clicked!");
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-xl gap-8">
      <h1>Test Page</h1>
      <button
        className="bg-violet-500 text-white px-4 py-2 rounded"
        onClick={fetchSpellOrbs}
      >
        Test Button
      </button>
      <div>Result: {spellOrb ? spellOrb.length : 0}</div>
    </div>
  );
}
