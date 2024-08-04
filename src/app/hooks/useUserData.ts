import { useState, useEffect } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";

export function useUserData(session: Session | null) {
  const [userData, setUserData] = useState<{
    user_name: string;
    user_id: string;
    user_avatar: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    async function fetchUserData() {
      if (!session) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("user")
          .select("user_name, user_id, user_avatar")
          .eq("user_email", session.user.email)
          .single();

        if (error) throw error;

        setUserData(data);
        localStorage.setItem("user_name", data.user_name);
        localStorage.setItem("user_id", data.user_id);
        localStorage.setItem("user_avatar", data.user_avatar);
      } catch (e) {
        setError(
          e instanceof Error ? e : new Error("An unknown error occurred")
        );
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, [session, supabase]);

  return { userData, loading, error };
}
