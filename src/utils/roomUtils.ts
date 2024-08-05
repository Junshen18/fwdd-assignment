import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Database } from "@/types/database.types";

const supabase = createClientComponentClient<Database>();

export async function joinRoom(code: string, playerName: string) {
  if (!code) {
    throw new Error("Please enter a room code");
  }
  console.log("code: ", code);
  // 1. Validate Room code & 2. Check Room status
  const { data: room, error: roomError } = await supabase
    .from("room")
    .select("room_id, room_code, status")
    .eq("room_code", code)
    .single();

  if (roomError) throw roomError;
  if (!room) throw new Error("Room not found");
  if (room.status !== "open") throw new Error("This room is closed");

  // 3. Check Room player amount from players table
  const { count, error: countError } = await supabase
    .from("player")
    .select("*", { count: "exact", head: true })
    .eq("room_id", room.room_id);

  if (countError) throw countError;
  if (count && count >= 4) throw new Error("Room is full");
  console.log("count: ", count);

  // 4. Add player data into player's table
  // Fetch user_id from supabase user table
  const { data: userData, error: userError } = await supabase
    .from("user")
    .select("user_id")
    .eq("user_name", playerName)
    .single();
  console.log("playerName: ", playerName);
  if (userError) {
    if (userError.code === "PGRST116") {
      console.error("User not found in database");
      throw new Error(
        "User not found. Please ensure you're logged in and have set up your profile."
      );
    }
    throw userError;
  }
  if (!userData) throw new Error("User not found");

  const userId = userData.user_id;
  const { data: playerData, error: playerError } = await supabase
    .from("player")
    .insert([
      {
        user_id: userId,
        room_id: room.room_id,
        player_mp: 0,
      },
    ])
    .select();
  console.log(playerData);
  if (playerError) throw playerError;

  return room.room_code;
}

export async function exitRoom(roomCode: string, playerName: string) {
  // 1. Validate Room code
  const { data: room, error: roomError } = await supabase
    .from("room")
    .select("room_id")
    .eq("room_code", roomCode)
    .single();

  if (roomError) throw roomError;
  if (!room) throw new Error("Room not found");

  // 2. Fetch user_id
  const { data: userData, error: userError } = await supabase
    .from("user")
    .select("user_id")
    .eq("user_name", playerName)
    .single();

  if (userError) throw new Error("Error fetching user data");
  if (!userData) throw new Error("User not found");

  // 3. Remove player from the room
  const { error: deleteError } = await supabase
    .from("player")
    .delete()
    .eq("user_id", userData.user_id)
    .eq("room_id", room.room_id);

  if (deleteError) throw deleteError;

  // 4. Check if room is empty and delete if so
  const { count, error: countError } = await supabase
    .from("player")
    .select("*", { count: "exact", head: true })
    .eq("room_id", room.room_id);

  if (countError) throw countError;

  if (count === 0) {
    const { error: roomDeleteError } = await supabase
      .from("room")
      .delete()
      .eq("room_id", room.room_id);

    if (roomDeleteError) throw roomDeleteError;
  }

  return true;
}

export async function fetchRoomPlayers(roomCode: string) {
  // 1. fetch the room_id using the room_code
  const { data: room, error: roomError } = await supabase
    .from("room")
    .select("room_id")
    .eq("room_code", roomCode)
    .single();

  if (roomError) throw roomError;
  if (!room) throw new Error("Room not found");

  // 2. fetch the players using the room_id
  const { data: players, error: playerError } = await supabase
    .from("player")
    .select("user_id, player_mp")
    .eq("room_id", room.room_id);

  if (playerError) throw playerError;

  // 3. fetch user details for each player
  const { data: playersWithDetails, error: playersError } = await supabase
    .from("user")
    .select("user_id, user_name, user_avatar")
    .in(
      "user_id",
      players.map((player) => player.user_id)
    );

  if (playersError) throw playersError;

  const result = playersWithDetails.map((player) => {
    const matchingPlayer = players.find((p) => p.user_id === player.user_id);
    return {
      userId: player.user_id,
      name: player.user_name || "Unknown",
      mp: matchingPlayer ? matchingPlayer.player_mp : 0,
      avatarUrl: player.user_avatar || "/pfp1.svg",
    };
  });
  console.log(result);

  return result;
}
