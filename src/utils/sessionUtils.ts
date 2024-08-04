import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { Session } from "@supabase/supabase-js";

const checkSession = async (router: any): Promise<Session | null> => {
  console.log("checkSession function called");
  const supabase = createClientComponentClient();
  const {
    data: { session },
    error,
  } = await supabase.auth.getSession();

  if (error) {
    console.error("Error fetching session:", error);
    router.push("/");
    return null;
  }

  if (!session) {
    router.push("/");
    return null;
  }

  console.log(session);
  return session;
};

console.log("sessionUtils module loaded");
export default checkSession;
