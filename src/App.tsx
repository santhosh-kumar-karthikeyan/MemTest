import { Board } from "./components";
import { idToEmoji } from "./utilities";
import type { Session } from "@supabase/supabase-js";
import { useState, useEffect } from "react";
import supabase from "./utilities/supabase";

export default function App() {
  const [session, setSession] = useState<Session | null>(null);
  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session: Session | null): void => {
      if (session) setSession(session);
      else setSession(null);
    });
  }, []);
  return <main>{session && <Board cards={idToEmoji} />}</main>;
}
