import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/utils/supabase/server";

function generateLobbyCode(): string {
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";
  for (let i = 0; i < 4; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}

export async function GET(request: NextRequest) {
  const supabase = createClient();

  try {
    const lobbyCode = generateLobbyCode();

    // Insert the new lobby into Supabase
    const { data, error } = await supabase
      .from("room")
      .insert([{ room_code: lobbyCode, status: "open" }])
      .select();

    if (error) throw error;

    return NextResponse.json(
      { lobbyCode, lobbyData: data[0] },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error generating lobby:", error);
    return NextResponse.json(
      { error: "Failed to create lobby" },
      { status: 500 }
    );
  }
}
